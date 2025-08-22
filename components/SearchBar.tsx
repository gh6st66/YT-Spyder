import React, { useState, useEffect } from 'react';
import { SearchIcon } from './icons';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialQuery: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialQuery }) => {
    const [query, setQuery] = useState(initialQuery);
    
    useEffect(() => {
        setQuery(initialQuery);
    }, [initialQuery]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 my-4">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a topic (e.g., 'cold fusion explained')"
                className="flex-grow bg-brand-surface border-b-2 border-brand-outline text-brand-on-surface placeholder-brand-on-surface/50 rounded-t-lg p-3 focus:outline-none focus:border-brand-accent"
            />
            <button
                type="submit"
                className="bg-brand-accent text-white font-medium uppercase text-sm tracking-wider h-12 px-6 rounded-lg shadow-md hover:bg-brand-accent-dark transition-all duration-300 flex items-center gap-2"
            >
                <SearchIcon className="w-5 h-5"/>
                Search
            </button>
        </form>
    );
};