import {
  HeaderButton,
  HeaderButtonProps,
} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { COLORS } from '../../constants/Colors'

export const CustomHeaderButton = (props: HeaderButtonProps) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      color={Platform.select({ android: '#fff', ios: COLORS.primary })}
      iconSize={23}
    />
  )
}
