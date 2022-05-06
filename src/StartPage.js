import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { 
  Avatar,
  AppBar,
  Card,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Container,
  Link
} from "@mui/material"
import makeStyles from '@mui/styles/makeStyles';

import { setTitle } from './store/curPage/curPageStore'

import { Link as RouterLink } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://192.168.12.200/">
        ТФ ОМС Курганской области
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  avatar: {
    margin: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: 'white',
  },
  lnk: {
    textDecoration: 'none',
    '&:focus, &:hover, &:visited, &:link, &:active': {
        textDecoration: 'none'
    }
  }
}));

const cards = [
    {id:1, title:'Стационар', text:'', image:"/images/hospital.jpg", to:'/hospital'  },
    {id:2, title:'Поликлиника', text:'', image:"/images/polyclinic.png", to:'/polyclinic' },
    {id:3, title:'Скорая', text:'', image:"/images/ambulance.png", to:'/ambulance' },
];
const cardsNew = [
    
];
const cardsOut= [];


function StartPage(props) {
  const classes = useStyles();

  useEffect( () => {
      props.setTitle({title: ''});
  },[]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          
          <Avatar className={classes.avatar} src="/tfoms.png" />
          <Typography variant="h6" color="inherit" noWrap>
            ТФ ОМС Курганской области
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={/*classes.card*/ classes.lnk} component={RouterLink} to={ card.to } >
                  <CardMedia
                    className={classes.cardMedia}
                    image={ card.image }
                    title={ card.title }
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                    { card.title }
                    </Typography>
                    <Typography >
                    { card.text }
                    </Typography>
                  </CardContent>
                  {/*
                  <CardActions>
                    <Button   size="small" color="primary">
                      Открыть
                    </Button>
                  </CardActions>
                  */}
                </Card>
              </Grid>
            ))}
            {cardsNew.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={/*classes.card*/ classes.lnk} component={RouterLink} to={ card.to } >
                  <CardMedia
                    className={classes.cardMedia}
                    image={ card.image }
                    title={ card.title }
                  />
                  <CardContent className={classes.cardContent} disabled >
                    <Typography gutterBottom variant="h5" component="h2">
                    { card.title }
                    </Typography>
                    <Typography >
                    { card.text }
                    </Typography>
                    <Typography color="secondary">
                    Доступно с 01.07.2021
                    </Typography>
                  </CardContent>
                  {/*
                  <CardActions>
                    <Button   size="small" color="primary">
                      Открыть
                    </Button>
                  </CardActions>
                  */}
                </Card>
              </Grid>
            ))}
            {cardsOut.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card component={Link} href={ card.to } target="_blank" rel="noopener noreferrer" color="inherit" underline="none" disabled>
                  <CardMedia
                    className={classes.cardMedia}
                    image={ card.image }
                    title={ card.title }
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2" >
                    { card.title }
                    </Typography>
                    <Typography>
                    { card.text }
                    </Typography>
                  </CardContent>
                  {/*
                  <CardActions>
                    <Button size="small" color="primary">
                      Открыть
                    </Button>
                  </CardActions>
                  */}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
          {/*
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
          */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

const mapStateToProps = function(store) {
  return {
  //    user: store.auth.user,
    };
}
const mapDispatchToProps = dispatch => {
  return {
    setTitle: (t) => {
        dispatch(setTitle(t));
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(StartPage);