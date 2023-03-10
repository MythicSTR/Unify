import React, { useState } from 'react';
import '../styles/SigninForm.css';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}, Remember Me: ${rememberMe}`);

    axios.post('/login_user/',{email,password})
      .then((response) => {
        console.log(response);
        // do something with the response data
      })
      .catch((error) => {
        console.error(error);
        // handle the error
      });
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  }
  // const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')._value;

  return (
    <div className="signin-form-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email"  className="form-control"  placeholder='Enter email address' value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password"  className="form-control" placeholder='Enter password' value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label htmlFor="rememberMe">
            <input type="checkbox" id="rememberMe" className="form-check-input" checked={rememberMe} onChange={handleRememberMeChange} />
            <span className="form-check-label">Remember Me</span>
          </label>
        </div>

        <div className="form-group">
        <label htmlFor="forgotPassword">
          <span className="form-check-label">Forgot Password</span>
        </label>
      </div>


        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
    </div>
  );
}

export default LoginForm;
