
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Video, VideoStatus } from '../types';
import { CitationIcon, CsvIcon, MoreVerticalIcon } from './icons';

interface VideoCardProps {
    video: Video;
    onVideoChange: (id: string, update: Partial<Video>) => void;
}

const TagButton: React.FC<{
    label: string;
    value: VideoStatus;
    currentStatus: VideoStatus;
    onClick: (status: VideoStatus) => void;
    color: string;
}> = ({ label, value, currentStatus, onClick, color }) => {
    const isActive = currentStatus === value;
    const baseClasses = `px-3 py-1 text-sm rounded-full cursor-pointer transition-colors border`;
    const activeClasses = `bg-${color}-500 text-white border-${color}-500`;
    const inactiveClasses = `bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700`;
    return (
        <button onClick={() => onClick(isActive ? VideoStatus.None : value)} className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
            {label}
        </button>
    );
};

const ActionsMenu: React.FC<{ video: Video }> = ({ video }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const getCitation = (style: 'APA' | 'MLA'): string => {
        const year = new Date().getFullYear(); // Faking year since not provided
        if (style === 'APA') {
            return `${video.channel}. (${year}). ${video.title} [Video]. YouTube.`;
        } else { // MLA
            return `"${video.title}." YouTube, uploaded by ${video.channel}, ${video.uploadDate}, www.youtube.com.`;
        }
    };
    
    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text).then(() => alert(`${type} copied to clipboard!`));
        setIsOpen(false);
    };

    const exportToCsv = () => {
        const headers = "Title,Channel,Views,Upload Date,Duration,Summary\n";
        const row = `"${video.title.replace(/"/g, '""')}","${video.channel}","${video.views}","${video.uploadDate}","${video.duration}","${video.summary.replace(/"/g, '""')}"\n`;
        const csvContent = "data:text/csv;charset=utf-8," + headers + row;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `${video.title.slice(0, 20)}_data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-brand-medium-dark">
                <MoreVerticalIcon className="w-5 h-5" />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-medium-dark rounded-md shadow-lg z-10">
                    <button onClick={() => copyToClipboard(getCitation('APA'), 'APA Citation')} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">
                        <CitationIcon className="w-4 h-4"/> Copy APA
                    </button>
                    <button onClick={() => copyToClipboard(getCitation('MLA'), 'MLA Citation')} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">
                        <CitationIcon className="w-4 h-4"/> Copy MLA
                    </button>
                    <button onClick={exportToCsv} className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600">
                        <CsvIcon className="w-4 h-4"/> Export CSV
                    </button>
                </div>
            )}
        </div>
    );
};

export const VideoCard: React.FC<VideoCardProps> = ({ video, onVideoChange }) => {

    const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onVideoChange(video.id, { notes: e.target.value });
    }, [video.id, onVideoChange]);

    const handleStatusChange = useCallback((status: VideoStatus) => {
        onVideoChange(video.id, { status });
    }, [video.id, onVideoChange]);
    
    return (
        <div className="bg-brand-light-dark p-4 rounded-lg flex flex-col gap-3">
            <div className="relative aspect-video bg-black rounded-md flex items-center justify-center">
                <img src={`https://picsum.photos/seed/${video.id}/400/225`} alt="Video thumbnail" className="rounded-md w-full h-full object-cover"/>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">{video.duration}</span>
            </div>

            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg leading-tight pr-2">{video.title}</h3>
                <ActionsMenu video={video} />
            </div>

            <div className="text-sm text-gray-400">
                <span>{video.channel}</span> &bull; <span>{video.views}</span> &bull; <span>{video.uploadDate}</span>
            </div>
            
            <p className="text-gray-300 text-sm">{video.summary}</p>
            
            <div>
                <h4 className="font-semibold text-gray-200 text-sm mb-2">Key Moments</h4>
                <div className="flex flex-col gap-1 text-sm">
                    {video.keyMoments.map((moment, index) => (
                        <div key={index} className="text-brand-accent hover:underline cursor-pointer">
                            <span className="font-mono">{moment.timestamp}</span> - {moment.description}
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-brand-medium-dark pt-3">
                <div className="flex items-center gap-2 mb-3">
                    <TagButton label="Use" value={VideoStatus.Use} currentStatus={video.status} onClick={handleStatusChange} color="green" />
                    <TagButton label="Review" value={VideoStatus.Review} currentStatus={video.status} onClick={handleStatusChange} color="yellow" />
                    <TagButton label="Skip" value={VideoStatus.Skip} currentStatus={video.status} onClick={handleStatusChange} color="red" />
                </div>
                <textarea
                    value={video.notes}
                    onChange={handleNotesChange}
                    placeholder="Add your notes here..."
                    className="w-full bg-brand-medium-dark border border-gray-600 rounded-md p-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-accent resize-none h-20"
                />
            </div>
        </div>
    );
};
