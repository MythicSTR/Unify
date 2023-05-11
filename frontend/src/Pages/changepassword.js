import React, { useEffect, useState } from 'react';
import '../styles/SigninForm.css';
import jwtDecode from 'jwt-decode';

function ChangeForm() {
  const [email, setEmail] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  //const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${newpassword}`);

    try {
      const response = await fetch('http://localhost:8000/changepassword/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          oldpassword: oldpassword,
          newpassword : newpassword
        })
      });
      const data = await response.json();
      console.log(data.message)
      if(data.message==="Ok"){
        window.location.href = "/login";
      }
      else if(data.message==="No"){
        window.alert("Incorrect old password")
      }
      else if(data.message==="incorrect"){
        window.alert("Incorrect credentials")
      }
    } catch (error) {
      console.log('Password change failed:', error);
    }
}

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  useEffect(()=>{
    const token = localStorage.getItem('jwtToken')
    const user = jwtDecode(token)
    if(user.isLoggedin){
      window.history.back();
    }
  })

  return (
    <div className="signin-form-container">
      <h1 className='header-name'>Change Password</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control"  placeholder='Enter email address' value={email} onChange={handleEmailChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Old Password:</label>
          <input type="password" id="oldpassword" className="form-control" placeholder='Old Password' value={oldpassword} onChange={handleOldPasswordChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input type="password" id="newpassword" className="form-control" placeholder='New Password' value={newpassword} onChange={handleNewPasswordChange} />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </form>
      
      <div className='forgot-change'>
        <div className="fc_form-group">
          <label htmlFor="forgotPassword">
          <a href="/forgotpassword" className="form-check-label">Forgot Password</a>
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
  );
}

export default ChangeForm;