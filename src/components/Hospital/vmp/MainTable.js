import React, { useMemo, useState } from "react";
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import { LinearProgress } from "@mui/material";

import Checkbox from '@mui/material/Checkbox';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import Link from '@mui/material/Link';

import { useHistory, useLocation } from 'react-router-dom';

import CareProfileDialog from './CareProfileDialog';

import { 
  indicatorsForSelectedNodeSelector, 
  careProfilesArrForSelectedNodeSelector, 
  selectedNodeIdSelector, 
  careProfilesForNodeIsLoadingSelector, 
  indicatorForNodeIsLoadingSelector 
} from '../../../store/nodeData/nodeDataSelectors';
import { moArrSelector } from "../../../store/mo/moSelectors";
import { initialDataIsLoadingSelector } from "../../../store/initialData/initialDataSelectors";
import OmsPlanTable from "../../OmsPlanTable/OmsPlanTableStyled";

const firstHeadHeight = 25;
const leftColWidth = 20;
const rightColWidth = 120;

const EmptyArray = [];

const MainTable = (props) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [isOpenCareProfileDialog, setIsOpenCareProfileDialog] = useState(false);
  const location = useLocation();
  const history = useHistory();
  
  const handleCloseCareProfileDialog = (careProfileId) => {
      setIsOpenCareProfileDialog(false);
      
      if(careProfileId) {
        history.push(`${location.pathname}/${careProfileId}`);
      }
  };
  const openCareProfileDialog = () => setIsOpenCareProfileDialog(true);

  const nodeId = useSelector(selectedNodeIdSelector);
  const mo = useSelector(moArrSelector);
  const careProfiles = useSelector(careProfilesArrForSelectedNodeSelector);
  const indicators = useSelector(indicatorsForSelectedNodeSelector);

  const columnDefs = useMemo(() => {
    if (!indicators || !careProfiles) {
      console.log(1);
        return EmptyArray;
    }
    console.log(2);
    return careProfiles.map((profile) => {
      return {
        ...profile,
        careProfileId: profile.id,
        link: './care-profile/'+profile.id,
        children: indicators
      }
    })
  },[careProfiles,indicators]);

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

  const controlPanel = useMemo(() => (
    <Checkbox
        size="small"
        checked={fullScreen}
        icon={<FullscreenIcon />} 
        checkedIcon={<FullscreenIcon />}
        onChange={(e) => setFullScreen(e.target.checked)}
      />
  ),[fullScreen])

  const isLoading = useSelector((store) => {
    return (
      initialDataIsLoadingSelector(store) 
      || careProfilesForNodeIsLoadingSelector(store, nodeId)
      || indicatorForNodeIsLoadingSelector(store, nodeId)
    )
  });
  
  
  console.log('M0');
  if (isLoading || !indicators || mo.length === 0|| !careProfiles) {
      return (<div><LinearProgress /></div>);
  }
  console.log('MИ1');

  

  return (
    <>
      <CareProfileDialog open={isOpenCareProfileDialog} onClose={handleCloseCareProfileDialog} />
      <Link component="button" variant="body2" onClick={openCareProfileDialog}>Выбрать профиль медицинской помощи из списка</Link>
      <OmsPlanTable
          variant='summary'
          aria-label="sticky table" 
          className={clsx({'FullScreen':fullScreen})} 
          leftColWidth={leftColWidth} 
          rightColWidth={rightColWidth} 
          topRowHeight={firstHeadHeight}
          columnDefs={columnDefs}
          rowDefs={rowDefs}
          controlPanel={controlPanel}
        >
      </OmsPlanTable>
    </>
  );
};

export default React.memo(MainTable);