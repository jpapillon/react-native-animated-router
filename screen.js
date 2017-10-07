export default class Screen {
  position = 0
  animationIn = 'default'
  animationOut = 'default'

  constructor(name, rules) {
    this._name = name;
    this._rules = rules;
  }

  get name() {
    return this._name;
  }

  getPopAnimation(otherScreen) {
    // screen is popped and otherScreen will be shown
    return 'pop' + this.name + ' and show ' + otherScreen.name;
  }

  getPushAnimation(otherScreen) {
    // screen is pushed over otherScreen
    return 'push ' + this.name + ' over ' + otherScreen.name;
  }

  getFocusAnimation(otherScreen) {
    // otherScreen popped!
    return 'focus ' + this.name + ' from ' + otherScreen.name;
  }

  getBlurAnimation(otherScreen) {
    // otherScreen was pushed
    return 'blur ' + this.name + '  ' + otherScreen.name;
  }
}