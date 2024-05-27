import { Settings } from "@/types/settings";
import { Dispatch, FC, ReactNode, createContext, useEffect, useState } from "react";

export const SettingsContext = createContext<SettingsContext | null>(null)
interface SettingsContext {
  appSettings: Settings,
  setAppSettings: Dispatch<React.SetStateAction<Settings>>
}
interface SettingsProviderProps {
  children: ReactNode,
}

const defaultSettings: Settings = {
  theme: 'default',
  tomatoDuration: 10 * 60,
  longBreak: 2 * 60,
  shortBreak: 1 * 60,
  audioSignal: true,
  workingPeriodsCount: 4
}

const jsonFromDefSets = JSON.stringify(defaultSettings)

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const initSettings = JSON.parse(localStorage.getItem('pomodoroSettings') || jsonFromDefSets)
  const [appSettings, setAppSettings] = useState<Settings>(initSettings)

  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(appSettings))
  }, [appSettings])

  return (
    <SettingsContext.Provider value={{ appSettings, setAppSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

