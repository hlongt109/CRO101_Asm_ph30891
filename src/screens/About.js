import {  Image, StyleSheet, Text,  TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState,  } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constrain/colors'
import { useNavigation } from '@react-navigation/native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/AntDesign';

const About = () => {
    const navigation = useNavigation()
    


    return (
        <SafeAreaView style={st.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 50, marginBottom: 20 }}>
                <View style={{ height: 30, width: 30, backgroundColor: COLORS.gray, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                    <TouchableOpacity
                        onPress={navigation.goBack}>
                        <Ionicon name='arrow-back' size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={st.title}>About</Text>
                </View>
                <Icon name='exclamationcircleo' size={24} color={COLORS.gray} />
            </View>
            <View style={st.layout}>
                <View>
                    <Image
                        source={require("../assets/app_images/coffe_logo.png")}
                        style={st.logo} />
                </View>
                <Text style={st.txt1}>Elixir</Text>
                <Text style={st.txt2}>v 0.0.1</Text>
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
    layout: {
        flex: 1, justifyContent: 'center',
        alignItems: 'center', marginBottom: 100
    },
    logo: {
        height: 200, width: 250,
    },
    txt1: {
        margin: 10, fontSize: 40, fontWeight: '800', color: COLORS.doDam,
    },
    txt2: {
        fontSize: 20, color: COLORS.gray,
    },

})

export default About

