import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FilterState, Video, Short, VideoStatus, Project } from '../types';
import { fetchYouTubeData } from '../services/geminiService';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { VideoCard } from './VideoCard';
import { ShortCard } from './ShortCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Banner } from './Banner';
import { SaveIcon, CloseIcon } from './icons';
import { INITIAL_FILTER_STATE } from '../constants';
import { useProjectContext } from '../context/ProjectContext';
import { Modal } from './Modal';

interface SearchPageProps {
    activeProject: Project | null;
    clearActiveProject: () => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ activeProject, clearActiveProject }) => {
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
    const [videos, setVideos] = useState<Video[]>([]);
    const [shorts, setShorts] = useState<Short[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [newProjectName, setNewProjectName] = useState('');

    const { addProject, updateProject } = useProjectContext();

    useEffect(() => {
        if (activeProject) {
            setQuery(activeProject.query);
            setFilters(activeProject.filters);
            setVideos(activeProject.videos);
            setShorts(activeProject.shorts);
            setError(null);
            setIsLoading(false);
        } else {
            setQuery('');
            setFilters(INITIAL_FILTER_STATE);
            setVideos([]);
            setShorts([]);
        }
    }, [activeProject]);

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;
        setIsLoading(true);
        setError(null);
        clearActiveProject();
        try {
            const data = await fetchYouTubeData(searchQuery);
            setVideos(data.videos.map(v => ({ ...v, type: 'video', status: VideoStatus.None, notes: '' })));
            setShorts(data.shorts.map(s => ({ ...s, type: 'short', status: VideoStatus.None, notes: '' })));
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleOpenSaveModal = () => {
        setNewProjectName(activeProject?.name || query);
        setIsSaveModalOpen(true);
    };

    const handleConfirmSave = () => {
        if (!newProjectName.trim()) {
            alert("Project name cannot be empty.");
            return;
        }
        
        const projectData = {
            name: newProjectName.trim(),
            query,
            filters,
            videos,
            shorts,
        };

        if (activeProject) {
            updateProject({ ...activeProject, ...projectData });
            alert(`Project "${projectData.name}" updated!`);
        } else {
            addProject(projectData);
            alert(`Project "${projectData.name}" saved!`);
        }
        setIsSaveModalOpen(false);
    };

    const updateItem = <T extends Video | Short,>(
      items: T[], 
      id: string, 
      update: Partial<T>
    ): T[] => items.map(item => item.id === id ? { ...item, ...update } : item);

    const handleVideoChange = useCallback((id: string, update: Partial<Video>) => {
      setVideos(prev => updateItem(prev, id, update));
    }, []);

    const handleShortChange = useCallback((id: string, update: Partial<Short>) => {
      setShorts(prev => updateItem(prev, id, update));
    }, []);

    const filteredResults = useMemo(() => {
        const parseViews = (viewsStr: string): number => {
            const num = parseFloat(viewsStr.replace(/,/g, ''));
            if (viewsStr.toLowerCase().includes('k')) return num * 1000;
            if (viewsStr.toLowerCase().includes('m')) return num * 1000000;
            return num;
        };
        const minViewsNum = parseViews(filters.minViews);

        const filterDuration = (durationStr: string) => {
            if (filters.duration === 'any') return true;
            const parts = durationStr.split(':').map(Number);
            const seconds = parts.reduce((acc, time) => 60 * acc + time, 0);
            if (filters.duration === 'short') return seconds < 600;
            if (filters.duration === 'medium') return seconds >= 600 && seconds <= 1800;
            if (filters.duration === 'long') return seconds > 1800;
            return true;
        };

        const filteredVideos = videos.filter(v => filterDuration(v.duration) && (filters.minViews === 'any' || parseViews(v.views) >= minViewsNum));
        const filteredShorts = shorts.filter(s => filters.minViews === 'any' || parseViews(s.views) >= minViewsNum);
        
        return { videos: filteredVideos, shorts: filteredShorts };
    }, [videos, shorts, filters]);
    
    const hasResults = videos.length > 0 || shorts.length > 0;

    return (
        <div>
            <Banner />
            <SearchBar onSearch={handleSearch} initialQuery={query} />
            <FilterPanel filters={filters} onFilterChange={setFilters} />

            {activeProject && (
                <div className="my-4 p-3 bg-brand-surface rounded-lg flex justify-between items-center">
                    <p className="text-lg">
                        <span className="font-medium">Loaded Project:</span> {activeProject.name}
                    </p>
                    <button onClick={clearActiveProject} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
            )}

            {isLoading && <LoadingSkeleton />}
            {error && <div className="text-center text-red-400 mt-8">{error}</div>}
            
            {!isLoading && !error && hasResults && (
                <>
                    <div className="flex justify-between items-center mt-6 mb-4">
                        <h2 className="text-2xl font-medium">Results</h2>
                        <button onClick={handleOpenSaveModal} className="flex items-center gap-2 bg-brand-accent text-white font-medium uppercase text-sm tracking-wider py-2 px-4 rounded-lg shadow-md hover:bg-brand-accent-dark transition-all duration-300">
                            <SaveIcon className="w-5 h-5" />
                            {activeProject ? 'Update Project' : 'Save Project'}
                        </button>
                    </div>

                    {filteredResults.videos.length > 0 && (
                        <section>
                            <h3 className="text-xl font-medium text-brand-on-surface/80 border-b border-brand-outline pb-2 mb-4">Videos</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredResults.videos.map(video => <VideoCard key={video.id} video={video} onVideoChange={handleVideoChange} />)}
                            </div>
                        </section>
                    )}
                    
                    {filteredResults.shorts.length > 0 && (
                        <section className="mt-8">
                            <h3 className="text-xl font-medium text-brand-on-surface/80 border-b border-brand-outline pb-2 mb-4">Shorts</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {filteredResults.shorts.map(short => <ShortCard key={short.id} short={short} onShortChange={handleShortChange} />)}
                            </div>
                        </section>
                    )}
                </>
            )}
            
            {!isLoading && !error && !hasResults && !activeProject && (
                <div className="text-center text-brand-on-surface/60 mt-16">
                    <p className="text-2xl">Start your research journey.</p>
                    <p>Enter a topic above to discover and analyze YouTube content.</p>
                </div>
            )}

            <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} title={activeProject ? 'Update Project' : 'Save New Project'}>
                <div>
                    <label htmlFor="projectName" className="text-sm text-brand-on-surface/80">Project Name</label>
                    <input
                        id="projectName"
                        type="text"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                        placeholder="Enter project name"
                        className="w-full mt-1 bg-brand-dark border-b-2 border-brand-outline text-brand-on-surface rounded-t-md p-3 focus:outline-none focus:border-brand-accent"
                    />
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <button 
                        onClick={() => setIsSaveModalOpen(false)}
                        className="px-4 py-2 rounded-md text-brand-accent font-medium uppercase text-sm hover:bg-brand-accent/10"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirmSave}
                        className="px-4 py-2 rounded-md text-brand-accent font-medium uppercase text-sm hover:bg-brand-accent/10"
                    >
                        Save
                    </button>
                </div>
            </Modal>
        </div>
    );
};