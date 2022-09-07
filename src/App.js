import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './_components';
import AppRoot  from './AppRoot.js'
import Login from './Login.js'

import { connect } from 'react-redux';
import { selectIsAuth } from './store/auth/authSelector'

class App extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
      return (
        <div >
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute component={AppRoot}  isAuth={this.props.isAuth}/>
            </Switch>
        </div>
      );
    }
}



const mapStateToProps = function(store) {
  return {
      isAuth: selectIsAuth(store), 
    };
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);