'use client';

import { useState } from 'react';
import TodoInput from '@/components/TodoInput';
import TodoList from '@/components/TodoList';
import TodoFilter from '@/components/TodoFilter';
import { Todo, FilterType } from '@/types/index';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date()
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    if (newText.trim() === '') return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mb-2">
            My Todos
          </h1>
          <p className="text-gray-500 text-sm">
            Stay organized, stay productive
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4 text-center">
            <p className="text-2xl font-bold text-orange-500">{todos.length}</p>
            <p className="text-xs text-gray-500 mt-1">Total</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4 text-center">
            <p className="text-2xl font-bold text-amber-500">{activeCount}</p>
            <p className="text-xs text-gray-500 mt-1">Active</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{completedCount}</p>
            <p className="text-xs text-gray-500 mt-1">Done</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6">
            <TodoInput onAdd={addTodo} />
          </div>

          <div className="border-t border-orange-50">
            <div className="px-6 pt-4">
              <TodoFilter
                filter={filter}
                onFilterChange={setFilter}
                activeCount={activeCount}
                completedCount={completedCount}
              />
            </div>
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </div>

          {todos.length > 0 && (
            <div className="px-6 py-4 border-t border-orange-50 flex items-center justify-between">
              <span className="text-sm text-gray-400">
                {activeCount} {activeCount === 1 ? 'item' : 'items'} left
              </span>
              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-sm text-rose-400 hover:text-rose-600 transition-colors duration-200 font-medium"
                >
                  Clear completed
                </button>
              )}
            </div>
          )}
        </div>

        {todos.length === 0 && (
          <div className="text-center mt-12">
            <div className="text-6xl mb-4">✨</div>
            <p className="text-gray-400 text-lg font-medium">No todos yet!</p>
            <p className="text-gray-300 text-sm mt-1">Add one above to get started</p>
          </div>
        )}
      </div>
    </main>
  );
}
