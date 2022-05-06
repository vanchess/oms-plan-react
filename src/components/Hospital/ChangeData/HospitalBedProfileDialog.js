import ListSelectionDialog from '../../Dialog/SelectFromListDialog';
import { useSelector } from 'react-redux';
import { hospitalBedProfilesForSelectedNodeSelector } from '../../../store/nodeData/nodeDataSelectors';

export default function HospitalBedProfileDialog(props) {
    const items = useSelector(hospitalBedProfilesForSelectedNodeSelector);
    return (
        <ListSelectionDialog 
            title='Выбор профиля койки' 
            items={items} 
            selectedValue={null} 
            open={props.open} 
            onClose={props.onClose}
            />
    );
};