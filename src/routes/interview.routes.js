import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Interview from '../screens/auth/interview';
import BlockOfQuestionnaire from '../screens/auth/interview/block-questionnaire';

const Stack = createStackNavigator();

export default function ContactScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Interview" component={Interview} />
      <Stack.Screen
        name="BlockOfQuestionnaire"
        component={BlockOfQuestionnaire}
      />
    </Stack.Navigator>
  );
}
