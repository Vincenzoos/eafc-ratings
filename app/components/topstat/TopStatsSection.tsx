"use client";

import { use, useMemo } from "react";
import { Player } from "../../types/player";
import Image from "next/image";
import TopStatCard from "./TopStatCard";

interface TopStatsSectionProps {
    playersPromise: Promise<Player[]>;
}

// Define categories for top stat
const CATEGORIES = [
    { title: "Fastest Players", stat: "pac", label: "PAC" },
    { title: "Best Shooters", stat: "sho", label: "SHO" },
    { title: "Best Passers", stat: "pas", label: "PAS" },
    { title: "Best Dribblers", stat: "dri", label: "DRI" },
    { title: "Best Defensive Players", stat: "def", label: "DEF" },
    { title: "Most Physical Players", stat: "phy", label: "PHY" },
];

export default function TopStatsSection({ playersPromise }: TopStatsSectionProps) {
    // Unpack list of players from api
    const players = use(playersPromise);

    // Limit number of results displayed
    const TOP_N = 5

    // Create a Record of top players for each stat
    // Record: a typed dictionary/map
    // e.g. {"Best Shooters": [Kane, etc], "Fastest Players": [Mbappe, etc]}
    const topPlayers = useMemo(() => {
        const result: Record<string, Player[]> = {};

        CATEGORIES.forEach((cat) => {
            const sorted = [...players]
                // Sort by the stat value in descending order
                .sort((a, b) => {
                    const statA = a.stats[cat.stat].value;
                    const statB = b.stats[cat.stat].value;
                    // Secondary sort by overall rating if stats are equal
                    if (statA === statB) {
                        return b.overallRating - a.overallRating;
                    }
                    return statB - statA;
                });
            // Only take top 5 result for display
            result[cat.stat] = sorted.slice(0, TOP_N);
        });
        return result;
    }, [players]);

    return (
        <section className="w-full bg-black text-white py-10 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CATEGORIES.map((cat) => (
                    <TopStatCard
                        key={cat.stat}
                        title={cat.title}
                        label={cat.label}
                        players={topPlayers[cat.stat]}
                        onView={() => {
                            // placeholder - you can navigate or open a modal here
                            console.log(`View ${cat.title}`);
                        }}
                    />
                ))}
            </div>
        </section>
    );
}