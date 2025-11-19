import { createBrowserRouter, RouterProvider } from 'react-router';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { MainLayout } from '@src/components';
import { Home, Stat } from '@src/pages';
import 'antd/dist/reset.css';
import './index.css';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/stat', element: <Stat /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
