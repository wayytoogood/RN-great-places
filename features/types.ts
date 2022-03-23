export interface PlaceItemInterface {
  title: string
  imageUri: string
  address: string
  lat: number
  lng: number
}

export interface Place extends PlaceItemInterface {
  id?: string
}

export interface Places {
  places: Place[]
}

export interface ILocation {
  lat: number
  lng: number
}
