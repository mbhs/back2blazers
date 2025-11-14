import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LayerFunctionProps } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function showLayer({mapRef, layer} : LayerFunctionProps){
  
  mapRef.current?.getStyle().layers.forEach((mapLayer) => {
    if (!mapLayer.id.endsWith("-fill") && !mapLayer.id.endsWith("-symbol")) return;
    mapRef.current?.setLayoutProperty(mapLayer.id, 'visibility', 'none')
  })
  mapRef.current?.setLayoutProperty(`${layer.name}-fill`, 'visibility', 'visible')
  mapRef.current?.setLayoutProperty(`${layer.name}-symbol`, 'visibility', 'visible')
}

export function addLayer({mapRef, layer} : LayerFunctionProps){
  addFill({mapRef, layer})
  addSymbol({mapRef, layer})
}

export function addSource({mapRef, layer} : LayerFunctionProps){
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
      'symbol-placement': 'point'
    },
    paint: {
      "text-color": "#111",
      "text-halo-color": "#fff",
      "text-halo-width": 1,
    }
  })
}