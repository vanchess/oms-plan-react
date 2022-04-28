import React from 'react';
import { Route, Switch } from "react-router-dom";
//import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MainTable from './MainTable';
import MedicalAssistanceTable from '../../Polyclinic/ChangeData/MedicalAssistanceTable'
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
                <Route exact path={`${path}`} component={MainTable} />
                <Route path={`${path}/assistance/:assistanceId`} component={MedicalAssistanceTable} />
              </Switch>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default withStyles(styles)(ChangeData);