import {Dimensions, Animated} from 'react-native';

const {width, height} = Dimensions.get('window');

const ANIMATION_CONFIG = {
  config: {
    duration: 250,
    fn: Animated.timing
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
      const scale = progress.interpolate({
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
      const scale = progress.interpolate({
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
    this._config = config;
    this._custom = config && config.custom || [];
  }

  getAnimation(fromRoute, toRoute, action) {
    if (!ANIMATION_CONFIG[action]) {
      // Unsupported action
      return null;
    }

    let config = ANIMATION_CONFIG.config;
    let fn = ANIMATION_CONFIG[action].fn;

    if (this._config) {
      // Check for defined default configs
      if (this._config.default) {
        if (this._config.default.config) {
          // Default configs were defined
          config = {...config, ...this._config.default.config};
        }

        if (this._config.default[action]) {
          if (this._config.default[action].config) {
            // Default action configs were defined
            config = {...config, ...this._config.default[action].config};
          }

          if (this._config.default[action].fn) {
            // Default action function was defined
            fn = this._config.default[action].fn;
          }
        }
      }

      // Check for specific custom configs
      const customConfig = this._custom.find(anim => (
        (anim.from === fromRoute && anim.to === toRoute)
      ));

      if (customConfig) {
        if (customConfig.config) {
          // General config was set for this custom config
          config = {...config, ...customConfig.config};
        }

        if (customConfig[action]) {
          if (customConfig[action].config) {
            // Custom action configs were defined
            config = {...config, ...customConfig[action].config};
          }

          if (customConfig[action].fn) {
            // Custom action function was defined
            fn = customConfig[action].fn;
          }
        }
      }
    }

    return {config, fn};
  }

  getDefaultAnimation(action) {
    return this._config[action];
  }
}