import { Dimensions, ImageBackground, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import COLORS from '../constrain/colors'
import SPACING from '../config/SPACING'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'react-native-axios';

const { height, width } = Dimensions.get("window")
const FavoriteScreen = () => {

  const [favoriteList, setFavouriteList] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSize, setActiveSize] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [proQuantity, setPrQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [priceAccordingSize, setPriceAccordingSize] = useState(0);

  // getData
  useEffect(() => {
    fetchDataFromServer()
  }, [favoriteList]);

  const fetchDataFromServer = async () => {
    try {
      const userId = await getUserId();
      const response = await axios.get(`http://10.0.2.2:3000/favourite?userId=${userId}`);
      const data = response.data;
      setFavouriteList(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  // getUserId
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('idUser');
      return userId;
    } catch (error) {
      console.error('Error getting userId from AsyncStorage:', error);
      return null;
    }
  }
  // delete favourite
  const handleDelete = async (coffeeId) => {
    try {
      await axios.delete(`http://10.0.2.2:3000/favourite/${coffeeId}`);
      fetchDataFromServer();
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  }
  // modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);

    setProductId(product.productId);
    setProductName(product.productName);
    setProductImage(product.productImage);
  }
  // Check quantity
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (isNaN(proQuantity) || proQuantity < 1) {
        setPrQuantity(1);
      } else {
        setPrQuantity(proQuantity)
      }
    }, 200)
    return () => clearTimeout(timeOut);
  }, [proQuantity]);
  // Add to carts
  const handleAddToCart = () => {
    if (selectedSize !== '') {
      createCart();
      setIsModalVisible(false)
      setPrQuantity(1)
      setSelectedSize('')
      setPriceAccordingSize(0)
    } else {
      ToastAndroid.show("Chưa chọn size", ToastAndroid.SHORT);
    }
  }
  const createCart = async () => {
    try {
      const userId = await getUserId();
      await axios.post("http://10.0.2.2:3000/carts", {
        userId: userId,
        productId: productId,
        productName: productName,
        productImage: productImage,
        quantity: proQuantity,
        size: selectedSize,
        price: priceAccordingSize
      });
      ToastAndroid.show("Đã thêm vào giỏ hàng", ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error.message);
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  }
  return (
    <SafeAreaView style={st.container}>
      <View style={st.title}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: 5, color: COLORS.gray }}>Favorite</Text>
        <Icon name='hearto' size={21} color={COLORS.gray} />
      </View>
      <ScrollView>
        <View>
          {favoriteList
            .map((coffee) => (
              <SafeAreaView key={coffee.id}>

                <ImageBackground source={{ uri: coffee.productImage }}
                  style={{
                    height: height / 2 + SPACING * 6,
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    marginHorizontal: 5
                  }}
                  imageStyle={{
                    borderRadius: SPACING * 3
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: SPACING * 2,
                      justifyContent: 'space-between'
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.dark,
                        padding: SPACING,
                        borderRadius: SPACING * 1.5
                      }}
                      onPress={() => handleDelete(coffee.id)}>
                      <Ionicons
                        name='heart'
                        color={'red'}
                        size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: colors.dark,
                        padding: SPACING,
                        borderRadius: SPACING * 1.5
                      }}
                      onPress={() => openModal(coffee)}>
                      <Ionicons
                        name='cart'
                        color={'white'}
                        size={20} />
                    </TouchableOpacity>
                  </View>


                  <View>
                    <View style={{
                      borderRadius: SPACING * 3,
                      overflow: 'hidden'
                    }}>
                      <View style={{
                        flexDirection: 'column',
                        backgroundColor: 'rgba(192,192,192,0.5)',
                      }}>
                        <View
                          style={{
                            padding: SPACING * 2,
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                          }}>
                          <View>
                            <Text style={{
                              color: COLORS.white,
                              fontSize: SPACING * 2,
                              fontWeight: '600',
                              marginBottom: SPACING
                            }} >{coffee.productName}</Text>
                            <Text style={{
                              color: COLORS.black,
                              fontSize: SPACING * 1.4,
                              fontWeight: '500',
                              marginBottom: SPACING
                            }}>{coffee.productIncluded}</Text>
                            <View style={{ flexDirection: 'row' }}>
                              <Ionicons name='star' size={20} color={colors.primary} />
                              <Text style={{ color: colors.white, marginLeft: SPACING }}>{coffee.productRating}</Text>
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

                        <View style={{
                          paddingLeft: SPACING * 2,
                          paddingRight: SPACING * 2,
                          paddingBottom: SPACING * 2,
                        }}>
                          <Text style={{
                            color: COLORS.black,
                            fontSize: SPACING * 1.7,
                            marginBottom: SPACING
                          }}>Description</Text>
                          <Text style={{ color: colors.gray, textAlign: 'justify' }}>{coffee.productDescription}</Text>
                        </View>
                      </View>

                    </View>
                  </View>
                </ImageBackground>

              </SafeAreaView>
            ))}
        </View>
      </ScrollView>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        {selectedProduct && (
          <View style={st.modalContainer}>
            <View style={st.modalContent}>
              <Text style={st.modalText}>Chọn Size:</Text>
              <View style={st.sizeContainer}>
                {selectedProduct.sizes.map((size) => (
                  <TouchableOpacity
                    key={size.name}
                    onPress={() => {
                      setActiveSize(size),
                        setSelectedSize(size.name),
                        setPriceAccordingSize(size.price)

                    }}
                    style={[st.sizeButton, activeSize == size && {
                      borderColor: "#4CAF50",
                    }]}>
                    <Text style={[st.sizeButtonText, activeSize == size && {
                      color: 'gray'
                    }]}>{size.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={st.modalText}>Số lượng:</Text>
              <View style={st.quantityContainer}>
                <TextInput
                  keyboardType='numeric'
                  value={proQuantity.toString()}
                  style={st.inputQuantity}
                  onChangeText={(text) => setPrQuantity(parseInt(text, 10))}
                />
              </View>

              <View style={st.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(false),
                      setPrQuantity(1),
                      setSelectedSize(''),
                      setPriceAccordingSize(0)
                  }}
                  style={[st.button, st.cancelButton]}>
                  <Text style={st.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAddToCart}
                  style={[st.button, st.addButton]}>
                  <Text style={st.buttonText}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  )
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pinkSecond,
    marginBottom: 50
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  quantityContainer: {
    borderWidth: 2,
    height: 40,
    borderRadius: 7,
    borderColor: 'gray',
    paddingHorizontal: 10
  },
  inputQuantity: {
    width: "100%", textAlign: 'center', fontSize: 15, height: '100%'
  },
  sizeButton: {
    width: '30%',
    borderWidth: 2,
    backgroundColor: COLORS.pinkSecond,
    borderColor: "gray",
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  sizeButtonText: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  addButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
})

export default FavoriteScreen

