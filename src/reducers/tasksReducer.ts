import {
  ManageTasksAction,
  TasksListType,
  isAddTaskAction,
  isChangeTaskAction,
  isRemoveTaskAction,
} from "@/types";
import { Reducer } from "react";

export const tasksReducer: Reducer<TasksListType, ManageTasksAction> = (
  tasksList = [],
  action
): TasksListType => {
  switch (true) {
    case isAddTaskAction(action) && action.type === "addTask": {
      return [...tasksList, action.task];
    }
    case isRemoveTaskAction(action) && action.type === "removeTask": {
      return tasksList.filter((task) => task.id !== action.id);
    }
    case isChangeTaskAction(action) && action.type === "changeTask": {
      return tasksList.map((task) =>
        task.id === action.id ? { ...task, ...action.toChange } : task
      );
    }
    default: {
      return tasksList;
    }
  }
};
