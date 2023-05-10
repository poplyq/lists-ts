import { CardActionTypes, CardsAction, CardsState } from '../../types/cards';

const initialState: CardsState = {
  cards: [],
  error: null,
};
export const cardReducer = (
  state = initialState,
  action: CardsAction
): CardsState => {
  switch (action.type) {
    case CardActionTypes.FETCH_CARDS:
      return { error: null, cards: [] };
    case CardActionTypes.FETCH_CARDS_SUCCESS:
      return { error: null, cards: action.payload };
    case CardActionTypes.FETCH_CARDS_ERROR:
      return { error: action.payload, cards: [] };
    case CardActionTypes.SEND_CARD:
      return { error: null, cards: [] };
    case CardActionTypes.SEND_CARD_ERROR:
      return { error: action.payload, cards: [] };
    case CardActionTypes.UPDATE_CARDNAME:
      return { error: null, cards: [] };
    case CardActionTypes.UPDATE_CARDNAME_ERROR:
      return { error: action.payload, cards: [] };
    case CardActionTypes.UPDATE_TASK_NAME:
      return { error: null, cards: [] };
    case CardActionTypes.UPDATE_TASK_NAME_ERROR:
      return { error: null, cards: action.payload };
    case CardActionTypes.UPDATE_ORDER:
      return { error: null, cards: action.payload };
    case CardActionTypes.ADD_CARD:
      return { error: null, cards: action.payload };
    case CardActionTypes.ADD_TASK:
      return { error: null, cards: action.payload };
    case CardActionTypes.DELETE_TASK:
      return { error: null, cards: [] };
    case CardActionTypes.DELETE_TASK_ERROR:
      return { error: null, cards: action.payload };
    case CardActionTypes.SEND_UPDATED_TASKS:
      return { error: null, cards: [] };
    case CardActionTypes.DELETE_TO_UPDATE:
      return { error: null, cards: [] };
    case CardActionTypes.DELETE_TO_UPDATE_ERROR:
      return { error: null, cards: action.payload };
    case CardActionTypes.UPDATE_ALL_DATA:
      return { error: null, cards: [] };
    case CardActionTypes.UPDATE_ALL_DATA_ERROR:
      return { error: null, cards: action.payload };
    default:
      return state;
  }
};
