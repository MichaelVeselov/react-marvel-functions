import './charSearchForm.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { process, setProcess, getCharacterByName, clearError } =
    useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const getChar = (name) => {
    clearError();
    getCharacterByName(name)
      .then((response) => onCharLoaded(response))
      .then(() => setProcess('confirmed'));
  };

  const handleChange = (event) => {
    if (!event.target.value) {
      setChar(null);
    }
  };

  const errorMessage =
    process === 'error' ? (
      <div className='char__search-critical-error'>
        <ErrorMessage />
      </div>
    ) : null;

  const searchResults = !char ? null : char.length > 0 ? (
    <div className='char__search-wrapper'>
      <div className='char__search-success'>
        There is! Visit {char[0].name} page?
      </div>
      <Link
        to={`/character/${char[0].id}`}
        className='button button__secondary'
      >
        <div className='inner'>To page</div>
      </Link>
    </div>
  ) : (
    <div className='char__search-error'>
      The character was not found. Check the name and try again.
    </div>
  );

  return (
    <div className='char__search-form'>
      <Formik
        initialValues={{
          charName: '',
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required('The name field is required'),
        })}
        onSubmit={({ charName }) => {
          getChar(charName);
        }}
      >
        <Form onChange={(event) => handleChange(event)}>
          <label className='char__search-label' htmlFor='charName'>
            Or find a character by name:
          </label>
          <div className='char__search-wrapper'>
            <Field
              id='charName'
              name='charName'
              type='text'
              placeholder='Enter name'
            />
            <button
              type='submit'
              className='button button__main'
              disabled={process === 'loading'}
            >
              <div className='inner'>find</div>
            </button>
          </div>
          <FormikErrorMessage
            component='div'
            className='char__search-error'
            name='charName'
          />
        </Form>
      </Formik>
      {searchResults}
      {errorMessage}
    </div>
  );
};

export default CharSearchForm;
