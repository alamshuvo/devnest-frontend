import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const TaskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://devs-nest-backendd.vercel.app/" }),
  tagTypes: ['Task'],  // used for cache invalidation
  endpoints: (builder) => ({
    getAllTask: builder.query({
      query: () => `/tasks`,
      providesTags: ['Task'],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: '/task',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...task }) => ({
        url: `/task/${id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const {
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = TaskApi
