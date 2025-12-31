"use client"

import { SlidersVertical } from "lucide-react";

interface FilterBarProps {
    onFilterClick: () => void;
    resultsCount: number;
    onResetAll: () => void;
}

export default function FilterBar({ onFilterClick, resultsCount, onResetAll }: FilterBarProps) {
    return (
        <div className="w-full bg-black py-8 px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex items-center gap-6">
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
            </div>
        </div>
    );
}
