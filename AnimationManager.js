const animationConfig = {
  push() {
    const translateX = this._progress.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0],
    });

    return {
      transform: [{
        translateX
      }]
    }
  },

  blur() {
    const scale = this._progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    return {
      transform: [{
        scale
      }]
    }
  },

  focus() {
    const scale = this._progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 1],
    });

    return {
      transform: [{
        scale
      }]
    }
  },

  pop() {
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
};

export default class AnimationManager {
  constructor(config) {
    this._defaultConfig = Object.assign({}, animationConfig, (config && config.default) || {});
    this._customConfig = (config && config.custom) || [];
  }

  getAnimation(fromRoute, toRoute, action) {
    // Get custom animation
    let animationConfig = this._customConfig.find(anim => (
      (anim.from === fromRoute && anim.to === toRoute && anim[action])
    ));

    if (!animationConfig) {
      // No custom animation found, get the default ones from the given config
      animationConfig = this._defaultConfig;
    }

    return animationConfig[action];
  }

  getDefaultAnimation(action) {
    return this._defaultConfig[action];
  }
}