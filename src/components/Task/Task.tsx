import React, { FC, useState } from 'react';
import pen from './pen.png';
import { ICard, ITask } from '../../types/types';
import TaskEdit from './TaskEdit';

import './task.css';
import { coveredSlice } from '../../functions/dndFunctions';
import { useActions } from '../../hooks/useActions';

interface TaskProps {
  cardIndex: number;
  task: ITask;
  taskIndex: number;
  taskArray: ITask[];
  setDraged(arg: number): void;
  dragedElement: number;
  isDrag: boolean;
  setIsDrag(arg: boolean): void;
  dragClass: string;
  setDragedTask(arg: ITask): void;
  cardsArray: ICard[];
}
const Task: FC<TaskProps> = ({
  cardIndex,
  task,
  taskIndex,
  taskArray,
  setDraged,
  dragedElement,
  dragClass,
  setDragedTask,
  cardsArray,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { UpdateOrder } = useActions();
  const click = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsEdit(true);
  };
  const drageEvent = () => {
    setDraged(taskIndex);
    setDragedTask(taskArray[taskIndex - 1]);
  };
  const hoverEvent = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDraged(taskIndex);
    if (dragedElement !== taskIndex && dragClass === 'task') {
      const array: ITask[] = coveredSlice(taskArray, dragedElement, taskIndex);
      let newobj: ICard = {
        cardIndex: cardIndex,
        cardName: cardsArray[cardIndex - 1].cardName,
        tasks: array,
      };
      UpdateOrder(cardsArray, newobj, newobj, cardIndex, cardIndex);
    }
  };
  const dragEnd = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <div
      className="task"
      draggable="true"
      onDragStart={drageEvent}
      onDragOver={hoverEvent}
      onDrop={dragEnd}
    >
      {task.task}
      {isEdit ? (
        <TaskEdit
          cardsArray={cardsArray}
          cardIndex={cardIndex}
          taskIndex={taskIndex}
          task={task}
          setIsEdit={setIsEdit}
        />
      ) : (
        <img className="taskPen" src={pen} alt="" onClick={click} />
      )}
    </div>
  );
};
export default Task;
