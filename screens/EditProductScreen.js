import { StyleSheet, Text, View,ScrollView, TextInput, Pressable,SafeAreaView ,Image, Alert, Platform} from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import DropDownPicker from 'react-native-dropdown-picker'
import { UserType } from '../UserContext'
import { useNavigation, useRoute } from '@react-navigation/native'

const EditProductScreen = () => {
    const hasDigit = /\d/;
    const navigation = useNavigation();
    const route = useRoute();
    const [file,setFile] = useState(null)
    const [category, setCategory] = useState("Vegetable");
    const [open, setOpen] = useState(false);
    const {userId,setUserId} = useContext(UserType);
    const [name,setName] = useState("");
    const [quantity,setQuantity] = useState(0);
    const [price,setPrice] = useState(0);
    const [discount,setDiscount] = useState(0);
    const [locality,setLocality] = useState("");
    const [uploaded,setUploaded] = useState(false);
    const [imageUrl,setImageUrl] = useState("");
    const [publicId,setPublicId] = useState("");
    const [errorMsg,setErrorMsg] = useState(false);
    const [items, setItems] = useState([
      { label: "Vegetable", value: "Vegetable" },
      { label: "Fruit", value: "Fruit" },
      { label: "Crop", value: "Crop" },
    ]);
  
    const onGenderOpen = useCallback(() => {
      setCompanyOpen(false);
    }, []);
  
    const handleChoosePhoto = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes:ImagePicker.MediaTypeOptions.All,
        allowsEditing:true,
        aspect:[4,3],
        includeBase64:true,
        quality:1
      })
      if(!result.canceled){
        setFile(result.assets[0].uri)
       }
    }
    const handleUploadPhoto = async () => {
      try{
        const data = new FormData();
        let splitUri = file.split(".");
        let type = splitUri[splitUri.length-1]
        let newFile = {
          uri:file,
          type:`test/${type}`,
          name:`${name}.${type}`
        }
        data.append("file",newFile);
        data.append("upload_preset","FarmBuddy");
        data.append("cloud_name","dseybsbxn");
        fetch("https://api.cloudinary.com/v1_1/dseybsbxn/image/upload",
          {
            method:"post",
            body:data,
          }).then(res=>res.json()).then(data=>{
            Alert.alert("Image uploaded successfully")
            let old_public_id = publicId; 
            axios.post("http://192.168.43.129:8000/deleteImage",{old_public_id},{"headers":{
        'Content-Type':'application/json'
      }})
            setImageUrl(data.url);
            setPublicId(data.public_id)
            setUploaded(true)

          })
      }catch(error){
        console.log("error",error)
      }
    }
    useEffect(()=>{
        setName(route.params.item.name);
        setQuantity(route.params.item.quantity.toString());
        setPrice(route.params.item.price.toString());
        setDiscount(route.params.item.discount.toString());
        setCategory(route.params.item.category);
        setLocality(route.params.item.locality);
        setImageUrl(route.params.item.image);
        setPublicId(route.params.item.publicId);
    },[])
    const handleEditProduct = () =>{
      const product = {
        productId:route.params.item._id,
        name,
        price,
        quantity,
        category,
        discount,
        locality,
        imageUrl,
        publicId
      }
      axios.post("http://192.168.43.129:8000/editProduct",{product},{"headers":{
        'Content-Type':'application/json'
      }}).then((response)=>{
        Alert.alert("Success","Product edited successfully");
        setName("");
        setQuantity(0);
        setPrice(0);
        setDiscount(0);
        setCategory("Vegetable");
        setLocality("");
        setImageUrl("");
        setPublicId("");
        setTimeout(()=>{
            navigation.goBack();
        },500)
      }).catch((error)=>{
        Alert.alert("Error","Failed to edit product");
        console.log("Error",error);
  
      })
    } 
  return (
    <SafeAreaView>
    <ScrollView style={{marginTop:50}}>
    <View style={{height:50,backgroundColor:"#00ff00"}}/>

     <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>
          Edit the Product
        </Text>
        
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Select category
          </Text>

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

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Product Name
          </Text>

          <TextInput
            value={name}
            onChangeText={(text) => {
              if(!hasDigit.test(text)){
                setName(text)
                setErrorMsg(false)
              }
              else
                setErrorMsg(true)
            }}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter product name"
          />
          {errorMsg && <Text style={{ color:"red", fontSize: 12, fontWeight: "bold" }}>
            Product name should not contain numbers
          </Text>}
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Quantity in kgs
          </Text>

          <TextInput
            value={quantity}
            onChangeText={(text) => setQuantity(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter available quantity in kgs Ex: 10"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Price per Kg
          </Text>

          <TextInput
            value={price}
            onChangeText={(text) => setPrice(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter price per 1 Kg"
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Discount
          </Text>

          <TextInput
            value={discount}
            onChangeText={(text) => setDiscount(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter discount from 0 to 100"
          />
        </View>

          <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Locality
          </Text>

          <TextInput
            value={locality}
            onChangeText={(text) => setLocality(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Enter your locality"
          />
        </View>

        
        
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            
                {imageUrl && (
                <Image
                    source={{uri:imageUrl}}
                    style={{width:200,height:200,resizeMode: "contain"}}
                />
                )}
                {file && (
                <Pressable
                onPress={handleUploadPhoto}
                style={{
                  backgroundColor: "#FFC72C",
                  padding: 10,
                  borderRadius: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
                >
                 <Text style={{ fontWeight: "bold" }}>Upload Image</Text>
                </Pressable>
              
            )}
            <Pressable
                onPress={handleChoosePhoto}
                style={{
                  backgroundColor: "#FFC72C",
                  padding: 10,
                  borderRadius: 6,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
                >
                 <Text style={{ fontWeight: "bold" }}>Choose Image</Text>
                </Pressable>
        </View>
        
        <Pressable
        onPress={handleEditProduct}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Edit Product</Text>

        
      </Pressable>
        </View>
        </ScrollView>
        </SafeAreaView>
  )
}

export default EditProductScreen

const styles = StyleSheet.create({})
