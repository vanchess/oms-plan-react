import React, { useLayoutEffect } from 'react';

import RootPrivateRoutes from './routes/RootPrivateRoutes'

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
import { medicalAssistanceTypesIsLoadingSelector } from './store/medicalAssistanceType/medicalAssistenceTypeSelectors';
import { careProfilesForNodeIsLoadingSelector } from './store/nodeData/nodeDataSelectors';
import { vmpGroupsSelectorIsLoadingSelector } from './store/vmpGroups/vmpGroupsSelectors';
import { vmpTypesIsLoadingSelector } from './store/vmpTypes/vmpTypesSelectors';
import { periodIsLoadingSelector } from './store/period/periodSelectors';
import { LinearProgress } from '@mui/material';
import { categoryFetch } from './store/category/categoryStore';
import { categoryIsLoadingSelector } from './store/category/categorySelector';
import { categoryTreeFetch } from './store/category/categoryTreeStore';
import { categoryTreeNodesFetch } from './store/category/categoryTreeNodesStore';

export default function AppRoot() {
  const dispatch = useDispatch();

  const initBegin = useSelector(appInitBeginSelector);
  
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
    )
  });
 
  useLayoutEffect(() => {
    dispatch(moFetch(0, -1));
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

    dispatch(appInitBegin());
  }, [dispatch])

  if (!initBegin || loading) {
    return (
      <LinearProgress />
    );
  }

  return (
    <RootPrivateRoutes />
  );
}