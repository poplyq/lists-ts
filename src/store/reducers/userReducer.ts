import { UserState, UserAction, UserActionTypes } from '../../types/user';

const initialState: UserState = {
  user: null,
  isAuth: false,
  error: null,
  isLoading: false,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionTypes.USER_REGISTRATION:
      return state;
    case UserActionTypes.USER_REGISTRATION_SUCCESS:
      return state;
    case UserActionTypes.USER_REGISTRATION_ERROR:
      return { user: null, isAuth: false, error: action.payload };
    case UserActionTypes.USER_LOGIN:
      return state;
    case UserActionTypes.USER_LOGIN_SUCCESS:
      return { user: action.payload, isAuth: true, error: null };
    case UserActionTypes.USER_LOGIN_ERROR:
      return { user: null, isAuth: false, error: action.payload };
    case UserActionTypes.USER_LOGOUT:
      return state;
    case UserActionTypes.USER_LOGOUT_SUCCESS:
      return { user: null, isAuth: false, error: null };
    case UserActionTypes.USER_LOGOUT_ERROR:
      return { user: null, isAuth: false, error: action.payload };
    case UserActionTypes.CHECK_AUTH:
      return { user: state.user, isAuth: true, error: null, isLoading: true };
    case UserActionTypes.CHECK_AUTH_SUCCESS:
      return {
        user: action.payload,
        isAuth: true,
        error: null,
        isLoading: false,
      };
    case UserActionTypes.CHECK_AUTH_ERROR:
      return {
        user: null,
        isAuth: false,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};
