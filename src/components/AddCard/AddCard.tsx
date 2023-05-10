import React, { FC, useState } from 'react';
import '../AddCard/addcard.css';
import { useActions } from '../../hooks/useActions';
import { ICard } from '../../types/types';

interface AddCardProps {
  setIsAdd(arg: boolean): void;
  cardsArray: ICard[];
}
const AddCard: FC<AddCardProps> = ({ setIsAdd, cardsArray }) => {
  const { AddCard } = useActions();
  const [desk, setDesk] = useState<string>('');
  const [task, setTask] = useState<string>('');

  const getDesk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesk(e.target.value);
  };
  const getTask = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask(e.target.value);
  };

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (desk && task) {
      const newCard: ICard = {
        cardIndex: cardsArray.length + 1,
        cardName: desk,
        tasks: [{ taskIndex: 1, task: task }],
      };
      AddCard([...cardsArray, newCard]);

      setIsAdd(false);
    }
  };

  return (
    <div className="addCards">
      <input
        className="addCardsInput"
        onChange={getDesk}
        placeholder="Введите название новой карточки"
      />
      <textarea
        className="addCardsInput"
        onChange={getTask}
        placeholder="Добавте первую задачу для карточки"
      />
      <div className="addCardsBlock">
        <button className="addCardsButton" onClick={click}>
          Добавить карточку
        </button>
      </div>
    </div>
  );
};

export default AddCard;
