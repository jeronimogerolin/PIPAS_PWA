import React from 'react';

import { ContainerHeader, Text } from './styles';

export default function SpecialText({ styleTitle, text, action }) {
  return (
    <ContainerHeader>
      <Text style={styleTitle} onPress={action}>
        {text}
      </Text>
    </ContainerHeader>
  );
}
