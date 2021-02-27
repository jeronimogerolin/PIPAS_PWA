import React from 'react';
import { View, Platform, Modal } from 'react-native';
import { Button, IconButton, HelperText } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useField } from '@unform/core';
import { TextInputStyled } from './styles';
import { theme } from '../../../config/theme';

const InputDatePicker = ({ disabled = false, name, dateInitial, ...rest }) => {
  const inputRef = React.useRef(null);
  const [date, setDate] = React.useState(dateInitial || null);
  const [show, setShow] = React.useState(false);

  const {
    fieldName,
    registerField,
    defaultValue,
    error,
    clearError,
  } = useField(name);

  const handleOnChange = (selectedDate, type = 'set') => {
    let currentDate = date;
    if (type === 'set') {
      currentDate = selectedDate;
    }
    if (type === 'neutralButtonPressed') {
      currentDate = null;
    }
    setShow(false);
    setDate(currentDate);
    if (inputRef.current) inputRef.current.value = currentDate;
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
        setDate('');
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

  const renderDateModal = () => {
    if (show) {
      if (Platform.OS === 'android') {
        return (
          <DateTimePicker
            testID="dateTimePicker"
            value={date ? moment(date).toDate() : new Date()}
            mode="date"
            is24Hour
            locale="pt-BR"
            display="spinner"
            onChange={(event, selectedDate) =>
              handleOnChange(selectedDate, event.type)
            }
          />
        );
      }

      if (Platform.OS === 'ios') {
        return (
          <Modal
            visibible={show}
            transparent
            onDismiss={() => setShow(false)}
            animationType="slide"
            onRequestClose={() => setShow(false)}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              <View
                style={{
                  height: '50%',
                  backgroundColor: 'white',
                  justifyContent: 'flex-end',
                }}
              >
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date ? moment(date).toDate() : new Date()}
                  mode="date"
                  is24Hour
                  locale="pt-BR"
                  display="spinner"
                  neutralButtonLabel="Limpar"
                  onChange={(event, selectedDate) =>
                    handleOnChange(selectedDate, event.type)
                  }
                />
                <Button onPress={() => setShow(false)} style={{ padding: 10 }}>
                  {' '}
                  Fechar{' '}
                </Button>
              </View>
            </View>
          </Modal>
        );
      }
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <TextInputStyled
          ref={inputRef}
          style={{ flex: 1 }}
          accessibilityStates
          editable={false}
          theme={{
            colors: {
              primary: theme.colors.primary,
              error: theme.colors.danger,
              underlineColor: 'transparent',
            },
          }}
          mode="outlined"
          value={date && moment(date).format('DD/MM/YYYY')}
          error={!!error}
          {...rest}
        />
        {disabled || (
          <IconButton
            style={{
              position: 'absolute',
              right: 2,
              top: 2,
            }}
            icon="calendar"
            color="grey"
            size={35}
            onPress={() => {
              setShow(true);
              clearError();
            }}
          />
        )}
      </View>
      <HelperText
        type={error ? 'error' : 'info'}
        visible={!!error}
        style={{ color: theme.colors.danger }}
      >
        {' '}
        {error}{' '}
      </HelperText>
      {renderDateModal()}
    </View>
  );
};

export default InputDatePicker;
