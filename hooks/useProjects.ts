
import { useState, useEffect, useCallback } from 'react';
import { Project } from '../types';
import { getProjects, saveProjects } from '../services/localStorageService';

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadedProjects = getProjects();
        setProjects(loadedProjects);
        setLoading(false);
    }, []);

    const addProject = useCallback((project: Omit<Project, 'id' | 'createdAt'>) => {
        const newProject: Project = {
            ...project,
            id: new Date().toISOString() + Math.random(),
            createdAt: new Date().toISOString(),
        };
        const updatedProjects = [...projects, newProject];
        setProjects(updatedProjects);
        saveProjects(updatedProjects);
        return newProject;
    }, [projects]);

    const updateProject = useCallback((updatedProject: Project) => {
        const updatedProjects = projects.map(p => p.id === updatedProject.id ? updatedProject : p);
        setProjects(updatedProjects);
        saveProjects(updatedProjects);
    }, [projects]);
    
    const deleteProject = useCallback((projectId: string) => {
        const updatedProjects = projects.filter(p => p.id !== projectId);
        setProjects(updatedProjects);
        saveProjects(updatedProjects);
    }, [projects]);


    return { projects, loading, addProject, updateProject, deleteProject };
};
