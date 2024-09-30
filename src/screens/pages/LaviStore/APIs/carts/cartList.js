import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { Divider } from 'react-native-paper';
import { AllCartApi } from '../../../../API/apis';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const CartList=()=> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cartList = useSelector((state)=>state.cart.carts);
  console.log(cartList, 10);
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F3D4D5" style={{height: 135}}/>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error.message}</Text>
      </View>
    );
  }

  const onCartHandle = (item) => {
    navigation.navigate('Cart Details', { cartId: item.id });
  };

  useEffect(()=>{
    setLoading(false);
    dispatch(AllCartApi({setLoading, setError}));
   },[]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cart Details</Text>
      <FlatList
      data={cartList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.cartItem}>
          <View style={styles.cartHeader}>
          <Text style={styles.cartTitle}>Cart ID: {item.id}</Text>
          <Pressable style={styles.cartBtn} onPress={() => onCartHandle(item)}>
            <Text style={styles.cartBtntext}>View</Text>
          </Pressable>
          </View>
          <Text style={styles.cartDetails}>Total Products: {item.totalProducts}</Text>
          <Text style={styles.cartDetails}>Total Quantity: {item.totalQuantity}</Text>
          <Text style={styles.cartDetails}>Total: <Text style={styles.amount}>${item.total.toFixed(2)}</Text></Text>
          <Text style={styles.cartDetails}>Discounted Total: <Text style={styles.amount}>${item.discountedTotal.toFixed(2)}</Text></Text>

          <FlatList
            data={item.products}
            keyExtractor={product => product.id.toString()}
            renderItem={({ item: product }) => (
              <View style={styles.productItem}>
                <View style={styles.productInfo}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  <Text>Price: <Text style={styles.amount}>${product.price.toFixed(2)}</Text></Text>
                  <Text>Quantity: {product.quantity}</Text>
                  <Text>Total: <Text style={styles.amount}>${product.total.toFixed(2)}</Text></Text>
                  <Text>Discount: {product.discountPercentage}%</Text>
                </View>
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
      contentContainerStyle={styles.container}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  heading:{
    textAlign:'left',
    fontSize:18,
    fontWeight:'500',
    letterSpacing:0.5,
    color:'pink',
    margin:10
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  cartHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'pink',
  },
  cartBtn:{
    height:40,
    width:100,
    backgroundColor:'pink',
    borderColor:'pink',
    borderRadius:10,
  },
  cartBtntext:{
    padding:8,
    textAlign:'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartDetails: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  amount: {
    fontWeight: 'bold',
    color: 'pink',
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor:'pink',
    borderWidth:1,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CartList;
