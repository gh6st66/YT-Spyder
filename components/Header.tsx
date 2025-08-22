import React from 'react';
import { Logo } from './Logo';

export const Header: React.FC = () => {
    return (
        <header className="bg-brand-surface p-4 shadow-md">
            <div className="container mx-auto flex items-center">
                <Logo className="h-8 w-8 text-brand-accent mr-3" />
                <h1 className="text-2xl font-medium text-brand-on-surface">Video Spyder</h1>
            </div>
        </header>
    );
};