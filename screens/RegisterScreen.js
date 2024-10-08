import { StyleSheet, Text, View, SafeAreaView, Pressable, Image, KeyboardAvoidingView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import logo from '../assets/logo.jpg'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      "name":name,
      "email":email,
      "password":password
    }
    axios.post("http://192.168.43.129:8000/register",user,{"headers":{
      'Content-Type':'application/json'
    }}).then((response)=>{
      console.log(response);
      Alert.alert("Registration Successful","You have registered successfully");
      setName("");
      setEmail("");
      setPassword("");
    }).catch((error)=>{
      console.log("registration failed",error);
      Alert.alert("Registration Error","an error occured during registration");
      
    })
    

  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center",marginTop:50 }}>
      <View>
        <Image
          source={require("../assets/logo.jpg")}
          style={{ width: 150, height: 100 }}
        >

        </Image>
      </View>
      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 15,
              color: "#041E42"
            }}
          >
            Register to your Account
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "centre",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30
            }}
          >
            <Ionicons style={{marginLeft:8}} name="person" size={24} color="gray" />
            <TextInput
              value={name}
              onChangeText={(Text) => setName(Text)}

              style={{ color: "gray", width: 300, fontSize: name ? 16 : 16 }} placeholder="Enter your name" />

          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "centre",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30
            }}
          >
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />

            <TextInput
              value={email}
              onChangeText={(Text) => setEmail(Text)}

              style={{ color: "gray", width: 300, fontSize: email ? 16 : 16 }} placeholder="Enter your Email" />

          </View>



        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "centre",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30
            }}
          >
             <AntDesign style={{ marginLeft: 8 }} name="lock1" size={24} color="gray" />
            

            <TextInput
              value={password}
              onChangeText={(Text) => setPassword(Text)}
              secureTextEntry={true}
              style={{ color: "gray", width: 300, fontSize: password ? 16 : 16 }} placeholder="Enter your Password" />
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: "row",
            alignItems: "centre",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ marginTop: 5 }}>Keep me logged in</Text>

          <Text style={{ color: "#007FFF", fontWeight: "500", marginTop: 5 }}>
            Forgot Password
          </Text>
        </View>

        <View style={{ marginTop: 80 }} />

        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={{ marginTop: 15 }} >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16, fontWeight: "bold" }}>Already Have an account? Sign In</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})