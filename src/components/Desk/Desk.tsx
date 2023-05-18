import React, { FC, useEffect } from 'react';
import Cards from '../Cards/Cards';
import './desk.css';
import { NavBar } from '../NavBar/NavBar';
import { Aside } from '../Aside/Aside';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useCardsActions } from '../../hooks/useActions';
import { useNavigate } from 'react-router-dom';

const Desk: FC = () => {
  let user = useTypedSelector((state) => state.user);
  let state = useTypedSelector((state) => state.cards);
  const { fetchCards } = useCardsActions();
  const navigator = useNavigate();
  useEffect(() => {
    if (!user.isAuth) {
      navigator('/login');
    } else {
      fetchCards();
    }
    // eslint-disable-next-line
  }, [user.isAuth]);

  if (user.isLoading) {
    return <div className="loader"></div>;
  }
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
