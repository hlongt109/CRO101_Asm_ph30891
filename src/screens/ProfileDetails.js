import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../constrain/colors'
import { useNavigation } from '@react-navigation/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Fontisto'


const ProfileDetails = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={st.container}>
            <View style={st.viewContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                    <View style={{ height: 30, width: 30, backgroundColor: COLORS.gray, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <TouchableOpacity
                            onPress={navigation.goBack}>
                            <Ionicon name='arrow-back' size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
                        <Text style={st.title}>Profile</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{}}>
                        <Image
                            style={{ width: 180, height: 180, borderRadius: 90, borderWidth: 2, borderColor: COLORS.white }}
                            source={require("../assets/app_images/avt.jpg")} />
                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
                        <View style={{ marginVertical: 40, flexDirection: 'column', justifyContent: 'space-around', padding: 10 }}>
                            <View style={st.layoutInput}>
                                <Ionicon name='person-outline' size={20} color="#777777" />
                                <TextInput
                                    placeholder='Enter your name'
                                    placeholderTextColor={COLORS.gray}
                                    style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}
                                    onChangeText={() => { }} />
                            </View>
                            <View style={st.layoutInput}>
                                <Icon name='email' size={20} color="#777777" />
                                <TextInput
                                    placeholder='Enter your email address'
                                    placeholderTextColor={COLORS.gray}
                                    style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}
                                    onChangeText={() => { }} />
                            </View>
                            <View style={st.layoutInput}>
                                <Ionicon name='key-outline' size={20} color="#777777" />
                                <TextInput
                                    placeholder='Enter your password'
                                    placeholderTextColor={COLORS.gray}
                                    style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}
                                    onChangeText={() => { }} />
                            </View>
                            <View style={st.layoutInput}>
                                <Ionicon name='key-outline' size={20} color="#777777" />
                                <TextInput
                                    placeholder='Enter your re-password'
                                    placeholderTextColor={COLORS.gray}
                                    style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}
                                    onChangeText={() => { }} />
                            </View>

                            <View style={{marginTop:20}}>
                                <TouchableOpacity
                                    onPress={() => Alert.alert("saved")}
                                    style={{ backgroundColor: COLORS.gray, height: 50, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth:2, borderColor:COLORS.white }}>
                                    <Pressable>
                                        <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Save</Text>
                                    </Pressable>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
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
    viewContainer: {
        flex: 1,

    },
    title: {
        fontSize: 24,
        color: COLORS.gray,
        fontWeight: 'bold',

    },
    layoutInput: {
        width: '100%',
        height: 48,
        borderColor: COLORS.white,
        borderWidth: 1,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginBottom: 20
    },
})

export default ProfileDetails

