import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, Link, Typography } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import { upperCaseFirst } from '../../_helpers/strings';
import { selectedYearSelector } from '../../store/nodeData/nodeDataSelectors';
import { useSelector } from 'react-redux';
import { categoryTreeNodesIdsSelector, categoryTreeNodesSelector, categoryTreeSelector } from '../../store/category/categoryTreeSelector';

import { sectionImagePath } from '../../services/imagePath';
import { categorySelector } from '../../store/category/categorySelector';
import { initialDataLoadedSelector } from '../../store/initialData/initialDataSelectors';
import { AccordionSummaryStyled } from './AccordionSummaryStyled';
import SectionCardHeader from './SectionCardHeader';

import CategoryTreeView from './renderCategoryTree';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import AlertDialog from '../Dialog/AlertDialog';
import { initialDataLoadedService } from '../../services/api/initialDataLoadedService';

export default function InitialData(props) {
    const year = useSelector(selectedYearSelector);
    const tree = useSelector(categoryTreeSelector);
    const categoryTreeNodes = useSelector(categoryTreeNodesSelector);
    const categories = useSelector(categorySelector);
    const initialDataLoaded = useSelector(store => initialDataLoadedSelector(store, {year, nodeIds:Object.keys(tree).map(id => Number(id))}));
    const [initialDataExpanded, setInitialDataExpanded] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

    const nodeIds = useSelector(categoryTreeNodesIdsSelector);
    const nodeIdsString = nodeIds.map(id => id.toString());

    useLayoutEffect(() => {
        setInitialDataExpanded(!initialDataLoaded);
    }, [initialDataLoaded])

    const openCommitInitialDataDialog = (e) => {
        console.log(e);
        e.stopPropagation();
        setOpenDialog(true);
    }

    const onCloseCommitInitialDataDialog = (isConfirmed) => {
        if (isConfirmed) {
            initialDataLoadedService.commitDataByNodes(2023, [1, 9, 17, 39])
        }
        setOpenDialog(false);
    }

    return (
      <>
        <AlertDialog onClose={onCloseCommitInitialDataDialog} open={openDialog} title={`Зафиксировать данные на начало ${year} года?`} description={"Редактирование начальных данных станет недоступно"} />
        <Accordion disableGutters expanded={initialDataExpanded} onChange={() => setInitialDataExpanded(e => !e)}>
            <AccordionSummaryStyled expandIcon={<ExpandMoreIcon />} >
                <Typography sx={{ width: '40%', flexShrink: 0 }}>Данные на начало {year} года</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    {initialDataLoaded 
                        ? 'Данные зафиксированы' 
                        : <Button size="small" onClick={openCommitInitialDataDialog}>Зафиксировать данные</Button>
                    }
                </Typography>
            </AccordionSummaryStyled>
            <AccordionDetails>
                <Grid container >
                { Object.keys(tree).map(nodeId => {
                    const treeNode = categoryTreeNodes[Number(nodeId)];
                    if (!treeNode) {
                        return null
                    }
                    return (
                            <Grid item key={nodeId} xs={12} sm={6} md={4}>
                                <Card >
                                    <SectionCardHeader
                                        image={sectionImagePath(treeNode.slug)}
                                        title={upperCaseFirst(categories[treeNode.category_id].name)}
                                        to={`/${treeNode.slug}/initial/`}
                                    />
                                    <CardContent>
                                        <CategoryTreeView defaultExpanded={nodeIdsString ?? []} tree={tree[nodeId]?.tree} nodeId={nodeId} baseUrl={`/${treeNode.slug}/initial/`} />
                                        { (treeNode.slug === 'ambulance')
                                         ? <CategoryTreeView defaultExpanded={['34','39']} tree={{34:{39:null}}} nodeId={34} baseUrl={`/${treeNode.slug}/attached-persons/`} />
                                        :null}
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
                <Box
                    sx={{
                        '& > :not(style) + :not(style)': {
                            ml: 2,
                        },
                    }}
                >
                    <Link target="_blank" href={new URL(`summary-volume/${year}`, process.env.REACT_APP_DOMAIN)}>свод(объемы)</Link>
                    <Link target="_blank" href={new URL(`summary-cost/${year}`, process.env.REACT_APP_DOMAIN)}>свод(стоимость)</Link>
                    <Link target="_blank" href={new URL(`vitacore-v2/${year}`, process.env.REACT_APP_DOMAIN)}>vitacore(план)</Link>
                    <Link target="_blank" href={new URL(`vitacore-hospital-by-profile/${year}`, process.env.REACT_APP_DOMAIN)}>vitacore(стационар по профилям)</Link>
                    <Link target="_blank" href={new URL(`hospital-by-profile/${year}`, process.env.REACT_APP_DOMAIN)}>стационар по профилям</Link>
                </Box>
            </AccordionDetails>
        </Accordion>
      </>
    )
}