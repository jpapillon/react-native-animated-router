import React, {Component} from 'react';
import { View } from 'react-native';

import Scene from './Scene';
import stackManager from './stackManager';

class RouterSingleton {
  static setInstance(inst) {
    this._inst = inst;
  }

  static getInstance() {
    return this._inst;
  }
}

export const Actions = {
  push(routeName, params) {
    const inst = RouterSingleton.getInstance();
    stackManager.push(new Screen(routeName, params));
    inst.executeAction('push');
  },

  pop() {
    const inst = RouterSingleton.getInstance();
    stackManager.pop();
    inst.executeAction('pop');
  },

  reset(routeName, params) {
    const inst = RouterSingleton.getInstance();
    stackManager.reset(routeName ? new Screen(routeName, params) : null);
    inst.executeAction('reset');
  }
}

export class Router extends Component {
  state = {
    removed: false,
    action: 'push',
    stack: []
  }

  componentDidMount() {
    setTimeout(() => {
      const newStack = this.state.stack;
      newStack.push('home');
      this.setState({
        action: 'push',
        stack: newStack
      })
    }, 1000);
    setTimeout(() => {
      const newStack = this.state.stack;
      newStack.push('welcome');
      this.setState({
        action: 'push',
        stack: newStack
      })
    }, 2000);
    setTimeout(() => {
      this.setState({
        action: 'pop'
      })
    }, 3000);
  }

  _popScene() {
    const newStack = this.state.stack;
    newStack.pop();
    this.setState({
      action: null,
      stack: newStack
    });
  }

  _getAction(index) {
    let action = null;
    const nbScenes = this.state.stack.length;
    if (index === nbScenes - 1) {
      // Last scene
      action = this.state.action;
    } else if (index === nbScenes - 2) {
      // Before last scene
      if (this.state.action === 'push') {
        action = 'blur';
      } else if (this.state.action === 'pop') {
        action = 'focus';
      }
    }
    return action;
  }

  render() {
    console.log(this.state.stack);
    return (
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        {
          this.state.stack.map((routeName, index) => {
            const action = this._getAction(index);
            const RouteScreen = this.props.routes[routeName];
            return (
              <Scene key={index} action={action} onAminationDone={action => action === 'pop' ? this._popScene() : null}>
                <RouteScreen />
              </Scene>
            );
          })
        }
      </View>
    );
  }
}