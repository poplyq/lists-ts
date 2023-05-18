import _ from 'lodash';
import { ICard } from '../types/types';

export const sortCardsFunc = (arr: ICard[]) => {
  const newarr = _.sortBy(arr, ['cardOrder']);
  newarr.forEach((e) => {
    const neww = _.sortBy(e.tasks, ['taskOrder']);
    e.tasks = neww;
  });
  return newarr;
};
