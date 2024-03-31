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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} path='/'>
      <Route index element={<Main />} />
      <Route element={<Timer />} path='timer' />
      <Route element={<Statistics />} path='statistics' />
    </Route>
  )
)


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
