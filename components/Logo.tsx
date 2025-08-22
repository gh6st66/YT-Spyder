import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20V4m-8 8h16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636l12.728 12.728M18.364 5.636L5.636 18.364" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 4.062A8.001 8.001 0 004.062 16" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.938 8A8.001 8.001 0 008 19.938" />
    </svg>
);
