import { configureStore } from '@reduxjs/toolkit'
import { TaskApi } from './api/taskApi'


export const store = configureStore({
  reducer: {
    [TaskApi.reducerPath]: TaskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(TaskApi.middleware),
})
