import { StyleSheet, Text, View,Pressable, Image } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({item}) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 30000);
  };
  const cart = useSelector((state) => state.cart.cart);
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item.name}
      </Text>
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        Available in {item.locality}
      </Text>

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item.discount}% off
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item.price} per kg</Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
       
       {addedToCart ? (
          <View>
            <Text>Added to Cart</Text>
          </View>
        ) : (
          <Text>Add to Cart</Text>
        )}
        
      </Pressable>
    </Pressable>
  )
}

export default ProductItem

const styles = StyleSheet.create({})