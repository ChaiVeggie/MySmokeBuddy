import React from 'react';
import { createSwitchNavigator,createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import Q1Screen from '../screens/Q1Screen';

const q1Stack = createStackNavigator({

  q1: Q1Screen,
});


export default createSwitchNavigator({
  q1: q1Stack,
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});