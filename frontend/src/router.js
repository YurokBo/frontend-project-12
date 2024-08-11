import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/NotFound';
import Chat from './pages/chat/Chat';
import PrivateRoute from './components/private-route/PrivateRoute';
import Registration from './pages/registration/Registration';

const AppRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const isAllowed = Boolean(auth.token);
  const redirectPath = isAllowed ? '/' : '/login';

  return (
    <Routes>
      <Route
        element={<PrivateRoute redirectPath={redirectPath} isAllowed={isAllowed} />}
      >
        <Route path="/" element={<Chat />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
