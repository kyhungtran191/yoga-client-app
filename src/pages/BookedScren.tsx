import React from 'react';
import Container from '../components/Container';
import TextComponent from '../components/TextComponent';

const BookedScreen = () => {
  //   const {userCourses} = useAuth();
  //   if (!userCourses || userCourses.length === 0) {
  return (
    <Container back title="Booked Class">
      <TextComponent text="No booked classes found." color="white" />
    </Container>
  );
  //   }
  //   return (
  //     <FlatList
  //       data={userCourses}
  //       style={{
  //         height: '100%',
  //         backgroundColor: colors.bgColor,
  //         padding: 20,
  //       }}
  //       keyExtractor={item => `${item.classInstanceId}-${item.bookingDate}`}
  //       ListHeaderComponent={
  //         <Container back title="Booked Class">
  //           <TextComponent text="" color="white" />
  //         </Container>
  //       }
  //       renderItem={({item}) => (
  //         <CardComponent
  //           styles={{
  //             backgroundColor: '#62bd62',
  //             marginBottom: 20,
  //             paddingHorizontal: 20,
  //           }}>
  //           <RowComponents>
  //             <View style={{flex: 1, paddingVertical: 10}}>
  //               <RowComponents justify="space-between">
  //                 <TitleComponent
  //                   text={item.courseDetails.name}
  //                   styles={{fontSize: 24}}
  //                   height={30}></TitleComponent>
  //                 <TextComponent
  //                   text={`${item.courseDetails.price}$`}
  //                   color={colors.white}
  //                   styles={{fontSize: 30, marginLeft: 40}}
  //                   font={fontFamilies.bold}></TextComponent>
  //               </RowComponents>
  //               <RowComponents justify="space-between">
  //                 <TextComponent
  //                   text={`Type: ${item.courseDetails.type}`}
  //                   color={colors.white}
  //                   font={fontFamilies.bold}></TextComponent>
  //                 <TextComponent
  //                   text={`${item.courseDetails.dayOfWeek}`}
  //                   color={colors.white}
  //                   font={fontFamilies.bold}></TextComponent>
  //               </RowComponents>
  //               <SpaceComponent height={12}></SpaceComponent>
  //               <RowComponents justify="space-between">
  //                 <TextComponent
  //                   text={`Teacher: ${item.classDetails.teacherName}`}
  //                   color={colors.white}
  //                   font={fontFamilies.bold}></TextComponent>
  //                 <TextComponent
  //                   text={`Date: ${item.classDetails.date}`}
  //                   color={colors.white}
  //                   font={fontFamilies.bold}></TextComponent>
  //               </RowComponents>
  //               <SpaceComponent height={12}></SpaceComponent>
  //               <RowComponents justify="space-between">
  //                 <TextComponent
  //                   text={`Capacity: ${item.courseDetails.capacity}`}
  //                   color={colors.white}
  //                   font={fontFamilies.bold}></TextComponent>
  //                 <TextComponent
  //                   text={`Duration: ${item.courseDetails.duration} mins`}
  //                   color={colors.white}
  //                   font={fontFamilies.bold}></TextComponent>
  //               </RowComponents>
  //               <SpaceComponent height={12}></SpaceComponent>
  //               <TextComponent
  //                 text={`Start at: ${item.courseDetails.startTime}`}
  //                 color={colors.white}
  //                 font={fontFamilies.bold}></TextComponent>
  //               <SpaceComponent height={12}></SpaceComponent>
  //             </View>
  //           </RowComponents>
  //         </CardComponent>
  //       )}
  //       ListEmptyComponent={
  //         <TextComponent
  //           text="No cart items found."
  //           styles={{textAlign: 'center'}}
  //           color={colors.white}
  //         />
  //       }
  //       ListFooterComponent={
  //         <>
  //           <SpaceComponent height={10} />
  //         </>
  //       }
  //     />
  //   );
};

export default BookedScreen;
