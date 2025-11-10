"use client"

import * as motion from "motion/react-client"
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header(){
  return(
    <>
      <motion.div   
        className="box backdrop-blur-lg sm:rounded-lg absolute top-0 left-0 sm:top-5 sm:left-5 px-4 pt-2 pb-3 border-b sm-border w-full sm:w-[400px] z-10000"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 2}}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <Link href="/" aria-label="Home Button" className="hover:opacity-80 transition-opacity flex items-center gap-3">
              <img src="/blazer.png" alt="Logo" className="max-w-14 py-2"/>
              <p className="font-semibold text-4xl hidden sm:block tracking-tight">
                back2<span className="text-red-500">blazers</span>
              </p>
            </Link>
            <div className="sm:hidden">
              <ThemeToggle/>
            </div>
          </div>
          <p className="hidden sm:block italic tracking-tighter opacity-70">
            finding and bringing back lost items for blazer students! <br/>
            @ Montgomery Blair High School
          </p>
        </div>
        <hr className="mt-3"/>
        <div className="flex flex-row justify-between w-full items-center tracking-tighter mt-3 gap-6">

        </div>
      </motion.div>
      <motion.div 
        className="hidden sm:block absolute top-5 left-[425px] z-10000"
        initial={{ x: -25, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5}}
      >
        <ThemeToggle/>
      </motion.div>
    </>
  );
}
