import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { actions } from '../../store';
import { DeleteChannelModal } from '../modals/DeleteChannelModal';
import { RenameChannelModal } from '../modals/RenameChannelModel';
import { DefaultChannelButton } from './DefaultChannelButton';
import { RemovableChannelButton } from './RemovableChannelButton';

export const Channels = () => {
  const dispatch = useDispatch();

  const { channels, activeChannelId } = useSelector((state) => state.channels);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [channelId, setChannelId] = useState('');

  const [isRenameModalOpen, setRenameModalOpen] = useState(false);
  const [channelName, setChannelName] = useState('');

  const handleActiveChannelId = (id) => {
    dispatch(actions.setActiveChannelId(id));
    dispatch(actions.setActiveChannel(channels.find((channel) => id === channel.id)));
  };

  const handleToggleDeleteChannelModal = (id) => {
    setDeleteModalOpen(!isDeleteModalOpen);
    setChannelId(id);
  };

  const handleToggleRenameChannelModal = ({ id, name } = { id: '', name: '' }) => {
    setChannelId(id);
    setChannelName(name);
    setRenameModalOpen(!isRenameModalOpen);
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
                    handleToggleRenameChannelModal={handleToggleRenameChannelModal}
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
      <RenameChannelModal
        show={isRenameModalOpen}
        hide={() => handleToggleRenameChannelModal()}
        channelId={channelId}
        channelName={channelName}
        channels={channels}
      />
    </>
  );
};
