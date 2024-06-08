import { useGetChannelsQuery } from "../../store/services/channelsApi";
import { useDispatch } from "react-redux";
import { actions } from "../../store";
import { useEffect } from "react";

export const Chat = () => {
  const { data: channels, isLoading } = useGetChannelsQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setChannels(channels))
  }, [channels, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (<div>{ channels.map(channel => {
    return (
      <div key={channel.id}>{channel.name}</div>
    )
  }) }</div>)
}
