import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { BlurView } from '@react-native-community/blur'
import colors from '../config/colors'
import SPACING from '../config/SPACING'
import COLORS from '../constrain/colors'

const SearchView = ({ onSearch }) => {
    return (
        <View
            style={{
                borderRadius: SPACING,
                opacity: 0.7,
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: COLORS.pinkSecond
            }}>
            <BlurView
                intensity={30}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <TextInput
                    style={{
                        width: "100%",
                        color: colors.white,
                        fontSize: SPACING * 1.7,
                        padding: SPACING,
                        paddingLeft: SPACING * 3.5,
                    }}
                    placeholder='Find your coffee...'
                    placeholderTextColor={colors.white} 
                    onChangeText={(text) => onSearch(text)}/>
            </BlurView>
        </View>
    )
}

export default SearchView

const styles = StyleSheet.create({})