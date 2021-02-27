import React from 'react';
import { View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { useField } from '@unform/core';
import { theme } from '../../../config/theme';
import { TextInputStyled } from './styles';

export default function InputText({
  countInvisible,
  name,
  rawValue,
  onChangeText,
  ...rest
}) {
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState('');

  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);

  const handleOnChange = React.useCallback(
    (text) => {
      setValue(text);
      if (inputRef.current) inputRef.current.value = text;
      if (onChangeText) onChangeText(text);
    },
    [onChangeText]
  );

  React.useEffect(() => {
    if (inputRef.current) handleOnChange(defaultValue);
  }, [defaultValue]);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        setValue('');
        ref.value = '';
        ref.clear();
      },
      setValue(ref, text) {
        handleOnChange(text);
      },
      getValue(ref) {
        return rawValue || ref.value;
      },
    });
  }, [fieldName, rawValue, registerField]);

  return (
    <View>
      <TextInputStyled
        ref={inputRef}
        mode="outlined"
        theme={{
          colors: {
            primary: theme.colors.primary,
            error: theme.colors.danger,
            underlineColor: 'transparent',
          },
        }}
        value={value}
        error={!!error}
        accessibilityStates
        onFocus={clearError}
        onChangeText={handleOnChange}
        {...rest}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <HelperText
          type={error ? 'error' : 'info'}
          visible={!!error}
          style={{ color: theme.colors.danger }}
        >
          {' '}
          {error}{' '}
        </HelperText>
        {!countInvisible && (
          <HelperText
            type={error ? 'error' : 'info'}
            theme={{
              colors: {
                error: theme.colors.danger,
              },
            }}
            visible={!!rest.maxLength}
            style={{ textAlign: 'right' }}
          >
            {value?.length || 0}/{rest.maxLength}
          </HelperText>
        )}
      </View>
    </View>
  );
}
