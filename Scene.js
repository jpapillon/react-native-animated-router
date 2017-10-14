import React, { Component } from 'react';
import {
  Animated,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
const ANIMATION_DURATION = 250;
export default class Scene extends Component {
  _progress = new Animated.Value(0)

  static defaultProps = {
    action: 'push',
    onAminationDone: () => {}
  }

  _launchIncrement(callback) {
    Animated.timing(this._progress, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        callback();
      }
    });
  }

  _launchDecrement(callback) {
    Animated.timing(this._progress, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true
    }).start(result => {
      if (result.finished) {
        callback();
      }
    });
  }

  _getPushAnimation() {
    const translateX = this._progress.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0],
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
      outputRange: [0.8, 1],
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
      outputRange: [width, 0],
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
      } else if (nextProps.action === 'reset') {
        this._progress.setValue(1);
        this.props.onAminationDone('reset');
      }
    }
  }

  componentDidMount() {
    if (this.props.action === 'reset') {
      this._progress.setValue(1);
      this.props.onAminationDone(this.props.action);
    } else {
      this._launchIncrement(() => this.props.onAminationDone(this.props.action));
    }
  }

  render() {
    return (
      <Animated.View style={[{position: 'absolute', width, height, backgroundColor: 'red'}, this._getAnimation()]}>
        {this.props.children}
      </Animated.View>
    );
  }
}