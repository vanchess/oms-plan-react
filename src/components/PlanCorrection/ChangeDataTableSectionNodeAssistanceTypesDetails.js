import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { medicalAssistanceTypesIdsSelector, medicalAssistanceTypesSelector } from '../../store/medicalAssistanceType/medicalAssistanceTypeSelectors';
import ChangeDataTableSectionNodeMoDetails from './ChangeDataTableSectionNodeMoDetails';

const twoDecimal = new Intl.NumberFormat('ru', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2, useGrouping: true });

export default function ChangeDataTableSectionNodeAssistanceTypesDetails(props) {
    const { data } = props;
    const assistanceTypes = useSelector(medicalAssistanceTypesSelector);
    const assistanceTypesIds = useSelector(medicalAssistanceTypesIdsSelector);

    return (
        <React.Fragment>
            { assistanceTypesIds.map(assistenceTypeId => {
                if (data[assistenceTypeId]) {
                    return (
                        <Grid container key={assistenceTypeId} sx={{ border: 1, borderTop: 0 }}>
                            <Grid item xs={2}>
                                <Grid item>
                                    <Typography component="span">{assistanceTypes[assistenceTypeId].name} </Typography>
                                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                                        ({data[assistenceTypeId].value>0?'+':''}{twoDecimal.format(data[assistenceTypeId].value)})
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={10} sx={{ border: 1 }}>
                                <ChangeDataTableSectionNodeMoDetails data={data[assistenceTypeId]['mo']} />
                            </Grid>
                        </Grid>
                    )
                }
                return null;
            })}
        </React.Fragment>
    );
}