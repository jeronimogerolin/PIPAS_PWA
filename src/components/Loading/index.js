import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { theme } from '../../config/theme';

export default function Loading(props) {
  const { size, color, marginLeft } = props;
  return (
    <View style={{ justifyContent: 'center', marginLeft: 0 || marginLeft }}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || theme.colors.white}
        animating
      />
    </View>
  );
}
