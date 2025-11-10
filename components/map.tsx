"use client";

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as motion from 'motion/react-client'
import { LayerType } from '@/lib/types';

export function Map(){
  const [layers, setLayers] = useState<LayerType[]>()
  const mapRef = useRef<mapboxgl.Map | null>(null);
  
  useEffect(() => {
    fetch(`/api/datasets`)
      .then(r => r.json())
      .then(r => setLayers(r))
  }, [])

  useEffect(()=> {
    console.log(layers)
  })

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS;
    mapRef.current = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/standard?optimize=true',
      projection: 'globe',
      zoom: 13,
      center: [-77.01172, 39.01809],
      config: {
        basemap: {
          show3dObjects: false
        }
      }
    })
    
    mapRef.current.on('style.load', () => {
      mapRef.current?.setFog({})
      mapRef.current?.flyTo({ center: [-77.01172, 39.01809], zoom: 18, speed: 0.5})
    })
  }, [])

  return (
    <>
      <div id="map" className="w-full h-full"/>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1}}
        className="absolute bottom-0 left-0 right-0 z-10000 w-fit mx-auto px-5 max-w-full overflow-hidden" 
        onClick={() => {(
          mapRef.current?.flyTo({ center: [-77.01172, 39.01809], zoom: 18, speed: 2, pitch:0, bearing:0})
        )}}
      >
        <button aria-label="Recenter Map Button" className="button px-8 py-2 rounded-xl backdrop-blur-lg border text-center mx-5 my-5 cursor-pointer">
          Recenter Map
        </button>
      </motion.div>
    </>
  )
}