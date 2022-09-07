import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { medicalServicesSelector } from '../../store/medicalServices/medicalServicesSelectors';

export default function MedicalServiceSelect(props) {
    const {serviceIds, onChange } = props;

    const [selectedId, setSelectedId] = useState('')
    const services = useSelector(medicalServicesSelector);

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
                { serviceIds.map(id => {
                    return (
                    <MenuItem key={id} value={id}>{services[id].name}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
)
}