import React, { useEffect, useState } from 'react';
import '../styles/ForgotPassword.css';
import jwtDecode from 'jwt-decode';

function ForgotForm() {
  const [email, setEmail] = useState("");
  const [id, setID] = useState("");
  const [password, setPassword] = useState("");
  //const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/forgotpassword/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          id : id,
          password: password
        })
      });
      const data = await response.json();
      console.log(data.message)
      if(data.message==="Ok"){
        window.location = 'http://localhost:3000/login'
      }
      else if(data.message==="No"){
        window.alert("Incorrect Credentials")
      }
      else{
        window.alert("Error : Not Sucessful !!!")
      }
    } catch (error) {
      console.log('Login failed:', error);
    }
   }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIDChange = (event) => {
    setID(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  useEffect(()=>{
    const token = localStorage.getItem('jwtToken')
    const user = jwtDecode(token)
    if(user.isLoggedin){
      window.history.back();
    }
  })

  return (
    <div className='forgot-wrapper'>
    <div className="forgot-form-container">
      <h1 className='header-name'>Forgot Password</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="__form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="_form-control"  placeholder='Enter email address' value={email} onChange={handleEmailChange} />
        </div>
        <div className="__form-group">
          <label htmlFor="email">KU ID:</label>
          <input type="input" id="id" className="_form-control"  placeholder='Enter KU ID' value={id} onChange={handleIDChange} />
        </div>
        <div className="__form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="_form-control" placeholder='Enter password' value={password} onChange={handlePasswordChange} />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      
      <div className='forgot-change'>
        <div className="fc_form-group">
          <label htmlFor="forgotPassword">
          <a href="/changepassword" className="form-check-label">Change Password</a>
          </label>
        </div>
        <div className="fc_form-group">
          <label htmlFor="forgotPassword">
            <a href="/login" className="form-check-label">Login</a>
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

export default ForgotForm;