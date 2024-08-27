import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../store';
import DefaultChannelButton from './DefaultChannelButton';
import RemovableChannelButton from './RemovableChannelButton';

const Channels = ({ channels }) => {
  const dispatch = useDispatch();
  const { activeChannelId } = useSelector((state) => state.channels);

  const handleActiveChannelId = (id) => {
    dispatch(actions.setActiveChannelId(id));
  };

  const handleOpenBaseModal = (action, channelId) => {
    dispatch(actions.openModal({ type: action, modalTitle: 'modals.renameChannel', channelId }));
  };

  return (
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
                    handleOpenBaseModal={
                    (action) => handleOpenBaseModal(action, channel.id)
                  }
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
  );
};

export default Channels;
