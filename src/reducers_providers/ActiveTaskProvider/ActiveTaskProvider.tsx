import { FC, ReactNode, RefObject, createContext, useRef } from "react";

export const ActiveTaskContext = createContext<RefObject<HTMLDivElement> | null>(null)

interface ActiveTaskProviderProps {
  children: ReactNode
}

export const ActiveTaskProvider: FC<ActiveTaskProviderProps> = ({ children }) => {
  const activeTaskElRef = useRef<HTMLDivElement>(null)
  return (
    <ActiveTaskContext.Provider value={activeTaskElRef}>
      {children}
    </ActiveTaskContext.Provider>
  )
}