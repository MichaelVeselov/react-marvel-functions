import { useState } from 'react';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

import AppHeader from '../AppHeader/AppHeader';
import RandomChar from '../RandomChar/RandomChar';
import CharList from '../CharList/CharList';
import CharInfo from '../CharInfo/CharInfo';
import ComicsList from '../ComicsList/ComicsList';

// import decoration from '../../resources/img/vision.png';

const App = () => {
  const [selectedChar, setSelectedChar] = useState(null);

  const onCharSelected = (charId) => {
    setSelectedChar(charId);
  };

  return (
    <div className='app'>
      <AppHeader />
      <main>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className='char__content'>
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>
        {/* <ComicsList /> */}
        {/* <img className='bg-decoration' src={decoration} alt='vision' /> */}
      </main>
    </div>
  );
};

export default App;
