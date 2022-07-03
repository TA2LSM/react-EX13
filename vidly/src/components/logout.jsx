import React, { Component } from 'react';
import auth from '../services/authService';

class Logout extends Component {
  componentDidMount() {
    auth.logout();

    // reload the page
    window.location = '/';
  }

  render() {
    return null;
  }
}

export default Logout;
