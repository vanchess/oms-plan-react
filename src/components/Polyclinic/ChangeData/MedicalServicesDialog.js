import ListSelectionDialog from '../../Dialog/SelectFromListDialog';
import { useSelector } from 'react-redux';
import { medicalServicesArrForSelectedNodeSelector } from '../../../store/nodeData/nodeDataSelectors';

export default function MedicalServicesDialog(props) {
    const items = useSelector(medicalServicesArrForSelectedNodeSelector);
    return (
        <ListSelectionDialog 
            title='Выбор диагностической услуги' 
            items={items} 
            selectedValue={null} 
            open={props.open} 
            onClose={props.onClose}
            />
    );
};