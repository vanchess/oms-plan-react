import React from 'react'
import ChangeDataTableSectionNodeAssistanceTypesDetails from './ChangeDataTableSectionNodeAssistanceTypesDetails';
import ChangeDataTableSectionNodeBedProfilesDetails from './ChangeDataTableSectionNodeBedProfilesDetails';
import ChangeDataTableSectionNodeCareProfilesDetails from './ChangeDataTableSectionNodeCareProfilesDetails';
import ChangeDataTableSectionNodeServicesDetails from './ChangeDataTableSectionNodeServicesDetails';

export default function ChangeDataTableSectionNodeDetails(props) {
    const {data} = props;

    if (data['service']) {
        return (<ChangeDataTableSectionNodeServicesDetails data={data['service']} />);
    }
    if (data['bedProfile']) {
        return (<ChangeDataTableSectionNodeBedProfilesDetails data={data['bedProfile']} />);
    }
    if (data['assistanceType']) {
        return (<ChangeDataTableSectionNodeAssistanceTypesDetails data={data['assistanceType']} />);
    }
    if (data['careProfile']) {
        return (<ChangeDataTableSectionNodeCareProfilesDetails data={data['careProfile']} />);
    }
    return (<div></div>)

}