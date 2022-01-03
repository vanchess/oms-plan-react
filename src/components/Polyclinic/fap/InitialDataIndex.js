import React from 'react';
import { withRouter } from "react-router-dom";

import InitialData  from  './InitialData.js'

import { connect } from 'react-redux';
import { setTitle } from '../../../store/curPage/curPageStore'
import { indicatorsUsedForNodeIdFetch, dataForNodeIdFetch, dataForNodeUpdated, nodeIdSelected, moSelected, moNotSelected } from '../../../store/nodeData/nodeDataStore';

import { selectedNodeIdSelector } from '../../../store/nodeData/nodeDataSelectors';

const title = 'Данные на начало года по ФАП';

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
        
        let moId = this.props.match.params.moId;
        if (this.props.selectedMo != moId) {
            this.props.selectMo(moId);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        this.props.setTitle({title: title});
        
        const nodeId = this.props.match.params.nodeId;
        if (nodeId !== prevProps.match.params.nodeId) {
            this.props.selectNode(nodeId);
        }
        
        const moId = this.props.match.params.moId;
        if (moId !== prevProps.match.params.moId) {
            this.props.selectMo(moId);
        }
    }
    
    componentWillUnmount() {
        this.props.resetMoSelection();
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
    },
    selectMo: (moId) => {
        dispatch(moSelected({moId}));
    },
    resetMoSelection: () => {
        dispatch(moNotSelected());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(InitialDataIndex));