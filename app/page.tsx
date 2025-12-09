import { getPlayers } from "./services/ApiService";
import RankingTable from "./components/RankingTable";

export default function Home() {
  // Fetch data from api
  const players = getPlayers();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="">EAFC Ratings</h1>

      {/* pass as props to children */}
      <RankingTable playersPromise={players}></RankingTable>
    </div>
  );
}

