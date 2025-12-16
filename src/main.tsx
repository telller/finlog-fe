import { createBrowserRouter, RouterProvider } from 'react-router';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import localeData from 'dayjs/plugin/localeData';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import { MainLayout } from '@src/components';
import { Login, Home, Stat } from '@src/pages';
import 'antd/dist/reset.css';
import './index.css';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(weekOfYear);
dayjs.extend(localeData);
dayjs.extend(utc);

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
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
