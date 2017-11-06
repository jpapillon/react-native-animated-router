# react-native-animated-router
React Native router with full control on transition animations.

**This library is currently in development.**

## Installation
```bash
npm install react-native-animated-router --save
```
or
```bash
yarn add react-native-animated-router
```

## Usage
```js
import React, {Component} from 'react';
import {View} from 'react-native';
import {Router} from 'react-native-animated-router';

import Page1Screen from './Page1Screen';
import Page2Screen from './Page2Screen';

const routes = {
  page1: {
    screen: Page1Screen
  },
  page2: {
    screen: Page2Screen
  }
};

const animations = {
  'default': {
    config: {                // Default configuration for all transition animations
      duration: 3000,        // Duration of the animation transition
      fn: Animated.spring,   // Function to use for launching the animation progress
      useNativeDriver: true
    },
    push: {
      config: {},            // Default configuration for all 'push' animations ('config' objects have all the same structure, as shown above)
      fn: progress => {      // Default function used for animating the pushed view. It receives a progress (Animated.Value) of current transition progress
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
      config: {},            // Default configuration for all 'blur' animations (animation on the screen which gets another one pushed over)
      fn: progress => {}     // Default function used for animating the blurred view
    },
    focus: {
      config: {},            // Etc.
      fn: progress => {}
    },
    pop: {
      config: {},
      fn: progress => {}
    }
  },
  custom: [{                 // This is where custom animations are defined (e.g. we want a specific animation from route 'page1' to 'page2'). Structure is the same as above.
    from: 'page1',
    to: 'page2',
    config: {},
    push: {
      config: {},
      fn: progress => {}
    },
    blur: {
      config: {},
      fn: progress => {}
    },
    focus: {
      config: {},
      fn: progress => {}
    },
    pop: {
      config: {},
      fn: progress => {}
    }
  }, {/* ... */}]
}

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Router routes={routes} animations={animations} />
      </View>
    )
  }
}
```

### Actions
```js
import {Actions} from 'react-native-animated-router';

Actions.push('page1', {param1: "Hello World"});   // <-- Will push 'page1' on stack
Actions.pop();    // <-- Pops last view on stack
Actions.reset();    // <-- Resets the stack to the first one
Actions.reset('page2', {param2: "Test"});   // <-- Resets the stack to 'page2'
```

#### Example
```js
...
import {Actions} from 'react-native-animated-router';

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
```

This router was inspired by [React Navigation](https://reactnavigation.org) and [RNRF](https://github.com/aksonov/react-native-router-flux).
