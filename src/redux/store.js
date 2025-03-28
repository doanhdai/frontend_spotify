
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './Reducer/appReducer';
import authReducer from './Reducer/authSlice';
import playerReducer from './Reducer/playerSlice';
const store = configureStore({
    reducer: {
        app: appReducer,  
        auth: authReducer,
        player: playerReducer,
    },
});

export default store;