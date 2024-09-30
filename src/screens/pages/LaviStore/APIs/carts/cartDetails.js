import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import { SingleCartApi } from '../../../../API/apis';

const CartDetails = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {cartId} = route.params || {};
  const cartDetails = useSelector((state) => state.cart.singleCart);
  console.log(cartDetails, 23);
  console.log('Received Cart ID:', cartId);

  if (!cartId) {
    return (
      <Text
        style={{
          flex: 1,
          justifyContent: 'center',
          textTransform: 'uppercase',
          fontSize: 16,
          fontWeight: '600',
          color: '#000',
          textAlign: 'center',
        }}>
        Cart not found
      </Text>
    );
  }

  useEffect(() => {
    setLoading(false);
    dispatch(SingleCartApi({cartId, setLoading, setError}));
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 10,
        }}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const renderProduct = ({ item }) => (
      <View style={styles.cartContainer}>
        <View style={styles.productInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
          <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
          <Text style={styles.total}>Total: ${item.total.toFixed(2)}</Text>
          <Text style={styles.discount}>Discount: {item.discountPercentage}%</Text>
        </View>
      </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cart Summary</Text>
      <Text style={styles.summary}>Total Products: {cartDetails.totalProducts}</Text>
      <Text style={styles.summary}>Total Quantity: {cartDetails.totalQuantity}</Text>
      <Text style={styles.summary}>Discounted Total: ${cartDetails.discountedTotal.toFixed(2)}</Text>
      <FlatList
        data={cartDetails.products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        scrollIndicatorInsets={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'pink',
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  cartContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    elevation: 2,
    borderWidth:1,
    borderColor:'pink',
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'pink',
  },
  price: {
    fontSize: 16,
    color: '#000',
  },
  quantity: {
    fontSize: 14,
    color: '#000',
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#880e4f',
  },
  discount: {
    fontSize: 14,
    color: '#000',
  }, 
});
export default CartDetails;
