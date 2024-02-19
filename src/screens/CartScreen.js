import { Dimensions, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import SPACINGs from '../config/SPACING';
import COLOR from '../constrain/colors';
import colors from '../config/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import SPACING from '../config/SPACING'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'react-native-axios';

const { width } = Dimensions.get('window')
const CartScreen = () => {

  const navigation = useNavigation();
  const [carts, setCarts] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [updateSizeModal, setUpdateSizeModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productId, setProductId] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceAccordingSize, setPriceAccordingSize] = useState(0);
  const [activeSize, setActiveSize] = useState(false);
  const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);

  // get data
  useEffect(() => {
    fetchDataFromServer()
  }, [carts]);

  const fetchDataFromServer = async () => {
    try {
      const userId = await getUserId();
      const response = await axios.get(`http://10.0.2.2:3000/carts?userId=${userId}`);
      const data = response.data;
      setCarts(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  // get userId
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('idUser');
      return userId;
    } catch (error) {
      console.error('Error getting userId from AsyncStorage:', error);
      return null;
    }
  }
  // total price
  const calculateTotalPrice = () => {
    return carts.reduce((total, coffee) => {
      return total + coffee.price * coffee.quantity;
    }, 0);
  }
  // update quantity
  const handleQuantityChange = async (coffeeId, quantityChange) => {
    try {
      const updateCart = carts.find(coffee => coffee.id === coffeeId);
      const newQuantity = Math.max(1, updateCart.quantity + quantityChange);

      await axios.put(`http://10.0.2.2:3000/carts/${updateCart.id}`, {
        ...updateCart,
        quantity: newQuantity,
      });
      fetchDataFromServer();
    } catch (error) {
      console.error('Error updating quantity:', error.message);
    }
  };
  // update size
  const handleUpdateSize = () => {
    if (selectedSize !== '') {
      updateSize();
      setUpdateSizeModal(false);
      setSelectedSize('');
      setPriceAccordingSize(0);
      // console.log(productId);
      // console.log(selectedSize);
      // console.log(priceAccordingSize);
    } else {
      ToastAndroid.show("Chưa chọn size", ToastAndroid.SHORT);
    }
  }

  const updateSize = async () => {
    try {
      const userId = await getUserId();
      const update = carts.find(coffee => coffee.id === productId && coffee.userId === userId);
      await axios.put(`http://10.0.2.2:3000/carts/${update.id}`, {
        ...update,
        size: selectedSize,
        price: priceAccordingSize
      });

    } catch (error) {
      console.error('Error updating size:', error.message);
    }
  }
  // delete 
  const handleDelete = async () => {
    try {
      await axios.delete(`http://10.0.2.2:3000/carts/${selectedCoffeeId}`);
      fetchDataFromServer();
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  }
  // modal
  const openModalDelete = (coffeeId) => {
    setSelectedCoffeeId(coffeeId);
    setIsDeleteModalVisible(true);
  }
  const openModalUpdate = (coffee) => {
    setSelectedProduct(coffee);
    setUpdateSizeModal(true);

    setProductId(coffee.id);
  }
  return (
    <>
      <SafeAreaView style={st.container}>
        <View style={st.title}>
          <Text style={{ fontSize: 20, color: COLOR.gray, fontWeight: 'bold' }}>Cart</Text>
          <Icon name='shoppingcart' size={21} color={COLOR.gray} />
        </View>
        <ScrollView style={{ padding: 10 }}>
          <View
            style={st.scrollCart}>
            {carts
              .map((coffee) => (
                <View key={coffee.id}
                  style={st.boxCart}>
                  <View style={{ flexDirection: "row" }}>

                    <TouchableOpacity
                    // onPress={() => navigation.navigate("Details", { coffee })}
                    >
                      <Image source={{ uri: coffee.productImage }}
                        style={st.img} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                      <View style={st.infoCart}>
                        <View style={{ marginLeft: 15 }}>
                          <Text style={{ color: 'white', fontSize: 18, marginBottom: 15 }}>{coffee.productName}</Text>
                          <View style={{ borderWidth: 1, borderColor: "white", width: 50, borderRadius: 7, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity
                              onPress={() => openModalUpdate(coffee)}>
                              <Text style={{ color: 'white', fontSize: 14, color: "orange", fontWeight: 'bold' }}>{coffee.size}</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                      <View style={st.infoCart}>
                        <View style={st.boxQuantity}>
                          <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                            <Text style={{ color: 'orange', fontSize: 14, marginRight: 5, fontWeight: 'bold' }}>$</Text>
                            <Text style={{ color: 'white', fontSize: 14 }}>{coffee.price}</Text>
                          </View>
                          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <TouchableOpacity
                              style={st.btnQuantity}
                              onPress={() => handleQuantityChange(coffee.id, -1)}>
                              <Icon name='minus' size={20} color={colors.primary} />
                            </TouchableOpacity>

                            <TextInput
                              style={st.inputQuantity}
                              value={coffee.quantity.toString()}
                              onChangeText={(newQuantity) => handleQuantityChange(coffee.id, parseInt(newQuantity) || 0)}
                            />

                            <TouchableOpacity
                              style={st.btnQuantity}
                              onPress={() => handleQuantityChange(coffee.id, 1)}>
                              <Icon name='plus' size={20} color={colors.primary} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={st.delete}
                      onPress={() => openModalDelete(coffee.id)}>
                      <Icon name='delete' size={20} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={st.bottomContainer}>
        <View style={st.bottomView}>
          <Text style={{ color: COLOR.secondary, fontSize: SPACING * 1.5, fontWeight: 'bold' }}>Total :</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.primary, fontSize: SPACING * 1.5, fontWeight: 'bold' }}>$</Text>

            <Text style={st.total}>{calculateTotalPrice()}</Text>

          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            const total = calculateTotalPrice();
            navigation.navigate("Pay", { carts,total})
          }}
          style={st.btnPay}>
          <Text style={{ color: colors.white, fontSize: SPACING * 2, fontWeight: '700' }}>Pay</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {/**Modal delete */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => setIsDeleteModalVisible(false)}>
        <View style={st.centeredView}>
          <View style={st.modalView}>
            <Text style={st.modalText}>Bạn có muốn xóa khỏi giỏ hàng không?</Text>
            <View style={st.modalButtons}>
              <TouchableOpacity
                style={[st.modalButton, st.modalButtonCancel]}
                onPress={() => setIsDeleteModalVisible(false)}>
                <Text style={st.textStyle}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[st.modalButton, st.modalButtonDelete]}
                onPress={handleDelete}>
                <Text style={[st.textStyle, st.textStyleDelete]}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/**Modal update */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={updateSizeModal}
        onRequestClose={() => setUpdateSizeModal(false)}>
        {selectedProduct && (
          <View style={st.modalContainer}>
            <View style={st.modalContent}>
              <Text style={st.modalText2}>Chọn Size:</Text>
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

              <View style={st.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setUpdateSizeModal(false),
                      setSelectedSize(''),
                      setPriceAccordingSize(0)
                  }}
                  style={[st.button, st.cancelButton]}>
                  <Text style={st.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleUpdateSize}
                  style={[st.button, st.addButton]}>
                  <Text style={st.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </Modal>
    </>
  );
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.pinkSecond
  },
  title: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  scrollCart: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',

  },
  boxCart: {
    width: "100%",
    marginBottom: SPACINGs,
    borderRadius: SPACINGs * 2.5,
    overflow: 'hidden',
    backgroundColor: COLOR.gray,
    padding: 10
  },
  infoCart: {
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'space-between',
  },
  img: {
    width: 100, height: 100, borderRadius: SPACINGs * 2
  },
  inputQuantity: {
    borderWidth: 1, height: 35, borderColor: "white", borderRadius: 10, width: 90, textAlign: 'center', color: 'white',
    marginHorizontal: 5,
  },
  boxQuantity: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '83%'
  },
  btnQuantity: {
    padding: 6,
    backgroundColor: COLOR.white,
    borderRadius: 8
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLOR.gray,
    paddingBottom: SPACING / 2,
    paddingTop: SPACING / 2,
    marginBottom: 60,
    borderTopWidth: 1,
    borderColor: "#888888",

  },
  bottomView: {
    padding: SPACING / 2,
    justifyContent: 'center',
    paddingLeft: SPACING * 2,
  },
  total: {
    color: colors.white,
    fontSize: SPACING * 1.7,
    marginLeft: SPACING / 2,
    fontWeight: '600'
  },
  btnPay: {
    marginRight: SPACING,
    backgroundColor: colors.primary,
    width: width / 2 + SPACING * 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING * 2,
  },
  delete: {
    position: 'absolute',
    top: 5, right: 15,
    elevation: 3,
    padding: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 100,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: 'gray',
  },
  modalButtonDelete: {
    backgroundColor: "orange",
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textStyleDelete: {
    color: 'white',
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
  modalText2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
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
    alignItems: 'center',
    marginLeft: 15
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

export default CartScreen

