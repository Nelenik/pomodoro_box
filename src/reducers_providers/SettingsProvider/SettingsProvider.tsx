import { Settings } from "@/types/settings";
import { Dispatch, FC, ReactNode, createContext, useState } from "react";

export const SettingsContext = createContext<SettingsContext | null>(null)
interface SettingsContext {
  appSettings: Settings,
  setAppSettings: Dispatch<React.SetStateAction<Settings>>
}
interface SettingsProviderProps {
  children: ReactNode,
}

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [appSettings, setAppSettings] = useState<Settings>({
    theme: 'default',
    tomatoDuration: 10 * 60,
    longBreakDuration: 2 * 60,
    shortBreakDuration: 1 * 60
  })
  return (
    <SettingsContext.Provider value={{ appSettings, setAppSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

