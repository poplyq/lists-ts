export interface ITask {
  taskIndex: number;
  task: string;
}

export interface ICard {
  cardIndex: number;
  cardName: string;
  tasks: ITask[];
}
