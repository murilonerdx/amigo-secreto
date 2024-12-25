import React, { useState } from 'react';
import { DrawResult } from '../types';
import { ResultCard } from './ResultCard';

interface ResultsViewProps {
  results: DrawResult[];
}

export function ResultsView({ results }: ResultsViewProps) {
  const [viewMode, setViewMode] = useState<'all' | 'private'>('private');

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Resultado do Sorteio
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('private')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'private'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Modo Privado
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'all'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Mostrar Todos
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {results.map((result, index) => (
          <ResultCard
            key={index}
            result={result}
            isPrivate={viewMode === 'private'}
          />
        ))}
      </div>
    </div>
  );
}