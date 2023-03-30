import { lazy } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '../pages/Layout';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() =>
  import('../pages/SingleComicPage/SingleComicPage')
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: '',
      children: [
        { index: true, element: <MainPage /> },
        { path: '/comics', element: <ComicsPage /> },
        { path: '/comics/:comicId', element: <SingleComicPage /> },
        { path: '*', element: <Page404 /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
