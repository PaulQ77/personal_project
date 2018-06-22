
import React from 'react';
// eslint-disable-next-line
import { Link } from 'react-router-dom';
// import Footer from './Footer'


const Login = props => {
  console.log(props)
  return (
    <div className= 'login'>
      <button className='login-button' onClick={props.login}> Login </button>
    </div>
  );
};

export default Login;







