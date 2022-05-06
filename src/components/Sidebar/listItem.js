import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
// import DescriptionIcon from '@mui/icons-material/Description';

import List from '@mui/material/List';

import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

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
        <Tooltip title={i.tooltip} disableInteractive> 
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

