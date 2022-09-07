import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { medicalAssistanceTypesSelector } from '../../store/medicalAssistanceType/medicalAssistanceTypeSelectors';

export default function MedicalAssistanceTypeSelect(props) {
    const {typeIds, onChange } = props;

    const [selectedId, setSelectedId] = useState('')
    const assistanceTypes = useSelector(medicalAssistanceTypesSelector);

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
            <Select
                value={selectedId}
                onChange={handleChange}
            >
                { typeIds.map(id => {
                    return (
                    <MenuItem key={id} value={id}>{assistanceTypes[id].name}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
)
}