import { useState } from 'react';

import { Helmet } from 'react-helmet';

import RandomChar from '../RandomChar/RandomChar';
import CharList from '../CharList/CharList';
import CharInfo from '../CharInfo/CharInfo';
import CharSearchForm from '../CharSearchForm/CharSearchForm';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (charId) => {
    setSelectedChar(charId);
  };

  return (
    <>
      <Helmet>
        <meta name='description' content='Marvel information portal' />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className='char__content'>
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default MainPage;
