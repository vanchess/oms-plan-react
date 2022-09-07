import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { medicalServicesIdsSelector, medicalServicesSelector } from '../../store/medicalServices/medicalServicesSelectors';

import ChangeDataTableSectionNodeMoDetails from './ChangeDataTableSectionNodeMoDetails';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTableSectionNodeServicesDetails(props) {
    const { data } = props;
    const services = useSelector(medicalServicesSelector);
    const servicesIds = useSelector(medicalServicesIdsSelector);

    return (
        <React.Fragment>
            { servicesIds.map(serviceId => {
                if (data[serviceId]) {
                    return (
                        <Grid container key={serviceId} sx={{ border: 1, borderTop: 0 }}>
                            <Grid item xs={2}>
                                <Grid item>
                                    <Typography component="span">{services[serviceId].name} </Typography>
                                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                                        ({data[serviceId].value>0?'+':''}{twoDecimal.format(data[serviceId].value)})
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={10} sx={{ border: 1 }}>
                                <ChangeDataTableSectionNodeMoDetails data={data[serviceId]['mo']} />
                            </Grid>
                        </Grid>
                    )
                }
                return null;
            })}
        </React.Fragment>
    );
}