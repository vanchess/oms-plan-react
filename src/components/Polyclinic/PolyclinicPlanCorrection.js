import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { moDepartmentFetch } from '../../store/moDepartment/moDepartmentStore';
import PlanCorrection from '../PlanCorrection/PlanCorrection';

export default function PolyclinicPlanCorrection(props) {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(moDepartmentFetch([49,50]));
    }, [dispatch])
    
    return (
        <PlanCorrection rootNodeId={9} />
    );
}