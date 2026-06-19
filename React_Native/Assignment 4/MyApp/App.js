import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feather } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import ReelsScreen from './screens/ReelsScreen';
import ShopScreen from './screens/ShopScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',

          tabBarStyle: {
            backgroundColor: '#111',
            borderTopColor: '#222',
          },

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Search') {
              iconName = 'search';
            } else if (route.name === 'Reels') {
              iconName = 'play-circle';
            } else if (route.name === 'Shop') {
              iconName = 'shopping-bag';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }

            return (
              <Feather
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />

        <Tab.Screen
          name="Search"
          component={SearchScreen}
        />

        <Tab.Screen
          name="Reels"
          component={ReelsScreen}
        />

        <Tab.Screen
          name="Shop"
          component={ShopScreen}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}