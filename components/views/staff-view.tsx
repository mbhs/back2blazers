import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { FaRegCircleCheck, FaRegTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import { PendingItems } from "@/lib/types";
import { FaHandsHelping } from "react-icons/fa";

export default function StaffView(){
  const [items, setItems] = useState<PendingItems[]>()

  const handleDelete = async (id: number) => {
    const {error} = await supabase.from("found-items").delete().eq("id", id)

    if (error) {
      toast("Error deleting report. Please try again")
      return;
    }
    toast("Successful deletion.")
  }

  const handleApprove = async (id: number) => {
    const {error} = await supabase.from("found-items").update({approved: 'true'}).eq('id', id)

    if (error) {
      toast("Error approving report. Please try again")
      return;
    }
    toast("Successful approval.")
  }

  const handleClaim = async (id: number) => {
    const {error} = await supabase.from("found-items").delete().eq("id", id)

    if (error) {
      toast("Error verifying claim. Please try again")
      return;
    }
    toast("Successful claim verification.")
  }

  useEffect(() => {
    const fetchItems = async () => {
      const {error, data} = await supabase
        .from("found-items")
        .select("*")
        .order("created_at", {ascending: false})
      if (error) {
        console.error("Error fetching found items:", error.message)
        return;
      }
      setItems(data)
    }
    fetchItems()
  }, [])

  if (!items || items.length === 0) {
    return <p className="py-4">No items have been reported yet. Please check back later!</p>
  }
  return (
    <form>
      <Table
        className="max-h-[55vh] overflow-y-scroll"
        >
        <TableHeader>
          <TableRow>
            <TableHead className="max-w-[70px] whitespace-normal wrap-break-word">Action</TableHead>
            <TableHead className="max-w-[60px] whitespace-normal wrap-break-word">Location</TableHead>
            <TableHead className="max-w-[100px] whitespace-normal wrap-break-word">Notes</TableHead>
            <TableHead className="max-w-[150px] whitespace-normal wrap-break-word">Image</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs font-normal">
            {items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="max-w-[70px] whitespace-normal wrap-break-word">
                  <div className="flex flex-row gap-2 items-center ">
                    {
                      !item.approved &&
                      <Button className="cursor-pointer start text-white" onClick={() => handleApprove(item.id)}>
                        <FaRegCircleCheck />
                      </Button>
                    }
                    {
                      item.claimed &&
                      <Button className="cursor-pointer start text-white" onClick={() => handleClaim(item.id)}>
                        <FaHandsHelping />
                      </Button>
                    }
                    <Button className="cursor-pointer start text-white" onClick={() => handleDelete(item.id)}>
                      <FaRegTrashCan />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="max-w-[60px] whitespace-normal wrap-break-word text-right">{item.location}</TableCell>
                <TableCell className="max-w-[100px] whitespace-normal wrap-break-word">{item.description}</TableCell>
                <TableCell className="max-w-[150px] whitespace-normal wrap-break-word">
                  { item.image_url &&
                    <img src={item.image_url}/>
                  }
                  { !item.image_url &&
                    <p>N/A</p>
                  }
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </form>
  )
}