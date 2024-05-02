import {
  ManageTasksAction,
  TasksListType,
  isAddTaskAction,
  isChangeTaskAction,
  isRemoveTaskAction,
  isSetTasksAction,
} from "@/types";
import { Reducer } from "react";

export const tasksReducer: Reducer<TasksListType, ManageTasksAction> = (
  tasksList = [],
  action
): TasksListType => {
  switch (true) {
    case isSetTasksAction(action) && action.type === "SET_TASKS": {
      return action.tasks;
    }
    case isAddTaskAction(action) && action.type === "ADD_TASK": {
      return [...tasksList, action.task];
    }
    case isRemoveTaskAction(action) && action.type === "REMOVE_TASK": {
      return tasksList.filter((task) => task.id !== action.id);
    }
    case isChangeTaskAction(action) && action.type === "CHANGE_TASK": {
      return tasksList.map((task) =>
        task.id === action.id ? { ...task, ...action.toChange } : task
      );
    }
    default: {
      return tasksList;
    }
  }
};
