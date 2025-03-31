import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import i18n from './Utils/i18n';
import './index.css';
import store from '@/redux/store.js';
import PlayerContextProvider from './context/PlayerContext.jsx';
import PlayerProvider from './service/PlayerProvider.jsx';
import AuthInitializer from './redux/Action/AuthInitializer.jsx';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Provider store={store}>
        <PlayerProvider>
            <AuthInitializer />
            <ToastContainer />
            <App />
        </PlayerProvider>
    </Provider>,
    // </StrictMode>,
);
