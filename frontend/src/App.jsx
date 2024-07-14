import { ToastContainer } from 'react-toastify';
import { AppRoutes } from './router';
import { Header } from './components/header/Header';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <>
    <Header />
    <AppRoutes />
    <ToastContainer />
  </>
);

export default App;
