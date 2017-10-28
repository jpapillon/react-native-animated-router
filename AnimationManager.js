import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const ANIMATION_CONFIG = {
  config: {
    duration: 250
  },

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
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1],
      });

      return {
        transform: [{
          scale
        }]
      }
    }
  },

  focus: {
    fn: progress => {
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.8, 1],
      });

      return {
        transform: [{
          scale
        }]
      }
    }
  },

  pop: {
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

  modal: {
    fn: progress => {
      const translateY = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
      });

      return {
        transform: [{
          translateY
        }]
      }
    }
  },

  popModal: {
    fn: progress => {
      const translateY = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
      });

      return {
        transform: [{
          translateY
        }]
      }
    }
  }
};

export default class AnimationManager {
  constructor(config) {
    const defaultConfig = (config && config.default) || {};
    this._defaultConfig = {...ANIMATION_CONFIG, ...defaultConfig};
    this._customConfig = (config && config.custom) || [];
  }

  getAnimation(fromRoute, toRoute, action) {
    let config = this._defaultConfig.config;
    if (this._defaultConfig[action] && this._defaultConfig[action].config) {
      config = {...config, ...this._defaultConfig[action].config};
    }

    // Get custom animation
    let animationConfig = this._customConfig.find(anim => (
      (anim.from === fromRoute && anim.to === toRoute && anim[action])
    ));

    // Use custom config base configuration
    if (this._customConfig.config) {
      config = {...config, ...this._customConfig.config};
    }

    if (!animationConfig) {
      // No custom animation found, get the default ones from the given config
      animationConfig = this._defaultConfig;
    }

    if (animationConfig.config) {
      config = {...config, ...animationConfig.config};
    }

    let animation = animationConfig[action];
    if (animation && animation.config) {
      config = {...config, ...animation.config};
    }

    if (animation) {
      animation.config = config;
    }

    return animation;
  }

  getDefaultAnimation(action) {
    return this._defaultConfig[action];
  }
}