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
  UPDATE_TASK_NAME_SUCCESS = 'UPDATE_TASK_NAME_SUCCESS',
  UPDATE_ORDER_TASKS = 'UPDATE_ORDER_TASKS',
  UPDATE_CARD_ORDER = 'UPDATE_CARD_ORDER',
  UPDATE_ORDER_CARDS = 'UPDATE_ORDER_CARDS',
  UPDATE_ORDER_CARDS_ERROR = 'UPDATE_ORDER_CARDS_ERROR',
  UPDATE_ORDER_CARDS_SUCCESS = 'UPDATE_ORDER_CARDS_SUCCESS',
  DELETE_TASK = 'DELETE_TASK',
  DELETE_TASK_ERROR = 'DELETE_TASK_ERROR',
  DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS',
  SEND_UPDATED_TASKS = 'SEND_UPDATED_TASKS',
  SEND_UPDATED_TASKS_ERROR = 'SEND_UPDATED_TASKS_ERROR',
  SEND_UPDATED_TASKS_SUCCESS = 'SEND_UPDATED_TASKS_SUCCESS',
  DELETE_CARD = 'DELETE_CARD',
  DELETE_CARD_ERROR = 'DELETE_CARD_ERROR',
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
  payload: ICard[];
}
interface SendCardActionSuccess {
  type: CardActionTypes.SEND_CARD_SUCCESS;
  payload: ICard[];
}
interface SendCardAction {
  type: CardActionTypes.SEND_CARD;
  payload: ICard[];
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
interface UpdateTaskNameSuccess {
  type: CardActionTypes.UPDATE_TASK_NAME_SUCCESS;
  payload: ICard[];
}
interface UpdateOrderTasks {
  type: CardActionTypes.UPDATE_ORDER_TASKS;
  payload: ICard[];
}
interface UpdateCardOrder {
  type: CardActionTypes.UPDATE_CARD_ORDER;
  payload: ICard[];
}
interface UpdateOrderCards {
  type: CardActionTypes.UPDATE_ORDER_CARDS;
}
interface UpdateOrderCardsSuccess {
  type: CardActionTypes.UPDATE_ORDER_CARDS_SUCCESS;
  payload: ICard[];
}
interface UpdateOrderCardsError {
  type: CardActionTypes.UPDATE_ORDER_CARDS_ERROR;
  payload: string;
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
  type: CardActionTypes.SEND_UPDATED_TASKS_ERROR;
  payload: ICard[];
}
interface SendUpdatedTasksSuccess {
  type: CardActionTypes.SEND_UPDATED_TASKS_SUCCESS;
  payload: ICard[];
}
interface DeleteCard {
  type: CardActionTypes.DELETE_CARD;
  payload: ICard[];
}
interface DeleteCardError {
  type: CardActionTypes.DELETE_CARD_ERROR;
  payload: ICard[];
}
interface DeleteCardSuccess {
  type: CardActionTypes.DELETE_CARD_SUCCESS;
  payload: ICard[];
}

export type CardsAction =
  | FetchCardsAction
  | FetchCardsActionError
  | FetchCardsActionSuccess
  | SendCardAction
  | SendCardActionError
  | SendCardActionSuccess
  | UpdateCardName
  | UpdateCardNameError
  | UpdateOrderTasks
  | UpdateCardOrder
  | UpdateOrderCards
  | UpdateOrderCardsSuccess
  | UpdateOrderCardsError
  | AddCard
  | AddTask
  | DeleteTaskAction
  | DeleteTaskActionError
  | SendUpdatedTasks
  | SendUpdatedTasksError
  | SendUpdatedTasksSuccess
  | UpdateTaskName
  | UpdateTaskNameSuccess
  | UpdateTaskNameError
  | DeleteCard
  | DeleteCardError
  | DeleteCardSuccess;
