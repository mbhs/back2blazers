export const runtime = 'edge'

async function getLayers() {
  const layers = await fetchLayers()
  return layers
}
 
async function fetchLayers(){
  return await fetch(
    `https://api.mapbox.com/datasets/v1/${process.env.MAPBOX_USER}?access_token=${process.env.MAPBOX_DATASET_ACCESS}`
  )
    .then(res => res.json())
    .then(res => 
      res.sort(
        (a: {id: string, name:string}, b: {id: string, name:string}) => 
          a.name.localeCompare(b.name)
      )
    )
    .then(async res =>
      await Promise.all(
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
  const layers = await getLayers()
  return Response.json(layers)
}