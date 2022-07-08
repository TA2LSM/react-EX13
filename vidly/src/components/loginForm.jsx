import React from 'react';
import { Navigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import Joi from 'joi-browser';

import auth from '../services/authService';
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

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().min(3).max(32).required().label('Username'),
    password: Joi.string().min(4).required().label('Password'),
  };

  doSubmit = async () => {
    // Call the server, save the changes, redirect user to different page
    try {
      // let { navigate } = this.props;

      const { data } = this.state;
      await auth.login(data.username, data.password);

      //navigate('/');
      // bizi home kısmına geri getirir

      window.location = '/';
      // tüm uygulamayı baştan yükler. Login'^den sonra username görünsün diye kullandık
      // çünkü username kısmı componentDidMount ile yapılıyor. o da App açılınca sadece
      // bir kere çalıştığı için sayfayı refresh etmezsek değişiklik gözükmüyor.
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
    if (auth.getCurrentUser()) {
      return (
        <Navigate
          replace
          to='/'
        />
      );
    }

    return (
      <div>
        <h3>Please Login</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'e-mail as username', 'Username')}
          {this.renderInput('password', 'password', 'Password', 'password')}
          {/* <div className='mb-3 form-check'>
            <input
              type='checkbox'
              className='form-check-input'
              id='exampleCheck1'
            />
            <label
              className='form-check-label'
              htmlFor='exampleCheck1'
            >
              Keep me logged in
            </label>
          </div> */}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

// export default withParams(LoginForm);
export default LoginForm;
