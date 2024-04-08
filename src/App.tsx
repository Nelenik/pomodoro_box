import './App.scss';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Layout } from './ui/Layout';
import { Main } from './pages/Main';
import { Timer } from './pages/Timer';
import { Statistics } from './pages/Statistics';

const setDocTitle = (title: string): void => {
  document.title = title
}



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path='/'>
      <Route
        index
        element={<Main />}
        handle={{ docTitle: () => setDocTitle('Time manager: by Pomodoro technique') }}
      />
      <Route
        element={<Timer />}
        path='timer'
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
