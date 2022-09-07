import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { moDepartmentsIdsByMoIdSelector, moDepartmentsSelector } from '../../store/moDepartment/moDepartmentSelectors';




export default function MoDepartmentSelect(props) {
    const {moId, onChange } = props;
    const [selectedId, setSelectedId] = useState('');
    const departments = useSelector(moDepartmentsSelector);
    const departmentIds = useSelector(store => moDepartmentsIdsByMoIdSelector(store, moId));

    useLayoutEffect(() => {
        onChange(null);
        setSelectedId('');
        return () => {
            onChange(null);
        };
    }, [moId])

    const handleChange = (e) => {
        const newId = Number(e.target.value);
        setSelectedId(newId);
        onChange(newId);
    }

    return (
        <FormControl margin="dense" fullWidth size="small">
            <InputLabel>ФАП (ФП)</InputLabel>
            <Select
                value={departmentIds.includes(selectedId) ? selectedId : ''}
                onChange={handleChange}
                label={'ФАП (ФП)'}
            >
                { departmentIds.map(id => {
                    return (
                    <MenuItem key={id} value={id}>
                        {departments[id].name.replace('Фельдшерско-акушерский пункт','ФАП').replace('Фельдшерский пункт','ФП')}
                    </MenuItem>
                    )
                })}
            </Select>
        </FormControl>
)
}