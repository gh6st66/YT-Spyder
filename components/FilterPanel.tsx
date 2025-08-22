
import React from 'react';
import { FilterState } from '../types';
import { DURATION_OPTIONS, UPLOAD_DATE_OPTIONS, MIN_VIEWS_OPTIONS } from '../constants';

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
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-brand-light-dark border border-brand-medium-dark text-brand-light rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-brand-accent"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);


export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFilterChange }) => {
    const handleFilter = (key: keyof FilterState, value: string) => {
        onFilterChange({ ...filters, [key]: value });
    };

    return (
        <div className="bg-brand-light-dark p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
