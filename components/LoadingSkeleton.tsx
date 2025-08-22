import React from 'react';

const SkeletonCard: React.FC = () => (
    <div className="bg-brand-surface p-4 rounded-lg flex flex-col gap-3 animate-pulse">
        <div className="aspect-video bg-brand-outline rounded-md"></div>
        <div className="h-5 bg-brand-outline rounded w-3/4"></div>
        <div className="h-4 bg-brand-outline rounded w-1/2"></div>
        <div className="h-4 bg-brand-outline rounded w-full"></div>
        <div className="h-4 bg-brand-outline rounded w-full"></div>
    </div>
);

const ShortSkeletonCard: React.FC = () => (
     <div className="bg-brand-surface rounded-lg flex flex-col animate-pulse">
        <div className="aspect-[9/16] bg-brand-outline rounded-t-md"></div>
        <div className="p-2 flex flex-col gap-2">
            <div className="h-4 bg-brand-outline rounded w-full"></div>
            <div className="h-3 bg-brand-outline rounded w-1/2"></div>
        </div>
    </div>
);

export const LoadingSkeleton: React.FC = () => {
    return (
        <div className="mt-6">
             <div className="h-8 bg-brand-surface rounded w-1/4 mb-4 animate-pulse"></div>
            <section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </section>
            <section className="mt-8">
                 <div className="h-8 bg-brand-surface rounded w-1/5 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                     {[...Array(4)].map((_, i) => <ShortSkeletonCard key={i} />)}
                </div>
            </section>
        </div>
    );
};