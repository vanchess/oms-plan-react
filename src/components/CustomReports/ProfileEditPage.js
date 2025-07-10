import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { customReportProfileService } from '../../services/api/customReportProfileService';
import { fetchRelationTypes } from '../../store/customReport/relationTypeSlice';
import { DateTime } from 'luxon';
import { INFINITE_DATE } from '../../constants/dateTimeConstants';
import ProfileEditForm from './ProfileEditForm';
import { fetchUnits } from '../../store/customReport/customReportAvailableUnitSlice';
import ProfileUnitManager from './ProfileUnitManager.js';

const ProfileEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [profile, setProfile] = useState(null);
  const [state, setState] = useState(null);
  const relationTypes = useSelector((state) => state.customReportsProfileRelationType.items);
  const availableUnits = useSelector((state) => state.customReportAvailableUnits.items);

  useEffect(() => {
    dispatch(fetchRelationTypes());
    dispatch(fetchUnits());
  }, [dispatch]);

  useEffect(() => {
    customReportProfileService.getById(id).then(({ entity }) => {
      setProfile(entity);
      setState({
        name: entity.name,
        shortName: entity.short_name,
        code: entity.code,
        relationType: entity.relation_type_id || '',
        effectiveFrom: entity.effective_from ? DateTime.fromISO(entity.effective_from) : null,
        effectiveTo:
          entity.effective_to === INFINITE_DATE ? null : DateTime.fromISO(entity.effective_to),
        order: entity.order || '',
      });
    });
  }, [id]);

  const handleSave = () => {
    customReportProfileService
      .update(id, {
        name: state.name,
        short_name: state.shortName,
        code: state.code,
        relation_type_id: state.relationType || null,
        effective_from: state.effectiveFrom?.toISO() ?? null,
        effective_to: state.effectiveTo?.toISO() ?? INFINITE_DATE,
        order: state.order ? parseInt(state.order) : null,
      })
      .then(() => {
        history.goBack(); // вместо navigate(-1)
      });
  };

  const handleCancel = () => {
    history.goBack(); // отмена = назад
  };

  if (!profile || !state) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>Редактирование профиля: {profile.name}</h2>
      <ProfileEditForm
        profile={profile}
        relationTypes={relationTypes}
        state={state}
        setState={setState}
        onSave={handleSave}
        onCancel={handleCancel}
      />
      <ProfileUnitManager profileId={profile.id} availableUnits={availableUnits} />
    </div>
  );
};

export default ProfileEditPage;