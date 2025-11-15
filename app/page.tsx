import { Header } from "@/components/overhead/header";
import { Map } from "@/components/map/map";

export default function Home() {
  return (
    <div className="w-screen h-dvh relative overflow-hidden">
      <Map/>
      <Header/>
    </div>
  );
}
