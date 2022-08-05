/** @jsxImportSource @emotion/react */
import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTitle } from "../../../store/curPage/curPageStore";
import { hospitalBedProfilesArrForNodeIdSelector, indicatorsArrForNodeIdSelector, selectedYearSelector } from "../../../store/nodeData/nodeDataSelectors";
import { careProfilesUsedForNodeIdFetch, hospitalBedProfilesUsedForNodeIdFetch, indicatorsUsedForNodeIdFetch } from "../../../store/nodeData/nodeDataStore";
import { periodIdsByYearSelector } from "../../../store/period/periodSelectors";
import { plannedIndicatorsIdsByNodeIds } from "../../../store/plannedIndicator/plannedIndicatorSelectors";
import { plannedIndicatorChangeByCommitIdSelector } from "../../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors";
import { indicatorChangeForNodeIdFetch } from "../../../store/plannedIndicatorChange/plannedIndicatorChangeStore";
import ChangeDataForm from "./ChangeDataForm";
import ChangeDataTable from './ChangeDataTable'

const title = 'Корректировки';

const paper = theme => ({
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  });

const container = theme => ({
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
})

export default function ChangeDataList(props){
    const dispatch = useDispatch();
    const nodeIds = [4,5,6,7];
    const year = useSelector(selectedYearSelector);
    //const profiles = useSelector(store => hospitalBedProfilesArrForNodeIdSelector(store, nodeId));
    //const indicators = useSelector(store => indicatorsArrForNodeIdSelector(store, nodeId));
    
    useEffect(() => {
        dispatch(setTitle({title: title}));
    });

    useLayoutEffect(() => {
        nodeIds.map(nodeId => {
            dispatch(indicatorChangeForNodeIdFetch({nodeId, year}));
        });
        
    }, [nodeIds, year]);

    useLayoutEffect(() => {
        nodeIds.map(nodeId => {
           // if (!indicatorIds) {
                dispatch(indicatorsUsedForNodeIdFetch({nodeId}));
           // }
           // if (!hospitalBedProfilesIds) {
                dispatch(hospitalBedProfilesUsedForNodeIdFetch({nodeId}));
           // }
           // if (!careProfilesIds) {
                dispatch(careProfilesUsedForNodeIdFetch({nodeId}));
           // }
        });
    }, [nodeIds]);
    
    return (
        <div>
        
        <Container maxWidth={false} css={container}>
            <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper css={paper}>
                    <ChangeDataTable nodeIds={nodeIds}/>
                    <ChangeDataForm nodeIds={nodeIds}/>
                </Paper>
            </Grid>
            </Grid>
        </Container>
        
        </div>
    )
}