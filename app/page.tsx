import { getPlayers } from "./services/ApiService";
import TanstackRankingTable from "./components/TanstackRankingTable";

export default function Home() {
  // Fetch data from api
  const playersPromise = getPlayers();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>EAFC Ratings</h1>

      <div className="flex flex-col items-center">
        <TanstackRankingTable playersPromise={playersPromise} />
      </div>
    </div>
  );
}

