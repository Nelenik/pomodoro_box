import { checkObjectProps } from "@/utils/checkObjectProps";

export type Tomato = {
  id: string;
  time: number;
};

export type Task = {
  id: string;
  task: string;
  done: boolean;
  tomatoes: Tomato[];
};

export type TasksListType = Task[];

export type TasksContextTuple = [
  TasksListType,
  (action: ManageTasksAction) => void
];

//tasksReducer action's types
interface TasksAction {
  type: string;
}
type AddTaskAction = TasksAction & { task: Task };
type RemoveTaskAction = TasksAction & { id: string };
type ChangeTaskAction = RemoveTaskAction & {
  toChange: { [key: string]: unknown };
};

export type ManageTasksAction =
  | AddTaskAction
  | RemoveTaskAction
  | ChangeTaskAction;

//typeguards for action's types
export const isAddTaskAction = (action: unknown): action is AddTaskAction => {
  return checkObjectProps(action, ["type", "task"]);
};

export const isRemoveTaskAction = (
  action: unknown
): action is RemoveTaskAction => {
  return checkObjectProps(action, ["type", "id"]);
};

export const isChangeTaskAction = (
  action: unknown
): action is ChangeTaskAction => {
  return checkObjectProps(action, ["type", "id", "toChange"]);
};
