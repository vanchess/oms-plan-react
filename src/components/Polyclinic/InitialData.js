import React from 'react';
//import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MainTable from './MainTable';
import FapMainTable  from  './fap/MainTable.js'
import MoList  from  './fap/MoList.js'

import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

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

const title = 'Данные на начало года';

function InitialData(props) {
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
  );
}

export default withStyles(styles)(InitialData);