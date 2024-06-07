import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { NotFound } from "./pages/not-found/NotFound";
import { Chat } from "./pages/chat/Chat";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const authState = useSelector((state) => state.auth);
  const isAllowed = Boolean(user?.token || authState?.token);
  const redirectPath = isAllowed ? '/' : '/login'

  return (
    <Routes>
      <Route
        element={ <PrivateRoute redirectPath={ redirectPath } isAllowed={ isAllowed } /> }
      >
        <Route path="/" element={ <Chat /> } />
      </Route>
      <Route path="/login" element={ <Login /> } />

      <Route path="*" element={ <NotFound /> } />
    </Routes>
  )
}
