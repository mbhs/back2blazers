import { supabase } from "@/lib/supabase-client";
import { FoundItem } from "@/lib/types";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface PendingItems extends FoundItem {
  id: number;
} 

export default function StaffView(){
  const [items, setItems] = useState<PendingItems[]>()

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

  return (
    <Table
      className="max-h-[55vh] overflow-y-scroll"
    >
      <TableHeader>
        <TableRow>
          <TableHead>Location</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          {items?.map((item, index) => (
            // (item.approved || item.claimed) && 
              <TableRow key={index}>
                <TableCell className="max-w-[100px] whitespace-normal wrap-break-word">{item.location}</TableCell>
                <TableCell className="max-w-[150px] whitespace-normal wrap-break-word">{item.description}</TableCell>
                <TableCell className="max-w-[100px] whitespace-normal wrap-break-word">{item.image_url}</TableCell>
              </TableRow>
            ))
          }
      </TableBody>
    </Table>
  )
}