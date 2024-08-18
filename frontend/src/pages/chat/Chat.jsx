import { useDispatch, useSelector } from 'react-redux';
import { useEffect/* , useState */ } from 'react';
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
// import AddChannelModal from '../../components/modals/AddChannelModal';
import MessageForm from '../../components/message/MessageForm';
import Messages from '../../components/message/Messages';
import Channels from '../../components/channels/Channels';
import BaseModal from '../../components/modals/BaseModal';

const Chat = () => {
  const { data, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const {
    channels, activeChannelId, /* channelsNames, */
  } = useSelector((state) => state.channels);
  // const [isModalOpen, setModalOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(actions.setChannels(data));

    if (data) {
      const activeChannel = data.find((channel) => channel.name === 'general');

      dispatch(actions.setActiveChannel(activeChannel));
      dispatch(actions.setActiveChannelId(activeChannel.id));
    }
  }, [data, channels, dispatch]);

  // const handleToggleAddChannelModal = () => {
  //   setModalOpen(!isModalOpen);
  // };

  const openBaseModal = () => {
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
                      onClick={openBaseModal}
                      // onClick={handleToggleAddChannelModal}
                    >
                      <PlusLg />
                      <span className="visually-hidden">+</span>
                    </Button>
                  </div>
                  <Channels />
                </Col>
                <Col className="d-flex flex-column h-100 p-0">
                  <Messages />
                  <MessageForm />
                </Col>
              </Row>
            </Tab.Container>
            )}
            {/* <AddChannelModal */}
            {/*  show={isModalOpen} */}
            {/*  hide={() => handleToggleAddChannelModal()} */}
            {/*  channelsNames={channelsNames} */}
            {/* /> */}
            <BaseModal />
          </Container>
        )}
    </div>
  );
};

export default Chat;
