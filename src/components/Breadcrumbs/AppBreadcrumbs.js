import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  Link as RouterLink,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import SectionMenu from './SectionMenu';
import { useSelector } from 'react-redux';
import { categoryTreeNodeBySlugFunction, categoryTreeNodesSelector, categoryTreeRootNodeIdsSelector, categoryTreeSelector, getLeafNode } from '../../store/category/categoryTreeSelector';
import { categorySelector } from '../../store/category/categorySelector';

const breadcrumbNameMap = {
  'ambulance': 'Скорая',
  'polyclinic': 'Поликлиника',
  'hospital': 'Стационар',
  'changes': 'Корректировки',
  'initial': 'Данные на начало года',
  'attached-persons': 'Количество прикрепившихся',
  'care-profile': 'Профили МП',
  'fap': 'МО'
};

const sectionTypeItems = [
  {value: 'initial', label: 'Данные на начало года'},
  {value: 'changes', label: 'Корректировки'},
  /*{value: 'attached-persons', label: 'Количество прикрепившихся'},*/
]


const LinkRouter = (props) => <Button {...props} component={RouterLink} />;

export default function AppBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const history = useHistory();
  const rootNodes = useSelector(categoryTreeRootNodeIdsSelector);
  const tree = useSelector(categoryTreeSelector);
  const treeNodes = useSelector(categoryTreeNodesSelector);
  const categories = useSelector(categorySelector);

  const changeSection = (section) => {
    history.push(`/${section}/${pathnames[1]}`);
  }

  const changeSectionType = (section) => {
    history.push(`/${pathnames[0]}/${section}`);
  }
  const changeLeafNode = (section) => {
    history.push(`/${pathnames[0]}/${pathnames[1]}/${section}`);
  }

  

  const getLeafNodesNames = (tree, prefix = '') => {
      if (!tree) {
        return {};
      }
      let resultObj = {};
      Object.keys(tree).forEach(nId => {
        const nodeId = Number(nId);
        let categoryName = categories[treeNodes[nodeId].category_id].name;
        let subTree = tree[nodeId];

        if (subTree) {
          resultObj = {...resultObj, ...getLeafNodesNames(subTree, `${prefix} ${categoryName}`)};
        } else {
          resultObj = {...resultObj, [nodeId]:{value: nodeId, label: `${prefix} ${categoryName}`}}
        }
      })
      return resultObj;
  }

  const items = [];
  rootNodes.forEach(nodeId => {
    const treeNode = treeNodes[nodeId];
    if (treeNode) {
      items.push({value: treeNode?.slug, label:categories[treeNode?.category_id]?.name});
    }
  });

  let leafNodesNames = {};
  let subCategoryName = null;
  if (pathnames[2]) {
    const rootNodeSlug = pathnames[0];
    const rootNodeId = categoryTreeNodeBySlugFunction(treeNodes, rootNodeSlug).id;
    const leafNodeId = Number(pathnames[2]);

    if (!tree) {
      return null;
    }
    leafNodesNames = getLeafNodesNames(tree[rootNodeId]?.tree[rootNodeId]);

    subCategoryName = leafNodesNames[leafNodeId]?.label;
  }

  return (
    <Breadcrumbs color="inherit" aria-label="breadcrumb">
      <IconButton underline="hover" color="inherit" component={RouterLink} to="/">
          <HomeIcon />
      </IconButton>
      { pathnames[1]
        ? <SectionMenu label={breadcrumbNameMap[pathnames[1]]} items={sectionTypeItems} onChange={changeSectionType} />
        : null
      }
      { pathnames[0]
        ? <SectionMenu label={breadcrumbNameMap[pathnames[0]]} items={items} onChange={changeSection} />
        : null
      }
      { subCategoryName
        ? <SectionMenu label={subCategoryName} items={Object.values(leafNodesNames)} onChange={changeLeafNode} />
        : null
      }
      {pathnames.map((value, index) => {
         if (index === 0 || index === 1 || index === 2) {
          return null;
        }

        
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const n = pathnames[index];
        
       
        return last ? (
          <Button color="inherit" key={to}>
            {breadcrumbNameMap[n]}
          </Button>
        ) : (
          <LinkRouter underline="hover" color="inherit" to={to} key={to}>
            {breadcrumbNameMap[n]}
          </LinkRouter>
          
        );
      })}
    </Breadcrumbs>
  );
};