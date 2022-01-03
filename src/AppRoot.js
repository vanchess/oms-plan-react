import React from 'react';
import { Route, Switch } from 'react-router-dom';

import RootPrivateRoutes from './routes/RootPrivateRoutes'

import { connect } from 'react-redux';
import { moFetch } from './store/mo/moAction'
import { hospitalBedProfilesFetch } from './store/hospitalBedProfiles/hospitalBedProfilesStore'
import { medicalServicesFetch } from './store/medicalServices/medicalServicesStore'
import { medicalAssistanceTypeFetch } from './store/medicalAssistanceType/medicalAssistanceTypeStore'
import { indicatorsFetch } from './store/indicator/indicatorStore'
import { plannedIndicatorsFetch } from './store/plannedIndicator/plannedIndicatorStore'

class AppRoot extends React.Component {

    componentDidMount() {
        this.props.fetchMO();
        this.props.fetchProfiles();
        this.props.fetchIndicators();
        this.props.fetchPlannedIndicators();
        this.props.fetchMedicalServices();
        this.props.fetchMedicalAssistanceType();
    }

    render(){
      //let path = this.props.match.path;
      return (
        <RootPrivateRoutes />
      );
    }
}

const mapStateToProps = function(store) {
  return {
        
    };
}
const mapDispatchToProps = dispatch => {
  return {
    fetchMO: () => {
        dispatch(moFetch(0, -1));
    },
    fetchProfiles: () => {
        dispatch(hospitalBedProfilesFetch());
    },
    fetchIndicators: () => {
        dispatch(indicatorsFetch());
    },
    fetchPlannedIndicators: () => {
        dispatch(plannedIndicatorsFetch());
    },
    fetchMedicalServices: () => {
        dispatch(medicalServicesFetch());
    },
    fetchMedicalAssistanceType: () => {
        dispatch(medicalAssistanceTypeFetch());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AppRoot);