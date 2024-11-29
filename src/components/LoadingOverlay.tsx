import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import { colors } from '../constants/colors';

const LoadingOverlay = ({isLoading}: {isLoading: boolean}) => {
  return (
    isLoading && (
      <View style={{...StyleSheet.absoluteFillObject, zIndex: 10}}>
        {/* Lớp phủ mờ */}
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType="light" // hoặc "dark" tuỳ vào kiểu mờ bạn muốn
          blurAmount={10} // Độ mạnh của hiệu ứng mờ
        />
        {/* Activity Indicator */}
        <ActivityIndicator
          style={{flex: 1}}
          size="large"
          color={colors.bgColor}
        />
      </View>
    )
  );
};

export default LoadingOverlay;
