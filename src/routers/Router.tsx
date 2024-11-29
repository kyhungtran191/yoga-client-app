import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../pages/home/HomeScreen';
import auth from '@react-native-firebase/auth';
import LoginScreen from '../pages/auth/LoginScreen';
import RegisterScreen from '../pages/auth/RegisterScreen';
import CartScreen from '../pages/CartScreen';
import BookedScreen from '../pages/BookedScren';

const Router = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  const Stack = createNativeStackNavigator();

  const MainRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="Cart" component={CartScreen}></Stack.Screen>
      <Stack.Screen name="BookedScreen" component={BookedScreen}></Stack.Screen>

      {/* <Stack.Screen name="AddNewTask" component={AddNewTask}></Stack.Screen>
      <Stack.Screen name="TaskDetail" component={TaskDetail}></Stack.Screen> */}
    </Stack.Navigator>
  );

  const AuthRouter = (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}></Stack.Screen>
    </Stack.Navigator>
  );

  return isLogin ? MainRouter : AuthRouter;
};

export default Router;
