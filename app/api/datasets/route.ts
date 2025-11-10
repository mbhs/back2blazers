import { LayerType } from '@/lib/types'
// import { cacheTag } from 'next/cache'
 
async function getLayers() {
  // 'use cache'
  // cacheTag('layers')
 
  const layers = await fetchLayers()
  return layers
}
 
async function fetchLayers(){
  return await fetch(
    `https://api.mapbox.com/datasets/v1/${process.env.MAPBOX_USER}?access_token=${process.env.MAPBOX_DATASET_ACCESS}`
  )
    .then(res => res.json())
    .then(async res => await Promise.all(
      res.map(
        async ({id, name} : {id:string, name:string}) => {
          return {
            name,
            data:
              await fetch(
               `https://api.mapbox.com/datasets/v1/${process.env.MAPBOX_USER}/${id}/features?access_token=${process.env.MAPBOX_DATASET_ACCESS}`
              ).then(res => res.json())
          }
        }
      )
    )
  )
}

export async function GET() {
  const layers : LayerType[] = await getLayers()
  return Response.json(layers)
}