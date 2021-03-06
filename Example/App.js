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

import {Router, Actions} from 'react-native-animated-router';
import ScrollableTabView from 'react-native-scrollable-tab-view';



class Page1Screen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PAGE 1!</Text>
        <TouchableOpacity onPress={() => Actions.modal("page2", {})}>
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
      <ScrollableTabView tabBarPosition={'bottom'}>
        <Page1Screen tabLabel="React" />
        <Page2Screen tabLabel="Flow" />
        <View tabLabel="Jest" />
      </ScrollableTabView>
    )
  }
}

const routes = {
  page1: {
    screen: Page1Screen,
    path: '/page1'
  },
  page2: {
    screen: Page2Screen,
    path: '/page2'
  },
  page3: {
    screen: Page3Screen,
    path: '/page3'
  }
};

const {width, height} = Dimensions.get('window');
const animations = {
  'default': {
    config: {
      duration: 222
    },
    push: {
      config: {
        duration: 111,
        fn: Animated.spring
      },
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
        const opacity = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.5],
        });

        return {
          opacity
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
        const translateY = progress.interpolate({
          inputRange: [0, 1],
          outputRange: [-height, 0],
        });

        return {
          transform: [{
            translateY
          }]
        }
      }
    },
  },
  custom: [{
    config: {
      duration: 333
    },
    from: 'page1',
    to: 'page2',
    push: {
      config: {
        duration: 444,
      },
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
      config: {
        duration: 2000
      },
      fn: progress => {
        const rotate = progress.interpolate({
          inputRange: [0, 1],
          outputRange: ['360deg', '0deg'],
        });

        return {
          transform: [{
            rotate
          }]
        }
      }
    }
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
