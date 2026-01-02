import { Player } from "@/app/types/player";
import Link from "next/link";
import SimilarPlayersCard from "./SimilarPlayersCard";
import { ArrowRight, ChevronRight } from "lucide-react";

interface PlayerProfileProps {
    player: Player;
    allPlayers: Player[];
}

const STAT_GROUPS = [
    {
        name: "Pace",
        key: "pac",
        subStats: [
            { label: "Acceleration", key: "acceleration" },
            { label: "Sprint Speed", key: "sprintSpeed" },
        ],
    },
    {
        name: "Shooting",
        key: "sho",
        subStats: [
            { label: "Positioning", key: "positioning" },
            { label: "Finishing", key: "finishing" },
            { label: "Shot Power", key: "shotPower" },
            { label: "Long Shots", key: "longShots" },
            { label: "Volleys", key: "volleys" },
            { label: "Penalties", key: "penalties" },
        ],
    },
    {
        name: "Passing",
        key: "pas",
        subStats: [
            { label: "Vision", key: "vision" },
            { label: "Crossing", key: "crossing" },
            { label: "Free Kick Accuracy", key: "freeKickAccuracy" },
            { label: "Short Passing", key: "shortPassing" },
            { label: "Long Passing", key: "longPassing" },
            { label: "Curve", key: "curve" },
        ],
    },
    {
        name: "Dribbling",
        key: "dri",
        subStats: [
            { label: "Agility", key: "agility" },
            { label: "Balance", key: "balance" },
            { label: "Reactions", key: "reactions" },
            { label: "Ball Control", key: "ballControl" },
            { label: "Dribbling", key: "dribbling" },
            { label: "Composure", key: "composure" },
        ],
    },
    {
        name: "Defending",
        key: "def",
        subStats: [
            { label: "Interceptions", key: "interceptions" },
            { label: "Heading Accuracy", key: "headingAccuracy" },
            { label: "Def Awareness", key: "defensiveAwareness" },
            { label: "Standing Tackle", key: "standingTackle" },
            { label: "Sliding Tackle", key: "slidingTackle" },
        ],
    },
    {
        name: "Physicality",
        key: "phy",
        subStats: [
            { label: "Jumping", key: "jumping" },
            { label: "Stamina", key: "stamina" },
            { label: "Strength", key: "strength" },
            { label: "Aggression", key: "aggression" },
        ],
    },
];

export default function PlayerProfile({ player, allPlayers }: PlayerProfileProps) {
    const age = new Date().getFullYear() - new Date(player.birthdate).getFullYear();
    const description = `${player.commonName || `${player.firstName} ${player.lastName}`}'s overall rating in EA SPORTS FC™ 26 is ${player.overallRating}. ${player.commonName || player.lastName} is a professional footballer from ${player.nationality.label} who plays as a ${player.position.label} (${player.position.shortLabel}) for ${player.team.label}.${player.playerAbilities?.length > 0 ? ` ${player.commonName || player.lastName} has the ${player.playerAbilities[0].label} PlayStyle+ ability` : ""}`;

    // Get similar players based on position (exclude current player)
    const similarByPosition = allPlayers
        .filter(p => p.id !== player.id && p.position.id === player.position.id)
        .sort((a, b) => b.overallRating - a.overallRating)
        .slice(0, 3);

    // Get similar players based on nation (exclude current player)
    const similarByNation = allPlayers
        .filter(p => p.id !== player.id && p.nationality.id === player.nationality.id)
        .sort((a, b) => b.overallRating - a.overallRating)
        .slice(0, 3);

    // Get similar players based on team (exclude current player)
    const similarByTeam = allPlayers
        .filter(p => p.id !== player.id && p.team.id === player.team.id)
        .sort((a, b) => b.overallRating - a.overallRating)
        .slice(0, 3);

    return (
        <div className="bg-[#1a1a1a] text-white min-h-screen p-8 font-sans">
            <div className="max-w-7xl mx-auto mt-4">
                {/* Breadcrumb */}
                <div className="mb-8 text-gray-400 text-sm">
                    <Link href="/" className="hover:text-white">Home</Link> <ChevronRight className="inline-block w-5 h-5" /> <span className="text-white ml-2">{player.commonName || `${player.firstName} ${player.lastName}`}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Card & Info */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        {/* Player Card Image */}
                        <div className="relative w-full flex justify-center">
                            <img src={player.shieldUrl} alt={player.commonName || ""} className="w-full max-w-[300px] object-contain" />
                        </div>

                        {/* Basic Info Box */}
                        <div className="bg-[#2a2a2a] p-4 rounded-lg border border-gray-700">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <div className="text-gray-400 text-xs uppercase">Position</div>
                                    <div className="font-bold bg-gray-700 inline-block px-2 py-0.5 rounded text-xs mt-1">{player.position.shortLabel}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase">Weak Foot</div>
                                    <div className="flex text-yellow-400 text-xs mt-1">
                                        {"★".repeat(player.weakFootAbility)}{"☆".repeat(5 - player.weakFootAbility)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase">Skill Moves</div>
                                    <div className="flex text-yellow-400 text-xs mt-1">
                                        {"★".repeat(player.skillMoves)}{"☆".repeat(5 - player.skillMoves)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase">Preferred Foot</div>
                                    <div className="font-bold mt-1">{player.preferredFoot === 2 ? "Left" : "Right"}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase">Height</div>
                                    <div className="font-bold mt-1">{player.height}cm / {Math.floor(player.height / 30.48)}'{Math.round((player.height % 30.48) / 2.54)}"</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase">Weight</div>
                                    <div className="font-bold mt-1">{player.weight}kg / {Math.round(player.weight * 2.20462)}lb</div>
                                </div>
                                {player.alternatePositions && player.alternatePositions.length > 0 && (
                                    <div className="col-span-2">
                                        <div className="text-gray-400 text-xs uppercase">Alt Positions</div>
                                        <div className="flex gap-2 mt-1">
                                            {player.alternatePositions.map(pos => (
                                                <span key={pos.id} className="bg-gray-700 px-2 py-0.5 rounded text-xs font-bold">{pos.shortLabel}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats & Details */}
                    <div className="lg:col-span-9 flex flex-col gap-8">
                        {/* Header */}
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{player.firstName}</h2>
                            <h1 className="text-6xl font-black mb-6 leading-none">{player.lastName}</h1>
                        </div>

                        {/* Stats Grid */}
                        <div className="bg-[#2a2a2a] p-8 rounded-lg border border-gray-700">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-8">
                                {STAT_GROUPS.map(group => (
                                    <div key={group.key}>
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-bold text-lg">{group.name}</h3>
                                            <span className={`font-bold text-xl text-white`}>{player.stats[group.key]?.value ?? "-"}</span>
                                        </div>
                                        <div className="space-y-3">
                                            {group.subStats.map(sub => {
                                                const value = player.stats[sub.key]?.value ?? 0;
                                                let colorClass = "bg-red-500";
                                                if (value >= 80) colorClass = "bg-green-500";
                                                else if (value >= 70) colorClass = "bg-orange-500";
                                                else if (value >= 50) colorClass = "bg-yellow-500";
                                                else colorClass = "bg-red-400";

                                                return (
                                                    <div key={sub.key}>
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span className="text-gray-400">{sub.label}</span>
                                                            <span className="font-bold">{value}</span>
                                                        </div>
                                                        <div className="h-1 w-full bg-gray-700 rounded overflow-hidden">
                                                            <div
                                                                className={`h-full rounded ${colorClass}`}
                                                                style={{ width: `${value}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* PlayStyles */}
                        {player.playerAbilities && player.playerAbilities.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {player.playerAbilities.map(ability => (
                                    <div key={ability.id} className="bg-[#2a2a2a] p-4 rounded-lg border border-gray-700 flex items-start gap-3">
                                        <img src={ability.imageUrl} alt={ability.label} className="w-10 h-10 object-contain" />
                                        <div>
                                            <h4 className="font-bold text-sm">{ability.label}</h4>
                                            <p className="text-xs text-gray-400 mt-1 leading-tight">{ability.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Description & Footer Info */}
                        <div className="bg-[#2a2a2a] rounded-lg border border-gray-700 overflow-hidden">
                            <div className="p-6 border-b border-gray-700">
                                <h3 className="font-bold text-lg mb-2">{player.commonName || `${player.firstName} ${player.lastName}`}'s overall rating in EA SPORTS FC™ is {player.overallRating}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {description}
                                </p>
                            </div>
                            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#252525]">
                                <div>
                                    <div className="text-gray-400 text-xs uppercase mb-1">Age</div>
                                    <div className="font-bold text-lg">{age}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase mb-1">Nation</div>
                                    <div className="font-bold text-lg flex items-center gap-2">
                                        <img src={player.nationality.imageUrl} alt={player.nationality.label} className="w-8 h-5 object-cover rounded-sm" />
                                        {player.nationality.label}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase mb-1">League</div>
                                    <div className="font-bold text-lg">{player.leagueName}</div>
                                </div>
                                <div>
                                    <div className="text-gray-400 text-xs uppercase mb-1">Team</div>
                                    <div className="font-bold text-lg flex items-center gap-2">
                                        <img src={player.team.imageUrl} alt={player.team.label} className="w-8 h-8 object-contain" />
                                        {player.team.label}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Similar Players section*/}
                        {(similarByPosition.length > 0 || similarByNation.length > 0 || similarByTeam.length > 0) && (
                            <div>
                                <h3 className="text-2xl font-bold mb-6">Similar Players</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* By Position */}
                                    <SimilarPlayersCard
                                        title={player.position.label}
                                        icon={<span className="bg-gray-700 px-2 py-0.5 rounded text-xs font-bold">{player.position.shortLabel}</span>}
                                        players={similarByPosition}
                                        viewLabel={player.position.label}
                                    />

                                    {/* By Nation */}
                                    <SimilarPlayersCard
                                        title={player.nationality.label}
                                        icon={<img src={player.nationality.imageUrl} alt={player.nationality.label} className="w-6 h-4 object-cover rounded-sm" />}
                                        players={similarByNation}
                                        viewLabel={player.nationality.label}
                                    />

                                    {/* By Team */}
                                    <SimilarPlayersCard
                                        title={player.team.label}
                                        icon={<img src={player.team.imageUrl} alt={player.team.label} className="w-6 h-6 object-contain" />}
                                        players={similarByTeam}
                                        viewLabel={player.team.label}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}