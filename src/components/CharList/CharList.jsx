import './charList.scss';

import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

const CharList = (props) => {
  const { onCharSelected } = props;

  const { loading, error, getAllCharacters } = useMarvelService();

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

    getAllCharacters(offset).then((response) => onCharListLoaded(response));
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
          className='char__item'
          key={item.id}
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

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !additionalCharLoading ? <Spinner /> : null;

  const btnStyle = charListDone ? { display: 'none' } : { display: 'block' };

  return (
    <div className='char__list'>
      {errorMessage}
      {spinner}
      {items}
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
