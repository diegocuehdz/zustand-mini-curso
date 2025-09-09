import { IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline,  } from 'react-icons/io5';
import { clsx } from 'clsx/lite';


import { Task, TaskStatus } from '../../interfaces';

import { SingleTask } from './SingleTask';
import { useTaskStore } from '../../stores';
import { useState } from 'react';

interface Props {
  title: string;
  tasks: Task[];
  value: TaskStatus;
}


export const JiraTasks = ({ tasks, title,  value, }: Props) => {

  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const [onDragOver, setOnDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setOnDragOver(true);
      console.log('handle drag over');
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setOnDragOver(false);
      console.log('handle drag leave');
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setOnDragOver(false);
      console.log('handle drop', value);
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
        <button>
          <IoEllipsisHorizontalOutline />
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
