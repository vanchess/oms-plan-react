import React from 'react';
import withStyles from '@mui/styles/withStyles';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import MainTable from './MainTable';
import FapMainTable  from  './fap/MainTable.js'
import MoList  from  './fap/MoList.js'

import { Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectedNodeIdSelector } from '../../store/nodeData/nodeDataSelectors';
import { moDepartmentRequired } from '../../services/moDepartmentRequired';

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
  const selectedNodeId = useSelector(selectedNodeIdSelector);

  return (
    <div>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Switch>
                <Route exact path={`${path}`}>
                { moDepartmentRequired(selectedNodeId)
                  ? <Redirect to={`./${selectedNodeId}/fap`} />
                  : <MainTable />
                }
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