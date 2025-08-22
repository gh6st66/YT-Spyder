
import React, { useCallback } from 'react';
import { Short, VideoStatus } from '../types';

interface ShortCardProps {
    short: Short;
    onShortChange: (id: string, update: Partial<Short>) => void;
}

export const ShortCard: React.FC<ShortCardProps> = ({ short, onShortChange }) => {

    const handleNotesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onShortChange(short.id, { notes: e.target.value });
    }, [short.id, onShortChange]);

    const handleStatusChange = useCallback((status: VideoStatus) => {
        onShortChange(short.id, { status });
    }, [short.id, onShortChange]);

    const getBorderColor = () => {
        switch (short.status) {
            case VideoStatus.Use: return 'border-green-500';
            case VideoStatus.Review: return 'border-yellow-500';
            case VideoStatus.Skip: return 'border-red-500';
            default: return 'border-brand-medium-dark';
        }
    };
    
    return (
        <div className={`bg-brand-light-dark rounded-lg flex flex-col border-2 ${getBorderColor()} transition-colors`}>
             <div className="relative aspect-[9/16] bg-black rounded-t-md flex items-center justify-center">
                 <img src={`https://picsum.photos/seed/${short.id}/270/480`} alt="Short thumbnail" className="rounded-t-md w-full h-full object-cover"/>
            </div>
            <div className="p-2 flex flex-col flex-grow gap-2">
                <p className="font-semibold text-sm leading-tight text-brand-light flex-grow">{short.title}</p>
                <div className="text-xs text-gray-400">
                    <p>{short.channel}</p>
                    <p>{short.views}</p>
                </div>
                 <div className="flex items-center gap-1 mt-1">
                    <button onClick={() => handleStatusChange(short.status === VideoStatus.Use ? VideoStatus.None : VideoStatus.Use)} className={`w-4 h-4 rounded-full border border-gray-500 bg-green-500 ${short.status === VideoStatus.Use ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}></button>
                    <button onClick={() => handleStatusChange(short.status === VideoStatus.Review ? VideoStatus.None : VideoStatus.Review)} className={`w-4 h-4 rounded-full border border-gray-500 bg-yellow-500 ${short.status === VideoStatus.Review ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}></button>
                    <button onClick={() => handleStatusChange(short.status === VideoStatus.Skip ? VideoStatus.None : VideoStatus.Skip)} className={`w-4 h-4 rounded-full border border-gray-500 bg-red-500 ${short.status === VideoStatus.Skip ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}></button>
                </div>
                <textarea
                    value={short.notes}
                    onChange={handleNotesChange}
                    placeholder="Notes..."
                    className="w-full bg-brand-medium-dark border border-gray-600 rounded p-1 text-xs text-gray-200 focus:outline-none focus:ring-1 focus:ring-brand-accent resize-none h-12"
                />
            </div>
        </div>
    );
};
