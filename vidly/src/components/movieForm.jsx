import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Joi, { errors } from 'joi-browser';
import { toast } from 'react-toastify';

import Form from './common/form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

function withParams(Component) {
  return props => (
    <Component
      {...props}
      params={useParams()}
      // history={createBrowserHistory()}
      navigate={useNavigate()}
    />
  );
}

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
    pagetitle: 'Update Movie',
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().min(5).label('Title'), // Mosh server tarafı min 5 istediği için eklendi
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovies() {
    try {
      // ...movies/new olarak gelen sayfa isteği
      const movieId = this.props.params.id;
      if (movieId === 'new') {
        this.setState({ pagetitle: 'Add New Movie' });
        return;
      }

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const { navigate } = this.props;

        toast.error('The movie couldn`t found');
        navigate('/not-found');
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    if (this.state.errors) {
      //toast.error('Unauthorized action');
      //return;
      console.error(errors);
    }

    try {
      let { navigate } = this.props;

      await saveMovie(this.state.data);
      navigate('/movies');
    } catch (ex) {
      if (ex.response) toast.error(ex.response.data);
      else toast.error(ex.message);
    }
  };

  render() {
    return (
      <>
        <h3>{this.state.pagetitle}</h3>
        <form>
          {this.renderInput('title', `movie's title`, 'Title')}
          {this.renderSelect('genreId', `movie's genre from list`, 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'number in stock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', `movie's daily rental rate`, 'Daily Rental Rate', 'number', '0.1')}
          {this.renderButton('Save')}
        </form>
      </>
    );
  }
}

export default withParams(MovieForm);
