import { ToastContainer } from 'react-toastify';
import AppRoutes from './router';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/header/Header';

const App = () => (
  <>
    <Header />
    <AppRoutes />
    <ToastContainer />
  </>
);

export default App;
