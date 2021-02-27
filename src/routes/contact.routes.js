import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Contact from '../screens/not-auth/contact';

const Stack = createStackNavigator();

export default function ContactScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
}
