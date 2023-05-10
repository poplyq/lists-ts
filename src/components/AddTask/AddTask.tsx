import React, { FC, useState } from 'react';
import './addtask.css';
import { useActions } from '../../hooks/useActions';
import { ICard, ITask } from '../../types/types';

interface AddTaskProps {
  cardIndex: number;
  setIsAdd(arg: boolean): void;
  taskArray: ITask[];
  cardsArray: ICard[];
}
const AddTask: FC<AddTaskProps> = ({
  setIsAdd,
  taskArray,
  cardIndex,
  cardsArray,
}) => {
  const { AddTask } = useActions();
  const [task, setTask] = useState<string>('');

  const getTask = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask(e.target.value);
  };
  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (task) {
      AddTask(
        [...taskArray, { taskIndex: taskArray.length + 1, task: task }],
        cardsArray,
        cardIndex
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
