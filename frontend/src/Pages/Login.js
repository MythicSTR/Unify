import React, { useEffect, useState } from 'react';
import '../styles/SigninForm.css';
import jwtDecode from 'jwt-decode';

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

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
      console.log(data.message)
      if(data.message==="Student"){
          localStorage.setItem('jwtToken', data.token);
          window.location = 'http://localhost:3000/student';
      }

      if(data.message==="Teacher"){
        localStorage.setItem('jwtToken', data.token);
        window.location = 'http://localhost:3000/faculty';
      }

      if(data.message==="Admin"){
        localStorage.setItem('jwtToken', data.token);
        window.location = 'http://localhost:3000/admin';
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

  // const handleRememberMeChange = (event) => {
  //   setRememberMe(event.target.checked);
  // }

  useEffect(()=>{
    const token = localStorage.getItem('jwtToken')
    const user = jwtDecode(token)
    if(user.isLoggedin){
      window.history.back();
    }
  })

  return (
    <div className='login-canvas'>
    
    <div className="signin-form-container">
      <h1>Sign In</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="_form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control"  placeholder='Enter email address' value={email} onChange={handleEmailChange} />
        </div>
        <div className="_form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="form-control" placeholder='Enter password' value={password} onChange={handlePasswordChange} />
        </div>
        {/* <div className="form-group">
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
        </div> */}

        <button type="submit" className="login_button">
          Sign In
        </button>
      </form>
      
      <div className='forgot-change'>
      <div className="fc_form-group">
          <label htmlFor="changePassword">
            <a href="/changepassword" className="form-check-label">Change Password</a>
          </label>
        </div>

        <div className="fc_form-group">
          <label htmlFor="forgotPassword">
            <a href="/forgotpassword" className="form-check-label">Forgot Password</a>
          </label>
        </div>
      </div>
      <div className='signup-footer'>
        <h1 className='unify'>UNIFY</h1>
        <h4 className='last'>Kathmandu University &copy;Unify</h4>
      </div>
    </div>
    </div>
   

  );
}

export default LoginForm;