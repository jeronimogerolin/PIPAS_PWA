import React, { useState, useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import { Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../../../../config/theme';

export function CheckBoxAnswer({ question, answer, onChangeValue, value }) {
  const [isChecked, setChecked] = useState(false);

  const handleCheck = () => {
    onChangeValue(question, {
      ...answer,
      value: answer.id,
      isChecked: !isChecked,
      isValid: true,
    });

    setChecked(!isChecked);
  };

  useEffect(() => {
    if (value && value[answer.id]) {
      setChecked(value[answer.id]);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', alignItems: 'center' }}
      onPress={handleCheck}
    >
      <Checkbox.Item
        status={isChecked ? 'checked' : 'unchecked'}
        key={answer.id}
        color={theme.colors.primary}
        theme={{ colors: { primary: theme.colors.black } }}
        onPress={handleCheck}
      />

      <Text>{answer.description}</Text>
    </TouchableOpacity>
  );
}
