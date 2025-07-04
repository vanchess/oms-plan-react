import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchCustomReports,
  updateCustomReport,
} from '../../store/customReport/customReportSlice';
import {
  fetchProfilesByReportId,
  addProfile,
  updateProfile,
  deleteProfile,
} from '../../store/customReport/customReportProfileSlice';
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelationTypes } from '../../store/customReport/relationTypeSlice';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { DateTime } from 'luxon';
import { INFINITE_DATE } from '../../constants/dateTimeConstants';

const toEffectiveToDb = (date) =>
  date ? date.toISO() : INFINITE_DATE;

const CustomReportEditPage = () => {
  const { reportId } = useParams();
  const reportIdNumber = useMemo(() => {
    const parsed = parseInt(reportId, 10);
    return isNaN(parsed) ? null : parsed;
  }, [reportId]);

  const dispatch = useDispatch();

  const reports = useSelector(state => state.customReports.items);
  const profiles = useSelector(state => state.customReportsProfile.items);
  const report = reports.find(r => r.id === Number(reportIdNumber));

  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileShortName, setNewProfileShortName] = useState('');
  const [newProfileCode, setNewProfileCode] = useState(`${Date.now()}`);
  const [newProfileRelationType, setNewProfileRelationType] = useState('');
  const [newProfileEffectiveFrom, setNewProfileEffectiveFrom] = useState(null);
  const [newProfileEffectiveTo, setNewProfileEffectiveTo] = useState(null);
  const [newProfileOrder, setNewProfileOrder] = useState('');
  const [newProfileParentId, setNewProfileParentId] = useState('');

  const [isEditing, setIsEditing] = useState(false);

  const [editingProfileId, setEditingProfileId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedShortName, setEditedShortName] = useState('');
  const [editedCode, setEditedCode] = useState('');
  const [editedRelationType, setEditedRelationType] = useState('');
  const [editedEffectiveFrom, setEditedEffectiveFrom] = useState(null);
  const [editedEffectiveTo, setEditedEffectiveTo] = useState(null);
  const [editedOrder, setEditedOrder] = useState('');
  const [editedParentId, setEditedParentId] = useState('');

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const [editedRelationTypeError, setEditedRelationTypeError] = useState('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // сбрасываем значения
    if (report) {
      setName(report.name || '');
      setShortName(report.short_name || '');
    }
  };

  const handleSaveEdit = () => {
    dispatch(updateCustomReport({ id: reportIdNumber, name, short_name: shortName }));
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(fetchRelationTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCustomReports());
    dispatch(fetchProfilesByReportId(reportIdNumber));
  }, [dispatch, reportIdNumber]);

  useEffect(() => {
    if (report) {
      setName(report.name || '');
      setShortName(report.short_name || '');
    }
  }, [report]);

  const handleStartEditProfile = (profile) => {
    setEditingProfileId(profile.id);
    setEditedName(profile.name);
    setEditedShortName(profile.short_name);
    setEditedCode(profile.code);
    setEditedRelationType(profile.relation_type_id ?? '');
    setEditedEffectiveFrom(profile.effective_from ? DateTime.fromISO(profile.effective_from) : null);
    setEditedEffectiveTo(profile.effective_to ? DateTime.fromISO(profile.effective_to) : null);
    setEditedEffectiveTo(profile.effective_to === INFINITE_DATE ? null : DateTime.fromISO(profile.effective_to));
    setEditedOrder(profile.order ?? '');
    setEditedParentId(profile.parent_id ?? '');
  };

  const handleCancelEditProfile = () => {
    setEditingProfileId(null);
    setEditedName('');
    setEditedShortName('');
    setEditedCode('');
    setEditedRelationType('');
    setEditedEffectiveFrom(null);
    setEditedEffectiveTo(null);
    setEditedOrder('');
    setEditedParentId('');
  };

  const handleSaveProfile = () => {
    if (editedParentId && !editedRelationType) {
      setEditedRelationTypeError('Тип связи обязателен при наличии родителя');
      return;
    }
    setEditedRelationTypeError('');

    dispatch(updateProfile({
      id: editingProfileId,
      name: editedName,
      short_name: editedShortName,
      code: editedCode,
      parent_id: editedParentId || null,
      relation_type_id: editedRelationType,
      effective_from: editedEffectiveFrom?.toISO() ?? null,
      effective_to: toEffectiveToDb(editedEffectiveTo),
      order: editedOrder ? parseInt(editedOrder, 10) : null,
    }));
    handleCancelEditProfile();
  };

  const handleAddProfile = () => {
    dispatch(addProfile({
      custom_report_id: reportIdNumber,
      name: newProfileName,
      short_name: newProfileShortName,
      code: newProfileCode,
      parent_id: newProfileParentId || null,
      relation_type_id: newProfileRelationType,
      effective_from: newProfileEffectiveFrom?.toISOString() ?? null,
      effective_to: newProfileEffectiveTo?.toISOString() ?? null,
      order: newProfileOrder ? parseInt(newProfileOrder) : null
    }));
    setNewProfileParentId('');
    setNewProfileName('');
    setNewProfileShortName('');
    setNewProfileCode(`${Date.now()}`);
    setNewProfileRelationType('');
    setNewProfileEffectiveFrom(null);
    setNewProfileEffectiveTo(null);
    setNewProfileOrder('');
  };

  const handleDeleteProfile = (profileId) => {
    dispatch(deleteProfile(profileId));
  };

  const handleRequestDeleteProfile = (profileId) => {
    setConfirmDeleteId(profileId);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProfile(confirmDeleteId));
    setConfirmDeleteOpen(false);
    setConfirmDeleteId(null);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
    setConfirmDeleteId(null);
  };

  const relationTypes = useSelector(state => state.customReportsProfileRelationType.items);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Редактирование отчета</Typography>

      <Box sx={{ mt: 3 }}>
        {isEditing ? (
          <>
            <TextField
              label="Название"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Краткое наименование"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" onClick={handleSaveEdit}>Сохранить</Button>
              <Button variant="outlined" onClick={handleCancelEdit}>Отмена</Button>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6">{name}</Typography>
            <Typography variant="subtitle1">{shortName}</Typography>
            <Button sx={{ mt: 2 }} variant="outlined" onClick={handleEditClick}>
              Редактировать название
            </Button>
          </>
        )}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Профили отчета</Typography>
        <List>
          {profiles
            .filter(p => p.custom_report_id === Number(reportIdNumber))
            .map((profile) => (
              <ListItem key={profile.id} alignItems="flex-start">
                {editingProfileId === profile.id ? (
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      label="Название"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Краткое наименование"
                      value={editedShortName}
                      onChange={(e) => setEditedShortName(e.target.value)}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      label="Код"
                      value={editedCode}
                      onChange={(e) => setEditedCode(e.target.value)}
                      fullWidth
                      sx={{ mb: 1 }}
                    />
                    <FormControl fullWidth sx={{ mb: 1 }}>
                      <InputLabel id="edit-parent-label">Родитель</InputLabel>
                      <Select
                        labelId="edit-parent-label"
                        value={editedParentId}
                        onChange={(e) => {
                          const parent = e.target.value;
                          setEditedParentId(parent);
                          if (!parent) {
                            setEditedRelationType('');
                          }
                        }}
                        label="Родитель"
                        displayEmpty
                      >
                        <MenuItem value="">Родитель не указан (корневой)</MenuItem>
                        {profiles
                          .filter(p => p.id !== editingProfileId)
                          .map(p => (
                            <MenuItem key={p.id} value={p.id}>
                              {p.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 1 }} disabled={!editedParentId} error={!!editedRelationTypeError}>
                    <InputLabel id="edit-relation-type-label">Тип связи с родителем</InputLabel>
                      <Select
                        labelId="edit-relation-type-label"
                        value={editedRelationType}
                        onChange={(e) => {
                          setEditedRelationType(e.target.value);
                          setEditedRelationTypeError('');
                        }}
                        label="Тип связи с родителем"
                        displayEmpty
                      >
                        <MenuItem value="">Тип связи с родителем не выбран</MenuItem>
                        {relationTypes?.map(type => (
                          <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
                        ))}
                      </Select>
                      {editedRelationTypeError && (
                        <Typography variant="caption" color="error">{editedRelationTypeError}</Typography>
                      )}
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
                      <DatePicker
                        label="Действует с"
                        value={editedEffectiveFrom}
                        onChange={(date) => setEditedEffectiveFrom(date)}
                        sx={{ mb: 1, mr: 1 }}
                      />
                      <DatePicker
                        label="Действует до"
                        value={editedEffectiveTo}
                        onChange={(date) => setEditedEffectiveTo(date)}
                        slotProps={{
                          textField: {
                            helperText: !editedEffectiveTo ? 'Бессрочно' : '',
                          }
                        }}
                        sx={{ mb: 1, ml: 2 }}
                      />
                      <Button
                        onClick={() => setEditedEffectiveTo(null)}
                        size="small"
                        variant="text"
                        sx={{ mb: 1 }}
                      >
                        Очистить дату окончания
                      </Button>
                    </LocalizationProvider>
                    <TextField
                      label="Порядок"
                      value={editedOrder}
                      type="number"
                      onChange={(e) => setEditedOrder(e.target.value)}
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="contained" onClick={handleSaveProfile}>
                        Сохранить
                      </Button>
                      <Button size="small" variant="outlined" onClick={handleCancelEditProfile}>
                        Отмена
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <>
                    <ListItemText
                      primary={profile.name}
                      secondary={profile.short_name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => {
                        setNewProfileParentId(profile.id);
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                      }}>
                        <Add />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleStartEditProfile(profile)}>
                        <Edit />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleRequestDeleteProfile(profile.id)}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </>
                )}
              </ListItem>
            ))}
        </List>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Добавить профиль</Typography>
          <TextField
            label="Название"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Краткое наименование"
            value={newProfileShortName}
            onChange={(e) => setNewProfileShortName(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Код"
            value={newProfileCode}
            onChange={(e) => setNewProfileCode(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="parent-label">Родитель</InputLabel>
            <Select
              value={newProfileParentId}
              labelId="parent-label"
              label="Родитель"
              onChange={(e) => {
                setNewProfileParentId(e.target.value);
                if (!e.target.value) {
                  setNewProfileRelationType('');
                }
              }}
              displayEmpty
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="">Родитель не указан (корневой)</MenuItem>
              {profiles
                .filter(p => p.id !== editingProfileId)
                .map(profile => (
                  <MenuItem key={profile.id} value={profile.id}>
                    {profile.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }} disabled={!newProfileParentId}>
            <InputLabel id="relation-type-label">Тип связи с родителем</InputLabel>
            <Select
              labelId="relation-type-label"
              value={newProfileRelationType}
              onChange={(e) => setNewProfileRelationType(e.target.value)}
              label="Тип связи с родителем"
              displayEmpty
            >
              <MenuItem value="">
                Тип связи с родителем не выбран
              </MenuItem>
              {relationTypes?.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
            <DatePicker
              label="Действует с"
              value={newProfileEffectiveFrom}
              onChange={(date) => setNewProfileEffectiveFrom(date)}
              sx={{ mb: 2, mr: 2 }}
            />
            <DatePicker
              label="Действует до"
              value={newProfileEffectiveTo}
              onChange={(date) => setNewProfileEffectiveTo(date)}
              sx={{ mb: 2 }}
            />
          </LocalizationProvider>

          <TextField
            label="Порядок"
            value={newProfileOrder}
            type="number"
            onChange={(e) => setNewProfileOrder(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="outlined" onClick={handleAddProfile}>
            Добавить профиль
          </Button>
        </Box>
      </Box>

      <Dialog open={confirmDeleteOpen} onClose={handleCancelDelete}>
        <DialogTitle>Удалить профиль?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот профиль? Это действие необратимо.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Отмена</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomReportEditPage;