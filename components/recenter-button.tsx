"use client";

import { MapComponentProps } from '@/lib/types';
import { FaMapPin } from 'react-icons/fa6';

export default function RecenterButton({ mapRef }: MapComponentProps){
  return (
    <button 
      aria-label="Recenter Map Button" 
      className="button px-2 py-2 sm:px-8 rounded-full backdrop-blur-lg border text-center mx-5 my-5 cursor-pointer"
      onClick={() => {
        mapRef.current?.flyTo({ center: [-77.01150, 39.01800], zoom: 18, speed: 2, pitch:0, bearing:180})
      }}
    >
      <p className="hidden sm:block">Recenter Map</p>
      <FaMapPin className="sm:hidden"/>
    </button>
  )
}
