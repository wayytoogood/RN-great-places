import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CustomText } from '../common/CustomText'

interface PlaceItemProps {
  title: string
  imageUri: string
  address: string
  onPress: () => void
}

export const PlaceItem: React.FC<PlaceItemProps> = ({
  title,
  imageUri,
  address,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={styles.img}
        source={{
          uri: imageUri,
        }}
      />
      <View style={styles.infoContainer}>
        <CustomText fontWeight='semibold'>{title}</CustomText>
        <CustomText props={{ numberOfLines: 3 }} fontWeight='regular'>
          {address}
        </CustomText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#bbb',
    alignItems: 'center',
  },
  img: {
    width: 75,
    height: 75,
    borderRadius: 75 / 2,
  },
  infoContainer: {
    maxWidth: '80%',
    marginLeft: 20,
  },
})
