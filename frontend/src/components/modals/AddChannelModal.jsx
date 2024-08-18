import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAddChannelMutation } from '../../store/services/channelsApi';
import { channelNameSchema } from '../../utils/validation';
import showToastMessage from '../../utils/toast';
import { actions } from '../../store';

const AddChannelModal = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const [addChannel, {
    isLoading,
  }] = useAddChannelMutation();
  const dispatch = useDispatch();

  const { channels } = useSelector((state) => state.channels);
  const channelsNames = channels.map(({ name }) => name);

  const [isSendDisabled, setSendDisabled] = useState(false);

  const initialValues = {
    name: '',
  };

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: channelNameSchema(channelsNames),
    validateOnBlur: true,
    onSubmit: (values) => {
      const { name } = values;
      const trimmedName = leoProfanity.clean(name.trim());

      addChannel({ name: trimmedName })
        .then((response) => {
          if (response.error?.status === 'FETCH_ERROR') {
            showToastMessage(t('errors.fetchError'), 'error');

            return;
          }

          const { data } = response;

          showToastMessage(t('toastContent.channelCreated'));
          handleCloseModal();
          formik.values.name = '';

          dispatch(actions.setActiveChannelId(data.id));
          dispatch(actions.setActiveChannel(data));
        })
        .catch((error) => {
          showToastMessage(error.messages, 'error');
          throw Error(error);
        });
    },
  });

  useEffect(() => {
    setSendDisabled(isLoading
      || !formik.values.name.length
      || !formik.isValid
      || formik.isSubmitting);
  }, [isLoading, formik.values.name.length, formik.isValid, formik.isSubmitting]);

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
        <Button variant="secondary" disabled={isLoading} onClick={handleCloseModal}>
          {t('buttons.cancel')}
        </Button>
        <Button disabled={isSendDisabled} type="submit">
          {t(`buttons.${isLoading ? 'loading' : 'send'}`)}
        </Button>
      </div>
    </Form>
  );
};

export default AddChannelModal;
