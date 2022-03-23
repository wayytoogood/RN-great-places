import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Place, Places } from './types'
import { addPlace } from './addPlace'
import { setPlaces } from './setPlaces'

const initialState: Places = {
  places: [],
}

const placeSlicer = createSlice({
  name: 'place',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      addPlace.fulfilled,
      (state, action: PayloadAction<Place>) => {
        state.places.push(action.payload)
      }
    ),
      builder.addCase(
        setPlaces.fulfilled,
        (state, action: PayloadAction<Place[]>) => {
          state.places = action.payload
        }
      )
  },
})

export const placeReducer = placeSlicer.reducer
