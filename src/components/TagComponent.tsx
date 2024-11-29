import {ViewStyle, StyleProp, TextStyle, TouchableOpacity} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  color?: string;
  tagStyles?: StyleProp<ViewStyle>;
  textStyles?: StyleProp<TextStyle>;
  onPress?: () => void;
}
const TagComponent = (props: Props) => {
  const {text, color, onPress, tagStyles, textStyles} = props;
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[
        globalStyles.tag,
        tagStyles,
        {backgroundColor: color ?? colors.blue},
      ]}>
      <TextComponent text={text} styles={[textStyles]}></TextComponent>
    </TouchableOpacity>
  );
};

export default TagComponent;
