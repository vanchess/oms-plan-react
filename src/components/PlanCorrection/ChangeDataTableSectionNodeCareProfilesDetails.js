import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { careProfilesIdsSelector, careProfilesSelector } from '../../store/careProfiles/careProfilesSelectors';
import ChangeDataTableSectionNodeVmpGroupsDetails from './ChangeDataTableSectionNodeVmpGroupsDetails';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTableSectionNodeCareProfilesDetails(props) {
    const { data } = props;
    const profiles = useSelector(careProfilesSelector);
    const profilesIds = useSelector(careProfilesIdsSelector);

    return (
        <React.Fragment>
            { profilesIds.map(profileId => {
                if (data[profileId]) {
                    return (
                        <Grid container key={profileId} sx={{ border: 1, borderTop: 0 }}>
                            <Grid item xs={2}>
                                <Grid item>
                                    <Typography component="span">{profiles[profileId].name} </Typography>
                                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                                        ({data[profileId].value>0?'+':''}{twoDecimal.format(data[profileId].value)})
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={10} sx={{ border: 1 }}>
                                <ChangeDataTableSectionNodeVmpGroupsDetails data={data[profileId]['vmpGroup']} />
                            </Grid>
                        </Grid>
                    )
                }
                return null;
            })}
        </React.Fragment>
    );
}