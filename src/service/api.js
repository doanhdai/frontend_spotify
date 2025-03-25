import axios from 'axios';
import store from '../redux/store';
import { logout, login } from '../redux/Reducer/authSlice'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_REACT_API,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token || localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// instance.interceptors.response.use(
//   (response) => response.data,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         await axios.get("http://localhost:8000/api/v1/auth/token/refresh/", {
//           withCredentials: true,
//         });
//         return instance(originalRequest);
//       } catch (err) {
//         console.error("Refresh token failed, redirecting to login...");
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );


export default apiClient;