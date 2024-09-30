// App.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { AllProductApi } from '../../../API/apis';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productList = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onProductHandle = (item) => {
    navigation.navigate('Product Details', { productId: item.id });
  };

  useEffect(() => {
    setLoading(false);
    dispatch(AllProductApi({ setLoading, setError }));
  }, []);

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

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => onProductHandle(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={styles.priceDiscountContainer}>
              <Text style={styles.label}>Price:</Text>
              <Text style={styles.price}>{item.price} ₹</Text>
              <Text style={styles.label}>Discount:</Text>
              <Text style={styles.discount}>{item.discount} %</Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.categoryContainer}>
              <Text style={styles.label}>Category:</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  errorText: {
    color: 'red',
  },
  item: {
    height:140,
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: '#F3D4D5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginVertical:8
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F3D4D5',
    marginBottom: 4,
  },
  priceDiscountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  price: {
    fontSize: 12,
    fontWeight: '400',
    color: '#333',
  },
  discount: {
    fontSize: 12,
    fontWeight: '400',
    color: '#333',
  },
  divider: {
    backgroundColor: '#F3D4D5',
    height: 1,
    marginVertical: 4,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 4,
  },
  category: {
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: '400',
    color: '#555',
  },
  description: {
    flexWrap: 'wrap',
    fontSize: 12,
    color: '#666',
  },
});

export default ProductList;
