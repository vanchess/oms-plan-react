import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { categorySelector } from '../../store/category/categorySelector';
import { categoryTreeByRootNodeIdSelector, categoryTreeNodesSelector } from '../../store/category/categoryTreeSelector';

const SubCategorySelect = (props) => {
    const { tree, nodeId:parentNodeId, onChange } = props;
    const treeNodes = useSelector(categoryTreeNodesSelector);
    const category = useSelector(categorySelector);
    const [nodeId, setNodeId] = useState('');

    useLayoutEffect(() => {
        setNodeId('');
    }, [parentNodeId])

    if (tree[parentNodeId] === null ) {
        return null;
    }
    const sudTree = tree[parentNodeId] ?? {};
    const handleChange = (e) => {
        const newNodeId = e.target.value;
        setNodeId(newNodeId);
        onChange(newNodeId);
    }

    return (
        <React.Fragment>
            <FormControl margin="dense" fullWidth size="small">
                <Select
                    value={Object.keys(sudTree).includes(nodeId) ? nodeId : ''}
                    onChange={handleChange}
                >
                    { Object.keys(sudTree).map(nodeId => {
                        
                        return (
                        <MenuItem key={nodeId} value={nodeId}>{category[treeNodes[nodeId]?.category_id]?.name ?? ''}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            { nodeId && 
                <SubCategorySelect tree={sudTree} nodeId={nodeId} onChange={onChange} />
            }
        </React.Fragment>
    );
}

export default function CategoryNodeSelect(props) {
    const { rootNodeId, onChange } = props;
    const tree = useSelector(store => categoryTreeByRootNodeIdSelector(store, rootNodeId));
    const treeNodes = useSelector(categoryTreeNodesSelector);
    const category = useSelector(categorySelector);

    const [nodeId, setNodeId] = useState(rootNodeId);

    const handleChange = (e) => {
        const newNodeId = e.target.value;
        setNodeId(newNodeId);
    }

    if (!tree) { return null; }

    return (
        <React.Fragment>
            <FormControl margin="dense" fullWidth size="small">
                <Select
                    value={nodeId}
                    onChange={handleChange}
                >
                    { Object.keys(tree).map(nodeId => {
                        
                        return (
                        <MenuItem key={nodeId} value={nodeId}>{category[treeNodes[nodeId]?.category_id]?.name ?? ''}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <SubCategorySelect tree={tree} nodeId={nodeId} onChange={onChange} />
        </React.Fragment>
    )
}