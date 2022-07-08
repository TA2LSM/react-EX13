import React, { Component } from 'react';
//import React from "react"; //imr kısayolu
import { Link } from 'react-router-dom';

//components
import Like from './common/like';
import Table from './common/table';

import auth from '../services/authService';

function checkUserIsAdmin() {
  const user = auth.getCurrentUser();

  if (user && user.isAdmin) return true;
  return false;
}
class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      sortable: 'true',
      content: movie =>
        checkUserIsAdmin(this.props.user) ? (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ) : (
          <span>{movie.title}</span>
        ),
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
  ];

  deletedColumn = {
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
  };

  constructor() {
    super();
    if (checkUserIsAdmin()) this.columns.push(this.deletedColumn);
  }

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
