import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  fetchCustomReports,
  deleteCustomReport,
} from '../../store/customReport/customReportSlice';
import CustomReportForm from './CustomReportForm';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const CustomReportsStartPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { items, loading, error } = useSelector(state => state.customReports);

  useEffect(() => {
    dispatch(fetchCustomReports());
  }, [dispatch]);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);

  const requestDelete = (report) => {
    setReportToDelete(report);
    setConfirmDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (reportToDelete) {
      dispatch(deleteCustomReport(reportToDelete.id));
      setReportToDelete(null);
      setConfirmDeleteOpen(false);
    }
  };

  const cancelDelete = () => {
    setReportToDelete(null);
    setConfirmDeleteOpen(false);
  };

  const handleEditNavigate = (report) => {
    history.push(`/reports/${report.id}/edit`);
  };

  return (
    <div>
      <h2>Отчеты</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}

      <List>
        {items?.map((report) => (
          <ListItem key={report.id} divider>
            <ListItemText
              primary={report.name}
              secondary={report.short_name}
            />
            <IconButton onClick={() => handleEditNavigate(report)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={() => requestDelete(report)} color="error">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>

      <h1>Создание пользовательского отчета</h1>
      <CustomReportForm />
      <Dialog open={confirmDeleteOpen} onClose={cancelDelete}>
        <DialogTitle>Удалить отчет?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить отчет "{reportToDelete?.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Отмена</Button>
          <Button onClick={confirmDelete} color="error">Удалить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomReportsStartPage;