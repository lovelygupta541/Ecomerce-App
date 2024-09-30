import React from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import CartList from './APIs/carts/cartList';

const Cart=()=>{
    return (
        <View style={localStyles.container}>
            <View>
            <Text style={localStyles.heading}>Carts</Text>
            <CartList/>
            </View>
        </View>
    )
};
const localStyles= StyleSheet.create({
  container:{
    height:'100%',
    backgroundColor:'#fff',
    padding:15
  },
  heading:{
    fontSize:22,
    fontWeight:'500',
    letterSpacing:0.2,
    textAlign:'center',
    padding:15,
    color:'pink'
  },
  addBtn:{
    justifyContent:'center',
    alignItems:'center',
    height:50,
    width:'100%',
    backgroundColor:'pink',
    borderWidth:1,
    borderColor:'pink',
    borderRadius:6,
  },
  addBtnText:{
    justifyContent:'center',
    color:'#fff',
    fontSize:16,
    fontWeight:'500',
    alignItems:'center',
    alignSelf:'center'
  }
});
export default Cart;
