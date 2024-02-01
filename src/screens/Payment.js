import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../constrain/colors'
import { useNavigation } from '@react-navigation/native'
import Ionicon from 'react-native-vector-icons/Ionicons'

const Payment = () => {
    const navigation = useNavigation();
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
                    <Text style={st.title}>Payment</Text>
                </View>
            </View>
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
})
export default Payment