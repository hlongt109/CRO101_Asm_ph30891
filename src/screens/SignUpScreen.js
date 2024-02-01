import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../constrain/colors'
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient'
import Button from '../components/Button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EyeIcon from 'react-native-vector-icons/Feather'
import Ionicon from 'react-native-vector-icons/Ionicons';
import axios from 'react-native-axios'

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassWord] = useState('');
  const [confPass, setConfPass] = useState('');

  const [emailErr, setEmailErr] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [passwordErr, setPassWordErr] = useState('');
  const [confPassErr, setConfPassErr] = useState('');
  const [hidenPass, setHidenPass] = useState(true);


  const handleSignUp = () => {
    if (name.length === 0 || email.length === 0 || password.length === 0 || confPass.length === 0 || password !== confPass) {
      if (name.length === 0) {
        setNameErr("Enter your name");
      } else {
        setNameErr("")
      }

      if (email.length === 0) {
        setEmailErr("Enter your emai address");
      } else {
        setEmailErr("");
      }

      if (password.length === 0) {
        setPassWordErr("Enter your password")
      } else {
        setPassWordErr("")
      }

      if (confPass.length === 0) {
        setConfPassErr("Enter your re-password")
      } else {
        setConfPassErr("")
      }

      if (password !== confPass) {
        setPassWordErr("Password do not match")
        setConfPassErr("Password do not match")
      }
    }else{
      registerUser(email,password,name)
    }

  }
  const registerUser = async (email, password, name) => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/users', {
        email: email,
        password: password,
        fullname: name
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error('Error:', error.message);
      ToastAndroid.show("Registration failes. Please try again.", ToastAndroid.SHORT);
    }
  }

  const togglePassword = () => {
    setHidenPass(!hidenPass)
  }
  const navigation = useNavigation();
  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={[COLORS.pinkSecond, COLORS.pinkSecond]}
    >
      <SafeAreaView style={st.sav}>
        <View style={st.layout1}>
          <View style={{ marginVertical: 20 }}>
            <Text style={st.title}>Create an account</Text>
            <Text style={st.introl}>Please sign up to get started</Text>
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={st.inputTitle}>Full name</Text>
            <View style={[st.layoutEmail, { borderColor: nameErr ? "#DC143C" : COLORS.gray }]}>
              <Ionicon name='person-outline' size={20} color="#777777" />
              <TextInput
                placeholder='Enter your name'
                placeholderTextColor={COLORS.gray}
                keyboardType='email-address'
                style={{ width: '100%' }}
                value={name}
                onChangeText={(txt) => {
                  setName(txt)
                  setNameErr("");
                }} />
            </View>
            {nameErr ? <Text style={{ color: "#DC143C" }}>{nameErr}</Text> : null}
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
                  setPassWord(txt)
                  setPassWordErr("")
                }} />
              <View>
                <TouchableOpacity onPress={togglePassword} style={st.eyeIcon}>
                  <EyeIcon name={hidenPass ? 'eye-off' : 'eye'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            {passwordErr ? <Text style={{ color: "#DC143C" }}>{passwordErr}</Text> : null}
          </View>

          <View style={{ marginBottom: 12 }}>
            <Text style={st.inputTitle}>Confirm Password</Text>
            <View style={[st.layoutPass, { borderColor: confPassErr ? "#DC143C" : COLORS.gray }]}>
              <Icon name='key-outline' size={20} color="#777777" />
              <TextInput
                placeholder='Enter your re-password'
                placeholderTextColor={COLORS.gray}
                secureTextEntry={hidenPass}
                style={{ width: '100%' }}
                value={confPass}
                onChangeText={(txt) => {
                  setConfPass(txt)
                  setConfPassErr("")
                }} />
              <View>
                <TouchableOpacity onPress={togglePassword} style={st.eyeIcon}>
                  <EyeIcon name={hidenPass ? 'eye-off' : 'eye'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            {confPassErr ? <Text style={{ color: "#DC143C" }}>{confPassErr}</Text> : null}
          </View>

          <Button
            title="Sign Up"
            style={st.btnSignUp}
            onPress={handleSignUp} />

          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 22
          }}>
            <Text style={{ fontSize: 16, color: COLORS.gray, marginTop: 2 }}>Already have an account</Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontSize: 18, color: COLORS.doDam, fontWeight: "bold", marginLeft: 4 }}>Login</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const st = StyleSheet.create({
  sav: {
    flex: 1,
  },
  layout1: {
    flex: 1,
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
  layout2: {
    flexDirection: 'row',
    marginVertical: 6,
  },
  btnSignUp: {
    marginTop: 20,
    marginBottom: 8
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
})

export default SignUpScreen

