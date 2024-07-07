import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_PATH } from '../api/api';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_PATH}/channels`,
    prepareHeaders: (headers, { getState }) => {
      const { auth: { token } } = getState();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '',
        method: 'POST',
        body: newChannel,
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
    updateChannel: builder.mutation({
      query: ({ id, name }) => {
        console.log(name);
        return {
          url: `${id}`,
          method: 'PATCH',
          body: { name },
        };
      },
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useUpdateChannelMutation,
} = channelsApi;
