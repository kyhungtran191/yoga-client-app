import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {ReactNode} from 'react';
import {colors} from '../constants/colors';
import TextComponent from './TextComponent';

interface Props {
  isLoading?: boolean;
  icon?: ReactNode;
  onPress: () => void;
  title: string;
  styles?: StyleProp<ViewStyle>;
}

const ButtonComponent = (props: Props) => {
  const {styles, title, onPress, isLoading} = props;
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: colors.blue,
          borderRadius: 12,
          padding: 16,
        },
        styles,
      ]}
      onPress={onPress}
      disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <TextComponent
          text={title}
          flex={0}
          size={16}
          styles={{textTransform: 'capitalize', textAlign: 'center'}}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;
