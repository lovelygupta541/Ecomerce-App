import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Rating} from 'react-native-ratings';
import { SingleProductApi } from '../../../API/apis';

const ProductDetails = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const {productId} = route.params || {};
  // console.log('Received Product ID:', productId);
  // console.log('Product Details : ', productDetails, 22)
  const productDetails = useSelector((state) => state.product.singleProduct);
  console.log(productDetails, 23)

  if (!productId) {
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
        Product not found
      </Text>
    );
  }

  useEffect(() => {
    setLoading(false);
    dispatch(SingleProductApi({productId, setLoading, setError}));
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

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{productDetails.title}</Text>
      <Text style={styles.price}>
        ${productDetails.price.toFixed(2)}
        <Text style={styles.discount}>
          ({productDetails.discountPercentage}% off)
        </Text>
      </Text>
      <Rating
        type="star"
        startingValue={productDetails.rating}
        readonly
        imageSize={20}
        style={styles.rating}
      />
      <Text style={styles.stockStatus}>
        {productDetails.availabilityStatus}
      </Text>
      <Text style={styles.description}>{productDetails.description}</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoheading}>Brand:</Text>
        <Text style={styles.infoText}>{productDetails.brand}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoheading}>Warranty:</Text>
        <Text style={styles.infoText}>
          {productDetails.warrantyInformation}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoheading}>Shipping:</Text>
        <Text style={styles.infoText}>
          {productDetails.shippingInformation}
        </Text>
      </View>

      <Text style={styles.reviewsheading}>Reviews:</Text>
      <FlatList
        data={productDetails.reviews}
        renderItem={({item}) => (
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
      <Pressable style={styles.buyBtn}>
        <Text style={styles.buyBtnText}>Buy</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
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
    paddingVertical: 10,
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
    marginVertical:20
  },
  buyBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  }
});
export default ProductDetails;
