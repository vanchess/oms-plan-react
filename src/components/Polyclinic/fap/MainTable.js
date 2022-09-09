import React, { useMemo, useState } from "react";
import { useSelector } from 'react-redux'
import clsx from 'clsx';
import { LinearProgress } from "@mui/material";

import Checkbox from '@mui/material/Checkbox';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

import { 
  indicatorForNodeIsLoadingSelector,
  indicatorsForSelectedNodeSelector, 
  medicalAssistanceTypesArrForSelectedNodeSelector,
  medicalServicesArrForSelectedNodeSelector,
  selectedNodeIdSelector,  
} from '../../../store/nodeData/nodeDataSelectors';
import { initialDataIsLoadingSelector } from "../../../store/initialData/initialDataSelectors";
import { medicalServicesIsLoadingSelector } from "../../../store/medicalServices/medicalServicesSelectors";
import { medicalAssistanceTypesIsLoadingSelector } from "../../../store/medicalAssistanceType/medicalAssistanceTypeSelectors";
import { useParams } from "react-router-dom";
import { moDepartmentsArrByMoIdSelector } from "../../../store/moDepartment/moDepartmentSelectors";
import OmsPlanTable from '../../OmsPlanTable/OmsPlanTableStyled';

const firstHeadHeight = 25;
const leftColWidth = 20;
const rightColWidth = 120;

const EmptyArray = [];

const MainTable = (props) => {
  let { moId } = useParams();
  moId = Number(moId);
  
  const [fullScreen, setFullScreen] = useState(false);
  
  const nodeId = useSelector(selectedNodeIdSelector);
  const moDepartments = useSelector((state) => moDepartmentsArrByMoIdSelector(state,moId));
  const assistanceTypes = useSelector(medicalAssistanceTypesArrForSelectedNodeSelector);
  const medicalServices = useSelector(medicalServicesArrForSelectedNodeSelector);
  const indicators = useSelector(indicatorsForSelectedNodeSelector);

  const columnDefs = useMemo(() => {
      if (!indicators || (!assistanceTypes && !medicalServices)) {
        console.log(1);
        return EmptyArray;
      }
      console.log(2);
      const at = assistanceTypes?.map((type) => {
        return {
          ...type,
          assistanceTypeId: type.id,
          children: indicators
        }
      }) ?? [];
      const ms = medicalServices?.map((service) => {
        return {
          ...service,
          serviceId: service.id,
          children: indicators
        }
      }) ?? [];
      console.log('at',at);
      console.log('ms',ms);
      return [...at, ...ms];
    },[assistanceTypes,medicalServices,indicators]);

  const rowDefs = useMemo(() => {
      if (!moDepartments) {
        console.log('moDepartments empty');
        return EmptyArray;
      }
      return moDepartments?.map((department) => {
        return {
          ...department,
          moId: moId,
          moDepartmentId: department.id,
          short_name: department.name.replace('Фельдшерско-акушерский пункт','ФАП').replace('Фельдшерский пункт','ФП'),
        }
      }) ?? [];
    },[moDepartments]);

  const isLoading = useSelector((store) => {
    return (
      initialDataIsLoadingSelector(store) 
      || medicalAssistanceTypesIsLoadingSelector(store, nodeId)
      || medicalServicesIsLoadingSelector(store, nodeId)
      || indicatorForNodeIsLoadingSelector(store, nodeId)
    )
  });

  console.log('Polycl Int Fap 0');
  if (isLoading || !indicators || !moDepartments || (!assistanceTypes && !medicalServices)) {
      return (<div><LinearProgress /></div>);
  }
  console.log('Polycl Int Fap 1');

  return (
        <OmsPlanTable 
          aria-label="Таблица распределения объемов и стоимости мед.помощи по ФАП(ФП) на начало года" 
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