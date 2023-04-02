import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import AppBanner from '../AppBanner/AppBanner';

const SinglePage = (props) => {
  const { Component, dataType } = props;

  const [data, setData] = useState(null);

  const { loading, error, getComicById, getCharacterById, clearError } =
    useMarvelService();

  const { id } = useParams();

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [id]);

  const onDataLoaded = (data) => {
    setData(data);
  };

  const getData = () => {
    clearError();
    // eslint-disable-next-line default-case
    switch (dataType) {
      case 'comic':
        getComicById(id).then((response) => onDataLoaded(response));
        break;
      case 'character':
        getCharacterById(id).then((response) => onDataLoaded(response));
    }
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
