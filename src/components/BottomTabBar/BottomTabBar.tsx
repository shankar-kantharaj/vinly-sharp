import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureResponderEvent, Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { GroupExperienceStack, HomeStack } from "../../navigations/routes";
import HomeScreen from "../../screens/Main/HomeScreen/HomeScreen";

const Tab = createBottomTabNavigator();


interface TabIconProps {
  focused: boolean; // Whether the tab is focused or not
  activeImageSource: ImageSourcePropType; // The source of the image (could be a URI or a local image)
  inActiveImageSource: ImageSourcePropType; // The source of the image (could be a URI or a local image)
  
}

// Reusable TabIcon Component
const TabIcon: React.FC<TabIconProps> = ({ focused, activeImageSource,inActiveImageSource }) => ( 
  <View style={styles.tabButton}>
    <LinearGradient
     colors={focused ? ['transparent','transparent'] : ['transparent', 'transparent']} // Gradient for active tab
      style={styles.iconContainer}
    >
      <Image
        source={ focused ? activeImageSource : inActiveImageSource}
        style={[styles.tabIcon, focused && styles.activeIcon]} // Apply active icon style
      />
    </LinearGradient>
  </View>
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
              activeImageSource={require('../../assets/images/bottom-bar/bar-home-active.png')}
              inActiveImageSource={require('../../assets/images/bottom-bar/bar-home-inactive.png')}
            
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
              activeImageSource={require('../../assets/images/bottom-bar/bar-explore-active.png')}
              inActiveImageSource={require('../../assets/images/bottom-bar/bar-explore-inactive.png')}
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
              activeImageSource={require('../../assets/images/bottom-bar/bar-flagship-active.png')}
              inActiveImageSource={require('../../assets/images/bottom-bar/bar-flagship-inactive.png')}
            
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
              activeImageSource={require('../../assets/images/bottom-bar/bar-group-active.png')}
              inActiveImageSource={require('../../assets/images/bottom-bar/bar-group-inactive.png')}
            
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
              activeImageSource={require('../../assets/images/bottom-bar/bar-star-active.png')}
              inActiveImageSource={require('../../assets/images/bottom-bar/bar-star-inactive.png')}
             
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
    padding: 0,
  },
  tabIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  activeIcon: {
    opacity: 1,
  },
});

export default BottomTabNavigator;