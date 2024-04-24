import { checkObjectProps } from "@/utils/checkObjectProps";
import { RouteHandle } from "./routes";
import {
  AddTaskAction,
  RemoveTaskAction,
  ChangeTaskAction,
  SetTasksAction,
} from "./tasks";

//type guards for route handle
export function isRouteHandle(prop: unknown): prop is RouteHandle {
  return typeof prop === "object" && prop !== null && "docTitle" in prop;
}

//type guards for tasksReduser actions
export const isSetTasksAction = (action: unknown): action is SetTasksAction => {
  return checkObjectProps(action, ["type", "tasks"]);
};

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
