import React, { useEffect, useMemo, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Button,
  Autocomplete,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Checkbox, Paper
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { customReportProfileUnitService } from '../../services/api/customReportProfileUnitService';
import { plannedIndicatorService } from '../../services/api/plannedIndicatorService';
import { categoryTreeService } from '../../services/api/categoryTreeService';
import { categoryTreeSelector } from '../../store/category/categoryTreeSelector';

const ProfileUnitPlannedIndicatorsPage = () => {
  const { id } = useParams(); // id профиля-юнита
  const history = useHistory();

  const [linkedIndicators, setLinkedIndicators] = useState([]);
  const [allIndicators, setAllIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subtreeNodeIds, setSubtreeNodeIds] = useState([]);

  const categoryTree = useSelector(categoryTreeSelector);
  const categoryTreeNodes = useSelector(state => state.categoryTreeNodes.entities);
  const categories = useSelector(state => state.category.entities);

  const [selectedIndicators, setSelectedIndicators] = useState([]);

  const [searchText, setSearchText] = useState('');

  const yearOptions = useMemo(() => {
    return Array.from({ length: new Date().getFullYear() - 2021 + 2 }, (_, i) => 2021 + i);
  }, []);

  // Рекурсивно строим список всех категорий в дереве
  const buildCategoryOptions = (tree, path = []) => {
  return Object.entries(tree).flatMap(([nodeId, children]) => {
    const currentId = parseInt(nodeId, 10);
    const node = categoryTreeNodes[currentId];
    if (!node) return [];

    const categoryName = categories[node.category_id]?.name || `Категория #${nodeId}`;
    const currentPath = [...path, categoryName];

    const option = {
      id: currentId,
      label: currentPath.join(' / '),
    };

    if (!children) return [option]; // лист
    return [option, ...buildCategoryOptions(children, currentPath)];
  });
};

  const categoryOptions = useMemo(() => {
    return Object.values(categoryTree)
      .flatMap((treeEntry) => buildCategoryOptions(treeEntry.tree));
  }, [categoryTree, categoryTreeNodes]);

  const categoryPathByNodeId = useMemo(() => {
    const buildPath = (nodeId) => {
      const path = [];
      let current = categoryTreeNodes?.[nodeId];

      while (current) {
        const categoryName = categories?.[current.category_id]?.name ?? `Категория #${current.category_id}`;
        path.unshift(categoryName);
        current = categoryTreeNodes?.[current.parent_id];
      }

      return path.join(' / ');
    };

    const map = {};
    for (const nodeId in categoryTreeNodes) {
      map[nodeId] = buildPath(parseInt(nodeId));
    }
    return map;
  }, [categoryTreeNodes, categories]);

  useEffect(() => {
    loadLinked();
  }, [id]);

  useEffect(() => {
    loadAvailable();
  }, [id, year]);

  useEffect(() => {
    if (selectedCategoryId) {
      categoryTreeService.getSubtreeNodeIds(selectedCategoryId)
        .then(setSubtreeNodeIds)
        .catch(() => setSubtreeNodeIds([]));
    } else {
      setSubtreeNodeIds([]);
    }
  }, [selectedCategoryId]);

  const loadLinked = async () => {
    const { entities } = await customReportProfileUnitService.getPlannedIndicators(id);
    setLinkedIndicators(entities);
  };

  const loadAvailable = async () => {
    const { entities } = await plannedIndicatorService.getByProfileUnitAndYear(id, year);
    setAllIndicators(entities);
  };

  const handleAttach = async () => {
    if (!selectedIndicator) return;
    await customReportProfileUnitService.attachPlannedIndicator(id, {
      planned_indicator_id: selectedIndicator.id,
    });
    setSelectedIndicator(null);
    loadLinked();
  };

  const handleDetach = async (indicatorId) => {
    await customReportProfileUnitService.detachPlannedIndicator(id, indicatorId);
    loadLinked();
  };

  const filteredIndicators = useMemo(() => {
    let result = allIndicators;

    if (selectedCategoryId && subtreeNodeIds.length > 0) {
      result = result.filter((i) => subtreeNodeIds.includes(i.node_id));
    }

    if (searchText.trim() !== '') {
      const lower = searchText.trim().toLowerCase();
      result = result.filter(
        (i) =>
          (i.name && i.name.toLowerCase().includes(lower)) ||
          (i.description && i.description.toLowerCase().includes(lower))
      );
    }

    return result;
  }, [allIndicators, selectedCategoryId, subtreeNodeIds, searchText]);

  const toggleSelection = (id) => {
    setSelectedIndicators((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAttachMultiple = async () => {
    for (const pid of selectedIndicators) {
      await customReportProfileUnitService.attachPlannedIndicator(id, {
        planned_indicator_id: pid,
      });
    }
    setSelectedIndicators([]);
    loadLinked();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Настройка индикаторов</Typography>


      <List>
        {linkedIndicators.map((indicator) => (
          <ListItem key={indicator.id}
            secondaryAction={
              <IconButton onClick={() => handleDetach(indicator.id)} color="error">
                <Delete />
              </IconButton>
            }>
            <ListItemText
              primary={`ID: ${indicator.id}`}
              secondary={indicator.name || indicator.description || 'Без названия'}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="year-label">Год</InputLabel>
          <Select
            labelId="year-label"
            value={year}
            label="Год"
            onChange={(e) => setYear(e.target.value)}
          >
            {yearOptions.map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 300 }}>
          <InputLabel id="category-label">Категория</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategoryId ?? ''}
            label="Категория"
            onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
          >
            {categoryOptions.map((c) => (
              <MenuItem key={c.id} value={c.id}>{c.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Поиск"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ width: 300 }}
      />
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Доступные индикаторы
        </Typography>

        <Paper variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" />
                <TableCell>ID</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Описание</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIndicators.map((indicator) => (
                <TableRow key={indicator.id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedIndicators.includes(indicator.id)}
                      onChange={() => toggleSelection(indicator.id)}
                    />
                  </TableCell>
                  <TableCell>{indicator.id}</TableCell>
                  <TableCell>
                    {categoryPathByNodeId?.[indicator.node_id] || `node #${indicator.node_id}`}
                  </TableCell>
                  <TableCell>{indicator.description || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleAttachMultiple}
            disabled={selectedIndicators.length === 0}
          >
            Добавить выбранные
          </Button>
          <Button onClick={() => setSelectedIndicators([])}>Очистить выбор</Button>
        </Box>
      </Box>

      <Button sx={{ mt: 4 }} onClick={() => history.goBack()}>Назад</Button>
    </Box>
  );
};

export default ProfileUnitPlannedIndicatorsPage;
