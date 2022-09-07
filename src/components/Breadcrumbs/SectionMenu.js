import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function SectionMenu(props) {
  const {label, onChange, items} = props;
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (sectionSlug) => {
    setAnchorEl(null);
    if (sectionSlug) {
      onChange(sectionSlug);
    }
  };

  
  return (
    <div>
      <Button
        color='inherit'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        { label }
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        { items.map(item => (
            <MenuItem onClick={() => handleClose(item.value)} key={item.value}>{item.label}</MenuItem>
        ))}
      </Menu>
    </div>
  );
}