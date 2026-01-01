"use client"
import { ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { GenderFilter, SORT_OPTIONS, SortOption } from "../types/filters";
import PositionDetailView from "./PositionDetailView";
import LeagueAndTeamDetailView from "./LeagueAndTeamDetailView";
import NationDetailView from "./NationDetailView";

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onApplyFilters: (activeTab: GenderFilter, sortBy: SortOption, selectedPositions: string[], selectedTeams: string[], selectedNations: string[]) => void;
    onResetFilters: () => void;
    activeTab: GenderFilter;
    sortBy: SortOption;
    selectedPositions: string[];
    selectedTeams?: string[];
    selectedNations?: string[];
}

export default function FilterSidebar({ isOpen, onClose, onApplyFilters, onResetFilters, activeTab: initialTab, sortBy: initialSort, selectedPositions: initialPositions, selectedTeams: initialTeams = [], selectedNations: initialNations = [] }: FilterSidebarProps) {
    const [activeTab, setActiveTab] = useState<GenderFilter>(initialTab);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOption>(initialSort);
    const [mounted, setMounted] = useState(false);
    const [detailView, setDetailView] = useState<string | null>(null);
    const [selectedPositions, setSelectedPositions] = useState<string[]>(initialPositions);
    const [selectedTeams, setSelectedTeams] = useState<string[]>(initialTeams);
    const [selectedNations, setSelectedNations] = useState<string[]>(initialNations);

    useEffect(() => {
        setActiveTab(initialTab);
        setSortBy(initialSort);
        setSelectedPositions(initialPositions);
        setSelectedTeams(initialTeams);
        setSelectedNations(initialNations);
        if (!isOpen) {
            setDetailView(null);
        }
    }, [initialTab, initialSort, initialPositions, initialTeams, initialNations, isOpen]);

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

    const togglePosition = (positionId: string) => {
        setSelectedPositions(prev =>
            prev.includes(positionId)
                ? prev.filter(id => id !== positionId)
                : [...prev, positionId]
        );
    };

    const toggleTeam = (teamId: string) => {
        setSelectedTeams(prev =>
            prev.includes(teamId)
                ? prev.filter(id => id !== teamId)
                : [...prev, teamId]
        );
    };

    const toggleNation = (nationId: string) => {
        setSelectedNations(prev =>
            prev.includes(nationId)
                ? prev.filter(id => id !== nationId)
                : [...prev, nationId]
        );
    };

    if (!mounted) return null;

    const sidebarContent = (
        <>
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-100 bg-zinc-900 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } overflow-y-auto shadow-2xl`}
            >
                {/* Position Detail View Overlay */}
                {detailView === "position" && (
                    <PositionDetailView
                        selectedPositions={selectedPositions}
                        onTogglePosition={togglePosition}
                        onBack={() => setDetailView(null)}
                        onReset={() => setSelectedPositions([])}
                        onApply={() => setDetailView(null)}
                    />
                )}
                {/* League & Team Detail View Overlay */}
                {detailView === "leagues" && (
                    <LeagueAndTeamDetailView
                        selectedTeams={selectedTeams}
                        onToggleTeam={toggleTeam}
                        onBack={() => setDetailView(null)}
                        onReset={() => setSelectedTeams([])}
                        onApply={() => setDetailView(null)}
                    />
                )}
                {/* Nation Detail View Overlay */}
                {detailView === "nations" && (
                    <NationDetailView
                        selectedNations={selectedNations}
                        onToggleNation={toggleNation}
                        onBack={() => setDetailView(null)}
                        onReset={() => setSelectedNations([])}
                        onApply={() => setDetailView(null)}
                    />
                )}
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
                                onClick={() => setDetailView("leagues")}
                                className="w-full flex items-center justify-between p-6 text-white hover:bg-zinc-800 hover:underline hover:cursor-pointer transition"
                            >
                                <span className="font-medium">Leagues & Teams</span>
                                <div className="flex items-center gap-2">
                                    {selectedTeams.length > 0 && (
                                        <span className="flex items-center justify-center w-6 h-6 bg-gray-700 text-white text-xs font-semibold rounded-full">
                                            {selectedTeams.length}
                                        </span>
                                    )}
                                    <ArrowRight />
                                </div>
                            </button>
                        </div>

                        {/* Position */}
                        <div className="border-b border-gray-700">
                            <button
                                onClick={() => setDetailView("position")}
                                className="w-full flex items-center justify-between p-6 text-white hover:bg-zinc-800 hover:underline hover:cursor-pointer transition"
                            >
                                <span className="font-medium">Position</span>
                                <div className="flex items-center gap-2">
                                    {selectedPositions.length > 0 && (
                                        <span className="flex items-center justify-center w-6 h-6 bg-gray-700 text-white text-xs font-semibold rounded-full">
                                            {selectedPositions.length}
                                        </span>
                                    )}
                                    <ArrowRight />
                                </div>
                            </button>
                        </div>

                        {/* Nation */}
                        <div className="border-b border-gray-700">
                            <button
                                onClick={() => setDetailView("nations")}
                                className="w-full flex items-center justify-between p-6 text-white hover:bg-zinc-800 hover:underline hover:cursor-pointer transition"
                            >
                                <span className="font-medium">Nation</span>
                                <div className="flex items-center gap-2">
                                    {selectedNations.length > 0 && (
                                        <span className="flex items-center justify-center w-6 h-6 bg-gray-700 text-white text-xs font-semibold rounded-full">
                                            {selectedNations.length}
                                        </span>
                                    )}
                                    <ArrowRight />
                                </div>
                            </button>
                        </div>

                        {/* PlayStyles */}
                        <div className="border-b border-gray-700">
                            <button
                                onClick={() => toggleSection("playstyles")}
                                className="w-full flex items-center justify-between p-6 text-white hover:bg-zinc-800 hover:underline hover:cursor-pointer transition"
                            >
                                <span className="font-medium">PlayStyles</span>
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
                                {SORT_OPTIONS.map((option) => (
                                    <label
                                        key={option.id}
                                        className="flex items-center gap-2 text-gray-300 cursor-pointer hover:text-white transition"
                                    >
                                        <input
                                            type="radio"
                                            name="sort"
                                            value={option.id}
                                            checked={sortBy === option.id}
                                            onChange={(e) => setSortBy(e.target.value as SortOption)}
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
                            onClick={() => {
                                setActiveTab("all");
                                setSortBy("rank");
                                setSelectedPositions([]);
                                setSelectedTeams([]);
                                setSelectedNations([]);
                                onResetFilters();
                            }}
                            className="flex-1 px-4 py-3 border border-gray-600 text-white rounded-full hover:bg-gray-800 transition font-medium"
                        >
                            Reset Filters
                        </button>
                        <button
                            onClick={() => onApplyFilters(activeTab, sortBy, selectedPositions, selectedTeams, selectedNations)}
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
