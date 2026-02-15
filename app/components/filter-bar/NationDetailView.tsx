"use client"
import { ChevronLeft, Check, Shield } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { NATION_OPTIONS, type Nation } from "../../types/filters";

interface NationDetailViewProps {
    selectedNations: string[];
    onToggleNation: (nationId: string) => void;
    onBack: () => void;
    onReset: () => void;
    onApply: () => void;
}

const NationItem = ({ nation, isSelected, onToggle }: { nation: Nation, isSelected: boolean, onToggle: (id: string) => void }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <label className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-800 cursor-pointer group">
            <div className="flex items-center gap-3">
                <div className="w-6 h-4 relative flex items-center justify-center overflow-hidden rounded-sm">
                    {imgError ? (
                        <Shield className="w-4 h-4 text-gray-500" />
                    ) : (
                        <Image
                            src={nation.flag}
                            alt={nation.name}
                            fill
                            unoptimized={true}
                            className="object-cover"
                            onError={() => setImgError(true)}
                        />
                    )}
                </div>
                <span className="text-gray-300 group-hover:text-white">{nation.name}</span>
            </div>
            <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-500'
                }`}>
                {isSelected && <span className="text-black text-xs font-bold"><Check className="w-4 h-4" /></span>}
            </div>
            <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => onToggle(nation.id)}
            />
        </label>
    );
};

export default function NationDetailView({
    selectedNations,
    onToggleNation,
    onBack,
    onReset,
    onApply
}: NationDetailViewProps) {

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
                <h2 className="text-white text-xl font-semibold">Nation</h2>
            </div>

            {/* Selection Count Banner */}
            {selectedNations.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 bg-zinc-800 border-b border-gray-700">
                    <span className="text-white text-sm">
                        {selectedNations.length} Selection{selectedNations.length !== 1 ? 's' : ''} Applied
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
            <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6">
                    <h3 className="text-white font-semibold mb-3">Most Searched</h3>
                    <div className="space-y-1">
                        {NATION_OPTIONS.map((nation) => (
                            <NationItem
                                key={nation.id}
                                nation={nation}
                                isSelected={selectedNations.includes(nation.id)}
                                onToggle={onToggleNation}
                            />
                        ))}
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
        </div>
    );
}
