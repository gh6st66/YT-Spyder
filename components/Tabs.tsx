import React from 'react';
import { Tab } from '../types';

interface TabsProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
    const tabs: Tab[] = ['Search', 'Projects'];

    const getTabClass = (tab: Tab) => {
        return activeTab === tab
            ? 'border-brand-accent text-brand-accent'
            : 'border-transparent text-brand-on-surface/70 hover:text-brand-on-surface';
    };

    return (
        <div className="border-b border-brand-outline">
            <nav className="flex space-x-4" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-accent ${getTabClass(tab)}`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
};