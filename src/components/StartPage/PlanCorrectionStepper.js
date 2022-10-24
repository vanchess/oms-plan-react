import { Link, Step, StepButton, StepContent, Stepper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { commissionDecisionArrSelector, selectedCommissionDecisionIdSelector } from '../../store/commissionDecision/CommissionDecisionSelector';
import { commissionDecisionIdSelected } from '../../store/commissionDecision/CommissionDecisionStore';
import { selectedYearSelector } from '../../store/nodeData/nodeDataSelectors';
import NewCommission from '../Commission/NewCommission';
import PlanCorrectionMenu from './PlanCorrectionMenu';

export default function PlanCorrectionSteper(props) {
    const dispatch = useDispatch();
    const [activeStep, setActiveStep] = useState(0);
    const commissionsArr = useSelector(commissionDecisionArrSelector);
    const selectedCommissionDecisionId = useSelector(selectedCommissionDecisionIdSelector);
    const year = useSelector(selectedYearSelector);

    const setActiveStepByCommissionDecisionId = (id) => {
        const step = commissionsArr.findIndex(e => e.id === id);
        setActiveStep(step);
    }

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleStepById = (id) => () => {
        setActiveStepByCommissionDecisionId(id);
        dispatch(commissionDecisionIdSelected(id));
    };

    useEffect(() => {
        setActiveStepByCommissionDecisionId(selectedCommissionDecisionId);
    }, [selectedCommissionDecisionId])

    return (
        <Box >
            <Stepper nonLinear activeStep={activeStep} orientation="vertical">
                {commissionsArr.map((comission, index) => (
                <Step key={comission.id}>
                    <StepButton color="inherit" onClick={handleStepById(comission.id)}>
                        протокол №{comission.number} от {comission.date}
                    </StepButton>
                    
                    <StepContent>
                        <PlanCorrectionMenu />
                        <Box
                            sx={{
                                '& > :not(style) + :not(style)': {
                                    ml: 2,
                                },
                            }}
                        >
                            <Link target="_blank" href={new URL(`meeting-minutes/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>протокол xlsx</Link>
                            <Link target="_blank" href={new URL(`summary-volume/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>свод(объемы) xlsx</Link>
                            <Link target="_blank" href={new URL(`summary-cost/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>свод(стоимость) xlsx</Link>
                            <Link target="_blank" href={new URL(`hospital-by-profile/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>Стационар по профилям xlsx</Link>
                        </Box>
                    </StepContent>
                </Step>
                ))}
                <Step>
                    <StepButton color="inherit" onClick={handleStep(commissionsArr.length)}>
                        Новый протокол
                    </StepButton>
                    <StepContent>
                        <NewCommission />
                    </StepContent>
                </Step>
            </Stepper>
        </Box>
    )
}