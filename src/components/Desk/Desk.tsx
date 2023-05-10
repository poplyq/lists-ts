import React, { FC, useEffect } from 'react';
import Cards from '../Cards/Cards';
import './desk.css';
import { NavBar } from '../NavBar/NavBar';
import { Aside } from '../Aside/Aside';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

const Desk: FC = () => {
  let state = useTypedSelector((state) => state.cards);
  const { fetchCards } = useActions();
  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="container">
        <Aside />
        <Cards cards={state.cards} />
      </div>
    </div>
  );
};
export default Desk;
