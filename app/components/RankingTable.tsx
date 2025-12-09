"use client"
import { Suspense, use } from "react";
import { Player } from "../types/player";

interface RankingTableProps {
    playersPromise: Promise<Player[]>
}
export default function RankingTable(
    { playersPromise }: RankingTableProps
) {
    // Use the 'use' hook to unwrap the promise and get the actual data
    const players = use(playersPromise);
    return (
        // Suspense shows "placeholder" content when data loading, swaps to real content when data ready
        <Suspense fallback={<p>Loading...</p>}>
            <p>Total players: {players.length}</p>
            <ol className="list-decimal">
                {players.map((player: Player) => (
                    <li key={player.id}>
                        {player.firstName} {player.lastName} - Rating: {player.overallRating}
                    </li>
                ))}
            </ol>
        </Suspense>
    )
}