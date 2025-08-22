
import React, { createContext, useContext } from 'react';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../types';

interface ProjectContextType {
    projects: Project[];
    loading: boolean;
    addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Project;
    updateProject: (updatedProject: Project) => void;
    deleteProject: (projectId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const projectData = useProjects();
    return <ProjectContext.Provider value={projectData}>{children}</ProjectContext.Provider>;
};

export const useProjectContext = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProjectContext must be used within a ProjectProvider');
    }
    return context;
};
