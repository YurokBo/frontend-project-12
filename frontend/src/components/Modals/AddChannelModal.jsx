import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useAddChannelMutation } from "../../store/services/channelsApi";
import { useDispatch } from "react-redux";
import { actions } from "../../store";

export const AddChannelModal = ({ ...props }) => {
  const { show, hide } = props;
  const [addChannel, {isLoading, isSuccess}] = useAddChannelMutation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      const { name } = values;
      const trimmedName = name.trim();

      addChannel({name: trimmedName})
        .then((data) => {
          dispatch(actions.addChannel({ ...data }))
          hide();
          formik.values.name = '';
        })
        .catch((error) => {
          console.log(error);
        })
    }
  })
  return (
    <Modal show={ show } onHide={ hide } centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Добавить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={ formik.handleSubmit }>
          <Form.Group className="mb-2">
            <Form.Control
              id="name"
              type="text"
              autoFocus
              onChange={ formik.handleChange }
              value={formik.values.name}
            />
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={ hide }>Отменить</Button>
            <Button disabled={isLoading || !formik.values.name.length} type="submit">
              {isLoading ? 'Загрузка…' : 'Отправить'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
