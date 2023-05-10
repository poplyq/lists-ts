import { TaskActionsTypes, TaskState, TasksAction } from '../../types/task';

const initialState: TaskState = {
  tasks: [],
  error: null,
};

export const taskReducer = (
  state = initialState,
  action: TasksAction
): TaskState => {
  switch (action.type) {
    case TaskActionsTypes.FETCH_TASKS:
      return { error: null, tasks: [] };
    case TaskActionsTypes.FETCH_TASKS_ERROR:
      return { error: action.payload, tasks: [] };
    case TaskActionsTypes.FETCH_TASKS_SUCCESS:
      return { error: null, tasks: action.payload };
    case TaskActionsTypes.SEND_TASK:
      return { error: null, tasks: [] };
    case TaskActionsTypes.SEND_TASK_ERROR:
      return { error: action.payload, tasks: [] };
    case TaskActionsTypes.DELETE_TASK:
      return { error: null, tasks: [] };
    case TaskActionsTypes.DELETE_TASK_ERROR:
      return { error: action.payload, tasks: [] };
    case TaskActionsTypes.UPDATE_TASK:
      return { error: null, tasks: [] };
    case TaskActionsTypes.UPDATE_TASK_ERROR:
      return { error: action.payload, tasks: [] };
    case TaskActionsTypes.UPDATE_TASK_NUMBER:
      return { error: null, tasks: [] };
    case TaskActionsTypes.UPDATE_TASK_NUMBER_ERROR:
      return { error: action.payload, tasks: [] };
    default:
      return state;
  }
};
