import { useContext } from "react";
import { TasksListContext, DispatchTasksContext } from ".";

export const useTasksList = () => {
  const context = useContext(TasksListContext);
  if (!context) {
    throw new Error("useTasksList must be used within a TasksListProvider");
  }
  return context;
};

export const useDispatchTasks = () => {
  const context = useContext(DispatchTasksContext);
  if (!context) {
    throw new Error("useDispatchTasks must be used within a TasksListProvider");
  }
  return context;
};
