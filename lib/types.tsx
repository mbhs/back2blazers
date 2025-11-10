export interface LayerType {
  "name" : string
  "data" : {
    "type": string,
    "features": {
        "type": string,
        "properties": {
          "stroke": string,
          "stroke-width": number,
          "stroke-opacity": number,
          "fill": string,
          "room": string
        },
        "geometry": {
          "coordinates": number[][],
          "type": string
        },
        "id": number
    }[],
  }
}