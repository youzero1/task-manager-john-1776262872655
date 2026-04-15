'use client';

import { useState } from 'react';

export default function TodoInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-gray-700 placeholder-gray-300 text-sm transition-all duration-200"
      />
      <button
        type="submit"
        disabled={!inputValue.trim()}
        className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-sm hover:from-indigo-600 hover:to-purple-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
      >
        Add
      </button>
    </form>
  );
}
