import { useFormik } from "formik";
import { Button, Card, Col, Container, Form, Row, Image, FloatingLabel } from "react-bootstrap";
import LoginImage from '../../assets/images/login-image.jpeg'
import { login } from "../../api/api";
import { useDispatch } from "react-redux";
import { actions } from "../../store/slices/auth";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      login(values).then(response => {
        console.log(response.data)
        dispatch(actions.setUser(response.data));
        navigate('/');
      }).catch(error => {
        throw Error(error)
      })
    },
  });
  return (
    <Container className="container-fluid d-flex align-items-center justify-content-center w-100">
      <Card className="shadow-sm col-xl-8">
        <Card.Body className="p-5">
          <Row>
            <Col xl={ 6 } className="d-flex align-items-center justify-content-center" >
              <Image src={ LoginImage } fluid />
            </Col>
            <Col xl={ 6 }>
              <h1 className="text-center mb-4">Войти</h1>
              <Form onSubmit={formik.handleSubmit}>
                <FloatingLabel label="Ваш ник" className="mb-3">
                  <Form.Control
                    id="username"
                    type="text"
                    placeholder="Ваш ник"
                    onChange={ formik.handleChange }
                    value={ formik.values.username }
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label="Пароль" className="mb-4">
                  <Form.Control
                    id="password"
                    type="password"
                    placeholder="Пароль"
                    onChange={ formik.handleChange }
                    value={ formik.values.password }
                    autoComplete="current-password"
                    required
                  />
                </FloatingLabel>
                <Button as="input" type="submit" variant="outline-primary" value="Войти" className="w-100" />
              </Form>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="p-4">
          <div className="text-center">
            <span>Нет аккаунта? </span>
            <Card.Link href="#">Регистрация</Card.Link>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  )
}
