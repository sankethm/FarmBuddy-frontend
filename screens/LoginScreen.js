import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.jpg'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Main")
        }
      } catch (err) {
        console.log("error message", err)
      }
    }
    checkLoginStatus()
  }, []);
  const handleLogin = () => {
    const user = {
      email: email,
      password: password
    }
    axios.post("http://192.168.43.129:8000/login", user, {
      "headers": {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response);
      const token = response.data.token;
      AsyncStorage.setItem("authToken", token);
      navigation.replace("Main");
    }).catch((error) => {
      Alert.alert("Login Error", "Invalid Email or Password");
      console.log(error);
    })
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", alignItems: "center", marginTop: 50 }}>
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
            Login to your Account
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
            <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="gray" />

            <TextInput
              value={email}
              onChangeText={(Text) => setEmail(Text)}
              style={{ color: "gray", width: 300, fontSize: email ? 16 : 16 }} placeholder="Enter your Email" />
          </View>

        </View>

        <View style={{ marginTop: 10 }}>
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
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: "#FEBE10",
            borderRadius: 6,
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Login</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Register")} style={{ marginTop: 15 }} >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16, fontWeight: "bold" }}>Don't have an account? Sign Up</Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})