import React from 'react';
import { withRouter } from "react-router-dom";
//import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

import MainTable from './MainTable';

import { connect } from 'react-redux';
import { setTitle } from '../../store/curPage/curPageStore'
import { indicatorsUsedForNodeIdFetch, medicalAssistanceTypesUsedForNodeId } from '../../store/nodeData/nodeDataStore';
import { dataForNodeIdFetch } from '../../store/initialData/initialDataStore';

import { selectedNodeIdSelector } from '../../store/nodeData/nodeDataSelectors';

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
})

const title = 'Данные на начало года';

class InitialData extends React.Component {

    constructor(props){
        super(props);
    }
    
    componentDidMount(){
        const { selectedNodeId: nodeId, year } = this.props;
        
        if (nodeId) {
            if (!this.props.indicatorIds) {
                this.props.indicatorsForNodeIdFetch(nodeId);
            }
            if (!this.props.medicalAssistanceTypesIds) {
                this.props.medicalAssistanceTypesUsedForNodeIdFetch(nodeId);
            }

            this.props.initDataForNodeIdFetch(nodeId, year);
        }
    }

    
    componentDidUpdate(prevProps, prevState) {
        const { selectedNodeId: nodeId, year } = this.props;
        
        if (nodeId) {
            if (nodeId !== prevProps.selectedNodeId) {
                if (!this.props.indicatorIds) {
                    this.props.indicatorsForNodeIdFetch(nodeId);
                }
                if (!this.props.medicalAssistanceTypesIds) {
                    this.props.medicalAssistanceTypesUsedForNodeIdFetch(nodeId);
                }
            }
                
            if (nodeId !== prevProps.selectedNodeId || year !== prevProps.year) {
                this.props.initDataForNodeIdFetch(nodeId, year);
            }
        }
    }
    
    render() {
      const { classes, selectedNodeId: nodeId, year } = this.props;

      return (
          <div>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <MainTable />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </div>
      );
    }
}

const mapStateToProps = function(store, ownProps) {
  return {
      selectedNodeId: selectedNodeIdSelector(store),
      year: store.nodeData.selectedYear,
    };
}
const mapDispatchToProps = dispatch => {
  return {
    indicatorsForNodeIdFetch: (nodeId) => {
        dispatch(indicatorsUsedForNodeIdFetch({nodeId}));
    },
    medicalAssistanceTypesUsedForNodeIdFetch: (nodeId) => {
        dispatch(medicalAssistanceTypesUsedForNodeId({nodeId}));
    },
    initDataForNodeIdFetch: (nodeId, year) => {
        dispatch(dataForNodeIdFetch({nodeId, year}));
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(InitialData));