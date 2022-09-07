import { Grid, Paper } from "@mui/material";
import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moDepartmentRequired } from "../../services/moDepartmentRequired";
import { moIdsSelector } from "../../store/mo/moSelectors";
import { indicatorChangeIncrementValues } from "../../store/plannedIndicatorChange/plannedIndicatorChangeStore";
import CategoryNodeSelect from "./CategoryNodeSelect";
import MoDepartmentSelect from "./MoDepartmentSelect";
import MoSelect from "./MoSelect";
import PlannedIndicatorSelect from "./PlannedIndicatorSelect";
import ValueInput from "./ValueInput";

export default function ChangeDataForm(props){
    const { rootNodeId } = props;

    const dispatch = useDispatch();
    const [nodeId, setNodeId] = useState(rootNodeId);
    const [plannedIndicatorId, setPlannedIndicatorId] = useState(null);
    const [moId, setMoId] = useState(null);
    const [moDepartmentId, setMoDepartmentId] = useState(null);
    const moIds = useSelector(moIdsSelector);
    const departmentRequired = moDepartmentRequired(nodeId);

    const handleChange = (nodeId) => {
        setNodeId(Number(nodeId));
    }

    const handleSave = ({total, values}) => {
        const dataArray = values
            .filter(valObj => valObj.value !== '0')
            .map(valObj => {
                return {...valObj, plannedIndicatorId, moId, moDepartmentId:(moDepartmentId ?? undefined)};
            });
        dispatch(indicatorChangeIncrementValues({total, values:dataArray}))
    }

    return (
        <Paper>
            <Grid container spacing={0}>
                <Grid item xs={2}>
                    <CategoryNodeSelect rootNodeId={rootNodeId} onChange={handleChange} />
                </Grid>
                <Grid item xs={4}>
                    <MoSelect moIds={moIds} onChange={setMoId}/>
                    { (moId && departmentRequired) ?
                        <MoDepartmentSelect moId={moId} onChange={setMoDepartmentId} />
                    :null}
                    <PlannedIndicatorSelect nodeId={nodeId} onChange={setPlannedIndicatorId} />
                    
                </Grid>
                <Grid item xs={6}>
                    <ValueInput saveValue={handleSave} plannedIndicatorId={plannedIndicatorId} disabled={!plannedIndicatorId || !moId || (departmentRequired && !moDepartmentId)} />
                </Grid>
            </Grid>
        </Paper>
    )
}