import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Dashboard  from '../dashboard/Dashboard.js'
import InitialDataIndex  from  '../components/Ambulance/InitialDataIndex.js';
import ChangeDataIndex from '../components/Ambulance/ChangeData/ChangeDataIndex';
import AmbulancePlanCorrection from '../components/Ambulance/AmbulancePlanCorrection.js';
import AmbulanceInitialDataStartPage from '../components/Ambulance/AmbulanceInitialDataStartPage.js';

class Routes extends React.Component {

    render(){
      let path = this.props.match.path;
      return (
            <Switch>
              <Route exact path={`${path}`} >
                <Redirect to={`${path}/changes`} />
              </Route>
              <Route path={`${path}/initial/:nodeId`} component={InitialDataIndex} />
              <Route path={`${path}/initial`} component={AmbulanceInitialDataStartPage} />
              <Route path={`${path}/changes/:nodeId`} component={ChangeDataIndex} />
              <Route path={`${path}/changes`} component={AmbulancePlanCorrection} />
              <Route path={`${path}/attached-persons/:nodeId`} component={InitialDataIndex} />
              <Route component={Dashboard} />
            </Switch>
      );
    }
}

export default withRouter(Routes);