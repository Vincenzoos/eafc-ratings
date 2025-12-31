"use client"
import { ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: () => void;
    onResetFilters: () => void;
}

export default function FilterSidebar({ isOpen, onClose, onApplyFilters, onResetFilters }: FilterSidebarProps) {
    const [activeTab, setActiveTab] = useState<"all" | "mens" | "womens">("all");
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>("rank");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const sortOptions = [
        { id: "rank", label: "Rank" },
        { id: "overall", label: "Overall" },
        { id: "pace", label: "Pace" },
        { id: "shooting", label: "Shooting" },
        { id: "passing", label: "Passing" },
        { id: "dribbling", label: "Dribbling" },
        { id: "defending", label: "Defending" },
        { id: "physicality", label: "Physicality" },
    ];

    if (!mounted) return null;

    const sidebarContent = (
        <>
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-100 bg-zinc-900 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } overflow-y-auto shadow-2xl`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        <h2 className="text-white text-xl font-semibold">Filter & Sort</h2>
                        <button
                            onClick={onClose}
                            className="flex items-center justify-center w-10 h-10 rounded-full hover:cursor-pointer border-0 text-white hover:bg-gray-700 transition-colors"
                        >
                            <X />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 p-6 border-b border-gray-700">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "all"
                                ? "bg-white text-black"
                                : "bg-zinc-800 text-gray-400 hover:text-white"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveTab("mens")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "mens"
                                ? "bg-white text-black"
                                : "bg-zinc-800 text-gray-400 hover:text-white"
                                }`}
                        >
                            Men's Football
                        </button>
                        <button
                            onClick={() => setActiveTab("womens")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeTab === "womens"
                                ? "bg-white text-black"
                                : "bg-zinc-800 text-gray-400 hover:text-white"
                                }`}
                        >
                            Women's Football
                        </button>
                    </div>

                    {/* Filter Sections */}
                    <div className="flex-1 overflow-y-auto">
                        {/* Leagues & Teams */}
                        <div className="border-b border-gray-700">
                            <button
                                onClick={() => toggleSection("leagues")}
                                className="w-full flex items-center justify-between p-6 text-white hover:bg-zinc-800 transition"
                            >
                                <span className="font-medium hover:underline hover:cursor-pointer">Leagues & Teams</span>
                                <ArrowRight />
                            </button>
                            {expandedSections.includes("leagues") && (
                                <div className="px-6 pb-4 text-gray-400 text-sm">
                                    {/* Add league/team options here */}
                                    <p>Filter options coming soon...</p>
                                </div>
                            )}
                        </div>

                        {/* Position */}
                        <div className="border-b border-gray-700">
                            <button
                                onClick={() => toggleSection("position")}
                                className="w-full flex items-center justify-between p-6 text-white hover:bg-zinc-800 transition"
                            >
                                <span className="font-medium hover:underline hover:cursor-pointer">Position</span>
                                <ArrowRight />
                            </button>
                            {expandedSections.includes("position") && (
                                <div className="px-6 pb-4 text-gray-400 text-sm">
                                    {/* Add position options here */}
                                    <p>Filter options coming soon...</p>
                                </div>
                            )}
                        </div>

                        {/* Nation */}
                        <div className="border-b border-gray-700">
                            <button
                                onClick={() => toggleSection("nation")}
                                className="w-full flex items-center justify-between p-6 text-white hover:bg-zinc-800 transition"
                            >
                                <span className="font-medium hover:underline hover:cursor-pointer">Nation</span>
                                <ArrowRight />
                            </button>
                            {expandedSections.includes("nation") && (
                                <div className="px-6 pb-4 text-gray-400 text-sm">
                                    {/* Add nation options here */}
                                    <p>Filter options coming soon...</p>
                                </div>
                            )}
                        </div>

                        {/* PlayStyles */}
                        <div className="border-b border-gray-700">
                            <button
                                onClick={() => toggleSection("playstyles")}
                                className="w-full flex items-center justify-between p-6 text-white hover:bg-zinc-800 transition"
                            >
                                <span className="font-medium hover:underline hover:cursor-pointer">PlayStyles</span>
                                <ArrowRight />
                            </button>
                            {expandedSections.includes("playstyles") && (
                                <div className="px-6 pb-4 text-gray-400 text-sm">
                                    {/* Add playstyle options here */}
                                    <p>Filter options coming soon...</p>
                                </div>
                            )}
                        </div>

                        {/* Sort By */}
                        <div className="p-6">
                            <h3 className="text-white font-medium mb-4">Sort by</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {sortOptions.map((option) => (
                                    <label
                                        key={option.id}
                                        className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition"
                                    >
                                        <input
                                            type="radio"
                                            name="sort"
                                            value={option.id}
                                            checked={sortBy === option.id}
                                            onChange={(e) => setSortBy(e.target.value)}
                                            className="w-4 h-4 accent-green-500"
                                        />
                                        <span className="text-sm">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="p-6 border-t border-gray-700 flex gap-3">
                        <button
                            onClick={onResetFilters}
                            className="flex-1 px-4 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 transition font-medium"
                        >
                            Reset Filters
                        </button>
                        <button
                            onClick={onApplyFilters}
                            className="flex-1 px-4 py-3 bg-green-500 text-black rounded-full hover:bg-green-600 transition font-semibold"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );

    return createPortal(sidebarContent, document.body);
}
