import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';

import HospitalRoutes  from './routes/HospitalRoutes';
import Home from './Home';

class HomeHospital extends React.Component {
  constructor(props) {
      super(props);
      
      this.state ={title: 'Стационар', snackbarOpen: true}
      
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
        {'key':1, 'title':'Начальные данные',   'to':`#`, 'icon': <MailIcon />, 'childList':[
            {'key':2, 'title':'Дневной',   'to':`#`, 'icon': <MailIcon />, 'childList':[
                {'key':4, 'title':'при поликлинике',   'to':`${path}initial/4`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},
                {'key':5, 'title':'при стационаре',   'to':`${path}initial/5`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},
            ]},
            {'key':3, 'title':'Круглосуточный',   'to':`#`, 'icon': <MailIcon />, 'childList':[
                {'key':6, 'title':'Обычный',   'to':`${path}initial/6`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},
                {'key':7, 'title':'ВМП',   'to':`${path}initial/7/care-profile`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},
                /*{'key':8, 'title':'Мед.реабилитация',   'to':`${path}initial/8`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},*/
            ]}
        ]},
        {'key':2, 'title':'Корректировки', 'to':`#`, 'icon': <LabelImportantIcon />, 'childList':[
            {'key':1, 'title':'Внести',   'to':`${path}changes`, 'tooltip':'Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
            {'key':2, 'title':'Дневной',   'to':`#`, 'icon': <MailIcon />, 'childList':[
                {'key':4, 'title':'при поликлинике',   'to':`${path}changes/4`, 'tooltip':'Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
                {'key':5, 'title':'при стационаре',   'to':`${path}changes/5`, 'tooltip':'Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
            ]},
            {'key':3, 'title':'Круглосуточный',   'to':`#`, 'icon': <MailIcon />, 'childList':[
                {'key':6, 'title':'Обычный',   'to':`${path}changes/6`, 'tooltip':'Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
                {'key':7, 'title':'ВМП',   'to':`${path}changes/7/care-profile`, 'tooltip':'Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
            ]}
        ]},
        {'key':3, 'title':'Прикрепление', 'icon': <LabelImportantIcon />, 'to':`${path}attached-persons/35`, 'tooltip':'Количество прикрепившихся лиц'},
        /*
        {'key':4, 'title':'Параметры', 'to':`${path}settings`, 'tooltip':'', 'icon': <LabelImportantIcon />},
        */
    ];
    
    return (  
      <Home 
          title={this.state.title}
          main={<HospitalRoutes />}
          sidebarMainListItems={sidebarMainListItems}
          snackbar={null}
          actions={actions}
      />
    );
  }
}

export default HomeHospital;
