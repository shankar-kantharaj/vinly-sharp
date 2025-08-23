import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Main/HomeScreen/HomeScreen';
import RecommendedScreen from '../screens/Main/Recommended/Recommended';
import SplashScreen from '../screens/Auth/SplashScreen/SplashScreen';
import WelcomeToVinyl from '../screens/Auth/WelcomeToVinyl/WelcomeToVinyl';
import GroupExperience from '../screens/Main/GroupExperience/GroupExperience';
import SearchLocation from '../components/SearchLocation/SearchLocation';

// Auth Stack Navigator
const StackNavigator1 = createNativeStackNavigator();
export const AuthStack = () => (
  <StackNavigator1.Navigator initialRouteName="SplashScreen">
    <StackNavigator1.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{ headerShown: false }}
    />
    <StackNavigator1.Screen
      name="WelcomeToVinyl"
      component={WelcomeToVinyl}
      options={{ headerShown: false }}
    />
  </StackNavigator1.Navigator>
);

// Home Stack Navigator
const StackNavigator2 = createNativeStackNavigator();
export const HomeStack = () => (
  <StackNavigator2.Navigator initialRouteName="HomeScreen">
    <StackNavigator2.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <StackNavigator2.Screen
      name="RecommendedScreen"
      component={RecommendedScreen}
      options={{ headerShown: false }}
    />
  </StackNavigator2.Navigator>
);

// Group Experience Stack Navigator
const StackNavigator3 = createNativeStackNavigator();
export const GroupExperienceStack = () => (
  <StackNavigator3.Navigator
    initialRouteName="GroupExperience"
    screenOptions={{
    }}
  >
    <StackNavigator3.Screen
      name="GroupExperience"
      component={GroupExperience}
      options={{ headerShown: false }}
    />
  </StackNavigator3.Navigator>
);

// Group Experience Stack Navigator
const StackNavigator4 = createNativeStackNavigator();
export const SearchStack = () => (
  <StackNavigator4.Navigator
    initialRouteName="SearchLocation"
    screenOptions={{
    }}
  >
    <StackNavigator4.Screen
      name="SearchLocation"
      component={SearchLocation}
      options={{ headerShown: false }}
    />
  </StackNavigator4.Navigator>
);
