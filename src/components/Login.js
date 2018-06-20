
import React from 'react';
// import { Link } from 'react-router-dom';


const Login = props => {
  return (
    <div className= 'login'>
      <button className='login-button' onClick={props.login}> Login </button>
    </div>
  );
};

export default Login;


// const Login = () => {
//     const redirectUri = encodeURIComponent(`${window.location.origin}/callback`);
//     const auth0LoginUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}?????`
// }

// export default class Login extends Component {
// render (){
// return (
//     <div>
      
      
//       Login</div>
//     );
//   };
// };




