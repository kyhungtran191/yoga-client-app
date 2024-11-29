import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import HomeScreen from './src/pages/home/HomeScreen';
import Router from './src/routers/Router';
import {NavigationContainer} from '@react-navigation/native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {CartProvider} from './src/context/cart.context';

const App = () => {
  return (
    <>
      <AlertNotificationRoot>
        <StatusBar
          translucent
          barStyle={'light-content'}
          backgroundColor={'transparent'}></StatusBar>
        <SafeAreaView style={{flex: 1}}>
            <CartProvider>
              <NavigationContainer>
                <Router></Router>
              </NavigationContainer>
            </CartProvider>
        </SafeAreaView>
      </AlertNotificationRoot>
    </>
  );
};

export default App;
