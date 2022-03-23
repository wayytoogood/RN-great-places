import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { CenteredView } from '../common/CenteredView'
import { CustomText } from '../common/CustomText'
import { COLORS } from '../../constants/Colors'
import * as Location from 'expo-location'
import { ILocation } from '../../features/types'
import { useEffect, useState } from 'react'
import { getGoogleApiKey } from '../../env'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'

interface LocationSelectorProps {
  onLocationSelection: ({ lat, lng }: ILocation) => void
  navigation: NativeStackNavigationProp<RootStackParamList, 'NewPlace'>
  locationFromMap: ILocation | undefined
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({
  onLocationSelection,
  navigation,
  locationFromMap,
}) => {
  const [isFetching, setIsFetching] = useState(false)
  // Sadece ilk render'da initialState belirleneceği için pickedLocation'ın değerini locationFromMap olarak başlatamıyoruz çünkü bunun ilk değeri undefined.
  const [pickedLocation, setPickedLocation] = useState<undefined | ILocation>()

  let pickedMapUrl: undefined | string

  useEffect(() => {
    if (locationFromMap) {
      setPickedLocation(locationFromMap)
      onLocationSelection(locationFromMap)
    }
  }, [locationFromMap])

  const handleLocationPick = async () => {
    const permissionResponse =
      await Location.requestForegroundPermissionsAsync()

    if (permissionResponse.status !== 'granted') {
      Alert.alert(
        'You have declined the permission for accessing your location',
        'You can not continue without giving the permission!',
        [{ text: 'Okey' }]
      )
      return
    }

    setIsFetching(true)

    const location = await Location.getCurrentPositionAsync({
      // 5sn içinde cevap gelmezse alert mesajı gösteriyor.
      timeInterval: 5000,
    })

    const { latitude, longitude } = location.coords

    setPickedLocation({ lat: latitude, lng: longitude })
    onLocationSelection({ lat: latitude, lng: longitude })
    setIsFetching(false)
  }

  const handleMapNavigation = () => {
    navigation.navigate('Map')
  }

  if (pickedLocation) {
    const { lat, lng } = pickedLocation

    pickedMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${getGoogleApiKey()}`
  }

  return (
    <View>
      <TouchableOpacity onPress={handleMapNavigation}>
        <CenteredView styles={styles.container}>
          {isFetching ? (
            <ActivityIndicator color={COLORS.primary} size='large' />
          ) : pickedLocation ? (
            <Image style={styles.img} source={{ uri: pickedMapUrl }} />
          ) : (
            <CustomText style={styles.text} fontWeight='semibold'>
              No Location picked yet!
            </CustomText>
          )}
        </CenteredView>
      </TouchableOpacity>
      <CenteredView styles={styles.btnContainer}>
        <View>
          <Button
            title='GET USER LOCATION'
            color={COLORS.secondary}
            onPress={handleLocationPick}
          />
        </View>
        <View style={styles.ml}>
          <Button
            title='PICK ON MAP'
            color={COLORS.secondary}
            onPress={handleMapNavigation}
          />
        </View>
      </CenteredView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
  },
  text: {
    color: '#666',
    fontSize: 16,
  },
  btnContainer: {
    marginVertical: 20,
    flexDirection: 'row',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  ml: {
    marginLeft: 20,
  },
})
