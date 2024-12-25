import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddParticipantFormProps {
  onAdd: (name: string) => void;
  error: string;
}

export function AddParticipantForm({ onAdd, error }: AddParticipantFormProps) {
  const [newName, setNewName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      onAdd(newName.trim());
      setNewName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Digite o nome do participante"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          type="submit"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </form>
  );
}