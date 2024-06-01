import { useFormik } from "formik";
import { Button, Card, Col, Container, Form, Row, Image, FloatingLabel } from "react-bootstrap";
import LoginImage from '../../assets/images/login-image.jpeg'

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values);
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
                <FloatingLabel controlId="floatingUsername" label="Ваш ник" className="mb-3">
                  <Form.Control
                    id="username"
                    type="text"
                    placeholder="Ваш ник"
                    onChange={ formik.handleChange }
                    value={ formik.values.username }
                    required
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Пароль" className="mb-4">
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
