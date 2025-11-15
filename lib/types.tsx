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

export interface FoundItem {
  approved: boolean;
  claimed: boolean;
  image_url: string;
  location: string;
  description: string;
}

export interface PendingItems extends FoundItem {
  id: number;
} 