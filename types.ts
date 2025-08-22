
export enum VideoStatus {
    None = 'None',
    Use = 'Use',
    Review = 'Review',
    Skip = 'Skip',
}

export interface KeyMoment {
    timestamp: string;
    description: string;
}

export interface Video {
    id: string;
    type: 'video';
    title: string;
    channel: string;
    views: string;
    uploadDate: string;
    duration: string;
    summary: string;
    keyMoments: KeyMoment[];
    status: VideoStatus;
    notes: string;
}

export interface Short {
    id: string;
    type: 'short';
    title: string;
    channel: string;
    views: string;
    summary: string;
    status: VideoStatus;
    notes: string;
}

export interface FilterState {
    duration: string;
    uploadDate: string;
    minViews: string;
}

export interface Project {
    id: string;
    name: string;
    query: string;
    filters: FilterState;
    videos: Video[];
    shorts: Short[];
    createdAt: string;
}

export type Tab = 'Search' | 'Projects';

export interface YoutubeData {
    videos: Omit<Video, 'status' | 'notes' | 'type'>[];
    shorts: Omit<Short, 'status' | 'notes' | 'type'>[];
}
