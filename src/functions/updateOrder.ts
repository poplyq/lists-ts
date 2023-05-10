import { ICard, ITask } from '../types/types';

const updateNumbers = (arr: ITask[]) => {
  arr.forEach((e, ind) => {
    e.taskIndex = ind + 1;
  });
  return arr;
};
const updateNumbersCard = (arr: ICard[]) => {
  arr.forEach((e, ind) => {
    e.cardIndex = ind + 1;
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

export const addTaskFunc = (
  cardarr: ICard[],
  taskarr: ITask[],
  cardIndex: number
) => {
  let newarr = <ICard[]>[];
  let newobj = <ICard>{
    cardIndex: cardarr[cardIndex - 1].cardIndex,
    cardName: cardarr[cardIndex - 1].cardName,
    tasks: taskarr,
  };
  return (newarr = [
    ...cardarr.slice(0, cardIndex - 1),
    newobj,
    ...cardarr.slice(cardIndex),
  ]);
};

export const updateTaskOrderFunc = (
  cardarr: ICard[],
  cardIndex: number,
  taskIndex: number
) => {
  let newarr = <ICard[]>[];
  let slicetasks = [
    ...cardarr[cardIndex - 1].tasks.slice(0, taskIndex - 1),
    ...cardarr[cardIndex - 1].tasks.slice(taskIndex),
  ];
  let newtasks = updateNumbers(slicetasks);
  let newobj = <ICard>{
    cardIndex: cardIndex,
    cardName: cardarr[cardIndex - 1].cardName,
    tasks: newtasks,
  };
  return (newarr = [
    ...cardarr.slice(0, cardIndex - 1),
    newobj,
    ...cardarr.slice(cardIndex),
  ]);
};
export const updateTaskNameFunc = (
  cardarr: ICard[],
  cardIndex: number,
  taskIndex: number,
  newTaskName: string
) => {
  let newarr = <ICard[]>[];
  let slicetasks = [
    ...cardarr[cardIndex - 1].tasks.slice(0, taskIndex - 1),
    { taskIndex: taskIndex, task: newTaskName },
    ...cardarr[cardIndex - 1].tasks.slice(taskIndex),
  ];
  let newobj = <ICard>{
    cardIndex: cardIndex,
    cardName: cardarr[cardIndex - 1].cardName,
    tasks: slicetasks,
  };
  return (newarr = [
    ...cardarr.slice(0, cardIndex - 1),
    newobj,
    ...cardarr.slice(cardIndex),
  ]);
};
