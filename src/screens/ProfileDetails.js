import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../constrain/colors'
import { useNavigation } from '@react-navigation/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Fontisto'
import IconAnt from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios';


const ProfileDetails = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

    const [hidenPass, setHidenPass] = useState(true);
    const togglePassword = () => {
        setHidenPass(!hidenPass)
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

    // get userInfor
    const getUserInfor = async (userId) => {
        try {
            const response = await axios.get(`http://10.0.2.2:3000/users?id=${userId}`)
            const data = response.data;
            const user = data.find(user => user.id === userId);
            if (user) {
                setName(user.fullname);
                setEmail(user.email);
                setPassword(user.password);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    useEffect(() => {
        getUserId().then(userId => {
            if (userId) {
                getUserInfor(userId);
            }
        });
    }, []);

    // update password 
    const validate = () => {
        if (oldPass.trim() === "") {
            ToastAndroid.show("Không để trống mật khẩu cũ", ToastAndroid.SHORT);
        } else if (newPass.trim() === "") {
            ToastAndroid.show("Không để trống mật khẩu mới", ToastAndroid.SHORT);
        } else if (oldPass !== password) {
            ToastAndroid.show("Mật khẩu cũ không đúng", ToastAndroid.SHORT);
        } else if (newPass === password) {
            ToastAndroid.show("Mật khẩu mới bị trùng", ToastAndroid.SHORT);
        } else {
            updatePass();
        }
    }

    const updatePass = async () => {
        try {
            const id = await getUserId();
            const response = await axios.get("http://10.0.2.2:3000/users");
            const users = response.data;
            const userToUpdate = users.find(user => user.id === id);
            if (userToUpdate) {
                userToUpdate.password = newPass;
                await axios.put(`http://10.0.2.2:3000/users/${id}`, userToUpdate);
                ToastAndroid.show("Đã cập nhật mật khẩu mới", ToastAndroid.SHORT);
                setOldPass('')
                setNewPass('')             
            } else {
                ToastAndroid.show("Lỗi truy xuất thông tin người dùng", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error("Error update password : ", error);
        }
    }
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
                            <TouchableOpacity style={st.layoutInput}>
                                <Ionicon name='person-outline' size={20} color="#777777" />
                                <Text
                                    style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}
                                >{name}</Text>
                                <IconAnt name='right' size={20} color="#777777" />
                            </TouchableOpacity>
                            <TouchableOpacity style={st.layoutInput}>
                                <Icon name='email' size={20} color="#777777" />
                                <Text
                                    style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}>
                                    {email}
                                </Text>
                                <IconAnt name='right' size={20} color="#777777" />
                            </TouchableOpacity>
                            <View style={st.layoutInput}>
                                <Ionicon name='key-outline' size={20} color="#777777" />
                                <TextInput
                                    placeholder='Old password'
                                    placeholderTextColor={COLORS.gray}
                                    secureTextEntry={hidenPass}
                                    value={oldPass}
                                    onChangeText={(txt) => setOldPass(txt)}
                                    style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}>
                                </TextInput>
                                <TouchableOpacity onPress={togglePassword}>
                                    <Ionicon name={hidenPass ? 'eye-off' : 'eye'} size={20} color="#777777" />
                                </TouchableOpacity>
                            </View>
                            <View style={st.layoutInput}>
                                <Ionicon name='key-outline' size={20} color="#777777" />
                                <TextInput
                                    placeholder='New password'
                                    placeholderTextColor={COLORS.gray}
                                    secureTextEntry={hidenPass}
                                    value={newPass}
                                    onChangeText={(txt) => setNewPass(txt)}
                                    style={{ width: '100%', color: COLORS.gray, fontSize: 16, paddingHorizontal: 20 }}>
                                </TextInput>
                                <TouchableOpacity onPress={togglePassword}>
                                    <Ionicon name={hidenPass ? 'eye-off' : 'eye'} size={20} color="#777777" />
                                </TouchableOpacity>

                            </View>
                            <View style={{ marginTop: 20 }}>
                                <TouchableOpacity
                                    onPress={validate}
                                    style={{ backgroundColor: COLORS.gray, height: 50, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: COLORS.white }}>
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

