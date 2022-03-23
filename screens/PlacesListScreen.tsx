import { useEffect, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { PlaceItem } from '../components/app/PlaceItem'
import { CenteredView } from '../components/common/CenteredView'
import { CustomHeaderButton } from '../components/navigation/HeaderButton'
import { RootStackScreenProps } from '../types'
import { PlaceItemInterface } from '../features/types'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { CustomText } from '../components/common/CustomText'
import { setPlaces } from '../features/setPlaces'

export const PlacesListScreen: React.FC<RootStackScreenProps<'Places'>> = ({
  navigation,
}) => {
  const { places } = useAppSelector((state) => state.places)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setPlaces())
    console.log('places has been set')
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title='New Place'
            iconName={Platform.select({ android: 'md-add', ios: 'ios-add' })}
            onPress={() => navigation.navigate('NewPlace')}
          />
        </HeaderButtons>
      ),
    })
  })

  const handleNavigation = (place: PlaceItemInterface) => {
    navigation.navigate('PlaceDetail', { place: place })
  }

  if (places.length === 0) {
    return (
      <CenteredView>
        <CustomText style={styles.infoText} fontWeight='semibold'>
          There is no place to show, start adding them now!{' '}
        </CustomText>
      </CenteredView>
    )
  }

  return (
    <FlatList
      data={places}
      renderItem={({ item }) => (
        <PlaceItem
          title={item.title}
          imageUri={item.imageUri}
          address={item.address}
          onPress={() => handleNavigation(item)}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  infoText: {
    fontSize: 16,
    marginHorizontal: 45,
    textAlign: 'center',
  },
})
