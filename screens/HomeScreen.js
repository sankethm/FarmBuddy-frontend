import { StyleSheet, Text, View, SafeAreaView, Platform,ScrollView, Pressable, TextInput, Image } from 'react-native'
import React,{useEffect,useState,useCallback, useContext} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { Entypo } from "@expo/vector-icons";
import ProductItem from '../components/ProductItem';
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation,useIsFocused } from "@react-navigation/native";
import { useSelector } from 'react-redux';
import { BottomModal, SlideAnimation, ModalContent } from "react-native-modals";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";
import { UserType } from '../UserContext';


const HomeScreen = () => {
  const list = [
    {
      id:"0",
      image:require("../assets/categories/vegetables.png"),
      name:"vegetables"
    },
    {
      id:"1",
      image:require("../assets/categories/fruits.png"),
      name:"fruits"
    },
    {
      id:"2",
      image:require("../assets/categories/crops.png"),
      name:"crops"
    },
  ]
  
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [addresses,setAddresses] = useState([])
  const [category, setCategory] = useState("Vegetable");
  const {userId,setUserId} = useContext(UserType);
  const [selectedAddress,setSelectedAddress] = useState("");
  const [offers,setOffers] = useState([]);
  const [items, setItems] = useState([
    { label: "Vegetable", value: "Vegetable" },
    { label: "Fruit", value: "Fruit" },
    { label: "Crop", value: "Crop" },
  ]);
  
  const isFocused = useIsFocused()
  useEffect(() => {
    const fetchData = async () => {
      const products = await axios.get("http://192.168.43.129:8000/getAllProducts",{"headers":{
        'Content-Type':'multipart/form-data'
        }})
      setProducts(products.data.products)
      let offerList = products.data.products.filter((item)=>item.discount>0);
      setOffers(offerList)

    };

    fetchData();
  }, [isFocused]);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  useEffect(() => {
    if (userId) {
      fetchAddresses();
    }
  }, [userId, modalVisible]);
  useEffect(() => {
    const fetchUser = async() => {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        console.log(userId)
        setUserId(userId)
        
    }

    fetchUser();
  },[]);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.43.129:8000/addresses/${userId}`
      );
      const { addresses } = response.data;

      setAddresses(addresses);
    } catch (error) {
      console.log("error", error);
    }
  };
  const cart = useSelector((state) => state.cart.cart);
  

  return (
    <>
    <SafeAreaView style={{paddingTop:Platform.OS === "android"?40:0,flex:1,backgroundColor:"white"}}>
      <ScrollView>
        <View style={{backgroundColor:"#00FF00",padding:10,flexDirection:"row",alignItems:"center"}}>
          <Pressable style={{flexDirection:"row",alignItems:"center",marginHorizontal:7,
          backgroundColor:"white",borderRadius:3,height:38,flex:1
          }}>
            <AntDesign style={{paddingLeft:10}} name="search1" size={24} color="black" />
            <TextInput placeholder='Search Products'></TextInput>
          </Pressable>
          <Feather name="mic" size={24} color="black" />
        </View>
        <Pressable
          onPress={()=> setModalVisible(!modalVisible)}
          style={{
            flexDirection:"row",
            alignItems:"center",
            gap:5,
            padding:10,
            backgroundColor:"#AFFFFF"
            }}>
          <Ionicons name="location-outline" size={24} color="black" />
          <Pressable onPress={()=> setModalVisible(!modalVisible)}>
          {selectedAddress ? (
                <Text>
                  Deliver to {selectedAddress?.name} - {selectedAddress?.street}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                    Add a Address
                </Text>
              )}
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Pressable>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          
          {list.map((item,index)=>(
            <Pressable key={index} style={{margin:10,justifyContent:"center",alignItems:"center"}}>
            <Image style={{width:100,height:100,resizeMode:"contain"}} source={item.image}></Image>
            <Text style={{textAlign:"center",fontSize:12,fontWeight:500}}>{item.name}</Text>
          </Pressable>
          ))
            
          }
        </ScrollView>
        

          <Text style={{height:1,borderColor:"#D0D0D0",borderWidth:2,marginTop:15}}></Text>
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Today's Deals
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                key={index}
                onPress={() =>
                  navigation.navigate("Info", {
                    title: item.name,
                    price: item.price,
                    carouselImages: item.carouselImages,
                    //oldPrice: item.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  marginHorizontal:10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 150, height: 150, resizeMode: "contain" }}
                  source={{ uri: item.image }}
                />
                <View
                  style={{
                    backgroundColor: "#E31837",
                    paddingVertical: 5,
                    width: 130,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "bold",
                    }}
                  >
                    Upto {item.discount} %
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text style={{height:1,borderColor:"#D0D0D0",borderWidth:2,marginTop:15}}></Text>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
              marginBottom: open ? 50 : 15,
            }}
          >
            <DropDownPicker
              style={{
                borderColor: "#B7B7B7",
                height: 30,
                marginBottom: open ? 120 : 15,
              }}
              open={open}
              value={category} //genderValue
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={styles.placeholderStyles}
              onOpen={onGenderOpen}
              // onChangeValue={onChange}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {products
              .filter((item) => item.category === category)
              .map((item, index) => (
                <ProductItem item={item} key={index} />
              ))}
          </View>
      </ScrollView>
    </SafeAreaView>
    <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>

            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availabilty and delivery
              options
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {addresses.map((item, index) => (
              <Pressable
                onPress = {()=>{setSelectedAddress(item)}}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:selectedAddress === item ? "#FBCEB1" : "white"
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item.houseNo},{item.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {item.street}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  India, Bangalore
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Address");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066b2",
                  fontWeight: "500",
                }}
              >
                Add an Address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>
          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Enter an Indian pincode
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066b2" />
              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Use My Currect location
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="earth" size={22} color="#0066b2" />

              <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                Deliver outside India
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})