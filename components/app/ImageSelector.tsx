import { View, Text, StyleSheet, Button, Alert, Image } from 'react-native'
import { COLORS } from '../../constants/Colors'
import { CenteredView } from '../common/CenteredView'
import { CustomText } from '../common/CustomText'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

interface ImageSelectorProps {
  onImageSelection: (imageUri: string) => void
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  onImageSelection,
}) => {
  const [pickedImage, setPickedImage] = useState<null | string>(null)
  const { requestCameraPermissionsAsync, requestMediaLibraryPermissionsAsync } =
    ImagePicker

  const handleImagePick = async () => {
    const cameraPermissionResponse = await requestCameraPermissionsAsync()

    if (cameraPermissionResponse.granted === false) {
      Alert.alert(
        'You have declined the permission for accessing the camera',
        'You can not upload a picture without giving the permission!',
        [{ style: 'default', text: 'Okey' }]
      )
      return
    }

    const libraryPermissionResponse =
      await requestMediaLibraryPermissionsAsync()

    if (libraryPermissionResponse.granted === false) {
      Alert.alert(
        'You have declined the permission for accessing the media library',
        'You can not upload a picture without giving the permission!',
        [{ style: 'default', text: 'Okey' }]
      )
      return
    }

    // *Android ve IOS 10'da hem Permissions.CAMERA hem de Permissions.CAMERA_ROLL izinlerine ihtiyaç duyuyor, android'de bu izinzler launchCameraAsync'i yürütünce otomatik olarak sorulurken, ios'ta sorulmuyor(en azından derste öyle), bu nedenle öncesinde hem requestCameraPermission hem de requestMediaLibraryPermission çağrılıyor.
    const imagePickerResponse = await ImagePicker.launchCameraAsync({
      // allowsEditing crop'layabilmemizi sağlıyor, aspect'te belirtilirse bu aspect'e göre bir kesme işlemi gerçekleştirliyor.
      // Quality 0'la 1 arasında değişen bir değer, thumbnail vs. için değeri bile seçilebilir.
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    })

    // imagePickerResponse'un type'ında sadece cancelled property'si bulunduğu için yeni değişken oluşturmak zorunda kaldım.
    const image = imagePickerResponse as ImagePicker.ImageInfo

    setPickedImage(image.uri)
    onImageSelection(image.uri)
  }

  const { container, text, btnContainer, img } = styles

  return (
    <View>
      <CenteredView styles={container}>
        {!pickedImage ? (
          <CustomText fontWeight='semibold' style={text}>
            No image picked yet.
          </CustomText>
        ) : (
          <Image style={img} source={{ uri: pickedImage }} />
        )}
      </CenteredView>
      <CenteredView styles={btnContainer}>
        <Button
          title='TAKE IMAGE'
          color={COLORS.secondary}
          onPress={handleImagePick}
        />
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
  },
  img: {
    width: '100%',
    height: '100%',
  },
})
