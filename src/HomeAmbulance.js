import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import MailIcon from '@material-ui/icons/Mail';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

import AmbulanceRoutes  from './routes/AmbulanceRoutes';
import Home from './Home';

class HomeHospital extends React.Component {
  constructor(props) {
      super(props);
      
      this.state ={title: 'Скорая', snackbarOpen: true}
      
      this.handleClose = this.handleClose.bind(this);
  }
  
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({snackbarOpen: false});
  };
  
  render(){
    let path = this.props.match.path;    
    if( !path.endsWith('/') ) {
          path += '/';
    }
    let actions = [];//[{'key':1, 'title':'Новое сообщение','tooltip':'Создать новое сообщение','to':`${path}msg/new`}];
    let sidebarMainListItems = [
        {'key':1, 'title':'Начальные данные', 'to':`${path}initial/17`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />, },
        {'key':2, 'title':'Изменения', 'to':`${path}changes`, 'tooltip':'Внесение изменений', 'icon': <LabelImportantIcon />},
        {'key':3, 'title':'Параметры', 'to':`${path}settings`, 'tooltip':'', 'icon': <LabelImportantIcon />},
    ];
    
    return (  
      <Home 
          title={this.state.title}
          main={<AmbulanceRoutes />}
          sidebarMainListItems={sidebarMainListItems}
          snackbar={null}
          actions={actions}
      />
    );
  }
}

export default HomeHospital;
