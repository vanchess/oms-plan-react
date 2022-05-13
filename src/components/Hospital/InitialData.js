/** @jsxImportSource @emotion/react */
import React from 'react';
import { styled } from '@emotion/styled';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import MainTable from './MainTable';
import VmpMainTable from './vmp/MainTable';
import VmpCareProfileTable from './vmp/CareProfileTable';

import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';

const paper = theme => ({
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  });

const container = theme => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
})



function InitialData(props) {
  const match = useRouteMatch();
  const path = match.path;

  return (
    <div>
      <Container maxWidth="lg" css={container}>
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper css={paper}>
              <Switch>
                <Route exact path={`${path}`}>
                  <MainTable />
                </Route>
                <Route exact path={`${path}/care-profile`}>
                  <VmpMainTable />
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
  );
}

export default InitialData;