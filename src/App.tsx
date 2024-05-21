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

  return (
    <RouterProvider router={router} />
  )
}

export default App
