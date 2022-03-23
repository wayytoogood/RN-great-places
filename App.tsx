import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { RootNavigator } from './navigation'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { init } from './helpers/db'

init()
  .then(() => {
    console.log('Database initialized.')
  })
  .catch(() => {
    console.log('Initializing database failed!')
  })

export default function App() {
  const [fontsLoaded] = useFonts({
    nunito: require('./assets/fonts/Nunito-Regular.ttf'),
    'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootNavigator />
        <StatusBar style='auto' />
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
