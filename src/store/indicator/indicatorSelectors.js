export const indicatorsSelector = (store) => {
    return store.indicator.entities;
}

export const indicatorsIdsSelector = (store) => {
    return store.indicator.ids;
}

export const indicatorsIsLoadingSelector = (store) => {
    return store.indicator.loading;
}