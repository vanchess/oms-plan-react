import React, { useEffect, useMemo, useState } from 'react';
import {
  List, ListItem, ListItemText, IconButton, Box, Typography, Button,
  Autocomplete, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useParams, useHistory } from 'react-router-dom';
import { customReportProfileUnitService } from '../../services/api/customReportProfileUnitService';
import { plannedIndicatorService } from '../../services/api/plannedIndicatorService';

const ProfileUnitPlannedIndicatorsPage = () => {
  const { id } = useParams(); // id профиля юнита
  const history = useHistory();

  const [linkedIndicators, setLinkedIndicators] = useState([]);
  const [allIndicators, setAllIndicators] = useState([]);
  const [selectedIndicator, setSelectedIndicator] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());

  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    return Array.from({ length: current - 2021 + 2 }, (_, i) => 2021 + i);
  }, []);

  useEffect(() => {
    loadLinked();
  }, [id]);

  useEffect(() => {
    loadIndicators();
  }, [year]);

  const loadLinked = async () => {
    const { entities } = await customReportProfileUnitService.getPlannedIndicators(id);
    setLinkedIndicators(entities);
  };

  const loadIndicators = async () => {
    const { entities } = await plannedIndicatorService.getByYear(year);
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
    await customReportProfileUnitService.detachPlannedIndicator(id, {
      planned_indicator_id: indicatorId,
    });
    loadLinked();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Настройка индикаторов</Typography>

      <FormControl sx={{ mb: 3, minWidth: 160 }}>
        <InputLabel id="year-label">Год</InputLabel>
        <Select
          labelId="year-label"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          label="Год"
        >
          {yearOptions.map((y) => (
            <MenuItem key={y} value={y}>{y}</MenuItem>
          ))}
        </Select>
      </FormControl>

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
              secondary={indicator.name || 'Без названия'}
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Autocomplete
          sx={{ width: 400 }}
          options={allIndicators}
          getOptionLabel={(opt) => `#${opt.id} ${opt.name ?? ''}`}
          value={selectedIndicator}
          onChange={(e, value) => setSelectedIndicator(value)}
          renderInput={(params) => <TextField {...params} label="Добавить индикатор" />}
        />
        <Button
          variant="contained"
          onClick={handleAttach}
          disabled={!selectedIndicator}
        >
          Добавить
        </Button>
      </Box>

      <Button sx={{ mt: 4 }} onClick={() => history.goBack()}>Назад</Button>
    </Box>
  );
};

export default ProfileUnitPlannedIndicatorsPage;