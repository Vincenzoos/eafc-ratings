"use client"

import { SlidersVertical, X } from "lucide-react";
import { GenderFilter, SortOption, TEAM_OPTIONS, NATION_OPTIONS } from "../../types/filters";

interface FilterBarProps {
    onFilterClick: () => void;
    resultsCount: number;
    onResetAll: () => void;
    activeTab: GenderFilter;
    sortBy: SortOption;
    selectedPositions: string[];
    selectedTeams?: string[];
    selectedNations?: string[];
    onRemoveFilter: (filterType: "tab" | "sort" | "position" | "team" | "nation", filterId?: string) => void;
}

export default function FilterBar({ onFilterClick, resultsCount, onResetAll, activeTab, sortBy, selectedPositions, selectedTeams = [], selectedNations = [], onRemoveFilter }: FilterBarProps) {
    const showTags = activeTab !== "all" || sortBy !== "rank" || selectedPositions.length > 0 || selectedTeams.length > 0 || selectedNations.length > 0;

    return (
        <div className="w-full py-8">
            <div className="max-w-7xl ml-50 flex items-center gap-6 flex-wrap">
                {/* Filter Button */}
                <button
                    onClick={onFilterClick}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-green-500 text-white rounded-full hover:bg-green-500 hover:text-black transition font-semibold"
                >
                    Filter
                    <SlidersVertical />
                </button>

                {/* Results Count */}
                <span className="text-gray-400 text-xl">
                    Showing <span className="font-normal">{resultsCount}</span> results
                </span>

                {/* Reset All Button */}
                <button
                    onClick={onResetAll}
                    className="text-white hover:underline transition text-xl hover:cursor-pointer"
                >
                    Reset all
                </button>

                {/* Active Filter Tags */}
                {showTags && (
                    <>
                        {activeTab !== "all" && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer text-white rounded-lg text-sm font-bold">
                                <span>{activeTab === "mens" ? "Men's Football" : "Women's Football"}</span>
                                <button
                                    onClick={() => onRemoveFilter("tab")}
                                    className="hover:bg-gray-600 rounded-full p-0.5 transition"
                                >
                                    <X size={16} className="hover:cursor-pointer" />
                                </button>
                            </div>
                        )}
                        {sortBy !== "rank" && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer text-white rounded-lg text-sm font-bold">
                                <span>Sort by {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
                                <button
                                    onClick={() => onRemoveFilter("sort")}
                                    className="hover:bg-gray-600 rounded-full p-0.5 transition"
                                >
                                    <X size={16} className="hover:cursor-pointer" />
                                </button>
                            </div>
                        )}
                        {selectedPositions.map((positionId) => (
                            <div key={positionId} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer text-white rounded-lg text-sm font-bold">
                                <span>{positionId}</span>
                                <button
                                    onClick={() => onRemoveFilter("position", positionId)}
                                    className="hover:bg-gray-600 rounded-full p-0.5 transition"
                                >
                                    <X size={16} className="hover:cursor-pointer" />
                                </button>
                            </div>
                        ))}
                        {selectedTeams.map((teamId) => (
                            <div key={teamId} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer text-white rounded-lg text-sm font-bold">
                                <span>{TEAM_OPTIONS.find(team => team.id === teamId)?.name}</span>
                                <button
                                    onClick={() => onRemoveFilter("team", teamId)}
                                    className="hover:bg-gray-600 rounded-full p-0.5 transition"
                                >
                                    <X size={16} className="hover:cursor-pointer" />
                                </button>
                            </div>
                        ))}
                        {selectedNations.map((nationId) => (
                            <div key={nationId} className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer text-white rounded-lg text-sm font-bold">
                                <span>{NATION_OPTIONS.find(nation => nation.id === nationId)?.name}</span>
                                <button
                                    onClick={() => onRemoveFilter("nation", nationId)}
                                    className="hover:bg-gray-600 rounded-full p-0.5 transition"
                                >
                                    <X size={16} className="hover:cursor-pointer" />
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
