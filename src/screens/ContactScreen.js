import { SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../constrain/colors'
import { TextInput } from 'react-native'
import Button from '../components/Button'
import COLORS from '../constrain/colors'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios';

const Contact = () => {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('');
  const [content, setContent] = useState('');


  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('idUser');
      return userId;
    } catch (error) {
      console.error('Error getting userId from AsyncStorage:', error);
      return null;
    }
  }
  const getName = async () => {
    try {
      const name = await AsyncStorage.getItem('userFullName');
      setName(name)
    } catch (error) {
      console.error('Error getting name from AsyncStorage:', error);
      return null;
    }
  }
  const getEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      setEmail(email)
    } catch (error) {
      console.error('Error getting email from AsyncStorage:', error);
      return null;
    }
  }
  getName()
  getEmail()

  const saveContact = async () => {
    try {
      const userId = await getUserId();
      await axios.post("http://10.0.2.2:3000/contacts", {
        userId: userId,
        name: name,
        email: email,
        phone: phone,
        content: content
      });
      ToastAndroid.show("Gửi liên hệ thành công", ToastAndroid.SHORT);
      setPhone('')
      setContent('')
    } catch (error) {
      console.error("Error send contact : ", error);
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  }

  return (

    <SafeAreaView
      style={st.container}>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50, marginBottom: 30 }}>
        <View style={{ height: 30, width: 30, backgroundColor: COLORS.gray, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
          <TouchableOpacity
            onPress={navigation.goBack}>
            <Ionicon name='arrow-back' size={24} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
          <Text style={st.title}>Contact</Text>
        </View>
      </View>
      <ScrollView>
        <View style={{ marginBottom: 12 }}>
          <Text style={st.inputTitle}>Full namer</Text>
          <View style={st.layoutInput}>
            <Ionicons name='person-outline' size={20} color="#777777" />
            <TextInput
              placeholder='Enter your name'
              placeholderTextColor={colors.gray}
              keyboardType='default'
              style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}
              value={name}
              onChangeText={(txt) => onChangeText(txt)}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={st.inputTitle}>Email</Text>
          <View style={st.layoutInput}>
            <Icon name='email-outline' size={20} color="#777777" />
            <TextInput
              placeholder='Enter your email'
              placeholderTextColor={colors.gray}
              keyboardType='default'
              style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}
              value={email}
              onChangeText={(txt) => setEmail(txt)}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={st.inputTitle}>Phone number</Text>
          <View style={st.layoutInput}>
            <Icon name='phone-outline' size={20} color="#777777" />
            <TextInput
              placeholder='Enter your phone number'
              placeholderTextColor={colors.gray}
              keyboardType='numeric'
              value={phone}
              onChangeText={(txt) => setPhone(txt)}
              style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={st.inputTitle}>How we can have you ?</Text>
          <View style={st.textAreaContainer} >
            <TextInput
              style={st.textArea}
              underlineColorAndroid="transparent"
              placeholder="Write something"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              value={content}
              onChangeText={(txt) => setContent(txt)}
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={st.inputTitle}>
            <Button
              title='Contact us'
              onPress={saveContact} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Contact

const st = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.pinkSecond
  },
  layoutTitle: {
    alignItems: 'center',
    margin: 20,
  },
  title: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: '600'
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.gray,
    marginVertical: 8,
  },
  layoutInput: {
    width: '100%',
    height: 48,
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingLeft: 22,
  },
  textAreaContainer: {
    borderColor: colors.white,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10
  },
  textArea: {
    height: 140,
    justifyContent: "flex-start",
    color: COLORS.gray, fontSize: 16, paddingHorizontal: 20
  },
  title: {
    fontSize: 24,
    color: COLORS.gray,
    fontWeight: 'bold',

  },
})