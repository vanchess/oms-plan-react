export const vmpTypesSelector = state => state.vmpTypes.entities;
export const vmpTypesIdsSelector = state => state.vmpTypes.ids;

export const vmpTypesIsLoadingSelector = state => state.vmpTypes.loading;

export const vmpTypeByIdSelector = (state, id) => {
    return vmpTypesSelector(state)[id];
}