import { Button, Modal, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useAddChannelMutation, useRemoveChannelMutation } from "../../store/services/channelsApi";
import { useDispatch } from "react-redux";
import { actions } from "../../store";
import { channelNameSchema } from "../../utils/validation";

export const DeleteChannelModal = ({ ...props }) => {
  const { show, hide, channelId } = props;
  const [ removeChannel, { isLoading } ] = useRemoveChannelMutation();

  const deleteChannel = () => {
    removeChannel(channelId);
    hide();
  }

  return (
    <Modal show={ show } onHide={ hide } centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" disabled={ isLoading } onClick={ hide }>Отменить</Button>
          <Button type="button" variant="danger" onClick={ deleteChannel }>
            { isLoading ? 'Удаление…' : 'Удалить' }
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
