import { useGetChannelsQuery, useRemoveChannelMutation } from "../../store/services/channelsApi";
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
import { AddChannelModal } from "../../components/Modal/Modal";

export const Chat = () => {
  const { data, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.channels)
  const [ defaultChannel, setDefaultChannel ] = useState([])
  const [ defaultActiveId, setDefaultActiveId ] = useState(null)
  const [ title, setTitle ] = useState(defaultChannel.name);
  const [ isModalOpen, setModalOpen ] = useState(false);
  const [ removeChannel ] = useRemoveChannelMutation();

  useEffect(() => {
      console.log('useEffect')
      dispatch(actions.setChannels(data))
      if (data || channels?.length) {
        setDefaultChannel(data[0]);
        setDefaultActiveId(defaultChannel.id)
      }
    }, [ data, channels, dispatch, defaultChannel.id, defaultActiveId ]
  );


  const openModal = () => {
    setModalOpen(!isModalOpen)
  }

  const deleteChannel = (id) => {
    removeChannel(id);
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
        <Tab.Container defaultActiveId={ defaultActiveId }>
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
                        as="button"
                        variant="secondary"
                        eventKey={ channel.id }
                        className="border-0 w-100 rounded-0 text-start text-black"
                        onClick={ () => setTitle(channel.name) }
                      >
                        <div className="d-flex justify-content-between align-items-center w-100">
                          { channel.removable ?
                            <Dropdown className="d-flex justify-content-between w-100" as={ ButtonGroup }>
                              <Button
                                type="button"
                                key={ channel.id }
                                className="w-100 rounded-0 text-start text-truncate p-0"
                                variant={ null }
                              >
                                <span className="me-1">#</span>
                                <span>{ channel.name }</span>
                              </Button>
                              <Dropdown.Toggle className="flex-grow-0 p-0" split variant={ null } />
                              <Dropdown.Menu>
                                <Dropdown.Item>Переименовать</Dropdown.Item>
                                <Dropdown.Item onClick={() => deleteChannel(channel.id)}>Удалить</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown> :
                            <Button
                              type="button"
                              key={ channel.id }
                              className="w-100 rounded-3 text-start p-0"
                              variant={ null }
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
                  <b># { title }</b>
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
    </Container>
  )
}
