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

  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("items-images")
      .upload(filePath, file);
    if (error) {
      toast.error("Error uploading image. Please try again.")
      throw error;
    }
    const { data } = supabase.storage
      .from("items-images")
      .getPublicUrl(filePath);  
    return data.publicUrl;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let imageUrl: string | null = null;
    if (image) {
      imageUrl = await uploadImage(image);
    }

    if (!upload.location || !upload.description) {
      toast.error("Please fill in all required fields.")
      return;
    }

    const {error} = await supabase
      .from("found-items")
      .insert({...upload, image_url:imageUrl})
      .select()
      .single()

    if (error) {
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
          accept="image/*"
          className="hover:cursor-pointer"
          onChange={handleFileChange}
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
        <Button type="submit" className="self-start start text-white cursor-pointer">
          Submit Found Item
        </Button>
      </form>
    </div>
    
  )
} 