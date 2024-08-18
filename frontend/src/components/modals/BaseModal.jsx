import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions } from '../../store';
import AddChannelModal from './AddChannelModal';
import RenameChannelModal from './RenameChannelModel';

const modalComponents = {
  add: AddChannelModal,
  rename: RenameChannelModal,
};

const BaseModal = () => {
  const { isModalOpened, componentName, modalTitle } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const ModalComponent = modalComponents[componentName];

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
        {ModalComponent && <ModalComponent handleCloseModal={handleCloseModal} />}
      </Modal.Body>
    </Modal>
  );
};

export default BaseModal;
