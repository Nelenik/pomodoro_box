import './App.scss';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Layout } from './ui/Layout';
// import { Main } from './pages/Main';
import { TimerPage } from './pages/TimerPage';
import { Statistics } from './pages/Statistics';
import { TasksListType } from './types';


const tasksList: TasksListType = [
  {
    task: 'Make layout',
    done: false,
    tomatoes: [25]
  }

]

const setDocTitle = (title: string): void => {
  document.title = title
}


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path='/'>
      <Route
        element={<TimerPage tasksList={tasksList} />}
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
