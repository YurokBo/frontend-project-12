import { AppRoutes } from "./router";
import { Header } from "./components/Header/Header";
import { useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      { auth.token && <Header /> }
      <AppRoutes />
    </>
  );
}

export default App;
