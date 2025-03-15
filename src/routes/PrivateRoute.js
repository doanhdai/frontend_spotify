import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { PlayerContext } from '@/context/PlayerContext';
import config from '@/configs';

const PrivateRoute = () => {
    const { user } = useContext(PlayerContext);
    if (!user) {
        return <Navigate to={config.routes.home} replace />;
    }
    return <Outlet />;
};

export default PrivateRoute;