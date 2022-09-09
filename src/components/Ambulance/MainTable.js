import React, { useMemo, useState } from "react";
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import {
  LinearProgress,
  Checkbox,
} from "@mui/material";

import FullscreenIcon from '@mui/icons-material/Fullscreen';

import { 
  indicatorForNodeIsLoadingSelector,
  indicatorsForSelectedNodeSelector, 
  medicalAssistanceTypesArrForSelectedNodeSelector, 
  medicalAssistanceTypesForNodeIsLoadingSelector, 
  selectedNodeIdSelector 
} from '../../store/nodeData/nodeDataSelectors';
import { moArrSelector } from "../../store/mo/moSelectors";
import { initialDataIsLoadingSelector } from "../../store/initialData/initialDataSelectors";
import OmsPlanTable from "../OmsPlanTable/OmsPlanTableStyled";

const firstHeadHeight = 25;
const leftColWidth = 20;
const rightColWidth = 120;

const EmptyArray = [];

const MainTable = (props) => {
  const [fullScreen, setFullScreen] = useState(false);
  
  const nodeId = useSelector(selectedNodeIdSelector);
  const mo = useSelector(moArrSelector);
  const assistanceTypes = useSelector(medicalAssistanceTypesArrForSelectedNodeSelector);
  const indicators = useSelector(indicatorsForSelectedNodeSelector);

  const columnDefs = useMemo(() => {
      if (!indicators || !assistanceTypes) {
        console.log(1);
        return EmptyArray;
      }
      console.log(2);
      return assistanceTypes.map((type) => {
        return {
          ...type,
          assistanceTypeId: type.id,
          children: indicators
        }
      });
  },[assistanceTypes,indicators]);

  const rowDefs = useMemo(() => {
      if (!mo) {
        console.log('mo array is empty');
        return EmptyArray;
      }
      return mo?.map((m) => {
        return {
          ...m,
          moId: m.id,
        }
      }) ?? [];
  },[mo]);

  const isLoading = useSelector((store) => {
    return (
      initialDataIsLoadingSelector(store) 
      || medicalAssistanceTypesForNodeIsLoadingSelector(store, nodeId)
      || indicatorForNodeIsLoadingSelector(store, nodeId)
    )
  });

  
  console.log('Amb MainT 0');
  if (isLoading || !indicators || mo.length === 0 || !assistanceTypes) {
      return (<div><LinearProgress /></div>);
  }
  console.log('Amb MainT 1');

  return (
        <OmsPlanTable 
          aria-label="sticky table" 
          className={clsx({'FullScreen':fullScreen})} 
          leftColWidth={leftColWidth} 
          rightColWidth={rightColWidth} 
          topRowHeight={firstHeadHeight}
          columnDefs={columnDefs}
          rowDefs={rowDefs}
          controlPanel={
            <Checkbox
                  size="small"
                  checked={fullScreen}
                  icon={<FullscreenIcon />} 
                  checkedIcon={<FullscreenIcon />}
                  onChange={(e) => setFullScreen(e.target.checked)}
                />
          }
          >
        </OmsPlanTable>
  );
};

export default React.memo(MainTable);