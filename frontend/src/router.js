import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/login/Login';
import NotFound from './pages/not-found/NotFound';
import Chat from './pages/chat/Chat';
import PrivateRoute from './components/private-route/PrivateRoute';
import Registration from './pages/registration/Registration';
import { routes } from './helpers/routes';

const AppRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const isAllowed = Boolean(auth.token);
  const redirectPath = isAllowed ? routes.rootPage() : routes.loginPage();

  return (
    <Routes>
      <Route
        element={<PrivateRoute redirectPath={redirectPath} isAllowed={isAllowed} />}
      >
        <Route path={routes.rootPage()} element={<Chat />} />
      </Route>
      <Route path={routes.loginPage()} element={<Login />} />
      <Route path={routes.signupPage()} element={<Registration />} />

      <Route path={routes.notFoundPage()} element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
