import ListSelectionDialog from '../../Dialog/SelectFromListDialog';
import { useSelector } from 'react-redux';
import { medicalAssistanceTypesArrForSelectedNodeSelector } from '../../../store/nodeData/nodeDataSelectors';

export default function MedicalAssistanceDialog(props) {
    const items = useSelector(medicalAssistanceTypesArrForSelectedNodeSelector);
    return (
        <ListSelectionDialog 
            title='Выбор показателя' 
            items={items} 
            selectedValue={null} 
            open={props.open} 
            onClose={props.onClose}
            />
    );
};