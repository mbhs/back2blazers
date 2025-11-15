import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,  } from "@/components/ui/dialog";
import InquiryAccordion from "./inquiry-accordion";

export default function InquiryToggle(){
  return (
    <Dialog>
      <DialogTrigger
        className="start px-4 py-1.5 sm:px-5 rounded-full backdrop-blur-lg border text-center cursor-pointer text-white w-full sm:w-auto italic"
      >
          Found/Lost an item? Click here!
      </DialogTrigger>
      <DialogContent
        className="box backdrop-blur-3xl"
      >
        <DialogHeader>
          <DialogTitle>
            Lost and Found Inquiries
          </DialogTitle>  
          <InquiryAccordion/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}