import {ArrowLeft2} from 'iconsax-react-native';
import React, {ReactNode} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {colors} from '../constants/colors';
import {fontFamilies} from '../constants/fontFamilies';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import {useNavigation} from '@react-navigation/native';

interface Props {
  title?: string;
  back?: boolean;
  right?: ReactNode;
  children: ReactNode;
  isScroll?: boolean;
}

const Container = (props: Props) => {
  const {title, back, right, children, isScroll = true} = props;

  const navigation: any = useNavigation();

  return (
    <View
      style={[
        globalStyles.container,
        {flex: 1, backgroundColor: colors.bgColor},
      ]}>
      {/* Header container */}
      <RowComponent
        stylesCustom={{
          paddingHorizontal: 0,
          paddingBottom: 16,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 40,
        }}>
        {back && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={'white'} />
          </TouchableOpacity>
        )}
        <View style={{flex: 1, zIndex: -1}}>
          {title && (
            <TextComponent
              flex={0}
              font={fontFamilies.bold}
              size={16}
              text={title}
              color='white'
              styles={{textAlign: 'center', marginLeft: back ? -24 : 0}}
            />
          )}
        </View>
      </RowComponent>
      <View style={{flex: 1}}>{children}</View>
    </View>
  );
};

export default Container;
