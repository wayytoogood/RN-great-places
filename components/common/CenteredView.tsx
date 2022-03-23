import { View, StyleSheet } from 'react-native'

interface CenteredViewProps {
  styles?: object
}

export const CenteredView: React.FC<CenteredViewProps> = ({
  children,
  styles,
}) => {
  return (
    <View style={{ ...styles, ...centeredStyles.centered }}>{children}</View>
  )
}

const centeredStyles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
