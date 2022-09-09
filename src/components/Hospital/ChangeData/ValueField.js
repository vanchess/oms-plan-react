import React from 'react';
import { connect } from 'react-redux';
//import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography';
import { plannedIndicatorIdSelector } from '../../../store/plannedIndicator/plannedIndicatorSelectors';
import { valueSelector, statusSelector } from '../../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors';
import { indicatorChangeForNodeAdd } from '../../../store/plannedIndicatorChange/plannedIndicatorChangeStore';
import { selectedNodeIdSelector } from '../../../store/nodeData/nodeDataSelectors';
import EditableValueField from '../../OmsPlanTable/EditableValueField';

const ValueField = (props) => {
    const { value, status, updateData, plannedIndicatorId, periodId, moId, moDepartmentId } = props;
    //const plannedIndicatorId = useSelector(store => plannedIndicatorIdSelector(store, {nodeId, indicatorId, profileId}));
    //const value = useSelector(store => store.mo.ids.map(id => store.mo.entities[id]));
    
    const onChange = ({periodId, moId, moDepartmentId, plannedIndicatorId, oldValue}) => (newValue) => {
        if (newValue !== oldValue) {
            updateData({
                periodId: periodId,
                moId: moId,
                plannedIndicatorId: plannedIndicatorId,
                value: newValue,
                moDepartmentId: moDepartmentId,
                oldValue: oldValue,
            })
        }
    }
    if(plannedIndicatorId) {
        return (
            <EditableValueField 
                value={value}
                status={status || 'none'}
                onChange={onChange({periodId, moId, moDepartmentId, plannedIndicatorId, oldValue:value})}
            />
        );
    }
    return (
        <Typography color={'textSecondary'}>x</Typography>
    );
};



const mapStateToProps = function(store, ownProps) {
  const {indicatorId, profileId, assistanceTypeId, serviceId, moId, moDepartmentId, careProfileId, vmpGroupId, vmpTypeId, periodId} = ownProps;
  const nodeId = selectedNodeIdSelector(store);
  const plannedIndicatorId = plannedIndicatorIdSelector(store, {nodeId, indicatorId, profileId, assistanceTypeId, serviceId, careProfileId, vmpGroupId, vmpTypeId});
  
  return {
      plannedIndicatorId,
      value: valueSelector(store, {plannedIndicatorId, periodId, moId, moDepartmentId}),
      status: statusSelector(store, {plannedIndicatorId, periodId, moId, moDepartmentId}),
  };
}
const mapDispatchToProps = dispatch => {
  return {
    updateData: ({periodId, moId, moDepartmentId, plannedIndicatorId, value, oldValue}) => {
        dispatch(indicatorChangeForNodeAdd({periodId, moId, moDepartmentId, plannedIndicatorId, value, oldValue}));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValueField);