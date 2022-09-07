import React, { useCallback } from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AppsIcon from '@mui/icons-material/Apps';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Tooltip from '@mui/material/Tooltip';
import { Link } from 'react-router-dom';


import AppBreadcrumbs from '../Breadcrumbs/AppBreadcrumbs';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { logout as lout } from '../../store/auth/authAction.js'
import { userNameSelector } from '../../store/auth/authSelector.js';
import YearMenu from '../Breadcrumbs/YearMenu';
import styled from '@emotion/styled';

const AppBarStyled = styled(AppBar)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

export const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector(userNameSelector);
  const logout = useCallback(
    () => dispatch(lout()),
    [dispatch]
  );

  return (
    <AppBarStyled position={'sticky'}>
      <Toolbar variant="dense">
        <YearMenu />
        <Box sx={{flexGrow: 1}}>
          <AppBreadcrumbs />
        </Box>
        <Typography component="h1" variant="h6" color="inherit" noWrap >
            {userName}
        </Typography>
        {/*
        <Tooltip title="Перейти к выбору подсистемы" disableInteractive>
          <IconButton color="inherit" component={Link} to={`/`} size="large">
            <AppsIcon />
          </IconButton>
        </Tooltip>
        */}
        <Tooltip title="Выход из системы" disableInteractive>
          <IconButton color="inherit" onClick={logout} size="large">
            <ExitToAppIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBarStyled>
  )
}