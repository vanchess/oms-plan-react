import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { careProfilesSelector } from '../../store/careProfiles/careProfilesSelectors';

export default function CareProfileSelect(props) {
    const {profileIds, onChange } = props;

    const [selectedId, setSelectedId] = useState('')
    const profiles = useSelector(careProfilesSelector);

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
        <FormControl margin="dense" fullWidth size="small">
            <InputLabel>Профиль медицинской помощи</InputLabel>
            <Select
                value={selectedId}
                onChange={handleChange}
                label={'Профиль медицинской помощи'}
            >
                { profileIds.map(id => {
                    return (
                    <MenuItem key={id} value={id}>{profiles[id].name}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
)
}