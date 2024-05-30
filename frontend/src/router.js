import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/login/Login";
import { NotFound } from "./pages/not-found/NotFound";
import { Home } from "./pages/home/Home";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
