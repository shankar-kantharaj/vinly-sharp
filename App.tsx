import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStack } from './src/navigations/routes';
import BottomTabNavigator from './src/components/BottomTabBar/BottomTabBar';
import { Provider } from 'react-redux';
import store from './src/redux/store';

const Stack = createStackNavigator();

// App Component with Stack Navigator
const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
        }}
        initialRouteName="AuthStack"
      >
        {/* Auth Stack for the initial flow */}
        <Stack.Screen name="AuthStack" component={AuthStack} />

        {/* Home Stack and Bottom Tab Navigation */}
        <Stack.Screen name="BottomTabBar" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
