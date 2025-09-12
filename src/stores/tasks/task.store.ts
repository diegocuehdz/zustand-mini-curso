import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { v4 as UUIDv4 } from 'uuid'

import type { Task, TaskStatus } from "../../interfaces";

export interface TaskState {
  addTask: (title: string, status: TaskStatus) => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  draggingTaskId?: string;
  getTaskByStatus: (status: TaskStatus) => Task[];
  onTaskDrop: (status: TaskStatus) => void;
  tasks: Record<string, Task>;
  setDraggingTaskId: (id: string) => void;
  removeDraggingTaskId: () => void;
}

const storeAPI: StateCreator<TaskState> = (set, get) => ({
  addTask: (title: string, status: TaskStatus) => {
    const newTask: Task = {
      id: UUIDv4(),
      status,
      title,
    }
    set((state) => ({
      tasks: {
        ...state.tasks,
        [newTask.id]: newTask,
      }
    }))
  },
  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;
    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      }
    }))
  },
  draggingTaskId: undefined,
  getTaskByStatus: (status: TaskStatus) => {
    const { tasks } = get();
    return Object.values(tasks).filter(task => task.status === status);
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
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
