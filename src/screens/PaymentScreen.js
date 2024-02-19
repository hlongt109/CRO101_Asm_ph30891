import { Image, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constrain/colors';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import colors from '../config/colors';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { carts } = route.params;
  const { total } = route.params;
  const { coffee, activeSize, selectedSizePrice, quantity } = route.params

  const [activePayMethod, setActivePayMethod] = useState("cc");
  const [payMethodName, setPayMethodName] = useState("Pay with Credit Card");
  // console.log("Bill:", carts.length);
  // console.log("total:", total);
  console.log(uuid.v4());

  const createBill = async () => {
    try {
      const userId = await getUserId();
      if (carts) {
        await axios.post("http://10.0.2.2:3000/orders", {
          userId: userId,
          products: carts,
          total: total,
        });
        handleDelete();

      } else {
        await axios.post("http://10.0.2.2:3000/orders", {
          userId: userId,
          products: [
            {
              id: uuid.v4(),
              userId: userId,
              productId: coffee.id,
              productName: coffee.name,
              productImage: coffee.image,
              quantity: quantity,
              size: activeSize.name,
              price: activeSize.price,
              sizes: coffee.sizes
            }
          ], 
          total: total
        });
      }
      ToastAndroid.show("Thanh toán thành công", ToastAndroid.SHORT);
      setTimeout(() => {
        navigation.goBack()
      }, 1000)
    } catch (error) {
      console.error('Error:', error.message);
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  }

  // get User id
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('idUser');
      return userId;
    } catch (error) {
      console.error('Error getting userId from AsyncStorage:', error);
      return null;
    }
  }
  // delete
  const handleDelete = async () => {
    try {
      if (carts) {
        const userId = await getUserId();
        await Promise.all(carts.map(async (cart) => {
          const id = cart.id
          await axios.delete(`http://10.0.2.2:3000/carts/${id}`);
        }));
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  }
  return (
    <>
      <SafeAreaView style={st.container}>
        <View style={st.toolbar}>
          <View style={{ height: 30, width: 30, backgroundColor: COLORS.gray, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
            <TouchableOpacity
              onPress={navigation.goBack}>
              <Ionicon name='arrow-back' size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
            <Text style={st.title}>Payments</Text>
          </View>
        </View>

        <TouchableOpacity style={[st.cardLayout, { borderColor: activePayMethod === "cc" ? 'orange' : 'white' }]}
          onPress={() => {
            setActivePayMethod("cc");
            setPayMethodName("Pay with Credit Card");
          }}>
          <Image
            source={require("../assets/app_images/the_den.jpg")}
            style={{ width: "100%", height: 210 }} />
        </TouchableOpacity>

        <View style={[st.payContainer, { borderColor: activePayMethod === "wl" ? 'orange' : 'white' }]}>
          <TouchableOpacity style={st.payLayout}
            onPress={() => {
              setActivePayMethod("wl");
              setPayMethodName("Pay with Wallet");
            }}>
            <Image source={require("../assets/app_images/wallet.png")} style={{ width: 24, height: 23, borderRadius: 5 }} />
            <Text style={st.payName}>Wallet</Text>
          </TouchableOpacity>
          <Text style={{ marginLeft: 15, fontSize: 16, fontWeight: 'bold', color: 'white' }}>$1.000.000</Text>
        </View>

        <View style={[st.payContainer, { borderColor: activePayMethod === "gg" ? 'orange' : 'white' }]}>
          <TouchableOpacity style={st.payLayout}
            onPress={() => {
              setActivePayMethod("gg");
              setPayMethodName("Pay with Google Pay");
            }}>
            <Image source={require("../assets/app_images/gg.png")} style={{ width: 24, height: 24 }} />
            <Text style={st.payName}>Google Pay</Text>
          </TouchableOpacity>
        </View>

        <View style={[st.payContainer, { borderColor: activePayMethod === "ap" ? 'orange' : 'white' }]}>
          <TouchableOpacity style={st.payLayout}
            onPress={() => {
              setActivePayMethod("ap");
              setPayMethodName("Pay with Apple Pay");
            }}>
            <Image source={require("../assets/app_images/apple.png")} style={{ width: 24, height: 24 }} />
            <Text style={st.payName}>Apple Pay</Text>
          </TouchableOpacity>
        </View>

        <View style={[st.payContainer, { borderColor: activePayMethod === "amz" ? 'orange' : 'white' }]}>
          <TouchableOpacity style={st.payLayout}
            onPress={() => {
              setActivePayMethod("amz");
              setPayMethodName("Pay with Amazon Pay");
            }}>
            <Image source={require("../assets/app_images/amz.png")} style={{ width: 24, height: 24 }} />
            <Text style={st.payName}>Amazon Pay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={st.bottomLayout}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={st.titleTotal}>Price</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'orange', marginRight: 7, fontSize: 16, fontWeight: '600' }}>$</Text>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{total}</Text>
          </View>
        </View>
        <TouchableOpacity style={st.btnPay}
          onPress={() => createBill()}>
          <Text style={st.titlePay}>{payMethodName}</Text>
        </TouchableOpacity>
      </View>
    </>

  )
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.pinkSecond,
    flexDirection: 'column'
  },
  toolbar: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50, marginBottom: 30
  },
  cardLayout: {
    width: '100%', borderRadius: 20, borderWidth: 2, overflow: 'hidden', borderWidth: 3, borderColor: 'white'
  },
  layoutTitle: {
    alignItems: 'center',
    margin: 20,
  },
  title: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.gray
  },
  payContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.gray, paddingHorizontal: 15, paddingVertical: 15, borderRadius: 15, marginTop: 15, borderWidth: 2, borderColor: 'white'
  },
  payLayout: {
    flexDirection: 'row', alignItems: 'center', flex: 1,
  },
  payName: {
    marginLeft: 15, fontSize: 18, fontWeight: '600', color: 'white'
  },
  bottomLayout: {
    height: 70, backgroundColor: COLORS.gray, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20
  },
  titleTotal: {
    fontSize: 14, color: 'white', fontWeight: '600', marginBottom: 5
  },
  btnPay: {
    width: '60%', height: 50, backgroundColor: colors.primary, borderRadius: 15, color: 'white', alignItems: 'center', justifyContent: 'center'
  },
  titlePay: {
    color: 'white', fontWeight: '600', fontSize: 16
  }
})

export default PaymentScreen

