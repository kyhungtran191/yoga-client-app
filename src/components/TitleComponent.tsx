import {View, Text, TextStyle, Platform} from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import {fontFamilies} from '../constants/fontFamilies';
import {StyleProp} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import {colors} from '../constants/colors';

interface Props {
  text: string;
  font?: string;
  size?: number;
  styles?: StyleProp<TextStyle>;
  color?: string;
  height?: number;
  flex?: number;
  line?: number;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, color, styles, height, flex, line} = props;
  const weight: any =
    Platform.OS === 'ios'
      ? font
        ? {
            fontWeight: font,
          }
        : {fontWeight: fontFamilies.semibold}
      : {};
  return (
    <TextComponent
      line={line}
      size={size ?? 20}
      font={font ?? fontFamilies.semibold}
      styles={[
        globalStyles.text,
        weight,
        {
          fontFamily: font ?? fontFamilies.bold,
          fontSize: size ?? 16,
          lineHeight: height ? height : size ? size + 4 : 20,
          color: color ? color : colors.text,
          flex: flex ?? 0,
          marginBottom: 8,
        },
        styles,
      ]}
      color={color}
      text={text}
    />
  );
};

export default TitleComponent;
