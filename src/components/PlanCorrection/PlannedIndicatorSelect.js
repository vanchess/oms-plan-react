import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getPlannedIndicator, plannedIndicatorsArrByIdsSelector, plannedIndicatorsIdsByNodeIdsSelector } from '../../store/plannedIndicator/plannedIndicatorSelectors';
import BedProfileSelect from './BedProfileSelect';
import CareProfileSelect from './CareProfileSelect';
import IndicatorSelect from './IndicatorSelect';
import MedicalAssistanceTypeSelect from './MedicalAssistanceTypeSelect';
import MedicalServiceSelect from './MedicalServiceSelect';
import VmpGroupSelect from './VmpGroupSelect';
import VmpTypeSelect from './VmpTypeSelect';

export default function PlannedIndicatorSelect(props) {
    const { nodeId, onChange } = props;
    const [serviceId, setServiceId] = useState(null);
    const [bedProfileId, setBedProfileId] = useState(null);
    const [assistanceTypeId, setAssistanceTypeId] = useState(null);
    const [careProfileId, setCareProfileId] = useState(null);
    const [vmpGroupId, setVmpGroupId] = useState(null);
    const [vmpTypeId, setVmpTypeId] = useState(null);
    const [indicatorId, setIndicatorId] = useState(null);

    const plannedIndicatorIds = useSelector(store => plannedIndicatorsIdsByNodeIdsSelector(store, [nodeId]));
    const plannedIndicatorArr = useSelector(store => plannedIndicatorsArrByIdsSelector(store, plannedIndicatorIds));

    useEffect(() => {
        if (!plannedIndicatorArr) {
            return;
        }
        const pi = plannedIndicatorArr.reduce((prev, cur) => {
            prev[cur.id] = cur;
            return prev;
        },{});

        const plannedIndicatorId = getPlannedIndicator(pi, {nodeId, serviceId, profileId:bedProfileId, assistanceTypeId, careProfileId, vmpGroupId, vmpTypeId, indicatorId});
        onChange(plannedIndicatorId);
        
        // console.log('serviceId, bedProfileId, assistanceTypeId, careProfileId, vmpGroupId, vmpTypeId indicatorId', serviceId, bedProfileId, assistanceTypeId, careProfileId, vmpGroupId, vmpTypeId, indicatorId)
    },[nodeId, serviceId, bedProfileId, assistanceTypeId, careProfileId, vmpGroupId, vmpTypeId, indicatorId, plannedIndicatorArr])

    const serviceIdsObj = {};
    const bedProfileIdsObj = {};
    const assistanceTypeIdsObj = {};
    const careProfileIdsObj = {};
    const vmpGroupIdsObj = {};
    const vmpTypeIdsObj = {};
    const indicatorIdsObj = {};

    plannedIndicatorArr.forEach(pi => {
        if (pi.service_id) { serviceIdsObj[pi.service_id] = pi.service_id; }
        if (pi.profile_id) { bedProfileIdsObj[pi.profile_id] = pi.profile_id; }
        if (pi.assistance_type_id) { assistanceTypeIdsObj[pi.assistance_type_id] = pi.assistance_type_id; }
        if (pi.care_profile_id) { careProfileIdsObj[pi.care_profile_id] = pi.care_profile_id; }
        if (careProfileId && pi.care_profile_id === careProfileId) {
            vmpGroupIdsObj[pi.vmp_group_id] = pi.vmp_group_id;
            if (vmpGroupId && pi.vmp_group_id === vmpGroupId) {
                vmpTypeIdsObj[pi.vmp_type_id] = pi.vmp_type_id;
            }
        }
        if (
            pi.service_id === serviceId
            && pi.profile_id === bedProfileId
            && pi.assistance_type_id === assistanceTypeId
            && pi.care_profile_id === careProfileId
            && pi.vmp_group_id === vmpGroupId
            && pi.vmp_type_id === vmpTypeId
        ) {
            indicatorIdsObj[pi.indicator_id] = pi.indicator_id;
        }
    })

    const serviceIds = Object.keys(serviceIdsObj);
    const bedProfileIds = Object.keys(bedProfileIdsObj);
    const assistanceTypeIds = Object.keys(assistanceTypeIdsObj);
    const careProfileIds = Object.keys(careProfileIdsObj);
    const vmpGroupIds = Object.keys(vmpGroupIdsObj);
    const vmpTypeIds = Object.keys(vmpTypeIdsObj);
    const indicatorIds = Object.keys(indicatorIdsObj);

    return (
        <React.Fragment>
            { serviceIds.length ? 
                <MedicalServiceSelect onChange={setServiceId} serviceIds={serviceIds} />
            :null}
            { bedProfileIds.length ? 
                <BedProfileSelect onChange={setBedProfileId} profileIds={bedProfileIds} />
            :null}
            { assistanceTypeIds.length ? 
                <MedicalAssistanceTypeSelect onChange={setAssistanceTypeId} typeIds={assistanceTypeIds} />
            :null}
            { careProfileIds.length ? 
                <React.Fragment>
                    <CareProfileSelect onChange={setCareProfileId} profileIds={careProfileIds} />
                    { vmpGroupIds.length ?
                        <VmpGroupSelect onChange={setVmpGroupId} groupIds={vmpGroupIds} />
                    :null}
                    { vmpTypeIds.length ?
                        <VmpTypeSelect onChange={setVmpTypeId} typeIds={vmpTypeIds} />
                    :null}
                </React.Fragment>
            :null}
            { indicatorIds.length ? 
                <IndicatorSelect onChange={setIndicatorId} indicatorIds={indicatorIds} />
            :null}
        </React.Fragment>
    )
}