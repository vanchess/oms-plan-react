import React, { useEffect, useLayoutEffect } from 'react';

import InitialData  from  './InitialData.js'

import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../store/curPage/curPageStore'
import { indicatorsUsedForNodeIdFetch, nodeIdSelected, hospitalBedProfilesUsedForNodeIdFetch, careProfilesUsedForNodeIdFetch } from '../../store/nodeData/nodeDataStore';

import { careProfilesIdsForNodeIdSelector, hospitalBedProfilesIdsForNodeIdSelector, indicatorIdsForNodeIdSelector, selectedNodeIdSelector, selectedYearSelector } from '../../store/nodeData/nodeDataSelectors';
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
    const hospitalBedProfilesIds = useSelector(store => hospitalBedProfilesIdsForNodeIdSelector(store, nodeId));
    const careProfileIds = useSelector(store => careProfilesIdsForNodeIdSelector(store, nodeId));
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
        if (!hospitalBedProfilesIds) {
            dispatch(hospitalBedProfilesUsedForNodeIdFetch({nodeId}));
        }
        if (!careProfileIds) {
            dispatch(careProfilesUsedForNodeIdFetch({nodeId}))
        }
    }, [nodeId]);

    if(selectedNodeId !== nodeId) {
        return (<div><LinearProgress /></div>);
    }

    return (
        <InitialData />
    )
}