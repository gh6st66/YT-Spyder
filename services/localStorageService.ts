import { Project } from '../types';

const PROJECTS_KEY = 'videoSpyderProjects';

export const getProjects = (): Project[] => {
    try {
        const projectsJson = localStorage.getItem(PROJECTS_KEY);
        return projectsJson ? JSON.parse(projectsJson) : [];
    } catch (error) {
        console.error("Error retrieving projects from localStorage", error);
        return [];
    }
};

export const saveProjects = (projects: Project[]): void => {
    try {
        const projectsJson = JSON.stringify(projects);
        localStorage.setItem(PROJECTS_KEY, projectsJson);
    } catch (error) {
        console.error("Error saving projects to localStorage", error);
    }
};