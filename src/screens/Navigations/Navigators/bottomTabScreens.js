import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Home from '../../pages/LaviStore/home';
import Cart from '../../pages/LaviStore/cart';

const Tab = createMaterialBottomTabNavigator();

const BottomTabsScreen=()=> {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="pink"
        inactiveColor="pink"
        barStyle={{ backgroundColor: '#fff' }}
        screenOptions={({ route }) => ({
          //   let iconName;

          //   if (route.name === 'Home') {
          //     iconName = 'Home'
          //     return iconName;
          //   } else if (route.name === 'Cart') {
          //     const iconNameCart = 'Cart'
          //     return iconNameCart;
          //     ;
          //   } 

          //   // return <Ionicons name={iconName} size={24} color={color} />;
          // },
          tabBarActiveTintColor: 'pink',
          tabBarInactiveTintColor: 'pink',
        })}
    >
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
};
export default BottomTabsScreen;