import React, { Component } from 'react'; //imrc
import { Link, useParams } from 'react-router-dom';
import _ from 'lodash';

import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import { toast } from 'react-toastify';

//components
import Pagination from './common/pagination';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import SearchBox from './common/searchBox';

// reusable
import { paginate } from '../utils/paginate';

function withParams(Component) {
  return props => (
    <Component
      {...props}
      params={useParams()}
      // history={createBrowserHistory()}
      //navigate={useNavigate()}
    />
  );
}

//cc
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    // selectedGenre: [],
    defaultPageSizes: [1, 2, 3, 4, 5, 10],
    currentPage: 1,
    pageSize: 0,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: {
      path: 'title',
      order: 'asc',
    },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ name: 'All Genres', _id: 'specialID_9074386754' }, ...data];
    const selectedGenre = genres[0];

    const availablePageSizes = [...this.state.defaultPageSizes];
    const pageSize = availablePageSizes[2];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres, selectedGenre, pageSize });
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
      toast.success('The movie has been deleted');
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error('This movie has already been deleted');

      this.setState({ movies: originalMovies });
    }
  };

  handleLike = movie => {
    //console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);

    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;

    this.setState({ movies });
  };

  handlePageChange = pageNumber => {
    //console.log(pageNumber);
    this.setState({ currentPage: pageNumber });
  };

  handlePageSizeChange = pageSize => {
    //console.log(pageSize);
    this.setState({ pageSize, currentPage: 1 });
  };

  handlePrevious = pageNumber => {
    // console.log(pageNumber);
    if (pageNumber > 1) this.setState({ currentPage: pageNumber - 1 });
  };
  handleNext = (pageNumber, totalPages) => {
    // console.log(pageNumber);
    if (pageNumber < totalPages) this.setState({ currentPage: pageNumber + 1 });
  };

  handleGenreSelect = genre => {
    //console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const { movies: allMovies, currentPage, pageSize, selectedGenre, sortColumn, searchQuery } = this.state;
    let filteredMovies = allMovies;

    if (searchQuery) filteredMovies = allMovies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre.name !== 'All Genres')
      filteredMovies = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sortedMovies = _.orderBy(filteredMovies, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { user } = this.props;

    const { length: count } = this.state.movies;
    //movies objesine ait lenght metodunun dönüşü count olarak alınıyor
    if (count === 0) return <p>There is no movie in the database!</p>;

    const { genres: allGenres, defaultPageSizes, currentPage, pageSize, selectedGenre, sortColumn } = this.state;
    const { totalCount, data: movies } = this.getPageData();

    let tableHeight;
    if (totalCount < pageSize) tableHeight = totalCount * 50 + 40;
    else tableHeight = pageSize * 50 + 40;
    tableHeight = tableHeight.toString() + 'px';

    return (
      <div>
        <div className='row dflex'>
          <div className='col-2 mb-2 dflex align-items-center'>
            <div
              className='row-2'
              style={{ textAlign: 'center' }}
            >
              <span>
                <b>
                  <i>SELECT GENRE</i>
                </b>
              </span>
            </div>
            <div className='row-2'>
              <ListGroup
                items={allGenres}
                selectedItem={selectedGenre}
                // aşağıdaki değerler modül içinde default geçildi. Burada başka bir değer verilirse
                // default değerlerin üstüne yazılır.
                // textProperty="name"
                // valueProperty="_id"
                onItemSelect={this.handleGenreSelect}
              />
            </div>
          </div>

          <div className='col'>
            <div className='row mb-2'>
              <div className='col'>
                <SearchBox
                  value={this.state.searchQuery}
                  onChange={this.handleSearch}
                />
              </div>
            </div>

            <div className='row dflex align-items-center'>
              <div className='col-2'>
                {user && user.isAdmin === true && (
                  <Link
                    to='/movies/new'
                    className='btn btn-outline-primary'
                  >
                    Add New Movie
                  </Link>
                )}
              </div>

              <div
                className='col'
                style={{ textAlign: 'end' }}
              >
                <span>
                  Showing <b>{totalCount}</b> movies in the database
                </span>
              </div>
            </div>
            <div
              className='row d-flex flex-column'
              style={{ height: tableHeight }}
            >
              <MoviesTable
                movies={movies}
                sortColumn={sortColumn}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            </div>
            <hr
              className='border-2 border-bottom border-danger'
              // style={{ border: "2px red dashed" }}
              // bg-danger
            />

            <div
              className='row g-2'
              // style={{ border: '1px solid red' }}
            >
              <Pagination
                itemsCount={totalCount}
                pageSize={pageSize}
                defaultPageSizes={defaultPageSizes}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
                onSelectPrevious={this.handlePrevious}
                onSelectNext={this.handleNext}
                onPageSizeSelection={this.handlePageSizeChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withParams(Movies);
