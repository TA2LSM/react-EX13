import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Navbar from './components/navbar';
// import Home from './components/home';
// import Products from './components/products';
// import Dashboard from './components/admin/dashboard';
// import Posts from './components/posts';
// import ProductDetails from './components/productDetails';
import NotFound from './components/notFound';

import Customers from './components/customers';
import Rentals from './components/rentals';
import Movies from './components/movies';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import Logout from './components/logout';
import UserProfile from './components/userProfile';
import RegisterForm from './components/registerForm';
import { CheckAdmin, CheckLogin } from './components/common/protedtedRoute';

import auth from './services/authService';

// import Users from './components/admin/users';
// import UserPosts from './components/admin/posts';

//import logo from './logo.svg';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {
    // user: {},
  };

  // Burası sadece bir kere uygulama başlatılınca çalıştırılır.
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    const toastSettings = {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000,
      hideProgressBar: false,
      newestOnTop: true,
      closeOnClick: false,
      pauseOnHover: true,
      theme: 'dark',
    };

    return (
      <main className='container position-absolute'>
        <div
          className='row-sm mb-2'
          style={{
            height: '30px',
            backgroundColor: 'aqua',
            border: '3px solid green',
            fontSize: '15px',
            textAlign: 'center',
          }}
        >
          <p style={{ marginTop: '1px' }}>
            <strong>
              <i>Vidly </i>
            </strong>
            Application (Modified by:{' '}
            <strong>
              <a
                target='_blank'
                href='https://github.com/TA2LSM'
              >
                TA2LSM
              </a>
            </strong>
            )
          </p>
        </div>

        <ToastContainer {...toastSettings} />
        <Navbar user={user} />
        <div>
          <Routes>
            <Route
              path='/customers'
              element={<Customers />}
            />
            <Route
              path='/rentals'
              element={<Rentals />}
            />
            <Route
              path='/login'
              element={<LoginForm />}
            />
            <Route
              path='/logout'
              element={<Logout />}
            />
            <Route
              path='/register'
              element={<RegisterForm />}
            />
            <Route
              path='/profile'
              element={
                <CheckLogin user={auth.getCurrentUser()}>
                  <UserProfile user={user} />
                </CheckLogin>
              }
            />
            <Route
              path='/movies/:id'
              element={
                <CheckAdmin user={auth.getCurrentUser()}>
                  <MovieForm />
                </CheckAdmin>
              }
            />
            <Route
              path='/movies'
              element={<Movies user={user} />}
            />
            {/* "/messages" yazılmazsa yeni route "/messages/posts" oluyor o da not-found'a gidiyor !!! */}
            <Route
              path='/'
              element={
                <Navigate
                  replace
                  to='/movies'
                />
              }
            />
            <Route
              path='/not-found'
              element={<NotFound />}
            />
            <Route
              path='*'
              element={
                <Navigate
                  replace
                  to='/not-found'
                />
              }
            />
          </Routes>
        </div>
      </main>
    );
  }
}

export default App;
