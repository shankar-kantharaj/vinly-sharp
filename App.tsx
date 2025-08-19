import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import HomeScreen from './src/screens/Main/HomeScreen/HomeScreen';
import SecondaryHome from './src/screens/Main/SecondaryHome/SecondaryHome';
import RecommendedSection from './src/screens/Main/Recommended/Recommended';
import { HomeStack } from './src/navigations/routes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Reusable TabIcon Component
const TabIcon = ({ focused, imageSource, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.tabButton}>
    <LinearGradient
     colors={focused ? ['transparent','#ab464f'] : ['transparent', 'transparent']} // Gradient for active tab
      style={styles.iconContainer}
    >
      <Image
        source={imageSource}
        style={[styles.tabIcon, focused && styles.activeIcon]} // Apply active icon style
      />
    </LinearGradient>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    initialRouteName='Explore'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#201c1c',
          borderTopWidth: 0,
          borderBottomWidth: 0, 
          height: 88,
          paddingTop: 15, 
          // borderRadius: 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('./src/assets/images/bar-home.png')}
              onPress={() => navigation.navigate('Home')} // Ensures the navigation works when tab is pressed
            />
          ),
        })}
      />
      <Tab.Screen
        name="Explore"
        component={HomeStack}
        options={({ navigation, route }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('./src/assets/images/bar-explore.png')}
              onPress={() => {}}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Flagship"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('./src/assets/images/bar-flagship.png')}
              onPress={() => navigation.navigate('Flagship')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Group"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('./src/assets/images/bar-group.png')}
              onPress={() => navigation.navigate('Group')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="WishList"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('./src/assets/images/bar-star.png')}
              onPress={() => navigation.navigate('WishList')}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    borderRadius: 15,
    padding: 10,
  },
  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  activeIcon: {
    opacity: 1,
  },
});

// App Component with Stack Navigator
const App = () => (
  <NavigationContainer>
    <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade', // keeps the focus on the shared element
        }}
       initialRouteName="BottomTab">
      <Stack.Screen
        name="BottomTab"
        component={BottomTabNavigator} // Use BottomTabNavigator inside the Stack Navigator
        options={{ headerShown: false }} // Hide header for this screen
      />
      {/* Add other stack screens here if needed */}
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
