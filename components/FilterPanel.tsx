import React from 'react';
import { FilterState } from '../types';
import { DURATION_OPTIONS, UPLOAD_DATE_OPTIONS, MIN_VIEWS_OPTIONS } from '../constants';
import { ChevronDownIcon } from './icons';

interface FilterPanelProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

const FilterSelect: React.FC<{
    label: string;
    value: string;
    options: { value: string; label: string }[];
    onChange: (value: string) => void;
}> = ({ label, value, options, onChange }) => (
    <div className="relative">
        <label className="block text-sm font-medium text-brand-on-surface/80 mb-1">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none w-full bg-brand-surface border-b-2 border-brand-outline text-brand-on-surface rounded-t-md p-2 focus:outline-none focus:border-brand-accent"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-brand-on-surface/60">
            <ChevronDownIcon className="h-5 w-5" />
        </div>
    </div>
);


export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
    const handleFilter = (key: keyof FilterState, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="bg-brand-surface p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FilterSelect
                    label="Duration"
                    value={filters.duration}
                    options={DURATION_OPTIONS}
                    onChange={(val) => handleFilter('duration', val)}
                />
                <FilterSelect
                    label="Upload Date"
                    value={filters.uploadDate}
                    options={UPLOAD_DATE_OPTIONS}
                    onChange={(val) => handleFilter('uploadDate', val)}
                />
                <FilterSelect
                    label="Minimum Views"
                    value={filters.minViews}
                    options={MIN_VIEWS_OPTIONS}
                    onChange={(val) => handleFilter('minViews', val)}
                />
            </div>
        </div>
    );
};