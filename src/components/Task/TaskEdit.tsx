import React, { FC, useEffect, useState } from 'react';
import './taskesit.css';
import { ICard, ITask } from '../../types/types';
import { useCardsActions } from '../../hooks/useActions';

interface TaskEditProps {
  cardsArray: ICard[];
  cardOrder: number;
  task: ITask;
  taskOrder: number;
  setIsEdit(arg: boolean): void;
}
const TaskEdit: FC<TaskEditProps> = ({
  task,
  cardOrder,
  taskOrder,
  setIsEdit,
  cardsArray,
}) => {
  const [value, setValue] = useState<string>(task.taskName);
  const { deleteTask, updateTaskName } = useCardsActions();

  const typing = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };
  const deleteTaskButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteTask(cardsArray, cardOrder, taskOrder);
    setIsEdit(false);
  };
  const saveTask = () => {
    setIsEdit(false);
    updateTaskName(cardsArray, cardOrder, taskOrder, value);
  };
  const close = () => {
    setIsEdit(false);
  };

  return (
    <div>
      <button className="taskEditButton">Открыть карточку</button>
      <button className="taskDeleteButton" onClick={deleteTaskButton}>
        Удалить карточку
      </button>
      <button className="taskEditSave" onClick={saveTask}>
        Сохранить
      </button>
      <div className="taskEdit" onClick={close}></div>
      <textarea
        className="taskEditArea"
        value={value}
        onChange={typing}
      ></textarea>
    </div>
  );
};
export default TaskEdit;
