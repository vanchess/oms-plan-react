import React from 'react';
import { connect } from 'react-redux';
// import Button from '@material-ui/core/Button';
// import ThreeDRotation from '@material-ui/icons/ThreeDRotation';
// import IconButton from '@material-ui/core/IconButton';
//import SvgIcon from '@material-ui/core/SvgIcon';
import 'typeface-roboto';

import CssBaseline from '@material-ui/core/CssBaseline';

import { Header } from './components/Header'; 
import { Sidebar } from './components/Sidebar'; 
import { MainListItems, secondaryListItems } from './components/Sidebar/listItems';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { withStyles } from '@material-ui/core/styles';

import { logout } from './store/auth/authAction.js'
import { setTitle } from './store/curPage/curPageStore'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
})

class Home extends React.Component {
  constructor(props) {
      super(props);

      this.state ={open: true, userName: props.user.name}
      
      this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
      this.handleDrawerClose = this.handleDrawerClose.bind(this);
  }
  
  componentDidMount(){
      this.props.setTitle({title: this.props.title});
  }
  
  componentDidUpdate(prevProps, prevState) {
      //this.props.setTitle({title: `${this.props.title} - Объемы и стоимость`});
  }
  
  handleDrawerOpen(){
      this.setState({open: true});
  }
  
  handleDrawerClose(){
      this.setState({open: false});
  }
  

  
  render(){
    const { classes } = this.props;

    return (  
      <div className={classes.root}>
          <CssBaseline />
          <Header title={this.props.title} open={this.state.open} userName={this.state.userName} handleDrawerOpen={() => this.handleDrawerOpen()} logout={this.props.logout} />
          <Sidebar 
            open={this.state.open} 
            handleDrawerClose={() => this.handleDrawerClose()} 
            actions={this.props.actions}
          >
                <MainListItems sidebarMainListItems={this.props.sidebarMainListItems} />
          </Sidebar>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {this.props.main}
          </main>
            {this.props.snackbar}
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
      user: store.auth.user,
    };
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
        dispatch(logout());
    },
    setTitle: (t) => {
        dispatch(setTitle(t));
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Home));