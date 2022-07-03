import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/'
        >
          <strong>Vidly</strong>
        </Link>

        <div className='collapse navbar-collapse'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <NavLink
              className='nav-item nav-link'
              aria-current='page'
              to='/movies'
            >
              Movies
            </NavLink>
            <NavLink
              className='nav-item nav-link'
              to='/customers'
            >
              Customers
            </NavLink>
            <NavLink
              className='nav-item nav-link'
              to='/rentals'
            >
              Rentals
            </NavLink>
          </ul>

          {!user && (
            <ul className='navbar-nav mb-2 mb-lg-0'>
              <NavLink
                className='nav-item nav-link'
                to='/login'
              >
                Login
              </NavLink>
              <NavLink
                className='nav-item nav-link'
                to='/register'
              >
                Register
              </NavLink>
            </ul>
          )}
          {user && (
            <ul className='navbar-nav mb-2 mb-lg-0'>
              <NavLink
                className='nav-item nav-link'
                to='/profile'
              >
                Welcome,{' '}
                <strong>
                  <i>{user.name}</i>
                </strong>
              </NavLink>
              <NavLink
                className='nav-item nav-link'
                to='/logout'
              >
                Logout
              </NavLink>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

{
  /* <ul>
  <li>
    <Link to='/'>Home</Link>
  </li>
  <li>
    <Link to='/products'>Products</Link>
  </li>
  <li>
    <Link to='/posts/2018/06'>Posts</Link>
  </li>
  <li>
    <Link to='/admin'>Admin</Link>
  </li>
  <li>
    <Link to='/movies'>Movies</Link>
  </li>
</ul> */
}
