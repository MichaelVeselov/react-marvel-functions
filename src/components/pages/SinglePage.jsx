import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import setContent from '../../utils/setContent';

import AppBanner from '../AppBanner/AppBanner';

const SinglePage = (props) => {
  const { Component, dataType } = props;

  const [data, setData] = useState(null);

  const { process, setProcess, getComicById, getCharacterById, clearError } =
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
        getComicById(id)
          .then((response) => onDataLoaded(response))
          .then(() => setProcess('confirmed'));
        break;
      case 'character':
        getCharacterById(id)
          .then((response) => onDataLoaded(response))
          .then(() => setProcess('confirmed'));
    }
  };

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
