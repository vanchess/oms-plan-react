import { Card, CardContent, Grid } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { sectionImagePath } from '../../services/imagePath';
import { categorySelector } from '../../store/category/categorySelector';
import { categoryTreeNodesSelector, categoryTreeSelector } from '../../store/category/categoryTreeSelector';
import { upperCaseFirst } from '../../_helpers/strings';
import CategoryTreeView from './renderCategoryTree';
import SectionCardHeader from './SectionCardHeader';

export default function PlanCorrectionMenu(props) {
    const categoryTreeNodes = useSelector(categoryTreeNodesSelector);
    const categories = useSelector(categorySelector);
    const tree = useSelector(categoryTreeSelector);

    return (
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
    );
} 