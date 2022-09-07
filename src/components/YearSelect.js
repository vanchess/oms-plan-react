import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectedYearSelector } from '../store/nodeData/nodeDataSelectors';
import { yearSelected } from '../store/nodeData/nodeDataStore';

export default function YearSelect() {
    const year = useSelector(selectedYearSelector);
    const dispatch = useDispatch();

    const handleChange = (event, year) => {
        if (!year) { return; }
        dispatch(yearSelected({year}));
    };
  
    return (
      <ToggleButtonGroup
        color="primary"
        value={year}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value={2022}>2022</ToggleButton>
        <ToggleButton value={2023}>2023</ToggleButton>
      </ToggleButtonGroup>
    );

}