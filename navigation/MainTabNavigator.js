import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import GraphFinacial from '../screens/GraphFinacial';
import SettingsScreen from '../screens/SettingsScreen';
import Q1Screen from '../screens/Q1Screen';
import StackedBar from '../screens/StackedBar';


const HomeStack = createStackNavigator({

   Home: HomeScreen,
});


HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon
    name='home'
  />
  ),
};

const GraphStack = createStackNavigator({
  Graph: GraphFinacial,
  Chart : StackedBar,

});

GraphStack.navigationOptions = {
  tabBarLabel: 'Graph',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-pie' : 'md-pie'}
    />
  ),
};



const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};



export default createBottomTabNavigator({
  HomeStack,
  GraphStack,
  SettingsStack,
 
  
  
});
