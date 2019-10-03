import store from 'store';
/*
 * colorRand create colors Ramdon
 * Is a fuction global
 */
export default {
  validate: (position = false) => {
    if (store.get(position) == null) {
      return false;
    }
    return !navigator.onLine;
  },
  set: (position, data) => {
    return store.set(position, data);
  },
  get: position => {
    return store.get(position);
  },
};
