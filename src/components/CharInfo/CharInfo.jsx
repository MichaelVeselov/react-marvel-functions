import './charInfo.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';

const CharInfo = (props) => {
  const { charId } = props;

  const { process, setProcess, getCharacterById, clearError } =
    useMarvelService();

  const [char, setChar] = useState(null);

  useEffect(() => {
    getChar();
    // eslint-disable-next-line
  }, [charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const getChar = () => {
    if (!charId) return;

    clearError();

    getCharacterById(charId)
      .then((response) => onCharLoaded(response))
      .then(() => setProcess('confirmed'));
  };

  return <div className='char__info'>{setContent(process, View, char)}</div>;
};

const View = (props) => {
  const { data } = props;
  const { name, description, thumbnail, homepage, wiki, comics } = data;

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
