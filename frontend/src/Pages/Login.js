import React, { useState } from 'react';
import { redirect } from 'react-router-dom';
import '../styles/SigninForm.css';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}, Remember Me: ${rememberMe}`);

    try {
      const response = await fetch('http://localhost:8000/login_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      const data = await response.json();
      if(data.message==="Student"){
          console.log("redirect to student page")
          localStorage.setItem('jwtToken', data.token);
          window.location = 'http://localhost:3000/student/events';
      }

      if(data.message==="Teacher"){
        console.log("redirect to teacher page")
        localStorage.setItem('jwtToken', data.token);
        window.location = 'http://localhost:3000/faculty';
        console.log(data.token)
      }

      if(data.message==="Not Student"||data.message==="Invalid"){
        alert("Provided email address and password does not match !")
      }
    } catch (error) {
      console.log('Login failed:', error);
    }
   }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  }

  return (
    <div className="signin-form-container">
      <h1>Sign In</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control"  placeholder='Enter email address' value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="form-control" placeholder='Enter password' value={password} onChange={handlePasswordChange} />
        </div>
        <div className="form-group">
          <label htmlFor="rememberMe">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-check-input"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span className="form-check-label">Remember Me</span>
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="forgotPassword">
            <span className="form-check-label">Forgot Password</span>
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
