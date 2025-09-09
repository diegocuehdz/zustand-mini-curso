import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import type { Task, TaskStatus } from "../../interfaces";

export interface TaskState {
  draggingTaskId?: string;
  tasks: Record<string, Task>;
  setDraggingTaskId: (id: string) => void;
  getTaskByStatus: (status: TaskStatus) => Task[];
  removeDraggingTaskId: () => void;
}

const storeAPI: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
  getTaskByStatus: (status: TaskStatus) => {
    const { tasks } = get();
    return Object.values(tasks).filter(task => task.status === status);
  },
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),
  setDraggingTaskId: (id: string) => set({ draggingTaskId: id }),
  tasks: {
    'ABC-1': { id: 'ABC-1', status: 'open', title: 'Task 1', },
    'ABC-2': { id: 'ABC-2', status: 'in-progress', title: 'Task 2', },
    'ABC-3': { id: 'ABC-3', status: 'open', title: 'Task 3', },
    'ABC-4': { id: 'ABC-4', status: 'open', title: 'Task 4', },
  },
})

export const useTaskStore = create<TaskState>()(devtools(storeAPI));
