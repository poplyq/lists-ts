import { ICard, ITask } from '../types/types';

export const coveredSlice = (array: ITask[], drag: number, cover: number) => {
  let newArr = <ITask[]>[];

  if (drag > cover) {
    return (newArr = [
      ...array.slice(0, cover - 1),
      array[drag - 1],
      array[cover - 1],
      ...array.slice(drag, array.length),
    ]);
  } else if (drag < cover) {
    return (newArr = [
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
    e.taskIndex = ind + 1;
  });
  let newobj = <ICard>{};
  newobj.cardIndex = card.cardIndex;
  newobj.cardName = card.cardName;
  newobj.tasks = tasks;
  return newobj;
};
export const deleteTaskFromBoad = (card: ICard, drag: number) => {
  const tasks = [...card.tasks.slice(0, drag - 1), ...card.tasks.slice(drag)];
  tasks.forEach((e, ind) => {
    e.taskIndex = ind + 1;
  });
  let newobj = <ICard>{};
  newobj.cardIndex = card.cardIndex;
  newobj.cardName = card.cardName;
  newobj.tasks = tasks;
  return newobj;
};