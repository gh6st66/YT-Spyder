
import React from 'react';

export const Banner: React.FC = () => {
    return (
        <div className="bg-yellow-500 bg-opacity-20 border border-yellow-600 text-yellow-300 text-sm rounded-lg p-3 text-center my-4">
            <strong>Data Honesty & Transparency:</strong> All metadata (view counts, upload dates, durations) is AI-estimated. Please verify critical information before citing.
        </div>
    );
};
