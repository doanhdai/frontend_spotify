import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx';
import './index.css';
import store from '@/redux/store.js';
import PlayerContextProvider from '@/context/PlayerContext.jsx';

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <Provider store={store}>
        <PlayerContextProvider>
            <ToastContainer />
            <App />
        </PlayerContextProvider>
    </Provider>,
    // </StrictMode>,
);
