/** @jsxImportSource @emotion/react */
import React, { useState, useMemo } from "react";
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import { 
  LinearProgress,
  Checkbox,
  Tooltip
} from "@mui/material";
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import OmsPlanTable from "../../OmsPlanTableStyled";

import Link from '@mui/material/Link';

import CareProfileDialog from './CareProfileDialog';

import {
  useParams
} from "react-router-dom";

import { indicatorForNodeIsLoadingSelector, indicatorsForSelectedNodeSelector, selectedNodeIdSelector } from '../../../store/nodeData/nodeDataSelectors';
import { plannedIndicatorsWhereSelector } from '../../../store/plannedIndicator/plannedIndicatorSelectors'
import { vmpGroupsSelector } from "../../../store/vmpGroups/vmpGroupsSelectors";
import { vmpTypesSelector } from "../../../store/vmpTypes/vmpTypesSelectors";
import { useHistory } from "react-router-dom";
import { careProfileById } from "../../../store/careProfiles/careProfilesSelectors";
import { moArrSelector, moIdsSelector } from "../../../store/mo/moSelectors";
import { initialDataIsLoadingSelector } from "../../../store/initialData/initialDataSelectors";
import styled from "@emotion/styled";

const firstHeadHeight = 125;
const leftColWidth = 20;
const rightColWidth = 120;

const EmptyArray = [];

const ColHead = styled(({className, ...props}) => (
      <div className={className}>
        <Tooltip title={props.typeName} disableInteractive>
          <p className='lineClamp noMargin' >
            { props.typeName }
          </p>
        </Tooltip>
        <p className='noMargin'>(Номер группы ВМП: { props.group })</p>
      </div>
))`
  & .lineClamp {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical; 
    overflow: hidden;
    margin-bottom: 0;
  }
  & .noMargin {
    margin: 0;
  }
`;

const MainTable = (props) => {

  const [fullScreen, setFullScreen] = useState(false);
  const [isOpenCareProfileDialog, setIsOpenCareProfileDialog] = useState(false);

  const history = useHistory();
  
  const handleCloseCareProfileDialog = (careProfileId) => {
      setIsOpenCareProfileDialog(false);
      
      if(careProfileId) {
        history.push(`./${careProfileId}`);
      }
  };
  const openCareProfileDialog = () => setIsOpenCareProfileDialog(true);

  let { careProfileId } = useParams();
  careProfileId = Number(careProfileId);
  const nodeId = useSelector(selectedNodeIdSelector);
  const mo = useSelector(moArrSelector);
  const moIds = useSelector(moIdsSelector);
  const careProfile = useSelector((store) => careProfileById(store, careProfileId));
  const indicators = useSelector(indicatorsForSelectedNodeSelector);
  
  const vmpGroups = useSelector(vmpGroupsSelector);
  const vmpTypes = useSelector(vmpTypesSelector);
  //const year = useSelector(store => store.nodeData.selectedYear);
  let plannedIndicatorArr = useSelector((store) => plannedIndicatorsWhereSelector(store, {nodeId, careProfileId}));

  const columnDefs = useMemo(() => {
    if (!indicators || !plannedIndicatorArr) {
        return EmptyArray;
    }

    const piIds = plannedIndicatorArr.filter((val,i,arr) => {
      const firstIndex = arr.findIndex(v => {
        return v.vmp_type_id === val.vmp_type_id && v.vmp_group_id === val.vmp_group_id;
      });
      return firstIndex === i;
    });

    return piIds.map((el) => {
      return {
        ...el,
        careProfileId: careProfileId,
        vmpGroupId: el.vmp_group_id,
        vmpTypeId: el.vmp_type_id,
        
        head: <ColHead typeName={vmpTypes[el.vmp_type_id].name} group={vmpGroups[el.vmp_group_id].code} />,
        children: indicators
      }
    })
  },[plannedIndicatorArr,indicators,vmpGroups,vmpTypes,careProfileId]);

  const totalFilter = {
    careProfileId: careProfileId,
  }

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
      || indicatorForNodeIsLoadingSelector(store, nodeId)
    )
  });

  console.log('M0');
  if (isLoading
        || !indicators
        || mo.length === 0
        || plannedIndicatorArr.length === 0
        || Object.keys(vmpTypes).length === 0
        || Object.keys(vmpGroups).length === 0
        || !careProfile
  ) {
      return (
        <div>
          <div>
            <LinearProgress />
          </div>
          <div>
            <Link component="button" variant="body2" onClick={openCareProfileDialog}>(выбрать профиль)</Link>
          </div>
        </div>
      );
  }
  console.log('MИ2');

  return (
    <div>
      <CareProfileDialog open={isOpenCareProfileDialog} onClose={handleCloseCareProfileDialog} />
      {careProfile.name} <Link component="button" variant="body2" onClick={openCareProfileDialog}>(выбрать профиль)</Link>
      <OmsPlanTable
          aria-label="sticky table" 
          className={clsx({'FullScreen':fullScreen})} 
          leftColWidth={leftColWidth} 
          rightColWidth={rightColWidth} 
          topRowHeight={firstHeadHeight}
          columnDefs={columnDefs}
          totalFilter={totalFilter}
          mo={mo}
          moIds={moIds}
          controlPanel={controlPanel}
          >
        </OmsPlanTable>
    </div>
  );
};

export default React.memo(MainTable);