import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import CartScreen from '../Screens/Cart/CartScreen';

const Stack = createStackNavigator();
if (!__DEV__) {
  console.log = () => null;
}
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="tabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="tabs" component={TabNavigator} />
      <Stack.Screen name="cart" component={CartScreen} />
    </Stack.Navigator>
  );
};
export default HomeStack;
