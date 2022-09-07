import React from 'react'
import { useSelector } from 'react-redux';
import { categoryTreeByRootNodeIdSelector, categoryTreeNodeBySlugSelector, categoryTreeNodesIdsSelector } from '../../store/category/categoryTreeSelector';
import CategoryTreeView from '../StartPage/renderCategoryTree';

export default function PolyclinicInitialDataStartPage() {
    const categoryNode = useSelector(store => categoryTreeNodeBySlugSelector(store, 'polyclinic'));
    const tree = useSelector(store => categoryTreeByRootNodeIdSelector(store, categoryNode?.id));
    const nodeIds = useSelector(categoryTreeNodesIdsSelector);
    const nodeIdsString = nodeIds.map(id => id.toString());

    return (
        <CategoryTreeView defaultExpanded={nodeIdsString ?? []} tree={tree} nodeId={categoryNode?.id} baseUrl={`/${categoryNode?.slug}/initial/`} />
    );
}