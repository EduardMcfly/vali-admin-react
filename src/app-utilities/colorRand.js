import mt_rand from './mt_rand';
/*
 * colorRand create colors Ramdon
 * Is a fuction global
 */
export default function colorRand() {
  var colors = [
    '#CC66CC',
    '#CC66FF',
    '#FF66FF',
    '#FF66CC',
    '#FF6699',
    '#FF6666',
    '#FF6633',
    '#FF6600',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#FF33FF',
    '#FF33CC',
    '#FF3399',
    '#FF3366',
    '#FF3333',
    '#FF3300',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#FF00FF',
    '#FF00CC',
    '#FF0099',
    '#FF0066',
    '#FF0033',
    '#FF0000',
    '#660000',
    '#660033',
    '#660066',
    '#660099',
    '#6600CC',
    '#6600FF',
    '#9900FF',
    '#9900CC',
    '#990099',
    '#990066',
    '#990033',
    '#990000',
    '#663300',
    '#663333',
    '#663366',
    '#663399',
    '#6633CC',
    '#6633FF',
    '#9933FF',
    '#9933CC',
    '#993399',
    '#993366',
    '#993333',
    '#993300',
    '#666600',
    '#666633',
    '#666666',
    '#666699',
    '#6666CC',
    '#6666FF',
    '#9966FF',
    '#9966CC',
    '#996699',
    '#996666',
    '#996633',
    '#996600',
    '#669900',
    '#669933',
    '#669966',
    '#669999',
    '#6699CC',
    '#6699FF',
    '#9999FF',
    '#9999CC',
    '#999999',
    '#999966',
    '#999933',
    '#999900',
    '#66CC00',
    '#66CC33',
    '#66CC66',
    '#66CC99',
    '#66CCCC',
    '#66CCFF',
    '#99CCFF',
    '#99CCCC',
    '#DCDCDC',
    '#D3D3D3',
    '#C0C0C0',
    '#A9A9A9',
    '#808080',
    '#696969',
    '#778899',
    '#708090',
    '#2F4F4F',
    '#000000',
  ];
  return colors[mt_rand(0, colors.length - 1)];
}