/**
 * PreworkCalculator Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Button
} from 'react-native';
/*import setting*/
import Calculator from "./Apps/calculator.js"
import Setting from './Apps/settings.js';
import PowerRanger from './Apps/powerRanger.js';
import customNavBar from './Apps/customNavBar.js';
/*End import setting*/
export default class PreworkCalculator extends Component {
  render() {
    return (
     <PowerRanger />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  h1: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 18,
  }
});

AppRegistry.registerComponent('PreworkCalculator', () => PreworkCalculator);
