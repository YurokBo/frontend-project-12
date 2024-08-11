import { Button } from 'react-bootstrap';

export const DefaultChannelButton = (props) => {
  const {
    id, activeChannelId, handleActiveChannelId, name,
  } = props;

  const variant = id === activeChannelId ? 'secondary' : null;

  return (
    <Button
      type="button"
      variant={variant}
      className="w-100 rounded-0 text-start text-truncate"
      onClick={() => handleActiveChannelId(id)}
    >
      <span className="me-1">#</span>
      <span>{ name }</span>
    </Button>
  );
};
