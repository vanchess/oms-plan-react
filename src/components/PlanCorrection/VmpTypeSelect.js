import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { vmpTypesSelector } from '../../store/vmpTypes/vmpTypesSelectors';

export default function VmpTypeSelect(props) {
    const {typeIds, onChange } = props;

    const [selectedId, setSelectedId] = useState('')
    const types = useSelector(vmpTypesSelector);

    useEffect(() => {
        onChange(null);
        return () => {
            onChange(null);
        }
    }, [])

    useEffect(() => {
        if(typeIds.length === 1) {
            selectId(typeIds[0]);
        }
    }, [typeIds])

    const selectId = (id) => {
        const newId = Number(id);
        setSelectedId(newId);
        onChange(newId);
    }

    const handleChange = (e) => {
        selectId(e.target.value);
    }

    return (
        <FormControl margin="dense" fullWidth size="small">
            <InputLabel>Наименование вида ВМП</InputLabel>
            <Select
                value={selectedId}
                onChange={handleChange}
                label={'Наименование вида ВМП'}
            >
                { typeIds.map(id => {
                    return (
                    <MenuItem key={id} value={id}>{types[id].name}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
)
}