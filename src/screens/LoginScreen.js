import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ToastAndroid } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../constrain/colors'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EyeIcon from 'react-native-vector-icons/Feather'
import { useState } from 'react';
import Button from '../components/Button'
// import user from '../config/user';
import axios from 'react-native-axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const [hidenPass, setHidenPass] = useState(true);
  const togglePassword = () => {
    setHidenPass(!hidenPass)
  }

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      if (email.trim() === "") {
        setEmailErr("Enter your email address");
      } else {
        setEmailErr("");
      }

      if (password.trim() === "") {
        setPasswordErr("Enter your password");
      } else {
        setPasswordErr("");
      }
    } else {
      checkAcc(email, password)
    }

  }
  const checkAcc = async (email, password) => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/users');
      const acc = response.data;

      if (acc.length > 0) {
        const user = acc.find(user => user.email === email && user.password === password);

        if (user) {
          await AsyncStorage.setItem('isLoggedIn', 'true');
          await AsyncStorage.setItem('userEmail', user.email);
          await AsyncStorage.setItem('userFullName', user.fullname);
          await AsyncStorage.setItem('idUser', user.id);

          navigation.navigate("Tab");
        } else {
          ToastAndroid.show("Email or password is invalid", ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const [isChecked, setIsChecked] = useState(false);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const navigation = useNavigation();
  return (
    <LinearGradient
      style={st.layoutParrent}
      colors={[COLORS.pinkSecond, COLORS.pinkSecond]}
    >
      <SafeAreaView style={st.sav}>
        <View style={st.layout1}>

          <View style={st.viewTile}>
            <Text style={st.title}>Hey Welcome</Text>
            <Text style={st.introl}>Please sign in to your account</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={st.inputTitle}>Email address</Text>
            <View style={[st.layoutEmail, { borderColor: emailErr ? "#DC143C" : COLORS.gray }]}>
              <Icon name='email-outline' size={20} color="#777777" />
              <TextInput
                placeholder='Enter your email address'
                placeholderTextColor={COLORS.gray}
                keyboardType='email-address'
                style={{ width: '100%' }}
                value={email}
                onChangeText={(txt) => {
                  setEmail(txt)
                  setEmailErr("");
                }} />
            </View>
            {emailErr ? <Text style={{ color: "#DC143C" }}>{emailErr}</Text> : null}
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={st.inputTitle}>Password</Text>
            <View style={[st.layoutPass, { borderColor: passwordErr ? "#DC143C" : COLORS.gray }]}>
              <Icon name='key-outline' size={20} color="#777777" />
              <TextInput
                placeholder='Enter your password'
                placeholderTextColor={COLORS.gray}
                secureTextEntry={hidenPass}
                style={{ width: '100%' }}
                value={password}
                onChangeText={(txt) => {
                  setPassword(txt)
                  setPasswordErr("")
                }} />
              <View>
                <TouchableOpacity onPress={togglePassword} style={st.eyeIcon}>
                  <EyeIcon name={hidenPass ? 'eye-off' : 'eye'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            {passwordErr ? <Text style={{ color: "#DC143C" }}>{passwordErr}</Text> : null}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={st.layout2}>
              <TouchableOpacity
                onPress={toggleCheckbox}>
                <Icon name={isChecked ? 'checkbox-outline' : 'checkbox-blank-outline'} size={20} />
              </TouchableOpacity>
              <Text style={{ color: COLORS.gray, fontSize: 14, marginLeft: 5 }}>Remember me</Text>
            </View>
            <TouchableOpacity onPress={() => { }}>
              <Text style={{ color: COLORS.gray, fontSize: 14 }}>Forgot password</Text>
            </TouchableOpacity>
          </View>


          <Button
            title="Login"
            style={st.btnSignUp}
            // onPress={() => navigation.navigate('Tab')} // xoa cai nay di
            onPress={handleLogin}
          />

          <View style={st.signUpOther}>
            <View
              style={st.line}
            />
            <Text style={{ fontSize: 14, color: COLORS.gray }}>or Login with</Text>
            <View
              style={st.line} />
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={st.btnSignOther}
            >
              <Image
                source={require("../assets/app_images/fb.png")}
                style={st.img}
              />
              <Text style={{ fontSize: 14, color: COLORS.gray }}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Pressed")}
              style={st.btnSignOther2}
            >
              <Image
                source={require("../assets/app_images/gg.png")}
                style={st.img}
              />
              <Text style={{ fontSize: 14, color: COLORS.gray }}>Google</Text>
            </TouchableOpacity>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22
          }}>
            <Text style={st.txt3}>Don't have an account ?</Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={st.sigUp}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>

  )
}

const st = StyleSheet.create({
  layoutParrent: {
    flex: 1,
    backgroundColor: COLORS.pinkSecond
  },
  sav: {
    flex: 1,
  },
  viewTile: {
    marginVertical: 20
  },
  layout1: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 22
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 12,
    color: COLORS.doDam,
  },
  introl: {
    fontSize: 18,
    color: COLORS.gray,
    fontWeight: '600'
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.gray,
    marginVertical: 8,
  },
  layoutEmail: {
    width: '100%',
    height: 48,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 22,
  },
  layoutPass: {
    width: '100%',
    height: 48,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 38,
  },
  eyeIcon: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  layout2: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  checkBox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: COLORS.white,
    marginRight: 5,
  },
  isChecked: {
    alignSelf: 'center',
  },
  btnSignUp: {
    marginTop: 20,
    marginBottom: 8
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: 10,
  },
  btnSignOther: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.doDam,
    marginRight: 4,
    borderRadius: 10
  },
  btnSignOther2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 52,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.doDam,
    marginLeft: 4,
    borderRadius: 10
  },
  img: {
    height: 36,
    width: 36,
    marginRight: 8,
  },
  signUpOther: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 16, marginTop: 16
  },
  txt3: {
    fontSize: 16, color: COLORS.gray
  },
  sigUp: {
    fontSize: 17, color: COLORS.doDam, fontWeight: "bold", marginLeft: 4,
  }

})

export default LoginScreen

