import React from "react";
import { useSelector } from "react-redux";
import { moArrSelector } from "../../../store/mo/moSelectors";
import { selectedYearSelector } from "../../../store/nodeData/nodeDataSelectors";
import { periodIdsByYearSelector } from "../../../store/period/periodSelectors";
import { plannedIndicatorsIdsByNodeIds } from "../../../store/plannedIndicator/plannedIndicatorSelectors";
import { plannedIndicatorChangeByCommitIdSelector } from "../../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors";

export default function ChangeDataTable(props){
    const { nodeIds } = props;
    const year = useSelector(selectedYearSelector);
    const periodIds = useSelector(store => periodIdsByYearSelector(store, year));
    const plannedIndicatorIds = useSelector(store => plannedIndicatorsIdsByNodeIds(store, nodeIds));
    const plannedIndicatorChange = useSelector(store => plannedIndicatorChangeByCommitIdSelector(store, {plannedIndicatorIds, periodIds, commitId:null}));

    const mo = useSelector(moArrSelector);

    return (
        <div>
            { plannedIndicatorChange && plannedIndicatorChange.map( p => { console.log(p) }) }
            123
        </div>
    )
}