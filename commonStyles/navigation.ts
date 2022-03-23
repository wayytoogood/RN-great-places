import { Platform } from 'react-native'
import { COLORS } from '../constants/Colors'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack/lib/typescript/src/types'

export const defaultHeaderStyles: NativeStackNavigationOptions = {
  headerStyle: Platform.select({
    android: { backgroundColor: COLORS.primary },
  }),
  headerTintColor: Platform.select({
    android: '#fff',
  }),
  headerTitleStyle: {
    fontFamily: 'nunito-semibold',
  },
}
