import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useUpdateChannelMutation } from '../../store/services/channelsApi';
import { channelNameSchema } from '../../utils/validation';
import showToastMessage from '../../utils/toast';

const RenameChannelModal = ({ channels, handleCloseModal }) => {
  const { t } = useTranslation();
  const [updateChannel, {
    isLoading,
  }] = useUpdateChannelMutation();

  const channelsNames = channels.map(({ name }) => name);

  const { channelId } = useSelector((state) => state.modal);
  const oldChannelName = channels.find(({ id }) => id === channelId).name;

  const initialValues = {
    name: oldChannelName,
  };

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    enableReinitialize: true,
    validationSchema: channelNameSchema(channelsNames),
    validateOnBlur: true,
    onSubmit: (values) => {
      const { name } = values;
      const trimmedName = leoProfanity.clean(name.trim());

      updateChannel({ name: trimmedName, id: channelId })
        .then((response) => {
          if (response.error?.status === 'FETCH_ERROR') {
            showToastMessage(t('errors.fetchError'), 'error');

            return;
          }

          showToastMessage(t('toastContent.channelRenamed'));
          handleCloseModal();
          formik.handleReset({ ...initialValues });
        })
        .catch((error) => {
          showToastMessage(error.messages, 'error');
          throw Error(error);
        });
    },
  });

  const handleHideModal = () => {
    handleCloseModal();
    formik.handleReset({ ...initialValues });
  };

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label htmlFor="name" visuallyHidden>{t('modals.channelName')}</Form.Label>
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
                {t(formik.errors.name)}
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
  );
};

export default RenameChannelModal;
