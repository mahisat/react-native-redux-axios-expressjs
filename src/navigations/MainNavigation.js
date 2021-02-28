import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import {HomeScreen, SettingsScreen, ListQuotes, QuoteForm} from '../screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="ListQuotes"
      screenOptions={{
        gestureEnabled: false,
        showIcon: true,
      }}>
      <Stack.Screen
        name="ListQuotes"
        component={ListQuotes}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="QuoteForm"
        component={QuoteForm}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const SettingsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        gestureEnabled: false,
        showIcon: true,
      }}>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Settings') {
              iconName = 'settings';
            }

            // You can return any component that you like here!
            return (
              <Icon
                name={iconName}
                size={size}
                color={color}
                style={{color: color}}
                type="MaterialIcons"
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#ff6347',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Settings" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
