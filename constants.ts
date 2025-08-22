
import { FilterState } from './types';

export const DURATION_OPTIONS = [
    { value: 'any', label: 'Any Duration' },
    { value: 'short', label: '< 10 minutes' },
    { value: 'medium', label: '10-30 minutes' },
    { value: 'long', label: '> 30 minutes' },
];

export const UPLOAD_DATE_OPTIONS = [
    { value: 'any', label: 'Any Time' },
    { value: 'week', label: 'Past week' },
    { value: 'month', label: 'Past month' },
    { value: 'year', label: 'Past year' },
];

export const MIN_VIEWS_OPTIONS = [
    { value: 'any', label: 'Any Views' },
    { value: '1k', label: '> 1,000' },
    { value: '10k', label: '> 10,000' },
    { value: '100k', label: '> 100,000' },
    { value: '1m', label: '> 1,000,000' },
];

export const INITIAL_FILTER_STATE: FilterState = {
    duration: 'any',
    uploadDate: 'any',
    minViews: 'any',
};
