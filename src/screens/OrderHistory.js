import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constrain/colors'
import { useNavigation } from '@react-navigation/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import coffees from '../config/coffees'
import SPACING from '../config/SPACING'
import Icon from 'react-native-vector-icons/AntDesign';

const OrderHistory = () => {
    const navigation = useNavigation()
    const [activeCartId, setActiveCartId] = useState(1);
    return (
        <SafeAreaView style={st.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 ,marginBottom:20}}>
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
                    {coffees
                        .filter(coffee => coffee.cartId === activeCartId)
                        .map((coffee) => (
                            <View key={coffee.id}
                                style={st.boxCart}>
                                <View style={{ flexDirection: "row" }}>

                                    <TouchableOpacity
                                        onPress={() => navigation.navigate("Details", { coffee })}>
                                        <Image source={coffee.image}
                                            style={st.img} />
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                        <View style={st.infoCart}>
                                            <View style={{ marginLeft: 10, }}>
                                                <Text style={{ color: 'white', fontSize: 18, marginBottom: 5 }}>{coffee.name}</Text>
                                                <Text style={{ color: 'white', fontSize: 12, marginBottom: 5 }}>{coffee.included}</Text>
                                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                                    <Text style={{ color: 'orange', fontSize: 14, marginRight: 5 }}>$</Text>
                                                    <Text style={{ color: 'white', fontSize: 14 }}>{coffee.price}</Text>
                                                </View>
                                                <Text style={{ color: 'orange', fontSize: 14 }}>x{coffee.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>
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
        padding: 10
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
})

export default OrderHistory

