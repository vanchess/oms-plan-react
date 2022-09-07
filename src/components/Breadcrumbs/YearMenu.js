import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedYearSelector } from '../../store/nodeData/nodeDataSelectors'
import { yearSelected } from '../../store/nodeData/nodeDataStore';
import SectionMenu from './SectionMenu';

export default function YearMenu() {
    const dispatch = useDispatch();
    const currentYear = useSelector(selectedYearSelector);

    const years = useMemo(
        () => (
            [
                {value: 2022, label: '2022'},
                {value: 2023, label: '2023'},
            ]
        ),
        []
    )

    const handleChange = useCallback(
        (year) => {
            if (!year) { return; }
            dispatch(yearSelected({year}));
        }, 
        [dispatch]
    );

    return (
        <SectionMenu label={currentYear} items={years} onChange={handleChange} />
    )
}