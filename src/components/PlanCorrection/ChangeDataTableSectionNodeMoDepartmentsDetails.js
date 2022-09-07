import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { moDepartmentsIdsSelector, moDepartmentsSelector } from '../../store/moDepartment/moDepartmentSelectors';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTableSectionNodeMoDepartmentsDetails(props) {
    const { data } = props;
    const departments = useSelector(moDepartmentsSelector);
    const departmentIds = useSelector(moDepartmentsIdsSelector);

    return (
        <React.Fragment>
            { departmentIds.map(departmentId => {
                if (data[departmentId]) {
                    return (
                        <Grid container item key={departmentId} sx={{ border: 1, borderTop: 0 }}>
                            <Grid item xs={9} sx={{ border: 1 }}>
                                <Typography component="span">
                                    {departments[departmentId].name.replace('Фельдшерско-акушерский пункт','ФАП').replace('Фельдшерский пункт','ФП')} 
                                </Typography>
                            </Grid>
                            <Grid item xs={3} sx={{ border: 1 }}>
                               <Typography component="span" sx={{ color: 'text.secondary' }}>
                                    ({data[departmentId].value>0?'+':''}{twoDecimal.format(data[departmentId].value)})
                                </Typography>
                            </Grid>
                        </Grid>
                    )
                }
                return null;
            })}
        </React.Fragment>
    );
}