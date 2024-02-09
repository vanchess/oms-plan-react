import React, { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { currentlyUsedDateSelector, selectedYearSelector } from '../../store/nodeData/nodeDataSelectors'
import { yearSelected, currentlyUsedDateSelected } from '../../store/nodeData/nodeDataStore';
import SectionMenu from './SectionMenu';

export default function YearMenu() {
    const dispatch = useDispatch();
    const currentYear = useSelector(selectedYearSelector);
    const currentlyUsedDate = useSelector(currentlyUsedDateSelector);

    const years = useMemo(
        () => (
            [
                {value: 2022, label: '2022'},
                {value: 202212, label: '2022/12'},
                {value: 2023, label: '2023'},
                {value: 2024, label: '2024'},
            ]
        ),
        []
    )

    const handleChange = useCallback(
        (year) => {
            if (year === 202212) {
                year = 2022;
                dispatch(currentlyUsedDateSelected({currentlyUsedDate:"2022-12-14"}));
            } else {
                dispatch(currentlyUsedDateSelected({currentlyUsedDate:(year+"-01-01")}));
            }
            if (!year || year === currentYear) { return; }
            dispatch(yearSelected({year}));
        }, 
        [dispatch, currentYear]
    );

    let lbl = currentYear;
    if (currentlyUsedDate === "2022-12-14")
    {
        lbl = '2022/12';
    }

    return (
        <SectionMenu label={lbl} items={years} onChange={handleChange} />
    )
}