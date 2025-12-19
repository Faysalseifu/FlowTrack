import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  category?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

interface NoteState {
  notes: Note[];
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  clearAll: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (note) =>
        set((state) => {
          const now = new Date().toISOString();
          return {
            notes: [
              ...state.notes,
              { ...note, id: Date.now().toString(), createdAt: now, updatedAt: now },
            ],
          };
        }),
      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note,
          ),
        })),
      deleteNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
      clearAll: () => set({ notes: [] }),
    }),
    {
      name: 'dailyflow-notes',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      partialize: (state) => ({ notes: state.notes }),
    },
  ),
);
