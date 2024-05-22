import './App.scss';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Layout } from './components/Layout';
import { TimerPage } from './pages/TimerPage';
import { Statistics } from './pages/Statistics';

import { TasksListProvider } from './reducers_providers/TasksListProvider';
import { useSettings } from './reducers_providers/SettingsProvider';
import { useEffect } from 'react';

const setDocTitle = (title: string): void => {
  document.title = title
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path='/'>
      <Route
        element={<TasksListProvider>
          <TimerPage />
        </TasksListProvider>}
        index
        handle={{ docTitle: () => setDocTitle('Pomodoro timer') }}
      />
      <Route
        element={<Statistics />}
        path='statistics'
        handle={{ docTitle: () => setDocTitle('Pomodoro statistics') }}
      />
    </Route>
  )
)


function App() {
  const { appSettings } = useSettings()

  useEffect(() => {
    document.documentElement.dataset.theme = appSettings.theme
  }, [appSettings])

  return (
    <RouterProvider router={router} />
  )
}

export default App
