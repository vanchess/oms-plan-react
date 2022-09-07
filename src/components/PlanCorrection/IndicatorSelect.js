import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { indicatorsSelector } from '../../store/indicator/indicatorSelectors';

export default function IndicatorSelect(props) {
    const {indicatorIds, onChange } = props;

    const [selectedId, setSelectedId] = useState('')
    const indicators = useSelector(indicatorsSelector);

    useEffect(() => {
        onChange(null);
        return () => {
            onChange(null);
        }
    }, [])

    const handleChange = (e) => {
        const newId = Number(e.target.value);
        setSelectedId(newId);
        onChange(newId);
    }

    return (
        <FormControl margin='dense' fullWidth size="small">
            <InputLabel>Показатель</InputLabel>
            <Select
                value={selectedId}
                onChange={handleChange}
                label={'Показатель'}
            >
                { indicatorIds.map(id => {
                    return (
                    <MenuItem key={id} value={id}>{indicators[id].name}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
)
}