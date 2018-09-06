import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    // Global settings
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll

    // Settings that can be overriden on per-element basis, by `data-aos-*` attributes:
    offset: 70, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 100, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});
/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */


window.swal = require("sweetalert2");

/* window._ = require('lodash')
window.Popper = require('popper.js').default
try {
    window.$ = window.jQuery = require('jquery')

    require('bootstrap')
} catch (e) {} */

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios')

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]')

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token')
}

/*
 * mt_rand is equal to mt_rand of PHP
 */
window.mt_rand = function mt_rand(min, max) {
    var argc = arguments.length
    if (argc === 0) {
        min = 0
        max = 2147483647
    } else if (argc === 1) {
        throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given')
    } else {
        min = parseInt(min, 10)
        max = parseInt(max, 10)
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
}
/*
 * colorRand create colors Ramdon
 * Is a fuction global
 */
window.colorRand = function colorRand() {
    var colors = ['#CC66CC', '#CC66FF', '#FF66FF', '#FF66CC', '#FF6699', '#FF6666', '#FF6633', '#FF6600', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#FF33FF', '#FF33CC', '#FF3399', '#FF3366', '#FF3333', '#FF3300', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#FF00FF', '#FF00CC', '#FF0099', '#FF0066', '#FF0033', '#FF0000', '#660000', '#660033', '#660066', '#660099', '#6600CC', '#6600FF', '#9900FF', '#9900CC', '#990099', '#990066', '#990033', '#990000', '#663300', '#663333', '#663366', '#663399', '#6633CC', '#6633FF', '#9933FF', '#9933CC', '#993399', '#993366', '#993333', '#993300', '#666600', '#666633', '#666666', '#666699', '#6666CC', '#6666FF', '#9966FF', '#9966CC', '#996699', '#996666', '#996633', '#996600', '#669900', '#669933', '#669966', '#669999', '#6699CC', '#6699FF', '#9999FF', '#9999CC', '#999999', '#999966', '#999933', '#999900', '#66CC00', '#66CC33', '#66CC66', '#66CC99', '#66CCCC', '#66CCFF', '#99CCFF', '#99CCCC', '#DCDCDC', '#D3D3D3', '#C0C0C0', '#A9A9A9', '#808080', '#696969', '#778899', '#708090', '#2F4F4F', '#000000']
    return colors[mt_rand(0, colors.length - 1)]
}



window.equals = function () {

  var innerEquiv; // the real equiv function
  var callers = []; // stack to decide between skip/abort functions
  var parents = []; // stack to avoiding loops from circular referencing
  // Call the o related callback with the given arguments.

  function bindCallbacks(o, callbacks, args) {
    var prop = toType(o);
    if (prop) {
      if (toType(callbacks[prop]) === "function") {
        return callbacks[prop].apply(callbacks, args);
      } else {
        return callbacks[prop]; // or undefined
      }
    }
  }

  var callbacks = function () {

    // for string, boolean, number and null

    function useStrictEquality(b, a) {
      if (b instanceof a.constructor || a instanceof b.constructor) {
        // to catch short annotaion VS 'new' annotation of a
        // declaration
        // e.g. var i = 1;
        // var j = new Number(1);
        return a == b;
      } else {
        return a === b;
      }
    }

    return {
      "string": useStrictEquality,
      "boolean": useStrictEquality,
      "number": useStrictEquality,
      "null": useStrictEquality,
      "undefined": useStrictEquality,

      "nan": function (b) {
        return isNaN(b);
      },

      "date": function (b, a) {
        return QUnit.toType(b) === "date" && a.valueOf() === b.valueOf();
      },

      "regexp": function (b, a) {
        return QUnit.toType(b) === "regexp" && a.source === b.source && // the regex itself
        a.global === b.global && // and its modifers
        // (gmi) ...
        a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
      },

      // - skip when the property is a method of an instance (OOP)
      // - abort otherwise,
      // initial === would have catch identical references anyway
      "function": function () {
        var caller = callers[callers.length - 1];
        return caller !== Object && typeof caller !== "undefined";
      },

      "array": function (b, a) {
        var i, j, loop;
        var len;

        // b could be an object literal here
        if (!(toType(b) === "array")) {
          return false;
        }

        len = a.length;
        if (len !== b.length) { // safe and faster
          return false;
        }

        // track reference to avoid circular references
        parents.push(a);
        for (i = 0; i < len; i++) {
          loop = false;
          for (j = 0; j < parents.length; j++) {
            if (parents[j] === a[i]) {
              loop = true; // dont rewalk array
            }
          }
          if (!loop && !innerEquiv(a[i], b[i])) {
            parents.pop();
            return false;
          }
        }
        parents.pop();
        return true;
      },

      "object": function (b, a) {
        var i, j, loop;
        var eq = true; // unless we can proove it
        var aProperties = [],
          bProperties = []; // collection of
        // strings
        // comparing constructors is more strict than using
        // instanceof
        if (a.constructor !== b.constructor) {
          return false;
        }

        // stack constructor before traversing properties
        callers.push(a.constructor);
        // track reference to avoid circular references
        parents.push(a);

        for (i in a) { // be strict: don't ensures hasOwnProperty
          // and go deep
          loop = false;
          for (j = 0; j < parents.length; j++) {
            if (parents[j] === a[i]) loop = true; // don't go down the same path
            // twice
          }
          aProperties.push(i); // collect a's properties
          if (!loop && !innerEquiv(a[i], b[i])) {
            eq = false;
            break;
          }
        }

        callers.pop(); // unstack, we are done
        parents.pop();

        for (i in b) {
          bProperties.push(i); // collect b's properties
        }

        // Ensures identical properties name
        return eq && innerEquiv(aProperties.sort(), bProperties.sort());
      }
    };
  }();

  innerEquiv = function () { // can take multiple arguments
    var args = Array.prototype.slice.apply(arguments);
    if (args.length < 2) {
      return true; // end transition
    }

    return (function (a, b) {
      if (a === b) {
        return true; // catch the most you can
      } else if (a === null || b === null || typeof a === "undefined" || typeof b === "undefined" || toType(a) !== toType(b)) {
        return false; // don't lose time with error prone cases
      } else {
        return bindCallbacks(a, callbacks, [b, a]);
      }

      // apply transition with (1..n) arguments
    })(args[0], args[1]) && arguments.callee.apply(this, args.splice(1, args.length - 1));
  };

  return innerEquiv;

}();
