import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import  COLORS  from '../constrain/colors'

const Button = (props) => {
    const filledGgColor = props.color || COLORS.primary;
    const outLinedColor = COLORS.white;
    const bgColor = props.filled ? filledGgColor : outLinedColor;
    const textColor = props.filed ? COLORS.white : COLORS.doDam;
  return (
    <TouchableOpacity
      style = {{
        ...styles.button,
        ...{backgroundColor: bgColor},
        ...props.style
      }}
      onPress={props.onPress}
    >
        <Text style= {{fontSize:18, ...{color: textColor}}}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.doDam,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Button
