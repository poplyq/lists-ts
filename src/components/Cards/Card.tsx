import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import { ICard, ITask } from '../../types/types';
import './card.css';
import AddTask from '../AddTask/AddTask';
import Task from '../Task/Task';
import { useCardsActions } from '../../hooks/useActions';
import {
  addTaskOnBoad,
  deleteTaskFromBoad,
} from '../../functions/dndFunctions';

interface CardProps {
  cardOrder: number;
  cardsArray: ICard[];
  dragedTask: ITask;
  setDragedTask(arg: ITask): void;
  setDraged(arg: number): void;
  dragedElement: number;
  setDragClass(arg: string): void;
  dragClass: string;
  board: number;
  setBoard(arg: number): void;
  startBoard: number;
  setStartBoard(arg: number): void;
}

const Card: FC<CardProps> = ({
  cardOrder,
  cardsArray,
  dragedTask,
  setDragedTask,
  setDraged,
  dragedElement,
  board,
  setBoard,
  setDragClass,
  dragClass,
  setStartBoard,
  startBoard,
}) => {
  const {
    updateCardName,
    UpdateOrderTasks,
    UpdateOrderCards,
    DeleteCard,
    sendUpdetedCardsOrder,
    sendUpdetedTaskOrder,
    sendDragedTaskOrder,
  } = useCardsActions();
  
  const [cardNameCurr, setCardNameCurr] = useState<string>(
    cardsArray[cardOrder - 1].cardName
  );
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [taskArray, setTaskArray] = useState<ITask[]>(
    cardsArray[cardOrder - 1].tasks
  );
  const [isDragable, setIsDragble] = useState<boolean>(true);
  const cardRef = useRef() as RefObject<HTMLTextAreaElement>;
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsAdd(true);
  };
  useEffect(() => {
    if (cardsArray[cardOrder - 1].tasks) {
      setTaskArray(cardsArray[cardOrder - 1].tasks);
      setCardNameCurr(cardsArray[cardOrder - 1].cardName);
    }
    // eslint-disable-next-line
  }, [cardsArray[cardOrder - 1]?.tasks]);

  const changeName = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardNameCurr(e.target.value);
  };
  const focusName = () => {
    const area = document.querySelector(`.id${cardOrder}`);
    cardRef.current?.classList.add('cardTextareaFocused');
    area?.classList.add('cardAreaVisible');
    setIsDragble(false);
  };
  const lostFocus = () => {
    const area = document.querySelector(`.id${cardOrder}`);
    cardRef.current?.classList.remove('cardTextareaFocused');
    area?.classList.remove('cardAreaVisible');
    updateCardName(cardsArray[cardOrder - 1].cardName, cardNameCurr);
    setIsDragble(true);
  };

  const dragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const card = document.querySelectorAll('.card');
    if (event.target === card[cardOrder - 1]) {
      setDragClass('board');
    } else {
      setDragClass('task');
    }
    setBoard(cardOrder);
    setStartBoard(cardOrder);
  };
  const dragOver = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };
  const addDragedTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (board && board !== cardOrder && dragClass !== 'board') {
      setBoard(cardOrder);
      const currcard = addTaskOnBoad(
        cardsArray[cardOrder - 1],
        dragedElement,
        dragedTask
      );
      const prevcard = deleteTaskFromBoad(cardsArray[board - 1], dragedElement);
      UpdateOrderTasks(cardsArray, prevcard, currcard, cardOrder, board);
    } else if (board && board !== cardOrder && dragClass === 'board') {
      setBoard(cardOrder);
      UpdateOrderCards(
        cardsArray,
        cardsArray[board - 1],
        cardsArray[cardOrder - 1],
        cardOrder,
        board
      );
    }
  };
  const drop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (dragClass === 'board') {
      sendUpdetedCardsOrder(cardsArray);
    } else {
      if (startBoard === board) {
        sendUpdetedTaskOrder(cardsArray, cardOrder);
      } else {
        sendDragedTaskOrder(cardsArray, startBoard, board, dragedTask.taskName);
      }
    }
  };
  const deleteCard = (event: React.MouseEvent<HTMLButtonElement>) => {
    DeleteCard(cardsArray, cardsArray[cardOrder - 1]);
  };

  return (
    <div
      className="card"
      draggable={isDragable}
      onDragStart={(e) => dragStart(e)}
      onDragOver={dragOver}
      onDragEnter={addDragedTask}
      onDrop={drop}
    >
      <div className="cardTitle">
        <div className={`cardArea id${cardOrder}`} onClick={lostFocus}></div>
        <textarea
          ref={cardRef}
          className={`cardTextarea`}
          value={cardNameCurr}
          onChange={changeName}
          onFocus={focusName}
        />

        <button
          type="button"
          className="cardTitleButton"
          onDoubleClick={deleteCard}
        >
          ...
        </button>
      </div>
      <div className="taskContainer">
        {taskArray?.map((task, index) => (
          <div key={`${task.taskOrder} + ${index}`}>
            <Task
              taskOrder={index + 1}
              task={task}
              cardOrder={cardOrder}
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
          cardOrder={cardOrder}
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
