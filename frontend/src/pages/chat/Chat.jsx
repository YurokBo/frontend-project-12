import {
  useGetChannelsQuery,
} from "../../store/services/channelsApi";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Tab,
} from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { AddChannelModal } from "../../components/modals/AddChannelModal";
import { RenameChannelModal } from "../../components/modals/RenameChannelModal";
import { MessageForm } from "../../components/message/MessageForm";
import { Messages } from "../../components/message/Messages";
import { Channels } from "../../components/channels/Channels";

export const Chat = () => {
  const { data, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { channels, activeChannel } = useSelector((state) => state.channels);
  const [ activeChannelTitle, setActiveChannelTitle ] = useState(null);
  const [ isModalOpen, setModalOpen ] = useState(false);
  // const [ updateChannel ] = useUpdateChannelMutation();
  const [ isRenameModalOpen, setRenameModalOpen ] = useState(false);

  const [channelsNames, setChannelsNames] = useState([])

  // const channelsNames = channels.map(({name}) => name);

  useEffect(() => {
      dispatch(actions.setChannels(data));

      if (data) {
        dispatch(actions.setActiveChannel(data[0]));
        dispatch(actions.setActiveChannelId(data[0].id))
        setActiveChannelTitle(activeChannel.name)
        setChannelsNames(data.map(({name}) => name))
      }
    }, [ data, channels, activeChannel ]
  );


  const handleToggleModal = () => {
    setModalOpen(!isModalOpen)
  }

  if (isLoading) {
    return (
      <Container className="h-75 my-4 overflow-hidden rounded shadow">
        <div>Loading...</div>
      </Container>
    )
  }

  return (
    <Container className="h-75 my-4 overflow-hidden rounded shadow position-relative">
      { !isLoading && channels &&
        <Tab.Container defaultActiveId={ activeChannel.id }>
          <Row className="h-100">
            <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button
                  type="button" size="sm" variant="outline-primary"
                  className="p-1 text-primary btn btn-group-vertical"
                  onClick={ handleToggleModal }
                >
                  <PlusLg />
                  <span className="visually-hidden">+</span>
                </Button>
              </div>
              <Channels />
            </Col>
            <Col className="d-flex flex-column h-100 p-0">
              <Messages channelTitle={ activeChannelTitle } />
              <MessageForm />
            </Col>
          </Row>
        </Tab.Container>
      }
      <AddChannelModal show={ isModalOpen } hide={ () => handleToggleModal() } channelsNames={channelsNames} />
      {/*<RenameChannelModal*/}
      {/*  show={ isRenameModalOpen }*/}
      {/*  hide={ () => setRenameModalOpen(!isRenameModalOpen) }*/}
      {/*/>*/}
    </Container>
  )
}
