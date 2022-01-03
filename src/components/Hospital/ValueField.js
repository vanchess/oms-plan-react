import React from 'react';
import { connect } from 'react-redux';
//import { useSelector } from 'react-redux'
import EditableValueField from '../EditableValueField';
import { plannedIndicatorIdSelector } from '../../store/plannedIndicator/plannedIndicatorSelectors';
import { valueSelector, statusSelector } from '../../store/initialData/initialDataSelectors';
import { dataForNodeUpdate } from '../../store/initialData/initialDataStore';
import { selectedNodeIdSelector } from '../../store/nodeData/nodeDataSelectors';

const ValueField = (props) => {
    const { value, status, updateData, plannedIndicatorId, year, moId } = props;
    //const plannedIndicatorId = useSelector(store => plannedIndicatorIdSelector(store, {nodeId, indicatorId, profileId}));
    //const value = useSelector(store => store.mo.ids.map(id => store.mo.entities[id]));
    
    const onChange = ({year, moId, plannedIndicatorId, oldValue}) => (newValue) => {
        if (newValue !== oldValue) {
            updateData({
                year: year,
                moId: moId,
                plannedIndicatorId: plannedIndicatorId,
                value: newValue,
            })
        }
    }
    
    return (
        <EditableValueField 
            value={value || '-'}
            status={status || 'none'}
            onChange={onChange({year, moId, plannedIndicatorId, oldValue:value})}
        />
    );
};



const mapStateToProps = function(store, ownProps) {
  const {indicatorId, profileId, assistanceTypeId, serviceId, moId} = ownProps;
  const year = store.nodeData.selectedYear;
  const nodeId = selectedNodeIdSelector(store);
  const plannedIndicatorId = plannedIndicatorIdSelector(store, {nodeId, indicatorId, profileId, assistanceTypeId, serviceId});
  
  return {
      plannedIndicatorId,
      value: valueSelector(store, {plannedIndicatorId, year, moId}),
      status: statusSelector(store, {plannedIndicatorId, year, moId}),
      year: year,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    updateData: ({year, moId, plannedIndicatorId, value}) => {
        dispatch(dataForNodeUpdate({year, moId, plannedIndicatorId, value}));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ValueField);