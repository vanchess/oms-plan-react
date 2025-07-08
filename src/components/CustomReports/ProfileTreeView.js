import React, { useMemo } from 'react';
import {
  TreeView,
  TreeItem,
} from '@mui/x-tree-view';
import { Box, IconButton, Typography } from '@mui/material';
import { Add, Edit, Delete, ExpandMore, ChevronRight } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

const ProfileTreeView = ({
  profiles,
  onDelete,
  onAddChild,
}) => {
  const history = useHistory();

  const buildTree = (items, parentId = null) => {
    return items
      .filter((item) => item.parent_id === parentId)
      .map((item) => ({
        ...item,
        children: buildTree(items, item.id),
      }));
  };

  const profileTree = useMemo(() => buildTree(profiles), [profiles]);

  const renderNode = (node) => (
    <TreeItem
      key={node.id}
      nodeId={node.id.toString()}
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1">{node.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {node.short_name}
            </Typography>
          </Box>
          <Box>
            <IconButton onClick={() => onAddChild(node)} size="small">
              <Add fontSize="small" />
            </IconButton>
            <IconButton onClick={() => history.push(`/reports/profiles/${node.id}`)} size="small">
              <Edit fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onDelete(node.id)} size="small">
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      }
    >
      {node.children.map((child) => renderNode(child))}
    </TreeItem>
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMore />}
      defaultExpandIcon={<ChevronRight />}
      sx={{ flexGrow: 1, overflowY: 'auto' }}
    >
      {profileTree.map((node) => renderNode(node))}
    </TreeView>
  );
};

export default ProfileTreeView;
