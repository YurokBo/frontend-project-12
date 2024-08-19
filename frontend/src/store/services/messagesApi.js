import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiMethods, apiPaths } from '../../helpers/routes';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPaths.messagesPath(),
    prepareHeaders: (headers, { getState }) => {
      const { auth: { token } } = getState();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: '',
        method: apiMethods.post,
        body: newMessage,
      }),
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: apiMethods.delete,
      }),
    }),
    editMessage: builder.mutation({
      query: ({ id, editedMessage }) => ({
        url: `${id}`,
        method: apiMethods.patch,
        body: editedMessage,
      }),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
  useUpdateMessageMutation,
} = messagesApi;
