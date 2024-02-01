import { StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ContactScreen from './src/screens/ContactScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigators/TabNavigator';


import { LoginScreen, SignUpScreen, SplashScreen } from './src/screens';
import COLORS from './src/constrain/colors';
import ProfileDetails from './src/screens/ProfileDetails';
import OrderHistory from './src/screens/OrderHistory';
import About from './src/screens/About';
import Payment from './src/screens/Payment';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.pinkSecond}/>
      <Stack.Navigator initialRouteName='Welcome'> 

        <Stack.Screen name='Welcome' component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='SignUp' component={SignUpScreen} options={{ headerShown: false }} />

        <Stack.Screen name='Tab' component={TabNavigator} options={{ animation: 'slide_from_bottom', headerShown: false }} />

        <Stack.Screen name='Personal' component={PaymentScreen} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name='Payment' component={PaymentScreen} options={{ animation: 'slide_from_bottom' }}/>
        <Stack.Screen name='Contact' component={ContactScreen} options={{ animation: 'slide_from_bottom',headerShown: false }}/>
        <Stack.Screen name='Details' component={DetailsScreen} options={{ animation: 'slide_from_bottom', headerShown: false }}/>

        <Stack.Screen name='ProfileDetails' component={ProfileDetails} options={{animation: 'slide_from_right', headerShown: false}}/>
        <Stack.Screen name='OrderHistory' component={OrderHistory} options={{animation: 'slide_from_right', headerShown: false}}/>
        <Stack.Screen name='About' component={About} options={{animation: 'slide_from_right', headerShown: false}}/>
        <Stack.Screen name='Pay' component={Payment} options={{animation: 'slide_from_right', headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})