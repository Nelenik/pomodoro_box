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
    tomatoDuration: 25 * 60,
    longBreakDuration: 15 * 60,
    shortBreakDuration: 5 * 60
  })
  return (
    <SettingsContext.Provider value={{ appSettings, setAppSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

