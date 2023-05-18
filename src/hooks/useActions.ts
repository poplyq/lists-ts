import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CardsActionCreators from '../store/action-creators/cards';
import * as UserActionCreators from '../store/action-creators/user';

export const useCardsActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(CardsActionCreators, dispatch);
};
export const useUserActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(UserActionCreators, dispatch);
};
