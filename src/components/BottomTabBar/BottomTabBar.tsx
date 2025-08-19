import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureResponderEvent, Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GroupExperienceStack, HomeStack } from "../../navigations/routes";
import HomeScreen from "../../screens/Main/HomeScreen/HomeScreen";

const Tab = createBottomTabNavigator();


interface TabIconProps {
  focused: boolean; // Whether the tab is focused or not
  imageSource: ImageSourcePropType; // The source of the image (could be a URI or a local image)
  onPress: (event: GestureResponderEvent) => void; // Function that is called when the tab is pressed
}

// Reusable TabIcon Component
const TabIcon: React.FC<TabIconProps> = ({ focused, imageSource, onPress }) => ( 
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
      initialRouteName='Home'
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#201c1c',
          borderTopWidth: 0,
          borderBottomWidth: 0, 
          height: 88,
          paddingTop: 15,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack} // Use HomeStack in the tab navigator
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('../../assets/images/bar-home.png')}
              onPress={() => navigation.navigate('Home')} // Ensures the navigation works when tab is pressed
            />
          ),
        })}
      />
      <Tab.Screen
        name="Explore"
        component={HomeStack} // You can update this to any other screen or stack as needed
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('../../assets/images/bar-explore.png')}
              onPress={() => {}}
            />
          ),
        })}
      />
      <Tab.Screen
        name="Flagship"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('../../assets/images/bar-flagship.png')}
              onPress={() => navigation.navigate('Flagship')}
            />
          ),
        })}
      />
      <Tab.Screen
        name="GroupExp"
        component={GroupExperienceStack} // Group Experience Screen Stack
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('../../assets/images/bar-group.png')}
              onPress={() => {}}
            />
          ),
        })}
      />
      <Tab.Screen
        name="WishList"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              imageSource={require('../../assets/images/bar-star.png')}
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

export default BottomTabNavigator;