import React from 'react';
import { Redirect, Route, Switch,useRouteMatch} from 'react-router-dom';
import withStyles from '@mui/styles/withStyles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import MainTable from './MainTable';
import ProfileTable from './ProfileTable';
import VmpMainTable from './vmp/MainTable';
import VmpCareProfileTable from './vmp/CareProfileTable';
import VmpPeriodTable from './vmp/PeriodTable'
import { isVmpNode } from '../../../services/isVmpNode';
import { selectedNodeIdSelector } from '../../../store/nodeData/nodeDataSelectors';
import { useSelector } from 'react-redux';

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
})

function ChangeData(props) {
  const { classes } = props;
  const match = useRouteMatch();
  const path = match.path;
  const selectedNodeId = useSelector(selectedNodeIdSelector);

  return (
    <div>
      <Container maxWidth={false} className={classes.container}>
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Switch>
                <Route exact path={`${path}`}>
                  { isVmpNode(selectedNodeId)
                    ? <Redirect to={`./${selectedNodeId}/care-profile`} />
                    : <MainTable />
                  }
                </Route>
                <Route path={`${path}/profile/:profileId`} >
                  <ProfileTable />
                </Route>
                <Route exact path={`${path}/care-profile`}>
                  <VmpMainTable />
                </Route>
                <Route path={`${path}/care-profile/:careProfileId/group/:vmpGroupId/type/:vmpTypeId`} >
                  <VmpPeriodTable />
                </Route>
                <Route path={`${path}/care-profile/:careProfileId`} >
                  <VmpCareProfileTable />
                </Route>
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default withStyles(styles)(ChangeData);