import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import MailIcon from '@material-ui/icons/Mail';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';

import PolyclinicRoutes  from './routes/PolyclinicRoutes';
import Home from './Home';

class HomeHospital extends React.Component {
  constructor(props) {
      super(props);
      
      this.state ={title: 'Поликлиника', snackbarOpen: true}
      
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
            {'key':2, 'title':'Подушевой',   'to':`#`, 'icon': <MailIcon />, 'childList':[
                {'key':4, 'title':'Посещения',   'to':`${path}initial/28`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},
                {'key':5, 'title':'Услуги',   'to':`${path}initial/32`, 'tooltip':'Диагностические услуги. Ввод данных на начало года', 'icon': <MailIcon />},
            ]},
            {'key':3, 'title':'По тарифу',   'to':`#`, 'icon': <MailIcon />, 'childList':[
                {'key':6, 'title':'Посещения',   'to':`${path}initial/30`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},
                {'key':7, 'title':'Услуги',   'to':`${path}initial/31`, 'tooltip':'Диагностические услуги. Ввод данных на начало года', 'icon': <MailIcon />},
                /*{'key':8, 'title':'Мед.реабилитация',   'to':`${path}initial/8`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},*/
            ]},
            {'key':8, 'title':'По ФАП',   'to':`#`, 'icon': <MailIcon />, 'childList':[
                {'key':9, 'title':'Посещения',   'to':`${path}initial/29/fap`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},
                {'key':10, 'title':'Услуги',   'to':`${path}initial/33/fap`, 'tooltip':'Диагностические услуги. Ввод данных на начало года', 'icon': <MailIcon />},
                /*{'key':8, 'title':'Мед.реабилитация',   'to':`${path}initial/8`, 'tooltip':'Ввод данных на начало года', 'icon': <MailIcon />},*/
            ]}
        ]},
        {'key':2, 'title':'Корректировки', 'to':`#`, 'icon': <LabelImportantIcon />, 'childList':[
          {'key':2, 'title':'Подушевой',   'to':`#`, 'icon': <MailIcon />, 'childList':[
              {'key':4, 'title':'Посещения',   'to':`${path}changes/28`, 'tooltip':'Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
              {'key':5, 'title':'Услуги',   'to':`${path}changes/32`, 'tooltip':'Диагностические услуги. Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
          ]},
          {'key':3, 'title':'По тарифу',   'to':`#`, 'icon': <MailIcon />, 'childList':[
              {'key':6, 'title':'Посещения',   'to':`${path}changes/30`, 'tooltip':'Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
              {'key':7, 'title':'Услуги',   'to':`${path}changes/31`, 'tooltip':'Диагностические услуги. Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
          ]},
          {'key':8, 'title':'По ФАП',   'to':`#`, 'icon': <MailIcon />, 'childList':[
              {'key':9, 'title':'Посещения',   'to':`${path}changes/29/fap`, 'tooltip':'Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
              {'key':10, 'title':'Услуги',   'to':`${path}changes/33/fap`, 'tooltip':'Диагностические услуги. Перераспределение объемов медицинской помощи', 'icon': <MailIcon />},
          ]}
        ]},
        {'key':3, 'title':'Прикрепление', 'to':`#`, 'icon': <LabelImportantIcon />, 'childList':[
          {'key':4, 'title':'МО(без ФАП)', 'to':`${path}attached-persons/39`, 'icon': <LabelImportantIcon />, 'tooltip':'Количество прикрепившихся лиц'},
          {'key':5, 'title':'ФАП', 'to':`${path}attached-persons/38/fap`, 'icon': <LabelImportantIcon />, 'tooltip':'Количество прикрепившихся лиц'},
        ]},
        
        {'key':4, 'title':'Параметры', 'to':`${path}settings`, 'tooltip':'', 'icon': <LabelImportantIcon />},
    ];
    
    return (  
      <Home 
          title={this.state.title}
          main={<PolyclinicRoutes />}
          sidebarMainListItems={sidebarMainListItems}
          snackbar={null}
          actions={actions}
      />
    );
  }
}

export default HomeHospital;
