import { Button, Link, Menu, MenuItem, Step, StepButton, StepContent, Stepper } from '@mui/material';
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
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
                            <Link target="_blank" href={new URL(`meeting-minutes/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>протокол</Link>
                            <Link target="_blank" href={new URL(`summary-volume/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>свод(объемы)</Link>
                            <Link target="_blank" href={new URL(`summary-cost/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>свод(стоимость)</Link>
                            <Link target="_blank" href={new URL(`vitacore-v2/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>vitacore(план)</Link>
                            <Button
                                id="basic-button"
                                size="small"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                            >
                                Другие документы
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                }}
                            >
                                <MenuItem onClick={handleClose} >
                                    <Link target="_blank" href={new URL(`vitacore-hospital-by-bed-profile-periods/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>vitacore(стационар по профилям коек, по периодам)</Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} >
                                    <Link target="_blank" href={new URL(`vitacore-hospital-by-profile/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>vitacore(стационар по профилям МП, на год)</Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} >
                                    <Link target="_blank" href={new URL(`vitacore-hospital-by-profile-periods/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>vitacore(стационар по профилям МП, по периодам)</Link>
                                </MenuItem>
                                <MenuItem onClick={handleClose} >
                                    <Link target="_blank" href={new URL(`hospital-by-profile/${year}/${comission.id}`, process.env.REACT_APP_DOMAIN)}>стационар по профилям</Link>
                                </MenuItem>
                            </Menu>
                            
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