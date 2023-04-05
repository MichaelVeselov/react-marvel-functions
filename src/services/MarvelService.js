import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'd371ed7ea24992441e33620ff22a8cf2';
  const _defaultOffset = 210;

  const { process, request, setProcess, clearError } = useHttp();

  const getAllCharacters = async (offset = _defaultOffset) => {
    const response = await request(
      `${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`
    );
    return response.data.results.map((char) => _transformCharacter(char));
  };

  const getCharacterById = async (id) => {
    const response = await request(
      `${_apiBase}characters/${id}?apikey=${_apiKey}`
    );
    return _transformCharacter(response.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const response = await request(
      `${_apiBase}characters?name=${name}&apikey=${_apiKey}`
    );
    return response.data.results.map((char) => _transformCharacter(char));
  };

  const getAllComics = async (offset = 0) => {
    const response = await request(
      `${_apiBase}comics?limit=8&offset=${offset}orderBy=issueNumber&apikey=${_apiKey}`
    );

    return response.data.results.map((comic) => _transformComic(comic));
  };

  const getComicById = async (id) => {
    const response = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`);
    return _transformComic(response.data.results[0]);
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

  const _transformComic = (comic) => {
    const price = `${comic.prices[0]?.type} - ${
      comic.prices[0]?.price
        ? `${comic.prices[0]?.price}$`
        : 'Price is not available...'
    }`;

    return {
      id: comic.id,
      title: comic.title,
      description: comic.description
        ? `${comic.description.slice(0, 210)}...`
        : `There is no description for this comic...`,
      pageCount: comic.pageCount
        ? `${comic.pageCount} pages.`
        : 'There is no information about the number of pages...',
      thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
      language: comic.textObjects[0]?.language || 'en-us',
      price: price,
    };
  };

  return {
    process,
    setProcess,
    getAllCharacters,
    getCharacterById,
    getCharacterByName,
    getAllComics,
    getComicById,
    clearError,
  };
};

export default useMarvelService;
