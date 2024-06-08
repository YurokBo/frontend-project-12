import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { actions } from "../../store";

export const Header = () => {
  const dispatch = useDispatch();

  const logout = () => dispatch(actions.removeUser())

  return (
    <Navbar className="bg-body-tertiary shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        <Button onClick={logout}>Выйти</Button>
      </Container>
    </Navbar>
  )
}
