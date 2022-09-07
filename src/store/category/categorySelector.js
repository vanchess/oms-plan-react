export const categoryIsLoadingSelector = (store) => store.category.loading;
export const categorySelector = (store) => store.category.entities;

export const categoryByIdSelector = (store, id) => categorySelector(store)[id];
export const categoryNameByIdSelector = (store, id) => categoryByIdSelector(store, id)?.name;