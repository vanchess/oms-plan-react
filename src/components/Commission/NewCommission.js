import { Button, TextField } from "@mui/material";
import React from "react";

import 'dayjs/locale/ru';

import * as dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LoadingButton } from "@mui/lab";
import { commissionDecisionAdd } from "../../store/commissionDecision/CommissionDecisionStore";
import { useDispatch } from "react-redux";

export default function NewCommission(props) {
    const dispatch = useDispatch();
    const [dateValue, setDateValue] = React.useState(null);
    const [numberValue, setNumberValue] = React.useState('');
    const [descriptionValue, setDescriptionValue] = React.useState('');
    const loading = false;

    const onClick = () => {
        dispatch(commissionDecisionAdd(
            {
                number: numberValue,
                date: dateValue,
                description: descriptionValue,
            }
        ))
    }

    return (
        <form>
            <TextField
                required
                value={numberValue}
                onChange={(e) => setNumberValue(e.target.value)}
                label="Номер"
                size="small"
            />
            <LocalizationProvider dateAdapter={ AdapterDayjs } adapterLocale={'ru'}>
                <DatePicker
                    label="Дата"
                    value={dayjs(dateValue)}
                    onChange={(newValue) => {
                        const date = new Date( Date.UTC(
                            newValue.get('year'),
                            newValue.get('month'),
                            newValue.get('date')
                        ));
                        setDateValue(date);
                    }}
                    slotProps={{ textField: { required: true, size:'small' } }}
                />
            </LocalizationProvider>
            <TextField
                value={descriptionValue}
                onChange={(e) => setDescriptionValue(e.target.value)}
                label="Описание"
                size="small"
            />
            <LoadingButton 
                variant="contained" 
                size="large" 
                onClick={onClick}
                loading={loading}>
                    Добавить
            </LoadingButton>
        </form>
    );
}