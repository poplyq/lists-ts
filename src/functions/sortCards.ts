import _ from 'lodash';
import { ICard } from '../types/types';

export const sortCardsFunc = (arr: ICard[]) => {
  const newarr = _.sortBy(arr, ['cardIndex']);
  newarr.forEach((e) => {
    const neww = _.sortBy(e.tasks, ['taskIndex']);
    e.tasks = neww;
  });
  return newarr;
};
