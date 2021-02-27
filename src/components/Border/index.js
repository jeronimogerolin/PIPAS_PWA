import React from 'react';
import { View } from 'react-native';
import {
  ContainerBlue,
  ContainerOrange,
  ContainerYellow,
  ContainerRed,
  ContainerGreen,
} from './styles';

export default function Border() {
  return (
    <View style={{ flexDirection: 'row' }}>
      <ContainerOrange />
      <ContainerBlue />
      <ContainerYellow />
      <ContainerRed />
      <ContainerGreen />
    </View>
  );
}
