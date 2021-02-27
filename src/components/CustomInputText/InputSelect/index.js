import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import {
  IconButton,
  HelperText,
  List,
  Card,
  Searchbar,
  Divider,
} from 'react-native-paper';

import { useField } from '@unform/core';
import { debounce } from 'lodash';
import { theme } from '../../../config/theme';
import { TextInputStyled } from './styles';

const InputSelect = ({
  name,
  options,
  initialValue,
  onChangeValue,
  search = true,
  ...rest
}) => {
  const inputRef = useRef(null);

  const [selected, setSelected] = useState(
    initialValue
      ? options.find((i) => i?.value.toString() === initialValue?.toString())
      : null
  );
  const [optionsFiltered, setOptionsFiltered] = useState(options);
  const [show, setShow] = useState(false);
  const { fieldName, registerField, error, defaultValue } = useField(name);

  const handleOnChange = (value) => {
    const item =
      value instanceof Object
        ? value
        : options.find((i) => i?.value.toString() === value?.toString());
    if (item) {
      setShow(false);
      setSelected(item);
      onChangeValue(value);
      if (inputRef.current) inputRef.current.value = item;
    } else {
      setSelected({ label: '' });
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (defaultValue) {
      handleOnChange(defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {
    handleOnChange(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setOptionsFiltered(options);
  }, [options, show]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      clearValue(ref) {
        setSelected('');
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        handleOnChange(value);
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
          accessibilityStates
          theme={{
            colors: {
              primary: theme.colors.primary,
              error: theme.colors.danger,
              underlineColor: 'transparent',
            },
          }}
          editable={false}
          mode="outlined"
          value={selected?.label}
          error={!!error}
          {...rest}
        />
        <IconButton
          style={{
            position: 'absolute',
            right: 2,
            top: 2,
          }}
          icon={show ? 'chevron-up' : 'chevron-down'}
          color="grey"
          size={35}
          disabled={!!rest.disabled}
          onPress={() => setShow((state) => !state)}
        />
      </View>

      {show && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            top: 55,
            zIndex: 999,
          }}
        >
          <Card style={{ elevation: 5 }}>
            {search && (
              <Searchbar
                placeholder="Search"
                onChangeText={debounce((param) =>
                  setOptionsFiltered(
                    options.filter(
                      (item) =>
                        item.label.toLowerCase().indexOf(param.toLowerCase()) >
                        -1
                    )
                  )
                )}
              />
            )}

            <FlatList
              ItemSeparatorComponent={() => <Divider />}
              data={optionsFiltered}
              style={{ height: 200 }}
              keyExtractor={(item) => item?.value.toString()}
              renderItem={({ item }) => (
                <List.Item
                  title={item.label}
                  onPress={() => handleOnChange(item)}
                  disabled={rest.disabled}
                  {...(item.value.toString() ===
                    selected?.value?.toString() && {
                    titleStyle: { color: theme.colors.primary },
                    style: { backgroundColor: theme.colors.lightGrey },
                  })}
                />
              )}
              ListEmptyComponent={() => (
                <List.Item title="Nenhum registro encontrado" />
              )}
            />
          </Card>
        </View>
      )}

      <HelperText type="error" visible={!!error}>
        {' '}
        {error}{' '}
      </HelperText>
    </View>
  );
};

export default InputSelect;
