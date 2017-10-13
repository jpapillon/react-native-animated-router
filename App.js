/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';

import Screen from './screen';

import {Router, Actions} from './Router';

import Scene from './Scene';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>HOME!</Text>
        <TouchableOpacity onPress={() => Actions.push("welcome", {})}>
          <Text>push</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Text>pop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset()}>
          <Text>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset("welcome", {})}>
          <Text>reset to screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


class WelcomeScreen extends Component {
  render() {
    return (
      <View style={[styles.container, {backgroundColor: '#eee'}]}>
        <Text>WELCOME!</Text>
        <TouchableOpacity onPress={() => Actions.push("home", {})}>
          <Text>push</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Text>pop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset()}>
          <Text>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset("home", {})}>
          <Text>reset to screen</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const routes = {
  'home': HomeScreen,
  'welcome': WelcomeScreen
}
export default class App extends Component {
  render() {
    return (
      <Router routes={routes} />
    )
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
});
