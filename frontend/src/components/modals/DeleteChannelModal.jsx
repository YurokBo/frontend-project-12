import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../store/services/channelsApi';
import showToastMessage from '../../utils/toast';

const DeleteChannelModal = ({ ...props }) => {
  const { t } = useTranslation();
  const { show, hide, channelId } = props;
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const deleteChannel = () => {
    removeChannel(channelId)
      .then((response) => {
        if (response.error?.status === 'FETCH_ERROR') {
          showToastMessage(t('errors.fetchError'), 'error');

          return;
        }

        hide();
        showToastMessage(t('toastContent.channelDeleted'));
      })
      .catch((error) => {
        showToastMessage(error.messages, 'error');
        throw Error(error);
      });
  };

  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modals.deleteChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('modals.confirmDelete')}
        </p>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" disabled={isLoading} onClick={hide}>
            {t('buttons.cancel')}
          </Button>
          <Button type="button" variant="danger" onClick={deleteChannel}>
            {t(`buttons.${isLoading ? 'deleting' : 'delete'}`)}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteChannelModal;
