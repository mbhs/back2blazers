"use client";

import mapboxgl from 'mapbox-gl';
import { RefObject, useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { LayerType } from '@/lib/types';
import RecenterButton from './recenter-button';

interface LayerFunctionProps {
  mapRef: RefObject<mapboxgl.Map | null>,
  layer: LayerType
}

function addSource({mapRef, layer} : LayerFunctionProps){
  mapRef.current?.addSource(layer.name, {
    type: "geojson",
    data: layer.data
  }) 
}
function addFill({mapRef, layer}: LayerFunctionProps){
  mapRef.current?.addLayer({
    id: `${layer.name}-fill`,
    type: 'fill',
    source: layer.name,
    paint: {
      "fill-color": ["get", "fill"],
      "fill-opacity": 0.5
    }
  })
}

function addSymbol({mapRef, layer} : LayerFunctionProps){
  mapRef.current?.addLayer({
    id: `${layer.name}-symbol`,
    type: 'symbol',
    source: layer.name,
    layout: {
      "text-field": ["get", "room"],
      "text-font": ["Open Sans Bold"],
      "text-size": 14,
    },
    paint: {
      "text-color": "#111",
      "text-halo-color": "#fff",
      "text-halo-width": 1,
    }
  })
}

export function Map(){
  const [layers, setLayers] = useState<LayerType[]>()
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(()=> {
    if (!layers) return
    layers.forEach((layer) => {      
      addSource({mapRef, layer})
      addFill({mapRef, layer})
      addSymbol({mapRef, layer})
    })
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
      fetch(`/api/datasets`)
        .then(r => r.json())
        .then(r => setLayers(r))
    })
  }, [])

  return (
    <>
      <div id="map" className="w-full h-full"/>
      <RecenterButton mapRef={mapRef} />
    </>
  )
}