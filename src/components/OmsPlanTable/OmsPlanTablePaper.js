import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import React from 'react';

export const OmsPlanTablePaper = styled(Paper)`
    padding: 0;
    display: flex;
    overflow: auto;
    flex-direction: column;
    maxHeight: calc(100vh - 48px);
    height: calc(100vh - 48px);
`