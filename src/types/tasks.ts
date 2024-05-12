export type Task = {
  id: string;
  task: string;
  done: boolean;
  tomatoesCount: number;
  timeOnTask: number;
};

export type TasksListType = Task[];

// export type TasksContext = {
//   tasksList: TasksListType;
//   dispatchTask: (action: ManageTasksAction) => void;
// };

//tasksReducer action's types
export interface TasksAction {
  type: string;
}

export type SetTasksAction = TasksAction & {
  tasks: TasksListType;
};

export type AddTaskAction = TasksAction & { task: Task };
export type RemoveTaskAction = TasksAction & { id: string };
export type ChangeTaskAction = RemoveTaskAction & {
  toChange: { [key: string]: unknown };
};

export type ManageTasksAction =
  | SetTasksAction
  | AddTaskAction
  | RemoveTaskAction
  | ChangeTaskAction;
