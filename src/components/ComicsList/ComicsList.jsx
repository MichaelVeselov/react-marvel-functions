import './comicsList.scss';

import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
  const { loading, error, getAllComics } = useMarvelService();

  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [additionalComicsLoading, setAdditionalComicsLoading] = useState(false);
  const [comicsListDone, setComicsListDone] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onComicsListLoaded = (newComicsList = []) => {
    const comicsListDone = newComicsList.length < 8 ? true : false;
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);

    setOffset((offset) => offset + 8);
    setAdditionalComicsLoading(false);
    setComicsListDone(comicsListDone);
  };

  const onRequest = (offset, initial) => {
    initial
      ? setAdditionalComicsLoading(false)
      : setAdditionalComicsLoading(true);

    getAllComics(offset).then((response) => onComicsListLoaded(response));
  };

  function renderItems(comicsList) {
    const items = comicsList.map((item, index) => {
      return (
        <li className='comics__item' key={index}>
          <a href='#/'>
            <img
              src={item.thumbnail}
              alt={item.title}
              className='comics__item-img'
            />
            <div className='comics__item-name'>{item.title}</div>
            <div className='comics__item-price'>{item.price}</div>
          </a>
        </li>
      );
    });

    return <ul className='comics__grid'>{items}</ul>;
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !additionalComicsLoading ? <Spinner /> : null;

  const btnStyle = comicsListDone ? { display: 'none' } : { display: 'block' };

  return (
    <div className='comics__list'>
      {errorMessage}
      {spinner}
      {items}
      <button
        disabled={additionalComicsLoading}
        style={btnStyle}
        className='button button__main button__long'
        onClick={() => onRequest(offset)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
