import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useUpdateChannelMutation } from '../../store/services/channelsApi';
import { actions } from '../../store';
import { channelNameSchema } from '../../utils/validation';

export const RenameChannelModal = ({ ...props }) => {
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
      const trimmedName = name.trim();

      updateChannel({ name: trimmedName, id: channelId })
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
          Переименовать канал
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
            <Button variant="secondary" disabled={isLoading} onClick={handleHideModal}>Отменить</Button>
            <Button disabled={isLoading || !formik.values.name.length || !formik.isValid} type="submit">
              {isLoading ? 'Загрузка…' : 'Отправить'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
