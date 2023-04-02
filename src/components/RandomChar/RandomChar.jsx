import './randomChar.scss';

import { useState, useEffect } from 'react';

import useMarvelService from '../../services/MarvelService.js';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, getCharacterById, clearError } = useMarvelService();

  useEffect(() => {
    getChar();

    const timerId = setInterval(getChar, 60 * 1000);
    return () => {
      clearInterval(timerId);
    };
    // eslint-disable-next-line
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const getChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacterById(id).then((response) => onCharLoaded(response));
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading) ? <View char={char} /> : null;

  return (
    <div className='randomchar'>
      {errorMessage}
      {spinner}
      {content}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <button className='button button__main' onClick={getChar}>
          <div className='inner'>try it</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  const imgStyle = thumbnail?.toLowerCase().includes('image_not_available.jpg')
    ? { objectFit: 'contain' }
    : { objectFit: 'cover' };

  return (
    <div className='randomchar__block'>
      <img
        src={thumbnail}
        alt='Random character'
        className='randomchar__img'
        style={imgStyle}
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{description}</p>
        <div className='randomchar__btns'>
          <a
            href={homepage}
            target='_blank'
            rel='noreferrer'
            className='button button__main'
          >
            <div className='inner'>homepage</div>
          </a>
          <a
            href={wiki}
            target='_blank'
            rel='noreferrer'
            className='button button__secondary'
          >
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
