import React, { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useUserActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { userLogin } = useUserActions();
  const { error, isLoading, isAuth } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  const loginFunc = () => {
    userLogin(email, password);
  };
  useEffect(() => {
    if (!isLoading && isAuth) {
      navigate('/desk');
    }
  }, [isLoading, isAuth]);
  if (isLoading) {
    return <div className="loader"></div>;
  }
  return (
    <div className="login">
      <h1 className="loginLogo">Lists</h1>
      <div className="loginBlock">
        <p className="loginSub">Вход в Lists</p>
        <p> {error}</p>
        <input
          className="loginInput"
          type="email"
          placeholder="Укажите адресс электронной почты"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="loginInput"
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Link to="/desk" className="loginButton">
          <button type="button" className="loginButtonn" onClick={loginFunc}>
            Войти
          </button>
        </Link>
        <Link to="/registration" className="loginUnder">
          Забыли пароль?
        </Link>
        <Link to="/registration" className="loginUnder">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
};
