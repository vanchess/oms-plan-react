import { apiService } from './apiServiceBase';

export class customReportProfileUnitService extends apiService {
  static defaultHeaders = {
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
  };

  // Получить список unit, связанных с профилем
  static getByProfile(profileId) {
    const path = `custom-report-profiles/${profileId}/units`;
    return this.get(path).then(data => ({ entities: data }));
  }

  // Добавить unit к профилю
  static add(payload) {
    const path = 'profile-units';
    return this.post(path, payload, this.defaultHeaders).then(data => ({ entity: data }));
  }

  // Удалить связь unit с профилем
  static remove(id) {
    const path = `profile-units/${id}`;
    return this.delete(path, this.defaultHeaders).then(data => ({ entity: data }));
  }

  // Привязать plannedIndicator к unit профиля
  static attachPlannedIndicator(profileUnitId, plannedIndicatorId) {
    const path = `profile-units/${profileUnitId}/attach-planned-indicator`;
    const payload = { planned_indicator_id: plannedIndicatorId };
    return this.post(path, payload, this.defaultHeaders).then(data => ({ entity: data }));
  }

  // Отвязать plannedIndicator от unit профиля
  static detachPlannedIndicator(profileUnitId, plannedIndicatorId) {
    const path = `profile-units/${profileUnitId}/detach-planned-indicator`;
    const payload = { planned_indicator_id: plannedIndicatorId };
    return this.post(path, payload, this.defaultHeaders).then(data => ({ entity: data }));
  }

  // (Опционально) Получить все связанные plannedIndicators по unit профиля
  static getPlannedIndicators(profileUnitId) {
    const path = `profile-units/${profileUnitId}/planned-indicators`;
    return this.get(path).then(data => ({ entities: data.data }));
  }
}
