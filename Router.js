import React, {Component} from 'react';
import { View } from 'react-native';

import Screen from './screen';
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

    inst.setState({
      stack: stackManager.stack
    });
  },

  pop() {
    const inst = RouterSingleton.getInstance();
    stackManager.pop();

    inst.setState({
      stack: stackManager.stack
    });
  },

  reset(routeName, params) {
    const inst = RouterSingleton.getInstance();
    stackManager.reset(routeName ? new Screen(routeName, params) : null);

    inst.setState({
      stack: stackManager.stack
    });
  }
}

export class Router extends Component {
  _routes = {}

  state = {
    stack: []
  }

  constructor(props) {
    super(props);

    this._routes = props.routes;

    RouterSingleton.setInstance(this);
  }

  componentWillMount() {
    const routes = this._routes;

    // Put initial route on the stack
    const attr = this.props.initialRoute || Object.keys(routes)[0];

    console.log(attr);
    stackManager.reset(new Screen(attr, {}));

    this.setState({
      stack: stackManager.stack
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'pink'}}>
        {this.state.stack.map((screen, index) => {
          const ScreenView = this._routes[screen.name];
          return (
            <View key={screen.name + index} style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
              <ScreenView />
            </View>
          );
        })}
      </View>
    );
  }
}