import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Col,
  Container,
  Row,
  Tab,
} from 'react-bootstrap';
import { PlusLg } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { actions } from '../../store';
import {
  useGetChannelsQuery,
} from '../../store/services/channelsApi';
import MessageForm from '../../components/message/MessageForm';
import Messages from '../../components/message/Messages';
import Channels from '../../components/channels/Channels';
import BaseModal from '../../components/modals/BaseModal';

const Chat = () => {
  const { data: channels, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const {
    activeChannelId,
  } = useSelector((state) => state.channels);
  const { t } = useTranslation();

  const handleOpenBaseModal = () => {
    dispatch(actions.openModal({ componentName: 'add', modalTitle: 'modals.addChannel' }));
  };

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      { isLoading
        ? <div className="h-100 d-flex align-items-center justify-content-center">Loading...</div>
        : (
          <Container className="h-75 my-4 overflow-hidden rounded shadow position-relative">
            { !isLoading && channels
            && (
            <Tab.Container defaultActiveId={activeChannelId}>
              <Row className="h-100">
                <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
                  <div className="d-flex mt-1 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
                    <b>{t('chat.channels')}</b>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline-primary"
                      aria-label={t('modals.addChannel')}
                      className="p-1 text-primary btn btn-group-vertical"
                      onClick={handleOpenBaseModal}
                    >
                      <PlusLg />
                      <span className="visually-hidden">+</span>
                    </Button>
                  </div>
                  <Channels channels={channels} />
                </Col>
                <Col className="d-flex flex-column h-100 p-0">
                  <Messages channels={channels} />
                  <MessageForm />
                </Col>
              </Row>
            </Tab.Container>
            )}
            <BaseModal channels={channels} />
          </Container>
        )}
    </div>
  );
};

export default Chat;
