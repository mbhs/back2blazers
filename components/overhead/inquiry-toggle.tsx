import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,  } from "@/components/ui/dialog";
import InquiryAccordion from "./inquiry-accordion";
import Image from "next/image";

export default function InquiryToggle(){
  return (
    <Dialog>
      <DialogTrigger
        className="start shadow-red-700 sm:shadow-md px-4 py-1.5 sm:px-5 rounded-full backdrop-blur-lg border text-center cursor-pointer text-white w-full sm:w-auto italic"
      >
          Found/Lost an item? Click here!
      </DialogTrigger>
      <DialogContent
        className="box backdrop-blur-3xl max-h-[80vh] overflow-y-scroll"
      >
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2 justify-center">
              <Image src="/blazer.png" alt="Logo" width={32} height={32}/>
              MBHS Lost & Found Inquiries
          </DialogTitle> 
        </DialogHeader>
        <DialogContent className="box backdrop-blur-xl">
          <InquiryAccordion/>
        </DialogContent>
      </DialogContent>
    </Dialog>
  )
}