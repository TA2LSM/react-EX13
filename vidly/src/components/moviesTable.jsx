import React, { Component } from 'react';
//import React from "react"; //imr kısayolu
import { Link } from 'react-router-dom';

//components
import Like from './common/like';
import Table from './common/table';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      sortable: 'true',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>,
    },
    { path: 'genre.name', label: 'Genre', sortable: 'true' },
    { path: 'numberInStock', label: 'Stock', sortable: 'true' },
    { path: 'dailyRentalRate', label: 'Rate', sortable: 'true' },
    {
      label: 'Like',
      key: 'Like',
      sortable: 'false',
      content: movie => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.onLike(movie)}
        />
      ),
    },
    {
      label: 'Modify',
      key: 'Modify',
      sortable: 'false',
      content: movie => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className='btn btn-danger btn-sm fw-bold'
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, sortColumn, onSort } = this.props;

    return (
      <div>
        <Table
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
          data={movies}
        />
      </div>
    );
  }
}

export default MoviesTable;
