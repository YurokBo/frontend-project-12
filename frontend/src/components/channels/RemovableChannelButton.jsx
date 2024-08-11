import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export const RemovableChannelButton = (props) => {
  const { t } = useTranslation();
  const {
    id,
    activeChannelId,
    handleActiveChannelId,
    name,
    handleToggleRenameChannelModal,
    handleToggleDeleteChannelModal,
  } = props;

  const variant = id === activeChannelId ? 'secondary' : null;

  return (
    <Dropdown className="d-flex justify-content-between w-100" as={ButtonGroup}>
      <Button
        type="button"
        className="w-100 border-0 rounded-start-3 text-start text-truncate p-2"
        variant={variant}
        onClick={() => handleActiveChannelId(id)}
      >
        <span className="me-1">#</span>
        <span>{ name }</span>
      </Button>
      <Dropdown.Toggle
        className="flex-grow-0 py-0 px-2"
        split
        variant={variant}
      >
        <span className="visually-hidden">{t('channel.toggleMenu')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          as="button"
          onClick={
            () => handleToggleRenameChannelModal({
              id,
              name,
            })
          }
        >
          {t('buttons.rename')}
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          onClick={() => handleToggleDeleteChannelModal(id)}
        >
          {t('buttons.delete')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
