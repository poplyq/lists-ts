import { ICard } from './types';

export interface CardsState {
  cards: ICard[];
  error: string | null | ICard[];
}

export enum CardActionTypes {
  FETCH_CARDS = 'FETCH_CARDS',
  FETCH_CARDS_SUCCESS = 'FETCH_CARDS_SUCCESS',
  FETCH_CARDS_ERROR = 'FETCH_CARDS_ERROR',
  ADD_CARD = 'ADD_CARD',
  ADD_TASK = 'ADD_TASK',
  SEND_CARD = 'SEND_CARD',
  SEND_CARD_SUCCESS = 'SEND_CARD_SUCCESS',
  SEND_CARD_ERROR = 'SEND_CARD_ERROR',
  UPDATE_CARDNAME = 'UPDATE_CARD_NAME',
  UPDATE_CARDNAME_ERROR = 'UPDATE_CARDNAME_ERROR',
  UPDATE_TASK_NAME = 'UPDATE_TASK_NAME',
  UPDATE_TASK_NAME_ERROR = 'UPDATE_TASK_NAME_ERROR',
  UPDATE_ORDER_TASKS = 'UPDATE_ORDER_TASKS',
  UPDATE_ORDER_CARDS = 'UPDATE_ORDER_CARDS',
  DELETE_TASK = 'DELETE_TASK',
  DELETE_TASK_ERROR = 'DELETE_TASK_ERROR',
  SEND_UPDATED_TASKS = 'SEND_UPDATED_TASKS',
  SEND_UPDATED_TASKS_ERROR = 'SEND_UPDATED_TASKS_ERROR',
  DELETE_TO_UPDATE = 'DELETE_TO_UPDATE',
  DELETE_TO_UPDATE_ERROR = 'DELETE_TO_UPDATE_ERROR',
  UPDATE_ALL_DATA = 'UPDATE_ALL_DATA',
  UPDATE_ALL_DATA_ERROR = 'UPDATE_ALL_DATA_ERROR',
}
interface FetchCardsAction {
  type: CardActionTypes.FETCH_CARDS;
}
interface FetchCardsActionError {
  type: CardActionTypes.FETCH_CARDS_ERROR;
  payload: string;
}
interface FetchCardsActionSuccess {
  type: CardActionTypes.FETCH_CARDS_SUCCESS;
  payload: ICard[];
}
interface SendCardActionError {
  type: CardActionTypes.SEND_CARD_ERROR;
  payload: string;
}
interface SendCardActionSuccess {
  type: CardActionTypes.SEND_CARD_ERROR;
  payload: ICard[];
}
interface SendCardAction {
  type: CardActionTypes.SEND_CARD;
}
interface UpdateCardName {
  type: CardActionTypes.UPDATE_CARDNAME;
}
interface UpdateCardNameError {
  type: CardActionTypes.UPDATE_CARDNAME_ERROR;
  payload: string;
}
interface UpdateTaskName {
  type: CardActionTypes.UPDATE_TASK_NAME;
}
interface UpdateTaskNameError {
  type: CardActionTypes.UPDATE_TASK_NAME_ERROR;
  payload: ICard[];
}
interface UpdateOrderTasks {
  type: CardActionTypes.UPDATE_ORDER_TASKS;
  payload: ICard[];
}
interface UpdateOrderCards {
  type: CardActionTypes.UPDATE_ORDER_CARDS;
  payload: ICard[];
}
interface AddCard {
  type: CardActionTypes.ADD_CARD;
  payload: ICard[];
}
interface AddTask {
  type: CardActionTypes.ADD_TASK;
  payload: ICard[];
}
interface DeleteTaskAction {
  type: CardActionTypes.DELETE_TASK;
}
interface DeleteTaskActionError {
  type: CardActionTypes.DELETE_TASK_ERROR;
  payload: ICard[];
}
interface SendUpdatedTasks {
  type: CardActionTypes.SEND_UPDATED_TASKS;
}
interface SendUpdatedTasksError {
  type: CardActionTypes.SEND_UPDATED_TASKS;
  payload: ICard[];
}
interface DeleteToUpdate {
  type: CardActionTypes.DELETE_TO_UPDATE;
}
interface DeleteToUpdateError {
  type: CardActionTypes.DELETE_TO_UPDATE_ERROR;
  payload: ICard[];
}
interface UpdateAllData {
  type: CardActionTypes.UPDATE_ALL_DATA;
}
interface UpdateAllDataError {
  type: CardActionTypes.UPDATE_ALL_DATA_ERROR;
  payload: ICard[];
}

export type CardsAction =
  | FetchCardsAction
  | FetchCardsActionError
  | FetchCardsActionSuccess
  | SendCardActionError
  | SendCardAction
  | UpdateCardName
  | UpdateCardNameError
  | UpdateOrderTasks
  | UpdateOrderCards
  | AddCard
  | AddTask
  | SendCardActionSuccess
  | DeleteTaskAction
  | DeleteTaskActionError
  | SendUpdatedTasks
  | SendUpdatedTasksError
  | UpdateTaskName
  | UpdateTaskNameError
  | DeleteToUpdate
  | DeleteToUpdateError
  | UpdateAllData
  | UpdateAllDataError;
