import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commissionDecisionArrSelector, commissionDecisionByIdSelector, selectedCommissionDecisionIdSelector } from "../../store/commissionDecision/CommissionDecisionSelector";
import { commissionDecisionIdSelected } from "../../store/commissionDecision/CommissionDecisionStore";
import SectionMenu from "./SectionMenu";

export default function CommissionDecisionMenu() {
    const dispatch = useDispatch();
    const commissionDecisionId = useSelector(selectedCommissionDecisionIdSelector);
    const commissionDecision = useSelector(store => commissionDecisionByIdSelector(store, commissionDecisionId));
    const commissionDecisionArr = useSelector(commissionDecisionArrSelector);
    const commissionDecisionItems = React.useMemo(() => {
      return commissionDecisionArr.map(c => (
        {value: c.id, label: `протокол №${c.number} от ${c.date}`}
      ));
    }, [commissionDecisionArr]);
  
    const changeCommissionDecisionId = useCallback((id) => {
        dispatch(commissionDecisionIdSelected(id));
    },[]);

    return (
        <SectionMenu 
            label={`протокол №${commissionDecision?.number} от ${commissionDecision?.date}`} 
            items={commissionDecisionItems} 
            onChange={changeCommissionDecisionId} 
            />
    );
}