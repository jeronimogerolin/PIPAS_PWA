import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import SignIn from '../screens/not-auth/signIn';
import RecoveryPassword from '../screens/not-auth/recoveryPassword';
import Contact from './contact.routes';
import TermsOfUse from './termsOfUse.routes';

const Stack = createStackNavigator();

export default function AuthScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="RecoveryPassword" component={RecoveryPassword} />
      <Stack.Screen name="Contact" component={Contact} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
    </Stack.Navigator>
  );
}
