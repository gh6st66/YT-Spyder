
import React, { useState, useCallback } from 'react';
import { SearchPage } from './components/SearchPage';
import { ProjectsPage } from './components/ProjectsPage';
import { Header } from './components/Header';
import { Tabs } from './components/Tabs';
import { Project, Tab } from './types';
import { ProjectProvider } from './context/ProjectContext';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Search');
    const [activeProject, setActiveProject] = useState<Project | null>(null);

    const loadProject = useCallback((project: Project) => {
        setActiveProject(project);
        setActiveTab('Search');
    }, []);

    const clearActiveProject = useCallback(() => {
        setActiveProject(null);
    }, []);
    

    return (
        <ProjectProvider>
            <div className="min-h-screen bg-brand-dark text-brand-light">
                <Header />
                <div className="container mx-auto p-4">
                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    <main className="mt-4">
                        {activeTab === 'Search' && <SearchPage activeProject={activeProject} clearActiveProject={clearActiveProject} />}
                        {activeTab === 'Projects' && <ProjectsPage loadProject={loadProject} />}
                    </main>
                </div>
            </div>
        </ProjectProvider>
    );
};

export default App;
