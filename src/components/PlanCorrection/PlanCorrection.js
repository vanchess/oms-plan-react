/** @jsxImportSource @emotion/react */
import { Button, Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leafNodesSelector } from "../../store/category/categoryTreeSelector";
import { commissionDecisionSelector, editableCommissionDecisionIdSelector, selectedCommissionDecisionIdSelector } from "../../store/commissionDecision/CommissionDecisionSelector";
import { commissionDecisionIdEdit } from "../../store/commissionDecision/CommissionDecisionStore";
import { setTitle } from "../../store/curPage/curPageStore";
import { selectedYearSelector } from "../../store/nodeData/nodeDataSelectors";
import { careProfilesUsedForNodeIdFetch, hospitalBedProfilesUsedForNodeIdFetch, indicatorsUsedForNodeIdFetch } from "../../store/nodeData/nodeDataStore";
import { indicatorChangeForNodeIdsFetch } from "../../store/plannedIndicatorChange/plannedIndicatorChangeStore";
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

export default function PlanCorrection(props){
    const dispatch = useDispatch();
    const { rootNodeId } = props;
    const nodeIds = useSelector(store => leafNodesSelector(store, rootNodeId)); //[4,5,6,7];
    const year = useSelector(selectedYearSelector);
    const seletedCommissionDecisionId = useSelector(selectedCommissionDecisionIdSelector);
    const editableCommissionDecisionId = useSelector(editableCommissionDecisionIdSelector);
    const commissions = useSelector(commissionDecisionSelector);
    //const profiles = useSelector(store => hospitalBedProfilesArrForNodeIdSelector(store, nodeId));
    useEffect(() => {
        dispatch(setTitle({title: title}));
    });

    useLayoutEffect(() => {
        if (nodeIds && nodeIds.length && year) {
            console.log(nodeIds, year)
            dispatch(indicatorChangeForNodeIdsFetch({nodeIds, year}));
        }
    }, [nodeIds, year]);

    useLayoutEffect(() => {
        nodeIds.map(nodeId => {
            dispatch(indicatorsUsedForNodeIdFetch({nodeId}));
            dispatch(hospitalBedProfilesUsedForNodeIdFetch({nodeId}));
            dispatch(careProfilesUsedForNodeIdFetch({nodeId}));
        });
    }, [nodeIds]);

    const setEditableCommissionId = () => {
        dispatch(commissionDecisionIdEdit(seletedCommissionDecisionId));
    }
    
    return (
        <div>
        
        <Container maxWidth={false} css={container}>
            <Grid container spacing={3}>
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper css={paper}>
                    <ChangeDataTable rootNodeId={rootNodeId}/>
                    { (seletedCommissionDecisionId === editableCommissionDecisionId) 
                       ? <ChangeDataForm rootNodeId={rootNodeId}/>
                       : <div>Редактируется другой протокол. 
                            <div>
                            { seletedCommissionDecisionId ? 
                            <Button variant="text" onClick={setEditableCommissionId} >
                                Внести изменения в протокол №{commissions[seletedCommissionDecisionId]?.number}  от {commissions[seletedCommissionDecisionId]?.date}
                            </Button>
                            : null}
                            </div>
                         </div>
                    }
                </Paper>
            </Grid>
            </Grid>
        </Container>
        
        </div>
    )
}