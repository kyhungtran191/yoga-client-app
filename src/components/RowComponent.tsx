import {View, Text, TouchableOpacity, ViewStyle, StyleProp} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  children: ReactNode;
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
  onPress?: () => void;
  stylesCustom?: StyleProp<ViewStyle>;
}

const RowComponents = (props: Props) => {
  const {children, justify, onPress, stylesCustom} = props;

  const localStyles = [
    globalStyles.row,
    {justifyContent: justify ? justify : 'center'},
    stylesCustom,
  ];

  return onPress ? (
    <TouchableOpacity onPress={onPress} style={localStyles}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={localStyles}>{children}</View>
  );
};

export default RowComponents;
