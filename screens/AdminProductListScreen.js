import { StyleSheet, Text, View,SafeAreaView,ScrollView,Image,Pressable, Platform, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../UserContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

const AdminProductListScreen = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused()
    const {userId,setUserId} = useContext(UserType);
    const [products,setProducts] = useState([]);
    const [deleted,setDeleted] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
            const response = await axios.get(`http://192.168.43.129:8000/getAllProducts/${userId}`);
            setProducts(response.data.products)
          } catch (error) {
            console.log("error", error)
          }
        }
    
        fetchData();
      }, [isFocused,deleted]);
    const deleteAlert = (item)=>{
      Alert.alert("Are you sure to delete the product?","",[
        {
          text:"Yes",
          onPress:()=>{
            const product = {
              productId:item._id,
              publicId:item.publicId
            }
            axios.post("http://192.168.43.129:8000/deleteProduct",{product},{"headers":{
              'Content-Type':'application/json'
            }}).then((response)=>{
              Alert.alert("Success","Product deleted successfully");
              setDeleted(true)
            }).catch((error)=>{
              Alert.alert("Error","Failed to delete product");
        
            })
          }
        },
        {
          text:"No",
        }
      ])
    }
  return (
    <SafeAreaView style={{paddingTop:Platform.OS === "android"?40:0,flex:1,backgroundColor:"white"}}>
        <View style={{backgroundColor:"#00FF00",padding:10,height:50,flexDirection:"row",alignItems:"center"}}/>
        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Edit your products
          </Text>
          <Text style={{height:1,borderColor:"#D0D0D0",borderWidth:2,marginTop:15}}></Text>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 10 }}>
        {products.map((item, index) => (
          <View
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
            key={index}
          >
            <View
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Image
                  style={{ width: 40, height: 40, resizeMode: "contain", marginLeft:10 }}
                  source={{ uri: item.image }}
                />
              </View>

              <View>
                <Text numberOfLines={3} style={{ width: 100, marginTop: 10 }}>
                  {item.name}
                </Text>
              </View>

              <View>
                <Text numberOfLines={3} style={{ width: 100, marginTop: 10 }}>
                  {item.quantity} kgs
                </Text>
              </View>

              <Pressable
                    onPress={()=>{
                      deleteAlert(item)
                    }}
                    style={{
                      backgroundColor: "#ffffff",
                      padding: 7,
                      borderRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="red" />
                </Pressable>

                <Pressable
                    onPress={() => navigation.navigate("EditProduct",{item})}
                    style={{
                      backgroundColor: "#ffffff",
                      padding: 7,
                      borderRadius: 6,
                    }}
                  >
                    <Entypo name="edit" size={24} color="black" />
                </Pressable>
            </View>
        </View>
        ))}
        {!products.length && (<Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            No products available
          </Text>)}
        </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default AdminProductListScreen

const styles = StyleSheet.create({})