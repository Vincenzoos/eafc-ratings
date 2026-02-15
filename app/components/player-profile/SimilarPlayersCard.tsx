import { Player } from "@/app/types/player";
import Link from "next/link";

interface SimilarPlayersCardProps {
    title: string;
    icon: React.ReactNode;
    players: Player[];
    viewLabel: string;
}

export default function SimilarPlayersCard({ title, icon, players, viewLabel }: SimilarPlayersCardProps) {
    if (players.length === 0) return null;

    return (
        <div className="bg-[#252525] border border-gray-700 rounded-xl p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                {icon}
                <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
            <div className="flex-1 space-y-4 mb-6">
                {players.map((p) => (
                    <Link key={p.id} href={`/player-profile/${p.id}`}>
                        <div className="flex items-center justify-between group cursor-pointer hover:bg-[#85858534] p-2 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <img
                                    src={p.avatarUrl}
                                    alt={p.commonName || `${p.firstName} ${p.lastName}`}
                                    className="w-10 h-10 object-contain"
                                />
                                <span className="font-bold text-sm text-zinc-100 group-hover:text-white">
                                    {p.commonName || `${p.firstName} ${p.lastName}`}
                                </span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">OVR</span>
                                <span className="text-xl font-bold text-white leading-none">{p.overallRating}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <button
                type="button"
                className="w-full py-2 rounded-full border border-green-500 text-white font-semibold text-sm hover:bg-green-500 hover:text-black transition-all duration-200"
            >
                View {viewLabel}
            </button>
        </div>
    );
}
