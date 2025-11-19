import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css';
import './index.css';
import { Home, Stat } from './pages'
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./components/MainLayout/MainLayout.tsx";

const router = createBrowserRouter([
    {
        element: (
            <MainLayout />
        ),
        children: [
            { path: "/", element: <Home /> },
            { path: "/stat", element: <Stat /> },
        ]
    }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
