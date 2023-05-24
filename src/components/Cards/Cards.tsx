import React, { FC, useEffect, useState } from 'react';
import './cards.css';
import { ICard, ITask } from '../../types/types';
import Card from './Card';
import AddCard from '../AddCard/AddCard';

interface CardsProps {
  cards: ICard[];
}

const Cards: FC<CardsProps> = ({ cards }) => {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [cardsArray, setCardsArray] = useState<ICard[]>([]);
  const [dragedTask, setDragedTask] = useState<ITask>({
    taskOrder: 0,
    taskName: 'null',
  });
  const [dragedElement, setDraged] = useState<number>(0);
  const [board, setBoard] = useState<number>(0);
  const [dragClass, setDragClass] = useState('');
  const [startBoard, setStartBoard] = useState<number>(0);
  const clickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsAdd(true);
  };
  useEffect(() => {
    setCardsArray(cards);
  }, [cards]);

  return (
    <div className="cards">
      {cardsArray?.map((card, index) => (
        <Card
          key={card.cardOrder}
          cardOrder={card.cardOrder}
          cardsArray={cardsArray}
          setDragedTask={setDragedTask}
          dragedTask={dragedTask}
          dragedElement={dragedElement}
          setDraged={setDraged}
          setBoard={setBoard}
          board={board}
          setDragClass={setDragClass}
          dragClass={dragClass}
          setStartBoard={setStartBoard}
          startBoard={startBoard}
        />
      ))}
      {isAdd ? (
        <AddCard setIsAdd={setIsAdd} cardsArray={cardsArray} />
      ) : (
        <button className="cardsAdd" onClick={clickButton}>
          Добавить карточку
        </button>
      )}
    </div>
  );
};
export default Cards;
