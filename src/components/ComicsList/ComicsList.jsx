import './comicsList.scss';

import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const setContent = (process, Component, additionalComicsLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return additionalComicsLoading ? <Component /> : <Spinner />;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state...');
  }
};

const ComicsList = () => {
  const { process, setProcess, getAllComics } = useMarvelService();

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

    getAllComics(offset)
      .then((response) => {
        const data = response.map((item) => {
          const uniqId = uuidv4();
          return { ...item, uniqId };
        });
        onComicsListLoaded(data);
      })
      .then(() => setProcess('confirmed'));
  };

  function renderItems(comicsList) {
    const items = comicsList.map((item) => {
      return (
        <li className='comics__item' key={item.uniqId}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt={item.title}
              className='comics__item-img'
            />
            <div className='comics__item-name'>{item.title}</div>
            <div className='comics__item-price'>{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className='comics__grid'>{items}</ul>;
  }

  const btnStyle = comicsListDone ? { display: 'none' } : { display: 'block' };

  return (
    <div className='comics__list'>
      {setContent(
        process,
        () => renderItems(comicsList),
        additionalComicsLoading
      )}
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
