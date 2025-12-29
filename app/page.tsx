import { getPlayers } from "./services/ApiService";
import TanstackRankingTable from "./components/TanstackRankingTable";
import Image from "next/image";
import SearchBar from './components/SearchBar';

export default function Home() {
  // Fetch data from api
  const playersPromise = getPlayers();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <Image src="/eafc-logo.png" alt="EAFC Logo" width={400} height={400} className="mx-auto mb-6" />
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">FC Player Ratings Reveal</h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8">Explore the complete Ratings and PlayStyles for the 17,000+ players available in EA SPORTS FC™.</p>

          <SearchBar />
        </div>
      </section>

      <div className="w-full">
        <TanstackRankingTable playersPromise={playersPromise} />
      </div>
    </div>
  );
}

