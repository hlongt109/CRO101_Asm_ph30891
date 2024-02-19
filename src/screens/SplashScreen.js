import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import COLORS from '../constrain/colors'
import Button from '../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkLoginStatus();
  }, []);
  const checkLoginStatus = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      if (isLoggedIn === 'true') {
        setTimeout(() => {
          navigation.navigate('Tab');
        }, 1000)
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  return (
    <LinearGradient
      style={styles.layoutCha}
      colors={[COLORS.pinkSecond, COLORS.pinkSecond]}
    >
      <View style={styles.layout}>
        <View>
          <Image
            source={require("../assets/app_images/coffe_logo.png")}
            style={styles.logo} />
        </View>
        <Text style={styles.txt1}>Elixir</Text>
        <Text style={styles.txt2}>Find the best coffee for you</Text>
        <Button
          title="Join Now"
          onPress={() => navigation.navigate('SignUp')}
          style={styles.btn} />
        <View style={styles.layout2}>
          <Text style={styles.titleLogin}>Already have an account ?</Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.txtLogin}>Login</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  layoutCha: {
    flex: 1
  },
  layout: {
    flex: 1, justifyContent: 'center',
    alignItems: 'center', padding: 20
  },
  logo: {
    height: 200, width: 250,
  },
  txt1: {
    margin: 10, fontSize: 40, fontWeight: '800', color: COLORS.doDam,
  },
  txt2: {
    fontSize: 20, color: COLORS.white,
  },
  btn: {
    marginTop: 40, width: "100%"
  },
  layout2: {
    flexDirection: "row", marginTop: 18, justifyContent: 'center',
  },
  txtLogin: {
    fontSize: 18, color: COLORS.doDam, fontWeight: "bold", marginLeft: 4
  },
  titleLogin: {
    fontSize: 16, color: COLORS.gray, marginTop: 2
  }
})

export default SplashScreen

