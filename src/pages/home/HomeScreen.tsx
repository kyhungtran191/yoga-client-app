import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {Element4, Logout, ShoppingCart} from 'iconsax-react-native';
import Container from '../../components/Container';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import SpaceComponent from '../../components/SpaceComponent';
import TextComponent from '../../components/TextComponent';
import TitleComponent from '../../components/TitleComponent';
import {colors} from '../../constants/colors';
import {fontFamilies} from '../../constants/fontFamilies';
import database from '@react-native-firebase/database';
import InputComponent from '../../components/InputComponent';
import ButtonComponent from '../../components/ButtonComponent';
import CardComponent from '../../components/CardComponent';
import {useCart} from '../../context/cart.context';
import {ALERT_TYPE, Toast} from 'react-native-alert-notification';

import auth from '@react-native-firebase/auth';

// Type definition for Class
export type TClass = {
  courseTitle: string;
  price: number;
  type: string;
  capacity: number;
  description: string;
  dayOfWeek: string;
  duration: number;
  courseId: string;
  date: string;
  teacher: string;
  startTime: string;
  id: string;
};

const HomeScreen = ({navigation}: any) => {
  const [classes, setClasses] = useState<TClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<TClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<string>('');
  const {cartItems, addToCart, clearCart} = useCart();

  const handleLogout = async () => {
    auth()
      .signOut()
      .then(() => {
        clearCart();
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: 'Success',
          textBody: 'Logout successfully!',
        });
      });
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const classesRef = database().ref('/classes');
      const snapshot = await classesRef.once('value');
      const classesData = snapshot.val();

      if (!classesData) {
        setClasses([]);
        setFilteredClasses([]);
        return;
      }

      const classesWithCourses = await Promise.all(
        Object.keys(classesData).map(async key => {
          const classData = classesData[key];
          const courseID = classData.courseId;

          if (!courseID) return null;

          const courseRef = database().ref(`/courses/${courseID}`);
          const courseSnapshot = await courseRef.once('value');
          const courseData = courseSnapshot.val();

          if (!courseData) return null;

          return {
            courseTitle: courseData.name,
            price: courseData.price,
            type: courseData.type,
            capacity: courseData.capacity,
            description: courseData.description,
            dayOfWeek: courseData.dayOfWeek,
            duration: courseData.duration,
            courseId: courseData.id,
            date: classData.date,
            id: classData.id,
            teacher: classData.teacherName,
            startTime: courseData.startTime,
          };
        }),
      );

      const filteredClasses = classesWithCourses.filter(Boolean);
      setClasses(filteredClasses as any);
      setFilteredClasses(filteredClasses as any);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleFilterInput = () => {
      if (!query.trim()) {
        setFilteredClasses(classes);
        return;
      }

      const lowerQuery = query.toLowerCase();
      const filtered = classes.filter(
        item =>
          item.dayOfWeek.toLowerCase().includes(lowerQuery) ||
          item.startTime.toLowerCase().includes(lowerQuery),
      );

      setFilteredClasses(filtered);
    };

    const debounceFilter = setTimeout(handleFilterInput, 100);
    return () => clearTimeout(debounceFilter);
  }, [query, classes]);

  return (
    <View style={{flex: 1}}>
      <Container>
        <FlatList
          data={filteredClasses}
          keyExtractor={item => `${item?.courseTitle}-${item?.date}`}
          ListHeaderComponent={
            <>
              {/* Header */}
              <SectionComponent>
                <RowComponent justify="space-between">
                  <TouchableOpacity
                    style={{position: 'relative'}}
                    onPress={() => navigation.navigate('BookedScreen')}>
                    <Element4 size={24} color={colors.white}></Element4>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{position: 'relative'}}
                    onPress={() => navigation.navigate('Cart')}>
                    <ShoppingCart
                      size={24}
                      color="white"
                      style={{
                        position: 'relative',
                        borderRadius: 4,
                      }}
                    />

                    {cartItems && (
                      <View
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 14,
                          height: 14,
                          display: 'flex',
                          backgroundColor: 'red',
                          borderRadius: 9,
                          zIndex: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <TextComponent
                          styles={{
                            color: 'white',
                            fontSize: 8,
                            fontWeight: 'bold',
                          }}
                          text={cartItems?.length?.toString() || '0'}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleLogout}>
                    <Logout
                      size={20}
                      color={colors.white}
                      rotation={-180}></Logout>
                  </TouchableOpacity>
                </RowComponent>
              </SectionComponent>

              {/* Title */}
              <SectionComponent>
                <RowComponent
                  justify="space-between"
                  stylesCustom={{alignItems: 'flex-start'}}>
                  <TitleComponent
                    text="Be Productive Today !"
                    size={30}></TitleComponent>
                </RowComponent>
              </SectionComponent>

              {/* Search Input */}
              <SectionComponent>
                <InputComponent
                  color="#696b6f"
                  placeholder="Search by day or time eg: Tuesday or 10.AM"
                  onChange={setQuery}
                  value={query}></InputComponent>
              </SectionComponent>
            </>
          }
          renderItem={({item}) => (
            <CardComponent
              styles={{backgroundColor: '#62bd62', marginBottom: 20}}>
              <RowComponent>
                <View style={{flex: 1, paddingVertical: 10}}>
                  <RowComponent justify="space-between">
                    <TitleComponent
                      text={item?.courseTitle}
                      styles={{fontSize: 24}}
                      height={30}></TitleComponent>
                    <TextComponent
                      text={`${item?.price}$`}
                      color={colors.white}
                      styles={{fontSize: 30, marginLeft: 40}}
                      font={fontFamilies.bold}></TextComponent>
                  </RowComponent>
                  <RowComponent justify="space-between">
                    <TextComponent
                      text={`Type: ${item?.type}`}
                      color={colors.white}
                      font={fontFamilies.bold}></TextComponent>
                    <TextComponent
                      text={`${item?.dayOfWeek}`}
                      color={colors.white}
                      font={fontFamilies.bold}></TextComponent>
                  </RowComponent>
                  <SpaceComponent height={12}></SpaceComponent>
                  <RowComponent justify="space-between">
                    <TextComponent
                      text={`Teacher: ${item.teacher}`}
                      color={colors.white}
                      font={fontFamilies.bold}></TextComponent>
                    <TextComponent
                      text={`Date: ${item.date}`}
                      color={colors.white}
                      font={fontFamilies.bold}></TextComponent>
                  </RowComponent>
                  <SpaceComponent height={12}></SpaceComponent>
                  <RowComponent justify="space-between">
                    <TextComponent
                      text={`Capacity: ${item.capacity}`}
                      color={colors.white}
                      font={fontFamilies.bold}></TextComponent>
                    <TextComponent
                      text={`Duration: ${item.duration} mins`}
                      color={colors.white}
                      font={fontFamilies.bold}></TextComponent>
                  </RowComponent>
                  <SpaceComponent height={12}></SpaceComponent>
                  <TextComponent
                    text={`Start at: ${item.startTime}`}
                    color={colors.white}
                    font={fontFamilies.bold}></TextComponent>
                  <SpaceComponent height={12}></SpaceComponent>
                  <RowComponent justify="flex-start">
                    <ButtonComponent
                      title="Add to Cart"
                      onPress={() => {
                        addToCart(item);
                        navigation.navigate('Cart');
                      }}
                      styles={{width: '100%'}}></ButtonComponent>
                  </RowComponent>
                </View>
              </RowComponent>
            </CardComponent>
          )}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator></ActivityIndicator>
            ) : (
              <TextComponent text="No classes found." color={colors.white} />
            )
          }
          ListFooterComponent={<SpaceComponent height={10} />}
        />
      </Container>
    </View>
  );
};

export default HomeScreen;
