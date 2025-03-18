import { configureStore } from '@reduxjs/toolkit';
import appReducer from './Reducer/appReducer';


const store = configureStore({
    reducer: {
        app: appReducer,
    },
});

export default store;
// import { createSlice } from '@reduxjs/toolkit';
