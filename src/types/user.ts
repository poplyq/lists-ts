import { IUser } from './types';

export interface UserState {
  user: IUser | null;
  isAuth: boolean;
  error: string | null;
  isLoading?: boolean;
}

export enum UserActionTypes {
  USER_REGISTRATION = 'USER_REGISTRATION',
  USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS',
  USER_REGISTRATION_ERROR = 'USER_REGISTRATION_ERROR',
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
  USER_LOGOUT = 'USER_LOGOUT',
  USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
  USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR',
  CHECK_AUTH = 'CHECK_AUTH',
  CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS',
  CHECK_AUTH_ERROR = 'CHECK_AUTH_ERROR',
}

interface UserRegistration {
  type: UserActionTypes.USER_REGISTRATION;
}
interface UserRegistrationSuccess {
  type: UserActionTypes.USER_REGISTRATION_SUCCESS;
  payload: string;
}
interface UserRegistrationError {
  type: UserActionTypes.USER_REGISTRATION_ERROR;
  payload: string;
}
interface UserLogin {
  type: UserActionTypes.USER_LOGIN;
}
interface UserLoginSuccess {
  type: UserActionTypes.USER_LOGIN_SUCCESS;
  payload: IUser;
}
interface UserLoginError {
  type: UserActionTypes.USER_LOGIN_ERROR;
  payload: string;
}
interface UserLogout {
  type: UserActionTypes.USER_LOGOUT;
}
interface UserLogoutSuccess {
  type: UserActionTypes.USER_LOGOUT_SUCCESS;
}
interface UserLogoutError {
  type: UserActionTypes.USER_LOGOUT_ERROR;
  payload: string;
}
interface CheckAuth {
  type: UserActionTypes.CHECK_AUTH;
}
interface CheckAuthSuccess {
  type: UserActionTypes.CHECK_AUTH_SUCCESS;
  payload: IUser;
}
interface CheckAuthError {
  type: UserActionTypes.CHECK_AUTH_ERROR;
  payload: string;
}

export type UserAction =
  | UserRegistration
  | UserRegistrationSuccess
  | UserRegistrationError
  | UserLogin
  | UserLoginSuccess
  | UserLoginError
  | UserLogout
  | UserLogoutSuccess
  | UserLogoutError
  | CheckAuth
  | CheckAuthSuccess
  | CheckAuthError;
