import React, { useState } from 'react';
import '../styles/SigninForm.css';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}, Remember Me: ${rememberMe}`);

    fetch('http://localhost:8000/login_user/',{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email:email,
        password:password,
        rememberme:rememberMe
      }),
    })
      .then(res=>{
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
      })
      .then((data)=>{
        return data;
      })
      .catch(e=>{
        console.log(e)
      })
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
