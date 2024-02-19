import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constrain/colors'
import { useNavigation } from '@react-navigation/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import SPACING from '../config/SPACING'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios';

const OrderHistory = () => {
    const navigation = useNavigation()
    const [ordersHistory, setOrderHistory] = useState([]);

    // get data
    useEffect(() => {
        fetchDataFromServer()
    }, [ordersHistory]);

    const fetchDataFromServer = async () => {
        try {
            const userId = await getUserId();
            const response = await axios.get(`http://10.0.2.2:3000/orders?userId=${userId}`);
            const data = response.data;
            setOrderHistory(data);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    }

    // get userId
    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('idUser');
            return userId;
        } catch (error) {
            console.error('Error getting userId from AsyncStorage:', error);
            return null;
        }
    }

    return (
        <SafeAreaView style={st.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50, marginBottom: 20 }}>
                <View style={{ height: 30, width: 30, backgroundColor: COLORS.gray, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                    <TouchableOpacity
                        onPress={navigation.goBack}>
                        <Ionicon name='arrow-back' size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
                    <Text style={st.title}>Order History</Text>
                </View>
            </View>
            <ScrollView>
                <View
                    style={st.scrollCart}>
                    {ordersHistory
                        .map((order) => (
                            <View key={order.id}
                                style={st.boxCart}>
                                {order.products.map((product) => (
                                    <View key={product.id}
                                        style={{ width: '100%', marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image source={{ uri: product.productImage }}
                                                style={st.img} />
                                            <View style={st.infoLayout}>
                                                <Text style={{ fontSize: 20, color: 'white', fontWeight: '600', marginBottom: 10 }}>{product.productName}</Text>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Text style={{ width: 75, textAlign: 'center', borderTopLeftRadius: 7, borderBottomLeftRadius: 7, marginBottom: 5, color: 'white', fontWeight: '600', backgroundColor: '#181818', paddingVertical: 5, marginRight: 2, fontSize: 16 }}>{product.size}</Text>
                                                    <View style={{ flexDirection: 'row', width: 75, height: 32, justifyContent: 'center', backgroundColor: '#181818', paddingVertical: 5, marginRight: 2 }}>
                                                        <Text style={{ color: 'orange', marginRight: 5, fontSize: 16 }}>$</Text>
                                                        <Text style={{ color: 'white', fontSize: 16 }}>{product.price}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', width: 75, height: 32, justifyContent: 'center', backgroundColor: '#181818', paddingVertical: 5, marginRight: 2 , borderTopRightRadius: 7, borderBottomRightRadius: 7}}>
                                                        <Text style={{ color: 'orange', marginRight: 5, fontSize: 16 }}>x</Text>
                                                        <Text style={{ color: 'white', fontSize: 16 }}>{product.quantity}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>

                                    </View>
                                ))}
                                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', paddingVertical: 5, borderRadius:7}}>
                                    <Text style={{marginRight: 7, fontSize: 16, color: '#32CD32', fontWeight:'600'}}>Total :</Text>
                                    <Text style={{color:'orange', fontSize: 18, fontWeight:'600',marginRight:5}}>$</Text>
                                    <Text style={{color:'white', fontSize: 18, fontWeight:'600'}}>{order.total}</Text>
                                </View>
                            </View>
                        ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const st = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.pinkSecond,
        padding: 10
    },
    title: {
        fontSize: 24,
        color: COLORS.gray,
        fontWeight: 'bold',

    },
    scrollCart: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'hidden',

    },
    boxCart: {
        width: "100%",
        marginBottom: SPACING,
        borderRadius: SPACING * 2.5,
        overflow: 'hidden',
        backgroundColor: COLORS.gray,
        padding: 15,
        flex: 1,
        flexDirection:'column'
    },
    infoCart: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
    },
    img: {
        width: 100, height: 100, borderRadius: SPACING * 2
    },
    inputQuantity: {
        borderWidth: 1, height: 35, borderColor: "white", borderRadius: 10, width: 90, textAlign: 'center', color: 'white',
        marginHorizontal: 5,
    },
    boxQuantity: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '83%'
    },
    btnQuantity: {
        padding: 6,
        backgroundColor: COLORS.white,
        borderRadius: 8
    },
    infoLayout: {
        marginLeft: 20, flexDirection: 'column',
    }
})

export default OrderHistory

