import React from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { INFINITE_DATE } from '../../constants/dateTimeConstants';

const ProfileEditForm = ({
  profile,
  relationTypes,
  state,
  setState,
  onSave,
  onCancel,
}) => {
  const {
    name,
    shortName,
    code,
    relationType,
    effectiveFrom,
    effectiveTo,
    order,
  } = state;

  return (
    <>
      <TextField
        label="Название"
        value={name}
        onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Краткое наименование"
        value={shortName}
        onChange={(e) => setState((s) => ({ ...s, shortName: e.target.value }))}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Код"
        value={code}
        onChange={(e) => setState((s) => ({ ...s, code: e.target.value }))}
        fullWidth
        sx={{ mb: 1 }}
      />
      <FormControl fullWidth sx={{ mb: 1 }}>
        <InputLabel id="relation-type-label">Тип связи</InputLabel>
        <Select
          labelId="relation-type-label"
          value={relationType}
          onChange={(e) => setState((s) => ({ ...s, relationType: e.target.value }))}
          label="Тип связи"
          displayEmpty
        >
          <MenuItem value="">Тип связи не выбран</MenuItem>
          {relationTypes?.map((type) => (
            <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="de">
        <DatePicker
          label="Действует с"
          value={effectiveFrom}
          onChange={(date) => setState((s) => ({ ...s, effectiveFrom: date }))}
          sx={{ mb: 1, mr: 1 }}
        />
        <DatePicker
          label="Действует до"
          value={effectiveTo}
          onChange={(date) => setState((s) => ({ ...s, effectiveTo: date }))}
          slotProps={{
            textField: {
              helperText: !effectiveTo ? 'Бессрочно' : '',
            },
          }}
          sx={{ mb: 1, ml: 2 }}
        />
      </LocalizationProvider>
      <TextField
        label="Порядок"
        value={order}
        type="number"
        onChange={(e) => setState((s) => ({ ...s, order: e.target.value }))}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button size="small" variant="contained" onClick={onSave} sx={{ mr: 1 }}>
        Сохранить
      </Button>
      <Button size="small" variant="outlined" onClick={onCancel}>
        Отмена
      </Button>
    </>
  );
};

export default ProfileEditForm;
