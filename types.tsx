import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ILocation, PlaceItemInterface } from './features/types'
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

export type RootStackParamList = {
  Places: undefined
  PlaceDetail: { place: PlaceItemInterface }
  NewPlace: { location: ILocation } | undefined
  Map: { initialLocation: ILocation } | undefined
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

// export type HomeTabParamList = {
//   Popular: undefined
//   Latest: undefined
// }

// export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
//   CompositeScreenProps<
//     BottomTabScreenProps<HomeTabParamList, T>,
//     RootStackScreenProps<keyof RootStackParamList>
//   >

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
