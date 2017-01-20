/* @flow */

import { DeviceEventEmitter } from 'react-native';

let keyListener = null;

export default {
  isSame(listener: Object) {
    return listener === keyListener;
  },
  get: () => keyListener,
  set(handler: ?Function, listener?: ?Object) {
    if (!listener || !this.isSame(listener)) {
      if (keyListener) keyListener.remove();
      keyListener = DeviceEventEmitter.addListener('onKeyDown', handler);
      return keyListener;
    }

    return null;
  },
  remove(listener: ?Object) {
    if (keyListener && this.isSame(listener)) {
      keyListener.remove();
      keyListener = null;
    }
  },
};
