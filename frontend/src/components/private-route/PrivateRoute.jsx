import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ({ redirectPath = '/login', isAllowed }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
