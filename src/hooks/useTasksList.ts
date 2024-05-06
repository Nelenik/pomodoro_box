import { tasksReducer } from "@/reducers_providers/tasksReducer";
import { useReducer, useEffect } from "react";

export const useTasksList = () => {
  const storedTasks = JSON.parse(localStorage.getItem("pomodoroTasks") || "[]");
  const [tasksList, dispatchTask] = useReducer(tasksReducer, storedTasks);

  useEffect(() => {
    localStorage.setItem("pomodoroTasks", JSON.stringify(tasksList));
  }, [tasksList]);

  return {
    tasksList,
    dispatchTask,
  };
};
