import { useContext } from "react";
import { ActiveTaskContext } from ".";

export const useActiveTaskContext = () => {
  const context = useContext(ActiveTaskContext);
  if (!context) {
    throw new Error(
      " useActiveTaskContext must be used within a ActiveTaskProvider"
    );
  }
  return context;
};
