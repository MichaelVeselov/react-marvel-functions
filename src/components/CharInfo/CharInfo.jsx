import './charInfo.scss';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import Skeleton from '../Skeleton/Skeleton';

const CharInfo = (props) => {
  const { charId } = props;

  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [charId]);

  const onCharLoading = () => {
    setLoading(true);
  };

  const onCharLoaded = (char) => {
    setChar(char);
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const updateChar = () => {
    if (!charId) return;

    onCharLoading();

    marvelService
      .getCharacter(charId)
      .then((response) => onCharLoaded(response))
      .catch(onError);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(error || loading || !char) ? <View char={char} /> : null;

  return (
    <div className='char__info'>
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const imgStyle = thumbnail.toLowerCase().includes('image_not_available.jpg')
    ? { objectFit: 'contain' }
    : { objectFit: 'cover' };

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
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
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {!comics.length && 'There are no comics with this character...'}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 9) return;
          return (
            <li key={i} className='char__comics-item'>
              {item.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
