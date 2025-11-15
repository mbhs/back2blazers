import { MapComponentProps } from '@/lib/types';
import { PiMapPinAreaFill } from 'react-icons/pi';

export default function RecenterButton({ mapRef }: MapComponentProps){
  return (
    <button 
      aria-label="Recenter Map Button" 
      className="button px-2 py-2 sm:px-5 rounded-lg backdrop-blur-lg border text-center my-5 cursor-pointer flex flex-row gap-2 items-center"
      onClick={() => {
        mapRef.current?.flyTo({ center: [-77.01150, 39.01800], zoom: 18, speed: 2, pitch:0, bearing:180})
      }}
    >
      <p className="hidden sm:block">Recenter Map</p>
      <PiMapPinAreaFill />
    </button>
  )
}
