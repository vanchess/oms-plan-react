import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCustomReports,
  createCustomReport,
  updateCustomReport,
  deleteCustomReport,
} from '../../store/customReport/customReportSlice';
import CustomReportForm from './CustomReportForm';
import {
  List, ListItem, ListItemText, IconButton, TextField, Button,
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

const CustomReportsStartPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.customReports);

  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', short_name: '' });

  useEffect(() => {
    dispatch(fetchCustomReports());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteCustomReport(id));
  };

  const startEdit = (report) => {
    setEditingId(report.id);
    setEditData({ name: report.name, short_name: report.short_name || '' });
  };

  const saveEdit = () => {
    dispatch(updateCustomReport({ id: editingId, data: editData }));
    setEditingId(null);
  };

  return (
    <div>
      <h2>Отчеты</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}

      <List>
        {items?.map((report) => (
          <ListItem key={report.id} divider>
            {editingId === report.id ? (
              <>
                <TextField
                  label="Название"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <TextField
                  label="Краткое имя"
                  value={editData.short_name}
                  onChange={(e) => setEditData({ ...editData, short_name: e.target.value })}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <IconButton onClick={saveEdit} color="primary">
                  <Save />
                </IconButton>
              </>
            ) : (
              <>
                <ListItemText primary={report.name} secondary={report.short_name} />
                <IconButton onClick={() => startEdit(report)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => handleDelete(report.id)} color="error">
                  <Delete />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>

      <h1>Создание пользовательского отчета</h1>
      <CustomReportForm />
    </div>
  );
};

export default CustomReportsStartPage;