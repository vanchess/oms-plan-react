import { createSelector } from "@reduxjs/toolkit";

const EmptyArray = [];
export const getLeafNode = (tree) => {
    let result = EmptyArray;
    Object.keys(tree).forEach(nodeId => {
        if (tree[nodeId] === null) {
            result = [...result, Number(nodeId)];
        } else {
            result = [...result, ...getLeafNode(tree[nodeId])];
        }
    })
    return result;
}

export const categoryTreeSelector = (store) => {
    return store.categoryTree.entities
}

export const categoryTreeRootNodeIdsSelector = createSelector(
    [categoryTreeSelector],
    (entities) => Object.keys(entities)
)

export const categoryTreeByRootNodeIdSelector = (store, nodeId) => {
    if(!store.categoryTree.entities[nodeId]) {
        return null;
    }
    return store.categoryTree.entities[nodeId].tree;
}

export const leafNodesSelector = createSelector(
    [categoryTreeByRootNodeIdSelector],
    (tree) => {
        let leaf = EmptyArray;
        if (tree) {
            leaf = getLeafNode(tree);
        }
        return leaf;
    }
)

export const categoryTreeNodesSelector = (store) => store.categoryTreeNodes.entities;
export const categoryTreeNodesIdsSelector = (store) => store.categoryTreeNodes.ids;
export const categoryTreeNodesIsLoadingSelector = (store) => store.categoryTreeNodes.loading

export const categoryTreeNodeBySlugFunction = (categoryTreeNodes, slug) => {
    for (const key in categoryTreeNodes) {
        if (categoryTreeNodes[key].slug === slug) {
            return categoryTreeNodes[key];
        }
    }
}
export const categoryTreeNodeBySlugSelector = (store, slug) => {
    return categoryTreeNodeBySlugFunction(categoryTreeNodesSelector(store), slug);
    
}
