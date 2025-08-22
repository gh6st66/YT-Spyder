
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
            : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500';
    };

    return (
        <div className="border-b border-brand-medium-dark">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 focus:outline-none ${getTabClass(tab)}`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>
        </div>
    );
};
