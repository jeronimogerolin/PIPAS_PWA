import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import Contact from './contact.routes';
import Home from './home.routes';
import Interview from './interview.routes';
import { theme } from '../config/theme';
import TermsOfUse from './termsOfUse.routes';
import { ClearAuthData } from '../store/ducks/auth';
import VerifyUpdates from '../screens/auth/verify-update';

Icon.loadFont();

const Drawer = createDrawerNavigator();

const Logout = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ClearAuthData());
    navigation.replace('Auth');
  }, []);

  return <View />;
};

export default function DashboardScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: theme.colors.primary,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          unmountOnBlur: true,
          drawerLabel: ({ color }) => (
            <Text
              style={{
                fontWeight: 'bold',
                color,
              }}
            >
              Home
            </Text>
          ),
          drawerIcon: ({ color }) => (
            <Icon name="home" size={25} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Interview"
        component={Interview}
        options={{
          unmountOnBlur: true,
          drawerLabel: ({ color }) => (
            <Text
              style={{
                fontWeight: 'bold',
                color,
              }}
            >
              Nova entrevista
            </Text>
          ),
          drawerIcon: ({ color }) => (
            <Icon name="record-voice-over" size={25} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="VerifyUpdates"
        component={VerifyUpdates}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                fontWeight: 'bold',
                color,
              }}
            >
              Verificar atualizações
            </Text>
          ),
          drawerIcon: ({ color }) => (
            <Icon name="cloud-download" size={25} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                fontWeight: 'bold',
                color,
              }}
            >
              Entrar em contato
            </Text>
          ),
          drawerIcon: ({ color }) => (
            <Icon name="email" size={25} color={color} />
          ),
        }}
      />

      {/* <Drawer.Screen
        name="TermsOfUse"
        component={TermsOfUse}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                fontWeight: 'bold',
                color,
              }}
            >
              Termos de uso
            </Text>
          ),
          drawerIcon: ({ color }) => (
            <Icon name="library-books" size={25} color={color} />
          ),
        }}
      /> */}
      {/* <Drawer.Screen
        name="Exit"
        component={Logout}
        options={{
          drawerLabel: ({ color }) => (
            <Text
              style={{
                fontWeight: 'bold',
                color,
              }}
            >
              Sair
            </Text>
          ),
          drawerIcon: ({ color }) => (
            <Icon name="exit-to-app" size={25} color={color} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
}
