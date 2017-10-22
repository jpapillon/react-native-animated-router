import React, {Component} from 'react';
import { View } from 'react-native';

import Scene from './Scene';
import AnimationManager from './AnimationManager';

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
    inst._queue.push({
      action: 'push',
      routeName,
      params
    });
    inst._triggerQueue();
  },

  pop() {
    const inst = RouterSingleton.getInstance();
    inst._queue.push({
      action: 'pop',
      routeName: inst.state.stack[inst.state.stack.length - 1].routeName
    });
    inst._triggerQueue();
  },

  reset(routeName, params) {
    const inst = RouterSingleton.getInstance();
    inst._queue.push({
      action: 'reset',
      routeName,
      params
    });
    inst._triggerQueue();
  }
}

export class Router extends Component {
  _animationManager = new AnimationManager(this.props.animations)

  state = {
    removed: false,
    action: 'push',
    stack: []
  }

  _queue = []

  _triggerQueue() {
    if (!this._updating && this._queue.length > 0) {
      let queuedAction = this._queue.shift();
      if (queuedAction.action === 'pop' && this.state.stack.length <= 1) {
        // Don't pop more last scene
        return;
      }

      this._executeAction(queuedAction.action, queuedAction.routeName ? queuedAction.routeName : null, queuedAction.params);
    } else {
      this._updating = false;
    }
  }

  constructor(props) {
    super(props);

    RouterSingleton.setInstance(this);
  }

  componentWillMount() {
    const newStack = this.state.stack;
    newStack.push({
      routeName: Object.keys(this.props.routes)[0]
    });
    this.setState({
      action: 'reset',
      stack: newStack
    });
  }

  _executeAction(action, routeName, params) {
    if (routeName && !this.props.routes[routeName]) {
      // Route does not exist
      return;
    }

    if (action === 'push') {
      const newStack = this.state.stack;
      newStack.push({
        routeName
      });
      this.setState({
        action: 'push',
        stack: newStack
      });
    } else if (action === 'pop') {
      this.setState({
        action: 'pop'
      });
    } else if (action === 'reset') {
      this.setState({
        action: 'reset',
        stack: routeName ? [{routeName}] : [this.state.stack[0]]
      })
    }
  }

  _removeAfterPop() {
    this._triggerAfterUpdate = true;
    const newStack = this.state.stack;
    newStack.pop();
    this.setState({
      action: 'focus',
      stack: newStack
    });
  }

  _getAction(index) {
    let action = null;
    const nbScenes = this.state.stack.length;
    if (index === nbScenes - 1) {
      // Last scene
      action = this.state.action;
    } else {
      // Other scenes
      if (index === nbScenes - 2 && this.state.action === 'pop') {
        action = 'focus';
      } else {
        action = 'blur';
      }
    }
    return action;
  }

  _getAnimation(index, action) {
    const nbScenes = this.state.stack.length;

    if (nbScenes > 1 && index >= nbScenes - 2) {
      // One of the last two scenes
      const prevLastRoute = this.state.stack[nbScenes - 2];
      const lastRoute = this.state.stack[nbScenes - 1];

      return this._animationManager.getAnimation(prevLastRoute.routeName, lastRoute.routeName, action);
    }

    return this._animationManager.getDefaultAnimation(action);
  }

  _onAnimationDone(index) {
    this.state.stack[index]._isReady = true;

    if (this.state.stack.every(route => route._isReady)) {
      // Every route has finished with the animation
      if (this.state.action === 'pop') {
        // Action was to pop the screen, pop it first and go
        this._removeAfterPop()
      } else {
        // Action was not 'pop', let's trigger now
        this._updating = false;
        this._triggerQueue();
      }
    }
  }

  componentWillUpdate() {
    this._updating = true;
  }

  componentDidUpdate() {
    if (this._updating && this._triggerAfterUpdate) {
      this._triggerAfterUpdate = false;
      this._updating = false;
      this._triggerQueue();
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {
          this.state.stack.map((route, index) => {
            route._isReady = false;
            const action = this._getAction(index);
            const animation = this._getAnimation(index, action);
            const RouteScreen = this.props.routes[route.routeName];
            return (
              <Scene
                key={index}
                action={action}
                routeName={route.routeName}
                animation={animation}
                onAnimationDone={action => {
                  this._onAnimationDone(index);
                }}
              >
                <RouteScreen />
              </Scene>
            );
          })
        }
      </View>
    );
  }
}