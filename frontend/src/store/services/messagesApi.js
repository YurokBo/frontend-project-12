import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '../api/api';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}/messages`,
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
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: '',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Messages'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
    editMessage: builder.mutation({
      query: ({ id, editedMessage }) => ({
        url: `${id}`,
        method: 'PATCH',
        body: editedMessage,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
  useUpdateMessageMutation,
} = messagesApi;
