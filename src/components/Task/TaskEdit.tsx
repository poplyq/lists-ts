import React, { FC, useEffect, useState } from 'react';
import './taskesit.css';
import { ICard, ITask } from '../../types/types';
import { useActions } from '../../hooks/useActions';

interface TaskEditProps {
  cardsArray: ICard[];
  cardIndex: number;
  task: ITask;
  taskIndex: number;
  setIsEdit(arg: boolean): void;
}
const TaskEdit: FC<TaskEditProps> = ({
  task,
  cardIndex,
  taskIndex,
  setIsEdit,
  cardsArray,
}) => {
  const [value, setValue] = useState<string>(task.task);
  const { deleteTask, updateTaskName } = useActions();

  const typing = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  const deleteTaskButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteTask(cardsArray, cardIndex, taskIndex);
    setIsEdit(false);
  };
  const saveTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    updateTaskName(cardsArray, cardIndex, taskIndex, value);
    setIsEdit(false);
  };
  useEffect(() => {
    const closeArea = document.querySelector('.taskEdit');
    closeArea?.addEventListener('click', () => {
      setIsEdit(false);
    });
  });
  return (
    <div>
      <div className="taskEdit"></div>
      <textarea
        className="taskEditArea"
        value={value}
        onChange={typing}
      ></textarea>
      <button className="taskEditButton">Открыть карточку</button>
      <button className="taskDeleteButton" onClick={deleteTaskButton}>
        Удалить карточку
      </button>
      <button className="taskEdiSave" onClick={saveTask}>
        Сохранить
      </button>
    </div>
  );
};
export default TaskEdit;
