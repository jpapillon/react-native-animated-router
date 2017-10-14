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
    action: 'reset',
    onAnimationDone: () => {}
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
    if (this.props.animation && this.props.animation.fn) {
      // Use given transition animation
      return this.props.animation.fn(this._progress);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.action) {
      if (nextProps.action === 'blur') {
        this._launchDecrement(() => this.props.onAnimationDone('blur'));
      } else if (nextProps.action === 'focus') {
        this._launchIncrement(() => this.props.onAnimationDone('focus'));
      } else if (nextProps.action === 'pop') {
        this._launchDecrement(() => this.props.onAnimationDone('pop'));
      } else if (nextProps.action === 'reset') {
        this._progress.setValue(1);
        this.props.onAnimationDone('reset');
      }
    }
  }

  componentDidMount() {
    if (this.props.action === 'reset') {
      this._progress.setValue(1);
      this.props.onAnimationDone(this.props.action);
    } else {
      this._launchIncrement(() => this.props.onAnimationDone(this.props.action));
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