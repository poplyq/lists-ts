export interface ITask {
  taskOrder: number;
  taskName: string;
  id?: number

}

export interface ICard {
  cardOrder: number;
  cardName: string;
  tasks: ITask[];
}

export interface IUser {
  email: string;
  id: string;
  isActivate: boolean;

}
