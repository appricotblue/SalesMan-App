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
import Route from '../Screens/Home/Route';
import AddReturnOrder from '../Screens/Return/AddReturnOrder';
import AddSalesOrder from '../Screens/Home/AddSalesOrder';
import LocationScreen from '../Screens/Shops/LocationScreen';
import OrderFilterScreen from '../Screens/Home/OrderFilterScreen';
import InvoiceScreen from '../Screens/Home/InvoiceScreen';
import Earningdetails from '../Screens/MyEarnings/Earningdetails';
import ItemwiseSales from '../Screens/User/ItemwiseSales';


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
      <Stack.Screen name="Route" component={Route} />
      <Stack.Screen name="AddReturnOrder" component={AddReturnOrder} />
      <Stack.Screen name="AddSalesOrder" component={AddSalesOrder} />
      <Stack.Screen name="LocationScreen" component={LocationScreen} />
      <Stack.Screen name="OrderFilterScreen" component={OrderFilterScreen} />
      <Stack.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <Stack.Screen name="Earningdetails" component={Earningdetails} />
      <Stack.Screen name="ItemwiseSales" component={ItemwiseSales} />
    </Stack.Navigator>
  );
};
export default HomeStack;
