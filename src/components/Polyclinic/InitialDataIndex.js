import React from 'react';
import { withRouter } from "react-router-dom";

import InitialData  from  './InitialData.js'

import { connect } from 'react-redux';
import { setTitle } from '../../store/curPage/curPageStore'
import { indicatorsUsedForNodeIdFetch, dataForNodeIdFetch, dataForNodeUpdated, nodeIdSelected } from '../../store/nodeData/nodeDataStore';

import { selectedNodeIdSelector } from '../../store/nodeData/nodeDataSelectors';

const title = 'Данные на начало года';

class InitialDataIndex extends React.Component {

    constructor(props){
        super(props);

    }
    
    componentDidMount(){
        this.props.setTitle({title: title});
        
        let nodeId = this.props.match.params.nodeId;
        if (this.props.selectedNodeId != nodeId) {
            this.props.selectNode(nodeId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.setTitle({title: title});
        
        const nodeId = this.props.match.params.nodeId;
        if (nodeId !== prevProps.match.params.nodeId) {
            this.props.selectNode(nodeId);
        }
    }
    
    render() {
      return (
          <InitialData />
      );
    }
}

const mapStateToProps = function(store, ownProps) {
  return {
      selectedNodeId: selectedNodeIdSelector(store),
    };
}
const mapDispatchToProps = dispatch => {
  return {
    setTitle: (t) => {
        dispatch(setTitle(t));
    },
    selectNode: (nodeId) => {
        dispatch(nodeIdSelected({nodeId}));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(InitialDataIndex));