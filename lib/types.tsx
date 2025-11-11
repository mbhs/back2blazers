import type { FeatureCollection, Geometry, GeoJsonProperties } from 'geojson';

export interface LayerType {
  "name" : string
  "data" : FeatureCollection<Geometry, GeoJsonProperties>
}