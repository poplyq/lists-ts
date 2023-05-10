
import {ITask } from './types';

export interface TaskState {
  tasks: ITask[];
  error: string | null;
}

export enum TaskActionsTypes {
  FETCH_TASKS = 'FETCH_TASKS',
  FETCH_TASKS_ERROR = 'FETCH_TASKS_ERROR',
  FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS',
  SEND_TASK = 'SEND_TASK',
  SEND_TASK_ERROR = 'SEND_TASK_ERROR',
  DELETE_TASK = 'DELETE_TASK',
  DELETE_TASK_ERROR = 'DELETE_TASK_ERROR',
  UPDATE_TASK = 'UPDATE_TASK',
  UPDATE_TASK_ERROR = 'UPDATE_TASK_ERROR',
  UPDATE_TASK_NUMBER = 'UPDATE_TASK_NUMBER',
  UPDATE_TASK_NUMBER_ERROR = 'UPDATE_TASK_NUMBER_ERROR',
  ADD_TASK = 'ADD_TASK',
}

interface fetchTasks {
  type: TaskActionsTypes.FETCH_TASKS;
}
interface fetchTasksError {
  type: TaskActionsTypes.FETCH_TASKS_ERROR;
  payload: string;
}
interface fetchTasksSuccess {
  type: TaskActionsTypes.FETCH_TASKS_SUCCESS;
  payload: ITask[];
}
interface sendTask {
  type: TaskActionsTypes.SEND_TASK;
}
interface sendTaskError {
  type: TaskActionsTypes.SEND_TASK_ERROR;
  payload: string;
}
interface deleteTask {
  type: TaskActionsTypes.DELETE_TASK;
}
interface deleteTaskError {
  type: TaskActionsTypes.DELETE_TASK_ERROR;
  payload: string;
}
interface updateTask {
  type: TaskActionsTypes.UPDATE_TASK;
}
interface updateTaskError {
  type: TaskActionsTypes.UPDATE_TASK_ERROR;
  payload: string;
}

interface updateTaskNumber {
  type: TaskActionsTypes.UPDATE_TASK_NUMBER;
}
interface updateTaskNumberError {
  type: TaskActionsTypes.UPDATE_TASK_NUMBER_ERROR;
  payload: string;
}

export type TasksAction =
  | fetchTasks
  | fetchTasksError
  | fetchTasksSuccess
  | sendTask
  | sendTaskError
  | deleteTask
  | deleteTaskError
  | updateTask
  | updateTaskError
  | updateTaskNumber
  | updateTaskNumberError;
