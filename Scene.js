import React, { Component } from 'react';
import {
  Animated,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class Scene extends Component {
  _progress = new Animated.Value(0)

  static defaultProps = {
    action: 'push',
    onAminationDone: () => {}
  }

  _launchIncrement(callback) {
    Animated.timing(this._progress, {
      toValue: 1,
      useNativeDriver: true
    }).start(callback);
  }

  _launchDecrement(callback) {
    Animated.timing(this._progress, {
      toValue: 0,
      useNativeDriver: true
    }).start(callback);
  }

  _getPushAnimation() {
    const translateX = this._progress.interpolate({
      inputRange: [0, 1],
      outputRange: [width/2, 0],
    });

    return {
      transform: [{
        translateX
      }]
    }
  }

  _getBlurAnimation() {
    const scale = this._progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    return {
      transform: [{
        scale
      }]
    }
  }

  _getFocusAnimation() {
    const scale = this._progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.2, 1],
    });

    return {
      transform: [{
        scale
      }]
    }
  }

  _getPopAnimation() {
    const translateX = this._progress.interpolate({
      inputRange: [0, 1],
      outputRange: [width/2, 0],
    });

    return {
      transform: [{
        translateX
      }]
    }
  }

  _getAnimation() {
    switch (this.props.action) {
      case 'push':
        return this._getPushAnimation();
      break;
      case 'blur':
        return this._getBlurAnimation();
      break;
      case 'focus':
        return this._getFocusAnimation();
      break;
      case 'pop':
        return this._getPopAnimation();
      break;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.action) {
      if (nextProps.action === 'blur') {
        this._launchDecrement(() => this.props.onAminationDone('blur'));
      } else if (nextProps.action === 'focus') {
        this._launchIncrement(() => this.props.onAminationDone('focus'));
      } else if (nextProps.action === 'pop') {
        this._launchDecrement(() => this.props.onAminationDone('pop'));
      }
    }
  }

  componentWillMount() {
    this._launchIncrement(() => this.props.onAminationDone('push'));
  }

  render() {
    return (
      <Animated.View style={[{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}, this._getAnimation()]}>
        {this.props.children}
      </Animated.View>
    );
  }
}