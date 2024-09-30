import React from 'react';
import { StyleSheet, View, Text, StatusBar, TouchableOpacity, Pressable } from 'react-native';
import ProductList from './APIs/products';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const Home=()=>{ 
  const navigation = useNavigation();
  const cartList = useSelector((state)=>state.cart.carts);
  console.log(cartList, 152)
  const OnCartHandle=()=>{
     navigation.navigate('Cart')
  }

    return (
        <View style={localStyles.container}>
          <StatusBar backgroundColor={"#fff"}/>
            <Pressable style={localStyles.cartButton} onPress={OnCartHandle}>
              <Text style={localStyles.cartBtntxt}>Go To Cart </Text>
            </Pressable>
            <View style={{padding:0}}>
            <ProductList/>
            </View>
        </View>
    )
};
const localStyles= StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    height:'100%',
    backgroundColor:'#fff'
  },
  cartButton:{
    width:'100%',
    height:50,
    backgroundColor:'pink',
    borderColor:'pink',
    borderRadius:12,
  },
  cartBtntxt:{
    textAlign:'center',
    alignSelf:'center',
    textTransform:'capitalize',
    fontSize:18,
    fontWeight:'500',
    color:'white',
    padding:12
  },
});
export default Home;
