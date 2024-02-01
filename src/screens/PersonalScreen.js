import { StyleSheet, SafeAreaView, View, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Title, Caption, TouchableRipple, Text, } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { useNavigation } from '@react-navigation/native'
import COLORS from '../constrain/colors'
import colors from '../config/colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Personal = () => {
  const navigation = useNavigation();
  const [logOutModalVisible, setLogOutModalVisible] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    // phone: '',
  });

  const handleLogout = () => {
    setLogOutModalVisible(true);
  }
  const confirmLogOut = () => {
    setLogOutModalVisible(false);
    logOutUser();
  }
  const cancelLogout = () => {
    setLogOutModalVisible(false);
  }
  const logOutUser = async () => {
    try {
      await AsyncStorage.removeItem('isLoggedIn');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userFullName');
      await AsyncStorage.removeItem('idUser');

      navigation.navigate("Login")
    } catch (error) {
      console.error('Error:', error.message);
    }
  }

  useEffect(() => {
    fletchUserInfo();
  }, []);

  const fletchUserInfo = async () => {
    try {
      const name = await AsyncStorage.getItem("userFullName");
      const email = await AsyncStorage.getItem("userEmail");
      // const phone = await AsyncStorage.getItem();

      setUserInfo({
        name: name || "",
        email: email || "",
      });
    } catch (error) {
      console.error('Error fetching user info:', error.message);
    }
  }

  return (
    <SafeAreaView style={st.container}>

      <View style={st.userInfoSection}>
        <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <Avatar.Image
            source={require("../assets/app_images/avt.jpg")}
            size={80} />
          <View style={{ marginLeft: 20 }}>
            <Title style={[st.title, {
              marginTop: 15,
              marginBottom: 5,
            }]}>{userInfo.name}</Title>
            <Caption style={st.caption}>ph30891</Caption>
          </View>
        </View>
      </View>

      <View style={st.userInfoSection}>
        <View style={st.row}>
          <Icon name='phone' size={20} color={COLORS.gray} />
          <Text style={{ color: COLORS.gray, marginLeft: 20 }}>0869088339</Text>
        </View>
        <View style={st.row}>
          <Icon name='email' size={20} color={COLORS.gray} />
          <Text style={{ color: "#1E90FF", marginLeft: 20 }}>{userInfo.email}</Text>
        </View>
      </View>

      <View style={{ height: 1, backgroundColor: "#f1f1f1" }} />

      <View style={st.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate("ProfileDetails")}>
          <View style={st.menuItem}>
            <View style={{ flexDirection: 'row', }}>
              <Ionicon name='person-circle-outline' color={colors.gray} size={25} />
              <Text style={st.menuItemText}>Personal Details</Text>
            </View>
            <View>
              <IconEntypo name='chevron-thin-right' size={20} color={COLORS.gray} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("OrderHistory")}>
          <View style={st.menuItem}>
            <View style={{ flexDirection: 'row', }}>
              <Icon name='clock-check-outline' color={COLORS.gray} size={25} />
              <Text style={st.menuItemText}>Order History</Text>
            </View>
            <View>
              <IconEntypo name='chevron-thin-right' size={20} color={COLORS.gray} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => { }}>
          <View style={st.menuItem}>
            <View style={{ flexDirection: 'row', }}>
              <Icon name='map-marker-radius-outline' color={COLORS.gray} size={25} />
              <Text style={st.menuItemText}>Address</Text>
            </View>
            <View>
              <IconEntypo name='chevron-thin-right' size={20} color={COLORS.gray} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => { }}>
          <View style={st.menuItem}>
            <View style={{ flexDirection: 'row', }}>
              <Icon name='credit-card-outline' color={COLORS.gray} size={25} />
              <Text style={st.menuItemText}>Payment Method</Text>
            </View>
            <View>
              <IconEntypo name='chevron-thin-right' size={20} color={COLORS.gray} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => navigation.navigate("About")}>
          <View style={st.menuItem}>
            <View style={{ flexDirection: 'row', }}>
              <Ionicon name='alert-circle-outline' color={COLORS.gray} size={25} />
              <Text style={st.menuItemText}>About</Text>
            </View>
            <View>
              <IconEntypo name='chevron-thin-right' size={20} color={COLORS.gray} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => { navigation.navigate('Contact') }}>
          <View style={st.menuItem}>
            <View style={{ flexDirection: 'row', }}>
              <Icon name='help-circle-outline' color={COLORS.gray} size={25} />
              <Text style={st.menuItemText}>Help</Text>
            </View>
            <View>
              <IconEntypo name='chevron-thin-right' size={20} color={COLORS.gray} />
            </View>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={handleLogout}>
          <View style={st.menuItem}>
            <View style={{ flexDirection: 'row', }}>
              <Icon name='logout' color={COLORS.gray} size={25} />
              <Text style={st.menuItemText}>Log Out</Text>
            </View>
          </View>
        </TouchableRipple>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={logOutModalVisible}
        onRequestClose={() => setLogOutModalVisible(false)}>
        <View style={st.modalContainer}>
          <View style={st.modalContent}>
            <Text style={st.modalText}>Bạn có chắc muốn đăng xuất không?</Text>
            <View style={st.modalButtons}>
              <TouchableOpacity onPress={confirmLogOut}>
                <Text style={st.modalButton}>Có</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelLogout}>
                <Text style={st.modalButton}>Không</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.pinkSecond
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.gray
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    color: COLORS.gray
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuWrapper: {

  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderBlockColor: "#f1f1f1",
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuItemText: {
    color: COLORS.gray,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.gray,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    color: COLORS.white
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    color: COLORS.pinkSecond,
    fontSize: 16,
    fontWeight: 'bold'
  },
})

export default Personal

