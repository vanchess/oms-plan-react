import React from 'react'
import { useSelector } from 'react-redux';
import { categoryTreeByRootNodeIdSelector, categoryTreeNodeBySlugSelector, categoryTreeNodesIdsSelector } from '../../store/category/categoryTreeSelector';
import CategoryTreeView from '../StartPage/renderCategoryTree';

export default function AmbulanceInitialDataStartPage() {
    const categoryNode = useSelector(store => categoryTreeNodeBySlugSelector(store, 'ambulance'));
    const tree = useSelector(store => categoryTreeByRootNodeIdSelector(store, categoryNode?.id));
    const nodeIds = useSelector(categoryTreeNodesIdsSelector);
    const nodeIdsString = nodeIds.map(id => id.toString());

    return (
        <>
            <CategoryTreeView defaultExpanded={nodeIdsString ?? []} tree={tree} nodeId={categoryNode?.id} baseUrl={`/${categoryNode?.slug}/initial/`} />
            <CategoryTreeView defaultExpanded={['34','39']} tree={{34:{39:null}}} nodeId={34} baseUrl={`/${categoryNode?.slug}/attached-persons/`} />
        </>
    );
}