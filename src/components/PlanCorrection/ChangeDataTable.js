import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { moArrSelector, moIdsSelector } from "../../store/mo/moSelectors";
import { indicatorsArrForNodeIdsSelector, selectedYearSelector } from "../../store/nodeData/nodeDataSelectors";
import { periodIdsByYearSelector } from "../../store/period/periodSelectors";
import { plannedIndicatorsArrByIdsSelector, plannedIndicatorsIdsByNodeIdsSelector } from "../../store/plannedIndicator/plannedIndicatorSelectors";
import { plannedIndicatorChangeByPackageIdSelector, plannedIndicatorChangeByPackageIdsSelector, totalValue } from "../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { categoryTreeByRootNodeIdSelector, categoryTreeNodesSelector, leafNodesSelector } from "../../store/category/categoryTreeSelector";
import { categorySelector } from "../../store/category/categorySelector";
import ChangeDataTableSection from "./ChangeDataTableSection";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { moDepartmentRequired } from "../../services/moDepartmentRequired";
import { moDepartmentsArrByMoIdFilter, moDepartmentsArrSelector } from "../../store/moDepartment/moDepartmentSelectors";
import { upperCaseFirst } from "../../_helpers/strings";
import { selectedCommissionDecisionIdSelector } from "../../store/commissionDecision/CommissionDecisionSelector";
import { changePackageIdsByCommissionDecisionIdSelector } from "../../store/changePackage/changePackageSelectors";

function moValues(plannedIndicatorChange, plannedIndicatorIds, periodIds, moIds, indicatorId, departmentsArr=null) {
    let result = {};
    moIds.forEach(moId => {
        const val = totalValue(plannedIndicatorChange, {plannedIndicatorIds, periodIds, moIds:[moId], indicatorId});
       // const byPeriods = 
        if (val !== null) {
            if (departmentsArr) {
                result[moId] = {value: val, department: {}};
                const moDepartmentIds = moDepartmentsArrByMoIdFilter(departmentsArr, moId).map(d => d.id);
                moDepartmentIds.forEach(departmentId => {
                    const val = totalValue(plannedIndicatorChange, {plannedIndicatorIds, periodIds, moIds:[moId], indicatorId, moDepartmentIds:[departmentId]});
                    if(val !== null) {
                        result[moId]['department'][departmentId] = {value: val};
                    }
                });
            } else {
                result[moId] = {value: val};
            }
        }
    });
    return result;
}

class NodeValues {
    #nodeValues;

    constructor() {
        this.#nodeValues = {};
    }

    add(nodeId, indicatorId, value) {
        if (!this.#nodeValues[nodeId]) {
            this.#nodeValues[nodeId] = { indicator:{} }
        }
        if (!this.#nodeValues[nodeId]['indicator'][indicatorId]) {
            this.#nodeValues[nodeId]['indicator'][indicatorId] = { value:value }
        } else {
            this.#nodeValues[nodeId]['indicator'][indicatorId]['value'] += value;
        }   
    }

    getValue(nodeId, indicatorId) {
        if (
            !this.#nodeValues[nodeId]
            || !this.#nodeValues[nodeId]['indicator'][indicatorId]
        ) {
            return null;
        }
        return this.#nodeValues[nodeId]['indicator'][indicatorId][value];
    }

    getDataByIndicatorId(indicatorId) {
        let result = {};
        
        Object.keys(this.#nodeValues).forEach(nodeId => {
            if (this.#nodeValues[nodeId]['indicator'][indicatorId]) {
                result[nodeId] = this.#nodeValues[nodeId]['indicator'][indicatorId]['value'];
            }
        })
        return result;
    }
}

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTable(props){
    const { rootNodeId } = props;
    const nodeIds = useSelector(store => leafNodesSelector(store, rootNodeId));
    const year = useSelector(selectedYearSelector);
    const commissionId = useSelector(selectedCommissionDecisionIdSelector);

    const periodIds = useSelector(store => periodIdsByYearSelector(store, year));

    const packageIds = useSelector(store => changePackageIdsByCommissionDecisionIdSelector(store, commissionId));

    const plannedIndicatorIds = useSelector(store => plannedIndicatorsIdsByNodeIdsSelector(store, nodeIds));
    const plannedIndicatorArr = useSelector(store => plannedIndicatorsArrByIdsSelector(store, plannedIndicatorIds));
    const plannedIndicatorChange = useSelector(store => plannedIndicatorChangeByPackageIdsSelector(store, {plannedIndicatorIds, periodIds, packageIds}));

    const indicators = useSelector(store => indicatorsArrForNodeIdsSelector(store, nodeIds));
    const tree = useSelector(store => categoryTreeByRootNodeIdSelector(store, rootNodeId));
    const treeNodes = useSelector(categoryTreeNodesSelector);
    const category = useSelector(categorySelector);

    let data = {indicator: {}};

    const mo = useSelector(moArrSelector);
    const moIds = useSelector(moIdsSelector);
    const moDepartmentsArr = useSelector(moDepartmentsArrSelector);

    indicators.forEach(indicator => {
        const piArrByIndicator = plannedIndicatorArr.filter(pi => pi.indicator_id === indicator.id);
        const piIdsByIndicator = piArrByIndicator.map(pi => pi.id);
        const indicatorVal = totalValue(plannedIndicatorChange, {plannedIndicatorIds:piIdsByIndicator, periodIds, moIds, indicatorId:indicator.id});
        if (indicatorVal === null) {
            return;
        }
        data['indicator'][indicator.id] = {value:indicatorVal, node:{}};

        nodeIds.forEach(nodeId => {
            const departmentRequired = moDepartmentRequired(nodeId);
            const piArrByIndicatorAndNode = piArrByIndicator.filter(pi => pi.node_id === nodeId);
            const piIdsByIndicatorAndNode = piArrByIndicatorAndNode.map(pi => pi.id);

            const nodeVal = totalValue(plannedIndicatorChange, {plannedIndicatorIds:piIdsByIndicatorAndNode, periodIds, moIds, indicatorId:indicator.id});
            if (nodeVal === null) {
                return;
            }
            data['indicator'][indicator.id]['node'][nodeId] = {value:nodeVal};
            

            const serviceIds = {};
            const bedProfileIds = {};
            const assistanceTypeIds = {};
            const careProfileIds = {};
            piArrByIndicatorAndNode.forEach(pi => {
                if (pi.service_id) { serviceIds[pi.service_id] = pi.service_id; }
                if (pi.profile_id) { bedProfileIds[pi.profile_id] = pi.profile_id; }
                if (pi.assistance_type_id) { assistanceTypeIds[pi.assistance_type_id] = pi.assistance_type_id; }
                if (pi.care_profile_id) { careProfileIds[pi.care_profile_id] = pi.care_profile_id; }
            })
            if (Object.keys(serviceIds).length) {
                data['indicator'][indicator.id]['node'][nodeId]['service'] = {};
            }
            if (Object.keys(bedProfileIds).length) {
                data['indicator'][indicator.id]['node'][nodeId]['bedProfile'] = {};
            }
            if (Object.keys(assistanceTypeIds).length) {
                data['indicator'][indicator.id]['node'][nodeId]['assistanceType'] = {};
            }
            if (Object.keys(careProfileIds).length) {
                data['indicator'][indicator.id]['node'][nodeId]['careProfile'] = {};
            }

            Object.values(serviceIds).forEach( serviceId => {
                const piArrByIndicatorAndNodeAndService = piArrByIndicatorAndNode.filter(pi => pi.service_id === serviceId);
                const piIdsByIndicatorAndNodeAndService = piArrByIndicatorAndNodeAndService.map(pi => pi.id);
                const serviceVal = totalValue(plannedIndicatorChange, {plannedIndicatorIds:piIdsByIndicatorAndNodeAndService, periodIds, moIds, indicatorId:indicator.id});
                if (serviceVal !== null) {
                    const moVal = moValues(plannedIndicatorChange, piIdsByIndicatorAndNodeAndService, periodIds, moIds, indicator.id, (departmentRequired?moDepartmentsArr:null));
                    data['indicator'][indicator.id]['node'][nodeId]['service'][serviceId] = {value:serviceVal, mo:moVal};
                }

            });
            Object.values(bedProfileIds).forEach( bedProfileId => {
                const piArrByIndicatorAndNodeAndBedProfile = piArrByIndicatorAndNode.filter(pi => pi.profile_id === bedProfileId);
                const piIdsByIndicatorAndNodeAndBedProfile = piArrByIndicatorAndNodeAndBedProfile.map(pi => pi.id);
                const bedProfileVal = totalValue(plannedIndicatorChange, {plannedIndicatorIds:piIdsByIndicatorAndNodeAndBedProfile, periodIds, moIds, indicatorId:indicator.id});
                if (bedProfileVal !== null) {
                    const moVal = moValues(plannedIndicatorChange, piIdsByIndicatorAndNodeAndBedProfile, periodIds, moIds, indicator.id, (departmentRequired?moDepartmentsArr:null));
                    if (bedProfileVal !== 0 || Object.keys(moVal).length > 0) {
                        data['indicator'][indicator.id]['node'][nodeId]['bedProfile'][bedProfileId] = {value:bedProfileVal, mo:moVal};
                    }
                }
            });
            Object.values(assistanceTypeIds).forEach( assistanceTypeId => {
                const piArrByIndicatorAndNodeAndAssistanceType = piArrByIndicatorAndNode.filter(pi => pi.assistance_type_id === assistanceTypeId);
                const piIdsByIndicatorAndNodeAndAssistanceType = piArrByIndicatorAndNodeAndAssistanceType.map(pi => pi.id);
                const assistanceTypeVal = totalValue(plannedIndicatorChange, {plannedIndicatorIds:piIdsByIndicatorAndNodeAndAssistanceType, periodIds, moIds, indicatorId:indicator.id});
                if (assistanceTypeVal !== null) {
                    const moVal = moValues(plannedIndicatorChange, piIdsByIndicatorAndNodeAndAssistanceType, periodIds, moIds, indicator.id, (departmentRequired?moDepartmentsArr:null));
                    data['indicator'][indicator.id]['node'][nodeId]['assistanceType'][assistanceTypeId] = {value:assistanceTypeVal, mo:moVal};
                }
            });
            Object.values(careProfileIds).forEach( careProfileId => {
                const piArrByIndicatorAndNodeAndCareProfile = piArrByIndicatorAndNode.filter(pi => pi.care_profile_id === careProfileId);
                const piIdsByIndicatorAndNodeAndCareProfile = piArrByIndicatorAndNodeAndCareProfile.map(pi => pi.id);
                const careProfileVal = totalValue(plannedIndicatorChange, {plannedIndicatorIds:piIdsByIndicatorAndNodeAndCareProfile, periodIds, moIds, indicatorId:indicator.id});
                if (careProfileVal !== null) {
                    data['indicator'][indicator.id]['node'][nodeId]['careProfile'][careProfileId] = {value:careProfileVal, vmpGroup:{}};
                    
                    let vmpGroupIds = {};
                    piArrByIndicatorAndNodeAndCareProfile.forEach(pi => {
                        if (pi.vmp_group_id) { vmpGroupIds[pi.vmp_group_id] = pi.vmp_group_id; }
                    });
                    Object.values(vmpGroupIds).forEach(groupId => {
                        const piArrByIndicatorAndNodeAndCareProfileAndVmpGroup = piArrByIndicatorAndNodeAndCareProfile.filter(pi => pi.vmp_group_id === groupId);
                        const piIdsByIndicatorAndNodeAndCareProfileAndVmpGroup = piArrByIndicatorAndNodeAndCareProfileAndVmpGroup.map(pi => pi.id);

                        const vmpGroupValue = totalValue(plannedIndicatorChange, {plannedIndicatorIds:piIdsByIndicatorAndNodeAndCareProfileAndVmpGroup, periodIds, moIds, indicatorId:indicator.id});
                        if (vmpGroupValue !== null) {
                            data['indicator'][indicator.id]['node'][nodeId]['careProfile'][careProfileId]['vmpGroup'][groupId] = {value:vmpGroupValue, vmpType:{}};

                            let vmpTypeIds = {};
                            piArrByIndicatorAndNodeAndCareProfileAndVmpGroup.forEach(pi => {
                                if (pi.vmp_type_id) { vmpTypeIds[pi.vmp_type_id] = pi.vmp_type_id; }
                            })

                            Object.values(vmpTypeIds).forEach(typeId => {
                                const piArrByIndicatorAndNodeAndCareProfileAndVmpGroupType = piArrByIndicatorAndNodeAndCareProfileAndVmpGroup.filter(pi => pi.vmp_type_id === typeId);
                                const piIdsByIndicatorAndNodeAndCareProfileAndVmpGroupType = piArrByIndicatorAndNodeAndCareProfileAndVmpGroupType.map(pi => pi.id)

                                const vmpTypeValue = totalValue(plannedIndicatorChange, {plannedIndicatorIds:piIdsByIndicatorAndNodeAndCareProfileAndVmpGroupType, periodIds, moIds, indicatorId:indicator.id});
                                if (vmpTypeValue !== null) {
                                    const moVal = moValues(plannedIndicatorChange, piIdsByIndicatorAndNodeAndCareProfileAndVmpGroupType, periodIds, moIds, indicator.id, (departmentRequired?moDepartmentsArr:null));
                                    data['indicator'][indicator.id]['node'][nodeId]['careProfile'][careProfileId]['vmpGroup'][groupId]['vmpType'][typeId] = {value: vmpTypeValue, mo: moVal};
                                }
                            })
                            
                        }
                    })
                }
            });
        })
    })

    let nodeValues = new NodeValues();
    indicators.forEach(indicator => {
        if (!data['indicator'][indicator.id]) {
            return;
        }
        nodeIds.forEach(nodeId => {
            if (
                !data['indicator'][indicator.id]['node'][nodeId]
                || (!data['indicator'][indicator.id]['node'][nodeId]['service']
                && !data['indicator'][indicator.id]['node'][nodeId]['bedProfile']
                && !data['indicator'][indicator.id]['node'][nodeId]['assistanceType']
                && !data['indicator'][indicator.id]['node'][nodeId]['careProfile'])
            ) {
                return;
            }
            const nodeVal = data['indicator'][indicator.id]['node'][nodeId]['value'];
            if (nodeVal !== null) {

                nodeValues.add(nodeId, indicator.id, nodeVal);
                const node = treeNodes[nodeId];
                let nodeParentId = node.parent_id;
                while (nodeParentId) {
                    nodeValues.add(nodeParentId, indicator.id, nodeVal);
                    nodeParentId = treeNodes[nodeParentId].parent_id;
                }
            }
        });
    });

    const AccordionSummaryStyled = styled(AccordionSummary)`
        background-color:rgba(0, 0, 0, .03);
    `;

    return (
        <div>
            { indicators && indicators.map( indicator => {
                if (data['indicator'][indicator.id]) {
                    const indicatorData = data['indicator'][indicator.id];
                    return (
                        <Accordion key={indicator.id}>
                            <AccordionSummaryStyled expandIcon={<ExpandMoreIcon />} >
                                <Typography sx={{ width: '33%', flexShrink: 0 }}>{ upperCaseFirst(indicator.name) }</Typography>
                                <Typography sx={{ color: 'text.secondary' }}>{indicatorData.value>0?'+':''}{ twoDecimal.format(indicatorData.value) }</Typography>
                            </AccordionSummaryStyled>
                            <AccordionDetails>
                                <ChangeDataTableSection tree={tree} nodeValues={nodeValues.getDataByIndicatorId(indicator.id)} data={indicatorData} />
                            </AccordionDetails>
                        </Accordion>
                    )
                }
            })}
        </div>
    )
}