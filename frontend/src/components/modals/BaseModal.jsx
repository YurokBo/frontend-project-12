import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../../store';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModel';
import DeleteChannelModal from './DeleteChannelModal';

const modalComponents = {
  add: AddChannelModal,
  rename: RenameChannelModal,
  delete: DeleteChannelModal,
};

const BaseModal = ({ channels }) => {
  const { isModalOpened, type, modalTitle } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ModalComponent = modalComponents[type];

  const handleCloseModal = () => {
    dispatch(actions.closeModal());
  };

  return (
    <Modal show={isModalOpened} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t(modalTitle)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          ModalComponent
          && <ModalComponent channels={channels} handleCloseModal={handleCloseModal} />
        }
      </Modal.Body>
    </Modal>
  );
};

export default BaseModal;
