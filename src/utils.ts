import { DrawResult } from './types';

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function createDrawPairs(participants: string[]): DrawResult[] | null {
  const shuffled = shuffleArray(participants);
  const results: DrawResult[] = [];

  // Check if anyone got themselves
  for (let i = 0; i < participants.length; i++) {
    const giver = participants[i];
    const receiver = shuffled[i];
    
    if (giver === receiver) {
      return null; // Invalid draw, someone got themselves
    }
    
    results.push({ giver, receiver });
  }

  return results;
}

export function performDraw(participants: string[]): DrawResult[] {
  let results: DrawResult[] | null = null;
  let attempts = 0;
  const maxAttempts = 100; // Prevent infinite loop

  while (results === null && attempts < maxAttempts) {
    results = createDrawPairs(participants);
    attempts++;
  }

  if (!results) {
    throw new Error('Não foi possível realizar o sorteio. Tente novamente.');
  }

  return results;
}