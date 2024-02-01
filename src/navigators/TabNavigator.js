import React from 'react'
import { StyleSheet} from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoriteScreen from '../screens/FavoriteScreen';
import CartScreen from '../screens/CartScreen';
import OrderHistoryScreen from '../screens/PersonalScreen';
import { COLORS } from '../theme/theme';
import COLOR from '../constrain/colors';
import { BlurView } from '@react-native-community/blur';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarSt,
                tabBarBackground: () => (
                    <BlurView overlayColor='' blurAmount={15} style={(styles.BlurViewSt)} />
                )
            }}>
            <Tab.Screen name="Home" component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (

                        <Ionicons name="home" size={22} color={
                            focused ? COLOR.pink : COLOR.gray
                        } />

                    ),
                }}>

            </Tab.Screen>
            <Tab.Screen name="Cart" component={CartScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="cart" size={22} color={
                            focused ? COLOR.pink : COLORS.primaryLightGreyHex
                        }
                        />
                    ),
                }}>

            </Tab.Screen>
            <Tab.Screen name="Favorite" component={FavoriteScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="heart" size={22} color={
                            focused ? COLOR.pink : COLORS.primaryLightGreyHex
                        }
                        />
                    ),
                }}>

            </Tab.Screen>
            <Tab.Screen name="personal" component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons name="person" size={22} color={
                            focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                        }
                        />
                    ),
                }}></Tab.Screen>

        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    layout: {
        borderRadius: 10,
        borderWidth: 1,
    },
    tabBarSt: {
        height: 55,
        position: 'absolute',
        backgroundColor: COLOR.white,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    BlurViewSt: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    }
})
export default TabNavigator

