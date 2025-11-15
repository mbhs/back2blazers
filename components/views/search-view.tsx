import { supabase } from "@/lib/supabase-client"
import { PendingItems } from "@/lib/types"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { FaHandsHelping } from "react-icons/fa";
import { toast } from "sonner"

export default function SearchView() {
  const [items, setItems] = useState<PendingItems[]>()

  const handleClaim = async (id: number) => {
    const {error} = await supabase.from("found-items").update({claimed: 'true'}).eq('id', id)

    if (error) {
      toast("Error claiming item. Please try again")
      return;
    }
    toast("Successful item claim.")
  }

  useEffect(() => {
    const fetchItems = async () => {
      const {error, data} = await supabase
        .from("found-items")
        .select("*")
        .order("created_at", {ascending: true})
    
      if (error) {
        console.error("Error fetching found items:", error.message)
        return;
      }
      setItems(data
        .filter(item => item.approved || item.claimed)
      )
    }

    fetchItems()
  }, [])
  if (!items || items.length === 0) {
    return <p className="py-4">No found items have been approved yet. Please check back later!</p>
  }
  return (
    <Table
      className="max-h-[55vh] overflow-y-scroll py-4"
    >
      <TableHeader>
        <TableRow>
          <TableHead>Claim</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Image</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
          {items?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="max-w-[50px] whitespace-normal wrap-break-word">
                  <Button className="cursor-pointer start text-white" onClick={()=> handleClaim(item.id)}>
                    <FaHandsHelping />
                  </Button>
                </TableCell>
                <TableCell className="max-w-[50px] whitespace-normal wrap-break-word text-right">{item.location}</TableCell>
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
            ))
          }
      </TableBody>
    </Table>
  )
}