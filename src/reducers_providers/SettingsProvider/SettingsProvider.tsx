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
    tomatoDuration: 1 * 60,
    longBreakDuration: 0.5 * 60,
    shortBreakDuration: 0.5 * 60
  })
  return (
    <SettingsContext.Provider value={{ appSettings, setAppSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

