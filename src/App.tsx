import React, { useState } from 'react';
import { Gift, Shuffle } from 'lucide-react';
import { DrawResult } from './types';
import { performDraw } from './utils';
import { ParticipantList } from './components/ParticipantList';
import { AddParticipantForm } from './components/AddParticipantForm';
import { ResultsView } from './components/ResultsView';

export default function App() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [drawResults, setDrawResults] = useState<DrawResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const handleAddParticipant = (name: string) => {
    if (participants.includes(name)) {
      setError('Este nome já está na lista');
      return;
    }
    setParticipants([...participants, name]);
    setError('');
  };

  const handleRemoveParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleDraw = () => {
    if (participants.length < 3) {
      setError('São necessários pelo menos 3 participantes');
      return;
    }
    
    try {
      const results = performDraw(participants);
      setDrawResults(results);
      setShowResults(true);
      setError('');
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-green-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Gift className="w-16 h-16 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Amigo Secreto
            </h1>
            <p className="text-gray-600">
              Organize seu sorteio de amigo secreto de forma fácil e divertida!
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
            <AddParticipantForm onAdd={handleAddParticipant} error={error} />
            <ParticipantList 
              participants={participants} 
              onRemove={handleRemoveParticipant} 
            />

            <button
              onClick={handleDraw}
              disabled={participants.length < 3}
              className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Shuffle className="w-5 h-5" />
              Realizar Sorteio
            </button>
          </div>

          {showResults && <ResultsView results={drawResults} />}
        </div>
      </div>
    </div>
  );
}