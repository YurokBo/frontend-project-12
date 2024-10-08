import { Button, Container, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { actions } from '../../store';
import { routes } from '../../helpers/routes';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const href = auth.token ? routes.rootPage() : routes.loginPage();

  const logout = () => dispatch(actions.setDefaultUserData());

  return (
    <Navbar className="bg-body-tertiary shadow-sm navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <Container>
        <Link to={href} className="navbar-brand">Hexlet Chat</Link>
        { auth.token && <Button onClick={logout}>{t('buttons.logOut')}</Button> }
      </Container>
    </Navbar>
  );
};

export default Header;
