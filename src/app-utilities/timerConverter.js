/**
 *
 * @param {Int} time
 *
 * @return {Array}
 */

export default function timerConverter(time) {
  var t = Number(time);

  function mF(data) {
    return Math.floor(data);
  }
  function vD(time) {
    return mF(time) > 0 ? mF(time) : false;
  }
  var timer = {
    d: () => {
      return ['day', mF(vD(t / 3600) * 24)];
    },
    h: () => {
      return ['hour', mF(vD(t / 3600))];
    },
    m: () => {
      return ['minute', mF(vD(t % 3600) / 60)];
    },
    s: () => {
      return ['second', mF(vD(t % 3600) % 60)];
    },
  };
  return timer.d()[1]
    ? timer.d()
    : timer.h()[1]
    ? timer.h()
    : timer.m()[1]
    ? timer.m()
    : timer.s();
}
