"use client"
import { Check, ChevronLeft } from "lucide-react";
import { POSITION_OPTIONS } from "../types/filters";

interface PositionDetailViewProps {
    selectedPositions: string[];
    onTogglePosition: (positionId: string) => void;
    onBack: () => void;
    onReset: () => void;
    onApply: () => void;
}

export default function PositionDetailView({
    selectedPositions,
    onTogglePosition,
    onBack,
    onReset,
    onApply
}: PositionDetailViewProps) {
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
                <h2 className="text-white text-xl font-semibold">Position</h2>
            </div>

            {/* Selection Count Banner */}
            {selectedPositions.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 bg-zinc-800 border-b border-gray-700">
                    <span className="text-white text-sm">
                        {selectedPositions.length} Selection{selectedPositions.length !== 1 ? 's' : ''} Applied
                    </span>
                    <button
                        onClick={onReset}
                        className="text-sm text-white underline hover:text-gray-300 transition"
                    >
                        Reset
                    </button>
                </div>
            )}

            {/* Position Options */}
            <div className="flex-1 overflow-y-auto">
                {POSITION_OPTIONS.map((category) => (
                    <div key={category.category} className="border-b border-gray-700">
                        <h3 className="text-white font-medium px-6 py-4">{category.category}</h3>
                        <div className="px-6 pb-4">
                            {category.positions.map((position) => (
                                <label
                                    key={position.id}
                                    className="flex items-center justify-between gap-3 py-3 px-3 rounded-lg hover:bg-zinc-800 cursor-pointer group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-white bg-gray-700 px-2 py-1 rounded min-w-10 text-center">{position.id}</span>
                                        <span className="text-sm text-gray-300 group-hover:text-white">{position.label}</span>
                                    </div>
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedPositions.includes(position.id) ? 'bg-green-500 border-green-500' : 'border-gray-500'
                                        }`}>
                                        {selectedPositions.includes(position.id) && <span className="text-black text-xs font-bold"><Check className="w-4 h-4" /></span>}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedPositions.includes(position.id)}
                                        onChange={() => onTogglePosition(position.id)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail View Footer */}
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
        </div>
    );
}
