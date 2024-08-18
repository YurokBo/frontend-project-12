import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { actions } from '../../store';
import DeleteChannelModal from '../modals/DeleteChannelModal';
import DefaultChannelButton from './DefaultChannelButton';
import RemovableChannelButton from './RemovableChannelButton';

const Channels = () => {
  const dispatch = useDispatch();

  const { channels, activeChannelId } = useSelector((state) => state.channels);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [channelId, setChannelId] = useState('');

  const handleActiveChannelId = (id) => {
    const activeChannel = channels.find((channel) => id === channel.id);

    dispatch(actions.setActiveChannelId(id));
    dispatch(actions.setActiveChannel(activeChannel));
  };

  const handleToggleDeleteChannelModal = (id) => {
    setDeleteModalOpen(!isDeleteModalOpen);
    setChannelId(id);
  };

  const openBaseModal = (channelId) => {
    dispatch(actions.openModal({ componentName: 'rename', modalTitle: 'modals.addChannel', channelId }));
  };

  return (
    <>
      <ul className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {
          channels.map((channel) => (
            <li key={channel.id}>
              { channel.removable
                ? (
                  <RemovableChannelButton
                    name={channel.name}
                    id={channel.id}
                    activeChannelId={activeChannelId}
                    handleActiveChannelId={handleActiveChannelId}
                    handleOpenRenameChannelModal={() => openBaseModal(channel.id)}
                    handleToggleDeleteChannelModal={handleToggleDeleteChannelModal}
                  />
                )
                : (
                  <DefaultChannelButton
                    name={channel.name}
                    id={channel.id}
                    activeChannelId={activeChannelId}
                    handleActiveChannelId={handleActiveChannelId}
                  />
                ) }
            </li>
          ))
        }
      </ul>
      <DeleteChannelModal
        show={isDeleteModalOpen}
        hide={() => handleToggleDeleteChannelModal()}
        channelId={channelId}
      />
    </>
  );
};

export default Channels;
