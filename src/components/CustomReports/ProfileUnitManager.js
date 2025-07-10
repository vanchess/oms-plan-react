import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { customReportProfileUnitService } from '../../services/api/customReportProfileUnitService';

const ProfileUnitManager = ({ profileId, availableUnits }) => {
  const [linkedUnits, setLinkedUnits] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState('');
  const history = useHistory();

  const loadLinkedUnits = async () => {
    const { entities } = await customReportProfileUnitService.getByProfile(profileId);
    setLinkedUnits(entities);
  };

  useEffect(() => {
    loadLinkedUnits();
  }, [profileId]);

  const handleAddUnit = async () => {
    if (selectedUnitId) {
      await customReportProfileUnitService.add({ profile_id: profileId, unit_id: selectedUnitId });
      setSelectedUnitId('');
      loadLinkedUnits();
    }
  };

  const handleRemove = async (unitLinkId) => {
    await customReportProfileUnitService.remove(unitLinkId);
    loadLinkedUnits();
  };

  const handleEditLink = (unitLinkId) => {
    history.push(`/reports/profile-unit/${unitLinkId}/edit`);
  };

  const linkedUnitIds = linkedUnits.map(u => u.unit_id);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Характеристики профиля</Typography>

      <List>
        {linkedUnits.map((link) => (
          <ListItem
            key={link.id}
            secondaryAction={
              <>
                <IconButton onClick={() => handleEditLink(link.id)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleRemove(link.id)} color="error">
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={
                availableUnits.find(u => u.id === link.unit_id)?.name ||
                `Unit #${link.unit_id}`
              }
            />
          </ListItem>
        ))}
      </List>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        <FormControl sx={{ minWidth: 240 }}>
          <InputLabel id="unit-select-label">Добавить характеристику</InputLabel>
          <Select
            labelId="unit-select-label"
            value={selectedUnitId}
            label="Добавить характеристику"
            onChange={(e) => setSelectedUnitId(e.target.value)}
          >
            {availableUnits
              .filter((u) => !linkedUnitIds.includes(u.id))
              .map((unit) => (
                <MenuItem key={unit.id} value={unit.id}>{unit.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddUnit} disabled={!selectedUnitId}>
          Добавить
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileUnitManager;
