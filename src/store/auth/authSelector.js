
export const selectIsAuth = (state) => {
    return state.auth.token ? true : false;
}