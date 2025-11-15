"use client"
{/* eslint-disable @next/next/no-img-element */}

import * as motion from "motion/react-client"
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header(){
  return(
    <>
      <motion.div   
        className="box backdrop-blur-lg sm:rounded-lg absolute top-0 left-0 sm:top-5 sm:left-5 px-4 sm:pt-1.5 pt-3 pb-3 border-b sm-border w-full sm:w-[400px] z-10000"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 2}}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              aria-label="Home Button" 
              className="hover:opacity-80 transition-opacity flex items-center gap-3"
            >
              <img src="/blazer.png" alt="Logo" className="max-w-12 sm:max-w-14 sm:py-2"/>
              <p className="font-semibold sm:text-4xl text-3xl tracking-tight">
                back2<span className="text-red-500">blazers</span>
              </p>
            </Link>
          </div>
          <p className="italic tracking-tight sm:tracking-tighter opacity-70 text-sm">
            finding and bringing back lost items for blazer students! <br/>
            @ Montgomery Blair High School
          </p>
        </div>
        {/* <hr className="mt-3"/> */}
      </motion.div>
      <div 
        className="absolute top-33 sm:block sm:top-5 sm:left-[405px] z-10000 w- px-5"
      >
        <div className="sm:w-[calc(100vw-430px)] w-[calc(100vw-40px)] flex justify-between">
          <motion.div
            initial={{ x: -25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.5}}
          >
            <ThemeToggle/>
          </motion.div>
          <motion.div
            initial={{ x: 25, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.9}}
          >
            
          </motion.div>
        </div>
      </div>
    </>
  );
}
