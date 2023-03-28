import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'd371ed7ea24992441e33620ff22a8cf2';
  const _defaultOffset = 210;

  const { request, loading, error, clearError } = useHttp();

  const getAllCharacters = async (offset = _defaultOffset) => {
    const response = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );
    return response.data.results.map((char) => _transformCharacter(char));
  };

  const getCharacter = async (id) => {
    const response = await request(
      `${_apiBase}characters/${id}?apikey=${_apiKey}`
    );
    return _transformCharacter(response.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description
        ? `${char.description.slice(0, 210)}...`
        : `There is no description for this character...`,
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  return { loading, error, getAllCharacters, getCharacter, clearError };
};

export default useMarvelService;
