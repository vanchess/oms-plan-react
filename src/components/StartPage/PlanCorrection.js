import styled from '@emotion/styled';
import { Accordion, AccordionDetails, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import { upperCaseFirst } from '../../_helpers/strings';
import { selectedYearSelector } from '../../store/nodeData/nodeDataSelectors';
import { useSelector } from 'react-redux';
import { categoryTreeNodesIdsSelector, categoryTreeNodesSelector, categoryTreeSelector } from '../../store/category/categoryTreeSelector';

import { sectionImagePath } from '../../services/imagePath';
import { categorySelector } from '../../store/category/categorySelector';
import SectionCardHeader from './SectionCardHeader';
import { initialDataLoadedSelector } from '../../store/initialData/initialDataSelectors';
import { AccordionSummaryStyled } from './AccordionSummaryStyled';
import { TreeItem, TreeView } from '@mui/lab';
import { ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import { Box } from '@mui/system';
import CategoryTreeView, { renderCategoryTree } from './renderCategoryTree';

export default function PlanCorrection(props) {
    const year = useSelector(selectedYearSelector);
    const tree = useSelector(categoryTreeSelector);
    const categoryTreeNodes = useSelector(categoryTreeNodesSelector);
    const categories = useSelector(categorySelector);
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
                <Grid container >
                { Object.keys(tree).map(nId => {
                    const nodeId = Number(nId);
                    const treeNode = categoryTreeNodes[nodeId];
                    if (!treeNode) {
                        return null
                    }

                    return (
                            <Grid item key={nodeId} xs={12} sm={6} md={4}>
                                <Card >
                                    <SectionCardHeader
                                        image={sectionImagePath(treeNode.slug)}
                                        title={upperCaseFirst(categories[treeNode.category_id].name)}
                                        to={`/${treeNode.slug}/changes/`}
                                    />
                                    <CardContent>
                                        <CategoryTreeView tree={tree[nodeId]?.tree} nodeId={nodeId} baseUrl={`/${treeNode.slug}/changes/`} />
                                    </CardContent>
                                    {/*
                                    <CardActions>
                                        <Button   size="small" color="primary">
                                        Открыть
                                        </Button>
                                    </CardActions>
                                    */}
                                </Card>
                            </Grid>
                    )
                })}
                </Grid>
            </AccordionDetails>
        </Accordion>
    )
}