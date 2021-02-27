import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const defaults = {
  fonts: ['Roboto', 'sans-serif'],
  fontSize: {
    wide: 26,
    medium: 20,
    small: 17,
    tiny: 14,
  },
  colors: {
    darkPrimary: '#9C9999',
    primary: '#EF5C18',
    danger: '#E10304',
    warning: '#f1a525',
    success: '#68bb6a',
    info: '#64c6e2',
    white: '#FFF',
    black: '#000',
    lightGrey: '#F2F2F2',
    questGrey: '#DCDCDC',
    mediumGrey: '#D3D3D3',
    darkGrey: '#9C9999',
    orange: '#EF5C18',
    blue: '#0197D7',
    yellow: '#F6B739',
    red: '#E10304',
    green: '#048D3F',
    invalid: '#ffadadb0',
  },
  metrics: {
    smallSpacing: 15,
    baseSpacing: 20,
    doubleBaseSpacing: 50,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    baseRadius: 15,
    roundRadius: 50,
    selectHeight: 48,
    tabHeight: 90,
  },
};

export const theme = { ...defaults };

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
