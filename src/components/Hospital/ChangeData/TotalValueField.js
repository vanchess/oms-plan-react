import React from 'react';
import { connect } from 'react-redux';
//import { useSelector } from 'react-redux'
import { totalValueSelector } from '../../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors';
import { selectedNodeIdSelector } from '../../../store/nodeData/nodeDataSelectors';
import { plannedIndicatorIdsSelector } from '../../../store/plannedIndicator/plannedIndicatorSelectors';

const TotalValueField = (props) => {
    const { value } = props;
    const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

    return (
        <div>{value ? twoDecimal.format(value) : '-'}</div>
    );
};

const mapStateToProps = function(store, ownProps) {
  const {indicatorId, profileId, assistanceTypeId, serviceId, moIds, moDepartmentIds, careProfileId, vmpGroupId, vmpTypeId, periodIds} = ownProps;
  const nodeId = selectedNodeIdSelector(store);
  const plannedIndicatorIds = plannedIndicatorIdsSelector(store, {nodeId, indicatorId, profileId, assistanceTypeId, serviceId, careProfileId, vmpGroupId, vmpTypeId});

  return {
      value: totalValueSelector(store, {plannedIndicatorIds, periodIds, moIds, moDepartmentIds, indicatorId}),
  };
}
const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalValueField);