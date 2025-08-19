import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStack } from './src/navigations/routes';
import BottomTabNavigator from './src/components/BottomTabBar/BottomTabBar';

const Stack = createStackNavigator();

// App Component with Stack Navigator
const App = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade', // keeps the focus on the shared element
      }}
      initialRouteName="AuthStack" // Start with the AuthStack
    >
      {/* Auth Stack for the initial flow */}
      <Stack.Screen name="AuthStack" component={AuthStack} />

      {/* Home Stack and Bottom Tab Navigation */}
      <Stack.Screen name="BottomTabBar" component={BottomTabNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
