import { Dispatch } from 'redux';
import { CardActionTypes, CardsAction } from '../../types/cards';
import { ICard, ITask } from '../../types/types';
import cloneDeep from 'lodash.clonedeep';
import {
  addTaskFunc,
  updateNumbersCard,
  updateOrderCardsFunc,
  updateOrderFunc,
  updateTaskNameFunc,
  updateTaskOrderFunc,
} from '../../functions/updateOrder';
import { sortCardsFunc } from '../../functions/sortCards';
import $api from '../../http';

export const fetchCards = () => {
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.FETCH_CARDS });
      const response = await $api.get(`/cards`);
      dispatch({
        type: CardActionTypes.FETCH_CARDS_SUCCESS,
        payload: sortCardsFunc(response.data.resData),
      });
    } catch (e) {
      dispatch({
        type: CardActionTypes.FETCH_CARDS_ERROR,
        payload: 'Try later',
      });
    }
  };
};

export const AddCard = (arr: ICard[]) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    const clone = cloneDeep(arr);
    try {
      dispatch({ type: CardActionTypes.SEND_CARD, payload: clone });
      const newCard = {
        cardOrder: clone.length,
        cardName: clone[clone.length - 1].cardName,
        taskOrder: 1,
        taskName: clone[clone.length - 1].tasks[0].taskName,
      };
      $api.post('/add/card', newCard);
      dispatch({ type: CardActionTypes.SEND_CARD_SUCCESS, payload: clone });
    } catch {
      dispatch({ type: CardActionTypes.SEND_CARD_ERROR, payload: clone });
    }
  };
};
export const AddTask = (arr: ITask[], arrCards: ICard[], index: number) => {
  const newarr = addTaskFunc(arrCards, arr, index);
  const clone = cloneDeep(newarr);
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.SEND_CARD, payload: clone });
      const newCard = {
        cardOrder: index,
        cardName: clone[index - 1].cardName,
        taskName: arr[arr.length - 1].taskName,
        taskOrder: arr[arr.length - 1].taskOrder,
      };
      $api.post('/add/card', newCard).then(() => {
        dispatch({ type: CardActionTypes.SEND_CARD_SUCCESS, payload: clone });
      });
    } catch {
      dispatch({ type: CardActionTypes.SEND_CARD_ERROR, payload: clone });
    }
  };
};
export const DeleteCard = (arrCards: ICard[], card: ICard) => {
  const newarr = updateNumbersCard([
    ...arrCards.slice(0, card.cardOrder - 1),
    ...arrCards.slice(card.cardOrder),
  ]);
  console.log(newarr);
  const clone = cloneDeep(newarr);
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.DELETE_CARD, payload: clone });
      await $api.post('/delete/card', card);
      await $api.post('/update/card/order', { cards: clone }).then(() => {
        dispatch({ type: CardActionTypes.DELETE_CARD_SUCCESS, payload: clone });
      });
    } catch {
      dispatch({ type: CardActionTypes.DELETE_CARD_ERROR, payload: clone });
    }
  };
};

export const deleteTask = (
  cardArr: ICard[],
  cardOrder: number,
  taskOrder: number
) => {
  const newarr = updateTaskOrderFunc(cardArr, cardOrder, taskOrder);
  const clone = cloneDeep(newarr);
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.DELETE_TASK });
      await $api
        .post('/delete/task', {
          cardName: cardArr[cardOrder - 1].cardName,
          taskName: cardArr[cardOrder - 1].tasks[taskOrder - 1].taskName,
        })
        .then(() => {
          dispatch({ type: CardActionTypes.SEND_UPDATED_TASKS });
          $api.post('/update/task/order', {
            tasks: clone[cardOrder - 1].tasks,
            cardName: clone[cardOrder - 1].cardName,
          });
        })
        .then(() => {
          dispatch({
            type: CardActionTypes.SEND_UPDATED_TASKS_SUCCESS,
            payload: clone,
          });
        });
    } catch (e) {
      dispatch({
        type: CardActionTypes.SEND_UPDATED_TASKS_ERROR,
        payload: clone,
      });
    }
  };
};
export const updateTaskName = (
  cardarr: ICard[],
  cardOrder: number,
  taskOrder: number,
  newTaskName: string
) => {
  const newarr: ICard[] = updateTaskNameFunc(
    cardarr,
    cardOrder,
    taskOrder,
    newTaskName
  );
  console.log(
    cardarr[cardOrder - 1].cardName,
    cardarr[cardOrder - 1].tasks[taskOrder - 1].taskName,
    newTaskName
  );

  const clone = cloneDeep(newarr);
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.UPDATE_TASK_NAME });
      $api.post('/update/task/name', {
        cardName: cardarr[cardOrder - 1].cardName,
        taskName: cardarr[cardOrder - 1].tasks[taskOrder - 1].taskName,
        newName: newTaskName,
      });
      dispatch({
        type: CardActionTypes.UPDATE_TASK_NAME_SUCCESS,
        payload: clone,
      });
    } catch (e) {
      dispatch({
        type: CardActionTypes.UPDATE_TASK_NAME_ERROR,
        payload: clone,
      });
    }
  };
};

export const updateCardName = (cardName: string, newName: string) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.UPDATE_CARDNAME });
      await $api.post('/update/card/name', {
        cardName: cardName,
        newName: newName,
      });
    } catch (e) {
      dispatch({
        type: CardActionTypes.UPDATE_CARDNAME_ERROR,
        payload: 'try later',
      });
    }
  };
};

export const sendUpdetedCardsOrder = (cardsArr: ICard[]) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.UPDATE_ORDER_CARDS });
      await $api.post('/update/card/order', { cards: cardsArr });
      dispatch({
        type: CardActionTypes.UPDATE_ORDER_CARDS_SUCCESS,
        payload: cardsArr,
      });
    } catch {
      dispatch({
        type: CardActionTypes.UPDATE_ORDER_CARDS_ERROR,
        payload: 'Ошибка сервера',
      });
    }
  };
};
export const sendUpdetedTaskOrder = (cardsArr: ICard[], cardOrder: number) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.SEND_UPDATED_TASKS });
      $api.post('/update/task/order', {
        tasks: cardsArr[cardOrder - 1].tasks,
        cardName: cardsArr[cardOrder - 1].cardName,
      });
      dispatch({
        type: CardActionTypes.SEND_UPDATED_TASKS_SUCCESS,
        payload: cardsArr,
      });
    } catch {
      dispatch({
        type: CardActionTypes.SEND_UPDATED_TASKS_ERROR,
        payload: cardsArr,
      });
    }
  };
};
export const sendDragedTaskOrder = (
  cardsArr: ICard[],
  cardOrder: number,
  newCardOrder: number,
  taskName: string
) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    try {
      dispatch({ type: CardActionTypes.SEND_UPDATED_TASKS });
      console.log(
        'изменение имени',
        cardsArr[cardOrder - 1].cardName,
        taskName,
        cardsArr[newCardOrder - 1].cardName
      );
      console.log(
        'эизменение порядка',
        cardsArr[newCardOrder - 1].tasks,
        cardsArr[newCardOrder - 1].cardName
      );
      await $api
        .post('/update/task/cardname', {
          cardName: cardsArr[cardOrder - 1].cardName,
          taskName: taskName,
          newCardName: cardsArr[newCardOrder - 1].cardName,
        })
        .then(() => {
          $api.post('/update/task/order', {
            tasks: cardsArr[newCardOrder - 1].tasks,
            cardName: cardsArr[newCardOrder - 1].cardName,
          });
        });
      dispatch({
        type: CardActionTypes.SEND_UPDATED_TASKS_SUCCESS,
        payload: cardsArr,
      });
    } catch {
      dispatch({
        type: CardActionTypes.SEND_UPDATED_TASKS_ERROR,
        payload: cardsArr,
      });
    }
  };
};

export const UpdateOrderCards = (
  arr: ICard[],
  prevCard: ICard,
  currCard: ICard,
  currboard: number,
  prevboard: number
) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    const newCards: ICard[] = updateOrderCardsFunc(
      arr,
      prevCard,
      currCard,
      currboard,
      prevboard
    );
    const clone = cloneDeep(newCards);
    dispatch({
      type: CardActionTypes.UPDATE_CARD_ORDER,
      payload: clone,
    });
  };
};

export const UpdateOrderTasks = (
  arr: ICard[],
  prevCard: ICard,
  currCard: ICard,
  currboard: number,
  prevboard: number
) => {
  return async (dispatch: Dispatch<CardsAction>) => {
    const newCards: ICard[] = updateOrderFunc(
      arr,
      prevCard,
      currCard,
      currboard,
      prevboard
    );
    const clone = cloneDeep(newCards);
    dispatch({
      type: CardActionTypes.UPDATE_ORDER_TASKS,
      payload: clone,
    });
  };
};
