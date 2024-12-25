import React from 'react';
import { Trash2, Users } from 'lucide-react';

interface ParticipantListProps {
  participants: string[];
  onRemove: (index: number) => void;
}

export function ParticipantList({ participants, onRemove }: ParticipantListProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Participantes ({participants.length})
        </h2>
      </div>
      <div className="space-y-2">
        {participants.map((name, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
          >
            <span className="text-gray-700">{name}</span>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}