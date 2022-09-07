import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { moSelector } from '../../store/mo/moSelectors';


export default function MoSelect(props) {
    const {moIds, onChange } = props;

    const [selectedId, setSelectedId] = useState('')
    const mo = useSelector(moSelector);

    useEffect(() => {
        onChange(null);
        return () => {
            onChange(null);
        };
    }, [])

    const handleChange = (e) => {
        const newId = Number(e.target.value);
        setSelectedId(newId);
        onChange(newId);
    }

    return (
        <FormControl margin="dense" fullWidth size="small">
            <InputLabel>Медицинская организация</InputLabel>
            <Select
                value={selectedId}
                onChange={handleChange}
                label={'Медицинская организация'}
            >
                { moIds.map(id => {
                    return (
                    <MenuItem key={id} value={id}>{mo[id].short_name}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
)
}