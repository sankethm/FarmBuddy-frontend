import { StyleSheet, Text, View, SafeAreaView, ScrollView,Pressable, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";


const AddProductScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{paddingTop:Platform.OS === "android"?40:0,flex:1,backgroundColor:"white"}}>
    <ScrollView  showsVerticalScrollIndicator={false}>
    <View style={{height:50,backgroundColor:"#00ff00"}}/>
    <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Manage your products
          </Text>
    <Pressable
        onPress={()=>navigation.navigate("AddProduct")}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 20,
        }}
      >
        <Text>Add Product</Text>
    </Pressable>

    <Pressable
        onPress={()=>navigation.navigate("AdminProduct")}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 20,
        }}
      >
        <Text>Delete or Edit Product</Text>
    </Pressable>
    </ScrollView>
    </SafeAreaView>
  )
}

export default AddProductScreen

const styles = StyleSheet.create({})