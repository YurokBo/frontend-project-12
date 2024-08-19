import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiMethods, apiPaths } from '../../helpers/routes';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPaths.channelsPath(),
    prepareHeaders: (headers, { getState }) => {
      const { auth: { token } } = getState();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: '',
        method: apiMethods.post,
        body: newChannel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: apiMethods.delete,
      }),
    }),
    updateChannel: builder.mutation({
      query: ({ id, name }) => ({
        url: `${id}`,
        method: apiMethods.patch,
        body: { name },
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useUpdateChannelMutation,
} = channelsApi;
