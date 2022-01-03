import React from 'react';
import SignIn from './sign-in/SignIn.js'
// import SignIn from './sign-in/SignInSide.js'
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectIsAuth } from './store/auth/authSelector'

class Login extends React.Component {

    render(){
      return (
        this.props.isAuth
            ? <Redirect to={{ pathname: '/' }} />
            : <SignIn />
      );
    }
}

const mapStateToProps = function(store) {
  return {
      isAuth: selectIsAuth(store), 

    };
}

export default connect(mapStateToProps)(Login);