import { Button, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { Link } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const href = auth.token ? '/' : '/login'

  const logout = () => dispatch(actions.removeUser())

  return (
    <Navbar className="bg-body-tertiary shadow-sm navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <Container>
        <Link to={ href } className={'navbar-brand'}>Hexlet Chat</Link>
        { auth.token && <Button onClick={logout}>Выйти</Button> }
      </Container>
    </Navbar>
  )
}
