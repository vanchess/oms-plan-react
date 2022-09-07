import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Dashboard  from '../dashboard/Dashboard.js'
import InitialDataIndex  from  '../components/Hospital/InitialDataIndex.js'
import ChangeDataIndex from '../components/Hospital/ChangeData/ChangeDataIndex'
import AttachedInitialDataIndex  from  '../components/Polyclinic/InitialDataIndex.js'
import HospitalPlanCorrection from '../components/Hospital/HospitalPlanCorrection.js';
import HospitalInitialDataStartPage from '../components/Hospital/HospitalInitialDataStartPage.js';

class Routes extends React.Component {
//  <Route path={`${path}/initial/:nodeId/vmp/:profileId`} component={InitialDataFap} />
    render(){
      let path = this.props.match.path;
      console.log("222222");
      return (
            <Switch>
              <Route exact path={`${path}`} >
                <Redirect to={`${path}/changes`} />
              </Route>
              <Route path={`${path}/initial/:nodeId`} component={InitialDataIndex} />
              <Route path={`${path}/initial`} component={HospitalInitialDataStartPage} />
              <Route path={`${path}/changes/:nodeId`} component={ChangeDataIndex} />
              <Route path={`${path}/changes`} component={HospitalPlanCorrection} />
              <Route path={`${path}/attached-persons/:nodeId`} component={AttachedInitialDataIndex} />
              <Route component={Dashboard} />
            </Switch>
      );
    }
}

export default withRouter(Routes);
