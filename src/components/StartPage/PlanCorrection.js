import { Accordion, AccordionDetails, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import { selectedYearSelector } from '../../store/nodeData/nodeDataSelectors';
import { useSelector } from 'react-redux';
import { categoryTreeSelector } from '../../store/category/categoryTreeSelector';
import { initialDataLoadedSelector } from '../../store/initialData/initialDataSelectors';
import { AccordionSummaryStyled } from './AccordionSummaryStyled';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import PlanCorrectionSteper from './PlanCorrectionStepper';

export default function PlanCorrection(props) {
    const year = useSelector(selectedYearSelector);
    const tree = useSelector(categoryTreeSelector);
    
    const initialDataLoaded = useSelector(store => initialDataLoadedSelector(store, {year, nodeIds:Object.keys(tree).map(id => Number(id))}));
    const [planCorrectionExpanded, setPlanCorrectionExpanded] = useState(true);

    useLayoutEffect(() => {
        setPlanCorrectionExpanded(initialDataLoaded);
    }, [initialDataLoaded])

    return (
        <Accordion disableGutters expanded={planCorrectionExpanded} onChange={() => setPlanCorrectionExpanded(e => !e)}>
            <AccordionSummaryStyled expandIcon={<ExpandMoreIcon />} >
                <Typography sx={{ width: '40%', flexShrink: 0 }}>Корректировки</Typography>
                <Typography sx={{ color: 'text.secondary' }}>{initialDataLoaded ? '' : 'Недоступно. Зафиксируйте данные на начало года'}</Typography>
            </AccordionSummaryStyled>
            <AccordionDetails>
                <PlanCorrectionSteper />
            </AccordionDetails>
        </Accordion>
    )
}