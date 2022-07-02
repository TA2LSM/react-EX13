import { toast } from 'react-toastify';

import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/movies';

function movieUrl(movieId) {
  // return apiEndpoint + '/' + movieId;
  return `${apiEndpoint}/${movieId}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  // update existing movie
  // id'si olan movie db içinde zaten kayıtlıdır bu nedenle update et
  if (movie._id) {
    const body = { ...movie };
    delete body._id;

    toast.success('The movie has been updated');
    return http.put(movieUrl(movie._id), body);
    // api end point'e zaten /62bdaf2f729fb4345ca330eb gibi bir id ile istekte bulunduğumuz
    // için http request body içinden _id'yi silerek yolladık. Orijinal movie değiştirilmedi
    // çünkü başka yerde o id kullanılıyor.
  } else {
    // new movie
    toast.success('A new movie has been added');
    return http.post(apiEndpoint + '/', movie);
  }
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
