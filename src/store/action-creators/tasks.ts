import { Dispatch } from 'redux';
import { TaskActionsTypes, TasksAction } from '../../types/task';
import axios from 'axios';

export const fetchTasks = () => {
  return async (dispatch: Dispatch<TasksAction>) => {
    try {
      dispatch({ type: TaskActionsTypes.FETCH_TASKS });
      const response = await axios.get('http://localhost:4000/tasks');
      dispatch({
        type: TaskActionsTypes.FETCH_TASKS_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: TaskActionsTypes.FETCH_TASKS_ERROR,
        payload: 'Try later',
      });
    }
  };
};

export const sendTasks = (title: string, task: string) => {
  return async (dispatch: Dispatch<TasksAction>) => {
    try {
      dispatch({ type: TaskActionsTypes.SEND_TASK });
    } catch (e) {
      dispatch({
        type: TaskActionsTypes.SEND_TASK_ERROR,
        payload: 'try later',
      });
    }
  };
};
