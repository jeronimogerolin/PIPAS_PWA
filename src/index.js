import React from 'react';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { StatusBar, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';

import FlashMessage from 'react-native-flash-message';
import Theme, { theme } from '~/config/theme';
import { store, persistor } from '~/store';
import '~/config/i18n/pt-br.ts'; // Validador Yup para portugues
import 'react-native-gesture-handler';
import Routes from './routes';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
Icon.loadFont();



export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={theme.colors.white}
          />
          <Theme>
            <MenuProvider>
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            </MenuProvider>
          </Theme>
        </PersistGate>
      </Provider>

      <FlashMessage position="top" duration={3000} />
    </View>
  );
}
