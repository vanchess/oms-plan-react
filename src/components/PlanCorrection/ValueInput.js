import { LoadingButton } from '@mui/lab';
import { Alert, Box, Collapse, Grid, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedYearSelector } from '../../store/nodeData/nodeDataSelectors';
import { periodIdsByYearSelector, periodsSelector } from '../../store/period/periodSelectors';
import { DateTime } from '../../_helpers/dateTime';
import SaveIcon from '@mui/icons-material/Save';
import { plannedIndicatorChangeByPackageIdHaveStatusSelector } from '../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });
const twoDecimalNoGrouping = new Intl.NumberFormat('en', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: false });

const toCorrectNumberString = str => {
    console.log(str);
    if (str === '-' || str === '0-' || str === '-.' || str === '.') {
        return '0';
    }
    return str.replace(',','.').replace(/^(-?)([.,]\d+)/, (m, p1, p2) => `${p1}0${p2}`)
}

const toNumber = str => {
    return Number(toCorrectNumberString(str));
}
const toNumberString = num => twoDecimalNoGrouping.format(num);

const numderFromInputElementFormat = str => str.replace(/\s/g, '').replace(/([.,]\d{2})\d*/, '$1');

const numberToInputElementFormat = str => {
    const separator = '.';
    if (str === '') {
        return '';
    }
    if (typeof(str) === 'string') {
        if (str === '-' || str === '0-' || str === '-.') {
            return '-';
        }
        let end = '';
        if (str.endsWith('.') || str.endsWith(',')) {
            end = separator;
        }
        if (str.endsWith('.0') || str.endsWith(',0')) {
            end = separator + '0';
        }
        if(str.endsWith('.00') || str.endsWith(',00')){
            end = separator + '00';
        }
        let result = twoDecimalNoGrouping.format(toNumber(str)) + end;
        if (str.search(/^(-?)([.,]\d+)/) === 0) {
            result = result.replace(/^(-?)0([.,]\d+)/, '$1$2');
        }
        return result;
    }
    return '';
}

export default function ValueInput(props) {
    const { plannedIndicatorId, saveValue, disabled } = props;
    const [periodValue, setPeriodValue] = useState({});
    const [totalValue, setTotalValue] = useState(0);
    const year = useSelector(selectedYearSelector);
    const periodIds = useSelector(store => periodIdsByYearSelector(store, year));
    const periods = useSelector(periodsSelector);
    const saving = useSelector(store => plannedIndicatorChangeByPackageIdHaveStatusSelector(store, {plannedIndicatorIds:[plannedIndicatorId], periodIds, packageId:null}, 'saving'));
    const error = useSelector(store => plannedIndicatorChangeByPackageIdHaveStatusSelector(store, {plannedIndicatorIds:[plannedIndicatorId], periodIds, packageId:null}, 'error'));
    
    const totalValueIsSet = totalValue && toNumber(totalValue);
    let periodValueIsSet = false;
    for (let i = 0; i < periodIds.length; i++) {
        if (periodValue[periodIds[i]] && toNumber(periodValue[periodIds[i]])) {
            periodValueIsSet = true;
            break;
        }
    }

    useEffect(() => {
        setPeriodValue(
            periodIds.reduce((prev, cur) => {prev[cur] = null; return prev;}, {})
        );
        setTotalValue(0);
    }, [periodIds])

    if (!periodIds.length) {
        return <div>Отсутствуют периоды планирования на {year} год...</div>
    }

    const handleSave = () => {
        const v = Object.keys(periodValue).reduce((prev, periodId) => {
            if (periodValue[periodId] === undefined || periodValue[periodId] === null) {
                return prev;
            }
            prev.push({periodId:Number(periodId), value:toCorrectNumberString(periodValue[periodId])});
            return prev;
        }, []);
        const total = toCorrectNumberString(totalValue);
        saveValue(
            {values:v, total}
        );
    }

    const handlePeriodValueChange = (periodId, e) => {
        const strNewValue = numderFromInputElementFormat(e.target.value);
      
        const newValue = toNumber(strNewValue);
        if (isNaN(newValue)) {
            return;
        }
      
        setPeriodValue((v) => {
            const pValues = {...v, [periodId]:strNewValue};
            const newTotalValue = Object.values(pValues).reduce((total, cur) => total + toNumber(cur ?? '0'), 0);
            const newTotalValueStr = toNumberString(newTotalValue);
            setTotalValue(newTotalValueStr);
            return pValues;
        });
        
    }

    const handleYearValueChange = e => {
        const strNewValue = numderFromInputElementFormat(e.target.value);
console.log(e.target.value);
        const newValue = toNumber(strNewValue);
        if (isNaN(newValue)) {
            return;
        }

        const oneMonthValue = Math.floor(newValue / periodIds.length);

        let remainder = newValue - (oneMonthValue * periodIds.length);

        const pValues = periodIds.reduce((prev, cur) => {prev[cur] = toNumberString(oneMonthValue); return prev;}, {});

        const lastPeriodId = periodIds[periodIds.length-1]
        pValues[lastPeriodId] = toNumberString(toNumber(pValues[lastPeriodId]) + remainder - Math.floor(remainder));

        remainder = Math.floor(remainder);
        if(remainder != 0) {
            const d = (remainder > 0) ? 1 : -1;
            const t = Math.abs(remainder);
            const step = Math.floor(periodIds.length / t);
            for (let j=0; j < t; j++) {
                const key = periodIds.length - 1 - (step * j);
                const periodId = periodIds[key];
                pValues[periodId] = toNumberString(toNumber(pValues[periodId]) + d);
            }
        }
        //pValues.
        setPeriodValue(pValues);
        setTotalValue(strNewValue);
    }

    return (
        <React.Fragment>
            <TextField
                disabled={disabled || saving}
                autoComplete='off'
                margin="dense" 
                fullWidth 
                size='small'
                id="outlined-number"
                label="Корректировка"
                value={numberToInputElementFormat(totalValue)}
                onChange={handleYearValueChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Grid container columns={periodIds.length} >
                { periodIds.map(periodId => {
                    const periodName = DateTime.toMonthString(periods[periodId].from);
                    return (
                    <Grid key={periodId} item xs={2}>
                        <TextField
                            disabled={disabled || saving}
                            autoComplete='off'
                            margin="dense" 
                            fullWidth 
                            size='small'
                            id="outlined-number"
                            label={periodName}
                            value={numberToInputElementFormat(periodValue[periodId])}
                            onChange={(e) => handlePeriodValueChange(periodId,e)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
            )})}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="end">
                        <Collapse in={error}>
                            <Alert severity="error">Произошла ошибка! Данные не сохранены. Обновите страницу</Alert>
                        </Collapse>
                        <LoadingButton
                            disabled={disabled || (!totalValueIsSet && !periodValueIsSet) }
                            size="small"
                            color={error?"error":"secondary"}
                            onClick={handleSave}
                            loading={saving}
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="contained"
                            >
                            Сохранить
                        </LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}