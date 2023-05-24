import { ICard, ITask } from '../types/types';

const updateNumbers = (arr: ITask[]) => {
  arr.forEach((e, ind) => {
    e.taskOrder = ind + 1;
  });
  return arr;
};
export const updateNumbersCard = (arr: ICard[]) => {
  arr.forEach((e, ind) => {
    e.cardOrder = ind + 1;
  });
  return arr;
};

export const updateOrderFunc = (
  arr: ICard[],
  prevCard: ICard,
  currCard: ICard,
  currboard: number,
  prevboard: number
) => {
  if (currboard > prevboard) {
    let newarr: ICard[] = updateNumbersCard([
      ...arr.slice(0, prevboard - 1),
      prevCard,
      currCard,
      ...arr.slice(currboard),
    ]);
    return newarr;
  } else if (currboard < prevboard) {
    let newarr: ICard[] = updateNumbersCard([
      ...arr.slice(0, currboard - 1),
      currCard,
      prevCard,
      ...arr.slice(prevboard),
    ]);
    return newarr;
  } else {
    return [...arr.slice(0, prevboard - 1), prevCard, ...arr.slice(prevboard)];
  }
};

export const updateOrderCardsFunc = (
  arr: ICard[],
  prevCard: ICard,
  currCard: ICard,
  currboard: number,
  prevboard: number
) => {
  if (currboard > prevboard) {
    let newarr: ICard[] = updateNumbersCard([
      ...arr.slice(0, prevboard - 1),
      currCard,
      prevCard,
      ...arr.slice(currboard),
    ]);
    return newarr;
  } else if (currboard < prevboard) {
    let newarr: ICard[] = updateNumbersCard([
      ...arr.slice(0, currboard - 1),
      prevCard,
      currCard,
      ...arr.slice(prevboard),
    ]);
    return newarr;
  } else {
    return arr;
  }
};

export const addTaskFunc = (
  cardarr: ICard[],
  taskarr: ITask[],
  cardOrder: number
) => {
  let newobj: ICard = {
    cardOrder: cardarr[cardOrder - 1].cardOrder,
    cardName: cardarr[cardOrder - 1].cardName,
    tasks: taskarr,
  };
  return [
    ...cardarr.slice(0, cardOrder - 1),
    newobj,
    ...cardarr.slice(cardOrder),
  ];
};

export const updateTaskOrderFunc = (
  cardarr: ICard[],
  cardOrder: number,
  taskOrder: number
) => {
  let slicetasks = [
    ...cardarr[cardOrder - 1].tasks.slice(0, taskOrder - 1),
    ...cardarr[cardOrder - 1].tasks.slice(taskOrder),
  ];
  let newtasks = updateNumbers(slicetasks);
  let newobj: ICard = {
    cardOrder: cardOrder,
    cardName: cardarr[cardOrder - 1].cardName,
    tasks: newtasks,
  };
  return [
    ...cardarr.slice(0, cardOrder - 1),
    newobj,
    ...cardarr.slice(cardOrder),
  ];
};
export const updateTaskNameFunc = (
  cardarr: ICard[],
  cardOrder: number,
  taskOrder: number,
  newTaskName: string
) => {
  let slicetasks: ITask[] = [
    ...cardarr[cardOrder - 1].tasks.slice(0, taskOrder - 1),
    { taskOrder: taskOrder, taskName: newTaskName },
    ...cardarr[cardOrder - 1].tasks.slice(taskOrder),
  ];
  let newobj: ICard = {
    cardOrder: cardOrder,
    cardName: cardarr[cardOrder - 1].cardName,
    tasks: slicetasks,
  };
  return [
    ...cardarr.slice(0, cardOrder - 1),
    newobj,
    ...cardarr.slice(cardOrder),
  ];
};
