import React from 'react';

export const Banner: React.FC = () => {
    return (
        <div className="bg-brand-accent/10 border border-brand-accent/30 text-brand-accent/80 text-sm rounded-lg p-3 text-center my-4">
            <span className="font-medium">Data Honesty & Transparency:</span> All metadata (view counts, upload dates, durations) is AI-estimated. Please verify critical information before citing.
        </div>
    );
};