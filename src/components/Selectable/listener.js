import { DeviceEventEmitter } from 'react-native';

let keyListener = null;

export default {
  isSame(listener) {
    return listener === keyListener;
  },
  get: () => keyListener,
  set(handler, listener) {
    if (!listener || !this.isSame(listener)) {
      if (keyListener) keyListener.remove();
      keyListener = DeviceEventEmitter.addListener('onKeyDown', handler);
      return keyListener;
    }

    return null;
  },
  remove(listener) {
    if (this.isSame(listener)) {
      keyListener.remove();
      keyListener = null;
    }
  },
};
