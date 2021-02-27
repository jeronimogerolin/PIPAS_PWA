import React from 'react';
import { RadioButton } from 'react-native-paper';
import { Text, View } from 'react-native';
import { theme } from '../../.../../../../../../config/theme';

export function RadioAnswer({ question, answer, value, onChangeValue }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <RadioButton.Group
        onValueChange={() =>
          onChangeValue(question, { ...answer, isValid: true })
        }
        value={value}
      >
        <RadioButton.Android
          key={answer.id}
          color={theme.colors.primary}
          value={answer.id}
        />
      </RadioButton.Group>

      <Text
        style={{
          marginRight: theme.metrics.baseSpacing + 10,
        }}
      >
        {answer.description}
      </Text>
    </View>
  );
}
