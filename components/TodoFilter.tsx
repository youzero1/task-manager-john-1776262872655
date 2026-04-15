'use client';

import { FilterType } from '@/types/index';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
}

export default function TodoFilter({
  filter,
  onFilterChange,
  activeCount,
  completedCount
}: TodoFilterProps) {
  const filters: { label: string; value: FilterType; count?: number }[] = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active', count: activeCount },
    { label: 'Completed', value: 'completed', count: completedCount }
  ];

  return (
    <div className="flex gap-1 mb-4">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onFilterChange(f.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
            filter === f.value
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          {f.label}
          {f.count !== undefined && f.count > 0 && (
            <span
              className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-xs ${
                filter === f.value
                  ? 'bg-indigo-200 text-indigo-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {f.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
