import React from 'react';
import { View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { HelperText } from 'react-native-paper';
import { useField } from '@unform/core';
import { theme } from '../../../config/theme';
import { TextInputStyled } from './styles';

const CustomInputMask = React.forwardRef((props, inputRef) => {
  const { onChangeText, rawValue, name, countInvisible } = props;
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
      clearValue() {
        handleOnChange(undefined);
      },
      setValue(ref, text) {
        handleOnChange(text);
      },
      getValue() {
        return rawValue;
      },
    });
  }, [fieldName, rawValue, registerField]);

  return (
    <View>
      <TextInputStyled
        ref={inputRef}
        mode="outlined"
        error={!!error}
        onFocus={clearError}
        theme={{
          colors: {
            primary: theme.colors.primary,
            error: theme.colors.danger,
            underlineColor: 'transparent',
          },
        }}
        {...props}
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
            visible={!!props.maxLength}
            style={{ textAlign: 'right' }}
          >
            {value?.length || 0}/{props.maxLength}
          </HelperText>
        )}
      </View>
    </View>
  );
});

const InputMaskText = ({ type, ...rest }) => {
  const ref = React.useRef(null);
  const [value, setValue] = React.useState('');
  const [rawValue, setRawValue] = React.useState('');

  const handleOnChangeText = React.useCallback((maskedValue, unmaskedValue) => {
    setValue(maskedValue);
    setRawValue(unmaskedValue);
  }, []);

  return (
    <View>
      <TextInputMask
        type={type}
        ref={ref}
        value={value}
        includeRawValueInChangeText
        onChangeText={handleOnChangeText}
        customTextInput={CustomInputMask}
        customTextInputProps={{
          rawValue,
          ...rest,
        }}
        {...rest}
      />
    </View>
  );
};

export default InputMaskText;
