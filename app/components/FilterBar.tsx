"use client"

import { SlidersVertical, X } from "lucide-react";

interface FilterBarProps {
    onFilterClick: () => void;
    resultsCount: number;
    onResetAll: () => void;
    activeTab: "all" | "mens" | "womens";
    sortBy: string;
    onRemoveFilter: (filterType: "tab" | "sort") => void;
}

export default function FilterBar({ onFilterClick, resultsCount, onResetAll, activeTab, sortBy, onRemoveFilter }: FilterBarProps) {
    const showTags = activeTab !== "all" || sortBy !== "rank";

    return (
        <div className="w-full bg-black py-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex items-center gap-6 flex-wrap">
                {/* Filter Button */}
                <button
                    onClick={onFilterClick}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-green-500 text-white rounded-full hover:bg-green-500 hover:text-black transition font-semibold"
                >
                    <SlidersVertical />
                    Filter
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
                    </>
                )}
            </div>
        </div>
    );
}
