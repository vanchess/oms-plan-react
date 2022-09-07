import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { vmpGroupsSelector } from '../../store/vmpGroups/vmpGroupsSelectors';

export default function VmpGroupSelect(props) {
    const {groupIds, onChange } = props;

    const [selectedId, setSelectedId] = useState('')
    const groups = useSelector(vmpGroupsSelector);

    useEffect(() => {
        onChange(null);
        return () => {
            onChange(null);
        }
    }, [])

    useEffect(() => {
        if(groupIds.length === 1) {
            selectId(groupIds[0]);
        }
    }, [groupIds])

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
            <InputLabel>Группа ВМП</InputLabel>
            <Select
                
                value={selectedId}
                onChange={handleChange}
                label={'Группа ВМП'}
            >
                { groupIds.map(id => {
                    return (
                    <MenuItem key={id} value={id}>{groups[id].code}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
)
}