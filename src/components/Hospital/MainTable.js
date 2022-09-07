import React, { useMemo, useState } from "react";
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import {
  LinearProgress,
  Checkbox,
} from "@mui/material";

import FullscreenIcon from '@mui/icons-material/Fullscreen';

import OmsPlanTable from "../OmsPlanTableStyled";

import { 
  indicatorsForSelectedNodeSelector, 
  hospitalBedProfilesForSelectedNodeSelector, 
  selectedNodeIdSelector, 
  indicatorForNodeIsLoadingSelector, 
  hospitalBedProfilesForNodeIsLoadingSelector 
} from '../../store/nodeData/nodeDataSelectors';
import { moArrSelector, moIdsSelector } from "../../store/mo/moSelectors";
import { initialDataIsLoadingSelector } from "../../store/initialData/initialDataSelectors";

const firstHeadHeight = 25;
const leftColWidth = 20;
const rightColWidth = 120;

const EmptyArray = [];

const MainTable = (props) => {
  const [fullScreen, setFullScreen] = useState(false);
  
  const nodeId = useSelector(selectedNodeIdSelector);
  const mo = useSelector(moArrSelector);
  const moIds = useSelector(moIdsSelector);
  const profiles = useSelector(hospitalBedProfilesForSelectedNodeSelector);
  const indicators = useSelector(indicatorsForSelectedNodeSelector);

  const columnDefs = useMemo(() => {
      if (!indicators || !profiles) {
        console.log(1);
          return EmptyArray;
      }
      console.log(2);
      return profiles.map((profile) => {
        return {
          ...profile,
          profileId: profile.id,
          children: indicators
        }
      })
    },[profiles,indicators]);

  const isLoading = useSelector((store) => {
    return (
      initialDataIsLoadingSelector(store) 
      || hospitalBedProfilesForNodeIsLoadingSelector(store, nodeId)
      || indicatorForNodeIsLoadingSelector(store, nodeId)
    )
  });

  console.log('M0');

  if (isLoading || !indicators || mo.length === 0 || !profiles) {
      return (<div><LinearProgress /></div>);
  }
  console.log('MИ3');

  return (
        <OmsPlanTable 
          aria-label="sticky table" 
          className={clsx({'FullScreen':fullScreen})} 
          leftColWidth={leftColWidth} 
          rightColWidth={rightColWidth} 
          topRowHeight={firstHeadHeight}
          columnDefs={columnDefs}
          mo={mo}
          moIds={moIds}
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