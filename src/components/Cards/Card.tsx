import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import { ICard, ITask } from '../../types/types';
import './card.css';
import AddTask from '../AddTask/AddTask';
import Task from '../Task/Task';
import { useActions } from '../../hooks/useActions';
import {
  addTaskOnBoad,
  deleteTaskFromBoad,
} from '../../functions/dndFunctions';

interface CardProps {
  cardIndex: number;
  cardsArray: ICard[];
  dragedTask: ITask;
  setDragedTask(arg: ITask): void;
  setDraged(arg: number): void;
  dragedElement: number;
  setDragClass(arg: string): void;
  dragClass: string;
  board: number;
  setBoard(arg: number): void;
}

const Card: FC<CardProps> = ({
  cardIndex,
  cardsArray,
  dragedTask,
  setDragedTask,
  setDraged,
  dragedElement,
  board,
  setBoard,
  setDragClass,
  dragClass,
}) => {
  const { updateCardName, UpdateOrderTasks, UpdateOrderCards } = useActions();
  const [cardNameCurr, setCardNameCurr] = useState<string>(
    cardsArray[cardIndex - 1].cardName
  );
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [taskArray, setTaskArray] = useState<ITask[]>(
    cardsArray[cardIndex - 1].tasks
  );
  const [isDragable, setIsDragble] = useState<boolean>(true);
  const cardRef = useRef() as RefObject<HTMLTextAreaElement>;
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsAdd(true);
  };
  useEffect(() => {
    if (cardsArray[cardIndex - 1].tasks) {
      setTaskArray(cardsArray[cardIndex - 1].tasks);
      setCardNameCurr(cardsArray[cardIndex - 1].cardName);
    }
    // eslint-disable-next-line
  }, [cardsArray[cardIndex - 1]?.tasks]);

  const changeName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardNameCurr(e.target.value);
  };
  const focusName = () => {
    const area = document.querySelector(`.id${cardIndex}`);
    cardRef.current?.classList.add('cardTextareaFocused');
    area?.classList.add('cardAreaVisible');
    setIsDragble(false);
  };
  const lostFocus = () => {
    const area = document.querySelector(`.id${cardIndex}`);
    cardRef.current?.classList.remove('cardTextareaFocused');
    area?.classList.remove('cardAreaVisible');
    updateCardName(cardNameCurr, cardsArray[cardIndex - 1].cardName);
    setIsDragble(true);
  };

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const card = document.querySelectorAll('.card');
    if (event.target === card[cardIndex - 1]) {
      setDragClass('board');
    } else {
      setDragClass('task');
    }
    setBoard(cardIndex);
  };
  const dragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const dragLeave = () => {};

  const addDragedTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (board && board !== cardIndex && dragClass !== 'board') {
      setDragClass('task');
      const currcard = addTaskOnBoad(
        cardsArray[cardIndex - 1],
        dragedElement,
        dragedTask
      );
      const prevcard = deleteTaskFromBoad(cardsArray[board - 1], dragedElement);
      UpdateOrderTasks(cardsArray, prevcard, currcard, cardIndex, board);
    } else if (board && board !== cardIndex && dragClass === 'board') {
      UpdateOrderCards(
        cardsArray,
        cardsArray[board - 1],
        cardsArray[cardIndex - 1],
        cardIndex,
        board
      );
    }
    setBoard(cardIndex);
  };

  const drop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div
      className="card"
      draggable={isDragable}
      onDragStart={(e) => dragStart(e)}
      onDragOver={dragOver}
      onDragEnter={addDragedTask}
      onDragLeave={dragLeave}
      onDrop={drop}
    >
      <div className="cardTitle">
        <div className={`cardArea id${cardIndex}`} onClick={lostFocus}></div>
        <textarea
          ref={cardRef}
          className={`cardTextarea`}
          value={cardNameCurr}
          onChange={changeName}
          onFocus={focusName}
        />

        <button type="button" className="cardTitleButton">
          ...
        </button>
      </div>
      <div className='taskContainer'>
      {taskArray?.map((task, index) => (
        <div key={`${task.taskIndex} + ${index}`}>
          <Task
            taskIndex={index + 1}
            task={task}
            cardIndex={cardIndex}
            taskArray={taskArray}
            setDraged={setDraged}
            dragedElement={dragedElement}
            isDrag={isDrag}
            setIsDrag={setIsDrag}
            dragClass={dragClass}
            setDragedTask={setDragedTask}
            cardsArray={cardsArray}
          />
        </div>
      ))}
      </div>
      {isAdd ? (
        <AddTask
          cardIndex={cardIndex}
          setIsAdd={setIsAdd}
          taskArray={taskArray}
          cardsArray={cardsArray}
        />
      ) : (
        <button className="cardAdd" onClick={click}>
          Добавить задачу
        </button>
      )}
    </div>
  );
};

export default Card;
