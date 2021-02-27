import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import Home from '../screens/auth/home';
import Border from '../components/Border';

Icon.loadFont();

const Stack = createStackNavigator();

export default function ContactScreen({ navigation }) {
  return (
    <>
      <Border />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerLeft: () => (
              <View>
                <Icon
                  onPress={() => navigation.toggleDrawer()}
                  name="menu"
                  color="#000"
                  size={30}
                  style={{ marginLeft: 10 }}
                />
              </View>
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
}
