import { Container } from 'react-bootstrap';
import { LoginForm } from '../../components/login-form/LoginForm';

export const Login = () => (
  <Container className="d-flex align-items-center justify-content-center h-100">
    <LoginForm />
  </Container>
);
