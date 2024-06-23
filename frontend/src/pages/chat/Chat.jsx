import {
  useGetChannelsQuery,
  useRemoveChannelMutation,
  useUpdateChannelMutation
} from "../../store/services/channelsApi";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Nav,
  Row,
  Tab,
  Dropdown,
  ButtonGroup
} from "react-bootstrap";
import { PlusLg } from "react-bootstrap-icons";
import { AddChannelModal } from "../../components/Modals/AddChannelModal";
import { RenameChannelModal } from "../../components/Modals/RenameChannelModal";
import { cloneDeep } from "lodash";

export const Chat = () => {
  const { data, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { channels, activeChannel, activeChannelId } = useSelector((state) => state.channels);
  const [ activeChannelTitle, setActiveChannelTitle ] = useState(null);
  const [ isModalOpen, setModalOpen ] = useState(false);
  const [ removeChannel ] = useRemoveChannelMutation();
  // const [ updateChannel ] = useUpdateChannelMutation();
  const [ isRenameModalOpen, setRenameModalOpen ] = useState(false);
  const [ renameChannelData, setRenameChannelData ] = useState({ id: '', name: '' });

  useEffect(() => {
      dispatch(actions.setChannels(data));

      if (data) {
        dispatch(actions.setActiveChannel(data[0]));
        dispatch(actions.setActiveChannelId(data[0].id))
        setActiveChannelTitle(activeChannel.name)
      }
    }, [ data, channels, activeChannel ]
  );


  const openModal = () => {
    setModalOpen(!isModalOpen)
  }

  const deleteChannel = (id) => {
    removeChannel(id);
  }

  const handleUpdateChannel = ({ id, name }) => {
    setRenameChannelData(cloneDeep({ id, name }));
    setRenameModalOpen(!isRenameModalOpen);
  }

  const handleActiveChannelId = (id) => {
    dispatch(actions.setActiveChannelId(id))
  }

  if (isLoading) {

    return (
      <Container className="h-75 my-4 overflow-hidden rounded shadow">
        <div>Loading...</div>
      </Container>
    )
  }

  return (
    <Container className="h-75 my-4 overflow-hidden rounded shadow">
      { !isLoading && channels &&
        <Tab.Container defaultActiveId={ activeChannel.id }>
          <Row className="h-100">
            <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between align-items-center mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
                <Button
                  type="button" size="sm" variant="outline-primary"
                  className="p-1 text-primary btn btn-group-vertical"
                  onClick={ openModal }
                >
                  <PlusLg />
                  <span className="visually-hidden">+</span>
                </Button>
              </div>
              <Nav as="ul" variant="pills" className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
                { channels.map(channel => {
                  return (
                    <Nav.Item as="li" key={ channel.id }>
                      <Nav.Link
                        as="a"
                        variant="secondary"
                        eventKey={ channel.id }
                        className="border-0 w-100 rounded-0 text-start text-black"
                        onClick={ () => setActiveChannelTitle(channel.name) }
                      >
                        <div className="d-flex justify-content-between align-items-center w-100">
                          { channel.removable ?
                            <Dropdown className="d-flex justify-content-between w-100" as={ ButtonGroup }>
                              <Button
                                type="button"
                                key={ channel.id }
                                className="w-100 rounded-0 text-start text-truncate p-0"
                                variant={ channel.id === activeChannelId ? 'secondary' : null }
                                onClick={ () => handleActiveChannelId(channel.id) }
                              >
                                <span className="me-1">#</span>
                                <span>{ channel.name }</span>
                              </Button>
                              <Dropdown.Toggle className="flex-grow-0 p-0" split variant={ null } />
                              <Dropdown.Menu>
                                <Dropdown.Item
                                  as="button"
                                  onClick={ () => handleUpdateChannel({ id: channel.id,  name: channel.name }) }
                                >
                                  Переименовать
                                </Dropdown.Item>
                                <Dropdown.Item
                                  as="button"
                                  onClick={ () => deleteChannel(channel.id) }
                                >
                                  Удалить
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown> :
                            <Button
                              type="button"
                              key={ channel.id }
                              className="w-100 rounded-3 text-start p-0"
                              variant={ channel.id === activeChannelId ? 'secondary' : null }
                              onClick={ () => handleActiveChannelId(channel.id) }
                            >
                              <span className="me-1">#</span>
                              <span>{ channel.name }</span>
                            </Button>
                          }
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  )
                }) }
              </Nav>
            </Col>
            <Col className="p-0">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b># { activeChannelTitle }</b>
                </p>
                <span className="text-muted">
                0 сообщений
              </span>
              </div>
            </Col>
          </Row>
        </Tab.Container>
      }
      <AddChannelModal show={ isModalOpen } hide={ () => openModal() } />
      <RenameChannelModal
        show={ isRenameModalOpen }
        hide={ () => setRenameModalOpen(!isRenameModalOpen) }
        renameChannelData={ renameChannelData }
      />
    </Container>
  )
}
