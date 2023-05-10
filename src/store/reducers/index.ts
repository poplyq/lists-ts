import { combineReducers } from 'redux';
import { cardReducer } from './cardReducer';
import { taskReducer } from './taskReducer';

export const rootReducer = combineReducers({
  cards: cardReducer,
  tasks: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
