import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllExpenses from './screens/AllExpenses';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import Feather from '@expo/vector-icons/Feather';
import { GlobalStyles } from './utils/constants';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

const ExpensesOverview = () => (
  <Bottom.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
    }}
  >
    <Bottom.Screen
      name='RecentExpenses'
      component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='hourglass' color={color} size={size} />
        ),
      }}
    />
    <Bottom.Screen
      name='AllExpenses'
      component={AllExpenses}
      options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name='calendar' color={color} size={size} />
        ),
      }}
    />
  </Bottom.Navigator>
);

export default function App() {
  return (
    <>
      <StatusBar style='auto' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerRight: () => (
              <Pressable onPress={() => navigation.navigate('ManageExpense')}>
                <Feather name='plus' size={24} color='black' />
              </Pressable>
            ),
          })}
        >
          <Stack.Screen
            name='Bottom'
            component={ExpensesOverview}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ManageExpense'
            component={ManageExpense}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
