import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "../screens/Main/HomeScreen/HomeScreen"
import RecommendedScreen from "../screens/Main/Recommended/Recommended"

const StackNavigator3 = createNativeStackNavigator()
export const HomeStack = () => {
  return (
    <StackNavigator3.Navigator initialRouteName='HomeScreen'>
      <StackNavigator3.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <StackNavigator3.Screen name="RecommendedScreen" component={RecommendedScreen} options={{ headerShown: false }} />
    </StackNavigator3.Navigator>
  )
}