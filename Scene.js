import React, { Component } from 'react';
import {
  Animated,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
const DEFAULT_CONFIG = {
  duration: 250,
  useNativeDriver: true
};
export default class Scene extends Component {
  _progress = new Animated.Value(0)

  static defaultProps = {
    action: 'reset',
    onAnimationDone: () => {}
  }

  _launchIncrement(config, callback) {
    const animConfig = {...DEFAULT_CONFIG, ...config};

    let fn = Animated.timing;
    if (animConfig.fn) {
      fn = animConfig.fn;
    }

    fn(this._progress, {
      toValue: 1,
      ...animConfig
    }).start(result => {
      if (result.finished) {
        callback();
      }
    });
  }

  _launchDecrement(config, callback) {
    let animConfig = {...DEFAULT_CONFIG, ...config};

    let fn = Animated.timing;
    if (animConfig.fn) {
      fn = animConfig.fn;
    }

    fn(this._progress, {
      toValue: 0,
      ...animConfig
    }).start(result => {
      if (result.finished) {
        callback();
      }
    });
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
        this._launchDecrement(nextProps.animation.config, () => this.props.onAnimationDone('blur'));
      } else if (nextProps.action === 'focus') {
        this._launchIncrement(nextProps.animation.config, () => this.props.onAnimationDone('focus'));
      } else if (nextProps.action === 'pop' || nextProps.action === 'popModal') {
        this._launchDecrement(nextProps.animation.config, () => this.props.onAnimationDone(nextProps.action));
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
      this._launchIncrement(this.props.animation.config, () => this.props.onAnimationDone(this.props.action));
    }
  }

  render() {
    return (
      <Animated.View style={[{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}, this._getAnimation()]}>
        {this.props.children}
      </Animated.View>
    );
  }
}