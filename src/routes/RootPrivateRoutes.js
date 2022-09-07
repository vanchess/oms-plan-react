import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StartPage from './../StartPage.js'
import AmbulanceRoutes from './AmbulanceRoutes.js';
import HospitalRoutes from './HospitalRoutes.js';
import PolyclinicRoutes from './PolyclinicRoutes.js';

export default function Routes() {
  return (
          <Switch>
            <Route path='/hospital' component={HospitalRoutes}/>
            <Route path='/ambulance' component={AmbulanceRoutes}/>
            <Route path='/polyclinic' component={PolyclinicRoutes}/>
            <Route component={StartPage}/>
          </Switch>
  );
}