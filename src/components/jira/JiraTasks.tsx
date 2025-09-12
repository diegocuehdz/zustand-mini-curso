import { IoAddOutline, IoCheckmarkCircleOutline, } from 'react-icons/io5';
import { clsx } from 'clsx/lite';
import Swal from 'sweetalert2'
import { useState } from 'react';

import { Task, TaskStatus } from '../../interfaces';
import { useTaskStore } from '../../stores';

import { SingleTask } from './SingleTask';

interface Props {
  title: string;
  tasks: Task[];
  status: TaskStatus;
}


export const JiraTasks = ({ status, tasks, title, }: Props) => {
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

  return (
    <div
    className={clsx(
      "!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]",
      isDragging && "border-blue-500 border-dotted",
      isDragging && onDragOver && "border-green-500 border-dotted",
    )}
    onDragLeave={handleDragLeave}
    onDragOver={handleDragOver}
    onDrop={handleDrop}
    >
      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">
        <div className="flex items-center justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>
          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>
        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>
      </div>
      {/* Task Items */ }
      <div className="h-full w-full">
        {tasks.map((t) => {
          return <SingleTask key={t.id} task={t} />
        })}
      </div>
    </div>
  );
};
