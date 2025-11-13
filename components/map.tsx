"use client";

import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LayerType } from '@/lib/types';
import RecenterButton from './recenter-button';


export function Map(){
  const [layers, setLayers] = useState<LayerType[]>()
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(()=> {
    if (!layers) return
    for (let i: number = 0; i < layers.length; i++){
      mapRef.current?.addSource(layers[i].name, {
        type: "geojson",
        data: layers[i].data
      })
      mapRef.current?.addLayer({
        id: layers[i].name,
        type: 'fill',
        source: layers[i].name,
        layout: {
          "text-field": ["get", "room"],
          "text-font": ["Open Sans Bold"],
          "text-size": 14,
          "text-offset": [0, 1.5],
          "text-anchor": "bottom",   
        },
        paint: {
          "text-color": "#111",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
          "fill-color": ["get", "fill"],
          "fill-opacity": 0.5
        }
      })
    }
  }, [layers])

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS;
    mapRef.current = new mapboxgl.Map({
      container: 'map', 
      style: 'mapbox://styles/mapbox/standard?optimize=true',
      projection: 'globe',
      zoom: 13,
      center: [-77.01150, 39.01800],
      config: {
        basemap: {
          show3dObjects: false
        }
      }
    })
    
    mapRef.current.on('style.load', () => {
      mapRef.current?.setFog({})
      mapRef.current?.flyTo({ center: [-77.01150, 39.01800], zoom: 18, speed: 0.5, pitch:0, bearing:180})
    })

    fetch(`/api/datasets`)
      .then(r => r.json())
      .then(r => setLayers(r))
  }, [])

  return (
    <>
      <div id="map" className="w-full h-full"/>
      <RecenterButton mapRef={mapRef} />
    </>
  )
}