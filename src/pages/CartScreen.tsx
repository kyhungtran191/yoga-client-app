import {View, Text, FlatList, Alert} from 'react-native';
import React from 'react';
import Container from '../components/Container';
import TextComponent from '../components/TextComponent';
import {useCart} from '../context/cart.context';
import CardComponent from '../components/CardComponent';
import RowComponents from '../components/RowComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import SpaceComponent from '../components/SpaceComponent';
import ButtonComponent from '../components/ButtonComponent';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';
const CartScreen = () => {
  const {cartItems, removeFromCart, clearCart} = useCart();

  const handleCheckout = async () => {
    const currentUser = auth().currentUser;
    const customerId = currentUser?.uid;
    try {
      const bookingDate = new Date().toISOString();
      const bookingStatus = 'Success';

      for (let item of cartItems) {
        database().ref('bookings').push({
          customerId: customerId,
          classInstanceId: item.id,
          bookingDate: bookingDate,
          bookingStatus: bookingStatus,
        });
      }
      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Successfully!',
        textBody: 'Add new Booking successfully!',
      });
      clearCart();
    } catch (error) {
      console.log('Error when Booking', error);
    }
  };

  return (
    <FlatList
      data={cartItems}
      style={{
        height: '100%',
        backgroundColor: colors.bgColor,
      }}
      keyExtractor={item => `${item.courseTitle}-${item.date}`}
      ListHeaderComponent={
        <Container back title="Cart">
          <TextComponent text="" color="white" />
        </Container>
      }
      renderItem={({item}) => (
        <CardComponent styles={{backgroundColor: '#62bd62', marginBottom: 20}}>
          <RowComponents>
            <View style={{flex: 1, paddingVertical: 10}}>
              <RowComponents justify="space-between">
                <TitleComponent
                  text={item.courseTitle}
                  styles={{fontSize: 24}}
                  height={30}></TitleComponent>
                <TextComponent
                  text={`${item.price}$`}
                  color={colors.white}
                  styles={{fontSize: 30, marginLeft: 40}}
                  font={fontFamilies.bold}></TextComponent>
              </RowComponents>
              <RowComponents justify="space-between">
                <TextComponent
                  text={`Type: ${item.type}`}
                  color={colors.white}
                  font={fontFamilies.bold}></TextComponent>
                <TextComponent
                  text={`${item.dayOfWeek}`}
                  color={colors.white}
                  font={fontFamilies.bold}></TextComponent>
              </RowComponents>
              <SpaceComponent height={12}></SpaceComponent>
              <RowComponents justify="space-between">
                <TextComponent
                  text={`Teacher: ${item.teacher}`}
                  color={colors.white}
                  font={fontFamilies.bold}></TextComponent>
                <TextComponent
                  text={`Date: ${item.date}`}
                  color={colors.white}
                  font={fontFamilies.bold}></TextComponent>
              </RowComponents>
              <SpaceComponent height={12}></SpaceComponent>
              <RowComponents justify="space-between">
                <TextComponent
                  text={`Capacity: ${item.capacity}`}
                  color={colors.white}
                  font={fontFamilies.bold}></TextComponent>
                <TextComponent
                  text={`Duration: ${item.duration} mins`}
                  color={colors.white}
                  font={fontFamilies.bold}></TextComponent>
              </RowComponents>
              <SpaceComponent height={12}></SpaceComponent>
              <TextComponent
                text={`Start at: ${item.startTime}`}
                color={colors.white}
                font={fontFamilies.bold}></TextComponent>
              <SpaceComponent height={12}></SpaceComponent>
              <RowComponents justify="flex-start">
                <ButtonComponent
                  title="Remove from Cart"
                  onPress={() => {
                    removeFromCart(item.id);
                  }}
                  styles={{width: '100%'}}></ButtonComponent>
              </RowComponents>
            </View>
          </RowComponents>
        </CardComponent>
      )}
      ListEmptyComponent={
        <TextComponent
          text="No cart items found."
          styles={{textAlign: 'center'}}
          color={colors.white}
        />
      }
      ListFooterComponent={
        <>
          <SpaceComponent height={10} />
          {cartItems.length > 0 && (
            <ButtonComponent title="Checkout" onPress={handleCheckout} />
          )}
        </>
      }
    />
  );
};

export default CartScreen;
