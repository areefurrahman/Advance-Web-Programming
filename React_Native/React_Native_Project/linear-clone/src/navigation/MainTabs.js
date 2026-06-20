import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { colors } from '../theme/theme';

import DashboardScreen from '../screens/DashboardScreen';
import KanbanScreen from '../screens/KanbanScreen';
import ActivityScreen from '../screens/ActivityScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,


        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'grid';
          } else if (route.name === 'Kanban') {
            iconName = 'columns';
          } else if (route.name === 'Activity') {
            iconName = 'activity';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }


          return (<View style={[styles.iconContainer, focused ? styles.activeIconContainer : styles.inactiveIconContainer
          ]}>  <Feather name={iconName} size={size} color={color} />  </View>);
        },

        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textPrimary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderRadius: 40,

          position: 'absolute',      // Required if adding margins/floating the bar 
          bottom: 10,
          left: 15,
          right: 15,

          paddingBottom: 50,          // Space at the very bottom
          paddingTop: 10,             // Space at the very top
          height: 62,                 // Total height of the bar
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Kanban" component={KanbanScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 64,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: colors.border,
  },
  inactiveIconContainer: {
    backgroundColor: 'transparent',
  },
});