import React from 'react';
import { Route, Switch, useRouteMatch } from "react-router-dom";
//import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MainTable from './MainTable';
import MedicalAssistanceTable from './MedicalAssistanceTable';
import MedicalServicesTable from './MedicalServicesTable';
import FapMainTable from './fap/MainTable';
import FapMedicalAssistanceTable from './fap/MedicalAssistanceTable';
import FapMedicalServicesTable from './fap/MedicalServicesTable';
import MoList  from  '../fap/MoList.js'

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

const title = 'Корректировки';

function ChangeData(props) {
  const { classes } = props;
  const match = useRouteMatch();
  const path = match.path;

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Switch>
                <Route exact path={`${path}`}>
                  <MainTable />
                </Route>
                <Route path={`${path}/assistance/:assistanceId`} >
                  <MedicalAssistanceTable />
                </Route>
                <Route path={`${path}/service/:serviceId`} >
                  <MedicalServicesTable />
                </Route>
                <Route path={`${path}/fap/:moId/assistance/:assistanceId`}>
                  <FapMedicalAssistanceTable />
                </Route>
                <Route path={`${path}/fap/:moId/service/:serviceId`}>
                  <FapMedicalServicesTable />
                </Route>
                <Route path={`${path}/fap/:moId`} >
                  <FapMainTable />
                </Route>
                <Route path={`${path}/fap`} >
                  <MoList />
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