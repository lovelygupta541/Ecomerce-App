import React from 'react';
import { Text, StyleSheet, View, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementItem,
  incrementItem,
  selectedCartItems,
} from '../../../../Redux_Toolkit/slice/cartsSlice';

const AddToCart = () => {
  const productDetails = useSelector(state => state.product.singleProduct);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectedCartItems);

  const onBuyHandle = () => {
    Alert.alert('Payment!', "Are you sure to make the payment for this selected item?");
  };

  const currentProduct = cartItems.find(item => item.id === productDetails?.id);
  const currentQuantity = currentProduct ? currentProduct.quantity : 0;

  if (!productDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{productDetails.title}</Text>
      <Text style={styles.price}>
        ${productDetails.price.toFixed(2)}
        <Text style={styles.discount}>
          ({productDetails.discountPercentage}% off)
        </Text>
      </Text>
      <Text style={styles.stockStatus}>{productDetails.availabilityStatus}</Text>
      <Text style={styles.description}>{productDetails.description}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoheading}>Brand:</Text>
        <Text style={styles.infoText}>{productDetails.brand}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoheading}>Warranty:</Text>
        <Text style={styles.infoText}>{productDetails.warrantyInformation}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoheading}>Shipping:</Text>
        <Text style={styles.infoText}>{productDetails.shippingInformation}</Text>
      </View>

      <View style={styles.cartItem}>
        <Pressable
          style={styles.button}
          onPress={() => dispatch(decrementItem(productDetails.id))}
          disabled={currentQuantity === 0}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Text style={styles.quantityText}>{currentQuantity}</Text>
        <Pressable
          style={styles.button}
          onPress={() => dispatch(incrementItem(productDetails.id))}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Pressable style={styles.buyBtn} onPress={onBuyHandle}>
        <Text style={styles.buyBtnText}>Buy Now</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#e91e63',
    marginBottom: 4,
  },
  discount: {
    fontSize: 16,
    color: '#999',
  },
  stockStatus: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoheading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'pink',
    marginBottom: 5,
  },
  button: {
    backgroundColor: 'white',
    width: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'orange',
    fontSize: 22,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: 'pink',
  },
  buyBtn: {
    backgroundColor: 'pink',
    width: '100%',
    height: 50,
    borderRadius: 12,
    borderColor: 'pink',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default AddToCart;
