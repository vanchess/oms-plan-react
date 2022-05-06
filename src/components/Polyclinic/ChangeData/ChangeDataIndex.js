import React, { useEffect, useLayoutEffect } from 'react';
import ChangeData  from  './ChangeData.js'

import { setTitle } from '../../../store/curPage/curPageStore'
import { 
    indicatorsUsedForNodeIdFetch, 
    medicalAssistanceTypesUsedForNodeIdFetch, 
    medicalServicesUsedForNodeIdFetch, 
    nodeIdSelected 
} from '../../../store/nodeData/nodeDataStore';

import { 
    indicatorIdsForNodeIdSelector, 
    medicalAssistanceTypesIdsForNodeIdSelector, 
    medicalServicesIdsForNodeIdSelector, 
    selectedNodeIdSelector, 
    selectedYearSelector 
} from '../../../store/nodeData/nodeDataSelectors';
import { indicatorChangeForNodeIdFetch } from '../../../store/plannedIndicatorChange/plannedIndicatorChangeStore.js';
import { LinearProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { moDepartmentFetch } from '../../../store/moDepartment/moDepartmentStore.js';

const title = 'Корректировки';

export default function ChangeDataIndex(props) {
    const dispatch = useDispatch();
    let { nodeId } = useParams();
    nodeId = Number(nodeId);
    const year = useSelector(selectedYearSelector);
    const selectedNodeId = useSelector(selectedNodeIdSelector);
    const indicatorIds = useSelector(store => indicatorIdsForNodeIdSelector(store, nodeId));
    const medicalAssistanceTypesIds = useSelector(store => medicalAssistanceTypesIdsForNodeIdSelector(store, nodeId));
    const medicalServicesIds = useSelector(store => medicalServicesIdsForNodeIdSelector(store, nodeId));

    useEffect(() => {
        dispatch(setTitle({title: title}));
    });

    useEffect(() => {
        dispatch(moDepartmentFetch([49,50]));
    }, [dispatch])

    useLayoutEffect(() => {
        if(selectedNodeId !== nodeId) {
            dispatch(nodeIdSelected({nodeId}))
        }
    }, [nodeId, dispatch]);

    useLayoutEffect(() => {
        dispatch(indicatorChangeForNodeIdFetch({nodeId, year}));
    }, [nodeId, year, dispatch]);

    useLayoutEffect(() => {
        if (!indicatorIds) {
            dispatch(indicatorsUsedForNodeIdFetch({nodeId}));
        }
    }, [nodeId, dispatch]);


    useLayoutEffect(() => {
        if (!medicalAssistanceTypesIds) {
            dispatch(medicalAssistanceTypesUsedForNodeIdFetch({nodeId}));
        }
        if (!medicalServicesIds) {
            dispatch(medicalServicesUsedForNodeIdFetch({nodeId}))
        }
    }, [nodeId, dispatch]);

    if(selectedNodeId !== nodeId) {
        return (<div><LinearProgress /></div>);
    }
    // console.log('CDI',selectedNodeId,nodeId);
    return (
        <ChangeData />
    )
}