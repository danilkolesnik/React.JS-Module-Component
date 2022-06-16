import React from 'react';
// import './LoginPage.css';
import axios from 'axios';

const Loginpage = () => {

  const logIn = async (evn) => {
    evn.preventDefault()
    const { target } = evn;
    const response = await axios.post('https://serene-lowlands-92916.herokuapp.com/login', { login: target[0].value, password: target[1].value })
    if (response) {
      window.location.href = "/admin"
    }
  }
  
  return (
    <div className="main__form">
      <div className="stuff">
          <form onSubmit={logIn}>
            <div className="input__holder">
              <span className='label__span'>Login</span>
              <input className="input" type="text" required="required" placeholder="Login"/>
            </div>
            <div className="input__holder">
              <span className='label__span'>Password</span>
              <input className="input" type="text" required="required" placeholder="Password"/>
            </div>
            <button className="verification__button">Login</button>
          </form>
      </div>
    </div>
  );
}

export default Loginpage;
