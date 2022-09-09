import React from 'react';

import MainTable from './MainTable';
import FapMainTable  from  './fap/MainTable.js'
import MoList  from  './fap/MoList.js'

import { Redirect, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectedNodeIdSelector } from '../../store/nodeData/nodeDataSelectors';
import { moDepartmentRequired } from '../../services/moDepartmentRequired';
import { OmsPlanTablePaper } from '../OmsPlanTable/OmsPlanTablePaper';

const title = 'Данные на начало года';

function InitialData(props) {
  const match = useRouteMatch();
  const path = match.path;
  const selectedNodeId = useSelector(selectedNodeIdSelector);

  return (
      <OmsPlanTablePaper>
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
      </OmsPlanTablePaper>
  );
}

export default InitialData;