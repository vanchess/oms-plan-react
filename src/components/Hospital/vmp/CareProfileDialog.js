import ListSelectionDialog from '../../Dialog/SelectFromListDialog';
import { useSelector } from 'react-redux';
import { careProfilesArrForSelectedNodeSelector } from '../../../store/nodeData/nodeDataSelectors';

export default function CareProfileDialog(props) {
    const items = useSelector(careProfilesArrForSelectedNodeSelector);
    return (
        <ListSelectionDialog 
            title='Выбор профиля медицинской помощи' 
            items={items} 
            selectedValue={null} 
            open={props.open} 
            onClose={props.onClose}
            />
    );
};