"use client";
import React, { useState } from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
    placeholder?: string;
    ariaLabel?: string;
    defaultValue?: string;
    onSearch?: (query: string) => void;
    className?: string;
};

export default function SearchBar({
    placeholder = 'Search Player',
    ariaLabel = 'Search players',
    defaultValue = '',
    onSearch,
    className,
}: SearchBarProps) {
    const [query, setQuery] = useState(defaultValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.(query.trim());
    };

    return (
        <form className={className ?? 'w-full'} role="search" onSubmit={handleSubmit}>
            <label htmlFor="search" className="sr-only">
                {ariaLabel}
            </label>

            <div className="relative mx-auto max-w-sm">
                <input
                    id="search"
                    name="search"
                    placeholder={placeholder}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-full bg-zinc-900/60 placeholder-zinc-400 text-white py-4 pl-6 pr-12 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700"
                />

                <button
                    type="submit"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 hover:bg-zinc-700"
                    aria-label={ariaLabel}
                >
                    <Search />
                </button>
            </div>
        </form>
    );
}
