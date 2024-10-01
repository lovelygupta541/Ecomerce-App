import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Rating } from 'react-native-ratings';
import { SingleProductApi } from '../../../API/apis';
import { useNavigation } from '@react-navigation/native';
import { addCartItem, selectedCartItems } from '../../../Redux_Toolkit/slice/cartsSlice';

const ProductDetails = ({ route }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { productId } = route.params || {};

  const productDetails = useSelector((state) => state.product.singleProduct);
  const navigation = useNavigation();
  const cartItems = useSelector(selectedCartItems);

  if (!productId) {
    return (
      <Text style={styles.notFoundText}>
        Product not found
      </Text>
    );
  }

  // Add TO CART BUTTON
  const addToCart = (item) => {
    dispatch(addCartItem(item));
    navigation.navigate('Add Cart');
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        await dispatch(SingleProductApi({ productId, setLoading, setError }));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [dispatch, productId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="pink" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message || 'Something went wrong'}</Text>
      </View>
    );
  }

  // Check if productDetails is null
  if (!productDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text>Product details not available.</Text>
      </View>
    );
  }

  const {
    title,
    price,
    discountPercentage,
    rating,
    availabilityStatus,
    description,
    brand,
    warrantyInformation,
    shippingInformation,
    reviews,
  } = productDetails;

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>{title}</Text>
        <Text style={styles.price}>
          ${price.toFixed(2)}
          <Text style={styles.discount}> ({discountPercentage}% off)</Text>
        </Text>
        <Rating
          type="star"
          startingValue={rating}
          readonly
          imageSize={20}
          style={styles.rating}
        />
        <Text style={styles.stockStatus}>{availabilityStatus}</Text>
        <Text style={styles.description}>{description}</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoheading}>Brand:</Text>
          <Text style={styles.infoText}>{brand}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoheading}>Warranty:</Text>
          <Text style={styles.infoText}>{warrantyInformation}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoheading}>Shipping:</Text>
          <Text style={styles.infoText}>{shippingInformation}</Text>
        </View>

        <Text style={styles.reviewsheading}>Reviews:</Text>
        <FlatList
          data={reviews}
          renderItem={({ item }) => (
            <View style={styles.reviewContainer}>
              <Rating
                type="star"
                startingValue={item.rating}
                readonly
                imageSize={15}
                style={styles.reviewRating}
              />
              <Text style={styles.reviewComment}>{item.comment}</Text>
              <Text style={styles.reviewerName}>- {item.reviewerName}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <Pressable style={styles.buyBtn} onPress={() => addToCart(productDetails)}>
          <Text style={styles.buyBtnText}>Add To Cart</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  notFoundText: {
    flex: 1,
    justifyContent: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
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
  rating: {
    marginVertical: 8,
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
  reviewsheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  reviewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
  },
  reviewRating: {
    marginVertical: 4,
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
  },
  reviewerName: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#999',
  },
  buyBtn: {
    backgroundColor: 'pink',
    width: "100%",
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

export default ProductDetails;
