import React, { useEffect, useLayoutEffect } from 'react';

import InitialData  from  './InitialData.js'

import { setTitle } from '../../store/curPage/curPageStore'
import { indicatorsUsedForNodeIdFetch, nodeIdSelected, medicalAssistanceTypesUsedForNodeIdFetch } from '../../store/nodeData/nodeDataStore';

import { indicatorIdsForNodeIdSelector, medicalAssistanceTypesIdsForNodeIdSelector, selectedNodeIdSelector, selectedYearSelector } from '../../store/nodeData/nodeDataSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dataForNodeIdFetch } from '../../store/initialData/initialDataStore.js';
import { LinearProgress } from '@material-ui/core';

const title = 'Данные на начало года';

export default function InitialDataIndex(props) {
    const dispatch = useDispatch();
    let { nodeId } = useParams();
    nodeId = Number(nodeId);
    const selectedNodeId = useSelector(selectedNodeIdSelector);
    const indicatorIds = useSelector(store => indicatorIdsForNodeIdSelector(store, nodeId));
    const medicalAssistanceIds = useSelector(store => medicalAssistanceTypesIdsForNodeIdSelector(store, nodeId));
    const year = useSelector(selectedYearSelector);

    useEffect(() => {
        dispatch(setTitle({title}));
    })

    useLayoutEffect(() => {
        if(selectedNodeId !== nodeId) {
            dispatch(nodeIdSelected({nodeId}))
        }
    }, [nodeId]);

    useLayoutEffect(() => {
        dispatch(dataForNodeIdFetch({nodeId, year}));
    }, [nodeId, year]);

    useLayoutEffect(() => {
        if (!indicatorIds) {
            dispatch(indicatorsUsedForNodeIdFetch({nodeId}));
        }
    }, [nodeId]);


    useLayoutEffect(() => {
        if (!medicalAssistanceIds) {
            dispatch(medicalAssistanceTypesUsedForNodeIdFetch({nodeId}));
        }
    }, [nodeId]);

    if(selectedNodeId !== nodeId) {
        return (<div><LinearProgress /></div>);
    }

    return (
        <InitialData />
    )
}