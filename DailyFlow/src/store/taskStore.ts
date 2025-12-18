import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string; // ISO string
  category?: string;
  completed: boolean;
  reminderAt?: string; // ISO string
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  clearAll: () => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      editTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates } : task)),
        })),
      deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      toggleComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task,
          ),
        })),
      clearAll: () => set({ tasks: [] }),
    }),
    {
      name: 'dailyflow-tasks',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      partialize: (state) => ({ tasks: state.tasks }),
      migrate: (persistedState) => persistedState as TaskState,
    },
  ),
);
