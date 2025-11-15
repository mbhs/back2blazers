import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { FoundItem } from "@/lib/types";

export default function UploadView() {
  const [upload, setUpload] = useState<FoundItem>({
    approved: false,
    claimed: false,
    image_url: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!upload.location || !upload.description) {
      toast.error("Please fill in all required fields.")
      return;
    }

    const {error} = await supabase.from("found-items").insert(upload).single()
    if (error) {
      console.error("Error reporting found item.", error.message)
      toast.error("Error reporting found item. Please try again.")
      return;
    }

    toast.success("Found item reported! Pending staff approval for public viewing.")
  }

  return (
    <div className="text-balance max-h-[55vh] overflow-y-scroll py-4">
      <form 
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          type="file"
          className="hover:cursor-pointer"
        />
        <Textarea
          placeholder="Where is the item located? (Where can someone pick it up?)"
          className="hover:cursor-text"
          onChange = {(e) => setUpload({...upload, location: e.target.value})}
        />
        <Textarea
          placeholder="Describe the item (color, size, brand, distinguishing features, etc.)"
          className="hover:cursor-text"
          onChange = {(e) => setUpload({...upload, description: e.target.value})}
        />
        <Button type="submit" className="self-start start text-white">
          Submit Found Item
        </Button>
      </form>
    </div>
    
  )
} 