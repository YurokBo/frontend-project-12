import { io } from 'socket.io-client';
import { messagesApi } from '../services/messagesApi';
import { channelsApi } from '../services/channelsApi';

export const initSocket = (store) => {
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
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => draftChannels.filter((channel) => channel.id !== payload.id)));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draftChannels) => {
      const newChannel = draftChannels.find((channel) => channel.id === payload.id);
      newChannel.name = payload.name;
      newChannel.id = payload.id;

      console.log(newChannel);
      console.log('payload', payload);
    }));
  });
};
