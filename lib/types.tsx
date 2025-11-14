import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';
import { RefObject } from 'react';

export interface LayerType {
  "name" : string
  "data" : FeatureCollection<Geometry, GeoJsonProperties>
}

export interface MapComponentProps {
  mapRef: RefObject<mapboxgl.Map | null>
}

export interface LayerFunctionProps {
  mapRef: RefObject<mapboxgl.Map | null>,
  layer: LayerType
}