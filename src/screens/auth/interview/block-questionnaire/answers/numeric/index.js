/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { TextInput, Text, View } from 'react-native';
import { theme } from '../../../../../../config/theme';

export function NumericAnswer({ question, answer, onChangeValue, value }) {
  const [inputValue, setInputValue] = useState();
  const [isValid, setIsValid] = useState(true);

  const validateValue = () => {
    const currentValue = inputValue || value;

    if (currentValue && answer.hasOwnProperty('validation')) {
      if (currentValue <= answer.validation.numericLimit) {
        setIsValid(true);
        onChangeValue(question, { ...answer, value: currentValue, isValid: true });
      } else {
        setIsValid(false);
        onChangeValue(question, { ...answer, value: currentValue, isValid: false });
      }
    } else {
      onChangeValue(question, { ...answer, value: currentValue, isValid: true });
    }
  };

  useEffect(() => {
    if (value) {
      setInputValue(value);

      if (answer.hasOwnProperty('validation')) {
        validateValue();
      }
    }
  }, []);

  useEffect(() => {
    validateValue();
  }, [inputValue]);

  return (
    <View style={{ flexDirection: 'column', flex: 1, backgroundColor: !isValid ? theme.colors.invalid : null }}>
      <TextInput
        placeholder={answer.description}
        keyboardType="numeric"
        onBlur={validateValue}
        onChangeText={(txt) => setInputValue(txt)}
        value={inputValue}
      />

      {!isValid && <Text
        style={{ color: theme.colors.red, marginBottom: theme.metrics.smallSpacing }}
      >
        Valor informado superior ao valor máximo: {answer?.validation?.numericLimit}.
      </Text>}
    </View>
  );
}
