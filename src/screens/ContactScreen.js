import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../constrain/colors'
import { TextInput } from 'react-native'
import Button from '../components/Button'
import COLORS from '../constrain/colors'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

const Contact = () => {
  const navigation = useNavigation()
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
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
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
              style={{ width: '100%' }}
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
            />
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={st.inputTitle}>
            <Button
              title='Contact us'
              onPress={() => { }} />
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
    justifyContent: "flex-start"
  },
  title: {
    fontSize: 24,
    color: COLORS.gray,
    fontWeight: 'bold',

},
})