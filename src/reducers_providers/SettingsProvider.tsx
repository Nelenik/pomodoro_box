import { Settings } from "@/types/settings";
import { DispatchWithoutAction, FC, ReactNode, createContext, useContext, useReducer } from "react";

const SettingsContext = createContext(null);
const SettingsDispatchContext = createContext<DispatchWithoutAction | null>(null);

interface SettingsProviderProps {
  children: ReactNode
}

const initSettings: Settings = {
  theme: '',
  tomatoDuration: 25,
  longBreakDuration: 15,
  shortBreakDuration: 5
}

export const SettingsProvider: FC<SettingsProviderProps> = ({ children }) => {
  const [settings, settingsDispatch] = useReducer(settingsReducer, initSettings);

  return (
    <SettingsContext.Provider value={settings}>
      <SettingsDispatchContext.Provider value={settingsDispatch}>
        {children}
      </SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext);
}

export function useSettingsDispatch() {
  return useContext(SettingsDispatchContext);
}

const settingsReducer = (settings, action) => {

}