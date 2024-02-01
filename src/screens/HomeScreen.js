import { ScrollView, StyleSheet, Image, TouchableOpacity, View, Text, Dimensions, Modal, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { FONTSIZE } from '../theme/theme';
import COLOR from '../constrain/colors'
import Categories from '../components/Categories';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SPACINGs from '../config/SPACING';
import colors from '../config/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchView from '../components/SearchView';
import { useNavigation } from '@react-navigation/native';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window')

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [dataFromServer, setDataFromServer] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeSize, setActiveSize] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState('');
  const [prQuantity, setPrQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [priceAccordingSize, setPriceAccordingSize] = useState(0);
  const [multipleSizes, setMultipleSizes] = useState(null);

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
  // getData
  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const fetchDataFromServer = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/products');
      const data = response.data;
      setDataFromServer(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  //Modal
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);

    setProductId(product.id);
    setProductName(product.name);
    setProductImage(product.image);
    setMultipleSizes(product.sizes)
    console.log(product.sizes);
  }
  // Check quantity
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (isNaN(prQuantity) || prQuantity < 1) {
        setPrQuantity(1);
      } else {
        setPrQuantity(prQuantity)
      }
    }, 200)
    return () => clearTimeout(timeOut);
  }, [prQuantity]);
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
        quantity: prQuantity,
        size: selectedSize,
        price: priceAccordingSize,
        sizes: multipleSizes
      });
      ToastAndroid.show("Đã thêm vào giỏ hàng", ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error:', error.message);
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  }
  return (

    <SafeAreaView style={st.ScreenContainer}>
      <View style={{ flex: 1 }}>
        <View
          style={{ padding: SPACINGs, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={{

              borderRadius: SPACINGs,
              borderWidth: 1,
              borderColor: COLOR.gray,
              overflow: "hidden",
              width: SPACINGs * 4,
              height: SPACINGs * 4,
            }}>
            <View
              style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons
                name="menu"
                size={SPACINGs * 2.5}
                color={COLOR.gray}
              />
            </View>
          </TouchableOpacity>

          <View style={{
            alignItems: 'center', justifyContent: 'center'
          }}>
            <Text style={{ fontSize: FONTSIZE.size_28, fontWeight: '800', color: COLOR.doDam }}>Elixer</Text>
          </View>

          <TouchableOpacity
            style={{
              borderRadius: SPACINGs,
              overflow: "hidden",
              width: SPACINGs * 4,
              height: SPACINGs * 4,
            }}>
            <View
              style={{
                width: SPACINGs * 4,
                height: SPACINGs * 4,
                overflow: 'hidden',
              }}>
              <View style={{
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Icon
                  name='bell-outline'
                  size={SPACINGs * 2.5}
                  color={COLOR.gray} />
              </View>
            </View>
          </TouchableOpacity>

        </View>

        <View style={{ width: '100%', marginVertical: SPACINGs * 2, }}>
          <Text
            style={{
              color: COLOR.white,
              fontSize: SPACINGs * 2.1,
              fontWeight: '600', textAlign: 'center'
            }}>Awaken your senses, One sip at a time
          </Text>
        </View>

        <View style={{ marginHorizontal: 10 }}>
          <SearchView />
          <Categories onChange={(id) => setActiveCategoryId(id)} />
        </View>

        <ScrollView
          style={{
            padding: SPACINGs, marginBottom: 50
          }}>
          {/** Card */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              overflow: 'hidden'
            }}>
            {dataFromServer
              .filter(coffee => activeCategoryId === null || coffee.categoryId === activeCategoryId || activeCategoryId === 0)
              .map((coffee) => (
                <TouchableOpacity key={coffee.id}
                  style={{
                    width: width / 2 - SPACINGs * 2,
                    marginBottom: SPACINGs,
                    borderRadius: SPACINGs * 2,
                    overflow: 'hidden'
                  }}
                  onPress={() => navigation.navigate('Details', { coffee })}>
                  <View
                    style={{
                      padding: SPACINGs,
                      backgroundColor: COLOR.gray,
                    }}>
                    <View
                      style={{
                        height: 150,
                        width: '100%',
                      }}>
                      <Image
                        source={{ uri: coffee.image }}
                        style={{ width: '100%', height: '100%', borderRadius: SPACINGs * 2 }}
                      />
                      <View
                        style={{
                          position: 'absolute',
                          right: 0,
                          borderBottomStartRadius: SPACINGs * 3,
                          borderTopEndRadius: SPACINGs * 2,
                          overflow: 'hidden',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            padding: SPACINGs - 2,
                          }}>
                          <Ionicons
                            style={{
                              marginLeft: SPACINGs / 2,
                            }}
                            name='star'
                            color={colors.primary}
                            size={SPACINGs * 1.7} />
                          <Text
                            style={{
                              color: colors.white,
                              marginLeft: SPACINGs / 2
                            }}>{coffee.rating}</Text>
                        </View>
                      </View>
                    </View>
                    <Text
                      numberOfLines={2}
                      style={{
                        color: colors.white,
                        fontWeight: '600',
                        fontSize: SPACINGs * 1.7,
                        marginTop: SPACINGs,
                        marginBottom: SPACINGs / 2,
                      }}>{coffee.name}</Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: colors.primary,
                        fontSize: SPACINGs * 1.2
                      }}
                    >{coffee.included}
                    </Text>
                    <View
                      style={{
                        marginVertical: SPACINGs / 2,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            color: colors.primary, fontSize: SPACINGs * 1.5, marginRight: SPACINGs / 2
                          }}>$</Text>
                        <Text
                          style={{
                            color: colors.white, fontSize: SPACINGs * 1.5
                          }}
                        >{coffee.price}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => openModal(coffee)}
                        style={{
                          backgroundColor: colors.primary,
                          padding: SPACINGs / 2,
                          borderRadius: SPACINGs
                        }}>
                        <Icon
                          name="cart-variant"
                          size={SPACINGs * 2}
                          color={colors.white} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
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
                  value={prQuantity.toString()}
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
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLOR.pinkSecond
  },
  ScrollViewFlex: {
    flexGrow: 1,
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
    backgroundColor: COLOR.pinkSecond,
    borderColor: "gray",
    padding: 5,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  sizeButtonText: {
    fontSize: 16,
    color: COLOR.white,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  button: {
    width: 85,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    alignItems:'center',
    marginLeft: 15
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

export default HomeScreen

