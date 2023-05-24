import React, { FC, useCallback, useState } from 'react';
import { ICard, ITask } from '../../types/types';
import TaskEdit from './TaskEdit';
import './task.css';
import { coveredSlice } from '../../functions/dndFunctions';
import { useCardsActions } from '../../hooks/useActions';

interface TaskProps {
  cardOrder: number;
  task: ITask;
  taskOrder: number;
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
  cardOrder,
  task,
  taskOrder,
  taskArray,
  setDraged,
  dragedElement,
  dragClass,
  setDragedTask,
  cardsArray,
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { UpdateOrderTasks } = useCardsActions();
  // const click = (e: React.MouseEvent<HTMLImageElement>) => {
  //   setIsEdit(true);
  // };
  const drageEvent = () => {
    setDraged(taskOrder);
    setDragedTask(taskArray[taskOrder - 1]);
  };
  const hoverEvent = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDraged(taskOrder);

    if (dragedElement !== taskOrder && dragClass === 'task') {
      const array: ITask[] = coveredSlice(taskArray, dragedElement, taskOrder);
      let newobj: ICard = {
        cardOrder: cardOrder,
        cardName: cardsArray[cardOrder - 1].cardName,
        tasks: array,
      };
      UpdateOrderTasks(cardsArray, newobj, newobj, cardOrder, cardOrder);
    }
  };
  const dragEnd = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  return (
    <div>
      <div
        className="task"
        draggable="true"
        onDragStart={drageEvent}
        onDragOver={hoverEvent}
        onDrop={dragEnd}
        onClick={() => setIsEdit(true)}
      >
        <p>{task.taskName}</p>
      </div>
      <div>
        {isEdit && (
          <TaskEdit
            cardsArray={cardsArray}
            cardOrder={cardOrder}
            taskOrder={taskOrder}
            task={task}
            setIsEdit={setIsEdit}
          />
        )}
      </div>
    </div>
  );
};
export default Task;
