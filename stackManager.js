import React, {Component} from 'react';
import {View} from 'react-native';

class StackManager {
  _stack = []

  get stack() {
    return this._stack;
  }

  pop() {
    let current = this._stack[this._stack.length - 1];
    let previous = this._stack.length - 1 > 0 ? this._stack[this._stack.length - 2] : null;

    // Find animations
    if (current && previous) {
      current.getPopAnimation(previous);
      previous.getFocusAnimation(current);

      // Run animations and pop!
      this._stack.pop();
    }
    console.log('pop', this._stack);
  }

  push(screen) {
    let current = this._stack[this._stack.length - 1] || null;
    let next = screen;

    // Find animations
    if (current) {
      current.getBlurAnimation(next);
      next.getPushAnimation(current);
    }

    // Check actual screen + next screen's animation
    this._stack.push(screen);
    console.log('push', this._stack);
  }

  reset(screen) {
    if (screen) {
      this._stack = [screen];
    } else {
      this._stack = [this._stack[0]];
    }
    console.log('reset', this._stack);
  }
}

let stackManager = new StackManager();
export default stackManager;