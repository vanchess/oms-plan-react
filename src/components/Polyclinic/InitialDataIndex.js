import React, { useEffect, useLayoutEffect } from 'react';

import InitialData  from  './InitialData.js'

import { setTitle } from '../../store/curPage/curPageStore'

import { 
    indicatorIdsForNodeIdSelector,
    medicalAssistanceTypesIdsForNodeIdSelector,
    medicalServicesIdsForNodeIdSelector,
    selectedNodeIdSelector,
    selectedYearSelector 
} from '../../store/nodeData/nodeDataSelectors';
import { dataForNodeIdFetch } from '../../store/initialData/initialDataStore.js';
import { indicatorsUsedForNodeIdFetch, medicalAssistanceTypesUsedForNodeIdFetch, medicalServicesUsedForNodeIdFetch, nodeIdSelected } from '../../store/nodeData/nodeDataStore.js';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
import { moDepartmentFetch } from '../../store/moDepartment/moDepartmentStore.js';

const title = 'Данные на начало года';

export default function InitialDataIndex(props) {
    const dispatch = useDispatch();
    let { nodeId } = useParams();
    nodeId = Number(nodeId);
    const selectedNodeId = useSelector(selectedNodeIdSelector);
    const indicatorIds = useSelector(store => indicatorIdsForNodeIdSelector(store, nodeId));
    const medicalAssistanceTypesIds = useSelector(store => medicalAssistanceTypesIdsForNodeIdSelector(store, nodeId));
    const medicalServicesIds = useSelector(store => medicalServicesIdsForNodeIdSelector(store, nodeId));
    const year = useSelector(selectedYearSelector);

    useEffect(() => {
        dispatch(setTitle({title}));
    })

    useEffect(() => {
        dispatch(moDepartmentFetch([49,50]));
    }, [dispatch])

    useLayoutEffect(() => {
        if(selectedNodeId !== nodeId) {
            dispatch(nodeIdSelected({nodeId}))
        }
    }, [nodeId]);

    useLayoutEffect(() => {
        dispatch(dataForNodeIdFetch({nodeId, year}));
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

    return (
        <InitialData />
    )
}