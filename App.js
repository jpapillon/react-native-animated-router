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

import {Router, Actions} from './Router';

import Scene from './Scene';

class Page1Screen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PAGE 1!</Text>
        <TouchableOpacity onPress={() => Actions.push("page2", {})}>
          <Text>push page 2</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Text>pop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset()}>
          <Text>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset("page2", {})}>
          <Text>reset to page2</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class Page2Screen extends Component {
  render() {
    return (
      <View style={[styles.container, {backgroundColor: '#eee'}]}>
        <Text>PAGE 2!</Text>
        <TouchableOpacity onPress={() => Actions.push("page3", {})}>
          <Text>push page 3</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Text>pop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset()}>
          <Text>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset("page3", {})}>
          <Text>reset to page3</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


class Page3Screen extends Component {
  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'pink'}]}>
        <Text>PAGE 3!</Text>
        <TouchableOpacity onPress={() => Actions.push("page1", {})}>
          <Text>push page 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.pop()}>
          <Text>pop</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset()}>
          <Text>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.reset("page1", {})}>
          <Text>reset to page1</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const routes = {
  page1: Page1Screen,
  page2: Page2Screen,
  page3: Page3Screen
};

const {width, height} = Dimensions.get('window');
const animations = {
  'default': {
    duration: 250,
    push: {
      duration: 1000,
      fn: progress => {
        const translateX = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [width, 0],
        });

        return {
          transform: [{
            translateX
          }]
        }
      }
    },
    blur: {
      fn: progress => {
        const rotate = progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg'],
        });

        return {
          transform: [{
            rotate
          }]
        }
      }
    },
    focus: {
      fn: progress => {
        const rotate = progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['90deg', '0deg'],
        });

        return {
          transform: [{
            rotate
          }]
        }
      }
    },
    pop: {
      fn: progress => {
        const rotate = progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['90deg', '0deg'],
        });

        return {
          transform: [{
            rotate
          }]
        }
      }
    },
  },
  custom: [{
    from: 'page1',
    to: 'page2',
    push: {
      fn: progress => {
        const translateX = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [width, 0],
        });

        return {
          transform: [{
            translateX
          }]
        }
      }
    },
    blur: {
      fn: progress => {
        const rotate = progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '90deg'],
        });

        return {
          transform: [{
            rotate
          }]
        }
      }
    },
    focus: {
      fn: progress => {
        const rotate = progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['90deg', '0deg'],
        });

        return {
          transform: [{
            rotate
          }]
        }
      }
    },
    pop: {
      fn: progress => {
        const rotate = progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['90deg', '0deg'],
        });

        return {
          transform: [{
            rotate
          }]
        }
      }
    },
    duration: 250
  }]
}

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Router routes={routes} animations={animations}/>
      </View>
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
