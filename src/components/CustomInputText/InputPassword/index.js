import React from 'react';
import { View } from 'react-native';
import { IconButton, HelperText } from 'react-native-paper';
import { useField } from '@unform/core';
import { theme } from '../../../config/theme';
import { TextInputStyled } from './styles';

const InputPassword = ({ name, ...rest }) => {
  const inputRef = React.useRef(null);
  const [password, setPassword] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);

  const handleOnChange = (text) => {
    setPassword(text);
    if (inputRef.current) inputRef.current.value = text;
  };

  React.useEffect(() => {
    if (inputRef.current) handleOnChange(defaultValue);
  }, [defaultValue]);

  React.useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        setPassword('');
        ref.value = '';
        ref.clear();
      },
      setValue(ref, text) {
        handleOnChange(text);
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <TextInputStyled
          ref={inputRef}
          style={{ flex: 1 }}
          mode="outlined"
          theme={{
            colors: {
              primary: theme.colors.primary,
              error: theme.colors.danger,
              underlineColor: 'transparent',
            },
          }}
          value={password}
          error={!!error}
          accessibilityStates
          maxLength={50}
          onFocus={clearError}
          onChangeText={handleOnChange}
          secureTextEntry={secureTextEntry}
          {...rest}
        />
        <IconButton
          style={{
            position: 'absolute',
            zIndex: 1,
            right: 2,
            top: 2,
          }}
          icon={secureTextEntry ? 'eye' : 'eye-off'}
          color="grey"
          size={35}
          onPress={() => setSecureTextEntry((state) => !state)}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <HelperText
          type={error ? 'error' : 'info'}
          visible={!!error}
          style={{ color: theme.colors.danger }}
        >
          {' '}
          {error}{' '}
        </HelperText>
        <HelperText
          type={error ? 'error' : 'info'}
          visible={!!rest.maxLength}
          style={{ textAlign: 'right' }}
        >
          {password?.length || 0}/{rest.maxLength}
        </HelperText>
      </View>
    </View>
  );
};

export default InputPassword;
