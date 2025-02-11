import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { 
  Grid,
  Container,
  Typography,
  Link,
} from "@mui/material"

import { setTitle } from './store/curPage/curPageStore'

import InitialData from './components/StartPage/InitialData';
import PlanCorrection from './components/StartPage/PlanCorrection';
import styled from '@emotion/styled';

const Footer = styled.footer(({theme}) => css`
  background-color: ${theme.palette.background.paper};
  padding: ${theme.spacing(6)};
`);
const ContainerStyled = styled(Container)(({theme}) => css`
  padding-top: ${theme.spacing(1)};
  padding-bottom: ${theme.spacing(1)};
`);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://192.168.12.201/">
        ТФ ОМС Курганской области
      </Link>{' '}
      2022-{new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StartPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle({title: ''}));
  }, [dispatch])

  return (
    <>
      <ContainerStyled maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} >
            <InitialData />
            <PlanCorrection />
          </Grid>
        </Grid>
      </ContainerStyled>
      <Footer>
        <Copyright />
      </Footer>
    </>
  );
}