import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { 
  Grid,
  Container,
} from "@mui/material"

import { setTitle } from './store/curPage/curPageStore'

import InitialData from './components/StartPage/InitialData';
import PlanCorrection from './components/StartPage/PlanCorrection';
import styled from '@emotion/styled';

const ContainerStyled = styled(Container)(({theme}) => css`
  padding-top: ${theme.spacing(1)};
  padding-bottom: ${theme.spacing(1)};
`);

export default function StartPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle({title: ''}));
  }, [dispatch])

  return (
    <ContainerStyled maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} >
          <InitialData />
          <PlanCorrection />
        </Grid>
      </Grid>
    </ContainerStyled>
  );
}