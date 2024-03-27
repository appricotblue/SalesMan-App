import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TabNavigator from './TabNavigator';
import CartScreen from '../Screens/Cart/CartScreen';
import MyEarnings from '../Screens/MyEarnings/MyEarnings';
import ShopDetails from '../Screens/ShopDetails/ShopDetails';
import OrderDetails from '../Screens/Home/OrderDetails';
import EditOrder from '../Screens/Home/EditOrder';
import FilterScreen from '../Screens/Filter/FilterScreen';
import AddShop from '../Screens/Shops/AddShop';


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
      <Stack.Screen name="MyEarnings" component={MyEarnings} />
      <Stack.Screen name="shopDetails" component={ShopDetails} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} />
      <Stack.Screen name="EditOrder" component={EditOrder} />
      <Stack.Screen name="filter" component={FilterScreen} />
      <Stack.Screen name="AddShop" component={AddShop} />
    </Stack.Navigator>
  );
};
export default HomeStack;
