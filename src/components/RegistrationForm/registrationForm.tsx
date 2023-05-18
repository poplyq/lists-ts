import React, { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';
import { useUserActions } from '../../hooks/useActions';

export const RegistrationForm: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatePass, setRepeate] = useState('');
  const [notEqual, setEqual] = useState('');
  const { userRegistration } = useUserActions();
  useEffect(() => {
    if (repeatePass) {
      if (!(password === repeatePass)) {
        setTimeout(() => {
          setEqual('пароли не совпадают');
        }, 100);
      } else {
        setEqual('');
      }
    }
    // eslint-disable-next-line
  }, [repeatePass]);

  const createAcc = () => {
    if (password === repeatePass) {
      userRegistration(email, password);
    }
  };
  return (
    <div className="login">
      <h1 className="loginLogo">Lists</h1>
      <div className="loginBlock">
        <p className="loginSub">Зарегистрируйся в Lists</p>
        <p>{notEqual}</p>
        <input
          className="loginInput"
          type="email"
          placeholder="Укажите адресс электронной почты"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          className="loginInput"
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <input
          className="loginInput"
          type="password"
          placeholder="Повторите пароль"
          onChange={(e) => setRepeate(e.target.value)}
        ></input>
        <Link to={'/desk'} className="loginLink">
          <button className="loginButtonn" onClick={createAcc}>
            Создать аккаунт
          </button>
        </Link>
        <Link to={'/login'} className="loginUnder">
          Есть аккаунт? Войти
        </Link>
      </div>
    </div>
  );
};
