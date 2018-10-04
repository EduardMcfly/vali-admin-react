/**
 *
 * @param {Int} time
 *
 * @return {Array}
 */

export default function timerConverter(time) {
    var time = Number(time);
    var d = Math.floor((time / 3600) * 24);
    var h = Math.floor(time / 3600);
    var m = Math.floor((time % 3600) / 60);
    var s = Math.floor((time % 3600) % 60);

    var dDisplay = d > 0 ? ['day', d] : false;
    var hDisplay = h > 0 ? ['hour', h] : false;
    var mDisplay = m > 0 ? ['minute', m] : false;
    var sDisplay = s > 0 ? ['second', s] : false;
    return dDisplay ? dDisplay : hDisplay ? hDisplay : mDisplay ? mDisplay : sDisplay;
}
