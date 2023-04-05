import { Helmet } from 'react-helmet';

import AppBanner from '../AppBanner/AppBanner';
import ComicsList from '../ComicsList/ComicsList';

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name='description' content='Marvel comics list' />
        <title>Marvel comics page</title>
      </Helmet>
      <AppBanner />
      <ComicsList />
    </>
  );
};

export default ComicsPage;
