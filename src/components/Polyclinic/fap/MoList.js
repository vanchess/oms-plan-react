import React, { useEffect } from 'react';

import { setTitle } from '../../../store/curPage/curPageStore'
import { moIdsHavingDepartmentsFetch } from '../../../store/mo/moStore';
import { moHavingDepartmentsSelector } from '../../../store/mo/moSelectors';
import { useSelector, useDispatch  } from 'react-redux'

import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { Link } from 'react-router-dom';

const title = 'Данные на начало года по ФАП. Выбор МО';

const useStyles = makeStyles( theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const MoList = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    
    //this.props.setTitle({title: title});
    useEffect(() => {
        dispatch(setTitle(title));
        dispatch(moIdsHavingDepartmentsFetch([49,50]));
    }, [dispatch])
    
    const mo = useSelector(moHavingDepartmentsSelector);
    
    return (
        <div>
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <List>
                    { mo.map( item => {
                        return (
                            <ListItem key={item.id} button component={Link} to={'./fap/'+item.id} >
                              <ListItemText
                                primary={item.short_name}
                                secondary={item.name}
                              />
                            </ListItem>
                        );
                    })}
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
        </div>
        
    );
};

export default MoList;