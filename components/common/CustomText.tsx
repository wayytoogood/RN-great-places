import { StyleSheet, Text, TextProps } from 'react-native'

interface CustomTextProps {
  fontWeight: 'regular' | 'semibold' | 'bold'
  style?: object
  props?: TextProps
}

export const CustomText: React.FC<CustomTextProps> = ({
  fontWeight = 'regular',
  children,
  style,
  props,
}) => {
  return (
    <Text {...props} style={{ ...style, ...fontStyle[fontWeight] }}>
      {children}
    </Text>
  )
}

const fontStyle = StyleSheet.create({
  regular: {
    fontFamily: 'nunito',
  },
  semibold: {
    fontFamily: 'nunito-semibold',
  },
  bold: {
    fontFamily: 'nunito-bold',
  },
})
