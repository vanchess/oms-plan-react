export const indicatorsSelector = (store) => {
    return store.indicator.entities;
}

export const indicatorsIsLoadingSelector = (store) => {
    return store.indicator.loading;
}