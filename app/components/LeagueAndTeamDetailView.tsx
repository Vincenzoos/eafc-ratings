"use client"
import { ChevronLeft, ChevronDown, ChevronUp, Shield, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { TEAM_OPTIONS } from "../types/filters";

interface LeagueAndTeamDetailViewProps {
    selectedTeams: string[];
    onToggleTeam: (teamId: string) => void;
    onBack: () => void;
    onReset: () => void;
    onApply: () => void;
}


const TeamItem = ({ team, isSelected, onToggle }: { team: typeof TEAM_OPTIONS[0], isSelected: boolean, onToggle: (id: string) => void }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <label className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                    {imgError ? (
                        <Shield className="w-4 h-4 text-gray-500" />
                    ) : (
                        <Image
                            src={team.logo}
                            alt={team.name}
                            width={24}
                            height={24}
                            onError={() => setImgError(true)}
                        />
                    )}
                </div>
                <span className="text-gray-300 group-hover:text-white">{team.name}</span>
            </div>
            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-500'
                }`}>
                {isSelected && <span className="text-black text-xs font-bold"><Check className="w-4 h-4" /></span>}
            </div>
            <input
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => onToggle(team.id)}
            />
        </label>
    );
};
export default function LeagueAndTeamDetailView({
    selectedTeams,
    onToggleTeam,
    onBack,
    onReset,
    onApply
}: LeagueAndTeamDetailViewProps) {
    const [teamsExpanded, setTeamsExpanded] = useState(true);
    const [leaguesExpanded, setLeaguesExpanded] = useState(false);

    // Helper to check if all visible teams in a section are selected
    const areAllSelected = (teams: typeof TEAM_OPTIONS) => {
        return teams.every(team => selectedTeams.includes(team.id));
    };

    // Helper to toggle all teams in a section
    const toggleAll = (teams: typeof TEAM_OPTIONS) => {
        const allSelected = areAllSelected(teams);
        teams.forEach(team => {
            if (allSelected) {
                // If all are selected, remove them if they are in the list
                if (selectedTeams.includes(team.id)) {
                    onToggleTeam(team.id);
                }
            } else {
                // If not all are selected, add the missing ones
                if (!selectedTeams.includes(team.id)) {
                    onToggleTeam(team.id);
                }
            }
        });
    };

    return (
        <div className="absolute inset-0 bg-zinc-900 z-10 flex flex-col">
            {/* Detail View Header */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-700">
                <button
                    onClick={onBack}
                    className="flex items-center justify-center w-10 h-10 rounded-full hover:cursor-pointer text-white hover:bg-gray-700 transition-colors"
                >
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-white text-xl font-semibold">Leagues & Teams</h2>
            </div>

            {/* Selection Count Banner */}
            {selectedTeams.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 bg-zinc-800 border-b border-gray-700">
                    <span className="text-white text-sm">
                        {selectedTeams.length} Selection{selectedTeams.length !== 1 ? 's' : ''} Applied
                    </span>
                    <button
                        onClick={onReset}
                        className="text-sm text-white underline hover:text-gray-300 transition"
                    >
                        Reset
                    </button>
                </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                    <h3 className="text-white font-bold mb-4">Most Searched</h3>

                    {/* Teams Section */}
                    <div className="mb-2">
                        <button
                            onClick={() => setTeamsExpanded(!teamsExpanded)}
                            className="flex items-center justify-between w-full text-gray-400 text-sm uppercase font-semibold mb-2 hover:text-white"
                        >
                            <span>Teams</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs">{TEAM_OPTIONS.length} TEAMS</span>
                                {teamsExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </button>

                        {teamsExpanded && (
                            <div className="space-y-1">
                                {/* Select All */}
                                <label className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 cursor-pointer group">
                                    <span className="text-gray-300 group-hover:text-white">Select All</span>
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${areAllSelected(TEAM_OPTIONS) ? 'bg-green-500 border-green-500' : 'border-gray-500'
                                        }`}>
                                        {areAllSelected(TEAM_OPTIONS) && <span className="text-black text-xs font-bold"><Check className="w-4 h-4" /></span>}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={areAllSelected(TEAM_OPTIONS)}
                                        onChange={() => toggleAll(TEAM_OPTIONS)}
                                    />
                                </label>

                                {TEAM_OPTIONS.map(team => (
                                    <TeamItem
                                        key={team.id}
                                        team={team}
                                        isSelected={selectedTeams.includes(team.id)}
                                        onToggle={onToggleTeam}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Leagues Placeholder */}
                    <div className="mb-6 border-b border-gray-700 pb-4">
                        <button
                            onClick={() => { setLeaguesExpanded(!leaguesExpanded) }}

                            className="flex items-center justify-between w-full text-gray-400 text-sm uppercase font-semibold hover:text-white">
                            <span>Leagues</span>
                            <div className="flex items-center gap-2">
                                <span className="text-xs">5 LEAGUES</span>
                                {leaguesExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </div>
                        </button>
                        {leaguesExpanded && (
                            <div className="pt-4 text-gray-400 text-sm">
                                {/* Add league options here */}
                                <p>Filter options coming soon...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-700 flex gap-3">
                <button
                    onClick={onReset}
                    className="flex-1 px-4 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 transition font-medium"
                >
                    Reset Filters
                </button>
                <button
                    onClick={onApply}
                    className="flex-1 px-4 py-3 bg-green-500 text-black rounded-full hover:bg-green-600 transition font-semibold"
                >
                    Apply Filters
                </button>
            </div>
        </div >
    );
}
