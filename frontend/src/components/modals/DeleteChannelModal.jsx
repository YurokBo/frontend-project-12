import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useRemoveChannelMutation } from '../../store/services/channelsApi';
import showToastMessage from '../../utils/toast';

const DeleteChannelModal = ({ handleCloseModal }) => {
  const { t } = useTranslation();
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const { channelId } = useSelector((state) => state.modal);

  const deleteChannel = () => {
    removeChannel(channelId)
      .then((response) => {
        if (response.error?.status === 'FETCH_ERROR') {
          showToastMessage(t('errors.fetchError'), 'error');

          return;
        }

        handleCloseModal();
        showToastMessage(t('toastContent.channelDeleted'));
      })
      .catch((error) => {
        showToastMessage(error.messages, 'error');
        throw Error(error);
      });
  };

  return (
    <>
      <p className="lead">
        {t('modals.confirmDelete')}
      </p>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" disabled={isLoading} onClick={handleCloseModal}>
          {t('buttons.cancel')}
        </Button>
        <Button type="button" variant="danger" onClick={deleteChannel}>
          {t(`buttons.${isLoading ? 'deleting' : 'delete'}`)}
        </Button>
      </div>
    </>
  );
};

export default DeleteChannelModal;
