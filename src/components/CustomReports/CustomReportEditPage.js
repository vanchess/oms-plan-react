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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

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

  const [isEditing, setIsEditing] = useState(false);

  const [editingProfileId, setEditingProfileId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedShortName, setEditedShortName] = useState('');

  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

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
  };

  const handleCancelEditProfile = () => {
    setEditingProfileId(null);
    setEditedName('');
    setEditedShortName('');
  };

  const handleSaveProfile = () => {
    dispatch(updateProfile({
      id: editingProfileId,
      name: editedName,
      short_name: editedShortName,
    }));
    handleCancelEditProfile();
  };

  const handleAddProfile = () => {
    dispatch(addProfile({
      custom_report_id: reportIdNumber,
      name: newProfileName,
      short_name: newProfileShortName,
      code: `${Date.now()}`, // временный код, можно заменить
    }));
    setNewProfileName('');
    setNewProfileShortName('');
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