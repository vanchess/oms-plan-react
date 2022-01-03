export const moHavingDepartmentsSelector = (store) => {
    return store.mo.idsHavingDepartments.map(id => store.mo.entities[id])
}