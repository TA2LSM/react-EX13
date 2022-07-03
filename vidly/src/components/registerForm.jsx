import React from 'react';
// import { useNavigate } from 'react-router-dom';

import Joi from 'joi-browser';
import { toast } from 'react-toastify';

// tüm fonksiyonlar userService objesinin metotları olarak import edilir
import * as userService from '../services/userService';
import auth from '../services/authService';
// import * as auth from '../services/authService';

import Form from './common/form';

// function withParams(Component) {
//   return props => (
//     <Component
//       {...props}
//       //params={useParams()}
//       // history={createBrowserHistory()}
//       navigate={useNavigate()}
//     />
//   );
// }
class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().email().min(3).max(32).required().label('Username'),
    password: Joi.string().min(5).required().label('Password'),
    name: Joi.string().min(3).required().label('Name'),
  };

  doSubmit = async () => {
    // Call the server, save the changes, redirect user to different page
    try {
      // const { navigate } = this.props;

      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);

      // toast.success('The user has been created');
      //navigate('/');
      window.location = '/';
    } catch (ex) {
      // Her zaman ex.response olmayabiliyor. Bu nedenle kontrol etmek laızm
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; // server'dan alınan error mesajını kullanıyoruz

        this.setState({ errors });
      } else toast.error(ex.message);
    }
  };

  render() {
    return (
      <div>
        <h3>Please Register</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'e-mail as username', 'Username')}
          {this.renderInput('password', 'password', 'Password', 'password')}
          {this.renderInput('name', 'real name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

// export default withParams(RegisterForm);
export default RegisterForm;
