import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { useState } from "react";
import { useRemoveChannelMutation } from "../../store/services/channelsApi";
import { DeleteChannelModal } from "../modals/DeleteChannelModal";

export const Channels = () => {
  const dispatch = useDispatch();

  const { channels, activeChannelId } = useSelector((state) => state.channels);

  const [ isDeleteModalOpen, setDeleteModalOpen ] = useState(false);
  const [ channelId, setChannelId ] = useState('');

  const handleActiveChannelId = (id) => {
    dispatch(actions.setActiveChannelId(id));
  }

  const handleToggleDeleteChannelModal = (id) => {
    setDeleteModalOpen(!isDeleteModalOpen);
    setChannelId(id);
  }

  return (
    <>
      <ul className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
        {
          channels.map(channel => {
            return (<li key={ channel.id }>
              { channel.removable ?
                <Dropdown className="d-flex justify-content-between w-100" as={ ButtonGroup }>
                  <Button
                    type={ "button" }
                    key={ channel.id }
                    className="w-100 border-0 rounded-start-3 text-start text-truncate p-2"
                    variant={ channel.id === activeChannelId ? 'secondary' : null }
                    onClick={ () => handleActiveChannelId(channel.id) }
                  >
                    <span className="me-1">#</span>
                    <span>{ channel.name }</span>
                  </Button>
                  <Dropdown.Toggle
                    className="flex-grow-0 py-0 px-2"
                    split
                    variant={ channel.id === activeChannelId ? 'secondary' : null }
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      as="button"
                      // onClick={ () => handleUpdateChannel({ id: channel.id, name: channel.name }) }
                    >
                      Переименовать
                    </Dropdown.Item>
                    <Dropdown.Item
                      as="button"
                      onClick={ () => handleToggleDeleteChannelModal(channel.id) }
                    >
                      Удалить
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> :
                <Button
                  type={ "button" }
                  key={ channel.id }
                  variant={ channel.id === activeChannelId ? 'secondary' : null }
                  className="w-100 rounded-3 text-start p-2"
                  onClick={ () => handleActiveChannelId(channel.id) }
                >
                  <span className="me-1">#</span>
                  <span>{ channel.name }</span>
                </Button>
              }
            </li>)
          })
        }
      </ul>
      <DeleteChannelModal
        show={ isDeleteModalOpen }
        hide={ () => handleToggleDeleteChannelModal() }
        channelId={ channelId }
      />
    </>
  )
}
