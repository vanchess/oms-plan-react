import React from 'react';
import { connect } from 'react-redux';
//import { useSelector } from 'react-redux'
import { totalValueSelector } from '../../store/initialData/initialDataSelectors';
import { selectedNodeIdSelector } from '../../store/nodeData/nodeDataSelectors';
import { plannedIndicatorIdsSelector } from '../../store/plannedIndicator/plannedIndicatorSelectors';

const TotalValueField = (props) => {
    const { value } = props;
    
    return (
        <div>{value || '-'}</div>
    );
};

const mapStateToProps = function(store, ownProps) {
  const {indicatorId, profileId, assistanceTypeId, serviceId, moIds} = ownProps;
  const year = store.nodeData.selectedYear;
  const nodeId = selectedNodeIdSelector(store);
  const plannedIndicatorIds = plannedIndicatorIdsSelector(store, {nodeId, indicatorId, profileId, assistanceTypeId, serviceId});
  
  return {
      value: totalValueSelector(store, {plannedIndicatorIds, year, moIds}),
  };
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalValueField);