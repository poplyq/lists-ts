import React, { FC, useState } from 'react';
import './addtask.css';
import { useCardsActions } from '../../hooks/useActions';
import { ICard, ITask } from '../../types/types';

interface AddTaskProps {
  cardOrder: number;
  setIsAdd(arg: boolean): void;
  taskArray: ITask[];
  cardsArray: ICard[];
}
const AddTask: FC<AddTaskProps> = ({
  setIsAdd,
  taskArray,
  cardOrder,
  cardsArray,
}) => {
  const { AddTask } = useCardsActions();
  const [task, setTask] = useState<string>('');

  const getTask = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask(e.target.value);
  };
  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (task) {
      AddTask(
        [...taskArray, { taskOrder: taskArray.length + 1, taskName: task }],
        cardsArray,
        cardOrder
      );
      setIsAdd(false);
    }
  };
  const close = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsAdd(false);
  };

  return (
    <div className="addTask">
      <textarea
        className="addTaskInput"
        onChange={getTask}
        placeholder="Добавте новую задачу для карточки"
      />
      <div className="addTaskBlock">
        <button className="addTaskButton" onClick={click}>
          Добавить задачу
        </button>
        <button className="addTaskClose" onClick={close}>
          &#xd7;
        </button>
      </div>
    </div>
  );
};

export default AddTask;
