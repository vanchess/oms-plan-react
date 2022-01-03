import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePolyclinic from './../HomePolyclinic.js'
import HomeHospital   from './../HomeHospital.js'
import HomeAmbulance  from './../HomeAmbulance.js'
import StartPage from './../StartPage.js'

class Routes extends React.Component {
    render(){
      //let path = this.props.match.path;
      return (
            <Switch>
              <Route path='/hospital'   component={HomeHospital}/>
              <Route path='/polyclinic' component={HomePolyclinic}/>
              <Route path='/ambulance'  component={HomeAmbulance}/>
              <Route component={StartPage}/>
            </Switch>
      );
    }
}

export default Routes;
