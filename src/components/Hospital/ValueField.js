import React from 'react';
import { connect } from 'react-redux';
//import { useSelector } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import EditableValueField from '../EditableValueField';
import { plannedIndicatorIdSelector } from '../../store/plannedIndicator/plannedIndicatorSelectors';
import { valueSelector, statusSelector } from '../../store/initialData/initialDataSelectors';
import { dataForNodeUpdate } from '../../store/initialData/initialDataStore';
import { selectedNodeIdSelector } from '../../store/nodeData/nodeDataSelectors';

const ValueField = (props) => {
    const { value, status, updateData, plannedIndicatorId, year, moId, moDepartmentId } = props;
    //const plannedIndicatorId = useSelector(store => plannedIndicatorIdSelector(store, {nodeId, indicatorId, profileId}));
    //const value = useSelector(store => store.mo.ids.map(id => store.mo.entities[id]));
    
    const onChange = ({year, moId, moDepartmentId, plannedIndicatorId, oldValue}) => (newValue) => {
        if (newValue !== oldValue) {
            updateData({
                year: year,
                moId: moId,
                plannedIndicatorId: plannedIndicatorId,
                value: newValue,
                moDepartmentId: moDepartmentId,
            })
        }
    }
    if(plannedIndicatorId) {
        return (
            <EditableValueField 
                value={value}
                status={status || 'none'}
                onChange={onChange({year, moId, moDepartmentId, plannedIndicatorId, oldValue:value})}
            />
        );
    }
    return (
        <Typography color={'textSecondary'}>x</Typography>
    );
};



const mapStateToProps = function(store, ownProps) {
  const {indicatorId, profileId, assistanceTypeId, serviceId, moId, moDepartmentId, careProfileId, vmpGroupId, vmpTypeId} = ownProps;
  const year = store.nodeData.selectedYear;
  const nodeId = selectedNodeIdSelector(store);
  const plannedIndicatorId = plannedIndicatorIdSelector(store, {nodeId, indicatorId, profileId, assistanceTypeId, serviceId, careProfileId, vmpGroupId, vmpTypeId});
  
  return {
      plannedIndicatorId,
      value: valueSelector(store, {plannedIndicatorId, year, moId, moDepartmentId}),
      status: statusSelector(store, {plannedIndicatorId, year, moId, moDepartmentId}),
      year: year,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    updateData: ({year, moId, moDepartmentId, plannedIndicatorId, value}) => {
        dispatch(dataForNodeUpdate({year, moId, moDepartmentId, plannedIndicatorId, value}));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValueField);