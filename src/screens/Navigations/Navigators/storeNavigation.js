import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabsScreen from './bottomTabScreens';
import ProductList from '../../pages/LaviStore/APIs/products';
import ProductDetails from '../../pages/LaviStore/APIs/productDetails';
import CartList from '../../pages/LaviStore/APIs/carts/cartList';
import CartDetails from '../../pages/LaviStore/APIs/carts/cartDetails';
import AddToCart from '../../pages/LaviStore/APIs/carts/addCarts';


const StoreNaviation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Screens"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Screens"
        component={BottomTabsScreen}
        options={{headerShown: true}}></Stack.Screen>

      {/* PRODUCTS -- Product Redirection */}
      <Stack.Screen
        name="Product List"
        component={ProductList}
        options={{headerShown: true}}></Stack.Screen>
      <Stack.Screen
        name="Product Details"
        component={ProductDetails}
        options={{headerShown: true}}></Stack.Screen>
      {/* CARTS -- Carts Redirection */}
      <Stack.Screen
        name="Cart List"
        component={CartList}
        options={{headerShown: true}}></Stack.Screen>
      <Stack.Screen
        name="Cart Details"
        component={CartDetails}
        options={{headerShown: true}}></Stack.Screen>
      <Stack.Screen
        name="Add Cart"
        component={AddToCart}
        options={{headerShown: true}}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default StoreNaviation;
