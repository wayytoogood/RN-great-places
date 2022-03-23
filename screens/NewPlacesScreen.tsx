import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native'
import { ImageSelector } from '../components/app/ImageSelector'
import { LocationSelector } from '../components/app/LocationSelector'
import { CenteredView } from '../components/common/CenteredView'
import { CustomText } from '../components/common/CustomText'
import { COLORS } from '../constants/Colors'
import { addPlace } from '../features/addPlace'
import { ILocation, Place, PlaceItemInterface } from '../features/types'
import { getReadableAddress } from '../helpers/getReadableAddress'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { RootStackScreenProps } from '../types'

export const NewPlacesScreen: React.FC<RootStackScreenProps<'NewPlace'>> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState<null | string>()
  const [selectedLocation, setSelectedLocation] = useState<
    undefined | ILocation
  >()
  const [isSaved, setIsSaved] = useState(false)
  // const { data } = useGetPostQuery(isSaved ?? skipToken)
  // Yukardaki skip token yerine aşağıdaki gibi de kullanabiliriz, böylelikle arg olmadığında skip'le diyoruz.
  // const {data} = useGetPostQuery(arg, {skip: !arg})

  const locationFromMap = route.params?.location

  const dispatch = useAppDispatch()

  const savePlace = async () => {
    if (!title || !selectedImage || !selectedLocation) {
      Alert.alert(
        'Missing properties!',
        'You need to give proper title and image values.',
        [{ text: 'Okey', style: 'default' }]
      )
      return
    }

    setIsSaved(true)

    const location = selectedLocation as ILocation
    const address = await getReadableAddress(location)
    const newPlace: PlaceItemInterface = {
      title,
      imageUri: selectedImage,
      address,
      lat: location.lat,
      lng: location.lng,
    }
    dispatch(addPlace(newPlace))
    navigation.goBack()
  }

  const onImageSelection = (imageUri: string) => {
    setSelectedImage(imageUri)
  }

  const onLocationSelection = (locationInfo: ILocation) => {
    setSelectedLocation(locationInfo)
  }

  return (
    <ScrollView>
      <View style={styles.screen}>
        <CustomText style={styles.title} fontWeight='bold'>
          Title
        </CustomText>
        <View style={styles.inputContainer}>
          <TextInput onChangeText={(newValue) => setTitle(newValue)} />
        </View>
        <ImageSelector onImageSelection={onImageSelection} />
        <LocationSelector
          onLocationSelection={onLocationSelection}
          navigation={navigation}
          locationFromMap={locationFromMap}
        />
        <CenteredView styles={styles.mt}>
          <Button
            title='SAVE PLACE'
            color={COLORS.primary}
            onPress={savePlace}
          />
        </CenteredView>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 30,
  },
  title: {
    fontSize: 18,
    color: '#333',
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    marginBottom: 20,
  },
  mt: {
    marginTop: 12.5,
  },
})
