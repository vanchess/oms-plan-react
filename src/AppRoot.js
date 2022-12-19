import React, { useLayoutEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { moFetch } from './store/mo/moAction'
import { hospitalBedProfilesFetch } from './store/hospitalBedProfiles/hospitalBedProfilesStore'
import { careProfilesFetch } from './store/careProfiles/careProfilesStore'
import { medicalServicesFetch } from './store/medicalServices/medicalServicesStore'
import { medicalAssistanceTypeFetch } from './store/medicalAssistanceType/medicalAssistanceTypeStore'
import { indicatorsFetch } from './store/indicator/indicatorStore'
import { plannedIndicatorsFetch } from './store/plannedIndicator/plannedIndicatorStore'
import { vmpGroupsFetch } from './store/vmpGroups/vmpGroupsStore';
import { vmpTypesFetch } from './store/vmpTypes/vmpTypesStore';
import { periodFetch } from './store/period/periodStore';
import { appInitBegin } from './store/app/appStore';
import { appInitBeginSelector } from './store/app/appSelectors';
import { moIsLoadingSelector } from './store/mo/moSelectors';
import { hospitalBedProfilesIsLoadingSelector } from './store/hospitalBedProfiles/hospitalBedProfilesSelectors';
import { indicatorsIsLoadingSelector } from './store/indicator/indicatorSelectors';
import { plannedIndicatorsIsLoadingSelector } from './store/plannedIndicator/plannedIndicatorSelectors';
import { medicalServicesIsLoadingSelector } from './store/medicalServices/medicalServicesSelectors';
import { medicalAssistanceTypesIsLoadingSelector } from './store/medicalAssistanceType/medicalAssistanceTypeSelectors';
import { careProfilesForNodeIsLoadingSelector, selectedYearSelector, сurrentlyUsedDateSelector } from './store/nodeData/nodeDataSelectors';
import { vmpGroupsSelectorIsLoadingSelector } from './store/vmpGroups/vmpGroupsSelectors';
import { vmpTypesIsLoadingSelector } from './store/vmpTypes/vmpTypesSelectors';
import { periodIsLoadingSelector } from './store/period/periodSelectors';
import { LinearProgress } from '@mui/material';
import { categoryFetch } from './store/category/categoryStore';
import { categoryIsLoadingSelector } from './store/category/categorySelector';
import { categoryTreeFetch } from './store/category/categoryTreeStore';
import { categoryTreeNodesFetch } from './store/category/categoryTreeNodesStore';
import { loadedNodeIdsFetch } from './store/initialData/initialDataStore';
import { categoryTreeNodesIsLoadingSelector } from './store/category/categoryTreeSelector';
import Home from './Home';
import { commissionDecisionFetch } from './store/commissionDecision/CommissionDecisionStore';
import { changePackageFetch } from './store/changePackage/changePackageStore';

export default function AppRoot() {
  const dispatch = useDispatch();

  const initBegin = useSelector(appInitBeginSelector);
  const year = useSelector(selectedYearSelector);
  const currentlyUsedDate = useSelector(сurrentlyUsedDateSelector);

  const loading = useSelector((store) => {
    return (
      moIsLoadingSelector(store)
      || hospitalBedProfilesIsLoadingSelector(store)
      || indicatorsIsLoadingSelector(store)
      || plannedIndicatorsIsLoadingSelector(store)
      || medicalServicesIsLoadingSelector(store)
      || medicalAssistanceTypesIsLoadingSelector(store)
      || careProfilesForNodeIsLoadingSelector(store)
      || vmpGroupsSelectorIsLoadingSelector(store)
      || vmpTypesIsLoadingSelector(store)
      || periodIsLoadingSelector(store)
      || categoryIsLoadingSelector(store)
      || categoryTreeNodesIsLoadingSelector(store)
    )
  });
 
  useLayoutEffect(() => {
    
    dispatch(hospitalBedProfilesFetch());
    dispatch(indicatorsFetch());
    dispatch(plannedIndicatorsFetch());
    dispatch(medicalServicesFetch());
    dispatch(medicalAssistanceTypeFetch());
    dispatch(careProfilesFetch());
    dispatch(vmpGroupsFetch());
    dispatch(vmpTypesFetch());
    dispatch(periodFetch());
    dispatch(categoryFetch());
    dispatch(categoryTreeFetch({nodeId:1}));
    dispatch(categoryTreeFetch({nodeId:9}));
    dispatch(categoryTreeFetch({nodeId:17}));
    dispatch(categoryTreeNodesFetch());

    dispatch(changePackageFetch());

    dispatch(appInitBegin());
  }, [dispatch])

  useLayoutEffect(() => {
    dispatch(loadedNodeIdsFetch({year}));
    dispatch(commissionDecisionFetch({year}));
  }, [year, dispatch])

  useLayoutEffect(() => {
    dispatch(moFetch(currentlyUsedDate));
  }, [currentlyUsedDate, dispatch])

  if (!initBegin || loading) {
    return (
      <LinearProgress />
    );
  }

  return (
    <Home />
  );
}