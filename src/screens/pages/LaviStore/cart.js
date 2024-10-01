import React from 'react';
import { StyleSheet, View, Text, Pressable, TextInput } from 'react-native';
import CartList from './APIs/carts/cartList';

const Cart=()=>{
  // const {productId} = route.params || {};
  // console.log('Received Product ID:', productId);
  // if (!productId) {
  //   return (
  //     <Text
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         textTransform: 'uppercase',
  //         fontSize: 16,
  //         fontWeight: '600',
  //         color: '#000',
  //         textAlign: 'center',
  //       }}>
  //       There is no Product Added to Cart
  //     </Text>
  //   );
  // }
    return (
        <View style={localStyles.container}>
            <View>
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
