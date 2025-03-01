import {
  View,
  Text,
  ImageBackground,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';
interface Props {
  children: ReactNode;
  color?: string;
  styles?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const CardImageComponent = (props: Props) => {
  const {children, color, styles, onPress} = props;
  const MainChildren = (
    <ImageBackground
      source={require('../assets/images/card-bg.png')}
      imageStyle={{borderRadius: 12}}
      style={[globalStyles.card]}>
      <View
        style={[
          {
            backgroundColor: color ?? 'rgba(113, 77, 217, 0.9)',
            borderRadius: 12,
            flex: 1,
            padding: 12,
          },
          styles,
        ]}>
        {children}
      </View>
    </ImageBackground>
  );
  return onPress ? (
    <TouchableOpacity onPress={onPress}>{MainChildren}</TouchableOpacity>
  ) : (
    MainChildren
  );
};

export default CardImageComponent;
