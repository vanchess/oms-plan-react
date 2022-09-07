import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { moIdsSelector, moSelector } from '../../store/mo/moSelectors';
import ChangeDataTableSectionNodeMoDepartmentsDetails from './ChangeDataTableSectionNodeMoDepartmentsDetails';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTableSectionNodeMoDetails(props) {
    const { data } = props;
    const mo = useSelector(moSelector);
    const moIds = useSelector(moIdsSelector);

    return (
        <React.Fragment>
            { moIds.map(moId => {
                if (data[moId]) {
                    return (
                        <Grid container item key={moId} sx={{ border: 1, borderTop: 0 }}>
                            <Grid item xs={3}>
                                <Typography component="span">{mo[moId].short_name} </Typography>
                            </Grid>
                            <Grid  item xs={2}>
                               <Typography component="span" sx={{ color: 'text.secondary' }}>
                                    ({data[moId].value>0?'+':''}{twoDecimal.format(data[moId].value)})
                                </Typography>
                            </Grid>
                            { data[moId]['department'] ? 
                                <Grid container item xs={7} >
                                    <ChangeDataTableSectionNodeMoDepartmentsDetails data={data[moId]['department']} />
                                </Grid>
                            :null}
                        </Grid>
                    )
                }
                return null;
            })}
        </React.Fragment>
    );
}