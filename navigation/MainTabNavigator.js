import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import MinerScreen from '../screens/MinerScreen';
import PoolScreen from '../screens/PoolScreen';
import TodoScreen from '../screens/TodoScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MinerStack = createStackNavigator(
  {
    Miner: MinerScreen,
  },
  config
);

MinerStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'
      }
    />
  ),
};

MinerStack.path = '';

const TodoStack = createStackNavigator(
  {
    Todo: TodoScreen,
  },
  config
);

TodoStack.navigationOptions = {
  tabBarLabel: 'To-Do',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused = {focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

TodoStack.path = '';

const PoolStack = createStackNavigator(
  {
    Pool: PoolScreen,
  },
  config
);

PoolStack.navigationOptions = {
  tabBarLabel: 'Pool',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-water' : 'md-water'} />
  ),
};

PoolStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MinerStack,
  PoolStack,
  TodoStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
