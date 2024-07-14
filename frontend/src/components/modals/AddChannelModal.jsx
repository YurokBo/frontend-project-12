import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAddChannelMutation } from '../../store/services/channelsApi';
import { actions } from '../../store';
import { channelNameSchema } from '../../utils/validation';

export const AddChannelModal = ({ ...props }) => {
  const { t } = useTranslation();
  const { show, hide, channelsNames } = props;
  const [addChannel, {
    isLoading,
  }] = useAddChannelMutation();
  const dispatch = useDispatch();

  const INITIAL_VALUES = {
    name: '',
  };

  const formik = useFormik({
    initialValues: {
      ...INITIAL_VALUES,
    },
    validationSchema: channelNameSchema(channelsNames),
    validateOnBlur: true,
    onSubmit: (values) => {
      const { name } = values;
      const trimmedName = name.trim();

      addChannel({ name: trimmedName })
        .then((response) => {
          dispatch(actions.addChannel({ ...response.data }));
          hide();
          formik.values.name = '';
        })
        .catch((error) => {
          throw Error(error);
        });
    },
  });

  const handleHideModal = () => {
    hide();
    formik.handleReset({ ...INITIAL_VALUES });
  };

  return (
    <Modal show={show} onHide={handleHideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.addChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control
              id="name"
              type="text"
              autoFocus
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={!formik.isValid}
            />
            { !formik.isValid
              && (
              <Form.Control.Feedback type="invalid">
                { formik.errors.name }
              </Form.Control.Feedback>
              )}
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" disabled={isLoading} onClick={handleHideModal}>
              {t('buttons.cancel')}
            </Button>
            <Button disabled={isLoading || !formik.values.name.length || !formik.isValid} type="submit">
              {t(`buttons.${isLoading ? 'loading' : 'send'}`)}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
