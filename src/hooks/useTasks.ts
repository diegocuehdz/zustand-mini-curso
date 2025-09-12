import Swal from "sweetalert2";
import { useState } from "react";

import { TaskStatus } from "../interfaces";
import { useTaskStore } from "../stores";

export const useTasks = ({ status }: { status: TaskStatus }) => {

  const [onDragOver, setOnDragOver] = useState(false);

  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
  const addTask = useTaskStore(state => state.addTask);

  const handleAddTask = async () => {
    const { isConfirmed, value: taskName } = await Swal.fire({
      input: 'text',
      inputLabel: 'Nombre de la tarea',
      inputPlaceholder: 'Ingrese el nombre de la tarea',
      inputValidator: (value) => {
        if (!value) return "Por favor ingrese el nombre de la tarea"
      },
      showCancelButton: true,
      title: 'Nueva Tarea',
    })
    if (!isConfirmed) return;

    addTask(taskName, status)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return {
    handleAddTask,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    isDragging,
    onDragOver,
  }
}
