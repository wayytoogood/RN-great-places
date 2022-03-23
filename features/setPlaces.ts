import { createAsyncThunk } from '@reduxjs/toolkit'
import { SQLResultSet } from 'expo-sqlite'
import { fetchPlaces } from '../helpers/db'
import { Place } from './types'

export const setPlaces = createAsyncThunk<any, undefined>(
  'places/setPlaces',
  async (_, thunkApi) => {
    try {
      const dbResult = (await fetchPlaces()) as SQLResultSet
      const places = dbResult.rows._array.map((place) => ({
        ...place,
        id: place.id.toString(),
      })) as Place[]

      return places
    } catch (error) {
      throw error
    }
  }
)
