import './singleComicPage.scss';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';

import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import AppBanner from '../../AppBanner/AppBanner';

const SingleComicPage = () => {
  const { loading, error, getComic, clearError } = useMarvelService();

  const [comic, setComic] = useState(null);
  const { comicId } = useParams();

  useEffect(() => {
    updateComic();
    // eslint-disable-next-line
  }, [comicId]);

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const updateComic = () => {
    clearError();
    getComic(comicId).then((response) => onComicLoaded(response));
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;

  return (
    <div className='single-comic'>
      <img src={thumbnail} alt={title} className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{title}</h2>
        <p className='single-comic__descr'>{description}</p>
        <p className='single-comic__descr'>{pageCount}</p>
        <p className='single-comic__descr'>Language: {language}</p>
        <div className='single-comic__price'>{price}</div>
      </div>
      <Link to='/comics' className='single-comic__back'>
        Back to all comics
      </Link>
    </div>
  );
};

export default SingleComicPage;
