import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LayerFunctionProps } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addSource({mapRef, layer} : LayerFunctionProps){
  mapRef.current?.addSource(layer.name, {
    type: "geojson",
    data: layer.data
  }) 
}
export function addFill({mapRef, layer}: LayerFunctionProps){
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

export function addSymbol({mapRef, layer} : LayerFunctionProps){
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