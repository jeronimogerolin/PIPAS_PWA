import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TermsOfUse from '../screens/not-auth/termsOfUse';

const Stack = createStackNavigator();

export default function ContactScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TermsofUse" component={TermsOfUse} />
    </Stack.Navigator>
  );
}
