import { Header } from "@/components/header";
import { Map } from "@/components/map";

export default function Home() {
  return (
    <div className="w-screen h-dvh relative overflow-hidden">
      <Map/>
      <Header/>
    </div>
  );
}
