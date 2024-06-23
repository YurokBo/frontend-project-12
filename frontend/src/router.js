import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { NotFound } from "./pages/not-found/NotFound";
import { Chat } from "./pages/chat/Chat";
import { PrivateRoute } from "./components/private-route/PrivateRoute";
import { useSelector } from "react-redux";

export const AppRoutes = () => {
  const auth = useSelector((state) => state.auth);
  const isAllowed = Boolean(auth.token);
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
