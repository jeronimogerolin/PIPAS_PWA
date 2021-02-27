/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TouchableOpacity, Platform, Text, View } from 'react-native';
import moment from 'moment';
import { isString } from 'lodash';
import { theme } from '../../../../../../config/theme';

export function DateAnswer({ question, answer, onChangeValue, value }) {
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [inValidMessage, setInvalidMessage] = useState('');

  const handleChangedValue = (valid, val) => {
    setIsValid(valid);
    onChangeValue(question, { ...answer, isValid: valid, value: moment(val).format('DD/MM/YYYY') });
  };

  const standardizeDate = (valueDate) => {
    const year = new Date(valueDate).getUTCFullYear();
    const month = new Date(valueDate).getUTCMonth();
    const day = new Date(valueDate).getUTCDate();

    return moment(new Date(year, month, day));
  };

  const dateValidation = (selectedDate) => {
    const maxDate = standardizeDate(answer.validation.maxDate);
    const minDate = standardizeDate(answer.validation.minDate);
    const formattedDate = standardizeDate(selectedDate);

    const isValidMaxDate = maxDate.isValid();
    const isValidMinDate = minDate.isValid();

    if (isValidMaxDate && isValidMinDate) {
      if (formattedDate.isSameOrAfter(minDate) && formattedDate.isSameOrBefore(maxDate)) {
        handleChangedValue(true, formattedDate);
      } else {
        handleChangedValue(false, formattedDate);
        setInvalidMessage(`A data deve ser entre ${minDate.format('DD/MM/YYYY')} e ${maxDate.format('DD/MM/YYYY')}`);
      }
    } else if (isValidMinDate) {
      if (formattedDate.isSameOrAfter(minDate)) {
        handleChangedValue(true, formattedDate);
      } else {
        handleChangedValue(false, formattedDate);
        setInvalidMessage(`A data deve ser maior que ${minDate.format('DD/MM/YYYY')}`);
      }
    } else if (isValidMaxDate) {
      if (formattedDate.isSameOrBefore(maxDate)) {
        handleChangedValue(true, formattedDate);
      } else {
        handleChangedValue(false, formattedDate);
        setInvalidMessage(`A data deve ser menor ${maxDate.format('DD/MM/YYYY')}`);
      }
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    if (answer.hasOwnProperty('validation')) {
      dateValidation(selectedDate);
    } else {
      handleChangedValue(true, currentDate);
    }
  };

  useEffect(() => {
    if (value && isString(value)) {
      const day = value.split('/')[0];
      const month = Number(value.split('/')[1]) - 1;
      const year = value.split('/')[2];

      const formattedDate = new Date(year, month, day);

      setDate(formattedDate);

      if (answer.hasOwnProperty('validation')) {
        dateValidation(formattedDate);
      }
    }
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          backgroundColor: !isValid ? theme.colors.invalid : null,
        }}
      >
        <TouchableOpacity onPress={() => setShow(true)}>
          <Text style={{ padding: 20 }}>
            {date
              ? moment(date).format('DD/MM/YYYY')
              : answer.description || 'Selecione uma data'}
          </Text>
        </TouchableOpacity>

        {!isValid && <Text
            style={{
              color: theme.colors.red,
              marginBottom: theme.metrics.smallSpacing,
            }}
        >
          {inValidMessage}
        </Text>}
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date()}
          mode="date"
          locale="pt-BR"
          display="spinner"
          onChange={onChange}
        />
      )}
    </>
  );
}
