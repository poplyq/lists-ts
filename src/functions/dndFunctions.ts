import { ICard, ITask } from '../types/types';

const updateNumbers = (arr: ITask[]) => {
  arr.forEach((e, ind) => {
    e.taskOrder = ind + 1;
  });
  return arr;
};

export const coveredSlice = (array: ITask[], drag: number, cover: number) => {
  if (drag > cover) {
    return updateNumbers([
      ...array.slice(0, cover - 1),
      array[drag - 1],
      array[cover - 1],
      ...array.slice(drag, array.length),
    ]);
  } else if (drag < cover) {
    return updateNumbers([
      ...array.slice(0, drag - 1),
      array[cover - 1],
      array[drag - 1],
      ...array.slice(cover, array.length),
    ]);
  } else {
    return array;
  }
};

export const addTaskOnBoad = (card: ICard, drag: number, dragedTask: ITask) => {
  const tasks = [
    ...card.tasks.slice(0, drag - 1),
    dragedTask,
    ...card.tasks.slice(drag - 1),
  ];
  tasks.forEach((e, ind) => {
    e.taskOrder = ind + 1;
  });

  let newobj: ICard = {
    cardOrder: card.cardOrder,
    cardName: card.cardName,
    tasks: tasks,
  };
  return newobj;
};
export const deleteTaskFromBoad = (card: ICard, drag: number) => {
  const tasks = [...card.tasks.slice(0, drag - 1), ...card.tasks.slice(drag)];
  tasks.forEach((e, ind) => {
    e.taskOrder = ind + 1;
  });

  let newobj: ICard = {
    cardOrder: card.cardOrder,
    cardName: card.cardName,
    tasks: tasks,
  };
  return newobj;
};
