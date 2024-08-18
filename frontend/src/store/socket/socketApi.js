import { io } from 'socket.io-client';
import { messagesApi } from '../services/messagesApi';
import { channelsApi } from '../services/channelsApi';
import { actions } from '../index';

const initSocket = (store) => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      draftChannels.push(payload);
    }));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const newChannels = draftChannels.filter((channel) => channel.id !== payload.id);
      store.dispatch(actions.setActiveChannelId(newChannels[0].id));
      return newChannels;
    }));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const newChannel = draftChannels.find((channel) => channel.id === payload.id);
      newChannel.name = payload.name;
      newChannel.id = payload.id;
    }));
  });
};

export default initSocket;
