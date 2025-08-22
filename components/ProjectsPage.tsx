
import React from 'react';
import { Project } from '../types';
import { useProjectContext } from '../context/ProjectContext';

interface ProjectsPageProps {
    loadProject: (project: Project) => void;
}

const ProjectCard: React.FC<{ project: Project; onSelect: () => void; onDelete: () => void; }> = ({ project, onSelect, onDelete }) => {
    return (
        <div className="bg-brand-light-dark p-6 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-brand-light mb-2">{project.name}</h3>
                <p className="text-gray-400 italic mb-4">"{project.query}"</p>
                <div className="flex space-x-4 text-gray-300 mb-4">
                    <span>{project.videos.length} Videos</span>
                    <span>{project.shorts.length} Shorts</span>
                </div>
                <p className="text-sm text-gray-500">
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                </p>
            </div>
            <div className="mt-6 flex space-x-2">
                <button
                    onClick={onSelect}
                    className="flex-1 bg-brand-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
                >
                    Load Project
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ loadProject }) => {
    const { projects, loading, deleteProject } = useProjectContext();

    if (loading) {
        return <div>Loading projects...</div>;
    }

    if (projects.length === 0) {
        return (
            <div className="text-center text-gray-400 mt-16">
                <h2 className="text-3xl font-bold mb-4">No Projects Found</h2>
                <p className="text-lg">Save your search sessions from the 'Search' tab to organize them here.</p>
            </div>
        );
    }
    
    const handleDelete = (projectId: string) => {
        if (window.confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
            deleteProject(projectId);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(project => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    onSelect={() => loadProject(project)}
                    onDelete={() => handleDelete(project.id)}
                />
            ))}
        </div>
    );
};
