import { getPlayerById, getPlayers } from "@/app/services/ApiService";
import PlayerProfile from "@/app/components/player-profile/PlayerProfile";

export default async function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [player, allPlayers] = await Promise.all([
        getPlayerById(id),
        getPlayers()
    ]);

    if (!player) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <h1 className="text-2xl">Player not found</h1>
            </div>
        );
    }

    return <PlayerProfile player={player} allPlayers={allPlayers} />;
}