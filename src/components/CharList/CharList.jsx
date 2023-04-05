import './charList.scss';

import { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

const setContent = (process, Component, additionalCharLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return additionalCharLoading ? <Component /> : <Spinner />;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage />;
    default:
      throw new Error('Unexpected process state...');
  }
};

const CharList = (props) => {
  const { onCharSelected } = props;

  const { process, setProcess, getAllCharacters } = useMarvelService();

  const [charList, setCharList] = useState([]);
  const [offset, setOffset] = useState(210);
  const [additionalCharLoading, setAdditionalCharLoading] = useState(false);
  const [charListDone, setCharListDone] = useState(false);

  useEffect(() => {
    onRequest(offset, true);
    // eslint-disable-next-line
  }, []);

  const onCharListLoaded = (newCharList = []) => {
    const charListDone = newCharList.length < 9 ? true : false;
    setCharList((charList) => [...charList, ...newCharList]);

    setOffset((offset) => offset + 9);
    setAdditionalCharLoading(false);
    setCharListDone(charListDone);
  };

  const onRequest = (offset, initial) => {
    initial ? setAdditionalCharLoading(false) : setAdditionalCharLoading(true);

    getAllCharacters(offset)
      .then((response) => onCharListLoaded(response))
      .then(() => setProcess('confirmed'));
  };

  const charRefs = useRef([]);

  const focusOnItem = (index) => {
    charRefs.current.forEach((item) =>
      item.classList.remove('char__item_selected')
    );

    charRefs.current[index].classList.add('char__item_selected');

    charRefs.current[index].focus();
  };

  const renderItems = (arr) => {
    const items = arr.map((item, index) => {
      const imgStyle = item.thumbnail
        ?.toLowerCase()
        .includes('image_not_available.jpg')
        ? { objectFit: 'unset' }
        : { objectFit: 'cover' };

      return (
        <li
          key={item.id}
          className='char__item'
          tabIndex={0}
          ref={(item) => (charRefs.current[index] = item)}
          onClick={() => {
            onCharSelected(item.id);
            focusOnItem(index);
          }}
          onKeyDown={(event) => {
            if (event.key === ' ' || event.key === 'Enter') {
              props.onCharSelected(item.id);
              focusOnItem(index);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className='char__name'>{item.name}</div>
        </li>
      );
    });

    return <ul className='char__grid'>{items}</ul>;
  };

  const btnStyle = charListDone ? { display: 'none' } : { display: 'block' };

  const elements = useMemo(() => {
    return setContent(
      process,
      () => renderItems(charList),
      additionalCharLoading
    );
    // eslint-disable-next-line
  }, [process]);

  return (
    <div className='char__list'>
      {elements}
      <button
        style={btnStyle}
        className='button button__main button__long'
        disabled={additionalCharLoading}
        onClick={() => onRequest(offset, false)}
      >
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
