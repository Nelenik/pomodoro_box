import { tasksReducer } from "@/reducers_providers/tasksReducer";
import { useReducer, useEffect } from "react";

export const useTasksList = () => {
  const [tasksList, dispatchTask] = useReducer(tasksReducer, []);
  useEffect(() => {
    const storedTasks = localStorage.getItem("pomodoroTasks");
    if (storedTasks) {
      dispatchTask({
        type: "SET_TASKS",
        tasks: JSON.parse(storedTasks),
      });
    }
  }, []);

  useEffect(() => {
    if (tasksList.length) {
      localStorage.setItem("pomodoroTasks", JSON.stringify(tasksList));
    }
  }, [tasksList]);

  return {
    tasksList,
    dispatchTask,
  };
};
