import { LoadingButton } from '@mui/lab';
import { Alert, Box, Collapse, Grid, Stack, TextField } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectedYearSelector } from '../../store/nodeData/nodeDataSelectors';
import { periodIdsBetweenSelector, periodIdsByYearSelector, periodsSelector } from '../../store/period/periodSelectors';
import { DateTime } from '../../_helpers/dateTime';
import SaveIcon from '@mui/icons-material/Save';
import { getAlgorithmIdByIndicatorId, plannedIndicatorChangeByPackageIdHaveStatusSelector } from '../../store/plannedIndicatorChange/plannedIndicatorChangeSelectors';
import { commissionDecisionByIdSelector, editableCommissionDecisionIdSelector } from '../../store/commissionDecision/CommissionDecisionSelector';
import { plannedIndicatorByIdSelector } from '../../store/plannedIndicator/plannedIndicatorSelectors';
import { changePackageIdByEditableCommissionDecisionIdSelector } from '../../store/changePackage/changePackageSelectors';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });
const twoDecimalNoGrouping = new Intl.NumberFormat('en', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: false });

const toCorrectNumberString = str => {
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
    const { plannedIndicatorId, saveValue, disabled, hasСhanges } = props;
    const plannedIndicator = useSelector(store => plannedIndicatorByIdSelector(store, plannedIndicatorId));
    const indicatorId = plannedIndicator?.indicator_id;
    const [periodValue, setPeriodValue] = useState({});
    const [totalValue, setTotalValue] = useState(0);
    const [valuesСhanged, setValuesСhanged] = useState(true);
    const year = useSelector(selectedYearSelector);
    const periodIds = useSelector(store => periodIdsByYearSelector(store, year));
    const periods = useSelector(periodsSelector);
    const commissionDecisionId = useSelector(editableCommissionDecisionIdSelector);
    const commissionDecision = useSelector(store => commissionDecisionByIdSelector(store, commissionDecisionId));
    const commissionDecisionStartOfMonth = useMemo(() => DateTime.fromISO(commissionDecision?.date).startOf('month'), [commissionDecision]);
    const commissionDecisionEndOfYear = useMemo(() => DateTime.fromISO(commissionDecision?.date).endOf('year'), [commissionDecision]);
    const packageId = useSelector(store => changePackageIdByEditableCommissionDecisionIdSelector(store, commissionDecisionId));
    const periodIdsBetween = useSelector(store => periodIdsBetweenSelector(store, commissionDecisionStartOfMonth, commissionDecisionEndOfYear));
    const saving = useSelector(store => plannedIndicatorChangeByPackageIdHaveStatusSelector(store, {plannedIndicatorIds:[plannedIndicatorId], periodIds, packageId}, 'saving'));
    const error = useSelector(store => plannedIndicatorChangeByPackageIdHaveStatusSelector(store, {plannedIndicatorIds:[plannedIndicatorId], periodIds, packageId}, 'error'));
    const algorithmId = getAlgorithmIdByIndicatorId(indicatorId);

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
    }, [periodIds, algorithmId])

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
        let total = toCorrectNumberString(totalValue);
        if (algorithmId === 1) {
            total = toNumberString(Object.values(v).reduce((total, cur) => total + toNumber(cur.value ?? '0'), 0));
        }
        saveValue(
            {values:v, total}
        );

        setValuesСhanged(false);
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
            if (algorithmId === 1) {
                setTotalValue('');
            } else {
                setTotalValue(newTotalValueStr);
            }
            return pValues;
        });
        setValuesСhanged(true);
    }

    const handleYearValueChange = e => {
        const strNewValue = numderFromInputElementFormat(e.target.value);
        const newValue = toNumber(strNewValue);
        if (isNaN(newValue)) {
            return;
        }

        let pValues = periodIds.reduce((prev, cur) => {prev[cur] = '0'; return prev;}, {});
        if (algorithmId === 1) {
            const oneMonthValue = newValue;
            for(let i = 0; i < periodIdsBetween.length; i++) {
                const periodId = periodIdsBetween[i];
                pValues[periodId] = toNumberString(oneMonthValue);
            }
        } else {
            const oneMonthValue = Math.floor(newValue / periodIds.length);
            let remainder = newValue - (oneMonthValue * periodIds.length);

            pValues = periodIds.reduce((prev, cur) => {prev[cur] = toNumberString(oneMonthValue); return prev;}, {});

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
        }
        
        setPeriodValue(pValues);
        setTotalValue(strNewValue);
        setValuesСhanged(true);
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
                            disabled={disabled || (!totalValueIsSet && !periodValueIsSet) || (!valuesСhanged && !hasСhanges) }
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