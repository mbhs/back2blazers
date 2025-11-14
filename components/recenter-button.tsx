"use client";

import mapboxgl from 'mapbox-gl';
import { RefObject } from 'react';
import * as motion from 'motion/react-client'
import { FaMapPin } from 'react-icons/fa6';

interface RecenterButtonProps {
  mapRef: RefObject<mapboxgl.Map | null>
}

export default function RecenterButton({ mapRef }: RecenterButtonProps){
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1}}
      className="absolute bottom-0 left-0 right-0 z-10000 w-fit mx-auto px-5 max-w-full overflow-hidden" 
      onClick={() => {
        mapRef.current?.flyTo({ center: [-77.01150, 39.01800], zoom: 18, speed: 2, pitch:0, bearing:180})
      }}
    >
      <button 
        aria-label="Recenter Map Button" 
        className="button px-2 py-2 sm:px-8 rounded-full backdrop-blur-lg border text-center mx-5 my-5 cursor-pointer"
      >
        <p className="hidden sm:block">Recenter Map</p>
        <FaMapPin className="sm:hidden"/>
      </button>
    </motion.div>
  )
}
