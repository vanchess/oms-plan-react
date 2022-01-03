import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
// import DashboardIcon from '@material-ui/icons/Dashboard';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import DescriptionIcon from '@material-ui/icons/Description';

import List from '@material-ui/core/List';

import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import { MainListItems as ListItems } from './listItems';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: props => theme.spacing(props.level * 1),
  },
}));

export function SidebarMainListItem(props) {
    const level = props.level || 1;
    const classes = useStyles({level: level});
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    
    const i = props.item;
    if (i.childList && i.childList.length) {
      return (
        <React.Fragment>
            <ListItem button onClick={handleClick} className={classes.nested}>
                  <ListItemIcon>
                    {i.icon}
                  </ListItemIcon>
                  <ListItemText primary={i.title} />
                  {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" className={classes.nested}>
                <ListItems sidebarMainListItems={i.childList} level={level + 1} />
            </Collapse>
        </React.Fragment>
      );
    } else {
      return (
        <Tooltip title={i.tooltip}>
            <ListItem button component={Link} to={i.to} onClick={handleClick} className={classes.nested}>
              <ListItemIcon>
                {i.icon}
              </ListItemIcon>
              <ListItemText primary={i.title} />
            </ListItem>
        </Tooltip>
      );
    }
}

