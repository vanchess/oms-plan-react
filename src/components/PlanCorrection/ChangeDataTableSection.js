import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { categorySelector } from '../../store/category/categorySelector';
import { categoryTreeNodesSelector } from '../../store/category/categoryTreeSelector';
import ChangeDataTableSectionNodeDetails from './ChangeDataTableSectionNodeDetails';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTableSection(props) {
    const {tree, nodeValues, data} = props;

    const treeNodes = useSelector(categoryTreeNodesSelector);
    const category = useSelector(categorySelector);
    
    return Object.keys(tree).map(nodeId => {
        if (nodeValues[nodeId] === undefined) {
            return null;
        }
        let categoryName = category[treeNodes[nodeId].category_id].name;
        const categoryValue = nodeValues[nodeId];
        let subTree = tree[nodeId];
        let nextNodeId = nodeId;

        while (subTree !== null) {    
            let subCategoryLen = 0;
            
            for (const key in subTree) {
                if(nodeValues[key] !== undefined) {
                    subCategoryLen++;
                    nextNodeId = key;
                }
            }
            if (
                subCategoryLen !== 1
                || categoryValue !== nodeValues[nextNodeId]
            ) {
                break;
            }
            categoryName += ' ' + category[treeNodes[nextNodeId].category_id].name;
            subTree = subTree[nextNodeId];
        };

        return (
            <Grid container key={nodeId} sx={{ border: 1, pl: 2 }}>
                    <Grid item xs={12} align="left">
                            <Typography sx={{fontWeight: 600}} component="span">{categoryName} </Typography>
                            <Typography component="span" sx={{ color: 'text.secondary' }}>
                                ({categoryValue>0?'+':''}{twoDecimal.format(categoryValue)})
                            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        { subTree !== null 
                        ? <ChangeDataTableSection tree={subTree} nodeValues={nodeValues} data={data} />
                        : <ChangeDataTableSectionNodeDetails data={data['node'][nextNodeId]} />
                        }
                    </Grid>
            </Grid>
        );
    });
}