import { Dispatch } from 'redux';
import { CardActionTypes, CardsAction } from '../../types/cards';
import axios from 'axios';
import { TaskActionsTypes, TasksAction } from '../../types/task';
import { ICard, ITask } from '../../types/types';
import cloneDeep from 'lodash.clonedeep';
import {
  addTaskFunc,
  updateOrderFunc,
  updateTaskNameFunc,
  updateTaskOrderFunc,
} from '../../functions/updateOrder';
import { sortCardsFunc } from '../../functions/sortCards';

export const fetchCards = () => {
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      console.log('fetch');

      dispatch({ type: CardActionTypes.FETCH_CARDS });
      const response = await axios.get<ICard[]>('http://localhost:4000/cards');
      dispatch({
        type: CardActionTypes.FETCH_CARDS_SUCCESS,
        payload: sortCardsFunc(response.data),
      });
    } catch (e) {
      dispatch({
        type: CardActionTypes.FETCH_CARDS_ERROR,
        payload: 'Try later',
      });
    }
  };
};

export const UpdateOrder = (
  arr: ICard[],
  prevCard: ICard,
  currCard: ICard,
  currboard: number,
  prevboard: number
) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    const newCards = <ICard[]>(
      updateOrderFunc(arr, prevCard, currCard, currboard, prevboard)
    );
    const clone = cloneDeep(newCards);
    dispatch({
      type: CardActionTypes.UPDATE_ORDER,
      payload: clone,
    });
  };
};
export const AddCard = (arr: ICard[]) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    const clone = cloneDeep(arr);
    try {
      dispatch({ type: CardActionTypes.SEND_CARD });
      const newCard = <ICard>{
        cardIndex: clone.length,
        cardName: clone[clone.length - 1].cardName,
        tasks: <ITask[]>[
          { taskIndex: 1, task: clone[clone.length - 1].tasks[0].task },
        ],
      };
      await axios.post('http://localhost:4000/addcard', newCard).then(() => {
        dispatch({ type: CardActionTypes.ADD_CARD, payload: clone });
      });
    } catch {
      dispatch({ type: CardActionTypes.ADD_CARD, payload: clone });
    }
  };
};
export const AddTask = (arr: ITask[], arrCards: ICard[], index: number) => {
  const newarr = addTaskFunc(arrCards, arr, index);
  const clone = cloneDeep(newarr);
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.SEND_CARD });
      const newCard = {
        cardIndex: index,
        cardName: clone[index - 1].cardName,
        task: arr[arr.length - 1].task,
        taskIndex: arr[arr.length - 1].taskIndex,
      };
      await axios.post('http://localhost:4000/addtask', newCard).then(() => {
        dispatch({ type: CardActionTypes.ADD_CARD, payload: clone });
      });
    } catch {
      dispatch({ type: CardActionTypes.ADD_CARD, payload: clone });
    }
  };
};

export const deleteTask = (
  cardArr: ICard[],
  cardIndex: number,
  taskIndex: number
) => {
  const newarr = updateTaskOrderFunc(cardArr, cardIndex, taskIndex);
  const clone = cloneDeep(newarr);
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.DELETE_TASK });
      const newCard = {
        cardName: cardArr[cardIndex - 1].cardName,
        task: cardArr[cardIndex - 1].tasks[taskIndex - 1].task,
      };
      await axios
        .post('http://localhost:4000/deletetask', newCard)
        .then(() => {
          dispatch({ type: CardActionTypes.SEND_UPDATED_TASKS });
          axios.post(
            `http://localhost:4000/updatetask/order/${
              clone[cardIndex - 1].cardName
            }`,
            { tasks: clone[cardIndex - 1].tasks }
          );
        })
        .then(() => {
          dispatch({ type: CardActionTypes.ADD_CARD, payload: clone });
        });
    } catch (e) {
      dispatch({
        type: CardActionTypes.DELETE_TASK_ERROR,
        payload: clone,
      });
    }
  };
};
export const updateTaskName = (
  cardarr: ICard[],
  cardIndex: number,
  taskIndex: number,
  newTaskName: string
) => {
  const newarr = <ICard[]>(
    updateTaskNameFunc(cardarr, cardIndex, taskIndex, newTaskName)
  );
  const clone = cloneDeep(newarr);
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.UPDATE_TASK_NAME });
      await axios
        .post(
          `http://localhost:4000/updatetask/name/${
            cardarr[cardIndex - 1].cardName
          }`,
          {
            prevtask: cardarr[cardIndex - 1].tasks[taskIndex - 1].task,
            currtask: newTaskName,
          }
        )
        .then(() => {
          dispatch({ type: CardActionTypes.ADD_CARD, payload: clone });
        });
    } catch (e) {
      dispatch({
        type: CardActionTypes.UPDATE_TASK_NAME_ERROR,
        payload: clone,
      });
    }
  };
};

export const DeleteToUpdate = (arrCards: ICard[]) => {
  const clone = cloneDeep(arrCards);
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.DELETE_TO_UPDATE });
      const cardNameArr: string[] = [];
      arrCards.forEach((e) => {
        cardNameArr.push(e.cardName);
      });
      await axios
        .post('http://localhost:4000/delete-to-update', {
          cardNameArr: cardNameArr,
        })
        .then(() => {
          dispatch({ type: CardActionTypes.UPDATE_ALL_DATA });
          axios.post('http://localhost:4000/update-all-data', { clone });
        });
    } catch {
      dispatch({
        type: CardActionTypes.DELETE_TO_UPDATE_ERROR,
        payload: clone,
      });
    }
  };
};
export const updateCardName = (cardName: string, prevcardName: string) => {
  return async (dispatch: Dispatch<TasksAction>) => {
    try {
      dispatch({ type: TaskActionsTypes.UPDATE_TASK });
      await axios.post(`http://localhost:4000/updatecardname`, {
        cardName: cardName,
        prevcardName: prevcardName,
      });
    } catch (e) {
      dispatch({
        type: TaskActionsTypes.SEND_TASK_ERROR,
        payload: 'try later',
      });
    }
  };
};
