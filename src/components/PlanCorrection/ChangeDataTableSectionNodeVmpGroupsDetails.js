import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { vmpGroupsIdsSelector, vmpGroupsSelector } from '../../store/vmpGroups/vmpGroupsSelectors';
import ChangeDataTableSectionNodeVmpTypesDetails from './ChangeDataTableSectionNodeVmpTypesDetails';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTableSectionNodeVmpGroupsDetails(props) {
    const { data } = props;
    const groups = useSelector(vmpGroupsSelector);
    const groupsIds = useSelector(vmpGroupsIdsSelector);

    return (
        <React.Fragment>
            { groupsIds.map(groupeId => {
                if (data[groupeId]) {
                    return (
                        <Grid container item key={groupeId} sx={{ border: 1, borderTop: 0 }}>
                            <Grid item xs={2}>
                                <Grid item>
                                    <Typography component="span">Группа: {groups[groupeId].code} </Typography>
                                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                                        ({data[groupeId].value>0?'+':''}{twoDecimal.format(data[groupeId].value)})
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={10} sx={{ border: 1 }}>
                                <ChangeDataTableSectionNodeVmpTypesDetails data={data[groupeId]['vmpType']} />
                            </Grid>
                        </Grid>
                    )
                }
                return null;
            })}
        </React.Fragment>
    );
}