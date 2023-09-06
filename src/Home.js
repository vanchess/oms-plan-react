import React from 'react';
import 'typeface-roboto';

import CssBaseline from '@mui/material/CssBaseline';

import { Header } from './components/Header'; 

import RootPrivateRoutes from './routes/RootPrivateRoutes';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link, Typography } from '@mui/material';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://192.168.12.200/">
        ТФ ОМС Курганской области
      </Link>{' '}
      2022-{new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = styled.footer(({theme}) => css`
  background-color: ${theme.palette.background.paper};
  padding: ${theme.spacing(6)};
`);

export default function(props) {
  /*
  const dispatch = useDispatch();
  const { slug } = useParams();
  const categoryTreeNode = useSelector(store => categoryTreeNodeBySlugSelector(store, slug));
  const title = useSelector(store => categoryNameByIdSelector(store, categoryTreeNode?.category_id)) ?? '';

  useEffect(() => {
    dispatch(setTitle(title));
  }, [dispatch, title])
*/
  return (
    <>
        <CssBaseline />
        <Header />
        <main>
          <RootPrivateRoutes />
        </main>
        <Footer>
          <Copyright />
        </Footer>
    </>
  )
}