import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import { IoSearch, IoShirtOutline } from "react-icons/io5";
import { BsPatchQuestion } from "react-icons/bs";
import SearchView from "../views/search-view";
import UploadView from "../views/upload-view";
import LoginView from "../views/login-view";
import QuestionView from "../views/question-view";

export default function InquiryAccordion(){
  return (
    <Accordion
      type="single"
      className="w-full"
      collapsible
    >
      <AccordionItem value="item-1">
        <AccordionTrigger
          aria-label="Search Found Items Section"
          className="cursor-pointer px-4"
        >
          <div className="flex flex-row items-center gap-2">
            <IoSearch size={18}/>
            Search Found Items
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <SearchView/>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger
          aria-label="Report Found Items Section"
          className="cursor-pointer px-4"
        >
          <div className="flex flex-row items-center gap-2">
            <IoShirtOutline size={18} />
            Report Found Items
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <UploadView/>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger
          aria-label="Administer View Section"
          className="cursor-pointer px-4"
        >
          <div className="flex flex-row gap-2 items-center">
            <HiOutlineDocumentCheck size={18}/>
            Approve Inquiries (Staff View)
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <LoginView/>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger
          aria-label="Questions and Contact Section"
          className="cursor-pointer px-4"
        >
          <div className="flex flex-row items-center gap-2">
            <BsPatchQuestion size={18}/>
            Questions and Contact
          </div>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <QuestionView/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}