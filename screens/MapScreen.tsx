import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { MapEvent, Marker } from 'react-native-maps'
import { useEffect, useLayoutEffect, useState } from 'react'
import { ILocation } from '../features/types'
import { RootStackScreenProps } from '../types'
import { CustomText } from '../components/common/CustomText'
import { Platform } from 'expo-modules-core'
import { COLORS } from '../constants/Colors'

export const MapScreen: React.FC<RootStackScreenProps<'Map'>> = ({
  navigation,
  route,
}) => {
  const [markerLocation, setMarkerLocation] = useState<undefined | ILocation>()

  const initialLocation = route.params?.initialLocation

  useEffect(() => {
    if (initialLocation) {
      setMarkerLocation(initialLocation)
    }
  }, [initialLocation])

  const savePickedLocation = () => {
    if (!markerLocation) {
      Alert.alert(
        `You didn't pick a location on the map!`,
        'Pick a location in order to save it.',
        [{ text: 'Okey' }]
      )
      return
    }

    navigation.navigate('NewPlace', { location: markerLocation })
  }

  useLayoutEffect(() => {
    if (!initialLocation) {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity style={styles.saveBtn} onPress={savePickedLocation}>
            <CustomText style={styles.saveBtnText} fontWeight='semibold'>
              Save Place
            </CustomText>
          </TouchableOpacity>
        ),
      })
    }
  })

  const initialMapRegion = {
    latitude: initialLocation?.lat || 37.78,
    longitude: initialLocation?.lng || -122.43,
    // Bu delta'lar zoom'lama miktarı gibi bir şey sanırım.
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const setMarker = (e: MapEvent<{}>) => {
    if (initialLocation) {
      return
    }
    const { latitude, longitude } = e.nativeEvent.coordinate
    setMarkerLocation({ lat: latitude, lng: longitude })
  }

  return (
    // Harita üzerinde ilk başta gözüken kısım dışında başka bir yere marker koyduğumuzda initialRegion yerine region koyduğumuzda ilk region'a geri dönüyor,
    // bu nedenle initialRegion prop'unu kullandık.
    <MapView
      style={styles.container}
      initialRegion={initialMapRegion}
      onPress={setMarker}
    >
      {markerLocation && (
        <Marker
          title='Selected Location'
          coordinate={{
            latitude: markerLocation.lat,
            longitude: markerLocation.lng,
          }}
        />
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  saveBtn: {
    marginHorizontal: 20,
  },
  saveBtnText: {
    fontSize: 17,
    color: Platform.select({ android: '#fff', ios: COLORS.primary }),
  },
})
