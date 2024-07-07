import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../store/services/messagesApi';

export const Messages = ({ channelTitle }) => {
  const { data } = useGetMessagesQuery();
  const { activeChannelId } = useSelector((state) => state.channels);
  const filteredMessagesByChannelId = data?.filter(
    (message) => message.channelId === activeChannelId,
  ) || [];
  const messagesCount = filteredMessagesByChannelId.length ?? '0';

  const getMessagesCountText = (count) => {
    if (count === 0 || count > 4) {
      return 'сообщений';
    }

    if (count > 1 && count < 5) {
      return 'сообщения';
    }

    return 'сообщение';
  };

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            { channelTitle }
          </b>
        </p>
        <span className="text-muted">
          { messagesCount }
          {' '}
          { getMessagesCountText(messagesCount) }
        </span>
      </div>
      <div id="messages-box" className="px-5 chat-messages overflow-auto">
        { filteredMessagesByChannelId.map((message) => (
          <div className="text-break mb-2" key={message.id}>
            <b>
              { message.username }
              :
              {' '}
            </b>
            { message.body }
          </div>
        )) }
      </div>
    </>
  );
};
