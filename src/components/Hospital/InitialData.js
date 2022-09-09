import React from 'react';

import MainTable from './MainTable';
import VmpMainTable from './vmp/MainTable';
import VmpCareProfileTable from './vmp/CareProfileTable';

import { Redirect, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectedNodeIdSelector } from '../../store/nodeData/nodeDataSelectors';
import { isVmpNode } from '../../services/isVmpNode';
import { OmsPlanTablePaper } from '../OmsPlanTable/OmsPlanTablePaper';

function InitialData(props) {
  const match = useRouteMatch();
  const path = match.path;
  const selectedNodeId = useSelector(selectedNodeIdSelector);

  return (
      <OmsPlanTablePaper>
        <Switch>
          <Route exact path={`${path}`}>
            { isVmpNode(selectedNodeId)
              ? <Redirect to={`./${selectedNodeId}/care-profile`} />
              : <MainTable />
            }
          </Route>
          <Route exact path={`${path}/care-profile`}>
            <VmpMainTable />
          </Route>
          <Route path={`${path}/care-profile/:careProfileId`} >
            <VmpCareProfileTable />
          </Route>
        </Switch>
      </OmsPlanTablePaper>
  );
}

export default InitialData;