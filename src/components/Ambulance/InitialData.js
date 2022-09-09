import React from 'react';
import MainTable from './MainTable';
import { OmsPlanTablePaper } from '../OmsPlanTable/OmsPlanTablePaper';

function InitialData(props) {

  return (
    <OmsPlanTablePaper>
      <MainTable />
    </OmsPlanTablePaper>
  );
}

export default InitialData;