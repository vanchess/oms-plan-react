export const userNameSelector = (store) => store.auth.user.name;

export const selectIsAuth = (state) => {
    return state.auth.token ? true : false;
}