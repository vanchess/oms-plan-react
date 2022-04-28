import React, { useEffect, useLayoutEffect } from 'react';
import ChangeData  from  './ChangeData.js'

import { setTitle } from '../../../store/curPage/curPageStore'
import { indicatorsUsedForNodeIdFetch, medicalAssistanceTypesUsedForNodeIdFetch, nodeIdSelected } from '../../../store/nodeData/nodeDataStore';

import { indicatorIdsForNodeIdSelector, medicalAssistanceTypesIdsForNodeIdSelector, selectedNodeIdSelector, selectedYearSelector } from '../../../store/nodeData/nodeDataSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { indicatorChangeForNodeIdFetch } from '../../../store/plannedIndicatorChange/plannedIndicatorChangeStore.js';
import { LinearProgress } from '@material-ui/core';

const title = 'Данные на начало года';

export default function ChangeDataIndex(props) {
    const dispatch = useDispatch();
    let { nodeId } = useParams();
    nodeId = Number(nodeId);
    const year = useSelector(selectedYearSelector);
    const selectedNodeId = useSelector(selectedNodeIdSelector);
    const indicatorIds = useSelector(store => indicatorIdsForNodeIdSelector(store, nodeId));
    const medicalAssistanceIds = useSelector(store => medicalAssistanceTypesIdsForNodeIdSelector(store, nodeId));

    useEffect(() => {
        dispatch(setTitle({title: title}));
    });

    useLayoutEffect(() => {
        if(selectedNodeId !== nodeId) {
            dispatch(nodeIdSelected({nodeId}))
        }
    }, [nodeId]);

    useLayoutEffect(() => {
        dispatch(indicatorChangeForNodeIdFetch({nodeId, year}));
    }, [nodeId, year]);

    useLayoutEffect(() => {
        if (nodeId) {
            if (!indicatorIds) {
                dispatch(indicatorsUsedForNodeIdFetch({nodeId}));
            }
            if (!medicalAssistanceIds) {
                dispatch(medicalAssistanceTypesUsedForNodeIdFetch({nodeId}));
            }
        }
    }, [nodeId]);

    if(selectedNodeId !== nodeId) {
        return (<div><LinearProgress /></div>);
    }
    // console.log('CDI',selectedNodeId,nodeId);
    return (
        <ChangeData />
    )
}