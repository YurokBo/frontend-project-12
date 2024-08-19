import { Navigate, Outlet } from 'react-router-dom';
import { routes } from '../../helpers/routes';

const PrivateRoute = ({ redirectPath = routes.loginPage(), isAllowed }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
