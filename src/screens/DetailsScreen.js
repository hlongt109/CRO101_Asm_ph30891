import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../config/colors'
import SPACING from '../config/SPACING'
import COLORS from '../constrain/colors'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios';
const { height, width } = Dimensions.get("window")

const DetailsScreen = ({ route }) => {
  const { coffee } = route.params  /**route.params là một đối tượng chứa tất cả các thông số được truyền từ màn hình trước đó */
  const size = coffee.sizes
  const [activeSize, setActiveSize] = useState(null);
  const [selectedSizePrice, setSelectedSizePrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  
  // console.log(coffee);
  // console.log(activeSize);
  // console.log(selectedSizePrice);
  // console.log(quantity);
  // console.log(total);

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
  // add to favourite
  const addToFavourite = async () => {
    try {
      const userId = await getUserId();
      await axios.post("http://10.0.2.2:3000/favourite", {
        userId: userId,
        productId: coffee.id,
        productName: coffee.name,
        productImage: coffee.image,
        productPrice: coffee.price,
        productDescription: coffee.description,
        productCategoryId: coffee.categoryId,
        productRating: coffee.rating,
        productIncluded: coffee.included,
        sizes: coffee.sizes
      });
      ToastAndroid.show("Đã thêm vào yêu thích", ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error.message);
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  }
  // total price
  const calculateTotal = () => {
    return parseInt(quantity) * selectedSizePrice;
  }
  // to payment
  const toPayment = () =>{
    if(activeSize === null){
      ToastAndroid.show("Chưa chọn size",ToastAndroid.SHORT);
    }else{
      const total = calculateTotal();
      navigation.navigate("Pay",{coffee,activeSize,selectedSizePrice,quantity,total})
    }
  }
  
  return (
    <>
      <ScrollView
        style={st.container}>
        <SafeAreaView>
          <ImageBackground source={{ uri: coffee.image }}
            style={{
              height: height / 2 + SPACING * 4,
              justifyContent: 'space-between'
            }}
            imageStyle={{
              borderBottomLeftRadius: SPACING * 3, borderBottomRightRadius: SPACING * 3
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: SPACING * 2,
              }}>
              <TouchableOpacity
                onPress={navigation.goBack}
                style={{
                  backgroundColor: colors.dark,
                  padding: SPACING,
                  borderRadius: SPACING * 1.5
                }}>
                <Ionicons
                  name='arrow-back'
                  color={colors.white}
                  size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addToFavourite}
                style={{
                  backgroundColor: colors.dark,
                  padding: SPACING,
                  borderRadius: SPACING * 1.5
                }}>
                <Ionicons
                  name='heart'
                  color={colors.white}
                  size={20} />
              </TouchableOpacity>
            </View>

            <View>
              <View style={{
                borderRadius: SPACING * 3,
                overflow: 'hidden'
              }}>
                <View
                  style={{
                    padding: SPACING * 2,
                    backgroundColor: 'rgba(192,192,192,0.5)',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <View>
                    <Text style={{
                      color: COLORS.white,
                      fontSize: SPACING * 2,
                      fontWeight: '600',
                      marginBottom: SPACING
                    }} >{coffee.name}</Text>
                    <Text style={{
                      color: COLORS.backSecond,
                      fontSize: SPACING * 1.4,
                      fontWeight: '500',
                      marginBottom: SPACING
                    }}>{coffee.included}</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Ionicons name='star' size={20} color={colors.primary} />
                      <Text style={{ color: colors.white, marginLeft: SPACING }}>{coffee.rating}</Text>
                    </View>
                  </View>
                  <View style={{
                    width: "35%",
                    justifyContent: 'space-between'
                  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{
                        padding: SPACING / 2,
                        backgroundColor: colors.dark,
                        borderRadius: SPACING,
                        width: SPACING * 5, height: SPACING * 5,
                        justifyContent: 'center', alignItems: 'center'
                      }}>
                        <Ionicons name='cafe'
                          size={SPACING * 2}
                          color={colors.primary} />
                        <Text
                          style={{
                            color: colors['white-smoke'],
                            fontSize: SPACING * 1.2
                          }}>Coffee</Text>
                      </View>
                      <View style={{
                        padding: SPACING / 2,
                        backgroundColor: colors.dark,
                        borderRadius: SPACING,
                        width: SPACING * 5, height: SPACING * 5,
                        justifyContent: 'center', alignItems: 'center'
                      }}>
                        <Ionicons name='water'
                          size={SPACING * 2}
                          color={colors.primary} />
                        <Text style={{
                          color: colors['white-smoke'],
                          fontSize: SPACING * 1.2
                        }}>Milk</Text>
                      </View>
                    </View>
                    <View style={{
                      backgroundColor: colors.dark,
                      padding: SPACING / 2,
                      borderRadius: SPACING / 2,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Text style={{
                        color: colors['white-smoke'],
                        fontSize: SPACING * 1.3
                      }}>Medium roasted</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View style={{
            padding: SPACING
          }}>
            <Text style={{
              color: COLORS.gray,
              fontSize: SPACING * 1.7,
              marginBottom: SPACING
            }}>Description</Text>
            <Text numberOfLines={3} style={{ color: colors.primary }}>{coffee.description}</Text>
            <View style={{
              marginVertical: SPACING * 1.5
            }}>
              <Text style={{
                color: COLORS.gray,
                fontSize: SPACING * 1.7,
                marginBottom: SPACING
              }}>Size
              </Text>
              <View
                style={{
                  flexDirection: 'row', justifyContent: 'space-between'
                }}>
                {size.map((size) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedSizePrice(size.price);
                      setActiveSize(size);
                    }}
                    key={size.name}
                    style={[{
                      borderWidth: 2,
                      paddingVertical: SPACING / 2,
                      borderRadius: SPACING,
                      backgroundColor: colors["dark-light"],
                      width: width / 3 - SPACING * 2,
                      alignItems: 'center'
                    },
                    activeSize == size && {
                      borderColor: COLORS.white,
                      backgroundColor: COLORS.gray
                    }
                    ]}>
                    <Text
                      style={[{
                        color: colors.primary,
                        fontSize: SPACING * 1.8
                      },
                      activeSize === size && {
                        color: COLORS.pinkSecond
                      }
                      ]}>{size.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'column' }}>
              <Text style={{ color: COLORS.gray, fontSize: SPACING * 1.7, marginBottom: SPACING }}>Quantity</Text>
              <View style={{ width: '100%', borderWidth: 2, borderColor: COLORS.gray, borderRadius: 10 }}>
                <TextInput
                  value={quantity.toString()}
                  onChangeText={(txt) => {
                    setQuantity(txt)
                  }}
                  style={{ textAlign: 'center', color: COLORS.gray, fontSize: 20 }}
                />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
      <SafeAreaView style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.pinkSecond,
        paddingBottom: SPACING / 2
      }}>
        <View style={{
          padding: SPACING,
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: SPACING * 2,
        }}>
          <Text style={{ color: colors.backSecond, fontSize: SPACING * 1.7, fontWeight: 'bold' }}>Price</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.primary, fontSize: SPACING * 2, fontWeight: '600' }}>$</Text>
            <Text
              style={{
                color: colors.gray,
                fontSize: SPACING * 1.7,
                marginLeft: SPACING / 2,
                fontWeight: '600'
              }}>{selectedSizePrice === null ? coffee.price : `${calculateTotal()}`}</Text>
          </View>
        </View>
        <TouchableOpacity
        onPress={toPayment}
          style={{
            marginRight: SPACING,
            backgroundColor: colors.primary,
            width: width / 2 + SPACING * 2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SPACING * 2,
          }}>
          <Text style={{ color: colors.white, fontSize: SPACING * 2, fontWeight: '700' }}>Buy Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  )
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pinkSecond
  }
})

export default DetailsScreen

