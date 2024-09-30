import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './Navigators/rootNavigation';
import StoreNaviation from './Navigators/storeNavigation';

const NavigationScreens=()=> {
  return(
    <NavigationContainer ref={navigationRef}>
            <StoreNaviation/>
    </NavigationContainer>
  )
};
 export default NavigationScreens;