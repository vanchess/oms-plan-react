import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Dashboard  from '../dashboard/Dashboard.js'
import CustomReportsStartPage from '../components/CustomReports/CustomReportsStartPage.js';
import CustomReportEditPage from '../components/CustomReports/CustomReportEditPage.js';
import ProfileEditPage from '../components/CustomReports/ProfileEditPage.js';

class Routes extends React.Component {

    render(){
      let path = this.props.match.path;
      return (
            <Switch>
              <Route exact path={`${path}`} >
                <Redirect to={`${path}/home`} />
              </Route>
              <Route path={`${path}/home`} component={CustomReportsStartPage} />
              <Route path={`${path}/:reportId/edit`} component={CustomReportEditPage} />
              <Route path={`${path}/profiles/:id`} component={ProfileEditPage} />
              <Route component={Dashboard} />
            </Switch>
      );
    }
}

export default withRouter(Routes);