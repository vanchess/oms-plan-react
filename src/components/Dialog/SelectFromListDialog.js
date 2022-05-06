import { 
    Dialog,
    DialogTitle,
    List,
    ListItem,
    ListItemText
} from '@mui/material'

export default function SelectFromListDialog(props) {
    const { onClose, selectedValue, open, title } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
            <List>
                {props.items && props.items.map((item) => {
                    return (
                        <ListItem key={item.id} button onClick={() => handleListItemClick(item.id)} >
                            <ListItemText
                                primary={item.short_name || item.name}
                                secondary={item.short_name ? item.name : ''}
                              />
                        </ListItem>
                    )
                })}
            </List>
        </Dialog>
    );
}