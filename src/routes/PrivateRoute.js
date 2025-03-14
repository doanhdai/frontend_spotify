import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { PlayerContext } from '@/context/PlayerContext';
import config from '@/configs';

const PrivateRoute = () => {
    const { user } = useContext(PlayerContext);

    // Nếu người dùng chưa đăng nhập, chuyển hướng về trang home
    if (!user) {
        return <Navigate to={config.routes.home} replace />;
    }

    // Nếu đã đăng nhập, cho phép truy cập route
    return <Outlet />;
};

export default PrivateRoute;