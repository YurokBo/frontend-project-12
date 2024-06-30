import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { useRemoveChannelMutation } from "../../store/services/channelsApi";

export const Channels = () => {
  const dispatch = useDispatch();
  const [ removeChannel ] = useRemoveChannelMutation();

  const { channels, activeChannelId } = useSelector((state) => state.channels);

  const [ isRenameModalOpen, setRenameModalOpen ] = useState(false);
  const [ renameChannelData, setRenameChannelData ] = useState({ id: '', name: '' });


  const handleActiveChannelId = (id) => {
    dispatch(actions.setActiveChannelId(id));
  }

  const handleUpdateChannel = ({ id, name }) => {
    setRenameChannelData(cloneDeep({ id, name }));
    setRenameModalOpen(!isRenameModalOpen);
  }

  const deleteChannel = (id) => {
    removeChannel(id);
  }

  return (
    <ul className="flex-column px-2 mb-3 overflow-auto h-100 d-block">
      {
        channels.map(channel => {
          return (<li key={ channel.id }>
            { channel.removable ?
              <Dropdown className="d-flex justify-content-between w-100" as={ ButtonGroup }>
                <Button
                  type={"button"}
                  key={ channel.id }
                  className="w-100 border-0 rounded-start-3 text-start text-truncate p-2"
                  variant={ channel.id === activeChannelId ? 'secondary' : null }
                  onClick={ () => handleActiveChannelId(channel.id) }
                >
                  <span className="me-1">#</span>
                  <span>{ channel.name }</span>
                </Button>
                <Dropdown.Toggle className="flex-grow-0 p-0 " split variant={ channel.id === activeChannelId ? 'secondary' : null } />
                <Dropdown.Menu>
                  <Dropdown.Item
                    as="button"
                    // onClick={ () => handleUpdateChannel({ id: channel.id, name: channel.name }) }
                  >
                    Переименовать
                  </Dropdown.Item>
                  <Dropdown.Item
                    as="button"
                    // onClick={ () => deleteChannel(channel.id) }
                  >
                    Удалить
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> :
              <Button
                type={"button"}
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
  )
}
