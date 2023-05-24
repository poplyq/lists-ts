import { combineReducers } from 'redux';
import { cardReducer } from './cardReducer';
import { taskReducer } from './taskReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  cards: cardReducer,
  tasks: taskReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
