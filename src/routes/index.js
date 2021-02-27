import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthRoute from './auth.routes';
import DashboardRoute from './dashboard.routes';
import SplashScreen from '../screens/splash';

const Stack = createStackNavigator();

export default function Splash() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Auth" component={AuthRoute} />
      <Stack.Screen name="Dashboard" component={DashboardRoute} />
    </Stack.Navigator>
  );
}
