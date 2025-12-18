import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface RoutineItem {
  id: string;
  title: string;
  time: string; // e.g., "07:00"
  completed: boolean;
}

interface RoutineState {
  routines: RoutineItem[];
  addRoutine: (item: RoutineItem) => void;
  updateRoutine: (id: string, updates: Partial<RoutineItem>) => void;
  deleteRoutine: (id: string) => void;
  toggleRoutine: (id: string) => void;
  clearAll: () => void;
}

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set) => ({
      routines: [],
      addRoutine: (item) => set((state) => ({ routines: [...state.routines, item] })),
      updateRoutine: (id, updates) =>
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === id ? { ...routine, ...updates } : routine,
          ),
        })),
      deleteRoutine: (id) => set((state) => ({ routines: state.routines.filter((r) => r.id !== id) })),
      toggleRoutine: (id) =>
        set((state) => ({
          routines: state.routines.map((routine) =>
            routine.id === id ? { ...routine, completed: !routine.completed } : routine,
          ),
        })),
      clearAll: () => set({ routines: [] }),
    }),
    {
      name: 'dailyflow-routines',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      partialize: (state) => ({ routines: state.routines }),
    },
  ),
);
