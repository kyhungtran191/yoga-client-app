import {View, Text, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: React.ReactNode;
  styles?: StyleProp<ViewStyle>;
  color?: string;
}

const SectionComponent = (props: Props) => {
  const {children, styles, color} = props;
  return (
    <View
      style={[globalStyles.section, {backgroundColor: color && color}, styles]}>
      {children}
    </View>
  );
};

export default SectionComponent;
