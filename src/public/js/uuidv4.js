// This is taken from https://wzrd.in/standalone/uuid%2Fv4@latest
// We copy it here because we need something that will run in a browser, and
// we're not pulling in a bundling solution like Webpack.

/* eslint-disable */
!(function(e) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = e()
  else if ('function' == typeof define && define.amd) define([], e)
  else {
    var n
    ;(n =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof self ? self : this),
      (n.uuidv4 = e())
  }
})(function() {
  return (function e(n, r, o) {
    function t(f, u) {
      if (!r[f]) {
        if (!n[f]) {
          var a = 'function' == typeof require && require
          if (!u && a) return a(f, !0)
          if (i) return i(f, !0)
          var d = new Error("Cannot find module '" + f + "'")
          throw ((d.code = 'MODULE_NOT_FOUND'), d)
        }
        var p = (r[f] = { exports: {} })
        n[f][0].call(
          p.exports,
          function(e) {
            var r = n[f][1][e]
            return t(r ? r : e)
          },
          p,
          p.exports,
          e,
          n,
          r,
          o,
        )
      }
      return r[f].exports
    }
    for (
      var i = 'function' == typeof require && require, f = 0;
      f < o.length;
      f++
    )
      t(o[f])
    return t
  })(
    {
      1: [
        function(e, n, r) {
          function o(e, n) {
            var r = n || 0,
              o = t
            return [
              o[e[r++]],
              o[e[r++]],
              o[e[r++]],
              o[e[r++]],
              '-',
              o[e[r++]],
              o[e[r++]],
              '-',
              o[e[r++]],
              o[e[r++]],
              '-',
              o[e[r++]],
              o[e[r++]],
              '-',
              o[e[r++]],
              o[e[r++]],
              o[e[r++]],
              o[e[r++]],
              o[e[r++]],
              o[e[r++]],
            ].join('')
          }
          for (var t = [], i = 0; i < 256; ++i)
            t[i] = (i + 256).toString(16).substr(1)
          n.exports = o
        },
        {},
      ],
      2: [
        function(e, n, r) {
          var o =
            ('undefined' != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            ('undefined' != typeof msCrypto &&
              'function' == typeof window.msCrypto.getRandomValues &&
              msCrypto.getRandomValues.bind(msCrypto))
          if (o) {
            var t = new Uint8Array(16)
            n.exports = function() {
              return o(t), t
            }
          } else {
            var i = new Array(16)
            n.exports = function() {
              for (var e, n = 0; n < 16; n++)
                0 === (3 & n) && (e = 4294967296 * Math.random()),
                  (i[n] = (e >>> ((3 & n) << 3)) & 255)
              return i
            }
          }
        },
        {},
      ],
      3: [
        function(e, n, r) {
          function o(e, n, r) {
            var o = (n && r) || 0
            'string' == typeof e &&
              ((n = 'binary' === e ? new Array(16) : null), (e = null)),
              (e = e || {})
            var f = e.random || (e.rng || t)()
            if (((f[6] = (15 & f[6]) | 64), (f[8] = (63 & f[8]) | 128), n))
              for (var u = 0; u < 16; ++u) n[o + u] = f[u]
            return n || i(f)
          }
          var t = e('./lib/rng'),
            i = e('./lib/bytesToUuid')
          n.exports = o
        },
        { './lib/bytesToUuid': 1, './lib/rng': 2 },
      ],
    },
    {},
    [3],
  )(3)
})
/* eslint-enable */
