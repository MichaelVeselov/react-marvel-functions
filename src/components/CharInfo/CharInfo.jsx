import './charInfo.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import Skeleton from '../Skeleton/Skeleton';

const CharInfo = (props) => {
  const { charId } = props;

  const { loading, error, getCharacter, clearError } = useMarvelService();

  const [char, setChar] = useState(null);

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line
  }, [charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    if (!charId) return;

    clearError();

    getCharacter(charId).then((response) => onCharLoaded(response));
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

  const imgStyle = thumbnail?.toLowerCase().includes('image_not_available.jpg')
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
        {comics.map((item, index) => {
          // eslint-disable-next-line
          if (index > 9) return;

          const comicUrl = item.resourceURI;
          const comicId = comicUrl.substring(comicUrl.lastIndexOf('/') + 1);

          return (
            <Link to={`/comics/${comicId}`} key={index}>
              <li className='char__comics-item'>{item.name}</li>
            </Link>
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
