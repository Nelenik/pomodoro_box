import './App.scss';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Layout } from './ui/Layout';
import { TimerPage } from './pages/TimerPage';
import { Statistics } from './pages/Statistics';

import { SettingsProvider } from './reducers_providers/SettingsProvider';

const setDocTitle = (title: string): void => {
  document.title = title
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path='/'>
      <Route
        element={<TimerPage />}
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

  return (
    <SettingsProvider>

      <RouterProvider router={router} />
    </SettingsProvider>
  )
}

export default App
