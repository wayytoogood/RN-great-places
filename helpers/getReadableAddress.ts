import { getGoogleApiKey } from '../env'
import { ILocation } from '../features/types'

export const getReadableAddress = async (coords: ILocation) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${
      coords.lng
    }&key=${getGoogleApiKey()}`
  )

  const data = (await response.json()) as any

  const readableAddress = data.results[0].formatted_address as string

  return readableAddress
}
