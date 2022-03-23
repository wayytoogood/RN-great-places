import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import { CustomText } from '../components/common/CustomText'
import { COLORS } from '../constants/Colors'
import { getGoogleApiKey } from '../env'
import { RootStackScreenProps } from '../types'

export const PlacesDetailScreen: React.FC<
  RootStackScreenProps<'PlaceDetail'>
> = ({ navigation, route }) => {
  const { place } = route.params
  const { title, address, imageUri, lat, lng } = place

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${getGoogleApiKey()}`

  const handleNavigation = () => {
    navigation.navigate('Map', { initialLocation: { lat, lng } })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={styles.img} source={{ uri: imageUri }} />
      </View>
      <TouchableOpacity onPress={handleNavigation}>
        <View style={styles.mapContainer}>
          <View style={styles.textContainer}>
            <CustomText
              props={{ numberOfLines: 3 }}
              fontWeight='semibold'
              style={styles.text}
            >
              {address}
            </CustomText>
          </View>
          <View style={styles.mapImgContainer}>
            <Image style={styles.map} source={{ uri: mapUrl }} />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: '5%',
  },
  imgContainer: {
    width: '100%',
    height: 200,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    marginTop: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    overflow: 'hidden',
  },
  textContainer: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: COLORS.primary,
  },
  mapImgContainer: {
    width: '100%',
    height: 200,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
