import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Dashboard  from '../dashboard/Dashboard.js'
import InitialDataIndex  from  '../components/Hospital/InitialDataIndex.js'
import ChangeDataIndex from '../components/Hospital/ChangeData/ChangeDataIndex'
import ChangeDataList from '../components/Hospital/ChangeDataList/ChangeDataList'
import AttachedInitialDataIndex  from  '../components/Polyclinic/InitialDataIndex.js'

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
              <Route path={`${path}/changes/:nodeId`} component={ChangeDataIndex} />
              <Route path={`${path}/changes`} component={ChangeDataList} />
              <Route path={`${path}/attached-persons/:nodeId`} component={AttachedInitialDataIndex} />
              <Route component={Dashboard} />
            </Switch>
      );
    }
}

export default withRouter(Routes);
