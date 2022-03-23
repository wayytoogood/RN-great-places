import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types'
import { NavigationContainer } from '@react-navigation/native'
import {
  PlacesListScreen,
  PlacesDetailScreen,
  NewPlacesScreen,
  MapScreen,
} from '../screens'
import { defaultHeaderStyles } from '../commonStyles/navigation'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultHeaderStyles}>
        <Stack.Screen
          name='Places'
          component={PlacesListScreen}
          options={{ title: 'All Places' }}
        />
        <Stack.Screen name='PlaceDetail' component={PlacesDetailScreen} />
        <Stack.Screen
          name='NewPlace'
          component={NewPlacesScreen}
          options={{ title: 'Add New Place' }}
        />
        <Stack.Screen name='Map' component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
