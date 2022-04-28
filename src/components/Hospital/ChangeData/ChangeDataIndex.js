import React, { useEffect, useLayoutEffect } from 'react';
import ChangeData  from  './ChangeData.js'

import { useDispatch, useSelector } from 'react-redux';
import { setTitle } from '../../../store/curPage/curPageStore'
import { careProfilesUsedForNodeIdFetch, hospitalBedProfilesUsedForNodeIdFetch, indicatorsUsedForNodeIdFetch, nodeIdSelected } from '../../../store/nodeData/nodeDataStore';

import { careProfilesIdsForNodeIdSelector, hospitalBedProfilesIdsForNodeIdSelector, indicatorIdsForNodeIdSelector, selectedNodeIdSelector, selectedYearSelector } from '../../../store/nodeData/nodeDataSelectors';
import { useParams } from 'react-router-dom';
import { LinearProgress } from '@material-ui/core';
import { indicatorChangeForNodeIdFetch } from '../../../store/plannedIndicatorChange/plannedIndicatorChangeStore.js';

const title = 'Корректировки';

export default function ChangeDataIndex(props) {
    const dispatch = useDispatch();
    let { nodeId } = useParams();
    nodeId = Number(nodeId);
    const year = useSelector(selectedYearSelector);
    const selectedNodeId = useSelector(selectedNodeIdSelector);
    const indicatorIds = useSelector(store => indicatorIdsForNodeIdSelector(store, nodeId));
    const hospitalBedProfilesIds = useSelector(store => hospitalBedProfilesIdsForNodeIdSelector(store, nodeId));
    const careProfilesIds = useSelector(store => careProfilesIdsForNodeIdSelector(store, nodeId));

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
            if (!hospitalBedProfilesIds) {
                dispatch(hospitalBedProfilesUsedForNodeIdFetch({nodeId}));
            }
            if (!careProfilesIds) {
                dispatch(careProfilesUsedForNodeIdFetch({nodeId}));
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