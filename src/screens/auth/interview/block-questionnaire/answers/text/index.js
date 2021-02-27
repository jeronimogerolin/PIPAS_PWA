/* eslint-disable prettier/prettier */
import React from 'react';
import { TextInput } from 'react-native';

export function TextAnswer({ question, answer, onChangeValue, value }) {
  return (
    <>
      <TextInput
        placeholder={answer.description}
        keyboardType="default"
        onChangeText={(txt) => onChangeValue(question, { ...answer, value: txt, isValid: true })}
        maxLength={answer?.validation?.characterLimit}
        value={value}
      />
    </>
  );
}
