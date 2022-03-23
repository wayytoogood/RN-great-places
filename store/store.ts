import { configureStore } from '@reduxjs/toolkit'
import { placeReducer } from '../features/placeSlicer'

export const store = configureStore({
  reducer: {
    places: placeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
