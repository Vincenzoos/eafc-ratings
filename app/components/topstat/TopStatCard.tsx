"use client";

import { Player } from "@/app/types/player";
import Image from "next/image";

type Props = {
    title: string;
    label: string;
    players?: Player[]; // top players for this stat
    onView?: () => void;
};

export default function TopStatCard({ title, label, players = [], onView }: Props) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-white">{title}</h3>
            <div className="flex-1 space-y-4 mb-6">
                {players.map((player) => (
                    <div
                        key={player.id}
                        className="flex items-center justify-between group cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 overflow-hidden">
                                <Image
                                    src={player.avatarUrl}
                                    alt={player.commonName || player.lastName}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm text-zinc-100 group-hover:text-white">
                                    {player.commonName || `${player.firstName} ${player.lastName}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{label}</span>
                            <span className="text-xl font-bold text-white leading-none">
                                {player.stats?.[label.toLowerCase()]?.value ?? player.stats?.[label.toLowerCase()]?.value}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={onView}
                className="w-full py-2 rounded-full border border-green-500 text-white font-semibold text-sm hover:bg-green-500 hover:text-black transition-all duration-200"
            >
                View {title}
            </button>
        </div>
    );
}