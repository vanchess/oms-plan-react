import React, { useEffect, useMemo, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Button,
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
  const { id } = useParams();
  const history = useHistory();

  const [linkedIndicators, setLinkedIndicators] = useState([]);
  const [allIndicators, setAllIndicators] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subtreeNodeIds, setSubtreeNodeIds] = useState([]);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({ indicator: '', care_profile: '', assistance_type: '', profile: '', service: '', vmp_group: '' });

  const categoryTree = useSelector(categoryTreeSelector);
  const categoryTreeNodes = useSelector(state => state.categoryTreeNodes.entities);
  const categories = useSelector(state => state.category.entities);
  const indicators = useSelector(state => state.indicator.entities);
  const careProfiles = useSelector(state => state.careProfiles.entities);
  const assistanceTypes = useSelector(state => state.medicalAssistanceTypes.entities);
  const profiles = useSelector(state => state.hospitalBedProfiles.entities);
  const services = useSelector(state => state.medicalServices.entities);
  const vmpGroups = useSelector(state => state.vmpGroups.entities);

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

      if (!children) return [option];
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

  useEffect(() => { loadLinked(); }, [id]);
  useEffect(() => { loadAvailable(); }, [id, year]);

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

  const handleDetach = async (indicatorId) => {
    await customReportProfileUnitService.detachPlannedIndicator(id, indicatorId);
    loadLinked();
  };

  const filteredIndicators = useMemo(() => {
    let result = allIndicators;

    if (selectedCategoryId && subtreeNodeIds.length > 0) {
      result = result.filter((i) => subtreeNodeIds.includes(i.node_id));
    }

    if (filters.indicator) {
      result = result.filter((i) => i.indicator_id === parseInt(filters.indicator));
    }
    if (filters.care_profile) {
      result = result.filter((i) => i.care_profile_id === parseInt(filters.care_profile));
    }
    if (filters.assistance_type) {
      result = result.filter((i) => i.assistance_type_id === parseInt(filters.assistance_type));
    }
    if (filters.profile) {
      result = result.filter((i) => i.profile_id === parseInt(filters.profile));
    }
    if (filters.service) {
      result = result.filter((i) => i.service_id === parseInt(filters.service));
    }
    if (filters.vmp_group) {
      result = result.filter((i) => i.vmp_group_id === parseInt(filters.vmp_group));
    }

    if (searchText.trim()) {
      const lower = searchText.trim().toLowerCase();
      result = result.filter(
        (i) => (i.name && i.name.toLowerCase().includes(lower)) ||
               (i.description && i.description.toLowerCase().includes(lower))
      );
    }

    return result;
  }, [allIndicators, selectedCategoryId, subtreeNodeIds, searchText, filters]);

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
          <ListItem key={indicator.id} secondaryAction={
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

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
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

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Показатель</InputLabel>
          <Select
            label="Показатель"
            value={filters.indicator}
            onChange={(e) => setFilters({ ...filters, indicator: e.target.value })}
          >
            <MenuItem value="">Все</MenuItem>
            {Object.values(indicators).map((ind) => (
              <MenuItem key={ind.id} value={ind.id}>{ind.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Профиль МП</InputLabel>
          <Select
            label="Профиль МП"
            value={filters.care_profile}
            onChange={(e) => setFilters({ ...filters, care_profile: e.target.value })}
          >
            <MenuItem value="">Все</MenuItem>
            {Object.values(careProfiles).map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Тип помощи</InputLabel>
          <Select
            label="Тип помощи"
            value={filters.assistance_type}
            onChange={(e) => setFilters({ ...filters, assistance_type: e.target.value })}
          >
            <MenuItem value="">Все</MenuItem>
            {Object.values(assistanceTypes).map((t) => (
              <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Койки</InputLabel>
          <Select
            label="Койки"
            value={filters.profile}
            onChange={(e) => setFilters({ ...filters, profile: e.target.value })}
          >
            <MenuItem value="">Все</MenuItem>
            {Object.values(profiles).map((p) => (
              <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Услуга</InputLabel>
          <Select
            label="Услуга"
            value={filters.service}
            onChange={(e) => setFilters({ ...filters, service: e.target.value })}
          >
            <MenuItem value="">Все</MenuItem>
            {Object.values(services).map((s) => (
              <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel>Группа ВМП</InputLabel>
          <Select
            label="Группа ВМП"
            value={filters.vmp_group}
            onChange={(e) => setFilters({ ...filters, vmp_group: e.target.value })}
          >
            <MenuItem value="">Все</MenuItem>
            {Object.values(vmpGroups).map((g) => (
              <MenuItem key={g.id} value={g.id}>{g.code}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Поиск"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ width: 300, mb: 2 }}
      />

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

      <Button sx={{ mt: 4 }} onClick={() => history.goBack()}>Назад</Button>
    </Box>
  );
};

export default ProfileUnitPlannedIndicatorsPage;
