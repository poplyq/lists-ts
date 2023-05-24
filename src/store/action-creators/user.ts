import { Dispatch } from 'redux';
import { UserAction, UserActionTypes } from '../../types/user';
import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../types/response/AuthResponse';
import axios from 'axios';
import { API_URL } from '../../http';

export const userRegistration = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.USER_REGISTRATION });
      await AuthService.registration(email, password);
      dispatch({
        type: UserActionTypes.USER_REGISTRATION_SUCCESS,
        payload: 'Пользователь зарегистрирован',
      });
    } catch (e: any) {
      dispatch({
        type: UserActionTypes.USER_REGISTRATION_ERROR,
        payload: e.response?.data?.message,
      });
      console.log(e.response?.data?.message);
    }
  };
};
export const userLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.USER_LOGIN });
      const response = await AuthService.login(email, password);
      dispatch({
        type: UserActionTypes.USER_LOGIN_SUCCESS,
        payload: response.data.user,
      });
      localStorage.setItem('token', response.data.accessToken);
    } catch (e: any) {
      dispatch({
        type: UserActionTypes.USER_LOGIN_ERROR,
        payload: e.response?.data?.message,
      });
      console.log(e.response.data.message);
    }
  };
};
export const userLogout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.USER_LOGOUT });
      await AuthService.logout();
      dispatch({
        type: UserActionTypes.USER_LOGOUT_SUCCESS,
        payload: 'Вы успешно вышли',
      });
      localStorage.removeItem('token');
    } catch (e) {
      dispatch({
        type: UserActionTypes.USER_LOGOUT_ERROR,
        payload: 'Ошибка при выходе',
      });
    }
  };
};
export const checkAuth = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.CHECK_AUTH });

      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('token', response.data.accessToken);
      dispatch({
        type: UserActionTypes.CHECK_AUTH_SUCCESS,
        payload: response.data.user,
      });
    } catch (e: any) {
      dispatch({
        type: UserActionTypes.CHECK_AUTH_ERROR,
        payload: e.response.data.message,
      });
    }
  };
};
