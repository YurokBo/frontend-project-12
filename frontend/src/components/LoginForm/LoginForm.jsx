import { useFormik } from "formik";
import { Button, Card, Col, Container, Form, Row, Image, FloatingLabel } from "react-bootstrap";
import LoginImage from '../../assets/images/login-image.jpeg'
import { login } from "../../store/api/api";
import { useDispatch } from "react-redux";
import { actions } from "../../store/slices/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ authError, setAuthError ] = useState(null);
  const [ isValid, setValidation ] = useState(true);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: values => {
      login(values).then(response => {
        dispatch(actions.setUser(response.data));
        setValidation(true);
        navigate('/');
      }).catch(error => {
        if (error.response?.status === 401) {
          setAuthError('Неверные имя пользователя или пароль');
          setValidation(false);
        }
      })
    },
  });

  const handleChange = (event) => {
    setAuthError(null);
    setValidation(true);
    formik.handleChange(event);
  };

  return (
    <Container className="container-fluid d-flex align-items-center justify-content-center w-100">
      <Card className="shadow-sm col-xl-8">
        <Card.Body className="p-5">
          <Row>
            <Col xl={ 6 } className="d-flex align-items-center justify-content-center">
              <Image src={ LoginImage } fluid />
            </Col>
            <Col xl={ 6 }>
              <h1 className="text-center mb-4">Войти</h1>
              <Form onSubmit={ formik.handleSubmit }>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel label="Ваш ник" className="mb-3">
                    <Form.Control
                      id="username"
                      type="text"
                      placeholder="Ваш ник"
                      onChange={ handleChange }
                      value={ formik.values.username }
                      required
                      isInvalid={!isValid}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel label="Пароль" className="mb-4">
                    <Form.Control
                      id="password"
                      type="password"
                      placeholder="Пароль"
                      onChange={ handleChange }
                      value={ formik.values.password }
                      autoComplete="current-password"
                      required
                      isInvalid={!isValid}
                    />
                    { !isValid && authError &&
                      <Form.Control.Feedback type="invalid" tooltip>
                        { authError }
                      </Form.Control.Feedback> }
                  </FloatingLabel>
                </Form.Group>
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
