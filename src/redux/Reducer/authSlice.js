
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // isLoggedIn: false,
        isLoggedIn: !!localStorage.getItem('access_token'),
        token: localStorage.getItem('access_token') || null,
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        logout(state, action) {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;