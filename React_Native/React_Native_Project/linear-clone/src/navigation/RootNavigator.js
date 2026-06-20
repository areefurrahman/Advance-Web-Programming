import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainTabs from './MainTabs';
import IssueDetailScreen from '../screens/IssueDetailScreen';
import CreateIssueScreen from '../screens/CreateIssueScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
        <Stack.Screen name="CreateIssue" component={CreateIssueScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}