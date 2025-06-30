import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createCustomReport } from '../../store/customReport/customReportSlice';

const CustomReportForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCustomReport({ name, short_name: shortName }));
    setName('');
    setShortName('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: 400,
        marginTop: 2
      }}
    >
      <TextField
        label="Название отчета"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        label="Краткое наименование"
        value={shortName}
        onChange={(e) => setShortName(e.target.value)}
      />
      <Button variant="contained" type="submit">
        Создать отчет
      </Button>
    </Box>
  );
};

export default CustomReportForm;
