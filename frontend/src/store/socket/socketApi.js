import { io } from 'socket.io-client';
import { messagesApi } from '../services/messagesApi';

export const initSocket = (store) => {
  const socket = io();
  socket.on('newMessage', (payload) => {
    console.log('initSocket');
    store.dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draftMessages) => {
      draftMessages.push(payload);
    }));
  });
};
