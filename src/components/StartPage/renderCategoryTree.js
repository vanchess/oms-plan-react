import { TreeItem, TreeView } from "@mui/x-tree-view"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { categorySelector } from "../../store/category/categorySelector";
import { categoryTreeNodesSelector } from "../../store/category/categoryTreeSelector";
import { upperCaseFirst } from "../../_helpers/strings";

import { ChevronRight as ChevronRightIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';


export default function CategoryTreeView({tree, nodeId, baseUrl, ...props}) {
    const history = useHistory();
    const categoryTreeNodes = useSelector(categoryTreeNodesSelector);
    const categories = useSelector(categorySelector);

    const renderCategoryTree = ({nodeId, children}) => {
        const treeNode = categoryTreeNodes[nodeId];
        if (!treeNode) {
            return null
        }
        if (!children) {
            return (
                <TreeItem 
                    onClick={() => history.push(`${baseUrl}${nodeId}`)}
                    key={nodeId} 
                    nodeId={nodeId.toString()} 
                    label={upperCaseFirst(categories[treeNode.category_id].name)}
                    />
            )
        }
        return (
            <TreeItem 
                key={nodeId} 
                nodeId={nodeId.toString()} 
                label={upperCaseFirst(categories[treeNode.category_id].name)}
                >
            { children
                ? Object.keys(children).map((nId) => renderCategoryTree({nodeId:Number(nId), children:children[Number(nId)]}))
                : null}
            </TreeItem>
        );
    }

    let children = null;
    if (tree) {
        children = tree[nodeId];
    }

    return (
        <TreeView
            aria-label=""
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={[]}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            {...props}
            >
            {renderCategoryTree({nodeId, children})}
        </TreeView>
    )
}