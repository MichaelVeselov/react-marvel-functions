import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Spinner from '../Spinner/Spinner';

import AppHeader from '../AppHeader/AppHeader';

function Layout() {
  return (
    <div className='app'>
      <AppHeader />
      <main>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default Layout;
