import { LayerType, MapComponentProps } from '@/lib/types';
import { FaLayerGroup } from 'react-icons/fa6';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { showLayer } from '@/lib/utils';

interface FloorSelectProps extends MapComponentProps{
  layers: LayerType[] | undefined;
}

export default function FloorSelect({layers, mapRef }: FloorSelectProps){
  if (!layers) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Floor Selector Menu Button" 
        className="button px-2 py-2 sm:px-4 rounded-lg backdrop-blur-lg border text-center my-5 cursor-pointer flex flex-row gap-2 items-center"
      >
        <p className="hidden sm:block">Floor Select</p>
        <FaLayerGroup />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="box backdrop-blur-lg">
        {
          layers.map((layer) => (
            <DropdownMenuItem
              key={layer.name}
              onClick={() => showLayer({mapRef, layer})}
            >
              {layer.name}
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
