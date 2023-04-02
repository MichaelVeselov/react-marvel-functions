import { lazy } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from '../pages/Layout';

const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));

const SingleComicLayout = lazy(() =>
  import('../pages/SingleComicLayout/SingleComicLayout')
);
const SingleCharacterLayout = lazy(() =>
  import('../pages/SingleCharacterLayout/SingleCharacterLayout')
);
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: '',
      children: [
        { index: true, element: <MainPage /> },
        { path: '/comics', element: <ComicsPage /> },
        {
          path: '/comics/:id',
          element: (
            <SinglePage Component={SingleComicLayout} dataType='comic' />
          ),
        },
        {
          path: '/character/:id',
          element: (
            <SinglePage
              Component={SingleCharacterLayout}
              dataType='character'
            />
          ),
        },
        { path: '*', element: <Page404 /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
