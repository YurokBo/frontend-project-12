import { LoginForm } from "../../components/login-form/LoginForm";
import { Container } from "react-bootstrap";

export const Login = () => {

  return (
    <Container className="d-flex align-items-center justify-content-center h-100">
      <LoginForm />
    </Container>
  )
}
