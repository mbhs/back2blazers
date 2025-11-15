"use client";

import * as motion from 'motion/react-client'
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LayerType } from '@/lib/types';
import RecenterButton from './recenter-button';
import { addSource, addLayer } from '@/lib/utils';
import FloorSelect from './floor-select';

export function Map(){
  const [layers, setLayers] = useState<LayerType[]>()
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(()=> {
    if (!layers) return
    layers.forEach((layer) => {      
      addSource({mapRef, layer})
      addLayer({mapRef, layer})
      if (!layer.name.toLocaleLowerCase().includes("floor one")){
        mapRef.current?.setLayoutProperty(`${layer.name}-fill`, 'visibility', 'none')
        mapRef.current?.setLayoutProperty(`${layer.name}-symbol`, 'visibility', 'none')
      }
    })
  }, [layers])

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS;
    mapRef.current = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/standard?optimize=true',
      projection: 'globe',
      zoom: 13,
      center: [-77.02150, 39.01800],
      bearing: 90,
      config: {
        basemap: {
          show3dObjects: false
        }
      }
    })
    
    mapRef.current.on('style.load', () => {
      mapRef.current?.setFog({})
      mapRef.current?.flyTo({ center: [-77.01150, 39.01800], zoom: 18, speed: 0.5, pitch:0, bearing:180})
      fetch(`/api/datasets`)
        .then(r => r.json())
        .then(r => setLayers(r))
    })
  }, [])

  return (
    <>
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1}}
        className="absolute bottom-0 left-0 sm:right-0 z-10000 sm:w-fit mx-auto px-5 max-w-full overflow-hidden flex flex-row gap-2" 
      >
        <RecenterButton mapRef={mapRef} />
        <FloorSelect mapRef={mapRef} layers={layers} />
      </motion.div>
      <div id="map" className="w-full h-full"/>
    </>
  )
}