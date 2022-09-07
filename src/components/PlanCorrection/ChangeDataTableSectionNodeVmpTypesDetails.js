import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { vmpTypesIdsSelector, vmpTypesSelector } from '../../store/vmpTypes/vmpTypesSelectors';
import ChangeDataTableSectionNodeMoDetails from './ChangeDataTableSectionNodeMoDetails';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTableSectionNodeVmpTypesDetails(props) {
    const { data } = props;
    const types = useSelector(vmpTypesSelector);
    const typesIds = useSelector(vmpTypesIdsSelector);

    return (
        <React.Fragment>
            { typesIds.map(typeId => {
                if (data[typeId]) {
                    return (
                        <Grid container item key={typeId} sx={{ border: 1, borderTop: 0 }}>
                            <Grid item xs={12}>
                                <Grid item>
                                    <Typography component="span">{types[typeId].name} </Typography>
                                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                                        ({data[typeId].value>0?'+':''}{twoDecimal.format(data[typeId].value)})
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={1} sx={{ border: 1 }}></Grid>
                            <Grid container item xs={11} sx={{ border: 1 }}>
                                <ChangeDataTableSectionNodeMoDetails data={data[typeId]['mo']} />
                            </Grid>
                        </Grid>
                    )
                }
                return null;
            })}
        </React.Fragment>
    );
}