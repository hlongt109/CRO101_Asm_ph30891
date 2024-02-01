import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import COLORS from '../constrain/colors';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = (route) => {
  const navigation = useNavigation()
  const { cartData } = route.params;
 
  console.log('Data received in Pay:', cartData);


  return (
    <SafeAreaView style={st.container}>
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
    </SafeAreaView>
  )
}

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
})

export default PaymentScreen

