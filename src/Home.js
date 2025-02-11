import React from 'react';
import 'typeface-roboto';

import CssBaseline from '@mui/material/CssBaseline';

import { Header } from './components/Header'; 

import RootPrivateRoutes from './routes/RootPrivateRoutes';


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
    </>
  )
}