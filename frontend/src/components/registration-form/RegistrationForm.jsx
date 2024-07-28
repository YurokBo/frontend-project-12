import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { signup } from '../../store/api/api';
import { actions } from '../../store/slices/auth';
import LoginImage from '../../assets/images/registration-image.jpg';
import { signUpSchema } from '../../utils/validation';
import showToastMessage from '../../utils/toast';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const [isValid, setValidation] = useState(true);
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: signUpSchema(),
    onSubmit: (values) => {
      signup(values)
        .then((response) => {
          dispatch(actions.setUser(response.data));
          setValidation(true);
          navigate('/');
        })
        .catch((error) => {
          if (error?.code === 'ERR_NETWORK') {
            showToastMessage(t('errors.fetchError'), 'error');

            return;
          }

          if (error.response?.status === 409) {
            rollbar.error('RegistrationPage sendData error', error);
            setAuthError('Такой пользователь уже существует');
            setValidation(false);
          }
        });
    },
  });

  // const handleChange = (event) => {
  //   setAuthError(null);
  //   setValidation(true);
  //   formik.handleChange(event);
  // };

  useEffect(() => {
    console.log(formik.errors);
    console.log(formik.isValid);
  }, [formik]);

  return (
    <Container className="col-12 col-md-8 col-xxl-6">
      <Card className="shadow-sm">
        <Card.Body className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
          <Row className="w-100">
            <Col className="d-flex align-items-center justify-content-center">
              <Image src={LoginImage} fluid />
            </Col>
            <Col>
              <h1 className="text-center mb-4">
                {t('auth.registration')}
              </h1>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel label={t('placeholders.username')} className="mb-3">
                    <Form.Control
                      id="username"
                      type="text"
                      placeholder={t('placeholders.username')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      required
                      isInvalid={!formik.isValid || !isValid}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel label={t('placeholders.password')} className="mb-4">
                    <Form.Control
                      id="password"
                      type="password"
                      placeholder={t('placeholders.password')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      autoComplete="current-password"
                      required
                      isInvalid={!formik.isValid || !isValid}
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <FloatingLabel label={t('placeholders.passwordConfirm')} className="mb-4">
                    <Form.Control
                      id="confirmPassword"
                      type="password"
                      placeholder={t('placeholders.passwordConfirm')}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      autoComplete="current-password"
                      required
                      isInvalid={!formik.isValid || !isValid}
                    />
                    {/* { !formik.isValid */}
                    {/*  && ( */}
                    {/*  <Form.Control.Feedback type="invalid" tooltip> */}
                    {/*    { t(formik.errors.confirmPassword) } */}
                    {/*  </Form.Control.Feedback> */}
                    {/*  )} */}
                    {
                      !isValid
                      && (
                      <Form.Control.Feedback type="invalid" tooltip>
                        { t(authError) }
                      </Form.Control.Feedback>
                      )
                    }
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" variant="outline-primary" value="Зарегистрироваться" className="w-100">
                  {t('buttons.registration')}
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};
