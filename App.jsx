// vendor imprts
import { Pressable, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

// screens
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';

// components
import IconButton from './components/ui/IconButton';

// store
import { store } from './store/store';

// styles
import { GlobalStyles } from './utils/constants';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

const ExpensesOverview = () => (
  <Bottom.Navigator
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({ tintColor }) => (
        <IconButton
          icon='add'
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate('ManageExpense');
          }}
        />
      ),
    })}
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
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ navigation }) => ({
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
                headerTintColor: 'white',
              },
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
              options={{
                presentation: 'modal',
                title: 'Manage Expense',
                headerTintColor: 'white',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
