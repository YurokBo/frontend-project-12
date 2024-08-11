import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';
import { useUpdateChannelMutation } from '../../store/services/channelsApi';
import { actions } from '../../store';
import { channelNameSchema } from '../../utils/validation';
import showToastMessage from '../../utils/toast';

export const RenameChannelModal = ({ ...props }) => {
  const { t } = useTranslation();
  const {
    show, hide, channelId, channelName,
  } = props;
  const [updateChannel, {
    isLoading,
  }] = useUpdateChannelMutation();
  const dispatch = useDispatch();
  const { channelsNames } = useSelector((state) => state.channels);
  const [oldChannelName, setOldChannelName] = useState(channelName || '');

  useEffect(() => {
    setOldChannelName(channelName);
  }, [channelName]);

  const INITIAL_VALUES = {
    name: oldChannelName,
  };

  const formik = useFormik({
    initialValues: {
      ...INITIAL_VALUES,
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

          dispatch(actions.addChannel({ ...response.data }));
          showToastMessage(t('toastContent.channelRenamed'));
          hide();
          formik.values.name = '';
        })
        .catch((error) => {
          showToastMessage(error.messages, 'error');
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
          {t('modals.renameChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      </Modal.Body>
    </Modal>
  );
};
