import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Dashboard  from '../dashboard/Dashboard.js'
import InitialDataIndex  from  '../components/Polyclinic/InitialDataIndex.js'
import InitialDataFap  from  '../components/Polyclinic/fap/InitialDataIndex.js'
import MoList  from  '../components/Polyclinic/fap/MoList.js'

class Routes extends React.Component {

    render(){

      let path = this.props.match.path;
      return (
            <Switch>
              <Route exact path={`${path}`} >
                <Redirect to={`${path}/changes`} />
              </Route>
              <Route path={`${path}/initial/:nodeId/fap/:moId`} component={InitialDataFap} />
              <Route path={`${path}/initial/:nodeId/fap`} component={MoList} />
              <Route path={`${path}/initial/:nodeId`} component={InitialDataIndex} />

              <Route component={Dashboard} />
            </Switch>
      );
    }
}

export default withRouter(Routes);
