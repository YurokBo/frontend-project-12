import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useGetMessagesQuery } from '../../store/services/messagesApi';

const Messages = ({ channels }) => {
  const { t } = useTranslation();
  const { data } = useGetMessagesQuery();
  const { activeChannelId } = useSelector((state) => state.channels);
  const filteredMessagesByChannelId = data?.filter(
    (message) => message.channelId === activeChannelId,
  ) || [];
  const messagesCount = filteredMessagesByChannelId.length ?? '0';
  const activeChannelName = channels.find(({ id }) => id === activeChannelId)?.name;

  const messagesRef = useRef(null);
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            { activeChannelName }
          </b>
        </p>
        <span className="text-muted">
          { messagesCount }
          {' '}
          { t('chat.messages.messagesCount', { count: messagesCount }) }
        </span>
      </div>
      <div ref={messagesRef} id="messages-box" className="px-5 chat-messages overflow-auto">
        { filteredMessagesByChannelId.map((message) => (
          <div className="text-break mb-2" key={message.id}>
            <b>
              { message.username }
              {': '}
            </b>
            { message.body }
          </div>
        )) }
      </div>
    </>
  );
};

export default Messages;
