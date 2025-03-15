import { configureStore } from '@reduxjs/toolkit';
import appReducer from './Reducer/appReducer';

const persistedLanguage = localStorage.getItem('language') || 'vi';

const initialState = {
    language: persistedLanguage,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            localStorage.setItem('language', action.language); // Lưu vào localStorage
            return { ...state, language: action.language };
        default:
            return state;
    }
};

const store = configureStore({
    reducer: {
        app: appReducer,
    },
});

export default store;
// import { createSlice } from '@reduxjs/toolkit';
