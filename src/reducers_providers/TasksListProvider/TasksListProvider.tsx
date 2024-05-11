import { tasksReducer } from "@/reducers_providers/TasksListProvider/tasksReducer";
import { ManageTasksAction, TasksListType } from "@/types";
import {
  useReducer,
  useEffect,
  createContext,
  Dispatch,
  FC,
  ReactNode,
} from "react";

export const TasksListContext = createContext<TasksListType | null>(null);

export const DispatchTasksContext =
  createContext<Dispatch<ManageTasksAction> | null>(null);

interface TasksListProviderProps {
  children: ReactNode;
}

export const TasksListProvider: FC<TasksListProviderProps> = ({ children }) => {
  const storedTasks = JSON.parse(localStorage.getItem("pomodoroTasks") || "[]");
  const [tasksList, dispatchTasks] = useReducer(tasksReducer, storedTasks);

  useEffect(() => {
    localStorage.setItem("pomodoroTasks", JSON.stringify(tasksList));
  }, [tasksList]);

  return (
    <TasksListContext.Provider value={tasksList}>
      <DispatchTasksContext.Provider value={dispatchTasks}>
        {children}
      </DispatchTasksContext.Provider>
    </TasksListContext.Provider>
  )
};
