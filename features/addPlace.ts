import { createAsyncThunk } from '@reduxjs/toolkit'
import { Place, PlaceItemInterface } from './types'
import * as FileSystem from 'expo-file-system'
import { insertPlace } from '../helpers/db'
import * as SQLite from 'expo-sqlite'
import { SQLResultSet } from 'expo-sqlite'

export const addPlace = createAsyncThunk<Place, PlaceItemInterface>(
  'places/addPlace',
  async (place, thunkApi) => {
    const { imageUri, title, address, lat, lng } = place

    // pop metodunu kullanıldığı array'in son elemanını kesiyor, burada olduğu gibi değişkene atandığında ise bu kesilen değer değişkenin değeri oluyor.
    const fileName = imageUri.split('/').pop()!
    // documentDirectory app silinmediği sürece hafızada depolanacak alanı veriyor.
    const newPath = FileSystem.documentDirectory + fileName

    try {
      await FileSystem.moveAsync({
        from: imageUri,
        to: newPath,
      })

      const dbResult = (await insertPlace(
        title,
        newPath,
        address,
        lat,
        lng
      )) as SQLResultSet

      console.log(dbResult)

      // dbResult'tan gelen değer rowsAffected: 1 gibi değerlerin yanında oluşturulan database elemanın id'sini de barındırıyor.
      return { ...place, id: dbResult.insertId?.toString(), image: newPath }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
)
