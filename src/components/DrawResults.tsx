import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { DrawResult } from '../types';

interface DrawResultsProps {
  results: DrawResult[];
}

interface ResultCardProps {
  result: DrawResult;
  isPrivate?: boolean;
}

function ResultCard({ result, isPrivate = false }: ResultCardProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (!isPrivate) {
    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-700">
          <span className="font-semibold">{result.giver}</span> tirou{' '}
          <span className="font-semibold">{result.receiver}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
      <p className="text-gray-700">
        <span className="font-semibold">{result.giver}</span> tirou{' '}
        <span className={`font-semibold ${!isVisible ? 'blur-sm select-none' : ''}`}>
          {result.receiver}
        </span>
      </p>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="text-gray-500 hover:text-gray-700 transition-colors"
        aria-label={isVisible ? 'Ocultar resultado' : 'Mostrar resultado'}
      >
        {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}