"bundle";
System.registerDynamic("npm:raphael@2.2.7.json", [], true, function() {
  return {
    "main": "raphael.min.js",
    "format": "global",
    "meta": {
      "*.json": {
        "format": "json"
      },
      ".eslintrc.js": {
        "globals": {
          "process": null
        }
      },
      "Gruntfile.js": {
        "globals": {
          "process": null
        }
      },
      "dev/*": {
        "globals": {
          "process": null
        }
      },
      "license.txt": {
        "globals": {
          "process": null
        }
      },
      "raphael.js": {
        "globals": {
          "process": null
        }
      },
      "raphael.min.js": {
        "globals": {
          "process": null
        }
      },
      "raphael.no-deps.js": {
        "globals": {
          "process": null
        }
      },
      "raphael.no-deps.min.js": {
        "globals": {
          "process": null
        }
      },
      "webpack.config.js": {
        "globals": {
          "process": null
        }
      },
      "yarn.lock": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic("npm:raphael@2.2.7/raphael.min.js", [], false, function ($__require, $__exports, $__module) {
  var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

  (function ($__global) {
    !function t(e, r) {
      "object" == typeof exports && "object" == typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define([], r) : "object" == typeof exports ? exports.Raphael = r() : e.Raphael = r();
    }(this, function () {
      return function (t) {
        function e(i) {
          if (r[i]) return r[i].exports;var n = r[i] = { exports: {}, id: i, loaded: !1 };return t[i].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports;
        }var r = {};return e.m = t, e.c = r, e.p = "", e(0);
      }([function (t, e, r) {
        var i, n;i = [r(1), r(3), r(4)], n = function (t) {
          return t;
        }.apply(e, i), !(void 0 !== n && (t.exports = n));
      }, function (t, e, r) {
        var i, n;i = [r(2)], n = function (t) {
          function e(r) {
            if (e.is(r, "function")) return w ? r() : t.on("raphael.DOMload", r);if (e.is(r, Q)) return e._engine.create[z](e, r.splice(0, 3 + e.is(r[0], $))).add(r);var i = Array.prototype.slice.call(arguments, 0);if (e.is(i[i.length - 1], "function")) {
              var n = i.pop();return w ? n.call(e._engine.create[z](e, i)) : t.on("raphael.DOMload", function () {
                n.call(e._engine.create[z](e, i));
              });
            }return e._engine.create[z](e, arguments);
          }function r(t) {
            if ("function" == typeof t || Object(t) !== t) return t;var e = new t.constructor();for (var i in t) t[A](i) && (e[i] = r(t[i]));return e;
          }function i(t, e) {
            for (var r = 0, i = t.length; r < i; r++) if (t[r] === e) return t.push(t.splice(r, 1)[0]);
          }function n(t, e, r) {
            function n() {
              var a = Array.prototype.slice.call(arguments, 0),
                  s = a.join("␀"),
                  o = n.cache = n.cache || {},
                  l = n.count = n.count || [];return o[A](s) ? (i(l, s), r ? r(o[s]) : o[s]) : (l.length >= 1e3 && delete o[l.shift()], l.push(s), o[s] = t[z](e, a), r ? r(o[s]) : o[s]);
            }return n;
          }function a() {
            return this.hex;
          }function s(t, e) {
            for (var r = [], i = 0, n = t.length; n - 2 * !e > i; i += 2) {
              var a = [{ x: +t[i - 2], y: +t[i - 1] }, { x: +t[i], y: +t[i + 1] }, { x: +t[i + 2], y: +t[i + 3] }, { x: +t[i + 4], y: +t[i + 5] }];e ? i ? n - 4 == i ? a[3] = { x: +t[0], y: +t[1] } : n - 2 == i && (a[2] = { x: +t[0], y: +t[1] }, a[3] = { x: +t[2], y: +t[3] }) : a[0] = { x: +t[n - 2], y: +t[n - 1] } : n - 4 == i ? a[3] = a[2] : i || (a[0] = { x: +t[i], y: +t[i + 1] }), r.push(["C", (-a[0].x + 6 * a[1].x + a[2].x) / 6, (-a[0].y + 6 * a[1].y + a[2].y) / 6, (a[1].x + 6 * a[2].x - a[3].x) / 6, (a[1].y + 6 * a[2].y - a[3].y) / 6, a[2].x, a[2].y]);
            }return r;
          }function o(t, e, r, i, n) {
            var a = -3 * e + 9 * r - 9 * i + 3 * n,
                s = t * a + 6 * e - 12 * r + 6 * i;return t * s - 3 * e + 3 * r;
          }function l(t, e, r, i, n, a, s, l, h) {
            null == h && (h = 1), h = h > 1 ? 1 : h < 0 ? 0 : h;for (var u = h / 2, c = 12, f = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], p = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], d = 0, g = 0; g < c; g++) {
              var v = u * f[g] + u,
                  x = o(v, t, r, n, s),
                  y = o(v, e, i, a, l),
                  m = x * x + y * y;d += p[g] * Y.sqrt(m);
            }return u * d;
          }function h(t, e, r, i, n, a, s, o, h) {
            if (!(h < 0 || l(t, e, r, i, n, a, s, o) < h)) {
              var u = 1,
                  c = u / 2,
                  f = u - c,
                  p,
                  d = .01;for (p = l(t, e, r, i, n, a, s, o, f); H(p - h) > d;) c /= 2, f += (p < h ? 1 : -1) * c, p = l(t, e, r, i, n, a, s, o, f);return f;
            }
          }function u(t, e, r, i, n, a, s, o) {
            if (!(W(t, r) < G(n, s) || G(t, r) > W(n, s) || W(e, i) < G(a, o) || G(e, i) > W(a, o))) {
              var l = (t * i - e * r) * (n - s) - (t - r) * (n * o - a * s),
                  h = (t * i - e * r) * (a - o) - (e - i) * (n * o - a * s),
                  u = (t - r) * (a - o) - (e - i) * (n - s);if (u) {
                var c = l / u,
                    f = h / u,
                    p = +c.toFixed(2),
                    d = +f.toFixed(2);if (!(p < +G(t, r).toFixed(2) || p > +W(t, r).toFixed(2) || p < +G(n, s).toFixed(2) || p > +W(n, s).toFixed(2) || d < +G(e, i).toFixed(2) || d > +W(e, i).toFixed(2) || d < +G(a, o).toFixed(2) || d > +W(a, o).toFixed(2))) return { x: c, y: f };
              }
            }
          }function c(t, e) {
            return p(t, e);
          }function f(t, e) {
            return p(t, e, 1);
          }function p(t, r, i) {
            var n = e.bezierBBox(t),
                a = e.bezierBBox(r);if (!e.isBBoxIntersect(n, a)) return i ? 0 : [];for (var s = l.apply(0, t), o = l.apply(0, r), h = W(~~(s / 5), 1), c = W(~~(o / 5), 1), f = [], p = [], d = {}, g = i ? 0 : [], v = 0; v < h + 1; v++) {
              var x = e.findDotsAtSegment.apply(e, t.concat(v / h));f.push({ x: x.x, y: x.y, t: v / h });
            }for (v = 0; v < c + 1; v++) x = e.findDotsAtSegment.apply(e, r.concat(v / c)), p.push({ x: x.x, y: x.y, t: v / c });for (v = 0; v < h; v++) for (var y = 0; y < c; y++) {
              var m = f[v],
                  b = f[v + 1],
                  _ = p[y],
                  w = p[y + 1],
                  k = H(b.x - m.x) < .001 ? "y" : "x",
                  B = H(w.x - _.x) < .001 ? "y" : "x",
                  C = u(m.x, m.y, b.x, b.y, _.x, _.y, w.x, w.y);if (C) {
                if (d[C.x.toFixed(4)] == C.y.toFixed(4)) continue;d[C.x.toFixed(4)] = C.y.toFixed(4);var S = m.t + H((C[k] - m[k]) / (b[k] - m[k])) * (b.t - m.t),
                    A = _.t + H((C[B] - _[B]) / (w[B] - _[B])) * (w.t - _.t);S >= 0 && S <= 1.001 && A >= 0 && A <= 1.001 && (i ? g++ : g.push({ x: C.x, y: C.y, t1: G(S, 1), t2: G(A, 1) }));
              }
            }return g;
          }function d(t, r, i) {
            t = e._path2curve(t), r = e._path2curve(r);for (var n, a, s, o, l, h, u, c, f, d, g = i ? 0 : [], v = 0, x = t.length; v < x; v++) {
              var y = t[v];if ("M" == y[0]) n = l = y[1], a = h = y[2];else {
                "C" == y[0] ? (f = [n, a].concat(y.slice(1)), n = f[6], a = f[7]) : (f = [n, a, n, a, l, h, l, h], n = l, a = h);for (var m = 0, b = r.length; m < b; m++) {
                  var _ = r[m];if ("M" == _[0]) s = u = _[1], o = c = _[2];else {
                    "C" == _[0] ? (d = [s, o].concat(_.slice(1)), s = d[6], o = d[7]) : (d = [s, o, s, o, u, c, u, c], s = u, o = c);var w = p(f, d, i);if (i) g += w;else {
                      for (var k = 0, B = w.length; k < B; k++) w[k].segment1 = v, w[k].segment2 = m, w[k].bez1 = f, w[k].bez2 = d;g = g.concat(w);
                    }
                  }
                }
              }
            }return g;
          }function g(t, e, r, i, n, a) {
            null != t ? (this.a = +t, this.b = +e, this.c = +r, this.d = +i, this.e = +n, this.f = +a) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0);
          }function v() {
            return this.x + j + this.y;
          }function x() {
            return this.x + j + this.y + j + this.width + " × " + this.height;
          }function y(t, e, r, i, n, a) {
            function s(t) {
              return ((c * t + u) * t + h) * t;
            }function o(t, e) {
              var r = l(t, e);return ((d * r + p) * r + f) * r;
            }function l(t, e) {
              var r, i, n, a, o, l;for (n = t, l = 0; l < 8; l++) {
                if (a = s(n) - t, H(a) < e) return n;if (o = (3 * c * n + 2 * u) * n + h, H(o) < 1e-6) break;n -= a / o;
              }if (r = 0, i = 1, n = t, n < r) return r;if (n > i) return i;for (; r < i;) {
                if (a = s(n), H(a - t) < e) return n;t > a ? r = n : i = n, n = (i - r) / 2 + r;
              }return n;
            }var h = 3 * e,
                u = 3 * (i - e) - h,
                c = 1 - h - u,
                f = 3 * r,
                p = 3 * (n - r) - f,
                d = 1 - f - p;return o(t, 1 / (200 * a));
          }function m(t, e) {
            var r = [],
                i = {};if (this.ms = e, this.times = 1, t) {
              for (var n in t) t[A](n) && (i[ht(n)] = t[n], r.push(ht(n)));r.sort(Bt);
            }this.anim = i, this.top = r[r.length - 1], this.percents = r;
          }function b(r, i, n, a, s, o) {
            n = ht(n);var l,
                h,
                u,
                c = [],
                f,
                p,
                d,
                v = r.ms,
                x = {},
                m = {},
                b = {};if (a) for (w = 0, B = Ee.length; w < B; w++) {
              var _ = Ee[w];if (_.el.id == i.id && _.anim == r) {
                _.percent != n ? (Ee.splice(w, 1), u = 1) : h = _, i.attr(_.totalOrigin);break;
              }
            } else a = +m;for (var w = 0, B = r.percents.length; w < B; w++) {
              if (r.percents[w] == n || r.percents[w] > a * r.top) {
                n = r.percents[w], p = r.percents[w - 1] || 0, v = v / r.top * (n - p), f = r.percents[w + 1], l = r.anim[n];break;
              }a && i.attr(r.anim[r.percents[w]]);
            }if (l) {
              if (h) h.initstatus = a, h.start = new Date() - h.ms * a;else {
                for (var C in l) if (l[A](C) && (pt[A](C) || i.paper.customAttributes[A](C))) switch (x[C] = i.attr(C), null == x[C] && (x[C] = ft[C]), m[C] = l[C], pt[C]) {case $:
                    b[C] = (m[C] - x[C]) / v;break;case "colour":
                    x[C] = e.getRGB(x[C]);var S = e.getRGB(m[C]);b[C] = { r: (S.r - x[C].r) / v, g: (S.g - x[C].g) / v, b: (S.b - x[C].b) / v };break;case "path":
                    var T = Qt(x[C], m[C]),
                        E = T[1];for (x[C] = T[0], b[C] = [], w = 0, B = x[C].length; w < B; w++) {
                      b[C][w] = [0];for (var M = 1, N = x[C][w].length; M < N; M++) b[C][w][M] = (E[w][M] - x[C][w][M]) / v;
                    }break;case "transform":
                    var L = i._,
                        z = le(L[C], m[C]);if (z) for (x[C] = z.from, m[C] = z.to, b[C] = [], b[C].real = !0, w = 0, B = x[C].length; w < B; w++) for (b[C][w] = [x[C][w][0]], M = 1, N = x[C][w].length; M < N; M++) b[C][w][M] = (m[C][w][M] - x[C][w][M]) / v;else {
                      var F = i.matrix || new g(),
                          R = { _: { transform: L.transform }, getBBox: function () {
                          return i.getBBox(1);
                        } };x[C] = [F.a, F.b, F.c, F.d, F.e, F.f], se(R, m[C]), m[C] = R._.transform, b[C] = [(R.matrix.a - F.a) / v, (R.matrix.b - F.b) / v, (R.matrix.c - F.c) / v, (R.matrix.d - F.d) / v, (R.matrix.e - F.e) / v, (R.matrix.f - F.f) / v];
                    }break;case "csv":
                    var j = I(l[C])[q](k),
                        D = I(x[C])[q](k);if ("clip-rect" == C) for (x[C] = D, b[C] = [], w = D.length; w--;) b[C][w] = (j[w] - x[C][w]) / v;m[C] = j;break;default:
                    for (j = [][P](l[C]), D = [][P](x[C]), b[C] = [], w = i.paper.customAttributes[C].length; w--;) b[C][w] = ((j[w] || 0) - (D[w] || 0)) / v;}var V = l.easing,
                    O = e.easing_formulas[V];if (!O) if (O = I(V).match(st), O && 5 == O.length) {
                  var Y = O;O = function (t) {
                    return y(t, +Y[1], +Y[2], +Y[3], +Y[4], v);
                  };
                } else O = St;if (d = l.start || r.start || +new Date(), _ = { anim: r, percent: n, timestamp: d, start: d + (r.del || 0), status: 0, initstatus: a || 0, stop: !1, ms: v, easing: O, from: x, diff: b, to: m, el: i, callback: l.callback, prev: p, next: f, repeat: o || r.times, origin: i.attr(), totalOrigin: s }, Ee.push(_), a && !h && !u && (_.stop = !0, _.start = new Date() - v * a, 1 == Ee.length)) return Ne();u && (_.start = new Date() - _.ms * a), 1 == Ee.length && Me(Ne);
              }t("raphael.anim.start." + i.id, i, r);
            }
          }function _(t) {
            for (var e = 0; e < Ee.length; e++) Ee[e].el.paper == t && Ee.splice(e--, 1);
          }e.version = "2.2.0", e.eve = t;var w,
              k = /[, ]+/,
              B = { circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1 },
              C = /\{(\d+)\}/g,
              S = "prototype",
              A = "hasOwnProperty",
              T = { doc: document, win: window },
              E = { was: Object.prototype[A].call(T.win, "Raphael"), is: T.win.Raphael },
              M = function () {
            this.ca = this.customAttributes = {};
          },
              N,
              L = "appendChild",
              z = "apply",
              P = "concat",
              F = "ontouchstart" in T.win || T.win.DocumentTouch && T.doc instanceof DocumentTouch,
              R = "",
              j = " ",
              I = String,
              q = "split",
              D = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[q](j),
              V = { mousedown: "touchstart", mousemove: "touchmove", mouseup: "touchend" },
              O = I.prototype.toLowerCase,
              Y = Math,
              W = Y.max,
              G = Y.min,
              H = Y.abs,
              X = Y.pow,
              U = Y.PI,
              $ = "number",
              Z = "string",
              Q = "array",
              J = "toString",
              K = "fill",
              tt = Object.prototype.toString,
              et = {},
              rt = "push",
              it = e._ISURL = /^url\(['"]?(.+?)['"]?\)$/i,
              nt = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
              at = { NaN: 1, Infinity: 1, "-Infinity": 1 },
              st = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
              ot = Y.round,
              lt = "setAttribute",
              ht = parseFloat,
              ut = parseInt,
              ct = I.prototype.toUpperCase,
              ft = e._availableAttrs = { "arrow-end": "none", "arrow-start": "none", blur: 0, "clip-rect": "0 0 1e9 1e9", cursor: "default", cx: 0, cy: 0, fill: "#fff", "fill-opacity": 1, font: '10px "Arial"', "font-family": '"Arial"', "font-size": "10", "font-style": "normal", "font-weight": 400, gradient: 0, height: 0, href: "http://raphaeljs.com/", "letter-spacing": 0, opacity: 1, path: "M0,0", r: 0, rx: 0, ry: 0, src: "", stroke: "#000", "stroke-dasharray": "", "stroke-linecap": "butt", "stroke-linejoin": "butt", "stroke-miterlimit": 0, "stroke-opacity": 1, "stroke-width": 1, target: "_blank", "text-anchor": "middle", title: "Raphael", transform: "", width: 0, x: 0, y: 0, "class": "" },
              pt = e._availableAnimAttrs = { blur: $, "clip-rect": "csv", cx: $, cy: $, fill: "colour", "fill-opacity": $, "font-size": $, height: $, opacity: $, path: "path", r: $, rx: $, ry: $, stroke: "colour", "stroke-opacity": $, "stroke-width": $, transform: "transform", width: $, x: $, y: $ },
              dt = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
              gt = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
              vt = { hs: 1, rg: 1 },
              xt = /,?([achlmqrstvxz]),?/gi,
              yt = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
              mt = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
              bt = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
              _t = e._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
              wt = {},
              kt = function (t, e) {
            return t.key - e.key;
          },
              Bt = function (t, e) {
            return ht(t) - ht(e);
          },
              Ct = function () {},
              St = function (t) {
            return t;
          },
              At = e._rectPath = function (t, e, r, i, n) {
            return n ? [["M", t + n, e], ["l", r - 2 * n, 0], ["a", n, n, 0, 0, 1, n, n], ["l", 0, i - 2 * n], ["a", n, n, 0, 0, 1, -n, n], ["l", 2 * n - r, 0], ["a", n, n, 0, 0, 1, -n, -n], ["l", 0, 2 * n - i], ["a", n, n, 0, 0, 1, n, -n], ["z"]] : [["M", t, e], ["l", r, 0], ["l", 0, i], ["l", -r, 0], ["z"]];
          },
              Tt = function (t, e, r, i) {
            return null == i && (i = r), [["M", t, e], ["m", 0, -i], ["a", r, i, 0, 1, 1, 0, 2 * i], ["a", r, i, 0, 1, 1, 0, -2 * i], ["z"]];
          },
              Et = e._getPath = { path: function (t) {
              return t.attr("path");
            }, circle: function (t) {
              var e = t.attrs;return Tt(e.cx, e.cy, e.r);
            }, ellipse: function (t) {
              var e = t.attrs;return Tt(e.cx, e.cy, e.rx, e.ry);
            }, rect: function (t) {
              var e = t.attrs;return At(e.x, e.y, e.width, e.height, e.r);
            }, image: function (t) {
              var e = t.attrs;return At(e.x, e.y, e.width, e.height);
            }, text: function (t) {
              var e = t._getBBox();return At(e.x, e.y, e.width, e.height);
            }, set: function (t) {
              var e = t._getBBox();return At(e.x, e.y, e.width, e.height);
            } },
              Mt = e.mapPath = function (t, e) {
            if (!e) return t;var r, i, n, a, s, o, l;for (t = Qt(t), n = 0, s = t.length; n < s; n++) for (l = t[n], a = 1, o = l.length; a < o; a += 2) r = e.x(l[a], l[a + 1]), i = e.y(l[a], l[a + 1]), l[a] = r, l[a + 1] = i;return t;
          };if (e._g = T, e.type = T.win.SVGAngle || T.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == e.type) {
            var Nt = T.doc.createElement("div"),
                Lt;if (Nt.innerHTML = '<v:shape adj="1"/>', Lt = Nt.firstChild, Lt.style.behavior = "url(#default#VML)", !Lt || "object" != typeof Lt.adj) return e.type = R;Nt = null;
          }e.svg = !(e.vml = "VML" == e.type), e._Paper = M, e.fn = N = M.prototype = e.prototype, e._id = 0, e.is = function (t, e) {
            return e = O.call(e), "finite" == e ? !at[A](+t) : "array" == e ? t instanceof Array : "null" == e && null === t || e == typeof t && null !== t || "object" == e && t === Object(t) || "array" == e && Array.isArray && Array.isArray(t) || tt.call(t).slice(8, -1).toLowerCase() == e;
          }, e.angle = function (t, r, i, n, a, s) {
            if (null == a) {
              var o = t - i,
                  l = r - n;return o || l ? (180 + 180 * Y.atan2(-l, -o) / U + 360) % 360 : 0;
            }return e.angle(t, r, a, s) - e.angle(i, n, a, s);
          }, e.rad = function (t) {
            return t % 360 * U / 180;
          }, e.deg = function (t) {
            return Math.round(180 * t / U % 360 * 1e3) / 1e3;
          }, e.snapTo = function (t, r, i) {
            if (i = e.is(i, "finite") ? i : 10, e.is(t, Q)) {
              for (var n = t.length; n--;) if (H(t[n] - r) <= i) return t[n];
            } else {
              t = +t;var a = r % t;if (a < i) return r - a;if (a > t - i) return r - a + t;
            }return r;
          };var zt = e.createUUID = function (t, e) {
            return function () {
              return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(t, e).toUpperCase();
            };
          }(/[xy]/g, function (t) {
            var e = 16 * Y.random() | 0,
                r = "x" == t ? e : 3 & e | 8;return r.toString(16);
          });e.setWindow = function (r) {
            t("raphael.setWindow", e, T.win, r), T.win = r, T.doc = T.win.document, e._engine.initWin && e._engine.initWin(T.win);
          };var Pt = function (t) {
            if (e.vml) {
              var r = /^\s+|\s+$/g,
                  i;try {
                var a = new ActiveXObject("htmlfile");a.write("<body>"), a.close(), i = a.body;
              } catch (s) {
                i = createPopup().document.body;
              }var o = i.createTextRange();Pt = n(function (t) {
                try {
                  i.style.color = I(t).replace(r, R);var e = o.queryCommandValue("ForeColor");return e = (255 & e) << 16 | 65280 & e | (16711680 & e) >>> 16, "#" + ("000000" + e.toString(16)).slice(-6);
                } catch (n) {
                  return "none";
                }
              });
            } else {
              var l = T.doc.createElement("i");l.title = "Raphaël Colour Picker", l.style.display = "none", T.doc.body.appendChild(l), Pt = n(function (t) {
                return l.style.color = t, T.doc.defaultView.getComputedStyle(l, R).getPropertyValue("color");
              });
            }return Pt(t);
          },
              Ft = function () {
            return "hsb(" + [this.h, this.s, this.b] + ")";
          },
              Rt = function () {
            return "hsl(" + [this.h, this.s, this.l] + ")";
          },
              jt = function () {
            return this.hex;
          },
              It = function (t, r, i) {
            if (null == r && e.is(t, "object") && "r" in t && "g" in t && "b" in t && (i = t.b, r = t.g, t = t.r), null == r && e.is(t, Z)) {
              var n = e.getRGB(t);t = n.r, r = n.g, i = n.b;
            }return (t > 1 || r > 1 || i > 1) && (t /= 255, r /= 255, i /= 255), [t, r, i];
          },
              qt = function (t, r, i, n) {
            t *= 255, r *= 255, i *= 255;var a = { r: t, g: r, b: i, hex: e.rgb(t, r, i), toString: jt };return e.is(n, "finite") && (a.opacity = n), a;
          };e.color = function (t) {
            var r;return e.is(t, "object") && "h" in t && "s" in t && "b" in t ? (r = e.hsb2rgb(t), t.r = r.r, t.g = r.g, t.b = r.b, t.hex = r.hex) : e.is(t, "object") && "h" in t && "s" in t && "l" in t ? (r = e.hsl2rgb(t), t.r = r.r, t.g = r.g, t.b = r.b, t.hex = r.hex) : (e.is(t, "string") && (t = e.getRGB(t)), e.is(t, "object") && "r" in t && "g" in t && "b" in t ? (r = e.rgb2hsl(t), t.h = r.h, t.s = r.s, t.l = r.l, r = e.rgb2hsb(t), t.v = r.b) : (t = { hex: "none" }, t.r = t.g = t.b = t.h = t.s = t.v = t.l = -1)), t.toString = jt, t;
          }, e.hsb2rgb = function (t, e, r, i) {
            this.is(t, "object") && "h" in t && "s" in t && "b" in t && (r = t.b, e = t.s, i = t.o, t = t.h), t *= 360;var n, a, s, o, l;return t = t % 360 / 60, l = r * e, o = l * (1 - H(t % 2 - 1)), n = a = s = r - l, t = ~~t, n += [l, o, 0, 0, o, l][t], a += [o, l, l, o, 0, 0][t], s += [0, 0, o, l, l, o][t], qt(n, a, s, i);
          }, e.hsl2rgb = function (t, e, r, i) {
            this.is(t, "object") && "h" in t && "s" in t && "l" in t && (r = t.l, e = t.s, t = t.h), (t > 1 || e > 1 || r > 1) && (t /= 360, e /= 100, r /= 100), t *= 360;var n, a, s, o, l;return t = t % 360 / 60, l = 2 * e * (r < .5 ? r : 1 - r), o = l * (1 - H(t % 2 - 1)), n = a = s = r - l / 2, t = ~~t, n += [l, o, 0, 0, o, l][t], a += [o, l, l, o, 0, 0][t], s += [0, 0, o, l, l, o][t], qt(n, a, s, i);
          }, e.rgb2hsb = function (t, e, r) {
            r = It(t, e, r), t = r[0], e = r[1], r = r[2];var i, n, a, s;return a = W(t, e, r), s = a - G(t, e, r), i = 0 == s ? null : a == t ? (e - r) / s : a == e ? (r - t) / s + 2 : (t - e) / s + 4, i = (i + 360) % 6 * 60 / 360, n = 0 == s ? 0 : s / a, { h: i, s: n, b: a, toString: Ft };
          }, e.rgb2hsl = function (t, e, r) {
            r = It(t, e, r), t = r[0], e = r[1], r = r[2];var i, n, a, s, o, l;return s = W(t, e, r), o = G(t, e, r), l = s - o, i = 0 == l ? null : s == t ? (e - r) / l : s == e ? (r - t) / l + 2 : (t - e) / l + 4, i = (i + 360) % 6 * 60 / 360, a = (s + o) / 2, n = 0 == l ? 0 : a < .5 ? l / (2 * a) : l / (2 - 2 * a), { h: i, s: n, l: a, toString: Rt };
          }, e._path2string = function () {
            return this.join(",").replace(xt, "$1");
          };var Dt = e._preload = function (t, e) {
            var r = T.doc.createElement("img");r.style.cssText = "position:absolute;left:-9999em;top:-9999em", r.onload = function () {
              e.call(this), this.onload = null, T.doc.body.removeChild(this);
            }, r.onerror = function () {
              T.doc.body.removeChild(this);
            }, T.doc.body.appendChild(r), r.src = t;
          };e.getRGB = n(function (t) {
            if (!t || (t = I(t)).indexOf("-") + 1) return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: a };if ("none" == t) return { r: -1, g: -1, b: -1, hex: "none", toString: a };!(vt[A](t.toLowerCase().substring(0, 2)) || "#" == t.charAt()) && (t = Pt(t));var r,
                i,
                n,
                s,
                o,
                l,
                h,
                u = t.match(nt);return u ? (u[2] && (s = ut(u[2].substring(5), 16), n = ut(u[2].substring(3, 5), 16), i = ut(u[2].substring(1, 3), 16)), u[3] && (s = ut((l = u[3].charAt(3)) + l, 16), n = ut((l = u[3].charAt(2)) + l, 16), i = ut((l = u[3].charAt(1)) + l, 16)), u[4] && (h = u[4][q](gt), i = ht(h[0]), "%" == h[0].slice(-1) && (i *= 2.55), n = ht(h[1]), "%" == h[1].slice(-1) && (n *= 2.55), s = ht(h[2]), "%" == h[2].slice(-1) && (s *= 2.55), "rgba" == u[1].toLowerCase().slice(0, 4) && (o = ht(h[3])), h[3] && "%" == h[3].slice(-1) && (o /= 100)), u[5] ? (h = u[5][q](gt), i = ht(h[0]), "%" == h[0].slice(-1) && (i *= 2.55), n = ht(h[1]), "%" == h[1].slice(-1) && (n *= 2.55), s = ht(h[2]), "%" == h[2].slice(-1) && (s *= 2.55), ("deg" == h[0].slice(-3) || "°" == h[0].slice(-1)) && (i /= 360), "hsba" == u[1].toLowerCase().slice(0, 4) && (o = ht(h[3])), h[3] && "%" == h[3].slice(-1) && (o /= 100), e.hsb2rgb(i, n, s, o)) : u[6] ? (h = u[6][q](gt), i = ht(h[0]), "%" == h[0].slice(-1) && (i *= 2.55), n = ht(h[1]), "%" == h[1].slice(-1) && (n *= 2.55), s = ht(h[2]), "%" == h[2].slice(-1) && (s *= 2.55), ("deg" == h[0].slice(-3) || "°" == h[0].slice(-1)) && (i /= 360), "hsla" == u[1].toLowerCase().slice(0, 4) && (o = ht(h[3])), h[3] && "%" == h[3].slice(-1) && (o /= 100), e.hsl2rgb(i, n, s, o)) : (u = { r: i, g: n, b: s, toString: a }, u.hex = "#" + (16777216 | s | n << 8 | i << 16).toString(16).slice(1), e.is(o, "finite") && (u.opacity = o), u)) : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: a };
          }, e), e.hsb = n(function (t, r, i) {
            return e.hsb2rgb(t, r, i).hex;
          }), e.hsl = n(function (t, r, i) {
            return e.hsl2rgb(t, r, i).hex;
          }), e.rgb = n(function (t, e, r) {
            function i(t) {
              return t + .5 | 0;
            }return "#" + (16777216 | i(r) | i(e) << 8 | i(t) << 16).toString(16).slice(1);
          }), e.getColor = function (t) {
            var e = this.getColor.start = this.getColor.start || { h: 0, s: 1, b: t || .75 },
                r = this.hsb2rgb(e.h, e.s, e.b);return e.h += .075, e.h > 1 && (e.h = 0, e.s -= .2, e.s <= 0 && (this.getColor.start = { h: 0, s: 1, b: e.b })), r.hex;
          }, e.getColor.reset = function () {
            delete this.start;
          }, e.parsePathString = function (t) {
            if (!t) return null;var r = Vt(t);if (r.arr) return Yt(r.arr);var i = { a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0 },
                n = [];return e.is(t, Q) && e.is(t[0], Q) && (n = Yt(t)), n.length || I(t).replace(yt, function (t, e, r) {
              var a = [],
                  s = e.toLowerCase();if (r.replace(bt, function (t, e) {
                e && a.push(+e);
              }), "m" == s && a.length > 2 && (n.push([e][P](a.splice(0, 2))), s = "l", e = "m" == e ? "l" : "L"), "r" == s) n.push([e][P](a));else for (; a.length >= i[s] && (n.push([e][P](a.splice(0, i[s]))), i[s]););
            }), n.toString = e._path2string, r.arr = Yt(n), n;
          }, e.parseTransformString = n(function (t) {
            if (!t) return null;var r = { r: 3, s: 4, t: 2, m: 6 },
                i = [];return e.is(t, Q) && e.is(t[0], Q) && (i = Yt(t)), i.length || I(t).replace(mt, function (t, e, r) {
              var n = [],
                  a = O.call(e);r.replace(bt, function (t, e) {
                e && n.push(+e);
              }), i.push([e][P](n));
            }), i.toString = e._path2string, i;
          });var Vt = function (t) {
            var e = Vt.ps = Vt.ps || {};return e[t] ? e[t].sleep = 100 : e[t] = { sleep: 100 }, setTimeout(function () {
              for (var r in e) e[A](r) && r != t && (e[r].sleep--, !e[r].sleep && delete e[r]);
            }), e[t];
          };e.findDotsAtSegment = function (t, e, r, i, n, a, s, o, l) {
            var h = 1 - l,
                u = X(h, 3),
                c = X(h, 2),
                f = l * l,
                p = f * l,
                d = u * t + 3 * c * l * r + 3 * h * l * l * n + p * s,
                g = u * e + 3 * c * l * i + 3 * h * l * l * a + p * o,
                v = t + 2 * l * (r - t) + f * (n - 2 * r + t),
                x = e + 2 * l * (i - e) + f * (a - 2 * i + e),
                y = r + 2 * l * (n - r) + f * (s - 2 * n + r),
                m = i + 2 * l * (a - i) + f * (o - 2 * a + i),
                b = h * t + l * r,
                _ = h * e + l * i,
                w = h * n + l * s,
                k = h * a + l * o,
                B = 90 - 180 * Y.atan2(v - y, x - m) / U;return (v > y || x < m) && (B += 180), { x: d, y: g, m: { x: v, y: x }, n: { x: y, y: m }, start: { x: b, y: _ }, end: { x: w, y: k }, alpha: B };
          }, e.bezierBBox = function (t, r, i, n, a, s, o, l) {
            e.is(t, "array") || (t = [t, r, i, n, a, s, o, l]);var h = Zt.apply(null, t);return { x: h.min.x, y: h.min.y, x2: h.max.x, y2: h.max.y, width: h.max.x - h.min.x, height: h.max.y - h.min.y };
          }, e.isPointInsideBBox = function (t, e, r) {
            return e >= t.x && e <= t.x2 && r >= t.y && r <= t.y2;
          }, e.isBBoxIntersect = function (t, r) {
            var i = e.isPointInsideBBox;return i(r, t.x, t.y) || i(r, t.x2, t.y) || i(r, t.x, t.y2) || i(r, t.x2, t.y2) || i(t, r.x, r.y) || i(t, r.x2, r.y) || i(t, r.x, r.y2) || i(t, r.x2, r.y2) || (t.x < r.x2 && t.x > r.x || r.x < t.x2 && r.x > t.x) && (t.y < r.y2 && t.y > r.y || r.y < t.y2 && r.y > t.y);
          }, e.pathIntersection = function (t, e) {
            return d(t, e);
          }, e.pathIntersectionNumber = function (t, e) {
            return d(t, e, 1);
          }, e.isPointInsidePath = function (t, r, i) {
            var n = e.pathBBox(t);return e.isPointInsideBBox(n, r, i) && d(t, [["M", r, i], ["H", n.x2 + 10]], 1) % 2 == 1;
          }, e._removedFactory = function (e) {
            return function () {
              t("raphael.log", null, "Raphaël: you are calling to method “" + e + "” of removed object", e);
            };
          };var Ot = e.pathBBox = function (t) {
            var e = Vt(t);if (e.bbox) return r(e.bbox);if (!t) return { x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0 };t = Qt(t);for (var i = 0, n = 0, a = [], s = [], o, l = 0, h = t.length; l < h; l++) if (o = t[l], "M" == o[0]) i = o[1], n = o[2], a.push(i), s.push(n);else {
              var u = Zt(i, n, o[1], o[2], o[3], o[4], o[5], o[6]);a = a[P](u.min.x, u.max.x), s = s[P](u.min.y, u.max.y), i = o[5], n = o[6];
            }var c = G[z](0, a),
                f = G[z](0, s),
                p = W[z](0, a),
                d = W[z](0, s),
                g = p - c,
                v = d - f,
                x = { x: c, y: f, x2: p, y2: d, width: g, height: v, cx: c + g / 2, cy: f + v / 2 };return e.bbox = r(x), x;
          },
              Yt = function (t) {
            var i = r(t);return i.toString = e._path2string, i;
          },
              Wt = e._pathToRelative = function (t) {
            var r = Vt(t);if (r.rel) return Yt(r.rel);e.is(t, Q) && e.is(t && t[0], Q) || (t = e.parsePathString(t));var i = [],
                n = 0,
                a = 0,
                s = 0,
                o = 0,
                l = 0;"M" == t[0][0] && (n = t[0][1], a = t[0][2], s = n, o = a, l++, i.push(["M", n, a]));for (var h = l, u = t.length; h < u; h++) {
              var c = i[h] = [],
                  f = t[h];if (f[0] != O.call(f[0])) switch (c[0] = O.call(f[0]), c[0]) {case "a":
                  c[1] = f[1], c[2] = f[2], c[3] = f[3], c[4] = f[4], c[5] = f[5], c[6] = +(f[6] - n).toFixed(3), c[7] = +(f[7] - a).toFixed(3);break;case "v":
                  c[1] = +(f[1] - a).toFixed(3);break;case "m":
                  s = f[1], o = f[2];default:
                  for (var p = 1, d = f.length; p < d; p++) c[p] = +(f[p] - (p % 2 ? n : a)).toFixed(3);} else {
                c = i[h] = [], "m" == f[0] && (s = f[1] + n, o = f[2] + a);for (var g = 0, v = f.length; g < v; g++) i[h][g] = f[g];
              }var x = i[h].length;switch (i[h][0]) {case "z":
                  n = s, a = o;break;case "h":
                  n += +i[h][x - 1];break;case "v":
                  a += +i[h][x - 1];break;default:
                  n += +i[h][x - 2], a += +i[h][x - 1];}
            }return i.toString = e._path2string, r.rel = Yt(i), i;
          },
              Gt = e._pathToAbsolute = function (t) {
            var r = Vt(t);if (r.abs) return Yt(r.abs);if (e.is(t, Q) && e.is(t && t[0], Q) || (t = e.parsePathString(t)), !t || !t.length) return [["M", 0, 0]];var i = [],
                n = 0,
                a = 0,
                o = 0,
                l = 0,
                h = 0;"M" == t[0][0] && (n = +t[0][1], a = +t[0][2], o = n, l = a, h++, i[0] = ["M", n, a]);for (var u = 3 == t.length && "M" == t[0][0] && "R" == t[1][0].toUpperCase() && "Z" == t[2][0].toUpperCase(), c, f, p = h, d = t.length; p < d; p++) {
              if (i.push(c = []), f = t[p], f[0] != ct.call(f[0])) switch (c[0] = ct.call(f[0]), c[0]) {case "A":
                  c[1] = f[1], c[2] = f[2], c[3] = f[3], c[4] = f[4], c[5] = f[5], c[6] = +(f[6] + n), c[7] = +(f[7] + a);break;case "V":
                  c[1] = +f[1] + a;break;case "H":
                  c[1] = +f[1] + n;break;case "R":
                  for (var g = [n, a][P](f.slice(1)), v = 2, x = g.length; v < x; v++) g[v] = +g[v] + n, g[++v] = +g[v] + a;i.pop(), i = i[P](s(g, u));break;case "M":
                  o = +f[1] + n, l = +f[2] + a;default:
                  for (v = 1, x = f.length; v < x; v++) c[v] = +f[v] + (v % 2 ? n : a);} else if ("R" == f[0]) g = [n, a][P](f.slice(1)), i.pop(), i = i[P](s(g, u)), c = ["R"][P](f.slice(-2));else for (var y = 0, m = f.length; y < m; y++) c[y] = f[y];switch (c[0]) {case "Z":
                  n = o, a = l;break;case "H":
                  n = c[1];break;case "V":
                  a = c[1];break;case "M":
                  o = c[c.length - 2], l = c[c.length - 1];default:
                  n = c[c.length - 2], a = c[c.length - 1];}
            }return i.toString = e._path2string, r.abs = Yt(i), i;
          },
              Ht = function (t, e, r, i) {
            return [t, e, r, i, r, i];
          },
              Xt = function (t, e, r, i, n, a) {
            var s = 1 / 3,
                o = 2 / 3;return [s * t + o * r, s * e + o * i, s * n + o * r, s * a + o * i, n, a];
          },
              Ut = function (t, e, r, i, a, s, o, l, h, u) {
            var c = 120 * U / 180,
                f = U / 180 * (+a || 0),
                p = [],
                d,
                g = n(function (t, e, r) {
              var i = t * Y.cos(r) - e * Y.sin(r),
                  n = t * Y.sin(r) + e * Y.cos(r);return { x: i, y: n };
            });if (u) S = u[0], A = u[1], B = u[2], C = u[3];else {
              d = g(t, e, -f), t = d.x, e = d.y, d = g(l, h, -f), l = d.x, h = d.y;var v = Y.cos(U / 180 * a),
                  x = Y.sin(U / 180 * a),
                  y = (t - l) / 2,
                  m = (e - h) / 2,
                  b = y * y / (r * r) + m * m / (i * i);b > 1 && (b = Y.sqrt(b), r = b * r, i = b * i);var _ = r * r,
                  w = i * i,
                  k = (s == o ? -1 : 1) * Y.sqrt(H((_ * w - _ * m * m - w * y * y) / (_ * m * m + w * y * y))),
                  B = k * r * m / i + (t + l) / 2,
                  C = k * -i * y / r + (e + h) / 2,
                  S = Y.asin(((e - C) / i).toFixed(9)),
                  A = Y.asin(((h - C) / i).toFixed(9));S = t < B ? U - S : S, A = l < B ? U - A : A, S < 0 && (S = 2 * U + S), A < 0 && (A = 2 * U + A), o && S > A && (S -= 2 * U), !o && A > S && (A -= 2 * U);
            }var T = A - S;if (H(T) > c) {
              var E = A,
                  M = l,
                  N = h;A = S + c * (o && A > S ? 1 : -1), l = B + r * Y.cos(A), h = C + i * Y.sin(A), p = Ut(l, h, r, i, a, 0, o, M, N, [A, E, B, C]);
            }T = A - S;var L = Y.cos(S),
                z = Y.sin(S),
                F = Y.cos(A),
                R = Y.sin(A),
                j = Y.tan(T / 4),
                I = 4 / 3 * r * j,
                D = 4 / 3 * i * j,
                V = [t, e],
                O = [t + I * z, e - D * L],
                W = [l + I * R, h - D * F],
                G = [l, h];if (O[0] = 2 * V[0] - O[0], O[1] = 2 * V[1] - O[1], u) return [O, W, G][P](p);p = [O, W, G][P](p).join()[q](",");for (var X = [], $ = 0, Z = p.length; $ < Z; $++) X[$] = $ % 2 ? g(p[$ - 1], p[$], f).y : g(p[$], p[$ + 1], f).x;return X;
          },
              $t = function (t, e, r, i, n, a, s, o, l) {
            var h = 1 - l;return { x: X(h, 3) * t + 3 * X(h, 2) * l * r + 3 * h * l * l * n + X(l, 3) * s, y: X(h, 3) * e + 3 * X(h, 2) * l * i + 3 * h * l * l * a + X(l, 3) * o };
          },
              Zt = n(function (t, e, r, i, n, a, s, o) {
            var l = n - 2 * r + t - (s - 2 * n + r),
                h = 2 * (r - t) - 2 * (n - r),
                u = t - r,
                c = (-h + Y.sqrt(h * h - 4 * l * u)) / 2 / l,
                f = (-h - Y.sqrt(h * h - 4 * l * u)) / 2 / l,
                p = [e, o],
                d = [t, s],
                g;return H(c) > "1e12" && (c = .5), H(f) > "1e12" && (f = .5), c > 0 && c < 1 && (g = $t(t, e, r, i, n, a, s, o, c), d.push(g.x), p.push(g.y)), f > 0 && f < 1 && (g = $t(t, e, r, i, n, a, s, o, f), d.push(g.x), p.push(g.y)), l = a - 2 * i + e - (o - 2 * a + i), h = 2 * (i - e) - 2 * (a - i), u = e - i, c = (-h + Y.sqrt(h * h - 4 * l * u)) / 2 / l, f = (-h - Y.sqrt(h * h - 4 * l * u)) / 2 / l, H(c) > "1e12" && (c = .5), H(f) > "1e12" && (f = .5), c > 0 && c < 1 && (g = $t(t, e, r, i, n, a, s, o, c), d.push(g.x), p.push(g.y)), f > 0 && f < 1 && (g = $t(t, e, r, i, n, a, s, o, f), d.push(g.x), p.push(g.y)), { min: { x: G[z](0, d), y: G[z](0, p) }, max: { x: W[z](0, d), y: W[z](0, p) } };
          }),
              Qt = e._path2curve = n(function (t, e) {
            var r = !e && Vt(t);if (!e && r.curve) return Yt(r.curve);for (var i = Gt(t), n = e && Gt(e), a = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, s = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null }, o = function (t, e, r) {
              var i,
                  n,
                  a = { T: 1, Q: 1 };if (!t) return ["C", e.x, e.y, e.x, e.y, e.x, e.y];switch (!(t[0] in a) && (e.qx = e.qy = null), t[0]) {case "M":
                  e.X = t[1], e.Y = t[2];break;case "A":
                  t = ["C"][P](Ut[z](0, [e.x, e.y][P](t.slice(1))));break;case "S":
                  "C" == r || "S" == r ? (i = 2 * e.x - e.bx, n = 2 * e.y - e.by) : (i = e.x, n = e.y), t = ["C", i, n][P](t.slice(1));break;case "T":
                  "Q" == r || "T" == r ? (e.qx = 2 * e.x - e.qx, e.qy = 2 * e.y - e.qy) : (e.qx = e.x, e.qy = e.y), t = ["C"][P](Xt(e.x, e.y, e.qx, e.qy, t[1], t[2]));break;case "Q":
                  e.qx = t[1], e.qy = t[2], t = ["C"][P](Xt(e.x, e.y, t[1], t[2], t[3], t[4]));break;case "L":
                  t = ["C"][P](Ht(e.x, e.y, t[1], t[2]));break;case "H":
                  t = ["C"][P](Ht(e.x, e.y, t[1], e.y));break;case "V":
                  t = ["C"][P](Ht(e.x, e.y, e.x, t[1]));break;case "Z":
                  t = ["C"][P](Ht(e.x, e.y, e.X, e.Y));}return t;
            }, l = function (t, e) {
              if (t[e].length > 7) {
                t[e].shift();for (var r = t[e]; r.length;) u[e] = "A", n && (c[e] = "A"), t.splice(e++, 0, ["C"][P](r.splice(0, 6)));t.splice(e, 1), g = W(i.length, n && n.length || 0);
              }
            }, h = function (t, e, r, a, s) {
              t && e && "M" == t[s][0] && "M" != e[s][0] && (e.splice(s, 0, ["M", a.x, a.y]), r.bx = 0, r.by = 0, r.x = t[s][1], r.y = t[s][2], g = W(i.length, n && n.length || 0));
            }, u = [], c = [], f = "", p = "", d = 0, g = W(i.length, n && n.length || 0); d < g; d++) {
              i[d] && (f = i[d][0]), "C" != f && (u[d] = f, d && (p = u[d - 1])), i[d] = o(i[d], a, p), "A" != u[d] && "C" == f && (u[d] = "C"), l(i, d), n && (n[d] && (f = n[d][0]), "C" != f && (c[d] = f, d && (p = c[d - 1])), n[d] = o(n[d], s, p), "A" != c[d] && "C" == f && (c[d] = "C"), l(n, d)), h(i, n, a, s, d), h(n, i, s, a, d);var v = i[d],
                  x = n && n[d],
                  y = v.length,
                  m = n && x.length;a.x = v[y - 2], a.y = v[y - 1], a.bx = ht(v[y - 4]) || a.x, a.by = ht(v[y - 3]) || a.y, s.bx = n && (ht(x[m - 4]) || s.x), s.by = n && (ht(x[m - 3]) || s.y), s.x = n && x[m - 2], s.y = n && x[m - 1];
            }return n || (r.curve = Yt(i)), n ? [i, n] : i;
          }, null, Yt),
              Jt = e._parseDots = n(function (t) {
            for (var r = [], i = 0, n = t.length; i < n; i++) {
              var a = {},
                  s = t[i].match(/^([^:]*):?([\d\.]*)/);if (a.color = e.getRGB(s[1]), a.color.error) return null;a.opacity = a.color.opacity, a.color = a.color.hex, s[2] && (a.offset = s[2] + "%"), r.push(a);
            }for (i = 1, n = r.length - 1; i < n; i++) if (!r[i].offset) {
              for (var o = ht(r[i - 1].offset || 0), l = 0, h = i + 1; h < n; h++) if (r[h].offset) {
                l = r[h].offset;break;
              }l || (l = 100, h = n), l = ht(l);for (var u = (l - o) / (h - i + 1); i < h; i++) o += u, r[i].offset = o + "%";
            }return r;
          }),
              Kt = e._tear = function (t, e) {
            t == e.top && (e.top = t.prev), t == e.bottom && (e.bottom = t.next), t.next && (t.next.prev = t.prev), t.prev && (t.prev.next = t.next);
          },
              te = e._tofront = function (t, e) {
            e.top !== t && (Kt(t, e), t.next = null, t.prev = e.top, e.top.next = t, e.top = t);
          },
              ee = e._toback = function (t, e) {
            e.bottom !== t && (Kt(t, e), t.next = e.bottom, t.prev = null, e.bottom.prev = t, e.bottom = t);
          },
              re = e._insertafter = function (t, e, r) {
            Kt(t, r), e == r.top && (r.top = t), e.next && (e.next.prev = t), t.next = e.next, t.prev = e, e.next = t;
          },
              ie = e._insertbefore = function (t, e, r) {
            Kt(t, r), e == r.bottom && (r.bottom = t), e.prev && (e.prev.next = t), t.prev = e.prev, e.prev = t, t.next = e;
          },
              ne = e.toMatrix = function (t, e) {
            var r = Ot(t),
                i = { _: { transform: R }, getBBox: function () {
                return r;
              } };return se(i, e), i.matrix;
          },
              ae = e.transformPath = function (t, e) {
            return Mt(t, ne(t, e));
          },
              se = e._extractTransform = function (t, r) {
            if (null == r) return t._.transform;r = I(r).replace(/\.{3}|\u2026/g, t._.transform || R);var i = e.parseTransformString(r),
                n = 0,
                a = 0,
                s = 0,
                o = 1,
                l = 1,
                h = t._,
                u = new g();if (h.transform = i || [], i) for (var c = 0, f = i.length; c < f; c++) {
              var p = i[c],
                  d = p.length,
                  v = I(p[0]).toLowerCase(),
                  x = p[0] != v,
                  y = x ? u.invert() : 0,
                  m,
                  b,
                  _,
                  w,
                  k;"t" == v && 3 == d ? x ? (m = y.x(0, 0), b = y.y(0, 0), _ = y.x(p[1], p[2]), w = y.y(p[1], p[2]), u.translate(_ - m, w - b)) : u.translate(p[1], p[2]) : "r" == v ? 2 == d ? (k = k || t.getBBox(1), u.rotate(p[1], k.x + k.width / 2, k.y + k.height / 2), n += p[1]) : 4 == d && (x ? (_ = y.x(p[2], p[3]), w = y.y(p[2], p[3]), u.rotate(p[1], _, w)) : u.rotate(p[1], p[2], p[3]), n += p[1]) : "s" == v ? 2 == d || 3 == d ? (k = k || t.getBBox(1), u.scale(p[1], p[d - 1], k.x + k.width / 2, k.y + k.height / 2), o *= p[1], l *= p[d - 1]) : 5 == d && (x ? (_ = y.x(p[3], p[4]), w = y.y(p[3], p[4]), u.scale(p[1], p[2], _, w)) : u.scale(p[1], p[2], p[3], p[4]), o *= p[1], l *= p[2]) : "m" == v && 7 == d && u.add(p[1], p[2], p[3], p[4], p[5], p[6]), h.dirtyT = 1, t.matrix = u;
            }t.matrix = u, h.sx = o, h.sy = l, h.deg = n, h.dx = a = u.e, h.dy = s = u.f, 1 == o && 1 == l && !n && h.bbox ? (h.bbox.x += +a, h.bbox.y += +s) : h.dirtyT = 1;
          },
              oe = function (t) {
            var e = t[0];switch (e.toLowerCase()) {case "t":
                return [e, 0, 0];case "m":
                return [e, 1, 0, 0, 1, 0, 0];case "r":
                return 4 == t.length ? [e, 0, t[2], t[3]] : [e, 0];case "s":
                return 5 == t.length ? [e, 1, 1, t[3], t[4]] : 3 == t.length ? [e, 1, 1] : [e, 1];}
          },
              le = e._equaliseTransform = function (t, r) {
            r = I(r).replace(/\.{3}|\u2026/g, t), t = e.parseTransformString(t) || [], r = e.parseTransformString(r) || [];for (var i = W(t.length, r.length), n = [], a = [], s = 0, o, l, h, u; s < i; s++) {
              if (h = t[s] || oe(r[s]), u = r[s] || oe(h), h[0] != u[0] || "r" == h[0].toLowerCase() && (h[2] != u[2] || h[3] != u[3]) || "s" == h[0].toLowerCase() && (h[3] != u[3] || h[4] != u[4])) return;for (n[s] = [], a[s] = [], o = 0, l = W(h.length, u.length); o < l; o++) o in h && (n[s][o] = h[o]), o in u && (a[s][o] = u[o]);
            }return { from: n, to: a };
          };e._getContainer = function (t, r, i, n) {
            var a;if (a = null != n || e.is(t, "object") ? t : T.doc.getElementById(t), null != a) return a.tagName ? null == r ? { container: a, width: a.style.pixelWidth || a.offsetWidth, height: a.style.pixelHeight || a.offsetHeight } : { container: a, width: r, height: i } : { container: 1, x: t, y: r, width: i, height: n };
          }, e.pathToRelative = Wt, e._engine = {}, e.path2curve = Qt, e.matrix = function (t, e, r, i, n, a) {
            return new g(t, e, r, i, n, a);
          }, function (t) {
            function r(t) {
              return t[0] * t[0] + t[1] * t[1];
            }function i(t) {
              var e = Y.sqrt(r(t));t[0] && (t[0] /= e), t[1] && (t[1] /= e);
            }t.add = function (t, e, r, i, n, a) {
              var s = [[], [], []],
                  o = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                  l = [[t, r, n], [e, i, a], [0, 0, 1]],
                  h,
                  u,
                  c,
                  f;for (t && t instanceof g && (l = [[t.a, t.c, t.e], [t.b, t.d, t.f], [0, 0, 1]]), h = 0; h < 3; h++) for (u = 0; u < 3; u++) {
                for (f = 0, c = 0; c < 3; c++) f += o[h][c] * l[c][u];s[h][u] = f;
              }this.a = s[0][0], this.b = s[1][0], this.c = s[0][1], this.d = s[1][1], this.e = s[0][2], this.f = s[1][2];
            }, t.invert = function () {
              var t = this,
                  e = t.a * t.d - t.b * t.c;return new g(t.d / e, -t.b / e, -t.c / e, t.a / e, (t.c * t.f - t.d * t.e) / e, (t.b * t.e - t.a * t.f) / e);
            }, t.clone = function () {
              return new g(this.a, this.b, this.c, this.d, this.e, this.f);
            }, t.translate = function (t, e) {
              this.add(1, 0, 0, 1, t, e);
            }, t.scale = function (t, e, r, i) {
              null == e && (e = t), (r || i) && this.add(1, 0, 0, 1, r, i), this.add(t, 0, 0, e, 0, 0), (r || i) && this.add(1, 0, 0, 1, -r, -i);
            }, t.rotate = function (t, r, i) {
              t = e.rad(t), r = r || 0, i = i || 0;var n = +Y.cos(t).toFixed(9),
                  a = +Y.sin(t).toFixed(9);this.add(n, a, -a, n, r, i), this.add(1, 0, 0, 1, -r, -i);
            }, t.x = function (t, e) {
              return t * this.a + e * this.c + this.e;
            }, t.y = function (t, e) {
              return t * this.b + e * this.d + this.f;
            }, t.get = function (t) {
              return +this[I.fromCharCode(97 + t)].toFixed(4);
            }, t.toString = function () {
              return e.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
            }, t.toFilter = function () {
              return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
            }, t.offset = function () {
              return [this.e.toFixed(4), this.f.toFixed(4)];
            }, t.split = function () {
              var t = {};t.dx = this.e, t.dy = this.f;var n = [[this.a, this.c], [this.b, this.d]];t.scalex = Y.sqrt(r(n[0])), i(n[0]), t.shear = n[0][0] * n[1][0] + n[0][1] * n[1][1], n[1] = [n[1][0] - n[0][0] * t.shear, n[1][1] - n[0][1] * t.shear], t.scaley = Y.sqrt(r(n[1])), i(n[1]), t.shear /= t.scaley;var a = -n[0][1],
                  s = n[1][1];return s < 0 ? (t.rotate = e.deg(Y.acos(s)), a < 0 && (t.rotate = 360 - t.rotate)) : t.rotate = e.deg(Y.asin(a)), t.isSimple = !(+t.shear.toFixed(9) || t.scalex.toFixed(9) != t.scaley.toFixed(9) && t.rotate), t.isSuperSimple = !+t.shear.toFixed(9) && t.scalex.toFixed(9) == t.scaley.toFixed(9) && !t.rotate, t.noRotation = !+t.shear.toFixed(9) && !t.rotate, t;
            }, t.toTransformString = function (t) {
              var e = t || this[q]();return e.isSimple ? (e.scalex = +e.scalex.toFixed(4), e.scaley = +e.scaley.toFixed(4), e.rotate = +e.rotate.toFixed(4), (e.dx || e.dy ? "t" + [e.dx, e.dy] : R) + (1 != e.scalex || 1 != e.scaley ? "s" + [e.scalex, e.scaley, 0, 0] : R) + (e.rotate ? "r" + [e.rotate, 0, 0] : R)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
            };
          }(g.prototype);for (var he = function () {
            this.returnValue = !1;
          }, ue = function () {
            return this.originalEvent.preventDefault();
          }, ce = function () {
            this.cancelBubble = !0;
          }, fe = function () {
            return this.originalEvent.stopPropagation();
          }, pe = function (t) {
            var e = T.doc.documentElement.scrollTop || T.doc.body.scrollTop,
                r = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft;return { x: t.clientX + r, y: t.clientY + e };
          }, de = function () {
            return T.doc.addEventListener ? function (t, e, r, i) {
              var n = function (t) {
                var e = pe(t);return r.call(i, t, e.x, e.y);
              };if (t.addEventListener(e, n, !1), F && V[e]) {
                var a = function (e) {
                  for (var n = pe(e), a = e, s = 0, o = e.targetTouches && e.targetTouches.length; s < o; s++) if (e.targetTouches[s].target == t) {
                    e = e.targetTouches[s], e.originalEvent = a, e.preventDefault = ue, e.stopPropagation = fe;break;
                  }return r.call(i, e, n.x, n.y);
                };t.addEventListener(V[e], a, !1);
              }return function () {
                return t.removeEventListener(e, n, !1), F && V[e] && t.removeEventListener(V[e], a, !1), !0;
              };
            } : T.doc.attachEvent ? function (t, e, r, i) {
              var n = function (t) {
                t = t || T.win.event;var e = T.doc.documentElement.scrollTop || T.doc.body.scrollTop,
                    n = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft,
                    a = t.clientX + n,
                    s = t.clientY + e;return t.preventDefault = t.preventDefault || he, t.stopPropagation = t.stopPropagation || ce, r.call(i, t, a, s);
              };t.attachEvent("on" + e, n);var a = function () {
                return t.detachEvent("on" + e, n), !0;
              };return a;
            } : void 0;
          }(), ge = [], ve = function (e) {
            for (var r = e.clientX, i = e.clientY, n = T.doc.documentElement.scrollTop || T.doc.body.scrollTop, a = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft, s, o = ge.length; o--;) {
              if (s = ge[o], F && e.touches) {
                for (var l = e.touches.length, h; l--;) if (h = e.touches[l], h.identifier == s.el._drag.id) {
                  r = h.clientX, i = h.clientY, (e.originalEvent ? e.originalEvent : e).preventDefault();break;
                }
              } else e.preventDefault();var u = s.el.node,
                  c,
                  f = u.nextSibling,
                  p = u.parentNode,
                  d = u.style.display;T.win.opera && p.removeChild(u), u.style.display = "none", c = s.el.paper.getElementByPoint(r, i), u.style.display = d, T.win.opera && (f ? p.insertBefore(u, f) : p.appendChild(u)), c && t("raphael.drag.over." + s.el.id, s.el, c), r += a, i += n, t("raphael.drag.move." + s.el.id, s.move_scope || s.el, r - s.el._drag.x, i - s.el._drag.y, r, i, e);
            }
          }, xe = function (r) {
            e.unmousemove(ve).unmouseup(xe);for (var i = ge.length, n; i--;) n = ge[i], n.el._drag = {}, t("raphael.drag.end." + n.el.id, n.end_scope || n.start_scope || n.move_scope || n.el, r);ge = [];
          }, ye = e.el = {}, me = D.length; me--;) !function (t) {
            e[t] = ye[t] = function (r, i) {
              return e.is(r, "function") && (this.events = this.events || [], this.events.push({ name: t, f: r, unbind: de(this.shape || this.node || T.doc, t, r, i || this) })), this;
            }, e["un" + t] = ye["un" + t] = function (r) {
              for (var i = this.events || [], n = i.length; n--;) i[n].name != t || !e.is(r, "undefined") && i[n].f != r || (i[n].unbind(), i.splice(n, 1), !i.length && delete this.events);return this;
            };
          }(D[me]);ye.data = function (r, i) {
            var n = wt[this.id] = wt[this.id] || {};if (0 == arguments.length) return n;if (1 == arguments.length) {
              if (e.is(r, "object")) {
                for (var a in r) r[A](a) && this.data(a, r[a]);return this;
              }return t("raphael.data.get." + this.id, this, n[r], r), n[r];
            }return n[r] = i, t("raphael.data.set." + this.id, this, i, r), this;
          }, ye.removeData = function (t) {
            return null == t ? wt[this.id] = {} : wt[this.id] && delete wt[this.id][t], this;
          }, ye.getData = function () {
            return r(wt[this.id] || {});
          }, ye.hover = function (t, e, r, i) {
            return this.mouseover(t, r).mouseout(e, i || r);
          }, ye.unhover = function (t, e) {
            return this.unmouseover(t).unmouseout(e);
          };var be = [];ye.drag = function (r, i, n, a, s, o) {
            function l(l) {
              (l.originalEvent || l).preventDefault();var h = l.clientX,
                  u = l.clientY,
                  c = T.doc.documentElement.scrollTop || T.doc.body.scrollTop,
                  f = T.doc.documentElement.scrollLeft || T.doc.body.scrollLeft;if (this._drag.id = l.identifier, F && l.touches) for (var p = l.touches.length, d; p--;) if (d = l.touches[p], this._drag.id = d.identifier, d.identifier == this._drag.id) {
                h = d.clientX, u = d.clientY;break;
              }this._drag.x = h + f, this._drag.y = u + c, !ge.length && e.mousemove(ve).mouseup(xe), ge.push({ el: this, move_scope: a, start_scope: s, end_scope: o }), i && t.on("raphael.drag.start." + this.id, i), r && t.on("raphael.drag.move." + this.id, r), n && t.on("raphael.drag.end." + this.id, n), t("raphael.drag.start." + this.id, s || a || this, l.clientX + f, l.clientY + c, l);
            }return this._drag = {}, be.push({ el: this, start: l }), this.mousedown(l), this;
          }, ye.onDragOver = function (e) {
            e ? t.on("raphael.drag.over." + this.id, e) : t.unbind("raphael.drag.over." + this.id);
          }, ye.undrag = function () {
            for (var r = be.length; r--;) be[r].el == this && (this.unmousedown(be[r].start), be.splice(r, 1), t.unbind("raphael.drag.*." + this.id));!be.length && e.unmousemove(ve).unmouseup(xe), ge = [];
          }, N.circle = function (t, r, i) {
            var n = e._engine.circle(this, t || 0, r || 0, i || 0);return this.__set__ && this.__set__.push(n), n;
          }, N.rect = function (t, r, i, n, a) {
            var s = e._engine.rect(this, t || 0, r || 0, i || 0, n || 0, a || 0);return this.__set__ && this.__set__.push(s), s;
          }, N.ellipse = function (t, r, i, n) {
            var a = e._engine.ellipse(this, t || 0, r || 0, i || 0, n || 0);return this.__set__ && this.__set__.push(a), a;
          }, N.path = function (t) {
            t && !e.is(t, Z) && !e.is(t[0], Q) && (t += R);var r = e._engine.path(e.format[z](e, arguments), this);return this.__set__ && this.__set__.push(r), r;
          }, N.image = function (t, r, i, n, a) {
            var s = e._engine.image(this, t || "about:blank", r || 0, i || 0, n || 0, a || 0);return this.__set__ && this.__set__.push(s), s;
          }, N.text = function (t, r, i) {
            var n = e._engine.text(this, t || 0, r || 0, I(i));return this.__set__ && this.__set__.push(n), n;
          }, N.set = function (t) {
            !e.is(t, "array") && (t = Array.prototype.splice.call(arguments, 0, arguments.length));var r = new ze(t);return this.__set__ && this.__set__.push(r), r.paper = this, r.type = "set", r;
          }, N.setStart = function (t) {
            this.__set__ = t || this.set();
          }, N.setFinish = function (t) {
            var e = this.__set__;return delete this.__set__, e;
          }, N.getSize = function () {
            var t = this.canvas.parentNode;return { width: t.offsetWidth, height: t.offsetHeight };
          }, N.setSize = function (t, r) {
            return e._engine.setSize.call(this, t, r);
          }, N.setViewBox = function (t, r, i, n, a) {
            return e._engine.setViewBox.call(this, t, r, i, n, a);
          }, N.top = N.bottom = null, N.raphael = e;var _e = function (t) {
            var e = t.getBoundingClientRect(),
                r = t.ownerDocument,
                i = r.body,
                n = r.documentElement,
                a = n.clientTop || i.clientTop || 0,
                s = n.clientLeft || i.clientLeft || 0,
                o = e.top + (T.win.pageYOffset || n.scrollTop || i.scrollTop) - a,
                l = e.left + (T.win.pageXOffset || n.scrollLeft || i.scrollLeft) - s;return { y: o, x: l };
          };N.getElementByPoint = function (t, e) {
            var r = this,
                i = r.canvas,
                n = T.doc.elementFromPoint(t, e);if (T.win.opera && "svg" == n.tagName) {
              var a = _e(i),
                  s = i.createSVGRect();s.x = t - a.x, s.y = e - a.y, s.width = s.height = 1;var o = i.getIntersectionList(s, null);o.length && (n = o[o.length - 1]);
            }if (!n) return null;for (; n.parentNode && n != i.parentNode && !n.raphael;) n = n.parentNode;return n == r.canvas.parentNode && (n = i), n = n && n.raphael ? r.getById(n.raphaelid) : null;
          }, N.getElementsByBBox = function (t) {
            var r = this.set();return this.forEach(function (i) {
              e.isBBoxIntersect(i.getBBox(), t) && r.push(i);
            }), r;
          }, N.getById = function (t) {
            for (var e = this.bottom; e;) {
              if (e.id == t) return e;e = e.next;
            }return null;
          }, N.forEach = function (t, e) {
            for (var r = this.bottom; r;) {
              if (t.call(e, r) === !1) return this;r = r.next;
            }return this;
          }, N.getElementsByPoint = function (t, e) {
            var r = this.set();return this.forEach(function (i) {
              i.isPointInside(t, e) && r.push(i);
            }), r;
          }, ye.isPointInside = function (t, r) {
            var i = this.realPath = Et[this.type](this);return this.attr("transform") && this.attr("transform").length && (i = e.transformPath(i, this.attr("transform"))), e.isPointInsidePath(i, t, r);
          }, ye.getBBox = function (t) {
            if (this.removed) return {};var e = this._;return t ? (!e.dirty && e.bboxwt || (this.realPath = Et[this.type](this), e.bboxwt = Ot(this.realPath), e.bboxwt.toString = x, e.dirty = 0), e.bboxwt) : ((e.dirty || e.dirtyT || !e.bbox) && (!e.dirty && this.realPath || (e.bboxwt = 0, this.realPath = Et[this.type](this)), e.bbox = Ot(Mt(this.realPath, this.matrix)), e.bbox.toString = x, e.dirty = e.dirtyT = 0), e.bbox);
          }, ye.clone = function () {
            if (this.removed) return null;var t = this.paper[this.type]().attr(this.attr());return this.__set__ && this.__set__.push(t), t;
          }, ye.glow = function (t) {
            if ("text" == this.type) return null;t = t || {};var e = { width: (t.width || 10) + (+this.attr("stroke-width") || 1), fill: t.fill || !1, opacity: null == t.opacity ? .5 : t.opacity, offsetx: t.offsetx || 0, offsety: t.offsety || 0, color: t.color || "#000" },
                r = e.width / 2,
                i = this.paper,
                n = i.set(),
                a = this.realPath || Et[this.type](this);a = this.matrix ? Mt(a, this.matrix) : a;for (var s = 1; s < r + 1; s++) n.push(i.path(a).attr({ stroke: e.color, fill: e.fill ? e.color : "none", "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-width": +(e.width / r * s).toFixed(3), opacity: +(e.opacity / r).toFixed(3) }));return n.insertBefore(this).translate(e.offsetx, e.offsety);
          };var we = {},
              ke = function (t, r, i, n, a, s, o, u, c) {
            return null == c ? l(t, r, i, n, a, s, o, u) : e.findDotsAtSegment(t, r, i, n, a, s, o, u, h(t, r, i, n, a, s, o, u, c));
          },
              Be = function (t, r) {
            return function (i, n, a) {
              i = Qt(i);for (var s, o, l, h, u = "", c = {}, f, p = 0, d = 0, g = i.length; d < g; d++) {
                if (l = i[d], "M" == l[0]) s = +l[1], o = +l[2];else {
                  if (h = ke(s, o, l[1], l[2], l[3], l[4], l[5], l[6]), p + h > n) {
                    if (r && !c.start) {
                      if (f = ke(s, o, l[1], l[2], l[3], l[4], l[5], l[6], n - p), u += ["C" + f.start.x, f.start.y, f.m.x, f.m.y, f.x, f.y], a) return u;c.start = u, u = ["M" + f.x, f.y + "C" + f.n.x, f.n.y, f.end.x, f.end.y, l[5], l[6]].join(), p += h, s = +l[5], o = +l[6];continue;
                    }if (!t && !r) return f = ke(s, o, l[1], l[2], l[3], l[4], l[5], l[6], n - p), { x: f.x, y: f.y, alpha: f.alpha };
                  }p += h, s = +l[5], o = +l[6];
                }u += l.shift() + l;
              }return c.end = u, f = t ? p : r ? c : e.findDotsAtSegment(s, o, l[0], l[1], l[2], l[3], l[4], l[5], 1), f.alpha && (f = { x: f.x, y: f.y, alpha: f.alpha }), f;
            };
          },
              Ce = Be(1),
              Se = Be(),
              Ae = Be(0, 1);e.getTotalLength = Ce, e.getPointAtLength = Se, e.getSubpath = function (t, e, r) {
            if (this.getTotalLength(t) - r < 1e-6) return Ae(t, e).end;var i = Ae(t, r, 1);return e ? Ae(i, e).end : i;
          }, ye.getTotalLength = function () {
            var t = this.getPath();if (t) return this.node.getTotalLength ? this.node.getTotalLength() : Ce(t);
          }, ye.getPointAtLength = function (t) {
            var e = this.getPath();if (e) return Se(e, t);
          }, ye.getPath = function () {
            var t,
                r = e._getPath[this.type];if ("text" != this.type && "set" != this.type) return r && (t = r(this)), t;
          }, ye.getSubpath = function (t, r) {
            var i = this.getPath();if (i) return e.getSubpath(i, t, r);
          };var Te = e.easing_formulas = { linear: function (t) {
              return t;
            }, "<": function (t) {
              return X(t, 1.7);
            }, ">": function (t) {
              return X(t, .48);
            }, "<>": function (t) {
              var e = .48 - t / 1.04,
                  r = Y.sqrt(.1734 + e * e),
                  i = r - e,
                  n = X(H(i), 1 / 3) * (i < 0 ? -1 : 1),
                  a = -r - e,
                  s = X(H(a), 1 / 3) * (a < 0 ? -1 : 1),
                  o = n + s + .5;return 3 * (1 - o) * o * o + o * o * o;
            }, backIn: function (t) {
              var e = 1.70158;return t * t * ((e + 1) * t - e);
            }, backOut: function (t) {
              t -= 1;var e = 1.70158;return t * t * ((e + 1) * t + e) + 1;
            }, elastic: function (t) {
              return t == !!t ? t : X(2, -10 * t) * Y.sin((t - .075) * (2 * U) / .3) + 1;
            }, bounce: function (t) {
              var e = 7.5625,
                  r = 2.75,
                  i;return t < 1 / r ? i = e * t * t : t < 2 / r ? (t -= 1.5 / r, i = e * t * t + .75) : t < 2.5 / r ? (t -= 2.25 / r, i = e * t * t + .9375) : (t -= 2.625 / r, i = e * t * t + .984375), i;
            } };Te.easeIn = Te["ease-in"] = Te["<"], Te.easeOut = Te["ease-out"] = Te[">"], Te.easeInOut = Te["ease-in-out"] = Te["<>"], Te["back-in"] = Te.backIn, Te["back-out"] = Te.backOut;var Ee = [],
              Me = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
            setTimeout(t, 16);
          },
              Ne = function () {
            for (var r = +new Date(), i = 0; i < Ee.length; i++) {
              var n = Ee[i];if (!n.el.removed && !n.paused) {
                var a = r - n.start,
                    s = n.ms,
                    o = n.easing,
                    l = n.from,
                    h = n.diff,
                    u = n.to,
                    c = n.t,
                    f = n.el,
                    p = {},
                    d,
                    g = {},
                    v;if (n.initstatus ? (a = (n.initstatus * n.anim.top - n.prev) / (n.percent - n.prev) * s, n.status = n.initstatus, delete n.initstatus, n.stop && Ee.splice(i--, 1)) : n.status = (n.prev + (n.percent - n.prev) * (a / s)) / n.anim.top, !(a < 0)) if (a < s) {
                  var x = o(a / s);for (var y in l) if (l[A](y)) {
                    switch (pt[y]) {case $:
                        d = +l[y] + x * s * h[y];break;case "colour":
                        d = "rgb(" + [Le(ot(l[y].r + x * s * h[y].r)), Le(ot(l[y].g + x * s * h[y].g)), Le(ot(l[y].b + x * s * h[y].b))].join(",") + ")";break;case "path":
                        d = [];for (var m = 0, _ = l[y].length; m < _; m++) {
                          d[m] = [l[y][m][0]];for (var w = 1, k = l[y][m].length; w < k; w++) d[m][w] = +l[y][m][w] + x * s * h[y][m][w];d[m] = d[m].join(j);
                        }d = d.join(j);break;case "transform":
                        if (h[y].real) for (d = [], m = 0, _ = l[y].length; m < _; m++) for (d[m] = [l[y][m][0]], w = 1, k = l[y][m].length; w < k; w++) d[m][w] = l[y][m][w] + x * s * h[y][m][w];else {
                          var B = function (t) {
                            return +l[y][t] + x * s * h[y][t];
                          };d = [["m", B(0), B(1), B(2), B(3), B(4), B(5)]];
                        }break;case "csv":
                        if ("clip-rect" == y) for (d = [], m = 4; m--;) d[m] = +l[y][m] + x * s * h[y][m];break;default:
                        var C = [][P](l[y]);for (d = [], m = f.paper.customAttributes[y].length; m--;) d[m] = +C[m] + x * s * h[y][m];}p[y] = d;
                  }f.attr(p), function (e, r, i) {
                    setTimeout(function () {
                      t("raphael.anim.frame." + e, r, i);
                    });
                  }(f.id, f, n.anim);
                } else {
                  if (function (r, i, n) {
                    setTimeout(function () {
                      t("raphael.anim.frame." + i.id, i, n), t("raphael.anim.finish." + i.id, i, n), e.is(r, "function") && r.call(i);
                    });
                  }(n.callback, f, n.anim), f.attr(u), Ee.splice(i--, 1), n.repeat > 1 && !n.next) {
                    for (v in u) u[A](v) && (g[v] = n.totalOrigin[v]);n.el.attr(g), b(n.anim, n.el, n.anim.percents[0], null, n.totalOrigin, n.repeat - 1);
                  }n.next && !n.stop && b(n.anim, n.el, n.next, null, n.totalOrigin, n.repeat);
                }
              }
            }Ee.length && Me(Ne);
          },
              Le = function (t) {
            return t > 255 ? 255 : t < 0 ? 0 : t;
          };ye.animateWith = function (t, r, i, n, a, s) {
            var o = this;if (o.removed) return s && s.call(o), o;var l = i instanceof m ? i : e.animation(i, n, a, s),
                h,
                u;b(l, o, l.percents[0], null, o.attr());for (var c = 0, f = Ee.length; c < f; c++) if (Ee[c].anim == r && Ee[c].el == t) {
              Ee[f - 1].start = Ee[c].start;break;
            }return o;
          }, ye.onAnimation = function (e) {
            return e ? t.on("raphael.anim.frame." + this.id, e) : t.unbind("raphael.anim.frame." + this.id), this;
          }, m.prototype.delay = function (t) {
            var e = new m(this.anim, this.ms);return e.times = this.times, e.del = +t || 0, e;
          }, m.prototype.repeat = function (t) {
            var e = new m(this.anim, this.ms);return e.del = this.del, e.times = Y.floor(W(t, 0)) || 1, e;
          }, e.animation = function (t, r, i, n) {
            if (t instanceof m) return t;!e.is(i, "function") && i || (n = n || i || null, i = null), t = Object(t), r = +r || 0;var a = {},
                s,
                o;for (o in t) t[A](o) && ht(o) != o && ht(o) + "%" != o && (s = !0, a[o] = t[o]);if (s) return i && (a.easing = i), n && (a.callback = n), new m({ 100: a }, r);if (n) {
              var l = 0;for (var h in t) {
                var u = ut(h);t[A](h) && u > l && (l = u);
              }l += "%", !t[l].callback && (t[l].callback = n);
            }return new m(t, r);
          }, ye.animate = function (t, r, i, n) {
            var a = this;if (a.removed) return n && n.call(a), a;var s = t instanceof m ? t : e.animation(t, r, i, n);return b(s, a, s.percents[0], null, a.attr()), a;
          }, ye.setTime = function (t, e) {
            return t && null != e && this.status(t, G(e, t.ms) / t.ms), this;
          }, ye.status = function (t, e) {
            var r = [],
                i = 0,
                n,
                a;if (null != e) return b(t, this, -1, G(e, 1)), this;for (n = Ee.length; i < n; i++) if (a = Ee[i], a.el.id == this.id && (!t || a.anim == t)) {
              if (t) return a.status;r.push({ anim: a.anim, status: a.status });
            }return t ? 0 : r;
          }, ye.pause = function (e) {
            for (var r = 0; r < Ee.length; r++) Ee[r].el.id != this.id || e && Ee[r].anim != e || t("raphael.anim.pause." + this.id, this, Ee[r].anim) !== !1 && (Ee[r].paused = !0);return this;
          }, ye.resume = function (e) {
            for (var r = 0; r < Ee.length; r++) if (Ee[r].el.id == this.id && (!e || Ee[r].anim == e)) {
              var i = Ee[r];t("raphael.anim.resume." + this.id, this, i.anim) !== !1 && (delete i.paused, this.status(i.anim, i.status));
            }return this;
          }, ye.stop = function (e) {
            for (var r = 0; r < Ee.length; r++) Ee[r].el.id != this.id || e && Ee[r].anim != e || t("raphael.anim.stop." + this.id, this, Ee[r].anim) !== !1 && Ee.splice(r--, 1);return this;
          }, t.on("raphael.remove", _), t.on("raphael.clear", _), ye.toString = function () {
            return "Raphaël’s object";
          };var ze = function (t) {
            if (this.items = [], this.length = 0, this.type = "set", t) for (var e = 0, r = t.length; e < r; e++) !t[e] || t[e].constructor != ye.constructor && t[e].constructor != ze || (this[this.items.length] = this.items[this.items.length] = t[e], this.length++);
          },
              Pe = ze.prototype;Pe.push = function () {
            for (var t, e, r = 0, i = arguments.length; r < i; r++) t = arguments[r], !t || t.constructor != ye.constructor && t.constructor != ze || (e = this.items.length, this[e] = this.items[e] = t, this.length++);return this;
          }, Pe.pop = function () {
            return this.length && delete this[this.length--], this.items.pop();
          }, Pe.forEach = function (t, e) {
            for (var r = 0, i = this.items.length; r < i; r++) if (t.call(e, this.items[r], r) === !1) return this;return this;
          };for (var Fe in ye) ye[A](Fe) && (Pe[Fe] = function (t) {
            return function () {
              var e = arguments;return this.forEach(function (r) {
                r[t][z](r, e);
              });
            };
          }(Fe));return Pe.attr = function (t, r) {
            if (t && e.is(t, Q) && e.is(t[0], "object")) for (var i = 0, n = t.length; i < n; i++) this.items[i].attr(t[i]);else for (var a = 0, s = this.items.length; a < s; a++) this.items[a].attr(t, r);return this;
          }, Pe.clear = function () {
            for (; this.length;) this.pop();
          }, Pe.splice = function (t, e, r) {
            t = t < 0 ? W(this.length + t, 0) : t, e = W(0, G(this.length - t, e));var i = [],
                n = [],
                a = [],
                s;for (s = 2; s < arguments.length; s++) a.push(arguments[s]);for (s = 0; s < e; s++) n.push(this[t + s]);for (; s < this.length - t; s++) i.push(this[t + s]);var o = a.length;for (s = 0; s < o + i.length; s++) this.items[t + s] = this[t + s] = s < o ? a[s] : i[s - o];for (s = this.items.length = this.length -= e - o; this[s];) delete this[s++];return new ze(n);
          }, Pe.exclude = function (t) {
            for (var e = 0, r = this.length; e < r; e++) if (this[e] == t) return this.splice(e, 1), !0;
          }, Pe.animate = function (t, r, i, n) {
            (e.is(i, "function") || !i) && (n = i || null);var a = this.items.length,
                s = a,
                o,
                l = this,
                h;if (!a) return this;n && (h = function () {
              ! --a && n.call(l);
            }), i = e.is(i, Z) ? i : h;var u = e.animation(t, r, i, h);for (o = this.items[--s].animate(u); s--;) this.items[s] && !this.items[s].removed && this.items[s].animateWith(o, u, u), this.items[s] && !this.items[s].removed || a--;return this;
          }, Pe.insertAfter = function (t) {
            for (var e = this.items.length; e--;) this.items[e].insertAfter(t);return this;
          }, Pe.getBBox = function () {
            for (var t = [], e = [], r = [], i = [], n = this.items.length; n--;) if (!this.items[n].removed) {
              var a = this.items[n].getBBox();t.push(a.x), e.push(a.y), r.push(a.x + a.width), i.push(a.y + a.height);
            }return t = G[z](0, t), e = G[z](0, e), r = W[z](0, r), i = W[z](0, i), { x: t, y: e, x2: r, y2: i, width: r - t, height: i - e };
          }, Pe.clone = function (t) {
            t = this.paper.set();for (var e = 0, r = this.items.length; e < r; e++) t.push(this.items[e].clone());return t;
          }, Pe.toString = function () {
            return "Raphaël‘s set";
          }, Pe.glow = function (t) {
            var e = this.paper.set();return this.forEach(function (r, i) {
              var n = r.glow(t);null != n && n.forEach(function (t, r) {
                e.push(t);
              });
            }), e;
          }, Pe.isPointInside = function (t, e) {
            var r = !1;return this.forEach(function (i) {
              if (i.isPointInside(t, e)) return r = !0, !1;
            }), r;
          }, e.registerFont = function (t) {
            if (!t.face) return t;this.fonts = this.fonts || {};var e = { w: t.w, face: {}, glyphs: {} },
                r = t.face["font-family"];for (var i in t.face) t.face[A](i) && (e.face[i] = t.face[i]);if (this.fonts[r] ? this.fonts[r].push(e) : this.fonts[r] = [e], !t.svg) {
              e.face["units-per-em"] = ut(t.face["units-per-em"], 10);for (var n in t.glyphs) if (t.glyphs[A](n)) {
                var a = t.glyphs[n];if (e.glyphs[n] = { w: a.w, k: {}, d: a.d && "M" + a.d.replace(/[mlcxtrv]/g, function (t) {
                    return { l: "L", c: "C", x: "z", t: "m", r: "l", v: "c" }[t] || "M";
                  }) + "z" }, a.k) for (var s in a.k) a[A](s) && (e.glyphs[n].k[s] = a.k[s]);
              }
            }return t;
          }, N.getFont = function (t, r, i, n) {
            if (n = n || "normal", i = i || "normal", r = +r || { normal: 400, bold: 700, lighter: 300, bolder: 800 }[r] || 400, e.fonts) {
              var a = e.fonts[t];if (!a) {
                var s = new RegExp("(^|\\s)" + t.replace(/[^\w\d\s+!~.:_-]/g, R) + "(\\s|$)", "i");for (var o in e.fonts) if (e.fonts[A](o) && s.test(o)) {
                  a = e.fonts[o];break;
                }
              }var l;if (a) for (var h = 0, u = a.length; h < u && (l = a[h], l.face["font-weight"] != r || l.face["font-style"] != i && l.face["font-style"] || l.face["font-stretch"] != n); h++);return l;
            }
          }, N.print = function (t, r, i, n, a, s, o, l) {
            s = s || "middle", o = W(G(o || 0, 1), -1), l = W(G(l || 1, 3), 1);var h = I(i)[q](R),
                u = 0,
                c = 0,
                f = R,
                p;if (e.is(n, "string") && (n = this.getFont(n)), n) {
              p = (a || 16) / n.face["units-per-em"];for (var d = n.face.bbox[q](k), g = +d[0], v = d[3] - d[1], x = 0, y = +d[1] + ("baseline" == s ? v + +n.face.descent : v / 2), m = 0, b = h.length; m < b; m++) {
                if ("\n" == h[m]) u = 0, w = 0, c = 0, x += v * l;else {
                  var _ = c && n.glyphs[h[m - 1]] || {},
                      w = n.glyphs[h[m]];u += c ? (_.w || n.w) + (_.k && _.k[h[m]] || 0) + n.w * o : 0, c = 1;
                }w && w.d && (f += e.transformPath(w.d, ["t", u * p, x * p, "s", p, p, g, y, "t", (t - g) / p, (r - y) / p]));
              }
            }return this.path(f).attr({ fill: "#000", stroke: "none" });
          }, N.add = function (t) {
            if (e.is(t, "array")) for (var r = this.set(), i = 0, n = t.length, a; i < n; i++) a = t[i] || {}, B[A](a.type) && r.push(this[a.type]().attr(a));return r;
          }, e.format = function (t, r) {
            var i = e.is(r, Q) ? [0][P](r) : arguments;return t && e.is(t, Z) && i.length - 1 && (t = t.replace(C, function (t, e) {
              return null == i[++e] ? R : i[e];
            })), t || R;
          }, e.fullfill = function () {
            var t = /\{([^\}]+)\}/g,
                e = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                r = function (t, r, i) {
              var n = i;return r.replace(e, function (t, e, r, i, a) {
                e = e || i, n && (e in n && (n = n[e]), "function" == typeof n && a && (n = n()));
              }), n = (null == n || n == i ? t : n) + "";
            };return function (e, i) {
              return String(e).replace(t, function (t, e) {
                return r(t, e, i);
              });
            };
          }(), e.ninja = function () {
            if (E.was) T.win.Raphael = E.is;else {
              window.Raphael = void 0;try {
                delete window.Raphael;
              } catch (t) {}
            }return e;
          }, e.st = Pe, t.on("raphael.DOMload", function () {
            w = !0;
          }), function (t, r, i) {
            function n() {
              /in/.test(t.readyState) ? setTimeout(n, 9) : e.eve("raphael.DOMload");
            }null == t.readyState && t.addEventListener && (t.addEventListener(r, i = function () {
              t.removeEventListener(r, i, !1), t.readyState = "complete";
            }, !1), t.readyState = "loading"), n();
          }(document, "DOMContentLoaded"), e;
        }.apply(e, i), !(void 0 !== n && (t.exports = n));
      }, function (t, e, r) {
        var i, n;!function (r) {
          var a = "0.5.0",
              s = "hasOwnProperty",
              o = /[\.\/]/,
              l = /\s*,\s*/,
              h = "*",
              u = function () {},
              c = function (t, e) {
            return t - e;
          },
              f,
              p,
              d = { n: {} },
              g = function () {
            for (var t = 0, e = this.length; t < e; t++) if ("undefined" != typeof this[t]) return this[t];
          },
              v = function () {
            for (var t = this.length; --t;) if ("undefined" != typeof this[t]) return this[t];
          },
              x = Object.prototype.toString,
              y = String,
              m = Array.isArray || function (t) {
            return t instanceof Array || "[object Array]" == x.call(t);
          };eve = function (t, e) {
            var r = d,
                i = p,
                n = Array.prototype.slice.call(arguments, 2),
                a = eve.listeners(t),
                s = 0,
                o = !1,
                l,
                h = [],
                u = {},
                x = [],
                y = f,
                m = [];x.firstDefined = g, x.lastDefined = v, f = t, p = 0;for (var b = 0, _ = a.length; b < _; b++) "zIndex" in a[b] && (h.push(a[b].zIndex), a[b].zIndex < 0 && (u[a[b].zIndex] = a[b]));for (h.sort(c); h[s] < 0;) if (l = u[h[s++]], x.push(l.apply(e, n)), p) return p = i, x;for (b = 0; b < _; b++) if (l = a[b], "zIndex" in l) {
              if (l.zIndex == h[s]) {
                if (x.push(l.apply(e, n)), p) break;do if (s++, l = u[h[s]], l && x.push(l.apply(e, n)), p) break; while (l);
              } else u[l.zIndex] = l;
            } else if (x.push(l.apply(e, n)), p) break;return p = i, f = y, x;
          }, eve._events = d, eve.listeners = function (t) {
            var e = m(t) ? t : t.split(o),
                r = d,
                i,
                n,
                a,
                s,
                l,
                u,
                c,
                f,
                p = [r],
                g = [];for (s = 0, l = e.length; s < l; s++) {
              for (f = [], u = 0, c = p.length; u < c; u++) for (r = p[u].n, n = [r[e[s]], r[h]], a = 2; a--;) i = n[a], i && (f.push(i), g = g.concat(i.f || []));p = f;
            }return g;
          }, eve.separator = function (t) {
            t ? (t = y(t).replace(/(?=[\.\^\]\[\-])/g, "\\"), t = "[" + t + "]", o = new RegExp(t)) : o = /[\.\/]/;
          }, eve.on = function (t, e) {
            if ("function" != typeof e) return function () {};for (var r = m(t) ? m(t[0]) ? t : [t] : y(t).split(l), i = 0, n = r.length; i < n; i++) !function (t) {
              for (var r = m(t) ? t : y(t).split(o), i = d, n, a = 0, s = r.length; a < s; a++) i = i.n, i = i.hasOwnProperty(r[a]) && i[r[a]] || (i[r[a]] = { n: {} });for (i.f = i.f || [], a = 0, s = i.f.length; a < s; a++) if (i.f[a] == e) {
                n = !0;break;
              }!n && i.f.push(e);
            }(r[i]);return function (t) {
              +t == +t && (e.zIndex = +t);
            };
          }, eve.f = function (t) {
            var e = [].slice.call(arguments, 1);return function () {
              eve.apply(null, [t, null].concat(e).concat([].slice.call(arguments, 0)));
            };
          }, eve.stop = function () {
            p = 1;
          }, eve.nt = function (t) {
            var e = m(f) ? f.join(".") : f;return t ? new RegExp("(?:\\.|\\/|^)" + t + "(?:\\.|\\/|$)").test(e) : e;
          }, eve.nts = function () {
            return m(f) ? f : f.split(o);
          }, eve.off = eve.unbind = function (t, e) {
            if (!t) return void (eve._events = d = { n: {} });var r = m(t) ? m(t[0]) ? t : [t] : y(t).split(l);if (r.length > 1) for (var i = 0, n = r.length; i < n; i++) eve.off(r[i], e);else {
              r = m(t) ? t : y(t).split(o);var a,
                  u,
                  c,
                  i,
                  n,
                  f,
                  p,
                  g = [d];for (i = 0, n = r.length; i < n; i++) for (f = 0; f < g.length; f += c.length - 2) {
                if (c = [f, 1], a = g[f].n, r[i] != h) a[r[i]] && c.push(a[r[i]]);else for (u in a) a[s](u) && c.push(a[u]);g.splice.apply(g, c);
              }for (i = 0, n = g.length; i < n; i++) for (a = g[i]; a.n;) {
                if (e) {
                  if (a.f) {
                    for (f = 0, p = a.f.length; f < p; f++) if (a.f[f] == e) {
                      a.f.splice(f, 1);break;
                    }!a.f.length && delete a.f;
                  }for (u in a.n) if (a.n[s](u) && a.n[u].f) {
                    var v = a.n[u].f;for (f = 0, p = v.length; f < p; f++) if (v[f] == e) {
                      v.splice(f, 1);break;
                    }!v.length && delete a.n[u].f;
                  }
                } else {
                  delete a.f;for (u in a.n) a.n[s](u) && a.n[u].f && delete a.n[u].f;
                }a = a.n;
              }
            }
          }, eve.once = function (t, e) {
            var r = function () {
              return eve.off(t, r), e.apply(this, arguments);
            };return eve.on(t, r);
          }, eve.version = a, eve.toString = function () {
            return "You are running Eve " + a;
          }, "undefined" != typeof t && t.exports ? t.exports = eve : (i = [], n = function () {
            return eve;
          }.apply(e, i), !(void 0 !== n && (t.exports = n)));
        }(this);
      }, function (t, e, r) {
        var i, n;i = [r(1)], n = function (t) {
          if (!t || t.svg) {
            var e = "hasOwnProperty",
                r = String,
                i = parseFloat,
                n = parseInt,
                a = Math,
                s = a.max,
                o = a.abs,
                l = a.pow,
                h = /[, ]+/,
                u = t.eve,
                c = "",
                f = " ",
                p = "http://www.w3.org/1999/xlink",
                d = { block: "M5,0 0,2.5 5,5z", classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z", diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z", open: "M6,1 1,3.5 6,6", oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z" },
                g = {};t.toString = function () {
              return "Your browser supports SVG.\nYou are running Raphaël " + this.version;
            };var v = function (i, n) {
              if (n) {
                "string" == typeof i && (i = v(i));for (var a in n) n[e](a) && ("xlink:" == a.substring(0, 6) ? i.setAttributeNS(p, a.substring(6), r(n[a])) : i.setAttribute(a, r(n[a])));
              } else i = t._g.doc.createElementNS("http://www.w3.org/2000/svg", i), i.style && (i.style.webkitTapHighlightColor = "rgba(0,0,0,0)");return i;
            },
                x = function (e, n) {
              var h = "linear",
                  u = e.id + n,
                  f = .5,
                  p = .5,
                  d = e.node,
                  g = e.paper,
                  x = d.style,
                  y = t._g.doc.getElementById(u);if (!y) {
                if (n = r(n).replace(t._radial_gradient, function (t, e, r) {
                  if (h = "radial", e && r) {
                    f = i(e), p = i(r);var n = 2 * (p > .5) - 1;l(f - .5, 2) + l(p - .5, 2) > .25 && (p = a.sqrt(.25 - l(f - .5, 2)) * n + .5) && .5 != p && (p = p.toFixed(5) - 1e-5 * n);
                  }return c;
                }), n = n.split(/\s*\-\s*/), "linear" == h) {
                  var b = n.shift();if (b = -i(b), isNaN(b)) return null;var _ = [0, 0, a.cos(t.rad(b)), a.sin(t.rad(b))],
                      w = 1 / (s(o(_[2]), o(_[3])) || 1);_[2] *= w, _[3] *= w, _[2] < 0 && (_[0] = -_[2], _[2] = 0), _[3] < 0 && (_[1] = -_[3], _[3] = 0);
                }var k = t._parseDots(n);if (!k) return null;if (u = u.replace(/[\(\)\s,\xb0#]/g, "_"), e.gradient && u != e.gradient.id && (g.defs.removeChild(e.gradient), delete e.gradient), !e.gradient) {
                  y = v(h + "Gradient", { id: u }), e.gradient = y, v(y, "radial" == h ? { fx: f, fy: p } : { x1: _[0], y1: _[1], x2: _[2], y2: _[3], gradientTransform: e.matrix.invert() }), g.defs.appendChild(y);for (var B = 0, C = k.length; B < C; B++) y.appendChild(v("stop", { offset: k[B].offset ? k[B].offset : B ? "100%" : "0%", "stop-color": k[B].color || "#fff", "stop-opacity": isFinite(k[B].opacity) ? k[B].opacity : 1 }));
                }
              }return v(d, { fill: m(u), opacity: 1, "fill-opacity": 1 }), x.fill = c, x.opacity = 1, x.fillOpacity = 1, 1;
            },
                y = function () {
              var t = document.documentMode;return t && (9 === t || 10 === t);
            },
                m = function (t) {
              if (y()) return "url('#" + t + "')";var e = document.location,
                  r = e.protocol + "//" + e.host + e.pathname + e.search;return "url('" + r + "#" + t + "')";
            },
                b = function (t) {
              var e = t.getBBox(1);v(t.pattern, { patternTransform: t.matrix.invert() + " translate(" + e.x + "," + e.y + ")" });
            },
                _ = function (i, n, a) {
              if ("path" == i.type) {
                for (var s = r(n).toLowerCase().split("-"), o = i.paper, l = a ? "end" : "start", h = i.node, u = i.attrs, f = u["stroke-width"], p = s.length, x = "classic", y, m, b, _, w, k = 3, B = 3, C = 5; p--;) switch (s[p]) {case "block":case "classic":case "oval":case "diamond":case "open":case "none":
                    x = s[p];break;case "wide":
                    B = 5;break;case "narrow":
                    B = 2;break;case "long":
                    k = 5;break;case "short":
                    k = 2;}if ("open" == x ? (k += 2, B += 2, C += 2, b = 1, _ = a ? 4 : 1, w = { fill: "none", stroke: u.stroke }) : (_ = b = k / 2, w = { fill: u.stroke, stroke: "none" }), i._.arrows ? a ? (i._.arrows.endPath && g[i._.arrows.endPath]--, i._.arrows.endMarker && g[i._.arrows.endMarker]--) : (i._.arrows.startPath && g[i._.arrows.startPath]--, i._.arrows.startMarker && g[i._.arrows.startMarker]--) : i._.arrows = {}, "none" != x) {
                  var S = "raphael-marker-" + x,
                      A = "raphael-marker-" + l + x + k + B + "-obj" + i.id;t._g.doc.getElementById(S) ? g[S]++ : (o.defs.appendChild(v(v("path"), { "stroke-linecap": "round", d: d[x], id: S })), g[S] = 1);var T = t._g.doc.getElementById(A),
                      E;T ? (g[A]++, E = T.getElementsByTagName("use")[0]) : (T = v(v("marker"), { id: A, markerHeight: B, markerWidth: k, orient: "auto", refX: _, refY: B / 2 }), E = v(v("use"), { "xlink:href": "#" + S, transform: (a ? "rotate(180 " + k / 2 + " " + B / 2 + ") " : c) + "scale(" + k / C + "," + B / C + ")", "stroke-width": (1 / ((k / C + B / C) / 2)).toFixed(4) }), T.appendChild(E), o.defs.appendChild(T), g[A] = 1), v(E, w);var M = b * ("diamond" != x && "oval" != x);a ? (y = i._.arrows.startdx * f || 0, m = t.getTotalLength(u.path) - M * f) : (y = M * f, m = t.getTotalLength(u.path) - (i._.arrows.enddx * f || 0)), w = {}, w["marker-" + l] = "url(#" + A + ")", (m || y) && (w.d = t.getSubpath(u.path, y, m)), v(h, w), i._.arrows[l + "Path"] = S, i._.arrows[l + "Marker"] = A, i._.arrows[l + "dx"] = M, i._.arrows[l + "Type"] = x, i._.arrows[l + "String"] = n;
                } else a ? (y = i._.arrows.startdx * f || 0, m = t.getTotalLength(u.path) - y) : (y = 0, m = t.getTotalLength(u.path) - (i._.arrows.enddx * f || 0)), i._.arrows[l + "Path"] && v(h, { d: t.getSubpath(u.path, y, m) }), delete i._.arrows[l + "Path"], delete i._.arrows[l + "Marker"], delete i._.arrows[l + "dx"], delete i._.arrows[l + "Type"], delete i._.arrows[l + "String"];for (w in g) if (g[e](w) && !g[w]) {
                  var N = t._g.doc.getElementById(w);N && N.parentNode.removeChild(N);
                }
              }
            },
                w = { "-": [3, 1], ".": [1, 1], "-.": [3, 1, 1, 1], "-..": [3, 1, 1, 1, 1, 1], ". ": [1, 3], "- ": [4, 3], "--": [8, 3], "- .": [4, 3, 1, 3], "--.": [8, 3, 1, 3], "--..": [8, 3, 1, 3, 1, 3] },
                k = function (t, e, i) {
              if (e = w[r(e).toLowerCase()]) {
                for (var n = t.attrs["stroke-width"] || "1", a = { round: n, square: n, butt: 0 }[t.attrs["stroke-linecap"] || i["stroke-linecap"]] || 0, s = [], o = e.length; o--;) s[o] = e[o] * n + (o % 2 ? 1 : -1) * a;v(t.node, { "stroke-dasharray": s.join(",") });
              } else v(t.node, { "stroke-dasharray": "none" });
            },
                B = function (i, a) {
              var l = i.node,
                  u = i.attrs,
                  f = l.style.visibility;l.style.visibility = "hidden";for (var d in a) if (a[e](d)) {
                if (!t._availableAttrs[e](d)) continue;var g = a[d];switch (u[d] = g, d) {case "blur":
                    i.blur(g);break;case "title":
                    var y = l.getElementsByTagName("title");if (y.length && (y = y[0])) y.firstChild.nodeValue = g;else {
                      y = v("title");var m = t._g.doc.createTextNode(g);y.appendChild(m), l.appendChild(y);
                    }break;case "href":case "target":
                    var w = l.parentNode;if ("a" != w.tagName.toLowerCase()) {
                      var B = v("a");w.insertBefore(B, l), B.appendChild(l), w = B;
                    }"target" == d ? w.setAttributeNS(p, "show", "blank" == g ? "new" : g) : w.setAttributeNS(p, d, g);break;case "cursor":
                    l.style.cursor = g;break;case "transform":
                    i.transform(g);break;case "arrow-start":
                    _(i, g);break;case "arrow-end":
                    _(i, g, 1);break;case "clip-rect":
                    var C = r(g).split(h);if (4 == C.length) {
                      i.clip && i.clip.parentNode.parentNode.removeChild(i.clip.parentNode);var A = v("clipPath"),
                          T = v("rect");A.id = t.createUUID(), v(T, { x: C[0], y: C[1], width: C[2], height: C[3] }), A.appendChild(T), i.paper.defs.appendChild(A), v(l, { "clip-path": "url(#" + A.id + ")" }), i.clip = T;
                    }if (!g) {
                      var E = l.getAttribute("clip-path");if (E) {
                        var M = t._g.doc.getElementById(E.replace(/(^url\(#|\)$)/g, c));M && M.parentNode.removeChild(M), v(l, { "clip-path": c }), delete i.clip;
                      }
                    }break;case "path":
                    "path" == i.type && (v(l, { d: g ? u.path = t._pathToAbsolute(g) : "M0,0" }), i._.dirty = 1, i._.arrows && ("startString" in i._.arrows && _(i, i._.arrows.startString), "endString" in i._.arrows && _(i, i._.arrows.endString, 1)));break;case "width":
                    if (l.setAttribute(d, g), i._.dirty = 1, !u.fx) break;d = "x", g = u.x;case "x":
                    u.fx && (g = -u.x - (u.width || 0));case "rx":
                    if ("rx" == d && "rect" == i.type) break;case "cx":
                    l.setAttribute(d, g), i.pattern && b(i), i._.dirty = 1;break;case "height":
                    if (l.setAttribute(d, g), i._.dirty = 1, !u.fy) break;d = "y", g = u.y;case "y":
                    u.fy && (g = -u.y - (u.height || 0));case "ry":
                    if ("ry" == d && "rect" == i.type) break;case "cy":
                    l.setAttribute(d, g), i.pattern && b(i), i._.dirty = 1;break;case "r":
                    "rect" == i.type ? v(l, { rx: g, ry: g }) : l.setAttribute(d, g), i._.dirty = 1;break;case "src":
                    "image" == i.type && l.setAttributeNS(p, "href", g);break;case "stroke-width":
                    1 == i._.sx && 1 == i._.sy || (g /= s(o(i._.sx), o(i._.sy)) || 1), l.setAttribute(d, g), u["stroke-dasharray"] && k(i, u["stroke-dasharray"], a), i._.arrows && ("startString" in i._.arrows && _(i, i._.arrows.startString), "endString" in i._.arrows && _(i, i._.arrows.endString, 1));break;case "stroke-dasharray":
                    k(i, g, a);break;case "fill":
                    var N = r(g).match(t._ISURL);if (N) {
                      A = v("pattern");var L = v("image");A.id = t.createUUID(), v(A, { x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1 }), v(L, { x: 0, y: 0, "xlink:href": N[1] }), A.appendChild(L), function (e) {
                        t._preload(N[1], function () {
                          var t = this.offsetWidth,
                              r = this.offsetHeight;v(e, { width: t, height: r }), v(L, { width: t, height: r });
                        });
                      }(A), i.paper.defs.appendChild(A), v(l, { fill: "url(#" + A.id + ")" }), i.pattern = A, i.pattern && b(i);break;
                    }var z = t.getRGB(g);if (z.error) {
                      if (("circle" == i.type || "ellipse" == i.type || "r" != r(g).charAt()) && x(i, g)) {
                        if ("opacity" in u || "fill-opacity" in u) {
                          var P = t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, c));if (P) {
                            var F = P.getElementsByTagName("stop");v(F[F.length - 1], { "stop-opacity": ("opacity" in u ? u.opacity : 1) * ("fill-opacity" in u ? u["fill-opacity"] : 1) });
                          }
                        }u.gradient = g, u.fill = "none";break;
                      }
                    } else delete a.gradient, delete u.gradient, !t.is(u.opacity, "undefined") && t.is(a.opacity, "undefined") && v(l, { opacity: u.opacity }), !t.is(u["fill-opacity"], "undefined") && t.is(a["fill-opacity"], "undefined") && v(l, { "fill-opacity": u["fill-opacity"] });z[e]("opacity") && v(l, { "fill-opacity": z.opacity > 1 ? z.opacity / 100 : z.opacity });case "stroke":
                    z = t.getRGB(g), l.setAttribute(d, z.hex), "stroke" == d && z[e]("opacity") && v(l, { "stroke-opacity": z.opacity > 1 ? z.opacity / 100 : z.opacity }), "stroke" == d && i._.arrows && ("startString" in i._.arrows && _(i, i._.arrows.startString), "endString" in i._.arrows && _(i, i._.arrows.endString, 1));break;case "gradient":
                    ("circle" == i.type || "ellipse" == i.type || "r" != r(g).charAt()) && x(i, g);break;case "opacity":
                    u.gradient && !u[e]("stroke-opacity") && v(l, { "stroke-opacity": g > 1 ? g / 100 : g });case "fill-opacity":
                    if (u.gradient) {
                      P = t._g.doc.getElementById(l.getAttribute("fill").replace(/^url\(#|\)$/g, c)), P && (F = P.getElementsByTagName("stop"), v(F[F.length - 1], { "stop-opacity": g }));break;
                    }default:
                    "font-size" == d && (g = n(g, 10) + "px");var R = d.replace(/(\-.)/g, function (t) {
                      return t.substring(1).toUpperCase();
                    });l.style[R] = g, i._.dirty = 1, l.setAttribute(d, g);}
              }S(i, a), l.style.visibility = f;
            },
                C = 1.2,
                S = function (i, a) {
              if ("text" == i.type && (a[e]("text") || a[e]("font") || a[e]("font-size") || a[e]("x") || a[e]("y"))) {
                var s = i.attrs,
                    o = i.node,
                    l = o.firstChild ? n(t._g.doc.defaultView.getComputedStyle(o.firstChild, c).getPropertyValue("font-size"), 10) : 10;if (a[e]("text")) {
                  for (s.text = a.text; o.firstChild;) o.removeChild(o.firstChild);for (var h = r(a.text).split("\n"), u = [], f, p = 0, d = h.length; p < d; p++) f = v("tspan"), p && v(f, { dy: l * C, x: s.x }), f.appendChild(t._g.doc.createTextNode(h[p])), o.appendChild(f), u[p] = f;
                } else for (u = o.getElementsByTagName("tspan"), p = 0, d = u.length; p < d; p++) p ? v(u[p], { dy: l * C, x: s.x }) : v(u[0], { dy: 0 });v(o, { x: s.x, y: s.y }), i._.dirty = 1;var g = i._getBBox(),
                    x = s.y - (g.y + g.height / 2);x && t.is(x, "finite") && v(u[0], { dy: x });
              }
            },
                A = function (t) {
              return t.parentNode && "a" === t.parentNode.tagName.toLowerCase() ? t.parentNode : t;
            },
                T = function (e, r) {
              function i() {
                return ("0000" + (Math.random() * Math.pow(36, 5) << 0).toString(36)).slice(-5);
              }var n = 0,
                  a = 0;this[0] = this.node = e, e.raphael = !0, this.id = i(), e.raphaelid = this.id, this.matrix = t.matrix(), this.realPath = null, this.paper = r, this.attrs = this.attrs || {}, this._ = { transform: [], sx: 1, sy: 1, deg: 0, dx: 0, dy: 0, dirty: 1 }, !r.bottom && (r.bottom = this), this.prev = r.top, r.top && (r.top.next = this), r.top = this, this.next = null;
            },
                E = t.el;T.prototype = E, E.constructor = T, t._engine.path = function (t, e) {
              var r = v("path");e.canvas && e.canvas.appendChild(r);var i = new T(r, e);return i.type = "path", B(i, { fill: "none", stroke: "#000", path: t }), i;
            }, E.rotate = function (t, e, n) {
              if (this.removed) return this;if (t = r(t).split(h), t.length - 1 && (e = i(t[1]), n = i(t[2])), t = i(t[0]), null == n && (e = n), null == e || null == n) {
                var a = this.getBBox(1);e = a.x + a.width / 2, n = a.y + a.height / 2;
              }return this.transform(this._.transform.concat([["r", t, e, n]])), this;
            }, E.scale = function (t, e, n, a) {
              if (this.removed) return this;if (t = r(t).split(h), t.length - 1 && (e = i(t[1]), n = i(t[2]), a = i(t[3])), t = i(t[0]), null == e && (e = t), null == a && (n = a), null == n || null == a) var s = this.getBBox(1);return n = null == n ? s.x + s.width / 2 : n, a = null == a ? s.y + s.height / 2 : a, this.transform(this._.transform.concat([["s", t, e, n, a]])), this;
            }, E.translate = function (t, e) {
              return this.removed ? this : (t = r(t).split(h), t.length - 1 && (e = i(t[1])), t = i(t[0]) || 0, e = +e || 0, this.transform(this._.transform.concat([["t", t, e]])), this);
            }, E.transform = function (r) {
              var i = this._;if (null == r) return i.transform;if (t._extractTransform(this, r), this.clip && v(this.clip, { transform: this.matrix.invert() }), this.pattern && b(this), this.node && v(this.node, { transform: this.matrix }), 1 != i.sx || 1 != i.sy) {
                var n = this.attrs[e]("stroke-width") ? this.attrs["stroke-width"] : 1;this.attr({ "stroke-width": n });
              }return this;
            }, E.hide = function () {
              return this.removed || (this.node.style.display = "none"), this;
            }, E.show = function () {
              return this.removed || (this.node.style.display = ""), this;
            }, E.remove = function () {
              var e = A(this.node);if (!this.removed && e.parentNode) {
                var r = this.paper;r.__set__ && r.__set__.exclude(this), u.unbind("raphael.*.*." + this.id), this.gradient && r.defs.removeChild(this.gradient), t._tear(this, r), e.parentNode.removeChild(e), this.removeData();for (var i in this) this[i] = "function" == typeof this[i] ? t._removedFactory(i) : null;this.removed = !0;
              }
            }, E._getBBox = function () {
              if ("none" == this.node.style.display) {
                this.show();var t = !0;
              }var e = !1,
                  r;this.paper.canvas.parentElement ? r = this.paper.canvas.parentElement.style : this.paper.canvas.parentNode && (r = this.paper.canvas.parentNode.style), r && "none" == r.display && (e = !0, r.display = "");var i = {};try {
                i = this.node.getBBox();
              } catch (n) {
                i = { x: this.node.clientLeft, y: this.node.clientTop, width: this.node.clientWidth, height: this.node.clientHeight };
              } finally {
                i = i || {}, e && (r.display = "none");
              }return t && this.hide(), i;
            }, E.attr = function (r, i) {
              if (this.removed) return this;if (null == r) {
                var n = {};for (var a in this.attrs) this.attrs[e](a) && (n[a] = this.attrs[a]);return n.gradient && "none" == n.fill && (n.fill = n.gradient) && delete n.gradient, n.transform = this._.transform, n;
              }if (null == i && t.is(r, "string")) {
                if ("fill" == r && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;if ("transform" == r) return this._.transform;for (var s = r.split(h), o = {}, l = 0, c = s.length; l < c; l++) r = s[l], r in this.attrs ? o[r] = this.attrs[r] : t.is(this.paper.customAttributes[r], "function") ? o[r] = this.paper.customAttributes[r].def : o[r] = t._availableAttrs[r];return c - 1 ? o : o[s[0]];
              }if (null == i && t.is(r, "array")) {
                for (o = {}, l = 0, c = r.length; l < c; l++) o[r[l]] = this.attr(r[l]);return o;
              }if (null != i) {
                var f = {};f[r] = i;
              } else null != r && t.is(r, "object") && (f = r);for (var p in f) u("raphael.attr." + p + "." + this.id, this, f[p]);for (p in this.paper.customAttributes) if (this.paper.customAttributes[e](p) && f[e](p) && t.is(this.paper.customAttributes[p], "function")) {
                var d = this.paper.customAttributes[p].apply(this, [].concat(f[p]));this.attrs[p] = f[p];for (var g in d) d[e](g) && (f[g] = d[g]);
              }return B(this, f), this;
            }, E.toFront = function () {
              if (this.removed) return this;var e = A(this.node);e.parentNode.appendChild(e);var r = this.paper;return r.top != this && t._tofront(this, r), this;
            }, E.toBack = function () {
              if (this.removed) return this;var e = A(this.node),
                  r = e.parentNode;r.insertBefore(e, r.firstChild), t._toback(this, this.paper);var i = this.paper;return this;
            }, E.insertAfter = function (e) {
              if (this.removed || !e) return this;var r = A(this.node),
                  i = A(e.node || e[e.length - 1].node);return i.nextSibling ? i.parentNode.insertBefore(r, i.nextSibling) : i.parentNode.appendChild(r), t._insertafter(this, e, this.paper), this;
            }, E.insertBefore = function (e) {
              if (this.removed || !e) return this;var r = A(this.node),
                  i = A(e.node || e[0].node);return i.parentNode.insertBefore(r, i), t._insertbefore(this, e, this.paper), this;
            }, E.blur = function (e) {
              var r = this;if (0 !== +e) {
                var i = v("filter"),
                    n = v("feGaussianBlur");r.attrs.blur = e, i.id = t.createUUID(), v(n, { stdDeviation: +e || 1.5 }), i.appendChild(n), r.paper.defs.appendChild(i), r._blur = i, v(r.node, { filter: "url(#" + i.id + ")" });
              } else r._blur && (r._blur.parentNode.removeChild(r._blur), delete r._blur, delete r.attrs.blur), r.node.removeAttribute("filter");return r;
            }, t._engine.circle = function (t, e, r, i) {
              var n = v("circle");t.canvas && t.canvas.appendChild(n);var a = new T(n, t);return a.attrs = { cx: e, cy: r, r: i, fill: "none", stroke: "#000" }, a.type = "circle", v(n, a.attrs), a;
            }, t._engine.rect = function (t, e, r, i, n, a) {
              var s = v("rect");t.canvas && t.canvas.appendChild(s);var o = new T(s, t);return o.attrs = { x: e, y: r, width: i, height: n, rx: a || 0, ry: a || 0, fill: "none", stroke: "#000" }, o.type = "rect", v(s, o.attrs), o;
            }, t._engine.ellipse = function (t, e, r, i, n) {
              var a = v("ellipse");t.canvas && t.canvas.appendChild(a);var s = new T(a, t);return s.attrs = { cx: e, cy: r, rx: i, ry: n, fill: "none", stroke: "#000" }, s.type = "ellipse", v(a, s.attrs), s;
            }, t._engine.image = function (t, e, r, i, n, a) {
              var s = v("image");v(s, { x: r, y: i, width: n, height: a, preserveAspectRatio: "none" }), s.setAttributeNS(p, "href", e), t.canvas && t.canvas.appendChild(s);var o = new T(s, t);return o.attrs = { x: r, y: i, width: n, height: a, src: e }, o.type = "image", o;
            }, t._engine.text = function (e, r, i, n) {
              var a = v("text");e.canvas && e.canvas.appendChild(a);var s = new T(a, e);return s.attrs = { x: r, y: i, "text-anchor": "middle", text: n, "font-family": t._availableAttrs["font-family"], "font-size": t._availableAttrs["font-size"], stroke: "none", fill: "#000" }, s.type = "text", B(s, s.attrs), s;
            }, t._engine.setSize = function (t, e) {
              return this.width = t || this.width, this.height = e || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this;
            }, t._engine.create = function () {
              var e = t._getContainer.apply(0, arguments),
                  r = e && e.container,
                  i = e.x,
                  n = e.y,
                  a = e.width,
                  s = e.height;if (!r) throw new Error("SVG container not found.");var o = v("svg"),
                  l = "overflow:hidden;",
                  h;return i = i || 0, n = n || 0, a = a || 512, s = s || 342, v(o, { height: s, version: 1.1, width: a, xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }), 1 == r ? (o.style.cssText = l + "position:absolute;left:" + i + "px;top:" + n + "px", t._g.doc.body.appendChild(o), h = 1) : (o.style.cssText = l + "position:relative", r.firstChild ? r.insertBefore(o, r.firstChild) : r.appendChild(o)), r = new t._Paper(), r.width = a, r.height = s, r.canvas = o, r.clear(), r._left = r._top = 0, h && (r.renderfix = function () {}), r.renderfix(), r;
            }, t._engine.setViewBox = function (t, e, r, i, n) {
              u("raphael.setViewBox", this, this._viewBox, [t, e, r, i, n]);var a = this.getSize(),
                  o = s(r / a.width, i / a.height),
                  l = this.top,
                  h = n ? "xMidYMid meet" : "xMinYMin",
                  c,
                  p;for (null == t ? (this._vbSize && (o = 1), delete this._vbSize, c = "0 0 " + this.width + f + this.height) : (this._vbSize = o, c = t + f + e + f + r + f + i), v(this.canvas, { viewBox: c, preserveAspectRatio: h }); o && l;) p = "stroke-width" in l.attrs ? l.attrs["stroke-width"] : 1, l.attr({ "stroke-width": p }), l._.dirty = 1, l._.dirtyT = 1, l = l.prev;return this._viewBox = [t, e, r, i, !!n], this;
            }, t.prototype.renderfix = function () {
              var t = this.canvas,
                  e = t.style,
                  r;try {
                r = t.getScreenCTM() || t.createSVGMatrix();
              } catch (i) {
                r = t.createSVGMatrix();
              }var n = -r.e % 1,
                  a = -r.f % 1;(n || a) && (n && (this._left = (this._left + n) % 1, e.left = this._left + "px"), a && (this._top = (this._top + a) % 1, e.top = this._top + "px"));
            }, t.prototype.clear = function () {
              t.eve("raphael.clear", this);for (var e = this.canvas; e.firstChild;) e.removeChild(e.firstChild);this.bottom = this.top = null, (this.desc = v("desc")).appendChild(t._g.doc.createTextNode("Created with Raphaël " + t.version)), e.appendChild(this.desc), e.appendChild(this.defs = v("defs"));
            }, t.prototype.remove = function () {
              u("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;
            };var M = t.st;for (var N in E) E[e](N) && !M[e](N) && (M[N] = function (t) {
              return function () {
                var e = arguments;return this.forEach(function (r) {
                  r[t].apply(r, e);
                });
              };
            }(N));
          }
        }.apply(e, i), !(void 0 !== n && (t.exports = n));
      }, function (t, e, r) {
        var i, n;i = [r(1)], n = function (t) {
          if (!t || t.vml) {
            var e = "hasOwnProperty",
                r = String,
                i = parseFloat,
                n = Math,
                a = n.round,
                s = n.max,
                o = n.min,
                l = n.abs,
                h = "fill",
                u = /[, ]+/,
                c = t.eve,
                f = " progid:DXImageTransform.Microsoft",
                p = " ",
                d = "",
                g = { M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x" },
                v = /([clmz]),?([^clmz]*)/gi,
                x = / progid:\S+Blur\([^\)]+\)/g,
                y = /-?[^,\s-]+/g,
                m = "position:absolute;left:0;top:0;width:1px;height:1px;behavior:url(#default#VML)",
                b = 21600,
                _ = { path: 1, rect: 1, image: 1 },
                w = { circle: 1, ellipse: 1 },
                k = function (e) {
              var i = /[ahqstv]/gi,
                  n = t._pathToAbsolute;if (r(e).match(i) && (n = t._path2curve), i = /[clmz]/g, n == t._pathToAbsolute && !r(e).match(i)) {
                var s = r(e).replace(v, function (t, e, r) {
                  var i = [],
                      n = "m" == e.toLowerCase(),
                      s = g[e];return r.replace(y, function (t) {
                    n && 2 == i.length && (s += i + g["m" == e ? "l" : "L"], i = []), i.push(a(t * b));
                  }), s + i;
                });return s;
              }var o = n(e),
                  l,
                  h;s = [];for (var u = 0, c = o.length; u < c; u++) {
                l = o[u], h = o[u][0].toLowerCase(), "z" == h && (h = "x");for (var f = 1, x = l.length; f < x; f++) h += a(l[f] * b) + (f != x - 1 ? "," : d);s.push(h);
              }return s.join(p);
            },
                B = function (e, r, i) {
              var n = t.matrix();return n.rotate(-e, .5, .5), { dx: n.x(r, i), dy: n.y(r, i) };
            },
                C = function (t, e, r, i, n, a) {
              var s = t._,
                  o = t.matrix,
                  u = s.fillpos,
                  c = t.node,
                  f = c.style,
                  d = 1,
                  g = "",
                  v,
                  x = b / e,
                  y = b / r;if (f.visibility = "hidden", e && r) {
                if (c.coordsize = l(x) + p + l(y), f.rotation = a * (e * r < 0 ? -1 : 1), a) {
                  var m = B(a, i, n);i = m.dx, n = m.dy;
                }if (e < 0 && (g += "x"), r < 0 && (g += " y") && (d = -1), f.flip = g, c.coordorigin = i * -x + p + n * -y, u || s.fillsize) {
                  var _ = c.getElementsByTagName(h);_ = _ && _[0], c.removeChild(_), u && (m = B(a, o.x(u[0], u[1]), o.y(u[0], u[1])), _.position = m.dx * d + p + m.dy * d), s.fillsize && (_.size = s.fillsize[0] * l(e) + p + s.fillsize[1] * l(r)), c.appendChild(_);
                }f.visibility = "visible";
              }
            };t.toString = function () {
              return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version;
            };var S = function (t, e, i) {
              for (var n = r(e).toLowerCase().split("-"), a = i ? "end" : "start", s = n.length, o = "classic", l = "medium", h = "medium"; s--;) switch (n[s]) {case "block":case "classic":case "oval":case "diamond":case "open":case "none":
                  o = n[s];break;case "wide":case "narrow":
                  h = n[s];break;case "long":case "short":
                  l = n[s];}var u = t.node.getElementsByTagName("stroke")[0];u[a + "arrow"] = o, u[a + "arrowlength"] = l, u[a + "arrowwidth"] = h;
            },
                A = function (n, l) {
              n.attrs = n.attrs || {};var c = n.node,
                  f = n.attrs,
                  g = c.style,
                  v,
                  x = _[n.type] && (l.x != f.x || l.y != f.y || l.width != f.width || l.height != f.height || l.cx != f.cx || l.cy != f.cy || l.rx != f.rx || l.ry != f.ry || l.r != f.r),
                  y = w[n.type] && (f.cx != l.cx || f.cy != l.cy || f.r != l.r || f.rx != l.rx || f.ry != l.ry),
                  m = n;for (var B in l) l[e](B) && (f[B] = l[B]);if (x && (f.path = t._getPath[n.type](n), n._.dirty = 1), l.href && (c.href = l.href), l.title && (c.title = l.title), l.target && (c.target = l.target), l.cursor && (g.cursor = l.cursor), "blur" in l && n.blur(l.blur), (l.path && "path" == n.type || x) && (c.path = k(~r(f.path).toLowerCase().indexOf("r") ? t._pathToAbsolute(f.path) : f.path), n._.dirty = 1, "image" == n.type && (n._.fillpos = [f.x, f.y], n._.fillsize = [f.width, f.height], C(n, 1, 1, 0, 0, 0))), "transform" in l && n.transform(l.transform), y) {
                var A = +f.cx,
                    E = +f.cy,
                    M = +f.rx || +f.r || 0,
                    L = +f.ry || +f.r || 0;c.path = t.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", a((A - M) * b), a((E - L) * b), a((A + M) * b), a((E + L) * b), a(A * b)), n._.dirty = 1;
              }if ("clip-rect" in l) {
                var z = r(l["clip-rect"]).split(u);if (4 == z.length) {
                  z[2] = +z[2] + +z[0], z[3] = +z[3] + +z[1];var P = c.clipRect || t._g.doc.createElement("div"),
                      F = P.style;F.clip = t.format("rect({1}px {2}px {3}px {0}px)", z), c.clipRect || (F.position = "absolute", F.top = 0, F.left = 0, F.width = n.paper.width + "px", F.height = n.paper.height + "px", c.parentNode.insertBefore(P, c), P.appendChild(c), c.clipRect = P);
                }l["clip-rect"] || c.clipRect && (c.clipRect.style.clip = "auto");
              }if (n.textpath) {
                var R = n.textpath.style;l.font && (R.font = l.font), l["font-family"] && (R.fontFamily = '"' + l["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, d) + '"'), l["font-size"] && (R.fontSize = l["font-size"]), l["font-weight"] && (R.fontWeight = l["font-weight"]), l["font-style"] && (R.fontStyle = l["font-style"]);
              }if ("arrow-start" in l && S(m, l["arrow-start"]), "arrow-end" in l && S(m, l["arrow-end"], 1), null != l.opacity || null != l.fill || null != l.src || null != l.stroke || null != l["stroke-width"] || null != l["stroke-opacity"] || null != l["fill-opacity"] || null != l["stroke-dasharray"] || null != l["stroke-miterlimit"] || null != l["stroke-linejoin"] || null != l["stroke-linecap"]) {
                var j = c.getElementsByTagName(h),
                    I = !1;if (j = j && j[0], !j && (I = j = N(h)), "image" == n.type && l.src && (j.src = l.src), l.fill && (j.on = !0), null != j.on && "none" != l.fill && null !== l.fill || (j.on = !1), j.on && l.fill) {
                  var q = r(l.fill).match(t._ISURL);if (q) {
                    j.parentNode == c && c.removeChild(j), j.rotate = !0, j.src = q[1], j.type = "tile";var D = n.getBBox(1);j.position = D.x + p + D.y, n._.fillpos = [D.x, D.y], t._preload(q[1], function () {
                      n._.fillsize = [this.offsetWidth, this.offsetHeight];
                    });
                  } else j.color = t.getRGB(l.fill).hex, j.src = d, j.type = "solid", t.getRGB(l.fill).error && (m.type in { circle: 1, ellipse: 1 } || "r" != r(l.fill).charAt()) && T(m, l.fill, j) && (f.fill = "none", f.gradient = l.fill, j.rotate = !1);
                }if ("fill-opacity" in l || "opacity" in l) {
                  var V = ((+f["fill-opacity"] + 1 || 2) - 1) * ((+f.opacity + 1 || 2) - 1) * ((+t.getRGB(l.fill).o + 1 || 2) - 1);V = o(s(V, 0), 1), j.opacity = V, j.src && (j.color = "none");
                }c.appendChild(j);var O = c.getElementsByTagName("stroke") && c.getElementsByTagName("stroke")[0],
                    Y = !1;!O && (Y = O = N("stroke")), (l.stroke && "none" != l.stroke || l["stroke-width"] || null != l["stroke-opacity"] || l["stroke-dasharray"] || l["stroke-miterlimit"] || l["stroke-linejoin"] || l["stroke-linecap"]) && (O.on = !0), ("none" == l.stroke || null === l.stroke || null == O.on || 0 == l.stroke || 0 == l["stroke-width"]) && (O.on = !1);var W = t.getRGB(l.stroke);O.on && l.stroke && (O.color = W.hex), V = ((+f["stroke-opacity"] + 1 || 2) - 1) * ((+f.opacity + 1 || 2) - 1) * ((+W.o + 1 || 2) - 1);var G = .75 * (i(l["stroke-width"]) || 1);if (V = o(s(V, 0), 1), null == l["stroke-width"] && (G = f["stroke-width"]), l["stroke-width"] && (O.weight = G), G && G < 1 && (V *= G) && (O.weight = 1), O.opacity = V, l["stroke-linejoin"] && (O.joinstyle = l["stroke-linejoin"] || "miter"), O.miterlimit = l["stroke-miterlimit"] || 8, l["stroke-linecap"] && (O.endcap = "butt" == l["stroke-linecap"] ? "flat" : "square" == l["stroke-linecap"] ? "square" : "round"), "stroke-dasharray" in l) {
                  var H = { "-": "shortdash", ".": "shortdot", "-.": "shortdashdot", "-..": "shortdashdotdot", ". ": "dot", "- ": "dash", "--": "longdash", "- .": "dashdot", "--.": "longdashdot", "--..": "longdashdotdot" };O.dashstyle = H[e](l["stroke-dasharray"]) ? H[l["stroke-dasharray"]] : d;
                }Y && c.appendChild(O);
              }if ("text" == m.type) {
                m.paper.canvas.style.display = d;var X = m.paper.span,
                    U = 100,
                    $ = f.font && f.font.match(/\d+(?:\.\d*)?(?=px)/);g = X.style, f.font && (g.font = f.font), f["font-family"] && (g.fontFamily = f["font-family"]), f["font-weight"] && (g.fontWeight = f["font-weight"]), f["font-style"] && (g.fontStyle = f["font-style"]), $ = i(f["font-size"] || $ && $[0]) || 10, g.fontSize = $ * U + "px", m.textpath.string && (X.innerHTML = r(m.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));var Z = X.getBoundingClientRect();m.W = f.w = (Z.right - Z.left) / U, m.H = f.h = (Z.bottom - Z.top) / U, m.X = f.x, m.Y = f.y + m.H / 2, ("x" in l || "y" in l) && (m.path.v = t.format("m{0},{1}l{2},{1}", a(f.x * b), a(f.y * b), a(f.x * b) + 1));for (var Q = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], J = 0, K = Q.length; J < K; J++) if (Q[J] in l) {
                  m._.dirty = 1;break;
                }switch (f["text-anchor"]) {case "start":
                    m.textpath.style["v-text-align"] = "left", m.bbx = m.W / 2;break;case "end":
                    m.textpath.style["v-text-align"] = "right", m.bbx = -m.W / 2;break;default:
                    m.textpath.style["v-text-align"] = "center", m.bbx = 0;}m.textpath.style["v-text-kern"] = !0;
              }
            },
                T = function (e, a, s) {
              e.attrs = e.attrs || {};var o = e.attrs,
                  l = Math.pow,
                  h,
                  u,
                  c = "linear",
                  f = ".5 .5";if (e.attrs.gradient = a, a = r(a).replace(t._radial_gradient, function (t, e, r) {
                return c = "radial", e && r && (e = i(e), r = i(r), l(e - .5, 2) + l(r - .5, 2) > .25 && (r = n.sqrt(.25 - l(e - .5, 2)) * (2 * (r > .5) - 1) + .5), f = e + p + r), d;
              }), a = a.split(/\s*\-\s*/), "linear" == c) {
                var g = a.shift();if (g = -i(g), isNaN(g)) return null;
              }var v = t._parseDots(a);if (!v) return null;if (e = e.shape || e.node, v.length) {
                e.removeChild(s), s.on = !0, s.method = "none", s.color = v[0].color, s.color2 = v[v.length - 1].color;for (var x = [], y = 0, m = v.length; y < m; y++) v[y].offset && x.push(v[y].offset + p + v[y].color);s.colors = x.length ? x.join() : "0% " + s.color, "radial" == c ? (s.type = "gradientTitle", s.focus = "100%", s.focussize = "0 0", s.focusposition = f, s.angle = 0) : (s.type = "gradient", s.angle = (270 - g) % 360), e.appendChild(s);
              }return 1;
            },
                E = function (e, r) {
              this[0] = this.node = e, e.raphael = !0, this.id = t._oid++, e.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = r, this.matrix = t.matrix(), this._ = { transform: [], sx: 1, sy: 1, dx: 0, dy: 0, deg: 0, dirty: 1, dirtyT: 1 }, !r.bottom && (r.bottom = this), this.prev = r.top, r.top && (r.top.next = this), r.top = this, this.next = null;
            },
                M = t.el;E.prototype = M, M.constructor = E, M.transform = function (e) {
              if (null == e) return this._.transform;var i = this.paper._viewBoxShift,
                  n = i ? "s" + [i.scale, i.scale] + "-1-1t" + [i.dx, i.dy] : d,
                  a;i && (a = e = r(e).replace(/\.{3}|\u2026/g, this._.transform || d)), t._extractTransform(this, n + e);var s = this.matrix.clone(),
                  o = this.skew,
                  l = this.node,
                  h,
                  u = ~r(this.attrs.fill).indexOf("-"),
                  c = !r(this.attrs.fill).indexOf("url(");if (s.translate(1, 1), c || u || "image" == this.type) {
                if (o.matrix = "1 0 0 1", o.offset = "0 0", h = s.split(), u && h.noRotation || !h.isSimple) {
                  l.style.filter = s.toFilter();var f = this.getBBox(),
                      g = this.getBBox(1),
                      v = f.x - g.x,
                      x = f.y - g.y;l.coordorigin = v * -b + p + x * -b, C(this, 1, 1, v, x, 0);
                } else l.style.filter = d, C(this, h.scalex, h.scaley, h.dx, h.dy, h.rotate);
              } else l.style.filter = d, o.matrix = r(s), o.offset = s.offset();return null !== a && (this._.transform = a, t._extractTransform(this, a)), this;
            }, M.rotate = function (t, e, n) {
              if (this.removed) return this;if (null != t) {
                if (t = r(t).split(u), t.length - 1 && (e = i(t[1]), n = i(t[2])), t = i(t[0]), null == n && (e = n), null == e || null == n) {
                  var a = this.getBBox(1);e = a.x + a.width / 2, n = a.y + a.height / 2;
                }return this._.dirtyT = 1, this.transform(this._.transform.concat([["r", t, e, n]])), this;
              }
            }, M.translate = function (t, e) {
              return this.removed ? this : (t = r(t).split(u), t.length - 1 && (e = i(t[1])), t = i(t[0]) || 0, e = +e || 0, this._.bbox && (this._.bbox.x += t, this._.bbox.y += e), this.transform(this._.transform.concat([["t", t, e]])), this);
            }, M.scale = function (t, e, n, a) {
              if (this.removed) return this;if (t = r(t).split(u), t.length - 1 && (e = i(t[1]), n = i(t[2]), a = i(t[3]), isNaN(n) && (n = null), isNaN(a) && (a = null)), t = i(t[0]), null == e && (e = t), null == a && (n = a), null == n || null == a) var s = this.getBBox(1);return n = null == n ? s.x + s.width / 2 : n, a = null == a ? s.y + s.height / 2 : a, this.transform(this._.transform.concat([["s", t, e, n, a]])), this._.dirtyT = 1, this;
            }, M.hide = function () {
              return !this.removed && (this.node.style.display = "none"), this;
            }, M.show = function () {
              return !this.removed && (this.node.style.display = d), this;
            }, M.auxGetBBox = t.el.getBBox, M.getBBox = function () {
              var t = this.auxGetBBox();if (this.paper && this.paper._viewBoxShift) {
                var e = {},
                    r = 1 / this.paper._viewBoxShift.scale;return e.x = t.x - this.paper._viewBoxShift.dx, e.x *= r, e.y = t.y - this.paper._viewBoxShift.dy, e.y *= r, e.width = t.width * r, e.height = t.height * r, e.x2 = e.x + e.width, e.y2 = e.y + e.height, e;
              }return t;
            }, M._getBBox = function () {
              return this.removed ? {} : { x: this.X + (this.bbx || 0) - this.W / 2, y: this.Y - this.H, width: this.W, height: this.H };
            }, M.remove = function () {
              if (!this.removed && this.node.parentNode) {
                this.paper.__set__ && this.paper.__set__.exclude(this), t.eve.unbind("raphael.*.*." + this.id), t._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;this.removed = !0;
              }
            }, M.attr = function (r, i) {
              if (this.removed) return this;if (null == r) {
                var n = {};for (var a in this.attrs) this.attrs[e](a) && (n[a] = this.attrs[a]);return n.gradient && "none" == n.fill && (n.fill = n.gradient) && delete n.gradient, n.transform = this._.transform, n;
              }if (null == i && t.is(r, "string")) {
                if (r == h && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;for (var s = r.split(u), o = {}, l = 0, f = s.length; l < f; l++) r = s[l], r in this.attrs ? o[r] = this.attrs[r] : t.is(this.paper.customAttributes[r], "function") ? o[r] = this.paper.customAttributes[r].def : o[r] = t._availableAttrs[r];return f - 1 ? o : o[s[0]];
              }if (this.attrs && null == i && t.is(r, "array")) {
                for (o = {}, l = 0, f = r.length; l < f; l++) o[r[l]] = this.attr(r[l]);return o;
              }var p;null != i && (p = {}, p[r] = i), null == i && t.is(r, "object") && (p = r);for (var d in p) c("raphael.attr." + d + "." + this.id, this, p[d]);if (p) {
                for (d in this.paper.customAttributes) if (this.paper.customAttributes[e](d) && p[e](d) && t.is(this.paper.customAttributes[d], "function")) {
                  var g = this.paper.customAttributes[d].apply(this, [].concat(p[d]));this.attrs[d] = p[d];for (var v in g) g[e](v) && (p[v] = g[v]);
                }p.text && "text" == this.type && (this.textpath.string = p.text), A(this, p);
              }return this;
            }, M.toFront = function () {
              return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && t._tofront(this, this.paper), this;
            }, M.toBack = function () {
              return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), t._toback(this, this.paper)), this);
            }, M.insertAfter = function (e) {
              return this.removed ? this : (e.constructor == t.st.constructor && (e = e[e.length - 1]), e.node.nextSibling ? e.node.parentNode.insertBefore(this.node, e.node.nextSibling) : e.node.parentNode.appendChild(this.node), t._insertafter(this, e, this.paper), this);
            }, M.insertBefore = function (e) {
              return this.removed ? this : (e.constructor == t.st.constructor && (e = e[0]), e.node.parentNode.insertBefore(this.node, e.node), t._insertbefore(this, e, this.paper), this);
            }, M.blur = function (e) {
              var r = this.node.runtimeStyle,
                  i = r.filter;return i = i.replace(x, d), 0 !== +e ? (this.attrs.blur = e, r.filter = i + p + f + ".Blur(pixelradius=" + (+e || 1.5) + ")", r.margin = t.format("-{0}px 0 0 -{0}px", a(+e || 1.5))) : (r.filter = i, r.margin = 0, delete this.attrs.blur), this;
            }, t._engine.path = function (t, e) {
              var r = N("shape");r.style.cssText = m, r.coordsize = b + p + b, r.coordorigin = e.coordorigin;var i = new E(r, e),
                  n = { fill: "none", stroke: "#000" };t && (n.path = t), i.type = "path", i.path = [], i.Path = d, A(i, n), e.canvas && e.canvas.appendChild(r);var a = N("skew");return a.on = !0, r.appendChild(a), i.skew = a, i.transform(d), i;
            }, t._engine.rect = function (e, r, i, n, a, s) {
              var o = t._rectPath(r, i, n, a, s),
                  l = e.path(o),
                  h = l.attrs;return l.X = h.x = r, l.Y = h.y = i, l.W = h.width = n, l.H = h.height = a, h.r = s, h.path = o, l.type = "rect", l;
            }, t._engine.ellipse = function (t, e, r, i, n) {
              var a = t.path(),
                  s = a.attrs;return a.X = e - i, a.Y = r - n, a.W = 2 * i, a.H = 2 * n, a.type = "ellipse", A(a, { cx: e, cy: r, rx: i, ry: n }), a;
            }, t._engine.circle = function (t, e, r, i) {
              var n = t.path(),
                  a = n.attrs;return n.X = e - i, n.Y = r - i, n.W = n.H = 2 * i, n.type = "circle", A(n, { cx: e, cy: r, r: i }), n;
            }, t._engine.image = function (e, r, i, n, a, s) {
              var o = t._rectPath(i, n, a, s),
                  l = e.path(o).attr({ stroke: "none" }),
                  u = l.attrs,
                  c = l.node,
                  f = c.getElementsByTagName(h)[0];return u.src = r, l.X = u.x = i, l.Y = u.y = n, l.W = u.width = a, l.H = u.height = s, u.path = o, l.type = "image", f.parentNode == c && c.removeChild(f), f.rotate = !0, f.src = r, f.type = "tile", l._.fillpos = [i, n], l._.fillsize = [a, s], c.appendChild(f), C(l, 1, 1, 0, 0, 0), l;
            }, t._engine.text = function (e, i, n, s) {
              var o = N("shape"),
                  l = N("path"),
                  h = N("textpath");i = i || 0, n = n || 0, s = s || "", l.v = t.format("m{0},{1}l{2},{1}", a(i * b), a(n * b), a(i * b) + 1), l.textpathok = !0, h.string = r(s), h.on = !0, o.style.cssText = m, o.coordsize = b + p + b, o.coordorigin = "0 0";var u = new E(o, e),
                  c = { fill: "#000", stroke: "none", font: t._availableAttrs.font, text: s };u.shape = o, u.path = l, u.textpath = h, u.type = "text", u.attrs.text = r(s), u.attrs.x = i, u.attrs.y = n, u.attrs.w = 1, u.attrs.h = 1, A(u, c), o.appendChild(h), o.appendChild(l), e.canvas.appendChild(o);var f = N("skew");return f.on = !0, o.appendChild(f), u.skew = f, u.transform(d), u;
            }, t._engine.setSize = function (e, r) {
              var i = this.canvas.style;return this.width = e, this.height = r, e == +e && (e += "px"), r == +r && (r += "px"), i.width = e, i.height = r, i.clip = "rect(0 " + e + " " + r + " 0)", this._viewBox && t._engine.setViewBox.apply(this, this._viewBox), this;
            }, t._engine.setViewBox = function (e, r, i, n, a) {
              t.eve("raphael.setViewBox", this, this._viewBox, [e, r, i, n, a]);var s = this.getSize(),
                  o = s.width,
                  l = s.height,
                  h,
                  u;return a && (h = l / n, u = o / i, i * h < o && (e -= (o - i * h) / 2 / h), n * u < l && (r -= (l - n * u) / 2 / u)), this._viewBox = [e, r, i, n, !!a], this._viewBoxShift = { dx: -e, dy: -r, scale: s }, this.forEach(function (t) {
                t.transform("...");
              }), this;
            };var N;t._engine.initWin = function (t) {
              var e = t.document;e.styleSheets.length < 31 ? e.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)") : e.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");try {
                !e.namespaces.rvml && e.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), N = function (t) {
                  return e.createElement("<rvml:" + t + ' class="rvml">');
                };
              } catch (r) {
                N = function (t) {
                  return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
              }
            }, t._engine.initWin(t._g.win), t._engine.create = function () {
              var e = t._getContainer.apply(0, arguments),
                  r = e.container,
                  i = e.height,
                  n,
                  a = e.width,
                  s = e.x,
                  o = e.y;if (!r) throw new Error("VML container not found.");var l = new t._Paper(),
                  h = l.canvas = t._g.doc.createElement("div"),
                  u = h.style;return s = s || 0, o = o || 0, a = a || 512, i = i || 342, l.width = a, l.height = i, a == +a && (a += "px"), i == +i && (i += "px"), l.coordsize = 1e3 * b + p + 1e3 * b, l.coordorigin = "0 0", l.span = t._g.doc.createElement("span"), l.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", h.appendChild(l.span), u.cssText = t.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", a, i), 1 == r ? (t._g.doc.body.appendChild(h), u.left = s + "px", u.top = o + "px", u.position = "absolute") : r.firstChild ? r.insertBefore(h, r.firstChild) : r.appendChild(h), l.renderfix = function () {}, l;
            }, t.prototype.clear = function () {
              t.eve("raphael.clear", this), this.canvas.innerHTML = d, this.span = t._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null;
            }, t.prototype.remove = function () {
              t.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);for (var e in this) this[e] = "function" == typeof this[e] ? t._removedFactory(e) : null;return !0;
            };var L = t.st;for (var z in M) M[e](z) && !L[e](z) && (L[z] = function (t) {
              return function () {
                var e = arguments;return this.forEach(function (r) {
                  r[t].apply(r, e);
                });
              };
            }(z));
          }
        }.apply(e, i), !(void 0 !== n && (t.exports = n));
      }]);
    });
  })(this);

  return _retrieveGlobal();
});
System.registerDynamic('npm:jquery-mapael@2.1.0/js/jquery.mapael.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /*!
         *
         * Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
         * Requires jQuery, raphael.js and jquery.mousewheel
         *
         * Version: 2.1.0
         *
         * Copyright (c) 2017 Vincent Brouté (https://www.vincentbroute.fr/mapael)
         * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
         *
         * Thanks to Indigo744
         *
         */
        (function (factory) {
            if (typeof exports === 'object') {
                // CommonJS
                module.exports = factory(require('jquery'), require('raphael'), require('jquery-mousewheel'));
            } else if (typeof define === 'function' && define.amd) {
                // AMD. Register as an anonymous module.
                define(['jquery', 'raphael', 'mousewheel'], factory);
            } else {
                // Browser globals
                factory(jQuery, Raphael, jQuery.fn.mousewheel);
            }
        })(function ($, Raphael, mousewheel, undefined) {

            "use strict";

            // The plugin name (used on several places)

            var pluginName = "mapael";

            // Version number of jQuery Mapael. See http://semver.org/ for more information.
            var version = "2.1.0";

            /*
             * Mapael constructor
             * Init instance vars and call init()
             * @param container the DOM element on which to apply the plugin
             * @param options the complete options to use
             */
            var Mapael = function (container, options) {
                var self = this;

                // the global container (DOM element object)
                self.container = container;

                // the global container (jQuery object)
                self.$container = $(container);

                // the global options
                self.options = self.extendDefaultOptions(options);

                // zoom TimeOut handler (used to set and clear)
                self.zoomTO = 0;

                // zoom center coordinate (set at touchstart)
                self.zoomCenterX = 0;
                self.zoomCenterY = 0;

                // Zoom pinch (set at touchstart and touchmove)
                self.previousPinchDist = 0;

                // Zoom data
                self.zoomData = {
                    zoomLevel: 0,
                    zoomX: 0,
                    zoomY: 0,
                    panX: 0,
                    panY: 0
                };

                // resize TimeOut handler (used to set and clear)
                self.resizeTO = 0;

                // Panning: tell if panning action is in progress
                self.panning = false;

                // Panning TimeOut handler (used to set and clear)
                self.panningTO = 0;

                // Animate view box Interval handler (used to set and clear)
                self.animationIntervalID = null;

                // Map subcontainer jQuery object
                self.$map = $("." + self.options.map.cssClass, self.container);

                // Save initial HTML content (used by destroy method)
                self.initialMapHTMLContent = self.$map.html();

                // Allow to store legend containers and initial contents (used by destroy method)
                self.createdLegends = {};

                // The tooltip jQuery object
                self.$tooltip = {};

                // The paper Raphael object
                self.paper = {};

                // The areas object list
                self.areas = {};

                // The plots object list
                self.plots = {};

                // The links object list
                self.links = {};

                // The map configuration object (taken from map file)
                self.mapConf = {};

                // Let's start the initialization
                self.init();
            };

            /*
             * Mapael Prototype
             * Defines all methods and properties needed by Mapael
             * Each mapael object inherits their properties and methods from this prototype
             */
            Mapael.prototype = {

                /*
                 * Version number
                 */
                version: version,

                /*
                 * Initialize the plugin
                 * Called by the constructor
                 */
                init: function () {
                    var self = this;

                    // Init check for class existence
                    if (self.options.map.cssClass === "" || $("." + self.options.map.cssClass, self.container).length === 0) {
                        throw new Error("The map class `" + self.options.map.cssClass + "` doesn't exists");
                    }

                    // Create the tooltip container
                    self.$tooltip = $("<div>").addClass(self.options.map.tooltip.cssClass).css("display", "none");

                    // Get the map container, empty it then append tooltip
                    self.$map.empty().append(self.$tooltip);

                    // Get the map from $.mapael or $.fn.mapael (backward compatibility)
                    if ($[pluginName] && $[pluginName].maps && $[pluginName].maps[self.options.map.name]) {
                        // Mapael version >= 2.x
                        self.mapConf = $[pluginName].maps[self.options.map.name];
                    } else if ($.fn[pluginName] && $.fn[pluginName].maps && $.fn[pluginName].maps[self.options.map.name]) {
                        // Mapael version <= 1.x - DEPRECATED
                        self.mapConf = $.fn[pluginName].maps[self.options.map.name];
                        if (window.console && window.console.warn) {
                            window.console.warn("Extending $.fn.mapael is deprecated (map '" + self.options.map.name + "')");
                        }
                    } else {
                        throw new Error("Unknown map '" + self.options.map.name + "'");
                    }

                    // Create Raphael paper
                    self.paper = new Raphael(self.$map[0], self.mapConf.width, self.mapConf.height);

                    // issue #135: Check for Raphael bug on text element boundaries
                    if (self.isRaphaelBBoxBugPresent() === true) {
                        self.destroy();
                        throw new Error("Can't get boundary box for text (is your container hidden? See #135)");
                    }

                    // add plugin class name on element
                    self.$container.addClass(pluginName);

                    if (self.options.map.tooltip.css) self.$tooltip.css(self.options.map.tooltip.css);
                    self.paper.setViewBox(0, 0, self.mapConf.width, self.mapConf.height, false);

                    // Handle map size
                    if (self.options.map.width) {
                        // NOT responsive: map has a fixed width
                        self.paper.setSize(self.options.map.width, self.mapConf.height * (self.options.map.width / self.mapConf.width));

                        // Create the legends for plots taking into account the scale of the map
                        self.createLegends("plot", self.plots, self.options.map.width / self.mapConf.width);
                    } else {
                        // Responsive: handle resizing of the map
                        self.handleMapResizing();
                    }

                    // Draw map areas
                    $.each(self.mapConf.elems, function (id) {
                        var elemOptions = self.getElemOptions(self.options.map.defaultArea, self.options.areas[id] ? self.options.areas[id] : {}, self.options.legend.area);
                        self.areas[id] = { "mapElem": self.paper.path(self.mapConf.elems[id]).attr(elemOptions.attrs) };
                    });

                    // Hook that allows to add custom processing on the map
                    if (self.options.map.beforeInit) self.options.map.beforeInit(self.$container, self.paper, self.options);

                    // Init map areas in a second loop (prevent texts to be hidden by map elements)
                    $.each(self.mapConf.elems, function (id) {
                        var elemOptions = self.getElemOptions(self.options.map.defaultArea, self.options.areas[id] ? self.options.areas[id] : {}, self.options.legend.area);
                        self.initElem(self.areas[id], elemOptions, id);
                    });

                    // Draw links
                    self.links = self.drawLinksCollection(self.options.links);

                    // Draw plots
                    $.each(self.options.plots, function (id) {
                        self.plots[id] = self.drawPlot(id);
                    });

                    // Attach zoom event
                    self.$container.on("zoom." + pluginName, function (e, zoomOptions) {
                        self.onZoomEvent(e, zoomOptions);
                    });

                    if (self.options.map.zoom.enabled) {
                        // Enable zoom
                        self.initZoom(self.mapConf.width, self.mapConf.height, self.options.map.zoom);
                    }

                    // Set initial zoom
                    if (self.options.map.zoom.init !== undefined) {
                        if (self.options.map.zoom.init.animDuration === undefined) {
                            self.options.map.zoom.init.animDuration = 0;
                        }
                        self.$container.trigger("zoom", self.options.map.zoom.init);
                    }

                    // Create the legends for areas
                    self.createLegends("area", self.areas, 1);

                    // Attach update event
                    self.$container.on("update." + pluginName, function (e, opt) {
                        self.onUpdateEvent(e, opt);
                    });

                    // Attach showElementsInRange event
                    self.$container.on("showElementsInRange." + pluginName, function (e, opt) {
                        self.onShowElementsInRange(e, opt);
                    });

                    // Hook that allows to add custom processing on the map
                    if (self.options.map.afterInit) self.options.map.afterInit(self.$container, self.paper, self.areas, self.plots, self.options);

                    $(self.paper.desc).append(" and Mapael " + self.version + " (https://www.vincentbroute.fr/mapael/)");
                },

                /*
                 * Destroy mapael
                 * This function effectively detach mapael from the container
                 *   - Set the container back to the way it was before mapael instanciation
                 *   - Remove all data associated to it (memory can then be free'ed by browser)
                 *
                 * This method can be call directly by user:
                 *     $(".mapcontainer").data("mapael").destroy();
                 *
                 * This method is also automatically called if the user try to call mapael
                 * on a container already containing a mapael instance
                 */
                destroy: function () {
                    var self = this;

                    // Detach all event listeners attached to the container
                    self.$container.off("." + pluginName);
                    self.$map.off("." + pluginName);

                    // Detach the global resize event handler
                    if (self.onResizeEvent) $(window).off("resize." + pluginName, self.onResizeEvent);

                    // Empty the container (this will also detach all event listeners)
                    self.$map.empty();

                    // Replace initial HTML content
                    self.$map.html(self.initialMapHTMLContent);

                    // Empty legend containers and replace initial HTML content
                    for (var id in self.createdLegends) {
                        self.createdLegends[id].container.empty();
                        self.createdLegends[id].container.html(self.createdLegends[id].initialHTMLContent);
                    }

                    // Remove mapael class
                    self.$container.removeClass(pluginName);

                    // Remove the data
                    self.$container.removeData(pluginName);

                    // Remove all internal reference
                    self.container = undefined;
                    self.$container = undefined;
                    self.options = undefined;
                    self.paper = undefined;
                    self.$map = undefined;
                    self.$tooltip = undefined;
                    self.mapConf = undefined;
                    self.areas = undefined;
                    self.plots = undefined;
                    self.links = undefined;
                },

                handleMapResizing: function () {
                    var self = this;

                    // onResizeEvent: call when the window element trigger the resize event
                    // We create it inside this function (and not in the prototype) in order to have a closure
                    // Otherwise, in the prototype, 'this' when triggered is *not* the mapael object but the global window
                    self.onResizeEvent = function () {
                        // Clear any previous setTimeout (avoid too much triggering)
                        clearTimeout(self.resizeTO);
                        // setTimeout to wait for the user to finish its resizing
                        self.resizeTO = setTimeout(function () {
                            self.$map.trigger("resizeEnd");
                        }, 150);
                    };

                    // Attach resize handler
                    $(window).on("resize." + pluginName, self.onResizeEvent);

                    // Attach resize end handler, and call it once
                    self.$map.on("resizeEnd." + pluginName, function (e, isInit) {
                        var containerWidth = self.$map.width();

                        if (self.paper.width != containerWidth) {
                            var newScale = containerWidth / self.mapConf.width;
                            // Set new size
                            self.paper.setSize(containerWidth, self.mapConf.height * newScale);

                            // Create plots legend again to take into account the new scale
                            if (isInit || self.options.legend.redrawOnResize) {
                                self.createLegends("plot", self.plots, newScale);
                            }
                        }
                    }).trigger("resizeEnd", [true]);
                },

                /*
                 * Extend the user option with the default one
                 * @param options the user options
                 * @return new options object
                 */
                extendDefaultOptions: function (options) {

                    // Extend default options with user options
                    options = $.extend(true, {}, Mapael.prototype.defaultOptions, options);

                    // Extend legend default options
                    $.each(['area', 'plot'], function (key, type) {
                        if ($.isArray(options.legend[type])) {
                            for (var i = 0; i < options.legend[type].length; ++i) options.legend[type][i] = $.extend(true, {}, Mapael.prototype.legendDefaultOptions[type], options.legend[type][i]);
                        } else {
                            options.legend[type] = $.extend(true, {}, Mapael.prototype.legendDefaultOptions[type], options.legend[type]);
                        }
                    });

                    return options;
                },

                /*
                 * Init the element "elem" on the map (drawing, setting attributes, events, tooltip, ...)
                 */
                initElem: function (elem, elemOptions, id) {
                    var self = this;
                    var bbox = {};
                    var textPosition = {};

                    // Assign value attribute to element
                    if (elemOptions.value !== undefined) {
                        elem.value = elemOptions.value;
                    }

                    // Init the label related to the element
                    if (elemOptions.text && elemOptions.text.content !== undefined) {
                        // Set a text label in the area
                        bbox = elem.mapElem.getBBox();
                        textPosition = self.getTextPosition(bbox, elemOptions.text.position, elemOptions.text.margin);
                        elemOptions.text.attrs["text-anchor"] = textPosition.textAnchor;
                        elem.textElem = self.paper.text(textPosition.x, textPosition.y, elemOptions.text.content).attr(elemOptions.text.attrs);
                        $(elem.textElem.node).attr("data-id", id);
                    }

                    // Set user event handlers
                    if (elemOptions.eventHandlers) self.setEventHandlers(id, elemOptions, elem.mapElem, elem.textElem);

                    // Set hover option for mapElem
                    self.setHoverOptions(elem.mapElem, elemOptions.attrs, elemOptions.attrsHover);

                    // Set hover option for textElem
                    if (elem.textElem) self.setHoverOptions(elem.textElem, elemOptions.text.attrs, elemOptions.text.attrsHover);

                    // Set hover behavior only if attrsHover is set for area or for text
                    if ($.isEmptyObject(elemOptions.attrsHover) === false || elem.textElem && $.isEmptyObject(elemOptions.text.attrsHover) === false) {
                        // Set hover behavior
                        self.setHover(elem.mapElem, elem.textElem);
                    }

                    // Init the tooltip
                    if (elemOptions.tooltip) {
                        elem.mapElem.tooltip = elemOptions.tooltip;
                        self.setTooltip(elem.mapElem);

                        if (elemOptions.text && elemOptions.text.content !== undefined) {
                            elem.textElem.tooltip = elemOptions.tooltip;
                            self.setTooltip(elem.textElem);
                        }
                    }

                    // Init the link
                    if (elemOptions.href) {
                        elem.mapElem.href = elemOptions.href;
                        elem.mapElem.target = elemOptions.target;
                        self.setHref(elem.mapElem);

                        if (elemOptions.text && elemOptions.text.content !== undefined) {
                            elem.textElem.href = elemOptions.href;
                            elem.textElem.target = elemOptions.target;
                            self.setHref(elem.textElem);
                        }
                    }

                    if (elemOptions.cssClass !== undefined) {
                        $(elem.mapElem.node).addClass(elemOptions.cssClass);
                    }

                    $(elem.mapElem.node).attr("data-id", id);
                },

                /*
                 * Init zoom and panning for the map
                 * @param mapWidth
                 * @param mapHeight
                 * @param zoomOptions
                 */
                initZoom: function (mapWidth, mapHeight, zoomOptions) {
                    var self = this;
                    var mousedown = false;
                    var previousX = 0;
                    var previousY = 0;
                    var fnZoomButtons = {
                        "reset": function () {
                            self.$container.trigger("zoom", { "level": 0 });
                        },
                        "in": function () {
                            self.$container.trigger("zoom", { "level": "+1" });
                        },
                        "out": function () {
                            self.$container.trigger("zoom", { "level": -1 });
                        }
                    };

                    // init Zoom data
                    $.extend(self.zoomData, {
                        zoomLevel: 0,
                        panX: 0,
                        panY: 0
                    });

                    // init zoom buttons
                    $.each(zoomOptions.buttons, function (type, opt) {
                        if (fnZoomButtons[type] === undefined) throw new Error("Unknown zoom button '" + type + "'");
                        // Create div with classes, contents and title (for tooltip)
                        var $button = $("<div>").addClass(opt.cssClass).html(opt.content).attr("title", opt.title);
                        // Assign click event
                        $button.on("click." + pluginName, fnZoomButtons[type]);
                        // Append to map
                        self.$map.append($button);
                    });

                    // Update the zoom level of the map on mousewheel
                    if (self.options.map.zoom.mousewheel) {
                        self.$map.on("mousewheel." + pluginName, function (e) {
                            var zoomLevel = e.deltaY > 0 ? 1 : -1;
                            var coord = self.mapPagePositionToXY(e.pageX, e.pageY);

                            self.$container.trigger("zoom", {
                                "fixedCenter": true,
                                "level": self.zoomData.zoomLevel + zoomLevel,
                                "x": coord.x,
                                "y": coord.y
                            });

                            e.preventDefault();
                        });
                    }

                    // Update the zoom level of the map on touch pinch
                    if (self.options.map.zoom.touch) {
                        self.$map.on("touchstart." + pluginName, function (e) {
                            if (e.originalEvent.touches.length === 2) {
                                self.zoomCenterX = (e.originalEvent.touches[0].pageX + e.originalEvent.touches[1].pageX) / 2;
                                self.zoomCenterY = (e.originalEvent.touches[0].pageY + e.originalEvent.touches[1].pageY) / 2;
                                self.previousPinchDist = Math.sqrt(Math.pow(e.originalEvent.touches[1].pageX - e.originalEvent.touches[0].pageX, 2) + Math.pow(e.originalEvent.touches[1].pageY - e.originalEvent.touches[0].pageY, 2));
                            }
                        });

                        self.$map.on("touchmove." + pluginName, function (e) {
                            var pinchDist = 0;
                            var zoomLevel = 0;

                            if (e.originalEvent.touches.length === 2) {
                                pinchDist = Math.sqrt(Math.pow(e.originalEvent.touches[1].pageX - e.originalEvent.touches[0].pageX, 2) + Math.pow(e.originalEvent.touches[1].pageY - e.originalEvent.touches[0].pageY, 2));

                                if (Math.abs(pinchDist - self.previousPinchDist) > 15) {
                                    var coord = self.mapPagePositionToXY(self.zoomCenterX, self.zoomCenterY);
                                    zoomLevel = (pinchDist - self.previousPinchDist) / Math.abs(pinchDist - self.previousPinchDist);
                                    self.$container.trigger("zoom", {
                                        "fixedCenter": true,
                                        "level": self.zoomData.zoomLevel + zoomLevel,
                                        "x": coord.x,
                                        "y": coord.y
                                    });
                                    self.previousPinchDist = pinchDist;
                                }
                                return false;
                            }
                        });
                    }

                    // When the user drag the map, prevent to move the clicked element instead of dragging the map (behaviour seen with Firefox)
                    self.$map.on("dragstart", function () {
                        return false;
                    });

                    // Panning
                    $("body").on("mouseup." + pluginName + (zoomOptions.touch ? " touchend." + pluginName : ""), function () {
                        mousedown = false;
                        setTimeout(function () {
                            self.panning = false;
                        }, 50);
                    });

                    self.$map.on("mousedown." + pluginName + (zoomOptions.touch ? " touchstart." + pluginName : ""), function (e) {
                        if (e.pageX !== undefined) {
                            mousedown = true;
                            previousX = e.pageX;
                            previousY = e.pageY;
                        } else {
                            if (e.originalEvent.touches.length === 1) {
                                mousedown = true;
                                previousX = e.originalEvent.touches[0].pageX;
                                previousY = e.originalEvent.touches[0].pageY;
                            }
                        }
                    }).on("mousemove." + pluginName + (zoomOptions.touch ? " touchmove." + pluginName : ""), function (e) {
                        var currentLevel = self.zoomData.zoomLevel;
                        var pageX = 0;
                        var pageY = 0;

                        if (e.pageX !== undefined) {
                            pageX = e.pageX;
                            pageY = e.pageY;
                        } else {
                            if (e.originalEvent.touches.length === 1) {
                                pageX = e.originalEvent.touches[0].pageX;
                                pageY = e.originalEvent.touches[0].pageY;
                            } else {
                                mousedown = false;
                            }
                        }

                        if (mousedown && currentLevel !== 0) {
                            var offsetX = (previousX - pageX) / (1 + currentLevel * zoomOptions.step) * (mapWidth / self.paper.width);
                            var offsetY = (previousY - pageY) / (1 + currentLevel * zoomOptions.step) * (mapHeight / self.paper.height);
                            var panX = Math.min(Math.max(0, self.paper._viewBox[0] + offsetX), mapWidth - self.paper._viewBox[2]);
                            var panY = Math.min(Math.max(0, self.paper._viewBox[1] + offsetY), mapHeight - self.paper._viewBox[3]);

                            if (Math.abs(offsetX) > 5 || Math.abs(offsetY) > 5) {
                                $.extend(self.zoomData, {
                                    panX: panX,
                                    panY: panY,
                                    zoomX: panX + self.paper._viewBox[2] / 2,
                                    zoomY: panY + self.paper._viewBox[3] / 2
                                });
                                self.paper.setViewBox(panX, panY, self.paper._viewBox[2], self.paper._viewBox[3]);

                                clearTimeout(self.panningTO);
                                self.panningTO = setTimeout(function () {
                                    self.$map.trigger("afterPanning", {
                                        x1: panX,
                                        y1: panY,
                                        x2: panX + self.paper._viewBox[2],
                                        y2: panY + self.paper._viewBox[3]
                                    });
                                }, 150);

                                previousX = pageX;
                                previousY = pageY;
                                self.panning = true;
                            }
                            return false;
                        }
                    });
                },

                /*
                 * Map a mouse position to a map position
                 *      Transformation principle:
                 *          ** start with (pageX, pageY) absolute mouse coordinate
                 *          - Apply translation: take into accounts the map offset in the page
                 *          ** from this point, we have relative mouse coordinate
                 *          - Apply homothetic transformation: take into accounts initial factor of map sizing (fullWidth / actualWidth)
                 *          - Apply homothetic transformation: take into accounts the zoom factor
                 *          ** from this point, we have relative map coordinate
                 *          - Apply translation: take into accounts the current panning of the map
                 *          ** from this point, we have absolute map coordinate
                 * @param pageX: mouse client coordinate on X
                 * @param pageY: mouse client coordinate on Y
                 * @return map coordinate {x, y}
                 */
                mapPagePositionToXY: function (pageX, pageY) {
                    var self = this;
                    var offset = self.$map.offset();
                    var initFactor = self.options.map.width ? self.mapConf.width / self.options.map.width : self.mapConf.width / self.$map.width();
                    var zoomFactor = 1 / (1 + self.zoomData.zoomLevel * self.options.map.zoom.step);
                    return {
                        x: zoomFactor * initFactor * (pageX - offset.left) + self.zoomData.panX,
                        y: zoomFactor * initFactor * (pageY - offset.top) + self.zoomData.panY
                    };
                },

                /*
                 * Zoom on the map at a specific level focused on specific coordinates
                 * If no coordinates are specified, the zoom will be focused on the center of the map
                 * options :
                 *    "level" : level of the zoom between minLevel and maxLevel
                 *    "x" or "latitude" : x coordinate or latitude of the point to focus on
                 *    "y" or "longitude" : y coordinate or longitude of the point to focus on
                 *    "fixedCenter" : set to true in order to preserve the position of x,y in the canvas when zoomed
                 *    "animDuration" : zoom duration
                 */
                onZoomEvent: function (e, zoomOptions) {
                    var self = this;
                    var newLevel = self.zoomData.zoomLevel;
                    var panX = 0;
                    var panY = 0;
                    var previousZoomLevel = 1 + self.zoomData.zoomLevel * self.options.map.zoom.step;
                    var zoomLevel = 0;
                    var animDuration = zoomOptions.animDuration !== undefined ? zoomOptions.animDuration : self.options.map.zoom.animDuration;
                    var offsetX = 0;
                    var offsetY = 0;
                    var coords = {};

                    // Get user defined zoom level
                    if (zoomOptions.level !== undefined) {
                        if (typeof zoomOptions.level === "string") {
                            // level is a string, either "n", "+n" or "-n"
                            if (zoomOptions.level.slice(0, 1) === '+' || zoomOptions.level.slice(0, 1) === '-') {
                                // zoomLevel is relative
                                newLevel = self.zoomData.zoomLevel + parseInt(zoomOptions.level);
                            } else {
                                // zoomLevel is absolute
                                newLevel = parseInt(zoomOptions.level);
                            }
                        } else {
                            // level is integer
                            if (zoomOptions.level < 0) {
                                // zoomLevel is relative
                                newLevel = self.zoomData.zoomLevel + zoomOptions.level;
                            } else {
                                // zoomLevel is absolute
                                newLevel = zoomOptions.level;
                            }
                        }
                        // Make sure we stay in the boundaries
                        newLevel = Math.min(Math.max(newLevel, self.options.map.zoom.minLevel), self.options.map.zoom.maxLevel);
                    }

                    zoomLevel = 1 + newLevel * self.options.map.zoom.step;

                    if (zoomOptions.latitude !== undefined && zoomOptions.longitude !== undefined) {
                        coords = self.mapConf.getCoords(zoomOptions.latitude, zoomOptions.longitude);
                        zoomOptions.x = coords.x;
                        zoomOptions.y = coords.y;
                    }

                    if (zoomOptions.x === undefined) zoomOptions.x = self.paper._viewBox[0] + self.paper._viewBox[2] / 2;

                    if (zoomOptions.y === undefined) zoomOptions.y = self.paper._viewBox[1] + self.paper._viewBox[3] / 2;

                    if (newLevel === 0) {
                        panX = 0;
                        panY = 0;
                    } else if (zoomOptions.fixedCenter !== undefined && zoomOptions.fixedCenter === true) {
                        offsetX = self.zoomData.panX + (zoomOptions.x - self.zoomData.panX) * (zoomLevel - previousZoomLevel) / zoomLevel;
                        offsetY = self.zoomData.panY + (zoomOptions.y - self.zoomData.panY) * (zoomLevel - previousZoomLevel) / zoomLevel;

                        panX = Math.min(Math.max(0, offsetX), self.mapConf.width - self.mapConf.width / zoomLevel);
                        panY = Math.min(Math.max(0, offsetY), self.mapConf.height - self.mapConf.height / zoomLevel);
                    } else {
                        panX = Math.min(Math.max(0, zoomOptions.x - self.mapConf.width / zoomLevel / 2), self.mapConf.width - self.mapConf.width / zoomLevel);
                        panY = Math.min(Math.max(0, zoomOptions.y - self.mapConf.height / zoomLevel / 2), self.mapConf.height - self.mapConf.height / zoomLevel);
                    }

                    // Update zoom level of the map
                    if (zoomLevel == previousZoomLevel && panX == self.zoomData.panX && panY == self.zoomData.panY) return;

                    if (animDuration > 0) {
                        self.animateViewBox(panX, panY, self.mapConf.width / zoomLevel, self.mapConf.height / zoomLevel, animDuration, self.options.map.zoom.animEasing);
                    } else {
                        self.paper.setViewBox(panX, panY, self.mapConf.width / zoomLevel, self.mapConf.height / zoomLevel);
                        clearTimeout(self.zoomTO);
                        self.zoomTO = setTimeout(function () {
                            self.$map.trigger("afterZoom", {
                                x1: panX,
                                y1: panY,
                                x2: panX + self.mapConf.width / zoomLevel,
                                y2: panY + self.mapConf.height / zoomLevel
                            });
                        }, 150);
                    }

                    $.extend(self.zoomData, {
                        zoomLevel: newLevel,
                        panX: panX,
                        panY: panY,
                        zoomX: panX + self.paper._viewBox[2] / 2,
                        zoomY: panY + self.paper._viewBox[3] / 2
                    });
                },

                /*
                 * Show some element in range defined by user
                 * Triggered by user $(".mapcontainer").trigger("showElementsInRange", [opt]);
                 *
                 * @param opt the options
                 *  opt.hiddenOpacity opacity for hidden element (default = 0.3)
                 *  opt.animDuration animation duration in ms (default = 0)
                 *  opt.afterShowRange callback
                 *  opt.ranges the range to show:
                 *  Example:
                 *  opt.ranges = {
                 *      'plot' : {
                 *          0 : {                        // valueIndex
                 *              'min': 1000,
                 *              'max': 1200
                 *          },
                 *          1 : {                        // valueIndex
                 *              'min': 10,
                 *              'max': 12
                 *          }
                 *      },
                 *      'area' : {
                 *          {'min': 10, 'max': 20}    // No valueIndex, only an object, use 0 as valueIndex (easy case)
                 *      }
                 *  }
                 */
                onShowElementsInRange: function (e, opt) {
                    var self = this;

                    // set animDuration to default if not defined
                    if (opt.animDuration === undefined) {
                        opt.animDuration = 0;
                    }

                    // set hiddenOpacity to default if not defined
                    if (opt.hiddenOpacity === undefined) {
                        opt.hiddenOpacity = 0.3;
                    }

                    // handle area
                    if (opt.ranges && opt.ranges.area) {
                        self.showElemByRange(opt.ranges.area, self.areas, opt.hiddenOpacity, opt.animDuration);
                    }

                    // handle plot
                    if (opt.ranges && opt.ranges.plot) {
                        self.showElemByRange(opt.ranges.plot, self.plots, opt.hiddenOpacity, opt.animDuration);
                    }

                    // handle link
                    if (opt.ranges && opt.ranges.link) {
                        self.showElemByRange(opt.ranges.link, self.links, opt.hiddenOpacity, opt.animDuration);
                    }

                    // Call user callback
                    if (opt.afterShowRange) opt.afterShowRange();
                },

                /*
                 * Show some element in range
                 * @param ranges: the ranges
                 * @param elems: list of element on which to check against previous range
                 * @hiddenOpacity: the opacity when hidden
                 * @animDuration: the animation duration
                 */
                showElemByRange: function (ranges, elems, hiddenOpacity, animDuration) {
                    var self = this;
                    // Hold the final opacity value for all elements consolidated after applying each ranges
                    // This allow to set the opacity only once for each elements
                    var elemsFinalOpacity = {};

                    // set object with one valueIndex to 0 if we have directly the min/max
                    if (ranges.min !== undefined || ranges.max !== undefined) {
                        ranges = { 0: ranges };
                    }

                    // Loop through each valueIndex
                    $.each(ranges, function (valueIndex) {
                        var range = ranges[valueIndex];
                        // Check if user defined at least a min or max value
                        if (range.min === undefined && range.max === undefined) {
                            return true; // skip this iteration (each loop), goto next range
                        }
                        // Loop through each elements
                        $.each(elems, function (id) {
                            var elemValue = elems[id].value;
                            // set value with one valueIndex to 0 if not object
                            if (typeof elemValue !== "object") {
                                elemValue = [elemValue];
                            }
                            // Check existence of this value index
                            if (elemValue[valueIndex] === undefined) {
                                return true; // skip this iteration (each loop), goto next element
                            }
                            // Check if in range
                            if (range.min !== undefined && elemValue[valueIndex] < range.min || range.max !== undefined && elemValue[valueIndex] > range.max) {
                                // Element not in range
                                elemsFinalOpacity[id] = hiddenOpacity;
                            } else {
                                // Element in range
                                elemsFinalOpacity[id] = 1;
                            }
                        });
                    });
                    // Now that we looped through all ranges, we can really assign the final opacity
                    $.each(elemsFinalOpacity, function (id) {
                        self.setElementOpacity(elems[id], elemsFinalOpacity[id], animDuration);
                    });
                },

                /*
                 * Set element opacity
                 * Handle elem.mapElem and elem.textElem
                 * @param elem the element
                 * @param opacity the opacity to apply
                 * @param animDuration the animation duration to use
                 */
                setElementOpacity: function (elem, opacity, animDuration) {
                    // Ensure no animation is running
                    //elem.mapElem.stop();
                    //if (elem.textElem) elem.textElem.stop();

                    // If final opacity is not null, ensure element is shown before proceeding
                    if (opacity > 0) {
                        elem.mapElem.show();
                        if (elem.textElem) elem.textElem.show();
                    }
                    if (animDuration > 0) {
                        // Animate attribute
                        elem.mapElem.animate({ "opacity": opacity }, animDuration, "linear", function () {
                            // If final attribute is 0, hide
                            if (opacity === 0) elem.mapElem.hide();
                        });
                        // Handle text element
                        if (elem.textElem) {
                            // Animate attribute
                            elem.textElem.animate({ "opacity": opacity }, animDuration, "linear", function () {
                                // If final attribute is 0, hide
                                if (opacity === 0) elem.textElem.hide();
                            });
                        }
                    } else {
                        // Set attribute
                        elem.mapElem.attr({ "opacity": opacity });
                        // For null opacity, hide it
                        if (opacity === 0) elem.mapElem.hide();
                        // Handle text elemen
                        if (elem.textElem) {
                            // Set attribute
                            elem.textElem.attr({ "opacity": opacity });
                            // For null opacity, hide it
                            if (opacity === 0) elem.textElem.hide();
                        }
                    }
                },

                /*
                 *
                 * Update the current map
                 * Refresh attributes and tooltips for areas and plots
                 * @param opt option for the refresh :
                 *  opt.mapOptions: options to update for plots and areas
                 *  opt.replaceOptions: whether mapsOptions should entirely replace current map options, or just extend it
                 *  opt.opt.newPlots new plots to add to the map
                 *  opt.newLinks new links to add to the map
                 *  opt.deletePlotKeys plots to delete from the map (array, or "all" to remove all plots)
                 *  opt.deleteLinkKeys links to remove from the map (array, or "all" to remove all links)
                 *  opt.setLegendElemsState the state of legend elements to be set : show (default) or hide
                 *  opt.animDuration animation duration in ms (default = 0)
                 *  opt.afterUpdate Hook that allows to add custom processing on the map
                 */
                onUpdateEvent: function (e, opt) {
                    var self = this;
                    // Abort if opt is undefined
                    if (typeof opt !== "object") return;

                    var i = 0;
                    var animDuration = opt.animDuration ? opt.animDuration : 0;

                    // This function remove an element using animation (or not, depending on animDuration)
                    // Used for deletePlotKeys and deleteLinkKeys
                    var fnRemoveElement = function (elem) {
                        // Unset all event handlers
                        self.unsetHover(elem.mapElem, elem.textElem);
                        if (animDuration > 0) {
                            elem.mapElem.animate({ "opacity": 0 }, animDuration, "linear", function () {
                                elem.mapElem.remove();
                            });
                            if (elem.textElem) {
                                elem.textElem.animate({ "opacity": 0 }, animDuration, "linear", function () {
                                    elem.textElem.remove();
                                });
                            }
                        } else {
                            elem.mapElem.remove();
                            if (elem.textElem) {
                                elem.textElem.remove();
                            }
                        }
                    };

                    // This function show an element using animation
                    // Used for newPlots and newLinks
                    var fnShowElement = function (elem) {
                        // Starts with hidden elements
                        elem.mapElem.attr({ opacity: 0 });
                        if (elem.textElem) elem.textElem.attr({ opacity: 0 });
                        // Set final element opacity
                        self.setElementOpacity(elem, elem.mapElem.originalAttrs.opacity !== undefined ? elem.mapElem.originalAttrs.opacity : 1, animDuration);
                    };

                    if (typeof opt.mapOptions === "object") {
                        if (opt.replaceOptions === true) self.options = self.extendDefaultOptions(opt.mapOptions);else $.extend(true, self.options, opt.mapOptions);

                        // IF we update areas, plots or legend, then reset all legend state to "show"
                        if (opt.mapOptions.areas !== undefined || opt.mapOptions.plots !== undefined || opt.mapOptions.legend !== undefined) {
                            $("[data-type='elem']", self.$container).each(function (id, elem) {
                                if ($(elem).attr('data-hidden') === "1") {
                                    // Toggle state of element by clicking
                                    $(elem).trigger("click", [false, animDuration]);
                                }
                            });
                        }
                    }

                    // Delete plots by name if deletePlotKeys is array
                    if (typeof opt.deletePlotKeys === "object") {
                        for (; i < opt.deletePlotKeys.length; i++) {
                            if (self.plots[opt.deletePlotKeys[i]] !== undefined) {
                                fnRemoveElement(self.plots[opt.deletePlotKeys[i]]);
                                delete self.plots[opt.deletePlotKeys[i]];
                            }
                        }
                        // Delete ALL plots if deletePlotKeys is set to "all"
                    } else if (opt.deletePlotKeys === "all") {
                        $.each(self.plots, function (id, elem) {
                            fnRemoveElement(elem);
                        });
                        // Empty plots object
                        self.plots = {};
                    }

                    // Delete links by name if deleteLinkKeys is array
                    if (typeof opt.deleteLinkKeys === "object") {
                        for (i = 0; i < opt.deleteLinkKeys.length; i++) {
                            if (self.links[opt.deleteLinkKeys[i]] !== undefined) {
                                fnRemoveElement(self.links[opt.deleteLinkKeys[i]]);
                                delete self.links[opt.deleteLinkKeys[i]];
                            }
                        }
                        // Delete ALL links if deleteLinkKeys is set to "all"
                    } else if (opt.deleteLinkKeys === "all") {
                        $.each(self.links, function (id, elem) {
                            fnRemoveElement(elem);
                        });
                        // Empty links object
                        self.links = {};
                    }

                    // New plots
                    if (typeof opt.newPlots === "object") {
                        $.each(opt.newPlots, function (id) {
                            if (self.plots[id] === undefined) {
                                self.options.plots[id] = opt.newPlots[id];
                                self.plots[id] = self.drawPlot(id);
                                if (animDuration > 0) {
                                    fnShowElement(self.plots[id]);
                                }
                            }
                        });
                    }

                    // New links
                    if (typeof opt.newLinks === "object") {
                        var newLinks = self.drawLinksCollection(opt.newLinks);
                        $.extend(self.links, newLinks);
                        $.extend(self.options.links, opt.newLinks);
                        if (animDuration > 0) {
                            $.each(newLinks, function (id) {
                                fnShowElement(newLinks[id]);
                            });
                        }
                    }

                    // Update areas attributes and tooltips
                    $.each(self.areas, function (id) {
                        // Avoid updating unchanged elements
                        if (typeof opt.mapOptions === "object" && (typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultArea === "object" || typeof opt.mapOptions.areas === "object" && typeof opt.mapOptions.areas[id] === "object" || typeof opt.mapOptions.legend === "object" && typeof opt.mapOptions.legend.area === "object") || opt.replaceOptions === true) {
                            var elemOptions = self.getElemOptions(self.options.map.defaultArea, self.options.areas[id] ? self.options.areas[id] : {}, self.options.legend.area);
                            self.updateElem(elemOptions, self.areas[id], animDuration);
                        }
                    });

                    // Update plots attributes and tooltips
                    $.each(self.plots, function (id) {
                        // Avoid updating unchanged elements
                        if (typeof opt.mapOptions === "object" && (typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultPlot === "object" || typeof opt.mapOptions.plots === "object" && typeof opt.mapOptions.plots[id] === "object" || typeof opt.mapOptions.legend === "object" && typeof opt.mapOptions.legend.plot === "object") || opt.replaceOptions === true) {
                            var elemOptions = self.getElemOptions(self.options.map.defaultPlot, self.options.plots[id] ? self.options.plots[id] : {}, self.options.legend.plot);
                            if (elemOptions.type == "square") {
                                elemOptions.attrs.width = elemOptions.size;
                                elemOptions.attrs.height = elemOptions.size;
                                elemOptions.attrs.x = self.plots[id].mapElem.attrs.x - (elemOptions.size - self.plots[id].mapElem.attrs.width) / 2;
                                elemOptions.attrs.y = self.plots[id].mapElem.attrs.y - (elemOptions.size - self.plots[id].mapElem.attrs.height) / 2;
                            } else if (elemOptions.type == "image") {
                                elemOptions.attrs.width = elemOptions.width;
                                elemOptions.attrs.height = elemOptions.height;
                                elemOptions.attrs.x = self.plots[id].mapElem.attrs.x - (elemOptions.width - self.plots[id].mapElem.attrs.width) / 2;
                                elemOptions.attrs.y = self.plots[id].mapElem.attrs.y - (elemOptions.height - self.plots[id].mapElem.attrs.height) / 2;
                            } else if (elemOptions.type == "svg") {
                                if (elemOptions.attrs.transform !== undefined) {
                                    elemOptions.attrs.transform = self.plots[id].mapElem.baseTransform + elemOptions.attrs.transform;
                                }
                            } else {
                                // Default : circle
                                elemOptions.attrs.r = elemOptions.size / 2;
                            }

                            self.updateElem(elemOptions, self.plots[id], animDuration);
                        }
                    });

                    // Update links attributes and tooltips
                    $.each(self.links, function (id) {
                        // Avoid updating unchanged elements
                        if (typeof opt.mapOptions === "object" && (typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultLink === "object" || typeof opt.mapOptions.links === "object" && typeof opt.mapOptions.links[id] === "object") || opt.replaceOptions === true) {
                            var elemOptions = self.getElemOptions(self.options.map.defaultLink, self.options.links[id] ? self.options.links[id] : {}, {});

                            self.updateElem(elemOptions, self.links[id], animDuration);
                        }
                    });

                    // Update legends
                    if (opt.mapOptions && (typeof opt.mapOptions.legend === "object" || typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultArea === "object" || typeof opt.mapOptions.map === "object" && typeof opt.mapOptions.map.defaultPlot === "object")) {
                        // Show all elements on the map before updating the legends
                        $("[data-type='elem']", self.$container).each(function (id, elem) {
                            if ($(elem).attr('data-hidden') === "1") {
                                $(elem).trigger("click", [false, animDuration]);
                            }
                        });

                        self.createLegends("area", self.areas, 1);
                        if (self.options.map.width) {
                            self.createLegends("plot", self.plots, self.options.map.width / self.mapConf.width);
                        } else {
                            self.createLegends("plot", self.plots, self.$map.width() / self.mapConf.width);
                        }
                    }

                    // Hide/Show all elements based on showlegendElems
                    //      Toggle (i.e. click) only if:
                    //          - slice legend is shown AND we want to hide
                    //          - slice legend is hidden AND we want to show
                    if (typeof opt.setLegendElemsState === "object") {
                        // setLegendElemsState is an object listing the legend we want to hide/show
                        $.each(opt.setLegendElemsState, function (legendCSSClass, action) {
                            // Search for the legend
                            var $legend = self.$container.find("." + legendCSSClass)[0];
                            if ($legend !== undefined) {
                                // Select all elem inside this legend
                                $("[data-type='elem']", $legend).each(function (id, elem) {
                                    if ($(elem).attr('data-hidden') === "0" && action === "hide" || $(elem).attr('data-hidden') === "1" && action === "show") {
                                        // Toggle state of element by clicking
                                        $(elem).trigger("click", [false, animDuration]);
                                    }
                                });
                            }
                        });
                    } else {
                        // setLegendElemsState is a string, or is undefined
                        // Default : "show"
                        var action = opt.setLegendElemsState === "hide" ? "hide" : "show";

                        $("[data-type='elem']", self.$container).each(function (id, elem) {
                            if ($(elem).attr('data-hidden') === "0" && action === "hide" || $(elem).attr('data-hidden') === "1" && action === "show") {
                                // Toggle state of element by clicking
                                $(elem).trigger("click", [false, animDuration]);
                            }
                        });
                    }
                    if (opt.afterUpdate) opt.afterUpdate(self.$container, self.paper, self.areas, self.plots, self.options);
                },

                /*
                 * Draw all links between plots on the paper
                 */
                drawLinksCollection: function (linksCollection) {
                    var self = this;
                    var p1 = {};
                    var p2 = {};
                    var coordsP1 = {};
                    var coordsP2 = {};
                    var links = {};

                    $.each(linksCollection, function (id) {
                        var elemOptions = self.getElemOptions(self.options.map.defaultLink, linksCollection[id], {});

                        if (typeof linksCollection[id].between[0] == 'string') {
                            p1 = self.options.plots[linksCollection[id].between[0]];
                        } else {
                            p1 = linksCollection[id].between[0];
                        }

                        if (typeof linksCollection[id].between[1] == 'string') {
                            p2 = self.options.plots[linksCollection[id].between[1]];
                        } else {
                            p2 = linksCollection[id].between[1];
                        }

                        if (p1.latitude !== undefined && p1.longitude !== undefined) {
                            coordsP1 = self.mapConf.getCoords(p1.latitude, p1.longitude);
                        } else {
                            coordsP1.x = p1.x;
                            coordsP1.y = p1.y;
                        }

                        if (p2.latitude !== undefined && p2.longitude !== undefined) {
                            coordsP2 = self.mapConf.getCoords(p2.latitude, p2.longitude);
                        } else {
                            coordsP2.x = p2.x;
                            coordsP2.y = p2.y;
                        }
                        links[id] = self.drawLink(id, coordsP1.x, coordsP1.y, coordsP2.x, coordsP2.y, elemOptions);
                    });
                    return links;
                },

                /*
                 * Draw a curved link between two couples of coordinates a(xa,ya) and b(xb, yb) on the paper
                 */
                drawLink: function (id, xa, ya, xb, yb, elemOptions) {
                    var self = this;
                    var elem = {};
                    // Compute the "curveto" SVG point, d(x,y)
                    // c(xc, yc) is the center of (xa,ya) and (xb, yb)
                    var xc = (xa + xb) / 2;
                    var yc = (ya + yb) / 2;

                    // Equation for (cd) : y = acd * x + bcd (d is the cure point)
                    var acd = -1 / ((yb - ya) / (xb - xa));
                    var bcd = yc - acd * xc;

                    // dist(c,d) = dist(a,b) (=abDist)
                    var abDist = Math.sqrt((xb - xa) * (xb - xa) + (yb - ya) * (yb - ya));

                    // Solution for equation dist(cd) = sqrt((xd - xc)² + (yd - yc)²)
                    // dist(c,d)² = (xd - xc)² + (yd - yc)²
                    // We assume that dist(c,d) = dist(a,b)
                    // so : (xd - xc)² + (yd - yc)² - dist(a,b)² = 0
                    // With the factor : (xd - xc)² + (yd - yc)² - (factor*dist(a,b))² = 0
                    // (xd - xc)² + (acd*xd + bcd - yc)² - (factor*dist(a,b))² = 0
                    var a = 1 + acd * acd;
                    var b = -2 * xc + 2 * acd * bcd - 2 * acd * yc;
                    var c = xc * xc + bcd * bcd - bcd * yc - yc * bcd + yc * yc - elemOptions.factor * abDist * (elemOptions.factor * abDist);
                    var delta = b * b - 4 * a * c;
                    var x = 0;
                    var y = 0;

                    // There are two solutions, we choose one or the other depending on the sign of the factor
                    if (elemOptions.factor > 0) {
                        x = (-b + Math.sqrt(delta)) / (2 * a);
                        y = acd * x + bcd;
                    } else {
                        x = (-b - Math.sqrt(delta)) / (2 * a);
                        y = acd * x + bcd;
                    }

                    elem.mapElem = self.paper.path("m " + xa + "," + ya + " C " + x + "," + y + " " + xb + "," + yb + " " + xb + "," + yb + "").attr(elemOptions.attrs);
                    self.initElem(elem, elemOptions, id);

                    return elem;
                },

                /*
                 * Check wether newAttrs object bring modifications to originalAttrs object
                 */
                isAttrsChanged: function (originalAttrs, newAttrs) {
                    for (var key in newAttrs) {
                        if (typeof originalAttrs[key] === 'undefined' || newAttrs[key] !== originalAttrs[key]) {
                            return true;
                        }
                    }
                    return false;
                },

                /*
                 * Update the element "elem" on the map with the new elemOptions options
                 */
                updateElem: function (elemOptions, elem, animDuration) {
                    var self = this;
                    var bbox;
                    var textPosition;
                    var plotOffsetX;
                    var plotOffsetY;

                    if (elemOptions.value !== undefined) elem.value = elemOptions.value;

                    if (elemOptions.toFront === true) {
                        elem.mapElem.toFront();
                    }

                    // Update the label
                    if (elem.textElem) {
                        if (elemOptions.text !== undefined && elemOptions.text.content !== undefined && elemOptions.text.content != elem.textElem.attrs.text) elem.textElem.attr({ text: elemOptions.text.content });

                        bbox = elem.mapElem.getBBox();

                        if (elemOptions.size || elemOptions.width && elemOptions.height) {
                            if (elemOptions.type == "image" || elemOptions.type == "svg") {
                                plotOffsetX = (elemOptions.width - bbox.width) / 2;
                                plotOffsetY = (elemOptions.height - bbox.height) / 2;
                            } else {
                                plotOffsetX = (elemOptions.size - bbox.width) / 2;
                                plotOffsetY = (elemOptions.size - bbox.height) / 2;
                            }
                            bbox.x -= plotOffsetX;
                            bbox.x2 += plotOffsetX;
                            bbox.y -= plotOffsetY;
                            bbox.y2 += plotOffsetY;
                        }

                        textPosition = self.getTextPosition(bbox, elemOptions.text.position, elemOptions.text.margin);
                        if (textPosition.x != elem.textElem.attrs.x || textPosition.y != elem.textElem.attrs.y) {
                            if (animDuration > 0) {
                                elem.textElem.attr({ "text-anchor": textPosition.textAnchor });
                                elem.textElem.animate({ x: textPosition.x, y: textPosition.y }, animDuration);
                            } else elem.textElem.attr({
                                x: textPosition.x,
                                y: textPosition.y,
                                "text-anchor": textPosition.textAnchor
                            });
                        }

                        self.setHoverOptions(elem.textElem, elemOptions.text.attrs, elemOptions.text.attrsHover);
                        if (animDuration > 0) elem.textElem.animate(elemOptions.text.attrs, animDuration);else elem.textElem.attr(elemOptions.text.attrs);
                    }

                    // Update elements attrs and attrsHover
                    self.setHoverOptions(elem.mapElem, elemOptions.attrs, elemOptions.attrsHover);

                    if (self.isAttrsChanged(elem.mapElem.attrs, elemOptions.attrs)) {
                        if (animDuration > 0) elem.mapElem.animate(elemOptions.attrs, animDuration);else elem.mapElem.attr(elemOptions.attrs);
                    }

                    // Update dimensions of SVG plots
                    if (elemOptions.type == "svg") {

                        if (bbox === undefined) {
                            bbox = elem.mapElem.getBBox();
                        }
                        elem.mapElem.transform("m" + elemOptions.width / elem.mapElem.originalWidth + ",0,0," + elemOptions.height / elem.mapElem.originalHeight + "," + bbox.x + "," + bbox.y);
                    }

                    // Update the tooltip
                    if (elemOptions.tooltip) {
                        if (elem.mapElem.tooltip === undefined) {
                            self.setTooltip(elem.mapElem);
                            if (elem.textElem) self.setTooltip(elem.textElem);
                        }
                        elem.mapElem.tooltip = elemOptions.tooltip;
                        if (elem.textElem) elem.textElem.tooltip = elemOptions.tooltip;
                    }

                    // Update the link
                    if (elemOptions.href !== undefined) {
                        if (elem.mapElem.href === undefined) {
                            self.setHref(elem.mapElem);
                            if (elem.textElem) self.setHref(elem.textElem);
                        }
                        elem.mapElem.href = elemOptions.href;
                        elem.mapElem.target = elemOptions.target;
                        if (elem.textElem) {
                            elem.textElem.href = elemOptions.href;
                            elem.textElem.target = elemOptions.target;
                        }
                    }
                },

                /*
                 * Draw the plot
                 */
                drawPlot: function (id) {
                    var self = this;
                    var plot = {};
                    var coords = {};
                    var elemOptions = self.getElemOptions(self.options.map.defaultPlot, self.options.plots[id] ? self.options.plots[id] : {}, self.options.legend.plot);

                    if (elemOptions.x !== undefined && elemOptions.y !== undefined) coords = { x: elemOptions.x, y: elemOptions.y };else if (elemOptions.plotsOn !== undefined && self.areas[elemOptions.plotsOn].mapElem !== undefined) {
                        var path = self.areas[elemOptions.plotsOn].mapElem;
                        var bbox = path.getBBox();
                        var _x = Math.floor(bbox.x + bbox.width / 2.0);
                        var _y = Math.floor(bbox.y + bbox.height / 2.0);
                        coords = { x: _x, y: _y };
                    } else coords = self.mapConf.getCoords(elemOptions.latitude, elemOptions.longitude);

                    if (elemOptions.type == "square") {
                        plot = {
                            "mapElem": self.paper.rect(coords.x - elemOptions.size / 2, coords.y - elemOptions.size / 2, elemOptions.size, elemOptions.size).attr(elemOptions.attrs)
                        };
                    } else if (elemOptions.type == "image") {
                        plot = {
                            "mapElem": self.paper.image(elemOptions.url, coords.x - elemOptions.width / 2, coords.y - elemOptions.height / 2, elemOptions.width, elemOptions.height).attr(elemOptions.attrs)
                        };
                    } else if (elemOptions.type == "svg") {
                        if (elemOptions.attrs.transform === undefined) {
                            elemOptions.attrs.transform = "";
                        }

                        plot = { "mapElem": self.paper.path(elemOptions.path) };
                        plot.mapElem.originalWidth = plot.mapElem.getBBox().width;
                        plot.mapElem.originalHeight = plot.mapElem.getBBox().height;

                        plot.mapElem.baseTransform = "m" + elemOptions.width / plot.mapElem.originalWidth + ",0,0," + elemOptions.height / plot.mapElem.originalHeight + "," + (coords.x - elemOptions.width / 2) + "," + (coords.y - elemOptions.height / 2);
                        elemOptions.attrs.transform = plot.mapElem.baseTransform + elemOptions.attrs.transform;
                        plot.mapElem.attr(elemOptions.attrs);
                    } else {
                        // Default = circle
                        plot = { "mapElem": self.paper.circle(coords.x, coords.y, elemOptions.size / 2).attr(elemOptions.attrs) };
                    }
                    self.initElem(plot, elemOptions, id);
                    return plot;
                },

                /*
                 * Set target link on elem
                 */
                setHref: function (elem) {
                    var self = this;
                    elem.attr({ cursor: "pointer" });
                    $(elem.node).on("click." + pluginName, function () {
                        if (!self.panning && elem.href) window.open(elem.href, elem.target);
                    });
                },

                /*
                 * Set a tooltip for the areas and plots
                 * @param elem area or plot element
                 * @param content the content to set in the tooltip
                 */
                setTooltip: function (elem) {
                    var self = this;
                    var tooltipTO = 0;
                    var cssClass = self.$tooltip.attr('class');

                    var updateTooltipPosition = function (x, y) {

                        var offsetLeft = 10;
                        var offsetTop = 20;

                        if (typeof elem.tooltip.offset === "object") {
                            if (typeof elem.tooltip.offset.left !== "undefined") {
                                offsetLeft = elem.tooltip.offset.left;
                            }
                            if (typeof elem.tooltip.offset.top !== "undefined") {
                                offsetTop = elem.tooltip.offset.top;
                            }
                        }

                        var tooltipPosition = {
                            "left": Math.min(self.$map.width() - self.$tooltip.outerWidth() - 5, x - self.$map.offset().left + offsetLeft),
                            "top": Math.min(self.$map.height() - self.$tooltip.outerHeight() - 5, y - self.$map.offset().top + offsetTop)
                        };

                        if (typeof elem.tooltip.overflow === "object") {
                            if (elem.tooltip.overflow.right === true) {
                                tooltipPosition.left = x - self.$map.offset().left + 10;
                            }
                            if (selem.tooltip.overflow.bottom === true) {
                                tooltipPosition.top = y - self.$map.offset().top + 20;
                            }
                        }

                        self.$tooltip.css(tooltipPosition);
                    };

                    $(elem.node).on("mouseover." + pluginName, function (e) {
                        tooltipTO = setTimeout(function () {
                            self.$tooltip.attr("class", cssClass);
                            if (elem.tooltip !== undefined) {
                                if (elem.tooltip.content !== undefined) {
                                    // if tooltip.content is function, call it. Otherwise, assign it directly.
                                    var content = typeof elem.tooltip.content === "function" ? elem.tooltip.content(elem) : elem.tooltip.content;
                                    self.$tooltip.html(content).css("display", "block");
                                }
                                if (elem.tooltip.cssClass !== undefined) {
                                    self.$tooltip.addClass(elem.tooltip.cssClass);
                                }
                            }
                            updateTooltipPosition(e.pageX, e.pageY);
                        }, 120);
                    }).on("mouseout." + pluginName, function () {
                        clearTimeout(tooltipTO);
                        self.$tooltip.css("display", "none");
                    }).on("mousemove." + pluginName, function (e) {
                        updateTooltipPosition(e.pageX, e.pageY);
                    });
                },

                /*
                 * Set user defined handlers for events on areas and plots
                 * @param id the id of the element
                 * @param elemOptions the element parameters
                 * @param mapElem the map element to set callback on
                 * @param textElem the optional text within the map element
                 */
                setEventHandlers: function (id, elemOptions, mapElem, textElem) {
                    var self = this;
                    $.each(elemOptions.eventHandlers, function (event) {
                        (function (event) {
                            $(mapElem.node).on(event, function (e) {
                                if (!self.panning) elemOptions.eventHandlers[event](e, id, mapElem, textElem, elemOptions);
                            });
                            if (textElem) {
                                $(textElem.node).on(event, function (e) {
                                    if (!self.panning) elemOptions.eventHandlers[event](e, id, mapElem, textElem, elemOptions);
                                });
                            }
                        })(event);
                    });
                },

                /*
                 * Draw a legend for areas and / or plots
                 * @param legendOptions options for the legend to draw
                 * @param legendType the type of the legend : "area" or "plot"
                 * @param elems collection of plots or areas on the maps
                 * @param legendIndex index of the legend in the conf array
                 */
                drawLegend: function (legendOptions, legendType, elems, scale, legendIndex) {
                    var self = this;
                    var $legend = {};
                    var legendPaper = {};
                    var width = 0;
                    var height = 0;
                    var title = null;
                    var elem = {};
                    var elemBBox = {};
                    var label = {};
                    var i = 0;
                    var x = 0;
                    var y = 0;
                    var yCenter = 0;
                    var sliceOptions = [];
                    var length = 0;

                    $legend = $("." + legendOptions.cssClass, self.$container);

                    if (typeof self.createdLegends[legendOptions.cssClass] === 'undefined') {
                        self.createdLegends[legendOptions.cssClass] = {
                            container: $legend,
                            initialHTMLContent: $legend.html()
                        };
                    }

                    $legend.empty();

                    legendPaper = new Raphael($legend.get(0));
                    // Set some data to object
                    $(legendPaper.canvas).attr({ "data-type": legendType, "data-index": legendIndex });

                    height = width = 0;

                    // Set the title of the legend
                    if (legendOptions.title && legendOptions.title !== "") {
                        title = legendPaper.text(legendOptions.marginLeftTitle, 0, legendOptions.title).attr(legendOptions.titleAttrs);
                        title.attr({ y: 0.5 * title.getBBox().height });

                        width = legendOptions.marginLeftTitle + title.getBBox().width;
                        height += legendOptions.marginBottomTitle + title.getBBox().height;
                    }

                    // Calculate attrs (and width, height and r (radius)) for legend elements, and yCenter for horizontal legends

                    for (i = 0, length = legendOptions.slices.length; i < length; ++i) {
                        var yCenterCurrent = 0;

                        sliceOptions[i] = $.extend(true, {}, legendType == "plot" ? self.options.map.defaultPlot : self.options.map.defaultArea, legendOptions.slices[i]);

                        if (legendOptions.slices[i].legendSpecificAttrs === undefined) {
                            legendOptions.slices[i].legendSpecificAttrs = {};
                        }

                        $.extend(true, sliceOptions[i].attrs, legendOptions.slices[i].legendSpecificAttrs);

                        if (legendType == "area") {
                            if (sliceOptions[i].attrs.width === undefined) sliceOptions[i].attrs.width = 30;
                            if (sliceOptions[i].attrs.height === undefined) sliceOptions[i].attrs.height = 20;
                        } else if (sliceOptions[i].type == "square") {
                            if (sliceOptions[i].attrs.width === undefined) sliceOptions[i].attrs.width = sliceOptions[i].size;
                            if (sliceOptions[i].attrs.height === undefined) sliceOptions[i].attrs.height = sliceOptions[i].size;
                        } else if (sliceOptions[i].type == "image" || sliceOptions[i].type == "svg") {
                            if (sliceOptions[i].attrs.width === undefined) sliceOptions[i].attrs.width = sliceOptions[i].width;
                            if (sliceOptions[i].attrs.height === undefined) sliceOptions[i].attrs.height = sliceOptions[i].height;
                        } else {
                            if (sliceOptions[i].attrs.r === undefined) sliceOptions[i].attrs.r = sliceOptions[i].size / 2;
                        }

                        // Compute yCenter for this legend slice
                        yCenterCurrent = legendOptions.marginBottomTitle;
                        // Add title height if it exists
                        if (title) {
                            yCenterCurrent += title.getBBox().height;
                        }
                        if (legendType == "plot" && (sliceOptions[i].type === undefined || sliceOptions[i].type == "circle")) {
                            yCenterCurrent += scale * sliceOptions[i].attrs.r;
                        } else {
                            yCenterCurrent += scale * sliceOptions[i].attrs.height / 2;
                        }
                        // Update yCenter if current larger
                        yCenter = Math.max(yCenter, yCenterCurrent);
                    }

                    if (legendOptions.mode == "horizontal") {
                        width = legendOptions.marginLeft;
                    }

                    // Draw legend elements (circle, square or image in vertical or horizontal mode)
                    for (i = 0, length = sliceOptions.length; i < length; ++i) {
                        if (sliceOptions[i].display === undefined || sliceOptions[i].display === true) {
                            if (legendType == "area") {
                                if (legendOptions.mode == "horizontal") {
                                    x = width + legendOptions.marginLeft;
                                    y = yCenter - 0.5 * scale * sliceOptions[i].attrs.height;
                                } else {
                                    x = legendOptions.marginLeft;
                                    y = height;
                                }

                                elem = legendPaper.rect(x, y, scale * sliceOptions[i].attrs.width, scale * sliceOptions[i].attrs.height);
                            } else if (sliceOptions[i].type == "square") {
                                if (legendOptions.mode == "horizontal") {
                                    x = width + legendOptions.marginLeft;
                                    y = yCenter - 0.5 * scale * sliceOptions[i].attrs.height;
                                } else {
                                    x = legendOptions.marginLeft;
                                    y = height;
                                }

                                elem = legendPaper.rect(x, y, scale * sliceOptions[i].attrs.width, scale * sliceOptions[i].attrs.height);
                            } else if (sliceOptions[i].type == "image" || sliceOptions[i].type == "svg") {
                                if (legendOptions.mode == "horizontal") {
                                    x = width + legendOptions.marginLeft;
                                    y = yCenter - 0.5 * scale * sliceOptions[i].attrs.height;
                                } else {
                                    x = legendOptions.marginLeft;
                                    y = height;
                                }

                                if (sliceOptions[i].type == "image") {
                                    elem = legendPaper.image(sliceOptions[i].url, x, y, scale * sliceOptions[i].attrs.width, scale * sliceOptions[i].attrs.height);
                                } else {
                                    elem = legendPaper.path(sliceOptions[i].path);

                                    if (sliceOptions[i].attrs.transform === undefined) {
                                        sliceOptions[i].attrs.transform = "";
                                    }
                                    sliceOptions[i].attrs.transform = "m" + scale * sliceOptions[i].width / elem.getBBox().width + ",0,0," + scale * sliceOptions[i].height / elem.getBBox().height + "," + x + "," + y + sliceOptions[i].attrs.transform;
                                }
                            } else {
                                if (legendOptions.mode == "horizontal") {
                                    x = width + legendOptions.marginLeft + scale * sliceOptions[i].attrs.r;
                                    y = yCenter;
                                } else {
                                    x = legendOptions.marginLeft + scale * sliceOptions[i].attrs.r;
                                    y = height + scale * sliceOptions[i].attrs.r;
                                }
                                elem = legendPaper.circle(x, y, scale * sliceOptions[i].attrs.r);
                            }

                            // Set attrs to the element drawn above
                            delete sliceOptions[i].attrs.width;
                            delete sliceOptions[i].attrs.height;
                            delete sliceOptions[i].attrs.r;
                            elem.attr(sliceOptions[i].attrs);
                            elemBBox = elem.getBBox();

                            // Draw the label associated with the element
                            if (legendOptions.mode == "horizontal") {
                                x = width + legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel;
                                y = yCenter;
                            } else {
                                x = legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel;
                                y = height + elemBBox.height / 2;
                            }

                            label = legendPaper.text(x, y, sliceOptions[i].label).attr(legendOptions.labelAttrs);

                            // Update the width and height for the paper
                            if (legendOptions.mode == "horizontal") {
                                var currentHeight = legendOptions.marginBottom + elemBBox.height;
                                width += legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel + label.getBBox().width;
                                if (sliceOptions[i].type != "image" && legendType != "area") {
                                    currentHeight += legendOptions.marginBottomTitle;
                                }
                                // Add title height if it exists
                                if (title) {
                                    currentHeight += title.getBBox().height;
                                }
                                height = Math.max(height, currentHeight);
                            } else {
                                width = Math.max(width, legendOptions.marginLeft + elemBBox.width + legendOptions.marginLeftLabel + label.getBBox().width);
                                height += legendOptions.marginBottom + elemBBox.height;
                            }

                            $(elem.node).attr({ "data-type": "elem", "data-index": i, "data-hidden": 0 });
                            $(label.node).attr({ "data-type": "label", "data-index": i, "data-hidden": 0 });

                            // Hide map elements when the user clicks on a legend item
                            if (legendOptions.hideElemsOnClick.enabled) {
                                // Hide/show elements when user clicks on a legend element
                                label.attr({ cursor: "pointer" });
                                elem.attr({ cursor: "pointer" });

                                self.setHoverOptions(elem, sliceOptions[i].attrs, sliceOptions[i].attrs);
                                self.setHoverOptions(label, legendOptions.labelAttrs, legendOptions.labelAttrsHover);
                                self.setHover(elem, label);
                                self.handleClickOnLegendElem(legendOptions, legendOptions.slices[i], label, elem, elems, legendIndex);
                            }
                        }
                    }

                    // VMLWidth option allows you to set static width for the legend
                    // only for VML render because text.getBBox() returns wrong values on IE6/7
                    if (Raphael.type != "SVG" && legendOptions.VMLWidth) width = legendOptions.VMLWidth;

                    legendPaper.setSize(width, height);
                },

                /*
                 * Allow to hide elements of the map when the user clicks on a related legend item
                 * @param legendOptions options for the legend to draw
                 * @param sliceOptions options of the slice
                 * @param label label of the legend item
                 * @param elem element of the legend item
                 * @param elems collection of plots or areas displayed on the map
                 * @param legendIndex index of the legend in the conf array
                 */
                handleClickOnLegendElem: function (legendOptions, sliceOptions, label, elem, elems, legendIndex) {
                    var self = this;

                    /**
                     *
                     * @param e
                     * @param hideOtherElems : option used for the 'exclusive' mode to enabled only one item from the legend
                     * at once
                     * @param animDuration : used in the 'update' event in order to apply the same animDuration on the legend items
                     */
                    var hideMapElems = function (e, hideOtherElems, animDuration) {
                        var elemValue = 0;
                        var hidden = $(label.node).attr('data-hidden');
                        var hiddenNewAttr = hidden === '0' ? { "data-hidden": '1' } : { "data-hidden": '0' };

                        // Check animDuration: if not set, this is a regular click, use the value specified in options
                        if (animDuration === undefined) animDuration = legendOptions.hideElemsOnClick.animDuration;

                        if (hidden === '0') {
                            if (animDuration > 0) label.animate({ "opacity": 0.5 }, animDuration);else label.attr({ "opacity": 0.5 });
                        } else {
                            if (animDuration > 0) label.animate({ "opacity": 1 }, animDuration);else label.attr({ "opacity": 1 });
                        }

                        $.each(elems, function (id) {
                            // Retreive stored data of element
                            //      'hidden-by' contains the list of legendIndex that is hiding this element
                            var hiddenBy = elems[id].mapElem.data('hidden-by');
                            // Set to empty object if undefined
                            if (hiddenBy === undefined) hiddenBy = {};

                            if ($.isArray(elems[id].value)) {
                                elemValue = elems[id].value[legendIndex];
                            } else {
                                elemValue = elems[id].value;
                            }

                            // Hide elements whose value matches with the slice of the clicked legend item
                            if (self.getLegendSlice(elemValue, legendOptions) === sliceOptions) {
                                (function (id) {
                                    if (hidden === '0') {
                                        // we want to hide this element
                                        hiddenBy[legendIndex] = true; // add legendIndex to the data object for later use
                                        self.setElementOpacity(elems[id], legendOptions.hideElemsOnClick.opacity, animDuration);
                                    } else {
                                        // We want to show this element
                                        delete hiddenBy[legendIndex]; // Remove this legendIndex from object
                                        // Check if another legendIndex is defined
                                        // We will show this element only if no legend is no longer hiding it
                                        if ($.isEmptyObject(hiddenBy)) {
                                            self.setElementOpacity(elems[id], elems[id].mapElem.originalAttrs.opacity !== undefined ? elems[id].mapElem.originalAttrs.opacity : 1, animDuration);
                                        }
                                    }
                                    // Update elem data with new values
                                    elems[id].mapElem.data('hidden-by', hiddenBy);
                                })(id);
                            }
                        });

                        $(elem.node).attr(hiddenNewAttr);
                        $(label.node).attr(hiddenNewAttr);

                        if ((hideOtherElems === undefined || hideOtherElems === true) && legendOptions.exclusive !== undefined && legendOptions.exclusive === true) {
                            $("[data-type='elem'][data-hidden=0]", self.$container).each(function () {
                                if ($(this).attr('data-index') !== $(elem.node).attr('data-index')) {
                                    $(this).trigger("click", false);
                                }
                            });
                        }
                    };
                    $(label.node).on("click." + pluginName, hideMapElems);
                    $(elem.node).on("click." + pluginName, hideMapElems);

                    if (sliceOptions.clicked !== undefined && sliceOptions.clicked === true) {
                        $(elem.node).trigger("click", false);
                    }
                },

                /*
                 * Create all legends for a specified type (area or plot)
                 * @param legendType the type of the legend : "area" or "plot"
                 * @param elems collection of plots or areas displayed on the map
                 * @param scale scale ratio of the map
                 */
                createLegends: function (legendType, elems, scale) {
                    var self = this;
                    var legendsOptions = self.options.legend[legendType];

                    if (!$.isArray(self.options.legend[legendType])) {
                        legendsOptions = [self.options.legend[legendType]];
                    }

                    for (var j = 0; j < legendsOptions.length; ++j) {
                        // Check for class existence
                        if (legendsOptions[j].cssClass === "" || $("." + legendsOptions[j].cssClass, self.$container).length === 0) {
                            throw new Error("The legend class `" + legendsOptions[j].cssClass + "` doesn't exists.");
                        }
                        if (legendsOptions[j].display === true && $.isArray(legendsOptions[j].slices) && legendsOptions[j].slices.length > 0) {
                            self.drawLegend(legendsOptions[j], legendType, elems, scale, j);
                        }
                    }
                },

                /*
                 * Set the attributes on hover and the attributes to restore for a map element
                 * @param elem the map element
                 * @param originalAttrs the original attributes to restore on mouseout event
                 * @param attrsHover the attributes to set on mouseover event
                 */
                setHoverOptions: function (elem, originalAttrs, attrsHover) {
                    // Disable transform option on hover for VML (IE<9) because of several bugs
                    if (Raphael.type != "SVG") delete attrsHover.transform;
                    elem.attrsHover = attrsHover;

                    if (elem.attrsHover.transform) elem.originalAttrs = $.extend({ transform: "s1" }, originalAttrs);else elem.originalAttrs = originalAttrs;
                },

                /*
                 * Set the hover behavior (mouseover & mouseout) for plots and areas
                 * @param mapElem the map element
                 * @param textElem the optional text element (within the map element)
                 */
                setHover: function (mapElem, textElem) {
                    var self = this;
                    var $mapElem = {};
                    var $textElem = {};
                    var mouseoverTimeout = 0;
                    var mouseoutTimeout = 0;
                    var overBehaviour = function () {
                        clearTimeout(mouseoutTimeout);
                        mouseoverTimeout = setTimeout(function () {
                            self.elemHover(mapElem, textElem);
                        }, 120);
                    };
                    var outBehaviour = function () {
                        clearTimeout(mouseoverTimeout);
                        mouseoutTimeout = setTimeout(function () {
                            self.elemOut(mapElem, textElem);
                        }, 120);
                    };

                    $mapElem = $(mapElem.node);
                    $mapElem.on("mouseover." + pluginName, overBehaviour);
                    $mapElem.on("mouseout." + pluginName, outBehaviour);

                    if (textElem) {
                        $textElem = $(textElem.node);
                        $textElem.on("mouseover." + pluginName, overBehaviour);
                        $(textElem.node).on("mouseout." + pluginName, outBehaviour);
                    }
                },

                /*
                 * Remove the hover behavior for plots and areas
                 * @param mapElem the map element
                 * @param textElem the optional text element (within the map element)
                 */
                unsetHover: function (mapElem, textElem) {
                    $(mapElem.node).off("." + pluginName);
                    if (textElem) $(textElem.node).off("." + pluginName);
                },

                /*
                 * Set he behaviour for "mouseover" event
                 * @param mapElem mapElem the map element
                 * @param textElem the optional text element (within the map element)
                 */
                elemHover: function (mapElem, textElem) {
                    var self = this;
                    // Set mapElem
                    if (mapElem.attrsHover.animDuration > 0) mapElem.animate(mapElem.attrsHover, mapElem.attrsHover.animDuration);else mapElem.attr(mapElem.attrsHover);
                    // Set textElem
                    if (textElem) {
                        if (textElem.attrsHover.animDuration > 0) textElem.animate(textElem.attrsHover, textElem.attrsHover.animDuration);else textElem.attr(textElem.attrsHover);
                    }
                    // workaround for older version of Raphael
                    if (self.paper.safari) self.paper.safari();
                },

                /*
                 * Set he behaviour for "mouseout" event
                 * @param mapElem the map element
                 * @param textElem the optional text element (within the map element)
                 */
                elemOut: function (mapElem, textElem) {
                    var self = this;
                    // Set mapElem
                    if (mapElem.attrsHover.animDuration > 0) mapElem.animate(mapElem.originalAttrs, mapElem.attrsHover.animDuration);else mapElem.attr(mapElem.originalAttrs);
                    // Set textElem
                    if (textElem) {
                        if (textElem.attrsHover.animDuration > 0) textElem.animate(textElem.originalAttrs, textElem.attrsHover.animDuration);else textElem.attr(textElem.originalAttrs);
                    }

                    // workaround for older version of Raphael
                    if (self.paper.safari) self.paper.safari();
                },

                /*
                 * Get element options by merging default options, element options and legend options
                 * @param defaultOptions
                 * @param elemOptions
                 * @param legendOptions
                 */
                getElemOptions: function (defaultOptions, elemOptions, legendOptions) {
                    var self = this;
                    var options = $.extend(true, {}, defaultOptions, elemOptions);
                    if (options.value !== undefined) {
                        if ($.isArray(legendOptions)) {
                            for (var i = 0, length = legendOptions.length; i < length; ++i) {
                                options = $.extend(true, {}, options, self.getLegendSlice(options.value[i], legendOptions[i]));
                            }
                        } else {
                            options = $.extend(true, {}, options, self.getLegendSlice(options.value, legendOptions));
                        }
                    }
                    return options;
                },

                /*
                 * Get the coordinates of the text relative to a bbox and a position
                 * @param bbox the boundary box of the element
                 * @param textPosition the wanted text position (inner, right, left, top or bottom)
                 * @param margin number or object {x: val, y:val} margin between the bbox and the text
                 */
                getTextPosition: function (bbox, textPosition, margin) {
                    var textX = 0;
                    var textY = 0;
                    var textAnchor = "";

                    if (typeof margin === "number") {
                        if (textPosition === "bottom" || textPosition === "top") {
                            margin = { x: 0, y: margin };
                        } else if (textPosition === "right" || textPosition === "left") {
                            margin = { x: margin, y: 0 };
                        } else {
                            margin = { x: 0, y: 0 };
                        }
                    }

                    switch (textPosition) {
                        case "bottom":
                            textX = (bbox.x + bbox.x2) / 2 + margin.x;
                            textY = bbox.y2 + margin.y;
                            textAnchor = "middle";
                            break;
                        case "top":
                            textX = (bbox.x + bbox.x2) / 2 + margin.x;
                            textY = bbox.y - margin.y;
                            textAnchor = "middle";
                            break;
                        case "left":
                            textX = bbox.x - margin.x;
                            textY = (bbox.y + bbox.y2) / 2 + margin.y;
                            textAnchor = "end";
                            break;
                        case "right":
                            textX = bbox.x2 + margin.x;
                            textY = (bbox.y + bbox.y2) / 2 + margin.y;
                            textAnchor = "start";
                            break;
                        default:
                            // "inner" position
                            textX = (bbox.x + bbox.x2) / 2 + margin.x;
                            textY = (bbox.y + bbox.y2) / 2 + margin.y;
                            textAnchor = "middle";
                    }
                    return { "x": textX, "y": textY, "textAnchor": textAnchor };
                },

                /*
                 * Get the legend conf matching with the value
                 * @param value the value to match with a slice in the legend
                 * @param legend the legend params object
                 * @return the legend slice matching with the value
                 */
                getLegendSlice: function (value, legend) {
                    for (var i = 0, length = legend.slices.length; i < length; ++i) {
                        if (legend.slices[i].sliceValue !== undefined && value == legend.slices[i].sliceValue || legend.slices[i].sliceValue === undefined && (legend.slices[i].min === undefined || value >= legend.slices[i].min) && (legend.slices[i].max === undefined || value <= legend.slices[i].max)) {
                            return legend.slices[i];
                        }
                    }
                    return {};
                },

                /*
                 * Animated view box changes
                 * As from http://code.voidblossom.com/animating-viewbox-easing-formulas/,
                 * (from https://github.com/theshaun works on mapael)
                 * @param x coordinate of the point to focus on
                 * @param y coordinate of the point to focus on
                 * @param w map defined width
                 * @param h map defined height
                 * @param duration defined length of time for animation
                 * @param easingFunction defined Raphael supported easing_formula to use
                 * @param callback method when animated action is complete
                 */
                animateViewBox: function (x, y, w, h, duration, easingFunction) {
                    var self = this;
                    var cx = self.paper._viewBox ? self.paper._viewBox[0] : 0;
                    var dx = x - cx;
                    var cy = self.paper._viewBox ? self.paper._viewBox[1] : 0;
                    var dy = y - cy;
                    var cw = self.paper._viewBox ? self.paper._viewBox[2] : self.paper.width;
                    var dw = w - cw;
                    var ch = self.paper._viewBox ? self.paper._viewBox[3] : self.paper.height;
                    var dh = h - ch;
                    var interval = 25;
                    var steps = duration / interval;
                    var currentStep = 0;
                    var easingFormula;

                    easingFunction = easingFunction || "linear";
                    easingFormula = Raphael.easing_formulas[easingFunction];

                    clearInterval(self.animationIntervalID);

                    self.animationIntervalID = setInterval(function () {
                        var ratio = currentStep / steps;
                        self.paper.setViewBox(cx + dx * easingFormula(ratio), cy + dy * easingFormula(ratio), cw + dw * easingFormula(ratio), ch + dh * easingFormula(ratio), false);
                        if (currentStep++ >= steps) {
                            clearInterval(self.animationIntervalID);
                            clearTimeout(self.zoomTO);
                            self.zoomTO = setTimeout(function () {
                                self.$map.trigger("afterZoom", { x1: x, y1: y, x2: x + w, y2: y + h });
                            }, 150);
                        }
                    }, interval);
                },

                /*
                 * Check for Raphael bug regarding drawing while beeing hidden (under display:none)
                 * See https://github.com/neveldo/jQuery-Mapael/issues/135
                 * @return true/false
                 *
                 * Wants to override this behavior? Use prototype overriding:
                 *     $.mapael.prototype.isRaphaelBBoxBugPresent = function() {return false;};
                 */
                isRaphaelBBoxBugPresent: function () {
                    var self = this;
                    // Draw text, then get its boundaries
                    var text_elem = self.paper.text(-50, -50, "TEST");
                    var text_elem_bbox = text_elem.getBBox();
                    // remove element
                    text_elem.remove();
                    // If it has no height and width, then the paper is hidden
                    return text_elem_bbox.width === 0 && text_elem_bbox.height === 0;
                },

                // Default map options
                defaultOptions: {
                    map: {
                        cssClass: "map",
                        tooltip: {
                            cssClass: "mapTooltip"
                        },
                        defaultArea: {
                            attrs: {
                                fill: "#343434",
                                stroke: "#5d5d5d",
                                "stroke-width": 1,
                                "stroke-linejoin": "round"
                            },
                            attrsHover: {
                                fill: "#f38a03",
                                animDuration: 300
                            },
                            text: {
                                position: "inner",
                                margin: 10,
                                attrs: {
                                    "font-size": 15,
                                    fill: "#c7c7c7"
                                },
                                attrsHover: {
                                    fill: "#eaeaea",
                                    "animDuration": 300
                                }
                            },
                            target: "_self",
                            cssClass: "area"
                        },
                        defaultPlot: {
                            type: "circle",
                            size: 15,
                            attrs: {
                                fill: "#0088db",
                                stroke: "#fff",
                                "stroke-width": 0,
                                "stroke-linejoin": "round"
                            },
                            attrsHover: {
                                "stroke-width": 3,
                                animDuration: 300
                            },
                            text: {
                                position: "right",
                                margin: 10,
                                attrs: {
                                    "font-size": 15,
                                    fill: "#c7c7c7"
                                },
                                attrsHover: {
                                    fill: "#eaeaea",
                                    animDuration: 300
                                }
                            },
                            target: "_self",
                            cssClass: "plot"
                        },
                        defaultLink: {
                            factor: 0.5,
                            attrs: {
                                stroke: "#0088db",
                                "stroke-width": 2
                            },
                            attrsHover: {
                                animDuration: 300
                            },
                            text: {
                                position: "inner",
                                margin: 10,
                                attrs: {
                                    "font-size": 15,
                                    fill: "#c7c7c7"
                                },
                                attrsHover: {
                                    fill: "#eaeaea",
                                    animDuration: 300
                                }
                            },
                            target: "_self",
                            cssClass: "link"
                        },
                        zoom: {
                            enabled: false,
                            minLevel: 0,
                            maxLevel: 10,
                            step: 0.25,
                            mousewheel: true,
                            touch: true,
                            animDuration: 200,
                            animEasing: "linear",
                            buttons: {
                                "reset": {
                                    cssClass: "zoomButton zoomReset",
                                    content: "&#8226;", // bullet sign
                                    title: "Reset zoom"
                                },
                                "in": {
                                    cssClass: "zoomButton zoomIn",
                                    content: "+",
                                    title: "Zoom in"
                                },
                                "out": {
                                    cssClass: "zoomButton zoomOut",
                                    content: "&#8722;", // minus sign
                                    title: "Zoom out"
                                }
                            }
                        }
                    },
                    legend: {
                        redrawOnResize: true,
                        area: [],
                        plot: []
                    },
                    areas: {},
                    plots: {},
                    links: {}
                },

                // Default legends option
                legendDefaultOptions: {
                    area: {
                        cssClass: "areaLegend",
                        display: true,
                        marginLeft: 10,
                        marginLeftTitle: 5,
                        marginBottomTitle: 10,
                        marginLeftLabel: 10,
                        marginBottom: 10,
                        titleAttrs: {
                            "font-size": 16,
                            fill: "#343434",
                            "text-anchor": "start"
                        },
                        labelAttrs: {
                            "font-size": 12,
                            fill: "#343434",
                            "text-anchor": "start"
                        },
                        labelAttrsHover: {
                            fill: "#787878",
                            animDuration: 300
                        },
                        hideElemsOnClick: {
                            enabled: true,
                            opacity: 0.2,
                            animDuration: 300
                        },
                        slices: [],
                        mode: "vertical"
                    },
                    plot: {
                        cssClass: "plotLegend",
                        display: true,
                        marginLeft: 10,
                        marginLeftTitle: 5,
                        marginBottomTitle: 10,
                        marginLeftLabel: 10,
                        marginBottom: 10,
                        titleAttrs: {
                            "font-size": 16,
                            fill: "#343434",
                            "text-anchor": "start"
                        },
                        labelAttrs: {
                            "font-size": 12,
                            fill: "#343434",
                            "text-anchor": "start"
                        },
                        labelAttrsHover: {
                            fill: "#787878",
                            animDuration: 300
                        },
                        hideElemsOnClick: {
                            enabled: true,
                            opacity: 0.2,
                            animDuration: 300
                        },
                        slices: [],
                        mode: "vertical"
                    }
                }

            };

            // Extend jQuery with Mapael
            if ($[pluginName] === undefined) $[pluginName] = Mapael;

            // Add jQuery DOM function
            $.fn[pluginName] = function (options) {
                // Call Mapael on each element
                return this.each(function () {
                    // Avoid leaking problem on multiple instanciation by removing an old mapael object on a container
                    if ($.data(this, pluginName)) {
                        $.data(this, pluginName).destroy();
                    }
                    // Create Mapael and save it as jQuery data
                    // This allow external access to Mapael using $(".mapcontainer").data("mapael")
                    $.data(this, pluginName, new Mapael(this, options));
                });
            };

            return Mapael;
        });
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("npm:jquery-mapael@2.1.0.json", [], true, function() {
  return {
    "main": "js/jquery.mapael.js",
    "format": "global",
    "meta": {
      "*.json": {
        "format": "json"
      },
      ".editorconfig": {
        "globals": {
          "process": null
        }
      },
      ".jshintrc": {
        "globals": {
          "process": null
        }
      },
      ".travis.yml": {
        "globals": {
          "process": null
        }
      },
      "Gruntfile.js": {
        "globals": {
          "process": null
        }
      },
      "LICENSE": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/README.txt": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/add_cities_on_map_by_double_click.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/afterInit_extend_raphael_paper.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/dataviz_example.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/eventHandlers_display_information_about_plotted_cities.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/eventHandlers_option_and_update_event_refresh_onclick.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/import_from_json.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/initial_zoom_level_on_a_specific_position.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/legend_show_hide.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/links_between_plotted_cities.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/map_focused_on_a_specific_area.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/multiple_instances.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/multiple_legends_plotted_cities.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/range_selection_areas.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/range_selection_plotted_cities.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/transformations_on_svg_plots.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/update_event_for_refreshing_elements.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/updates_on_links_performed.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/zoom_event_on_specific_area.html": {
        "globals": {
          "process": null
        }
      },
      "examples/advanced/zoom_on_click.html": {
        "globals": {
          "process": null
        }
      },
      "examples/basic/*": {
        "globals": {
          "process": null
        }
      },
      "js/*": {
        "globals": {
          "process": null
        }
      },
      "test/*": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic('npm:jquery-mapael@2.1.0/js/maps/world_countries.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /*!
         *
         * Jquery Mapael - Dynamic maps jQuery plugin (based on raphael.js)
         * Requires jQuery and Mapael
         *
         * Map of World by country
         * 
         * @source http://backspace.com/mapapp/javascript_world/
         */

        (function (factory) {
            if (typeof exports === 'object') {
                // CommonJS
                module.exports = factory(require('jquery'), require('jquery-mapael'));
            } else if (typeof define === 'function' && define.amd) {
                // AMD. Register as an anonymous module.
                define(['jquery', 'mapael'], factory);
            } else {
                // Browser globals
                factory(jQuery, jQuery.mapael);
            }
        })(function ($, Mapael) {

            "use strict";

            $.extend(true, Mapael, {
                maps: {
                    world_countries: {
                        width: 1000,
                        height: 400,
                        getCoords: function (lat, lon) {
                            var xfactor = 2.752;
                            var xoffset = 473.75;
                            var x = lon * xfactor + xoffset;

                            var yfactor = -2.753;
                            var yoffset = 231;
                            var y = lat * yfactor + yoffset;

                            return { x: x, y: y };
                        },
                        'elems': {
                            "AE": "M615.622,164.177l0.582,0.000l0.000,0.580l2.324,-0.289l2.326,0.000l1.455,0.000l2.033,-1.743l2.034,-1.743l1.745,-1.742l0.583,0.871l0.291,2.324l-1.456,0.000l-0.289,1.742l0.581,0.291l-1.163,0.580l0.000,1.161l-0.873,1.162l0.000,1.162l-0.580,0.580l-8.430,-1.452l-0.872,-2.613l0.291,0.871z",
                            "AF": "M642.364,132.815l2.617,1.162l2.034,-0.291l0.581,-1.452l2.325,-0.291l1.454,-0.870l0.583,-2.323l2.326,-0.291l0.580,-1.162l1.164,0.871l0.871,0.000l1.453,0.000l2.035,0.582l0.871,0.290l2.036,-0.872l0.872,0.582l0.872,-1.162l1.745,0.000l0.289,-0.291l0.290,-1.161l1.455,-1.161l1.454,0.871l-0.291,0.871l0.581,0.000l0.000,2.323l0.873,0.872l1.161,-0.581l1.162,-0.291l1.744,-1.162l1.745,0.290l2.909,0.000l0.580,0.582l-1.743,0.290l-1.454,0.581l-2.907,0.291l-3.197,0.580l-1.454,1.161l0.581,1.162l0.289,1.452l-1.450,1.161l0.289,1.162l-0.872,0.871l-2.616,0.000l1.161,1.743l-1.742,0.580l-1.162,1.743l0.000,1.743l-0.875,0.580l-1.160,0.000l-2.036,0.290l-0.292,0.581l-2.034,0.000l-1.452,1.742l-0.291,2.323l-3.488,1.161l-2.035,-0.289l-0.581,0.580l-1.455,-0.291l-2.907,0.291l-4.649,-1.452l2.615,-2.323l-0.289,-1.742l-2.036,-0.581l-0.290,-1.743l-0.873,-2.032l1.163,-1.742l-1.163,-0.291l0.873,-2.032l-1.161,3.485z",
                            "AL": "M530.451,115.973l-0.289,0.871l0.289,1.161l1.165,0.581l0.000,0.872l-0.873,0.291l-0.292,0.869l-1.160,1.453l-0.583,-0.291l0.000,-0.580l-1.454,-0.871l-0.292,-1.452l0.292,-1.742l0.292,-0.872l-0.584,-0.580l0.000,-0.872l1.163,-1.162l0.292,0.291l0.582,0.000l0.581,0.581l0.582,0.290l-0.289,-1.162z",
                            "AM": "M593.82,118.005l3.780,-0.580l0.581,0.870l0.871,0.291l-0.289,0.872l1.452,0.871l-0.871,0.871l1.163,0.871l1.162,0.290l0.000,2.032l-0.873,0.000l-1.163,-1.451l0.000,-0.581l-1.160,0.000l-0.873,-0.581l-0.582,0.000l-1.162,-0.871l-2.036,-0.580l0.292,-1.452l0.292,0.872z",
                            "AO": "M518.825,247.227l0.582,2.032l0.871,1.453l0.581,0.87l0.874,1.452h2.033l0.873-0.581l1.452,0.581l0.582-0.871l0.581-1.451l1.744-0.291v-0.29h1.452l-0.289,0.871h3.488v1.742l0.579,1.161l-0.579,1.453l0.29,1.74l0.873,1.162v3.195l0.581-0.292h1.162l1.745-0.29h1.161l0.291,0.871l-0.291,1.452l0.583,1.161l-0.292,1.161v0.873h-5.524l-0.289,8.711l2.034,2.322l1.745,1.744l-5.232,1.161l-6.396-0.582l-2.033-1.161h-11.047l-0.581,0.291l-1.745-1.161l-1.743-0.292l-1.455,0.581l-1.452,0.581l-0.29-1.742l0.581-2.612l0.871-2.324v-1.161l0.874-2.613l0.871-1.163l1.452-1.742l0.873-1.16l0.292-2.033v-1.451l-0.874-1.162l-0.871-1.742l-0.581-1.452v-0.581l0.872-1.161l-0.872-2.613l-0.291-1.742l-1.455-1.741l0.292-0.582l1.163-0.581l0.581,0.291l1.162-0.581L518.825,247.227zM508.071,246.646l-0.874,0.291l-0.581-2.031l1.163-1.163l0.87-0.581l0.874,0.871l-0.874,0.58l-0.578,0.872V246.646z",
                            "AR": "M293.546,382.836h-2.616l-1.454-0.87h-1.745h-2.907v-6.389l1.163,1.45l1.163,2.033l3.779,1.744l3.778,0.58L293.546,382.836zM295,291.656l1.452,2.033l1.163-2.323l3.198,0.29l0.291,0.581l5.232,4.356l2.326,0.29l3.198,2.033l2.906,1.161l0.291,1.162l-2.617,4.354l2.617,0.58l3.197,0.581l2.326-0.581l2.326-2.032l0.582-2.322l1.163-0.58l1.454,1.45v2.324l-2.325,1.45l-1.745,1.163l-3.198,2.612l-3.779,3.777l-0.582,2.321l-0.872,2.613l0.291,2.905l-0.872,0.58v1.741l-0.29,1.452l3.487,2.323l-0.291,2.033l1.745,1.161l-0.291,1.162l-2.616,3.773l-4.07,1.455l-5.522,0.579l-2.907-0.29l0.582,1.451l-0.582,2.033l0.291,1.452l-1.454,0.871l-2.907,0.58l-2.616-1.161l-1.163,0.871l0.583,2.613l1.744,0.872l1.452-0.872l0.873,1.453l-2.617,0.87l-2.035,1.743l-0.582,2.613l-0.58,1.451h-2.617l-2.035,1.451l-0.873,2.033l2.617,2.032l2.615,0.582l-0.872,2.613l-3.197,1.452l-1.744,3.194l-2.616,1.161l-1.163,1.163l0.872,2.902l2.035,1.742l-1.163-0.291l-2.617-0.29l-6.685-0.58l-1.163-1.453v-2.03h-1.744l-0.873-0.873l-0.291-2.904l2.035-1.161l0.873-1.741l-0.292-1.453l1.455-2.323l0.872-3.775l-0.291-1.451l1.452-0.58l-0.29-1.162l-1.454-0.289l0.873-1.162l-1.162-1.162l-0.582-3.194l1.164-0.581l-0.582-3.193l0.582-2.904l0.872-2.613l1.453-0.87l-0.581-2.615l-0.292-2.613l2.326-1.742l-0.29-2.323l1.744-2.613v-2.613l-0.873-0.58l-1.163-4.646l1.744-2.904l-0.291-2.612l0.872-2.614l2.035-2.324l1.744-1.741l-0.872-1.163l0.582-0.87v-4.646l2.907-1.451l1.163-2.613l-0.291-0.872l2.034-2.324L295,291.656z",
                            "AT": "M520.57,98.549l-0.292,1.162l-1.453,0.000l0.582,0.581l-1.164,1.742l-0.291,0.580l-2.616,0.000l-1.162,0.582l-2.326,-0.291l-4.069,-0.580l-0.582,-0.872l-2.615,0.292l-0.291,0.580l-1.746,-0.291l-1.452,0.000l-1.162,-0.581l0.289,-0.581l0.000,-0.580l0.873,-0.291l1.452,0.871l0.292,-0.871l2.326,0.291l2.034,-0.581l1.452,0.000l0.584,0.581l0.290,-0.291l-0.290,-1.742l0.872,-0.580l1.162,-1.162l2.035,0.871l1.453,-1.162l0.871,0.000l2.326,0.581l1.163,0.000l1.455,0.581l-0.292,0.291l-0.292,-0.870z",
                            "AU": "M874.039,343.054l2.616,0.871l1.454-0.29l2.325-0.581l1.453,0.291l0.291,3.193l-0.87,0.872l-0.293,2.321l-1.162-0.579l-1.744,1.741h-0.582l-1.743-0.289l-1.745-2.324l-0.289-1.742l-1.744-2.323l0.29-1.451L874.039,343.054zM868.806,268.715l1.163,2.324l1.744-1.163l0.873,1.163l1.452,1.161l-0.289,1.161l0.58,2.324l0.291,1.45l0.873,0.29l0.579,2.323l-0.289,1.453l0.871,1.741l3.198,1.453l1.744,1.451l2.034,1.161l-0.582,0.581l1.745,1.742l0.87,2.904l1.165-0.581l1.163,1.452l0.581-0.581l0.579,2.904l2.036,1.742l1.163,1.161l2.034,2.033l0.873,2.322v1.452v1.742l1.163,2.323v2.323l-0.582,1.452l-0.581,2.323v1.742l-0.582,2.033l-1.162,2.322l-2.034,1.453l-1.163,2.031l-0.872,1.453l-0.872,2.322l-0.871,1.451l-0.873,2.033l-0.292,1.743v0.87l-1.452,1.163h-3.198l-2.326,1.159l-1.452,1.163l-1.454,1.161l-2.325-1.45l-1.743-0.293l0.289-1.45l-1.452,0.58l-2.325,1.744l-2.326-0.581l-1.743-0.582h-1.454l-2.616-0.871l-1.744-1.743l-0.582-2.032l-0.58-1.452l-1.456-1.162l-2.614-0.29l0.873-1.161l-0.581-2.033l-1.455,1.744l-2.326,0.579l1.455-1.452l0.292-1.74l1.161-1.453l-0.291-2.032l-2.324,2.612l-1.745,0.873l-0.873,2.03l-2.323-1.161l0.29-1.452l-1.744-1.741l-1.455-1.161l0.583-0.581l-3.779-1.743h-1.744l-2.616-1.45l-4.942,0.29l-3.778,0.871l-2.907,1.162l-2.615-0.292l-2.908,1.451l-2.616,0.581l-0.289,1.452l-1.163,1.161h-2.325l-1.744,0.291l-2.325-0.581l-2.036,0.29l-2.034,0.291l-1.455,1.452l-0.871-0.291l-1.452,0.871l-1.163,0.873h-2.036h-2.034l-2.906-1.744l-1.452-0.58v-1.742l1.452-0.291l0.581-0.58l-0.29-1.161l0.58-1.743l-0.29-1.741l-1.454-2.614l-0.579-1.742v-1.452l-0.873-1.743l-0.29-0.87l-1.163-1.162l-0.292-2.033l-1.454-2.323l-0.579-1.161l1.163,1.161l-0.874-2.321l1.455,0.58l0.873,1.161v-1.451l-1.454-2.033l-0.292-0.87l-0.582-0.872l0.29-1.742l0.584-0.581l0.289-1.451l-0.289-1.453l1.162-2.032l0.292,2.032l1.161-1.743l2.034-1.159l1.454-1.162l2.034-0.872l1.454-0.29l0.581,0.29l2.325-0.871l1.455-0.29l0.579-0.58l0.582-0.291h1.744l2.616-0.871l1.745-1.161l0.579-1.452l1.744-1.452v-1.162v-1.45l2.036-2.324l1.163,2.324l1.163-0.292l-0.871-1.45l0.871-1.453l1.163,0.871l0.289-2.322l1.454-1.162l0.58-1.162l1.454-0.58v-0.581l1.163,0.291l0.291-0.872l1.163-0.291l1.163-0.289l2.034,1.161l1.743,1.742h1.453l1.744,0.291l-0.581-1.742l1.454-2.032l1.163-0.873l-0.291-0.581l1.162-1.452l1.744-1.161l1.165,0.291l2.323-0.291v-1.452l-2.034-0.87l1.453-0.58l2.035,0.869l1.453,1.163l2.326,0.581l0.581-0.29l1.744,0.87l1.744-0.87l0.871,0.29l0.872-0.581l1.164,1.451l-0.873,1.453l-0.872,1.16h-0.873l0.292,1.162l-0.873,1.452l-1.163,1.161l0.292,0.872l2.325,1.452l2.034,0.87l1.454,0.871l2.034,1.742h0.581l1.452,0.582l0.582,0.87l2.617,1.161l1.745-1.161l0.581-1.452l0.581-1.161l0.29-1.452l0.873-2.322l-0.291-1.161v-0.872l-0.291-1.452l0.291-2.322l0.581-0.29l-0.29-1.163l0.581-1.451l0.582-1.452v-0.872l1.163-0.869l0.58,1.45l0.291,1.743l0.581,0.291l0.291,1.16l0.871,1.163l0.292,1.74L868.806,268.715z",
                            "AZ": "M597.6,121.78l0.873,0.581h1.16v0.581l1.163,1.451l-2.033-0.29l-1.163-1.453l-0.582-0.871H597.6zM604.285,117.715h1.165l0.29-0.581l1.744-1.162l1.452,1.452l1.453,2.033h1.165l0.87,0.871h-2.325l-0.292,2.322l-0.579,0.873l-0.873,0.58v1.452l-0.582,0.291l-1.743-1.453l0.871-1.451l-0.871-0.871l-0.872,0.291l-3.488,2.032v-2.032l-1.162-0.291l-1.163-0.871l0.871-0.871l-1.452-0.871l0.289-0.871l-0.871-0.291l-0.581-0.871l0.581-0.29l2.034,0.581l1.454,0.29l0.582-0.29l-1.455-1.453l0.582-0.29h0.873L604.285,117.715z",
                            "BA": "M526.091,107.552l0.871,0.000l-0.581,1.161l1.455,1.162l-0.582,1.161l-0.581,0.291l-0.582,0.290l-0.872,0.581l-0.291,1.451l-2.614,-1.161l-0.874,-1.161l-1.162,-0.581l-1.163,-0.871l-0.579,-0.872l-1.454,-1.451l0.581,-0.872l1.162,0.581l0.582,-0.581l1.163,0.000l2.325,0.291l2.033,0.000l-1.163,-0.581z",
                            "BD": "M728.989,170.275l-0.292,2.033l-0.871,-0.291l0.291,2.033l-0.872,-1.452l-0.292,-1.452l-0.290,-1.162l-1.163,-1.742l-2.615,0.000l0.289,1.161l-0.873,1.453l-1.161,-0.581l-0.581,0.581l-0.582,-0.292l-1.164,-0.289l-0.290,-2.324l-1.160,-2.032l0.579,-1.742l-1.744,-0.582l0.582,-1.160l1.743,-0.873l-2.034,-1.451l1.163,-2.032l2.034,1.451l1.454,0.000l0.291,2.032l2.616,0.291l2.327,0.000l1.743,0.291l-1.454,2.324l-1.163,0.289l-0.872,1.452l1.454,1.452l0.581,-1.742l0.872,0.000l-1.454,-4.356z",
                            "BE": "M482.78,89.837l2.034,0.000l2.617,-0.580l1.745,1.451l1.452,0.582l-0.290,1.742l-0.583,0.291l-0.290,1.451l-2.615,-1.161l-1.162,0.000l-2.036,-1.162l-1.163,-1.161l-1.452,0.000l-0.293,-0.872l-2.036,0.581z",
                            "BF": "M465.919,204.54l-1.744,-0.872l-1.452,0.291l-0.872,0.581l-1.164,-0.581l-0.579,-0.871l-1.165,-0.582l-0.290,-1.741l0.873,-1.161l0.000,-0.871l2.034,-2.324l0.291,-1.742l0.872,-0.871l1.452,0.581l1.163,-0.581l0.291,-0.872l2.035,-1.161l0.582,-0.871l2.617,-1.162l1.452,-0.290l0.582,0.581l2.035,0.000l-0.292,1.161l0.292,1.162l1.453,2.033l0.291,1.161l3.198,0.581l-0.291,2.032l-0.583,0.872l-1.161,0.290l-0.584,1.162l-0.870,0.290l-2.616,0.000l-1.163,-0.290l-0.872,0.290l-1.163,0.000l-4.942,0.000l0.000,1.452l-0.290,-2.323z",
                            "BG": "M536.265,109.294l0.581,1.162l1.164,-0.291l2.035,0.581l4.071,0.000l1.452,-0.581l3.196,-0.581l2.035,0.872l1.454,0.290l-1.163,1.161l-1.163,2.033l0.872,1.452l-2.324,-0.290l-2.907,0.871l0.000,1.452l-2.326,0.000l-2.034,-0.872l-2.326,0.872l-2.036,-0.290l0.000,-1.743l-1.452,-0.871l0.290,-0.292l-0.290,-0.289l0.580,-0.871l1.164,-0.871l-1.454,-1.162l-0.290,-1.161l-0.871,0.581z",
                            "BI": "M554.579,243.451l-0.290,-3.484l-0.583,-1.161l1.743,0.290l0.874,-1.743l1.454,0.291l0.000,0.871l0.582,0.871l0.000,0.872l-0.582,0.580l-1.163,1.454l-0.872,0.870l1.163,-0.289z",
                            "BJ": "M481.037,213.833l-2.037,0.290l-0.872,-2.033l0.290,-6.388l-0.579,-0.289l-0.291,-1.454l-0.872,-0.871l-0.873,-0.871l0.582,-1.452l0.870,-0.290l0.584,-1.162l1.161,-0.290l0.583,-0.872l1.161,-0.871l0.874,0.000l2.034,1.453l0.000,1.160l0.580,1.453l-0.580,1.160l0.291,0.873l-1.454,1.452l-0.582,0.871l-0.581,1.743l0.000,1.741l0.289,-4.647z",
                            "BN": "M787.998,218.479l1.163,-0.872l2.324,-1.741l0.000,1.451l-0.291,1.743l-1.163,0.000l-0.580,0.870l1.453,1.451z",
                            "BO": "M300.812,291.656l-3.197,-0.290l-1.163,2.323l-1.452,-2.033l-3.781,-0.582l-2.033,2.324l-2.036,0.582l-1.163,-4.065l-1.453,-2.906l0.872,-2.612l-1.453,-1.163l-0.291,-2.031l-1.454,-2.033l1.745,-2.904l-1.163,-2.324l0.582,-0.869l-0.582,-0.872l1.163,-1.452l0.000,-2.323l0.290,-2.033l0.582,-0.873l-2.326,-4.355l2.035,0.000l1.163,0.000l0.872,-0.870l2.326,-0.872l1.453,-1.162l3.487,-0.580l-0.289,2.031l0.289,1.163l0.000,1.743l2.909,2.612l3.196,0.290l0.872,1.162l2.035,0.581l1.163,0.872l1.744,0.000l1.453,0.580l0.000,1.743l0.582,0.871l0.000,1.162l-0.582,0.000l0.872,3.195l5.233,0.000l-0.291,1.740l0.291,0.873l1.453,0.871l0.872,1.742l-0.581,2.032l-0.873,1.453l0.291,1.451l-0.872,0.580l0.000,-0.871l-2.615,-1.451l-2.616,0.000l-4.652,0.871l-1.453,2.324l0.000,1.451l-1.163,3.485l0.291,0.581z",
                            "BR": "M315.056,314.017l3.778,-3.777l3.198,-2.613l1.745,-1.163l2.325,-1.450l0.000,-2.324l-1.454,-1.450l-1.162,0.580l0.580,-1.742l0.292,-1.454l0.000,-1.741l-1.163,-0.290l-0.872,0.290l-1.163,0.000l-0.290,-1.162l-0.291,-2.613l-0.291,-0.581l-2.035,-0.871l-1.163,0.581l-2.907,-0.581l0.291,-3.776l-0.872,-1.452l0.872,-0.580l-0.291,-1.451l0.873,-1.453l0.581,-2.032l-0.872,-1.742l-1.453,-0.871l-0.291,-0.873l0.291,-1.740l-5.233,0.000l-0.872,-3.195l0.582,0.000l0.000,-1.162l-0.582,-0.871l0.000,-1.743l-1.453,-0.580l-1.744,0.000l-1.163,-0.872l-2.035,-0.581l-0.872,-1.162l-3.196,-0.290l-2.909,-2.612l0.000,-1.743l-0.289,-1.163l0.289,-2.031l-3.487,0.580l-1.453,1.162l-2.326,0.872l-0.872,0.870l-1.163,0.000l-2.035,0.000l-1.744,0.292l-1.163,-0.292l0.292,-4.066l-2.326,1.453l-2.616,0.000l-0.872,-1.453l-1.744,0.000l0.581,-1.451l-1.744,-1.451l-1.163,-2.614l0.872,-0.581l0.000,-1.162l1.744,-0.581l-0.290,-1.451l0.581,-1.162l0.291,-1.161l3.198,-2.034l2.033,-0.289l0.583,-0.580l2.324,0.290l1.163,-7.551l0.291,-1.161l-0.582,-1.743l-1.162,-0.871l0.000,-2.033l1.453,-0.581l0.582,0.290l0.291,-0.871l-1.745,-0.290l0.000,-1.742l5.233,0.000l0.871,-0.871l0.873,0.871l0.582,1.452l0.581,-0.290l1.452,1.451l2.036,-0.289l0.580,-0.582l2.036,-0.870l1.162,-0.291l0.291,-1.162l2.035,-0.871l-0.291,-0.581l-2.324,-0.289l-0.292,-1.744l0.000,-1.741l-1.163,-0.872l0.582,0.000l2.034,0.290l2.326,0.582l0.581,-0.582l2.035,-0.580l3.198,-0.871l0.872,-1.162l-0.291,-0.580l1.453,-0.291l0.582,0.582l-0.290,1.451l0.872,0.290l0.580,1.161l-0.580,1.162l-0.582,2.324l0.582,1.451l0.291,1.162l1.743,1.162l1.454,0.290l0.290,-0.581l0.872,0.000l1.163,-0.581l0.871,-0.871l1.454,0.290l0.872,0.000l1.454,0.291l0.290,-0.581l-0.581,-0.581l0.291,-0.870l1.163,0.289l1.162,-0.289l1.745,0.581l1.161,0.581l0.873,-0.873l0.582,0.292l0.290,0.581l1.453,0.000l0.872,-1.162l0.872,-2.034l1.745,-2.323l0.872,-0.290l0.581,1.452l1.744,4.936l1.453,0.291l0.000,2.032l-2.034,2.323l0.872,0.872l4.942,0.290l0.000,2.904l2.034,-2.033l3.489,1.163l4.650,1.741l1.163,1.453l-0.290,1.451l3.197,-0.872l5.232,1.453l4.070,0.000l4.069,2.322l3.780,3.196l2.034,0.582l2.326,0.289l0.872,0.870l1.162,3.485l0.291,1.452l-1.162,4.646l-1.163,1.742l-4.070,3.775l-1.744,3.194l-2.035,2.323l-0.581,0.290l-0.873,2.034l0.291,4.936l-0.872,4.357l-0.290,1.742l-0.873,1.162l-0.581,3.774l-2.615,3.483l-0.583,2.906l-2.034,1.161l-0.872,1.453l-2.907,0.000l-4.360,1.160l-1.745,1.162l-3.197,0.871l-3.198,2.324l-2.325,2.613l-0.581,2.032l0.581,1.452l-0.581,2.904l-0.581,1.163l-2.035,1.742l-2.907,4.645l-2.325,2.323l-2.036,1.162l-1.162,2.615l-1.744,1.740l-0.872,-1.740l1.163,-1.164l-1.454,-2.032l-2.325,-1.451l-2.907,-1.743l-0.872,0.000l-2.907,-2.033l1.744,-0.292z",
                            "BS": "M260.408,165.628h-0.872l-0.581-1.452l-1.163-0.871l0.872-1.743l0.581,0.291l1.164,2.033V165.628zM259.536,157.788l-2.907,0.581l-0.291-1.162l1.454-0.29l1.744,0.29V157.788zM261.86,157.788l-0.58,2.032l-0.583-0.29l0.291-1.451l-1.453-1.162v-0.291L261.86,157.788z",
                            "BT": "M726.082,154.594l1.163,0.871l0.000,1.742l-2.326,0.000l-2.326,-0.290l-1.744,0.581l-2.615,-1.162l0.000,-0.581l1.743,-2.033l1.454,-0.580l2.035,0.580l1.453,0.000l-1.163,-0.872z",
                            "BW": "M544.405,281.784l0.582,0.580l0.870,1.742l2.907,2.903l1.455,0.292l0.000,0.870l0.580,1.744l2.326,0.579l1.745,1.162l-4.071,2.033l-2.324,2.032l-0.871,1.742l-0.874,1.161l-1.452,0.293l-0.584,1.161l-0.289,0.870l-1.744,0.582l-2.327,0.000l-1.162,-0.872l-1.162,-0.290l-1.454,0.580l-0.582,1.453l-1.452,0.870l-1.164,1.162l-2.033,0.290l-0.582,-0.872l0.289,-1.741l-1.741,-2.613l-0.874,-0.580l0.000,-7.843l2.908,-0.289l0.000,-9.582l2.033,-0.291l4.361,-0.871l0.871,1.162l1.744,-1.162l0.874,0.000l1.743,-0.582l0.291,0.291l-1.163,-2.034z",
                            "BY": "M538.301,82.579l2.907,0.000l2.908,-0.872l0.578,-1.452l2.326,-1.162l-0.290,-1.160l1.745,-0.291l2.906,-1.162l2.908,0.581l0.290,0.872l1.454,-0.291l2.615,0.581l0.289,1.161l-0.578,0.871l1.743,1.743l1.163,0.581l-0.292,0.290l2.036,0.580l0.872,0.872l-1.163,0.580l-2.326,-0.290l-0.581,0.290l0.871,0.872l0.583,2.033l-2.328,0.000l-0.870,0.580l-0.290,1.451l-0.873,-0.289l-2.615,0.000l-0.583,-0.581l-1.162,0.581l-1.163,-0.291l-2.036,-0.290l-3.196,-0.581l-2.615,-0.291l-2.035,0.291l-1.746,0.581l-1.163,0.000l0.000,-1.161l-0.871,-1.162l1.453,-0.582l0.000,-1.161l-0.582,-0.870l0.289,1.452z",
                            "BZ": "M228.433,181.89l0.000,-0.290l0.290,-0.290l0.582,0.580l0.872,-1.742l0.580,0.000l0.000,0.290l0.581,0.000l-0.289,0.872l-0.292,1.162l0.292,0.289l-0.292,1.162l0.000,0.291l-0.290,1.161l-0.582,0.872l-0.291,0.000l-0.581,0.870l-0.872,0.000l0.292,-2.903l0.000,2.324z",
                            "CA": "M298.487,102.905l2.035,0.291h2.617l-1.454,1.162l-0.872,0.29l-3.488-1.162l-0.873-1.161l1.163-0.872L298.487,102.905zM303.719,95.937h-1.454l-3.488-0.872l-2.616-1.162l0.872-0.291l3.779,0.581l2.616,1.162L303.719,95.937zM133.669,97.679l-1.163,0.291l-4.651-1.162l-0.872-1.162l-2.324-0.871l-0.582-0.871l-2.907-0.581l-0.872-1.452V91.29l2.907,0.581l1.744,0.58l2.617,0.291l0.872,0.872l1.454,1.162l2.615,1.162L133.669,97.679zM319.125,91.581l-1.744,2.323l1.744-0.871l2.035,0.581l-1.163,0.871l2.617,0.873l1.163-0.582l2.906,0.871l-0.872,1.742l1.744-0.291l0.292,1.452l0.872,1.742l-1.164,2.323h-1.162l-1.744-0.29l0.582-2.323l-0.872-0.29l-3.198,2.323h-1.453l1.744-1.452l-2.617-0.581h-2.907h-5.232l-0.58-0.872l1.744-0.871l-1.164-0.871l2.326-1.451l2.906-4.356l1.745-1.743l2.325-0.87h1.163l-0.582,0.87L319.125,91.581zM108.38,82.289l2.616-0.291l-0.58,3.195l2.324,2.323h-1.163l-1.744-1.453l-0.871-1.161l-1.454-0.871l-0.582-1.162l0.291-0.871L108.38,82.289zM255.466,59.928l-0.872,1.453l-1.453-0.291l-0.582-0.58v-0.291l1.163-0.872h1.163L255.466,59.928zM248.198,58.477l-3.197,1.451h-1.744l-0.581-0.581l2.034-1.452h3.779L248.198,58.477zM239.478,50.346l0.291,1.161l1.454-0.29l1.744,0.581l2.906,1.162l3.198,0.871l0.29,1.162l2.035-0.29l1.745,0.871l-2.326,0.872l-4.361-0.581l-1.453-1.161l-2.617,1.452l-4.069,1.451l-0.872-1.742l-3.779,0.291l2.325-1.162l0.291-2.323l1.163-2.613L239.478,50.346zM265.058,46.28l-3.198,0.291l-0.58-1.453l1.162-1.451l2.326-0.581l2.326,0.871v1.161l-0.291,0.292L265.058,46.28zM210.41,40.763l-1.744,1.162l-3.488-0.872l-2.325,0.291l-3.779-1.162l2.325-0.872l2.035-1.162l2.907,0.581l1.744,0.581l0.581,0.581L210.41,40.763zM224.653,39.891v2.614l3.488-2.032l3.197,1.742l-0.581,2.033l2.616,2.032l2.907-2.032l2.035-2.324v-3.195l4.069,0.292l4.07,0.29l3.488,1.452l0.291,1.452l-2.035,1.452l1.744,1.451l-0.291,1.162l-5.231,2.033l-3.779,0.291l-2.907-0.581l-0.872,1.161l-2.617,2.323l-0.872,1.453l-3.196,1.743l-3.78,0.29l-2.325,1.162l-0.292,1.741l-3.197,0.291l-3.198,2.324l-2.907,2.904l-1.162,2.323l-0.292,3.194l4.07,0.291l1.454,2.614l1.163,2.033l3.779-0.582l5.232,1.453l2.616,0.871l2.035,1.452l3.489,0.582l2.907,1.162l4.651,0.29l2.906,0.291l-0.581,2.323l0.872,2.614l2.035,3.194l4.07,2.613l2.326-0.871l1.452-2.903l-1.452-4.357l-2.035-1.452l4.36-1.162l3.197-2.033l1.455-1.742l-0.292-2.032l-1.744-2.324L257.5,69.22l3.489-2.904l-1.162-2.323l-1.163-4.355l2.034-0.582l4.651,0.582l2.907,0.29l2.326-0.581l2.616,0.872l3.198,1.451l0.872,1.162l4.941,0.291v2.323l0.872,3.484l2.616,0.291l1.745,1.742l4.07-1.742l2.616-2.904l1.744-1.161l2.325,2.323l3.488,3.484l3.198,3.195l-1.163,1.742l3.487,1.742l2.616,1.451l4.36,0.872l1.744,0.871l1.163,2.324l2.035,0.29l1.163,0.872l0.291,3.194l-2.035,1.161l-2.035,0.872l-4.65,0.871l-3.198,2.323l-4.942,0.582l-5.814-0.582h-4.07h-2.906l-2.326,2.033l-3.488,1.162l-3.779,3.775l-3.197,2.613l2.325-0.58l4.36-3.486l5.814-2.322l4.069-0.291l2.326,1.162l-2.616,2.032l0.872,2.905l0.872,2.032l3.779,1.452l4.361-0.581l2.906-2.903l0.292,2.032l1.744,0.871l-3.489,1.742l-6.104,1.743l-2.616,1.161l-3.198,2.033l-2.034-0.291l-0.29-2.323l4.94-2.324h-4.36l-3.197,0.291l-1.744-1.452v-3.775l-1.163-0.87l-2.035,0.581l-0.872-0.581l-2.035,2.032l-0.873,2.033l-0.872,1.162l-1.162,0.58h-0.872l-0.292,0.871h-5.232h-4.07l-1.163,0.581l-2.907,1.743l-0.291,0.29l-0.872,1.162h-2.616h-2.616l-1.454,0.291l0.582,0.581l0.291,0.871l-0.291,0.291l-3.488,1.453l-2.907,0.29l-3.197,1.452h-0.581l-0.872-0.29l-0.292-0.581v-0.29l0.581-0.873l1.163-1.451l0.872-1.742l-0.58-2.323l-0.583-2.613l-2.906-1.162l0.581-0.581l-0.581-0.29h-0.581l-0.583-0.291l-0.29-0.871l-0.583,0.291h-0.58v-0.291l-0.582-0.291l-0.291-0.58l-2.035-0.871l-2.326-0.872l-2.616-1.162l-2.617-1.161l-2.326,0.87h-0.872l-3.488-0.581l-2.325,0.291l-2.616-0.871l-2.907-0.291l-1.744-0.291l-0.871-0.581l-0.582-1.452h-0.873v1.161h-5.813h-9.302h-9.302h-8.43h-8.138h-8.14h-8.43h-2.616h-8.139h-7.849h-0.582l-5.231-2.613l-2.036-1.452l-4.941-0.871l-1.454-2.614l0.291-1.742l-3.488-1.161l-0.291-2.033l-3.488-2.033v-1.452l1.454-1.452v-1.743l-4.65-1.742l-2.908-2.903l-1.744-2.033l-2.616-1.162l-1.744-1.162l-1.454-1.451l-2.616,0.871L95.3,68.93l-2.326-1.741l-2.035-1.162l-2.616-0.872h-2.616V49.475V39.311l5.232,0.581l4.069,1.453h2.907l2.616-0.871l3.198-0.871l4.07,0.29l4.069-1.162l4.651-0.87l1.744,1.162l2.035-0.581l0.872-1.452l1.744,0.29l4.651,2.613l3.778-1.742l0.292,2.033l3.487-0.581l0.872-0.872l3.487,0.292l4.071,1.161l6.395,0.871l3.779,0.582l2.907-0.291l3.488,1.452l-3.779,1.453l4.94,0.581l7.559-0.291l2.325-0.581l2.906,1.742l2.908-1.451l-2.616-1.162l1.744-0.871l3.196-0.291l2.326-0.29l2.035,0.871l2.907,1.452l3.197-0.291l4.65,1.162l4.361-0.291h4.07l-0.291-1.742l2.326-0.581l4.36,1.162v2.614l1.744-2.324h2.035l1.454-2.614l-3.198-1.742l-3.196-1.162l0.291-2.903l3.198-2.033l3.778,0.29l2.617,1.453l3.779,2.904l-2.326,1.451L224.653,39.891zM159.54,29.728l-1.453,1.453l6.104-0.871l3.779,1.451l3.197-1.451l2.617,0.871l2.035,2.613l1.454-1.161l-1.745-2.615l2.327-0.581l2.615,0.581l3.198,1.162l1.744,2.613l0.872,2.033l4.651,1.162l4.941,1.452l-0.29,1.162l-4.651,0.29l1.744,0.872l-0.873,1.162l-4.941-0.581l-4.651-0.581h-3.198l-5.231,1.162l-6.977,0.291l-4.941,0.29l-1.454-1.452l-3.778-0.58l-2.617,0.29l-3.198-2.323l1.744-0.291l4.36-0.29h3.778l3.488-0.291l-5.233-0.871l-5.813,0.291h-4.069l-1.454-1.162l6.396-0.871h-4.07l-4.941-0.872l2.325-2.033l2.036-1.162l7.267-1.452L159.54,29.728zM185.993,29.147l-2.326,1.742l-4.361-2.032l1.163-0.291h3.488L185.993,29.147zM263.604,30.018l0.291,0.582h-2.907h-2.906l-3.197,0.29l-0.582-0.29l-3.198-1.452l0.291-0.872l1.163-0.291l6.396,0.291L263.604,30.018zM235.409,29.728l2.325,1.743l2.326-2.323l6.977-0.872l4.941,2.614l-0.582,2.033l5.523-0.871l2.616-1.162l6.104,1.451l3.78,1.162l0.29,1.162l5.233-0.581l2.906,1.742l6.687,1.162l2.326,1.161l2.616,2.614l-5.233,1.162l6.687,1.742l4.359,0.582l3.779,2.613l4.36,0.29l-0.872,1.743l-4.651,3.194l-3.488-1.162l-4.36-2.613l-3.488,0.291l-0.291,1.742l2.907,1.452l3.778,1.452l0.872,0.581l2.036,2.904l-1.164,1.743l-3.488-0.582l-6.685-2.323l3.779,2.323l2.906,1.743l0.292,0.871l-7.268-0.871l-6.104-1.743l-3.198-1.161l0.872-0.871l-4.07-1.451l-4.07-1.453v0.871l-7.848,0.582L257.5,53.25l1.745-2.033h5.232l5.814-0.291l-1.163-0.871l1.163-1.452l3.488-2.613l-0.872-1.162l-0.873-1.162l-4.36-1.162l-5.522-1.161l1.743-0.581l-2.907-1.742h-2.325l-2.326-1.162l-1.453,0.87l-4.942,0.292l-9.883-0.581l-5.814-0.581l-4.651-0.582l-2.325-0.871l2.908-1.451h-3.78l-0.872-2.615l2.036-2.613l2.906-0.87l6.977-0.872L235.409,29.728zM197.62,27.985l3.198,0.582l4.942-0.582l0.582,0.872l-2.617,1.452l4.361,1.162l-0.582,2.323l-4.361,1.162l-2.907-0.291l-1.744-0.871l-6.976-2.323l0.29-0.871l5.523,0.29l-3.196-1.742L197.62,27.985zM217.096,30.89l-2.907,2.033h-3.197l-1.454-2.613v-1.452l1.454-1.162l2.616-0.581h5.814l5.232,0.871l-4.069,2.324L217.096,30.89zM142.099,34.665l-7.267,1.162l-1.453-1.162l-6.396-1.452l1.455-1.162l1.743-2.033l2.326-1.742l-2.615-1.742l9.301-0.29l4.07,0.581h6.976l2.616,0.871l2.907,1.162l-3.488,0.87l-6.686,1.743l-3.488,2.032V34.665zM216.224,24.792l-1.744,1.162l-3.778-0.291l-3.489-0.871l1.453-1.162l4.07-0.58l2.326,0.871L216.224,24.792zM202.562,19.855l2.035,1.452l0.291,1.452l-1.454,2.033l-4.36,0.291l-2.908-0.582v-1.452h-4.65v-2.033h2.906l4.07-0.871l4.07,0.291V19.855zM175.819,21.307l1.163,1.162l2.324-0.582l2.907,0.291l0.582,1.161l-1.745,1.453l-9.301,0.291l-6.977,1.162h-4.07l-0.291-0.873l5.523-1.16l-12.208,0.29l-4.07-0.29l3.779-2.904l2.616-0.581l7.848,0.871l4.942,1.453l4.651,0.29l-3.779-2.613l2.326-0.871l2.907,0.29L175.819,21.307zM213.026,18.984l3.198,0.872h5.523l2.326,0.871l-0.582,1.161l2.906,0.582l1.744,0.58h3.779l4.069,0.29l4.361-0.58l5.522-0.29l4.651,0.29l2.907,0.871l0.582,1.162l-1.744,0.871l-4.07,0.582l-3.488-0.291l-7.848,0.291h-5.813l-4.36-0.291l-7.268-0.871l-0.872-1.453l-0.582-1.451l-2.617-1.162l-5.814-0.291l-3.196-0.871l1.163-1.162L213.026,18.984zM154.018,17.532l-0.582,2.033l-2.035,0.871l-2.616,0.29l-4.941,1.161l-4.65,0.291l-3.488-0.582l4.651-2.032l5.523-1.742h4.36L154.018,17.532zM215.351,17.823h-1.163l-5.231-0.291l-0.582-0.581h5.522l1.744,0.581L215.351,17.823zM170.586,17.243l-5.232,0.87l-4.071-0.87l2.326-0.873l3.779-0.29l4.07,0.29L170.586,17.243zM172.04,14.919l-3.488,0.291H163.9v-0.291l2.907-0.872l1.453,0.29L172.04,14.919zM210.12,16.37l-4.07,0.581l-2.326-0.87l-1.163-0.871l-0.291-1.162h3.488l1.744,0.29l3.198,0.872L210.12,16.37zM198.201,15.499l1.163,1.162l-4.361-0.291l-4.65-0.871h-6.104l2.616-0.871l-3.198-0.581l-0.291-1.162l5.524,0.291l7.266,1.161L198.201,15.499zM234.246,12.015l3.198,0.871l-3.779,0.582l-4.942,2.322h-4.942l-5.813-0.291l-2.907-1.162v-0.87l2.325-0.872h-4.941l-3.198-0.872l-1.744-1.162l2.034-1.161l1.744-0.871l2.907-0.291l-1.163-0.581l6.395-0.29l3.489,1.452l4.651,0.871l4.36,0.29L234.246,12.015zM285.116,2.432l7.558,0.29l5.813,0.291l4.942,0.58v0.873l-6.685,1.161l-6.687,0.581l-2.616,0.582h6.104L287.15,8.53l-4.651,0.581l-4.651,2.324l-5.813,0.58l-1.744,0.581l-8.139,0.291l3.778,0.291l-2.035,0.58l2.326,1.162l-2.616,1.162l-4.36,0.581l-1.162,1.162l-3.779,0.871l0.291,0.581h4.65v0.581l-7.267,1.741l-7.268-0.871l-7.848,0.291l-4.361-0.291h-4.941l-0.581-1.452l5.231-0.581l-1.454-2.033h1.744l7.268,1.162l-3.779-1.742l-4.36-0.582l2.326-1.162l4.651-0.581l0.872-0.871l-3.779-1.162l-1.163-1.451h7.558l2.034,0.29l4.361-0.87l-6.105-0.291h-9.883L227.85,8.53l-2.325-1.162l-3.197-0.581l-0.582-1.162l4.07-0.291l3.197-0.29l5.232-0.291l4.07-1.162l3.488,0.291l2.906,0.582l2.327-1.453l3.487-0.291l4.942-0.29l8.429-0.291l1.454,0.291l7.849-0.291h6.104L285.116,2.432z",
                            "CD": "M558.648,221.382l-0.289,3.196l1.162,0.289l-0.873,0.871l-0.871,0.872l-1.163,1.451l-0.581,1.161l-0.291,2.324l-0.582,0.871l0.000,2.324l-0.871,0.580l0.000,1.742l-0.290,0.290l-0.293,1.453l0.583,1.161l0.290,3.484l0.581,2.324l-0.290,1.452l0.290,1.742l1.744,1.452l1.455,3.485l-1.163,-0.290l-3.490,0.581l-0.873,0.290l-0.873,1.742l0.873,1.161l-0.580,3.195l-0.293,2.904l0.584,0.291l2.035,1.160l0.581,-0.581l0.289,2.904l-2.033,0.000l-1.163,-1.451l-0.872,-1.162l-2.325,-0.291l-0.581,-1.452l-1.745,0.873l-2.036,-0.291l-0.871,-1.452l-1.743,-0.291l-1.454,0.291l0.000,-0.872l-1.164,-0.290l-1.161,0.000l-1.745,0.290l-1.162,0.000l-0.581,0.292l0.000,-3.196l-0.873,-1.162l-0.290,-1.740l0.579,-1.453l-0.579,-1.161l0.000,-1.743l-3.488,0.000l0.289,-0.871l-1.452,0.000l0.000,0.290l-1.745,0.291l-0.581,1.452l-0.582,0.871l-1.452,-0.581l-0.873,0.581l-2.033,0.000l-0.874,-1.452l-0.581,-0.871l-0.871,-1.453l-0.582,-2.032l-8.140,-0.290l-1.162,0.581l-0.581,-0.291l-1.163,0.581l-0.582,-0.871l0.874,-0.291l0.000,-1.161l0.578,-0.872l0.874,-0.580l0.871,0.291l0.873,-0.873l1.452,0.000l0.292,0.582l0.871,0.580l1.744,-1.741l1.456,-1.454l0.870,-0.870l-0.289,-2.033l1.162,-2.903l1.453,-1.162l1.746,-1.452l0.290,-0.871l0.000,-1.162l0.581,-0.871l-0.292,-1.451l0.292,-2.614l0.579,-1.451l0.874,-1.744l0.291,-1.452l0.289,-2.032l0.874,-1.452l1.452,-0.870l2.326,0.870l1.745,1.162l2.033,0.290l2.036,0.580l0.871,-1.742l0.291,-0.290l1.454,0.290l2.907,-1.160l1.163,0.579l0.871,-0.290l0.291,-0.580l1.163,-0.291l2.034,0.291l1.744,0.000l0.873,-0.291l1.743,2.323l1.161,0.291l0.873,-0.291l1.166,0.000l1.450,-0.581l0.874,1.162l-2.325,-2.032z",
                            "CF": "M515.918,210.638l2.325,-0.290l0.293,-0.871l0.579,0.291l0.582,0.580l3.488,-1.162l1.163,-1.161l1.454,-0.872l-0.292,-0.870l0.871,-0.291l2.618,0.291l2.617,-1.452l2.034,-2.905l1.452,-1.161l1.744,-0.581l0.292,1.162l1.452,1.742l0.000,1.162l-0.289,1.163l0.000,0.870l0.871,0.870l2.327,1.162l1.452,1.162l0.000,0.871l1.743,1.452l1.163,1.161l0.873,1.743l2.034,0.871l0.292,0.871l-0.873,0.291l-1.744,0.000l-2.034,-0.291l-1.163,0.291l-0.291,0.580l-0.871,0.290l-1.163,-0.579l-2.907,1.160l-1.454,-0.290l-0.291,0.290l-0.871,1.742l-2.036,-0.580l-2.033,-0.290l-1.745,-1.162l-2.326,-0.870l-1.452,0.870l-0.874,1.452l-0.289,2.032l-1.744,-0.290l-2.036,-0.290l-1.452,1.451l-1.455,2.325l-0.289,-0.581l-0.292,-1.453l-1.163,-0.872l-1.161,-1.452l0.000,-0.870l-1.454,-1.452l0.289,-0.870l-0.289,-1.162l0.289,-2.033l0.581,-0.581l-1.455,2.614z",
                            "CG": "M509.523,244.033l-0.874,-0.871l-0.870,0.581l-1.163,1.163l-2.325,-2.906l2.035,-1.742l-0.872,-1.743l0.872,-0.580l1.745,-0.291l0.289,-1.451l1.454,1.451l2.616,0.000l0.581,-1.162l0.582,-1.741l-0.291,-2.324l-1.454,-1.452l1.163,-3.194l-0.581,-0.580l-2.036,0.000l-0.871,-1.162l0.291,-1.451l3.488,0.289l2.034,0.581l2.327,0.871l0.289,-1.741l1.455,-2.325l1.452,-1.451l2.036,0.290l1.744,0.290l-0.291,1.452l-0.874,1.744l-0.579,1.451l-0.292,2.614l0.292,1.451l-0.581,0.871l0.000,1.162l-0.290,0.871l-1.746,1.452l-1.453,1.162l-1.162,2.903l0.289,2.033l-0.870,0.870l-1.456,1.454l-1.744,1.741l-0.871,-0.580l-0.292,-0.582l-1.452,0.000l-0.873,0.873l0.871,0.291z",
                            "CH": "M500.22,100.292l0.000,0.580l-0.289,0.581l1.162,0.581l1.452,0.000l-0.289,1.162l-1.163,0.290l-2.034,-0.290l-0.583,1.161l-1.453,0.000l-0.291,-0.290l-1.744,0.871l-1.160,0.000l-1.165,-0.581l-0.871,-1.161l-1.454,0.580l0.000,-1.451l2.034,-1.453l0.000,-0.580l1.163,0.291l0.873,-0.582l2.324,0.000l0.582,-0.580l-2.906,-0.871z",
                            "CI": "M465.919,217.317l-1.162,0.000l-2.034,-0.580l-1.744,0.000l-3.197,0.580l-2.036,0.581l-2.615,1.162l-0.582,0.000l0.289,-2.323l0.293,-0.291l-0.293,-1.162l-1.162,-1.161l-0.871,-0.290l-0.582,-0.581l0.582,-1.452l-0.291,-1.162l0.000,-0.870l0.581,0.000l0.000,-1.162l-0.290,-0.581l0.290,-0.290l1.162,-0.290l-0.871,-2.323l-0.581,-1.163l0.290,-0.871l0.581,-0.290l0.292,-0.292l0.870,0.582l2.037,0.000l0.582,-0.871l0.581,0.000l0.582,-0.291l0.579,1.162l0.583,-0.290l1.161,-0.292l1.165,0.582l0.579,0.871l1.164,0.581l0.872,-0.581l1.452,-0.291l1.744,0.872l0.874,3.775l-1.164,2.323l-0.872,3.195l1.162,2.323l0.000,-1.161z",
                            "CL": "M284.825,375.578v6.389h2.907h1.745l-0.872,1.162l-2.326,0.87l-1.454-0.291l-1.744-0.289l-1.744-0.582l-2.907-0.58l-3.487-1.451l-2.907-1.453l-3.779-3.193l2.326,0.58l3.778,2.033l3.78,0.87l1.453-1.16l0.872-2.033l2.326-1.162L284.825,375.578zM285.987,289.915l1.163,4.065l2.035-0.582l0.291,0.872l-1.163,2.613l-2.907,1.451v4.646l-0.582,0.87l0.872,1.163l-1.744,1.741l-2.035,2.324l-0.872,2.614l0.291,2.612l-1.744,2.904l1.163,4.646l0.873,0.58v2.613l-1.744,2.613l0.29,2.323l-2.326,1.742l0.292,2.613l0.581,2.615l-1.453,0.87l-0.872,2.613l-0.582,2.904l0.582,3.193l-1.164,0.581l0.582,3.194l1.162,1.162l-0.873,1.162l1.454,0.289l0.29,1.162l-1.452,0.58l0.291,1.451l-0.872,3.775l-1.455,2.323l0.292,1.453l-0.873,1.741l-2.035,1.161l0.291,2.904l0.873,0.873h1.744v2.03l1.163,1.453l6.685,0.58l2.617,0.29h-2.617l-1.163,0.581l-2.616,1.162l-0.291,2.612h-1.162l-3.198-0.87l-3.198-2.032l-3.488-1.453l-0.872-1.74l0.872-1.744l-1.454-1.742l-0.291-4.646l1.163-2.614l2.907-2.323l-4.07-0.581l2.617-2.612l0.872-4.357l2.907,0.873l1.453-5.808l-1.744-0.581l-0.872,3.484l-1.744-0.582l0.872-3.773l0.872-5.228l1.454-1.742l-0.872-2.905l-0.291-2.902l1.163-0.29l1.744-4.356l1.744-4.356l1.162-4.064l-0.581-4.065l0.872-2.323l-0.292-3.485l1.744-3.192l0.292-5.518l0.872-5.519l0.871-6.388v-4.356l-0.582-3.774l1.163-0.872l0.872-1.45l1.454,2.032l0.291,2.031l1.454,1.163l-0.872,2.612L285.987,289.915z",
                            "CM": "M509.814,224.578l-0.291,0.000l-1.744,0.289l-1.744,-0.289l-1.163,0.000l-4.652,0.000l0.582,-2.034l-1.163,-1.742l-1.163,-0.582l-0.581,-1.160l-0.872,-0.581l0.000,-0.581l0.872,-2.032l1.164,-2.614l0.872,0.000l1.743,-1.743l0.871,0.000l1.746,1.161l1.744,-0.870l0.291,-1.162l0.580,-1.161l0.581,-1.452l1.455,-1.161l0.581,-1.742l0.582,-0.582l0.289,-1.452l0.873,-1.742l2.326,-2.323l0.000,-0.872l0.289,-0.580l-1.163,-0.871l0.292,-0.871l0.582,-0.291l1.162,1.742l0.292,1.743l-0.292,2.032l1.453,2.324l-1.453,0.000l-0.581,0.289l-1.455,-0.289l-0.579,1.161l1.742,1.743l1.165,0.581l0.289,1.161l0.872,1.743l-0.290,0.870l-1.455,2.614l-0.581,0.581l-0.289,2.033l0.289,1.162l-0.289,0.870l1.454,1.452l0.000,0.870l1.161,1.452l1.163,0.872l0.292,1.453l0.289,0.581l-0.289,1.741l-2.327,-0.871l-2.034,-0.581l3.488,0.289z",
                            "CN": "M777.533,179.567l-2.325,1.451l-2.326-0.871v-2.323l1.163-1.453l3.196-0.581h1.455l0.581,0.872l-1.163,1.451L777.533,179.567zM825.204,94.194l4.651,0.871l3.488,1.742l0.871,2.614h4.361l2.325-0.872l4.651-0.871l-1.454,2.323l-1.163,1.162l-0.871,2.904l-2.034,2.613l-3.198-0.291l-2.325,0.871l0.581,2.324l-0.29,3.194l-1.454,0.291v1.161l-1.744-1.451l-1.163,1.451l-4.067,1.162l0.289,1.453h-2.325l-1.452-0.872l-1.745,2.032l-3.198,1.453l-2.033,1.742l-3.781,0.871l-2.033,1.162l-3.197,0.871l1.452-1.453l-0.58-1.16l2.325-1.742l-1.455-1.453l-2.324,1.162l-3.197,1.742l-1.745,1.742l-2.615,0.291l-1.452,1.16l1.452,1.743l2.326,0.581v1.162l2.325,0.872l2.906-2.033l2.616,1.162h1.744l0.289,1.452l-3.777,0.871l-1.454,1.452l-2.615,1.453l-1.453,1.742l3.196,1.742l0.872,2.614l1.743,2.613l1.745,2.033v2.033l-1.745,0.581l0.873,1.453l1.455,0.87l-0.292,2.324l-0.873,2.323h-1.452l-2.034,3.194l-2.326,3.484l-2.327,3.195l-3.778,2.613l-4.069,2.323l-2.905,0.291l-1.744,1.162l-0.873-0.871l-1.743,1.452l-3.779,1.451l-2.906,0.291l-0.872,2.904l-1.454,0.29l-0.873-2.033l0.584-1.162l-3.488-0.872l-1.455,0.581l-2.615-0.87l-1.454-0.873l0.581-1.742l-2.615-0.581l-1.452-0.871l-2.328,1.451l-2.615,0.291h-2.034l-1.454,0.58l-1.453,0.582l0.29,2.903h-1.455l-0.289-0.581v-1.161l-2.034,0.87l-1.163-0.581l-2.035-1.162l0.872-2.033l-1.743-0.581l-0.873-2.613l-2.905,0.58l0.29-3.484l2.615-2.323l0.291-2.033l-0.291-2.323l-1.161-0.581l-0.873-1.452h-1.455l-3.194-0.291l1.161-1.161l-1.455-1.743l-2.034,1.162l-2.033-0.581l-3.198,1.742l-2.615,2.033l-2.326,0.29l-1.162-0.872h-1.453l-2.035-0.58l-1.454,0.58l-1.743,2.033l-0.292-2.033l-1.744,0.582L713,154.013l-2.906-0.581l-2.326-1.162l-2.034-0.581l-1.162-1.452l-1.454-0.291l-2.615-1.742l-2.326-0.871l-1.162,0.581l-3.781-2.033l-2.615-1.742l-0.873-2.904l2.036,0.291v-1.453l-1.163-1.161l0.293-2.324l-2.908-3.194l-4.361-1.161l-0.87-2.033l-2.036-1.451l-0.58-0.582l-0.292-1.742v-1.161l-1.743-0.582l-0.874,0.291l-0.579-2.324l0.579-0.871l-0.289-0.581l2.615-1.162l2.036-0.58l2.906,0.291l0.871-1.744l3.489-0.29l1.162-1.162l4.362-1.451l0.289-0.581l-0.289-1.743l2.033-0.581l-2.617-4.646l5.524-1.162l1.452-0.58l2.034-4.938l5.232,0.873l1.744-1.162v-2.904l2.328-0.291l2.033-1.742l1.163-0.29l0.581,2.032l2.326,1.452l4.067,0.872l1.746,2.323l-0.873,3.194l0.873,1.162l3.197,0.582l3.778,0.29l3.488,1.742l1.743,0.291l1.163,2.613l1.455,1.453h3.196l5.522,0.58l3.78-0.291l2.615,0.291l4.069,1.743h3.489l1.162,0.871l3.197-1.451l4.361-0.873l4.359-0.29l3.198-0.871l1.745-1.452l2.033-0.871l-0.581-0.872l-0.873-1.161l1.454-1.742l1.745,0.29l2.614,0.581l2.908-1.452l4.069-1.162l2.034-1.742l2.035-0.872l4.07-0.29l2.034,0.29l0.291-1.162l-2.325-1.741l-2.326-0.872l-2.036,0.872l-2.904-0.291l-1.455,0.291l-0.581-1.162l1.744-2.613l1.453-2.324l3.197,1.162l4.068-1.742v-1.162l2.328-2.903l1.452-0.872v-1.452l-1.452-0.871l2.325-1.162l3.486-0.58h3.491l4.067,0.58l2.617,1.162l1.744,2.903l0.871,1.161l0.874,1.453L825.204,94.194z",
                            "CO": "M266.221,231.256l-1.163,-0.582l-1.163,-0.870l-0.871,0.290l-2.326,-0.290l-0.582,-1.161l-0.580,0.000l-2.907,-1.452l-0.291,-0.872l1.162,-0.290l-0.290,-1.451l0.582,-0.873l1.452,-0.289l1.164,-1.744l1.161,-1.452l-1.161,-0.580l0.580,-1.452l-0.580,-2.613l0.580,-0.580l-0.580,-2.325l-1.164,-1.451l0.582,-1.451l0.872,0.289l0.582,-0.871l-0.872,-1.741l0.290,-0.292l1.454,0.000l2.034,-2.031l1.163,-0.291l0.000,-0.872l0.581,-2.322l1.744,-1.162l1.745,0.000l0.000,-0.582l2.325,0.291l2.035,-1.451l1.163,-0.582l1.454,-1.451l0.872,0.290l0.580,0.581l-0.290,0.871l-2.035,0.581l-0.581,1.452l-1.163,0.580l-0.581,1.162l-0.582,2.033l-0.581,1.452l1.453,0.290l0.291,1.161l0.580,0.582l0.292,1.161l-0.292,1.161l0.000,0.581l0.583,0.000l0.872,1.162l3.488,-0.291l1.453,0.291l2.035,2.323l1.163,-0.290l2.034,0.290l1.454,-0.290l0.872,0.290l-0.291,1.452l-0.872,0.871l0.000,2.033l0.581,2.033l0.582,0.580l0.291,0.580l-1.454,1.453l0.872,0.580l0.873,1.162l0.872,2.614l-0.581,0.290l-0.582,-1.452l-0.873,-0.871l-0.871,0.871l-5.233,0.000l0.000,1.742l1.745,0.290l-0.291,0.871l-0.582,-0.290l-1.453,0.581l0.000,2.033l1.162,0.871l0.582,1.743l-0.291,1.161l-1.163,7.551l-1.452,-1.454l-0.582,-0.290l1.744,-2.613l-2.326,-1.452l-1.452,0.290l-1.164,-0.579l-1.453,0.870l-2.035,-0.291l-1.744,-2.903l-1.163,-0.870l-0.872,-1.163l-1.744,-1.452l0.872,-0.291z",
                            "CR": "M245.292,208.315l-1.453,-0.580l-0.582,-0.582l0.291,-0.580l0.000,-0.581l-0.872,-0.579l-0.872,-0.582l-1.163,-0.291l0.000,-0.872l-0.872,-0.580l0.291,0.871l-0.582,0.581l-0.581,-0.581l-0.872,-0.291l-0.291,-0.580l0.000,-0.871l0.291,-0.871l-0.872,-0.291l0.581,-0.580l0.581,-0.291l1.745,0.581l0.581,-0.290l0.871,0.290l0.583,0.581l0.872,0.000l0.581,-0.581l0.580,1.452l1.164,1.162l1.162,1.161l-0.872,0.291l0.000,1.161l0.583,0.291l-0.583,0.581l0.291,0.289l-0.291,0.582l0.290,-0.580z",
                            "CU": "M247.326,167.081l2.326,0.290l2.326,0.000l2.325,0.871l1.163,1.161l2.616,-0.290l0.873,0.581l2.325,1.743l1.744,1.161l0.871,0.000l1.744,0.581l-0.290,0.871l2.035,0.000l2.325,1.161l-0.581,0.581l-1.744,0.291l-1.745,0.290l-2.035,-0.290l-3.778,0.290l1.743,-1.452l-1.161,-0.871l-1.744,0.000l-0.872,-0.871l-0.582,-1.742l-1.744,0.289l-2.616,-0.870l-0.582,-0.581l-3.779,-0.291l-0.872,-0.581l0.872,-0.580l-2.616,-0.290l-2.034,1.451l-1.163,0.000l-0.292,0.580l-1.452,0.292l-1.163,0.000l1.454,-0.872l0.581,-1.161l1.453,-0.581l1.163,-0.581l2.325,-0.290l-0.581,0.290z",
                            "CY": "M567.37,134.557l0.000,0.291l-2.909,1.161l-1.162,-0.581l-0.874,-1.161l1.456,0.000l0.580,0.290l0.582,-0.290l0.582,0.000l0.290,0.290l0.581,0.000l0.581,0.000l-0.293,0.000z",
                            "CZ": "M520.57,97.388l-1.455,-0.581l-1.163,0.000l-2.326,-0.581l-0.871,0.000l-1.453,1.162l-2.035,-0.871l-1.744,-1.161l-1.163,-0.582l-0.289,-1.161l-0.584,-0.872l2.036,-0.580l0.871,-0.871l2.036,-0.291l0.581,-0.581l0.871,0.290l1.165,-0.290l1.453,0.872l2.036,0.291l-0.293,0.580l1.454,0.580l0.581,-0.580l1.746,0.290l0.290,0.872l2.034,0.290l1.454,1.161l-0.874,0.000l-0.580,0.582l-0.582,0.000l-0.292,0.581l-0.289,0.289l-0.290,0.291l-0.871,0.290l-1.165,0.000l0.289,-0.581z",
                            "DE": "M501.093,79.674l0.000,1.161l2.906,0.582l0.000,0.872l2.617,-0.291l1.744,-0.872l2.907,1.163l1.452,0.870l0.583,1.452l-0.872,0.581l1.163,1.162l0.581,1.452l-0.292,0.870l1.165,1.742l-1.165,0.290l-0.871,-0.290l-0.581,0.581l-2.036,0.291l-0.871,0.871l-2.036,0.580l0.584,0.872l0.289,1.161l1.163,0.582l1.744,1.161l-1.162,1.162l-0.872,0.580l0.290,1.742l-0.290,0.291l-0.584,-0.581l-1.452,0.000l-2.034,0.581l-2.326,-0.291l-0.292,0.871l-1.452,-0.871l-0.873,0.291l-2.906,-0.871l-0.582,0.580l-2.324,0.000l0.290,-2.032l1.455,-1.743l-4.070,-0.580l-1.166,-0.581l0.000,-1.452l-0.579,-0.581l0.290,-1.742l-0.290,-2.904l1.454,0.000l0.871,-1.162l0.581,-2.323l-0.581,-1.161l0.581,-0.581l2.327,0.000l0.582,0.581l1.742,-1.451l-0.581,-0.872l0.000,-1.743l2.035,0.581l-1.744,0.581z",
                            "DJ": "M592.368,196.119l0.581,0.871l0.000,1.161l-1.453,0.582l1.161,0.580l-1.161,1.452l-0.583,-0.290l-0.581,0.000l-1.743,0.000l0.000,-0.871l0.000,-0.581l0.871,-1.452l0.872,-1.162l1.164,0.291l-0.872,0.581z",
                            "DK": "M508.649,77.933l-1.743,2.323l-2.615-1.452l-0.582-1.162l4.07-0.872L508.649,77.933zM503.708,75.609l-0.581,1.162l-0.871-0.291l-2.036,2.033l0.873,1.161l-1.744,0.582l-2.035-0.582l-1.161-1.451v-2.904l0.289-0.581l0.872-0.871h2.325l1.163-0.871l2.035-0.871v1.453l-0.872,0.87l0.291,0.871L503.708,75.609z",
                            "DO": "M276.396,176.664l0.290,-0.291l2.034,0.000l1.744,0.580l0.872,0.000l0.291,0.872l1.454,0.000l0.000,0.871l1.162,0.000l1.454,1.162l-0.872,1.161l-1.453,-0.871l-1.164,0.290l-0.872,-0.290l-0.581,0.581l-1.163,0.290l-0.290,-0.871l-0.873,0.581l-1.161,1.743l-0.872,-0.291l0.000,-0.871l0.000,-0.872l-0.582,-0.580l0.582,-0.582l0.290,-1.161l0.290,1.451z",
                            "DZ": "M506.906,166.5l-9.592,5.226l-7.849,5.227l-4.070,1.453l-2.906,0.000l0.000,-1.742l-1.452,-0.291l-1.454,-0.872l-0.873,-1.161l-9.301,-6.098l-9.301,-6.098l-10.176,-6.679l0.000,-0.291l0.000,-0.290l0.000,-3.194l4.361,-2.032l2.906,-0.581l2.036,-0.581l1.162,-1.452l3.197,-1.162l0.000,-2.032l1.744,-0.291l1.162,-0.870l3.782,-0.582l0.289,-0.871l-0.582,-0.580l-0.871,-2.905l-0.291,-1.742l-1.163,-1.742l2.907,-1.452l2.907,-0.581l1.744,-1.161l2.617,-0.872l4.650,-0.289l4.651,-0.291l1.162,0.291l2.615,-1.162l2.911,0.000l1.160,0.871l2.035,-0.290l-0.581,1.451l0.290,2.614l-0.579,2.323l-1.745,1.451l0.290,2.034l2.325,1.742l0.000,0.581l1.745,1.162l1.163,4.936l0.871,2.322l0.000,1.453l-0.291,2.033l0.000,1.451l-0.291,1.452l0.291,1.743l-1.162,1.161l1.744,2.033l0.000,1.162l1.163,1.451l1.163,-0.580l2.035,1.451l-1.452,-1.743z",
                            "EC": "M252.85,240.258l1.453,-2.033l-0.581,-1.162l-1.163,1.162l-1.744,-1.162l0.581,-0.581l-0.291,-2.613l0.873,-0.580l0.581,-1.454l0.872,-2.031l0.000,-0.872l1.454,-0.581l1.744,-1.160l2.907,1.452l0.580,0.000l0.582,1.161l2.326,0.290l0.871,-0.290l1.163,0.870l1.163,0.582l0.581,2.324l-0.872,1.741l-3.198,2.904l-3.196,0.871l-1.744,2.613l-0.582,1.742l-1.454,1.162l-1.162,-1.451l-1.163,-0.290l-1.163,0.290l0.000,-1.162l0.873,-0.582l0.291,1.160z",
                            "EE": "M540.626,72.125l0.291,-1.743l-0.872,0.290l-1.744,-0.870l-0.291,-1.743l3.489,-0.581l3.488,-0.582l2.906,0.582l2.906,0.000l0.291,0.291l-1.745,1.742l0.582,2.614l-1.163,0.871l-2.034,0.000l-2.614,-1.162l-1.165,-0.290l2.325,-0.581z",
                            "EG": "M569.987,149.947l-0.874,0.872l-0.581,2.323l-0.873,1.162l-0.582,0.580l-0.870,-0.871l-1.164,-1.161l-2.034,-4.066l-0.291,0.291l1.163,2.903l1.744,2.904l2.034,4.065l0.873,1.743l0.871,1.452l2.618,2.904l-0.584,0.580l0.000,1.743l3.198,2.613l0.581,0.580l-10.755,0.000l-10.755,0.000l-11.045,0.000l0.000,-10.162l0.000,-9.873l-0.871,-2.324l0.579,-1.451l-0.289,-1.162l0.871,-1.452l3.779,0.000l2.615,0.581l2.615,0.871l1.456,0.580l2.033,-0.870l1.165,-0.872l2.323,-0.290l2.036,0.290l0.872,1.452l0.580,-0.870l2.036,0.580l2.327,0.290l1.161,-0.870l-2.038,-4.935z",
                            "EH": "M449.643,156.336l-0.292,-1.452l0.581,0.000l0.000,0.290l0.000,0.291l0.000,4.355l-9.011,-0.290l0.000,7.261l-2.615,0.000l-0.581,1.451l0.581,4.066l-11.046,0.000l-0.582,0.871l0.289,-1.162l6.107,-0.291l0.290,-0.870l1.162,-1.162l0.874,-3.775l4.069,-3.194l1.162,-3.485l0.872,0.000l0.873,-2.323l2.324,-0.291l1.165,0.581l1.161,0.000l0.872,-0.871l-1.745,0.000z",
                            "ER": "M590.332,196.409l-0.872,-0.871l-1.162,-1.452l-1.163,-1.162l-0.871,-0.870l-2.326,-1.162l-1.744,0.000l-0.873,-0.580l-1.453,0.870l-1.743,-1.452l-0.873,2.033l-3.198,-0.581l-0.290,-0.870l1.161,-4.065l0.291,-2.033l0.874,-0.873l2.035,-0.289l1.454,-1.742l1.452,3.193l0.871,2.614l1.454,1.452l3.779,2.613l1.454,1.453l1.453,1.742l0.871,0.871l1.455,0.871l-0.872,0.581l1.164,0.291z",
                            "ES": "M448.769,115.683l0.292,-1.743l-1.163,-1.452l3.778,-1.742l3.489,0.290l3.778,0.000l2.908,0.581l2.324,-0.290l4.362,0.290l1.163,0.871l4.940,1.452l1.163,-0.580l2.907,1.161l3.197,-0.292l0.292,1.454l-2.616,2.032l-3.489,0.580l-0.291,0.872l-1.744,1.451l-1.162,2.324l1.162,1.451l-1.453,1.162l-0.581,1.742l-2.325,0.581l-1.744,2.323l-3.489,0.000l-2.616,0.000l-1.743,0.872l-1.165,1.161l-1.452,-0.291l-0.871,-0.870l-0.874,-1.742l-2.615,-0.291l0.000,-1.162l0.871,-0.871l0.291,-0.871l-0.873,-0.581l0.873,-2.032l-1.162,-1.452l1.162,-0.291l0.000,-1.451l0.582,-0.291l0.000,-2.033l1.163,-0.870l-0.581,-1.452l-1.746,0.000l-0.291,0.290l-1.744,0.000l-0.581,-1.162l-1.163,0.291l1.163,-0.581z",
                            "ET": "M578.125,189.73l1.743,1.452l1.453,-0.870l0.873,0.580l1.744,0.000l2.326,1.162l0.871,0.870l1.163,1.162l1.162,1.452l0.872,0.871l-0.872,1.162l-0.871,1.452l0.000,0.581l0.000,0.871l1.743,0.000l0.581,0.000l0.583,0.290l-0.583,1.161l1.163,1.453l0.873,1.452l1.163,0.871l9.010,3.194l2.328,0.000l-7.850,8.421l-3.780,0.000l-2.324,2.033l-1.744,0.000l-0.874,0.870l-1.743,0.000l-1.161,-0.870l-2.618,1.162l-0.581,1.160l-2.036,-0.290l-0.580,-0.290l-0.580,0.000l-0.874,0.000l-3.489,-2.323l-2.033,0.000l-0.873,-0.871l0.000,-1.742l-1.452,-0.290l-1.455,-3.196l-1.454,-0.580l-0.290,-1.161l-1.452,-1.161l-1.746,-0.291l0.872,-1.452l1.455,0.000l0.582,-0.872l0.000,-2.613l0.579,-2.903l1.454,-0.582l0.292,-1.162l1.163,-2.322l1.743,-1.162l0.872,-2.904l0.581,-2.323l3.198,0.581l-0.873,2.033z",
                            "FI": "M552.544,41.053l-0.584,2.033l4.363,1.743l-2.617,2.032l3.198,3.194l-1.744,2.324l2.325,2.033l-1.162,1.742l4.069,2.032l-0.871,1.161l-2.617,1.742l-5.814,3.485l-4.941,0.291l-4.941,0.871l-4.362,0.580l-1.744,-1.451l-2.615,-0.871l0.581,-2.614l-1.452,-2.613l1.452,-1.453l2.616,-1.742l6.106,-3.193l2.033,-0.582l-0.289,-1.160l-4.072,-1.162l-0.872,-1.162l0.000,-4.065l-4.361,-2.033l-3.486,-1.452l1.453,-0.581l3.198,1.452l3.488,0.000l2.908,0.581l2.615,-1.162l1.452,-2.032l4.362,-1.162l3.487,1.162l1.162,-2.032z",
                            "FJ": "M964.732,278.588l0.873,0.871l-0.292,1.452l-1.744,0.291l-1.452-0.291l-0.292-1.162l0.873-0.87l1.455,0.291L964.732,278.588zM969.382,276.557l-1.741,0.579l-2.036,0.582l-0.292-1.161l1.455-0.291l0.873-0.291l1.741-0.871h-0.01h0.58l-0.29,1.162l-0.29,0.291H969.382z",
                            "FK": "M305.173,373.544l3.488,-1.741l2.326,0.870l1.744,-1.161l2.034,1.161l-0.872,0.871l-3.778,0.872l-1.164,-0.872l-2.325,1.162l1.453,1.162z",
                            "FR": "M329.008,223.997l-0.873,1.162h-1.453l-0.29-0.581l-0.582-0.292l-0.872,0.873l-1.162-0.581l0.581-1.162l0.291-1.162l0.582-1.161l-1.164-1.742l-0.289-1.743l1.453-2.612l0.872,0.289l2.034,0.872l2.907,2.323l0.582,1.161l-1.744,2.323L329.008,223.997zM500.22,115.102l-1.161,2.033l-1.164-0.582l-0.581-1.742l0.581-1.162l1.744-0.871L500.22,115.102zM483.652,92.451l2.036,1.162h1.162l2.615,1.162l0.581,0.291h0.871l1.165,0.581l4.07,0.58l-1.455,1.744l-0.29,2.032l-0.873,0.581l-1.163-0.291v0.581l-2.033,1.453v1.452l1.453-0.581l0.871,1.162l-0.291,0.871l0.872,1.162l-0.872,0.871l0.582,2.033l1.454,0.291l-0.291,1.162l-2.325,1.452l-5.523-0.581l-4.069,0.872l-0.292,1.741l-3.196,0.292l-2.907-1.162l-1.163,0.58l-4.94-1.452l-1.163-0.872l1.452-1.742l0.582-5.517l-2.907-2.905l-2.034-1.451l-4.36-0.872v-2.033l3.488-0.581l4.651,0.581l-0.872-2.903l2.615,1.162l6.396-2.324l0.87-2.324l2.325-0.29l0.293,0.872h1.452L483.652,92.451z",
                            "GA": "M504.291,242l-2.908,-2.904l-1.744,-2.322l-1.744,-2.905l0.291,-0.871l0.582,-0.871l0.581,-2.033l0.582,-2.033l0.871,0.000l4.070,0.000l0.000,-3.483l1.163,0.000l1.744,0.289l1.744,-0.289l0.291,0.000l-0.291,1.451l0.871,1.162l2.036,0.000l0.581,0.580l-1.163,3.194l1.454,1.452l0.291,2.324l-0.582,1.741l-0.581,1.162l-2.616,0.000l-1.454,-1.451l-0.289,1.451l-1.745,0.291l-0.872,0.580l0.872,1.743l2.035,-1.742z",
                            "GB": "M458.072,80.835l-1.452,2.033l-2.036-0.58h-1.745l0.582-1.453l-0.582-1.451l2.326-0.291L458.072,80.835zM465.629,69.802l-3.198,2.903l2.907-0.289h2.907l-0.582,2.032l-2.615,2.613h2.907l0.29,0.291l2.325,3.484l2.035,0.291l1.745,3.195l0.581,1.161l3.486,0.291l-0.29,2.033l-1.452,0.58l1.163,1.452l-2.617,1.453h-3.488l-4.94,0.871l-1.164-0.581l-1.744,1.161l-2.616-0.291l-2.034,1.162l-1.453-0.581l4.069-2.904l2.616-0.581l-4.359-0.581l-0.873-0.872l2.906-0.871l-1.454-1.451l0.582-2.033l4.069,0.291l0.291-1.452l-1.744-1.743l-3.488-0.58l-0.582-0.871l0.872-1.162l-0.872-0.581l-1.452,1.162V76.19l-1.454-1.453l0.873-2.904l2.326-2.032h2.033H465.629z",
                            "GE": "M588.298,116.844l0.291,-1.161l-0.582,-2.034l-1.743,-0.871l-1.455,-0.580l-1.162,-0.581l0.581,-0.581l2.325,0.581l3.779,0.581l3.780,1.162l0.581,0.580l1.745,-0.580l2.614,0.580l0.581,1.162l1.745,0.871l-0.582,0.290l1.455,1.452l-0.582,0.290l-1.454,-0.290l-2.034,-0.580l-0.581,0.290l-3.780,0.580l-2.615,-1.452l2.907,-0.291z",
                            "GH": "M476.676,214.704l-4.361,1.452l-1.452,1.161l-2.617,0.581l-2.327,-0.581l0.000,-1.161l-1.162,-2.323l0.872,-3.195l1.164,-2.323l-0.874,-3.775l-0.290,-2.323l0.000,-1.452l4.942,0.000l1.163,0.000l0.872,-0.290l1.163,0.290l0.000,0.872l0.871,1.161l0.000,2.033l0.292,2.322l0.871,0.872l-0.581,2.613l0.000,1.162l0.872,1.742l-0.582,-1.162z",
                            "GL": "M344.996,3.593l9.302,-1.451l9.593,0.000l3.488,-0.871l9.883,-0.291l21.800,0.291l17.442,2.322l-5.232,0.872l-10.465,0.290l-14.824,0.291l1.453,0.289l9.593,-0.289l8.429,0.871l5.232,-0.582l2.326,0.872l-2.907,1.452l6.977,-0.871l13.370,-1.162l8.139,0.581l1.455,1.162l-11.047,2.032l-1.743,0.580l-8.721,0.581l6.395,0.000l-3.196,2.033l-2.326,1.742l0.290,3.195l3.198,1.742l-4.361,0.000l-4.361,0.872l4.943,1.451l0.581,2.323l-2.908,0.291l3.781,2.323l-6.106,0.291l2.906,1.160l-0.871,0.872l-3.780,0.581l-3.777,0.000l3.488,1.742l0.000,1.161l-5.522,-1.161l-1.455,0.871l3.778,0.582l3.488,1.741l1.163,2.324l-4.940,0.580l-2.034,-1.162l-3.489,-1.742l0.871,2.033l-3.197,1.452l7.267,0.000l3.780,0.290l-7.269,2.324l-7.557,2.322l-7.848,0.872l-3.198,0.000l-2.907,0.871l-3.779,2.903l-5.814,2.034l-2.034,0.290l-3.489,0.581l-4.069,0.580l-2.326,1.742l0.000,2.034l-1.453,1.742l-4.360,2.033l0.872,2.323l-1.162,2.323l-1.454,2.613l-3.779,0.000l-4.069,-2.033l-5.524,0.000l-2.615,-1.742l-2.036,-2.614l-4.650,-3.484l-1.454,-1.742l-0.291,-2.324l-3.778,-2.613l0.872,-2.033l-1.744,-0.871l2.617,-3.194l4.359,-1.162l0.872,-1.161l0.582,-2.034l-3.198,0.873l-1.454,0.289l-2.325,0.582l-3.488,-0.871l0.000,-2.034l0.871,-1.452l2.617,0.000l5.523,0.872l-4.651,-1.742l-2.325,-1.162l-2.907,0.581l-2.326,-0.872l3.198,-2.322l-1.744,-1.162l-2.035,-2.033l-3.489,-2.904l-3.488,-0.871l0.000,-1.162l-7.266,-1.742l-5.814,0.000l-7.558,0.000l-6.685,0.290l-3.199,-0.870l-4.649,-1.743l7.266,-0.871l5.523,-0.291l-11.917,-0.580l-6.105,-1.162l0.291,-1.161l10.464,-1.162l10.173,-1.452l0.872,-0.871l-7.266,-1.162l2.326,-1.161l9.592,-1.742l4.070,-0.290l-1.163,-1.162l6.395,-0.872l8.429,-0.289l8.430,0.000l3.199,0.580l7.266,-1.453l6.395,1.162l4.070,0.291l5.523,0.871l-6.395,-1.451l-0.290,1.453z",
                            "GM": "M427.549,194.667l0.291,-1.162l2.909,0.000l0.581,-0.581l0.871,0.000l1.163,0.581l0.873,0.000l0.870,-0.581l0.582,0.872l-1.163,0.581l-1.162,0.000l-1.163,-0.581l-1.163,0.581l-0.582,0.000l-0.580,0.581l2.327,0.291z",
                            "GN": "M450.514,209.768l-0.871,0.000l-0.582,1.161l-0.581,0.000l-0.582,-0.581l0.290,-1.162l-1.162,-1.741l-0.872,0.290l-0.581,0.000l-0.581,0.290l0.000,-1.161l-0.582,-0.581l0.000,-0.870l-0.581,-1.163l-0.582,-0.871l-2.326,0.000l-0.581,0.580l-0.871,0.000l-0.292,0.581l-0.289,0.582l-1.455,1.451l-1.453,-1.742l-0.873,-1.163l-0.870,-0.289l-0.582,-0.581l-0.291,-1.161l-0.582,-0.582l-0.581,-0.580l1.163,-1.162l0.873,0.000l0.581,-0.580l0.582,0.000l0.580,-0.291l-0.291,-0.871l0.291,-0.291l0.000,-0.871l1.453,0.000l2.036,0.581l0.581,0.000l0.000,-0.290l1.744,0.290l0.289,-0.290l0.293,1.162l0.290,0.000l0.581,-0.582l0.582,0.291l0.871,0.580l1.165,0.291l0.579,-0.580l0.873,-0.582l0.871,-0.290l0.581,0.000l0.582,0.581l0.292,0.871l1.162,1.162l-0.582,0.580l-0.291,1.162l0.582,-0.291l0.581,0.291l-0.290,0.871l0.871,0.581l-0.581,0.290l-0.290,0.871l0.581,1.163l0.871,2.323l-1.162,0.290l-0.290,0.290l0.290,0.581l0.000,1.162l0.581,0.000z",
                            "GQ": "M499.931,228.061l-0.582,-0.290l0.871,-3.193l4.652,0.000l0.000,3.483l-4.070,0.000l0.871,0.000z",
                            "GR": "M538.882,132.815l1.744,0.871l2.034-0.29l2.033,0.29v0.582l1.455-0.291l-0.292,0.581l-4.067,0.291v-0.291l-3.199-0.581L538.882,132.815zM547.02,116.553l-0.871,1.742l-0.581,0.291h-1.745l-1.454-0.291l-3.196,0.872l1.744,1.451l-1.454,0.291h-1.452l-1.454-1.16l-0.582,0.58l0.582,1.452l1.454,1.453l-0.872,0.58l1.452,1.162l1.455,0.871v1.452l-2.617-0.581l0.873,1.452l-1.745,0.291l0.872,2.323h-1.744l-2.326-1.161l-0.871-2.324l-0.581-1.742l-1.163-1.162l-1.452-1.742v-0.58l1.16-1.453l0.292-0.87l0.873-0.291v-0.871l1.742-0.291l1.164-0.58h1.452l0.582-0.291l0.29-0.29l2.036,0.29l2.325-0.872l2.034,0.872h2.326v-1.452L547.02,116.553z",
                            "GT": "M225.816,193.215l-1.453,-0.580l-1.744,0.000l-1.163,-0.581l-1.454,-1.162l0.000,-0.871l0.291,-0.581l-0.291,-0.580l1.164,-2.033l3.487,0.000l0.292,-0.871l-0.582,-0.291l-0.291,-0.581l-1.162,-0.581l-0.872,-0.870l1.163,0.000l0.000,-1.743l2.615,0.000l2.617,0.000l0.000,2.324l-0.292,2.903l0.872,0.000l0.872,0.581l0.292,-0.291l0.872,0.291l-1.455,1.162l-1.161,0.580l-0.292,0.581l0.292,0.581l-0.583,0.580l-0.581,0.291l0.000,0.290l-0.580,0.291l-0.873,0.581l0.000,-0.580z",
                            "GW": "M432.201,200.475l-1.452,-1.162l-1.164,0.000l-0.582,-0.871l0.000,-0.291l-0.871,-0.580l-0.292,-0.581l1.453,-0.581l0.874,0.000l0.871,-0.290l4.942,0.290l0.000,0.871l-0.291,0.291l0.291,0.871l-0.580,0.291l-0.582,0.000l-0.581,0.580l-0.873,0.000l1.163,-1.162z",
                            "GY": "M309.243,208.025l1.744,0.871l1.744,1.742l0.000,1.452l1.162,0.000l1.453,1.452l1.163,0.873l-0.582,2.613l-1.453,0.579l0.000,0.872l-0.581,1.161l1.453,2.032l0.872,0.000l0.291,1.744l1.744,2.322l-0.872,0.000l-1.454,-0.290l-0.871,0.871l-1.163,0.581l-0.872,0.000l-0.290,0.581l-1.454,-0.290l-1.743,-1.162l-0.291,-1.162l-0.582,-1.451l0.582,-2.324l0.580,-1.162l-0.580,-1.161l-0.872,-0.290l0.290,-1.451l-0.582,-0.582l-1.453,0.291l-2.035,-2.322l0.873,-0.582l0.000,-1.163l1.743,-0.580l0.582,-0.581l-0.872,-0.871l0.290,-1.161l-2.036,1.452z",
                            "HN": "M233.374,195.248l-0.291,-0.871l-0.872,-0.291l0.000,-1.162l-0.291,-0.289l-0.582,0.000l-1.161,0.289l0.000,-0.289l-0.872,-0.581l-0.582,-0.581l-0.873,-0.291l0.583,-0.580l-0.292,-0.581l0.292,-0.581l1.161,-0.580l1.455,-1.162l0.289,0.000l0.582,-0.291l0.581,0.000l0.291,0.000l0.582,0.000l1.163,0.291l1.162,-0.291l0.873,-0.290l0.581,-0.290l0.872,0.290l0.581,0.000l0.582,0.000l0.581,-0.290l1.454,0.580l0.289,0.000l0.872,0.582l0.873,0.580l0.871,0.291l0.873,0.870l-1.162,0.000l-0.291,0.291l-0.872,0.291l-0.872,0.000l-0.581,0.290l-0.582,0.000l-0.290,-0.290l-0.291,0.000l-0.291,0.580l-0.291,0.000l0.000,0.581l-1.163,0.871l-0.581,0.291l-0.291,0.289l-0.581,-0.580l-0.581,0.871l-0.582,-0.291l-0.871,0.291l0.290,1.162l-0.581,0.000l-0.291,0.871l0.872,0.000z",
                            "HR": "M525.51,104.647l0.871,1.163l0.873,0.870l-1.163,0.872l-1.163,-0.581l-2.033,0.000l-2.325,-0.291l-1.163,0.000l-0.582,0.581l-1.162,-0.581l-0.581,0.872l1.454,1.451l0.579,0.872l1.163,0.871l1.162,0.581l0.874,1.161l2.614,1.161l-0.289,0.580l-2.615,-1.160l-1.746,-0.871l-2.326,-0.871l-2.326,-2.033l0.582,-0.291l-1.453,-1.162l0.000,-0.870l-1.744,-0.291l-0.871,1.161l-0.873,-1.161l0.292,-0.870l1.743,0.000l0.580,-0.291l0.873,0.291l1.163,0.000l0.000,-0.582l0.871,-0.290l0.293,-1.162l2.325,-0.580l0.871,0.290l2.036,1.161l2.325,0.581l-0.871,0.581z",
                            "HT": "M272.326,176.083l1.744,0.290l2.326,0.291l0.290,1.451l-0.290,1.161l-0.582,0.582l0.582,0.580l0.000,0.872l-1.745,-0.581l-1.453,0.290l-1.744,-0.290l-1.163,0.581l-1.454,-0.872l0.291,-0.871l2.326,0.291l2.325,0.290l0.872,-0.581l-1.163,-1.161l0.000,-1.161l-1.744,-0.292l-0.582,0.870z",
                            "HU": "M518.243,102.034l1.164,-1.742l-0.582,-0.581l1.453,0.000l0.292,-1.162l1.454,0.872l0.871,0.290l2.324,-0.581l0.291,-0.291l1.163,-0.290l1.163,-0.290l0.289,0.000l1.455,-0.290l0.582,-0.581l0.870,-0.291l2.908,0.872l0.582,-0.290l1.452,0.870l0.291,0.581l-1.743,0.581l-1.164,2.034l-1.742,1.741l-2.325,0.581l-1.455,0.000l-2.326,0.580l-0.871,0.581l-2.325,-0.581l-2.036,-1.161l-0.871,-0.290l-0.582,-1.162l0.582,0.000z",
                            "ID": "M806.019,259.132h-1.163l-3.488-2.033l2.326-0.289l1.454,0.58l1.162,0.871L806.019,259.132zM816.193,258.842l-2.323,0.581l-0.292-0.291l0.292-0.871l1.16-1.742l2.617-1.16l0.29,0.58l0.29,0.871L816.193,258.842zM798.17,253.326l1.163,0.58l1.745-0.29l0.581,1.161l-3.198,0.582l-1.745,0.58l-1.743-0.291l1.162-1.451h1.455L798.17,253.326zM812.123,253.326l-0.579,1.451l-4.072,0.871l-3.486-0.58v-0.871l2.034-0.581l1.745,0.871l1.743-0.29L812.123,253.326zM772.881,249.55l5.232,0.29l0.582-1.161l4.94,1.452l1.163,1.742l4.07,0.58l3.487,1.452l-3.196,1.162l-3.199-1.162h-2.325h-2.907l-2.615-0.58l-3.199-1.162l-2.033-0.29l-1.163,0.29l-4.942-0.871l-0.58-1.452h-2.325l1.745-2.613h3.488l2.033,1.163l1.162,0.289L772.881,249.55zM844.679,248.098l-1.452,1.742l-0.292-2.032l0.583-0.871l0.58-1.162l0.581,0.871V248.098zM824.043,240.548l-1.163,0.87l-1.745-0.58l-0.581-1.162h2.907L824.043,240.548zM833.053,239.386l0.871,2.032l-2.325-0.87l-2.324-0.29h-1.454h-2.034l0.582-1.452l3.486-0.291L833.053,239.386zM842.935,234.16l0.874,4.355l2.906,1.743l2.325-2.905l3.199-1.741h2.323l2.326,0.87l2.033,1.162l2.909,0.581v8.712l0.29,9.002l-2.615-2.323l-2.91-0.29l-0.578,0.58l-3.489,0.291l1.161-2.323l1.744-0.871l-0.579-2.904l-1.454-2.323l-5.233-2.324l-2.323-0.289l-4.069-2.613L840.901,242l-1.162,0.292l-0.581-1.163v-1.161l-2.034-1.161l2.906-1.162h2.034l-0.289-0.581h-4.072l-1.161-1.742l-2.327-0.58l-1.161-1.161l3.778-0.872l1.455-0.872l4.359,1.162L842.935,234.16zM818.518,226.9l-2.325,2.904l-2.034,0.58l-2.615-0.58h-4.651l-2.325,0.58l-0.292,2.033l2.326,2.323l1.454-1.161l5.23-0.872l-0.29,1.161l-1.162-0.289l-1.163,1.451l-2.326,1.162l2.615,3.483l-0.581,0.872l2.326,3.194v1.742l-1.452,0.872l-0.874-0.872l1.165-2.323l-2.617,1.162l-0.871-0.873l0.579-0.869l-2.033-1.743l0.291-2.613l-2.036,0.871l0.292,3.195v3.773l-1.744,0.581l-1.165-0.871l0.874-2.613l-0.291-2.613h-1.162l-0.871-2.033l1.161-1.741l0.289-2.033l1.455-4.356l0.581-0.871l2.326-2.032l2.033,0.58l3.488,0.582l3.199-0.292l2.615-2.032L818.518,226.9zM828.111,227.771l-0.29,2.323h-1.452l-0.292,1.452l1.162,1.451l-0.87,0.291l-1.165-1.742l-0.871-3.485l0.581-2.032l0.873-1.162l0.29,1.452l1.744,0.291L828.111,227.771zM798.17,226.029l3.197,2.322l-3.197,0.292l-1.162,2.031l0.292,2.614l-2.618,1.742v2.613L793.52,242l-0.581-0.871l-2.908,1.163l-1.161-1.743l-2.034-0.29l-1.163-0.872l-3.488,1.162l-0.871-1.452l-1.744,0.29l-2.328-0.29l-0.581-3.775l-1.163-0.871l-1.452-2.322l-0.292-2.323l0.292-2.613l1.452-1.743l0.584,1.743l2.033,1.741l1.744-0.581h1.744l1.453-1.16l1.454-0.291l2.615,0.581l2.036-0.581l1.452-3.774l1.163-0.872l0.871-3.193h3.198l2.325,0.58l-1.454,2.323l2.036,2.614L798.17,226.029zM765.034,246.937l-2.907,0.29l-2.325-2.321l-3.779-2.324l-1.162-1.743l-2.033-2.323l-1.165-2.033l-2.325-3.774l-2.326-2.323l-0.871-2.323l-0.873-2.032l-2.615-1.743l-1.454-2.322l-2.034-1.743l-2.908-2.903l-0.289-1.451h1.745l4.358,0.58l2.618,2.614l2.033,2.032l1.453,1.161l2.615,2.905h2.908l2.325,2.032l1.454,2.322l2.033,1.161l-0.871,2.323l1.454,0.871h0.872l0.581,2.033l0.873,1.451l2.034,0.291l1.452,1.742l-0.871,3.485V246.937z",
                            "IE": "M456.62,82.869l0.579,2.032l-2.034,2.323l-4.942,1.743l-3.779,-0.581l2.036,-2.904l-1.454,-2.613l3.779,-2.323l2.033,-1.162l0.582,1.451l-0.582,1.454l1.745,0.000l-2.037,-0.580z",
                            "IL": "M572.021,140.946l-0.293,0.870l-1.163,-0.289l-0.578,1.743l0.871,0.289l-0.871,0.581l0.000,0.581l1.160,-0.291l0.000,0.872l-1.160,4.645l-2.038,-4.935l0.873,-0.872l0.581,-1.451l0.584,-2.033l0.289,-0.582l0.289,0.000l0.872,0.000l0.291,-0.580l0.582,0.000l0.000,1.162l-0.289,0.290l0.000,0.000z",
                            "IN": "M688.002,133.396l2.909,3.194l-0.293,2.324l1.163,1.160l0.000,1.453l-2.036,-0.291l0.873,2.904l2.615,1.742l3.781,2.034l-1.745,1.161l-1.163,2.613l2.908,1.162l2.614,1.161l3.490,1.742l3.779,0.291l1.453,1.452l2.325,0.290l3.197,0.581l2.326,0.000l0.291,-1.162l-0.291,-1.742l0.000,-1.161l1.744,-0.582l0.292,2.033l0.000,0.581l2.615,1.162l1.744,-0.581l2.326,0.290l2.326,0.000l0.000,-1.742l-1.163,-0.871l2.326,-0.290l2.615,-2.033l3.198,-1.742l2.033,0.580l2.035,-1.162l1.455,1.743l-1.161,1.162l3.194,0.290l0.000,1.162l-0.871,0.580l0.291,1.452l-2.034,-0.290l-3.489,1.742l0.000,1.742l-1.453,2.323l-0.292,1.162l-1.163,2.322l-2.033,-0.580l-0.290,2.904l-0.583,0.872l0.291,1.161l-1.162,0.581l-1.454,-4.356l-0.872,0.000l-0.581,1.742l-1.454,-1.452l0.872,-1.452l1.163,-0.289l1.454,-2.324l-1.743,-0.291l-2.327,0.000l-2.616,-0.291l-0.291,-2.032l-1.454,0.000l-2.034,-1.451l-1.163,2.032l2.034,1.451l-1.743,0.873l-0.582,1.160l1.744,0.582l-0.579,1.742l1.160,2.032l0.290,2.324l-0.290,1.162l-2.034,-0.291l-3.197,0.580l0.000,2.033l-1.455,1.742l-4.069,1.744l-2.904,3.484l-2.038,1.743l-2.906,1.742l0.000,1.161l-1.163,0.581l-2.615,1.161l-1.162,0.000l-0.874,2.323l0.582,3.484l0.000,2.324l-1.163,2.614l0.000,4.644l-1.454,0.000l-1.160,2.325l0.870,0.871l-2.615,0.581l-0.874,2.032l-1.163,0.581l-2.615,-2.323l-1.163,-4.067l-1.162,-2.613l-0.874,-1.451l-1.452,-2.613l-0.581,-3.485l-0.581,-1.742l-2.618,-3.775l-1.161,-5.227l-0.584,-3.485l0.000,-3.194l-0.581,-2.613l-4.068,1.451l-2.035,-0.290l-3.488,-3.194l1.454,-1.162l-0.873,-0.871l-3.198,-2.323l1.745,-2.033l6.106,0.000l-0.583,-2.324l-1.455,-1.451l-0.579,-2.032l-1.745,-1.162l3.197,-2.904l3.199,0.291l2.904,-2.904l1.745,-2.904l2.618,-2.614l0.000,-2.032l2.325,-1.743l-2.325,-1.161l-0.874,-2.032l-1.160,-2.324l1.453,-1.162l4.069,0.581l3.196,-0.290l-2.617,2.323z",
                            "IQ": "M598.763,131.943l1.744,0.872l0.289,1.742l-1.452,0.871l-0.581,2.033l2.033,2.613l3.200,1.453l1.454,2.323l-0.292,1.742l0.872,0.000l0.000,1.742l1.454,1.452l-1.744,-0.290l-1.744,-0.291l-2.037,2.614l-5.230,0.000l-7.561,-5.517l-4.067,-2.032l-3.488,-0.873l-1.163,-3.193l6.103,-2.904l1.163,-3.195l-0.292,-2.032l1.454,-0.872l1.454,-1.742l1.164,-0.291l3.197,0.291l0.873,0.872l1.452,-0.581l-1.745,-3.193z",
                            "IR": "M622.309,128.75l2.323,-0.582l2.036,-1.742l1.745,0.291l1.162,-0.581l2.034,0.290l2.907,1.452l2.325,0.290l3.200,2.324l2.034,0.000l0.289,2.323l-1.161,3.485l-0.873,2.032l1.163,0.291l-1.163,1.742l0.873,2.032l0.290,1.743l2.036,0.581l0.289,1.742l-2.615,2.323l1.453,1.452l1.162,1.742l2.617,1.162l0.000,2.613l1.453,0.291l0.290,1.452l-4.070,1.162l-1.161,3.193l-4.943,-0.580l-3.197,-0.871l-2.906,-0.291l-1.454,-3.194l-1.163,-0.581l-2.034,0.581l-2.908,1.162l-3.196,-0.872l-2.907,-2.033l-2.617,-0.870l-1.745,-2.614l-2.034,-3.774l-1.744,0.580l-1.744,-0.871l-0.871,1.161l-1.454,-1.452l0.000,-1.742l-0.872,0.000l0.292,-1.742l-1.454,-2.323l-3.200,-1.453l-2.033,-2.613l0.581,-2.033l1.452,-0.871l-0.289,-1.742l-1.744,-0.872l-1.745,-3.193l-1.452,-2.324l0.579,-0.871l-0.870,-2.904l1.743,-0.871l0.582,0.871l1.163,1.453l2.033,0.289l0.873,0.000l3.489,-2.032l0.872,-0.290l0.871,0.871l-0.871,1.451l1.743,1.453l0.582,-0.291l0.873,2.033l2.615,0.580l1.744,1.453l4.069,0.291l4.360,-0.581l-0.293,0.581z",
                            "IS": "M433.944,48.313l-0.870,1.742l3.196,1.742l-3.488,2.033l-8.138,2.033l-2.326,0.581l-3.488,-0.581l-7.849,-0.871l2.906,-1.162l-6.103,-1.451l4.940,-0.291l0.000,-0.871l-5.811,-0.580l1.744,-2.033l4.067,-0.291l4.362,1.742l4.360,-1.451l3.198,0.871l4.649,-1.452l-4.651,-0.290z",
                            "IT": "M516.5,125.846l-0.873,2.033l0.292,0.872l-0.582,1.451l-2.034-0.871l-1.454-0.291l-3.777-1.451l0.289-1.452l3.199,0.29l2.904-0.29L516.5,125.846zM499.059,117.715l1.743,1.742l-0.291,3.775l-1.452-0.291l-1.164,0.871l-0.872-0.58l-0.291-3.195l-0.579-1.742l1.452,0.291L499.059,117.715zM507.779,102.325l4.069,0.581l-0.289,1.452l0.581,1.161l-2.326-0.291l-2.035,0.872v1.452l-0.292,0.871l0.873,1.162l2.615,1.452l1.455,2.324l2.906,2.323h2.326l0.58,0.58l-0.872,0.582l2.617,0.871l2.036,0.871l2.324,1.451l0.291,0.581l-0.581,0.873l-1.455-1.453l-2.325-0.289l-1.163,1.742l2.036,1.16l-0.581,1.453h-0.873l-1.745,2.323l-0.87,0.291v-0.871l0.289-1.453l0.872-0.58l-1.161-1.742l-0.873-1.162l-1.161-0.58l-0.873-1.162l-1.744-0.29l-1.163-1.162l-2.034-0.291l-2.036-1.162l-2.615-1.741l-1.744-1.743l-0.872-2.614l-1.454-0.29l-2.325-0.872l-1.163,0.291l-1.743,1.162l-1.163,0.291l0.291-1.162l-1.454-0.291l-0.582-2.033l0.872-0.871l-0.872-1.162l0.291-0.871l1.165,0.581h1.16l1.744-0.871l0.291,0.29h1.453l0.583-1.162l2.034,0.29l1.163-0.29l0.289-1.162l1.745,0.291l0.291-0.58l2.615-0.292L507.779,102.325z",
                            "JM": "M260.116,180.148l2.036,0.290l1.452,0.581l0.291,0.871l-1.743,0.000l-0.872,0.291l-1.454,-0.291l-1.744,-1.161l0.290,-0.581l1.164,-0.290l-0.580,-0.290z",
                            "JO": "M571.728,141.816l0.293,-0.870l3.195,1.161l5.234,-2.903l1.163,3.193l-0.582,0.582l-5.522,1.451l2.905,2.614l-0.872,0.581l-0.581,0.871l-2.036,0.290l-0.581,1.161l-1.161,0.582l-3.196,-0.291l0.000,-0.291l1.160,-4.645l0.000,-0.872l0.581,-0.871l0.000,1.743z",
                            "JP": "M844.39,137.17l0.289,0.871l-1.452,1.742l-1.163-1.161l-1.454,0.871l-0.58,1.452l-2.035-0.581l0.292-1.452l1.452-1.743l1.452,0.291l1.165-1.161L844.39,137.17zM861.832,128.75l-1.165,2.323l0.584,1.162l-1.455,2.033l-3.488,1.452h-4.94l-3.78,3.195l-1.742-1.162l-0.292-2.033l-4.651,0.582l-3.488,1.451h-3.198l2.909,2.032l-1.745,4.646l-1.743,1.162l-1.454-1.162l0.582-2.323l-1.745-0.871l-1.163-1.742l2.617-0.871l1.452-1.742l2.907-1.453l2.035-2.033l5.523-0.581l2.907,0.291l2.904-4.646l1.746,1.162l4.07-2.614l1.452-1.161l1.744-3.484l-0.292-2.904l1.164-1.742l2.906-0.581l1.454,3.774v2.324l-2.615,2.613V128.75zM869.969,109.584l1.744,0.58l2.036-1.162l0.58,2.904l-4.068,0.871l-2.326,2.613l-4.36-1.742l-1.453,2.904h-3.199l-0.29-2.613l1.454-2.033l2.906-0.291l0.873-3.775l0.581-2.032l3.488,2.613L869.969,109.584z",
                            "KE": "M586.553,233.289l1.745,2.323l-2.034,1.162l-0.582,1.161l-1.163,0.000l-0.291,2.032l-0.872,1.161l-0.581,1.744l-1.162,0.871l-3.780,-2.615l-0.291,-1.742l-9.883,-5.517l-0.582,-0.289l0.000,-2.906l0.872,-1.161l1.164,-1.742l1.163,-2.033l-1.163,-3.194l-0.291,-1.452l-1.452,-1.742l1.743,-1.743l1.745,-1.741l1.452,0.290l0.000,1.742l0.873,0.871l2.033,0.000l3.489,2.323l0.874,0.000l0.580,0.000l0.580,0.290l2.036,0.290l0.581,-1.160l2.618,-1.162l1.161,0.870l1.743,0.000l-2.325,3.196l0.000,-9.873z",
                            "KG": "M669.108,114.811l0.581,-1.162l1.745,-0.580l4.649,0.871l0.292,-1.452l1.745,-0.581l3.779,1.162l1.161,-0.291l4.361,0.000l4.068,0.291l1.455,0.871l1.744,0.581l-0.289,0.581l-4.362,1.451l-1.162,1.162l-3.490,0.290l-0.871,1.744l-2.906,-0.291l-2.036,0.580l-2.615,1.162l0.289,0.580l-0.579,0.871l-5.233,0.291l-3.488,-0.871l-2.908,0.290l0.291,-1.743l2.906,0.582l0.873,-0.871l2.326,0.289l3.488,-2.032l-3.199,-1.451l-2.034,0.580l-2.035,-0.871l2.326,-1.742l0.872,0.291z",
                            "KH": "M758.638,201.637l-1.162,-1.453l-1.454,-2.613l-0.580,-3.485l1.741,-2.323l3.781,-0.581l2.326,0.581l2.326,0.872l1.160,-1.743l2.617,0.871l0.581,2.033l-0.289,3.194l-4.651,2.033l1.162,1.742l-2.906,0.290l-2.326,1.162l2.326,0.580z",
                            "KO": "M531.032,115.392l-0.289,0.581l-0.292,0.000l-0.289,-1.162l-0.582,-0.290l-0.581,-0.581l0.581,-0.871l0.582,0.000l0.289,-0.871l0.581,-0.291l0.293,0.291l0.581,0.290l0.290,0.581l0.583,0.000l0.579,0.580l0.292,0.000l-0.292,0.580l-0.290,0.292l0.000,0.290l-0.581,0.000l1.455,-0.581z",
                            "KP": "M833.343,114.229l0.292,0.582l-0.872,0.000l-1.164,0.872l-0.872,0.870l0.000,2.033l-1.452,0.581l-0.291,0.582l-1.163,0.580l-1.744,0.580l-1.163,0.582l-0.292,1.451l-0.289,0.291l1.163,0.290l1.452,1.161l-0.290,0.871l-1.162,0.000l-2.035,0.291l-0.874,1.161l-1.452,0.000l-1.454,-0.290l-0.289,0.290l-0.874,0.290l0.000,-0.580l-0.581,0.000l-0.871,-0.581l0.871,-1.161l0.581,-0.291l-0.291,-0.580l0.583,-1.453l0.000,-0.580l-1.744,-0.291l-1.162,-0.580l2.033,-1.742l3.198,-1.453l1.745,-2.032l1.453,0.871l2.325,0.000l-0.289,-1.452l4.067,-1.163l1.163,-1.451l-1.744,-1.451z",
                            "KR": "M826.948,124.684l2.617,3.194l0.582,2.034l0.000,2.903l-1.163,1.742l-2.326,0.582l-2.325,0.870l-2.326,0.291l-0.292,-1.452l0.292,-2.033l-1.163,-2.903l2.036,-0.291l-1.745,-2.614l1.452,0.000l0.874,-1.161l2.035,-0.291l1.162,0.000l-0.290,0.871z",
                            "KW": "M605.74,148.496l0.581,1.162l-0.291,0.580l0.871,2.323l-1.743,0.000l-0.873,-1.452l-2.326,-0.290l2.037,-2.614l-1.744,-0.291z",
                            "KZ": "M669.108,114.811l-1.454,0.291l-3.779,2.033l-1.163,2.032l-1.163,0.000l-0.580,-1.452l-3.489,0.000l-0.581,-2.323l-1.453,0.000l0.290,-2.614l-3.196,-2.032l-4.944,0.290l-3.196,0.291l-2.618,-2.614l-2.324,-0.872l-4.071,-2.031l-0.580,-0.291l-6.976,1.742l0.000,10.164l-1.455,0.000l-1.744,-2.033l-2.034,-0.871l-3.199,0.581l-1.160,0.871l0.000,-0.581l0.582,-1.163l-0.582,-0.869l-3.197,-1.162l-1.165,-2.323l-1.453,-0.581l-0.291,-1.161l2.909,0.289l0.000,-2.032l2.324,-0.290l2.326,0.290l0.581,-2.614l-0.581,-1.742l-2.616,0.291l-2.326,-0.872l-3.196,1.452l-2.618,0.581l-1.452,-0.581l0.289,-1.452l-1.743,-1.742l-2.034,0.000l-2.327,-1.742l1.453,-2.323l-0.580,-0.290l2.036,-3.195l2.906,1.742l0.289,-2.032l5.814,-3.195l4.362,0.000l5.812,2.032l3.489,1.163l2.906,-1.163l4.360,-0.290l3.488,1.453l0.871,-0.872l3.781,0.291l0.581,-1.453l-4.362,-1.742l2.618,-1.451l-0.581,-0.582l2.617,-0.870l-2.036,-1.743l1.454,-1.160l10.172,-0.872l1.454,-0.582l6.976,-1.161l2.326,-1.161l4.942,0.580l0.872,2.905l2.906,-0.581l3.488,0.872l-0.290,1.451l2.618,0.000l6.974,-2.614l-0.871,0.872l3.488,2.033l6.104,6.968l1.453,-1.451l3.780,1.742l4.070,-0.872l1.455,0.581l1.160,1.452l2.034,0.581l1.163,1.162l3.488,-0.291l1.455,1.743l-2.034,1.742l-2.328,0.291l0.000,2.904l-1.744,1.162l-5.232,-0.873l-2.034,4.938l-1.453,0.580l-5.524,1.162l2.617,4.646l-2.033,0.580l0.289,1.743l-1.744,-0.581l-1.455,-0.871l-4.068,-0.291l-4.361,0.000l-1.161,0.291l-3.779,-1.162l-1.745,0.581l-0.292,1.452l-4.649,-0.871l-1.745,0.580l0.581,-1.162z",
                            "LA": "M763.29,191.763l0.872,-1.451l0.291,-2.323l-2.327,-2.324l0.000,-2.613l-2.325,-2.323l-2.036,0.000l-0.582,0.871l-1.452,0.000l-0.871,-0.581l-2.907,1.742l0.000,-2.323l0.579,-2.904l-1.743,-0.289l-0.290,-1.744l-1.163,-0.580l0.581,-1.162l2.326,-1.742l0.289,0.581l1.455,0.000l-0.290,-2.904l1.453,-0.581l1.454,2.324l1.161,2.322l3.488,0.000l1.165,2.614l-1.747,0.580l-0.870,0.872l3.197,1.742l2.325,3.194l1.745,2.614l2.036,1.742l0.870,2.032l-0.581,2.614l-2.617,-0.871l-1.160,1.743l2.326,0.872z",
                            "LB": "M572.31,139.494l-0.582,0.000l-0.291,0.580l-0.872,0.000l0.872,-2.323l1.454,-2.032l1.163,0.000l0.581,1.162l-1.452,1.161l0.873,-1.452z",
                            "LK": "M699.047,210.348l-0.579,2.904l-1.165,0.581l-2.323,0.582l-1.455,-2.034l-0.292,-4.066l1.166,-4.356l2.033,1.454l1.162,2.032l-1.453,-2.903z",
                            "LR": "M452.549,219.06l-0.873,0.000l-2.615,-1.453l-2.617,-2.032l-2.324,-1.452l-1.744,-1.742l0.580,-0.872l0.000,-0.871l1.454,-1.452l1.163,-1.451l0.581,0.000l0.872,-0.290l1.162,1.741l-0.290,1.162l0.582,0.581l0.581,0.000l0.582,-1.161l0.871,0.000l0.000,0.870l0.291,1.162l-0.582,1.452l0.582,0.581l0.871,0.290l1.162,1.161l0.293,1.162l-0.293,0.291l0.289,-2.323z",
                            "LS": "M553.416,310.531l1.163,0.872l-0.873,1.451l-0.581,0.871l-1.454,0.292l-0.581,0.869l-0.871,0.291l-2.036,-2.032l1.454,-1.742l1.453,-1.163l1.163,-0.579l-1.163,-0.870z",
                            "LT": "M536.265,81.417l-0.291,-0.582l0.582,-0.870l-1.454,-0.291l-2.906,-0.581l-0.580,-2.322l3.197,-0.871l4.649,0.290l2.618,-0.290l0.581,0.580l1.455,0.291l2.614,1.162l0.290,1.160l-2.326,1.162l-0.578,1.452l-2.908,0.872l-2.907,0.000l-0.582,-0.872l1.454,0.290z",
                            "LU": "M490.338,93.032l0.579,0.581l0.000,1.452l-0.871,0.000l-0.581,-0.291l0.290,-1.451l-0.583,0.291z",
                            "LV": "M531.616,76.771l0.290,-2.033l1.162,-1.742l2.616,-0.871l2.326,2.033l2.035,0.000l0.581,-2.033l2.325,-0.581l1.165,0.290l2.614,1.162l2.034,0.000l1.455,0.581l0.291,1.161l0.871,1.742l-2.906,1.162l-1.745,0.291l-2.614,-1.162l-1.455,-0.291l-0.581,-0.580l-2.618,0.290l-4.649,-0.290l3.197,-0.871z",
                            "LY": "M514.755,167.951l-2.036,1.162l-1.452,-1.452l-4.361,-1.161l-1.452,-1.743l-2.035,-1.451l-1.163,0.580l-1.163,-1.451l0.000,-1.162l-1.744,-2.033l1.162,-1.161l-0.291,-1.743l0.291,-1.452l0.000,-1.451l0.291,-2.033l0.000,-1.453l-0.871,-2.322l1.162,-0.581l0.290,-1.162l-0.290,-1.161l2.034,-1.162l0.872,-0.870l1.164,-0.873l0.291,-2.032l3.195,0.872l1.165,0.000l2.326,0.290l3.486,1.161l1.456,2.614l2.325,0.581l4.067,1.161l2.907,1.162l1.165,-0.581l1.453,-1.452l-0.582,-2.033l0.874,-1.162l1.741,-1.451l2.036,-0.290l3.778,0.580l0.873,1.161l1.163,0.000l0.871,0.582l2.616,0.291l0.582,0.870l-0.871,1.452l0.289,1.162l-0.579,1.451l0.871,2.324l0.000,9.873l0.000,10.162l0.000,5.228l-3.199,0.291l0.000,0.870l-11.045,-5.227l-11.046,-5.226l2.616,-1.451z",
                            "MA": "M459.526,132.525l1.743,1.161l2.616,0.000l2.615,0.581l1.164,0.000l1.163,1.742l0.291,1.742l0.871,2.905l0.582,0.580l-0.289,0.871l-3.782,0.582l-1.162,0.870l-1.744,0.291l0.000,2.032l-3.197,1.162l-1.162,1.452l-2.036,0.581l-2.906,0.581l-4.361,2.032l0.000,3.194l-0.581,0.000l0.292,1.452l-1.745,0.000l-0.872,0.871l-1.161,0.000l-1.165,-0.581l-2.324,0.291l-0.873,2.323l-0.872,0.000l-1.162,3.485l-4.069,3.194l-0.874,3.775l-1.162,1.162l-0.290,0.870l-6.107,0.291l0.000,-1.161l1.165,-0.872l0.871,-1.451l-0.291,-0.872l1.164,-2.033l1.454,-1.742l0.871,-0.291l0.873,-1.742l0.000,-1.451l0.870,-1.742l2.036,-0.872l1.745,-2.904l1.452,-1.162l2.326,-0.289l2.326,-1.743l1.452,-0.871l2.036,-2.323l-0.582,-3.194l1.163,-2.323l0.290,-1.452l1.744,-2.033l2.906,-1.162l2.037,-1.162l1.745,-2.903l0.871,-1.742l-2.035,0.000z",
                            "MD": "M547.02,98.259l0.584,-0.290l2.033,-0.290l2.034,0.870l1.162,0.000l1.166,0.872l-0.293,0.871l1.164,0.580l0.290,1.162l0.873,0.580l0.000,0.291l0.290,0.291l-0.581,0.290l-1.743,0.000l-0.293,-0.581l-0.581,0.291l0.291,0.580l-0.872,0.871l-0.291,0.872l-0.872,0.291l-0.291,-1.163l0.291,-1.161l-0.291,-1.161l-1.453,-1.742l-0.873,-1.162l-0.871,-0.872l0.873,0.290z",
                            "ME": "M528.417,113.94l-0.292,-0.291l-1.163,1.162l0.000,0.872l-0.581,0.000l-0.579,-0.872l-1.163,-0.582l0.289,-0.580l0.291,-1.451l0.872,-0.581l0.582,-0.290l0.873,0.290l0.290,0.581l0.872,0.290l1.162,0.581l-0.290,0.000l-0.581,0.871l0.582,0.000z",
                            "MG": "M610.099,265.23l0.873,1.163l0.582,1.742l0.579,3.485l0.584,1.160l-0.293,1.454l-0.581,0.579l-0.871,-1.451l-0.583,0.872l0.583,2.032l-0.291,1.160l-0.582,0.581l-0.292,2.325l-1.162,3.194l-1.161,3.775l-1.744,5.226l-1.162,3.775l-1.165,3.195l-2.325,0.581l-2.325,1.162l-1.455,-0.582l-2.324,-0.871l-0.872,-1.453l0.000,-2.613l-1.163,-2.032l0.000,-2.033l0.292,-2.032l1.452,-0.582l0.000,-0.871l1.163,-2.032l0.289,-1.742l-0.579,-1.453l-0.582,-1.451l-0.291,-2.614l1.163,-1.743l0.289,-1.742l1.455,0.000l1.452,-0.581l0.872,-0.579l1.454,0.000l1.455,-1.454l2.325,-1.740l0.872,-1.454l-0.580,-1.160l1.161,0.289l1.744,-1.743l0.000,-1.742l0.873,-1.160l-0.871,-1.160z",
                            "MK": "M530.451,115.973l0.292,0.000l0.289,-0.581l1.455,-0.581l0.581,0.000l1.161,-0.290l1.165,0.000l1.452,0.871l0.000,1.743l-0.290,0.290l-0.582,0.290l-1.452,0.000l-1.164,0.580l-1.742,0.291l-1.165,-0.581l-0.289,-1.161l-0.289,0.871z",
                            "ML": "M440.34,190.602l0.871,-0.290l0.583,-1.743l0.872,0.000l1.744,0.871l1.455,-0.580l1.161,0.000l0.581,-0.581l11.046,0.000l0.582,-2.032l-0.582,-0.291l-1.454,-11.906l-1.161,-11.615l4.070,-0.291l9.301,6.098l9.301,6.098l0.873,1.161l1.454,0.872l1.452,0.291l0.000,1.742l2.906,0.000l0.000,6.097l-1.452,2.034l-0.291,1.452l-2.326,0.580l-3.778,0.291l-0.872,0.870l-1.744,0.291l-2.035,0.000l-0.582,-0.581l-1.452,0.290l-2.617,1.162l-0.582,0.871l-2.035,1.161l-0.291,0.872l-1.163,0.581l-1.452,-0.581l-0.872,0.871l-0.291,1.742l-2.034,2.324l0.000,0.871l-0.873,1.161l0.290,1.741l-1.161,0.292l-0.583,0.290l-0.579,-1.162l-0.582,0.291l-0.581,0.000l-0.582,0.871l-2.037,0.000l-0.870,-0.582l-0.292,0.292l-0.871,-0.581l0.290,-0.871l-0.581,-0.291l-0.582,0.291l0.291,-1.162l0.582,-0.580l-1.162,-1.162l-0.292,-0.871l-0.582,-0.581l-0.581,0.000l-0.871,0.290l-0.873,0.582l-0.579,0.580l-1.165,-0.291l-0.871,-0.580l-0.582,-0.291l-0.581,0.582l-0.290,0.000l-0.293,-1.162l0.000,-0.871l0.000,-1.162l-1.162,-0.581l-0.581,-1.742l0.000,1.742z",
                            "MM": "M747.882,175.501l-1.743,1.163l-2.034,0.000l-1.163,3.194l-1.165,0.290l1.455,2.613l1.744,1.742l1.163,2.034l-1.163,2.323l-0.871,0.580l0.582,1.162l1.741,2.322l0.582,1.453l-0.290,1.452l1.162,2.322l-1.454,2.614l-1.452,2.903l-0.289,-2.031l0.870,-2.033l-0.870,-1.742l0.289,-2.904l-1.163,-1.453l-0.871,-3.484l-0.581,-3.484l-1.164,-2.034l-1.743,1.162l-3.200,2.033l-1.454,-0.291l-1.741,-0.580l0.870,-3.486l-0.579,-2.612l-2.036,-2.904l0.290,-1.161l-1.744,-0.291l-1.743,-2.323l-0.291,-2.033l0.871,0.291l0.292,-2.033l1.162,-0.581l-0.291,-1.161l0.583,-0.872l0.290,-2.904l2.033,0.580l1.163,-2.322l0.292,-1.162l1.453,-2.323l0.000,-1.742l3.489,-1.742l2.034,0.290l-0.291,-1.452l0.871,-0.580l0.000,-1.162l1.455,0.000l0.873,1.452l1.161,0.580l0.291,2.324l-0.291,2.032l-2.615,2.323l-0.290,3.484l2.905,-0.580l0.873,2.614l1.743,0.580l-0.872,2.033l2.035,1.162l1.163,0.580l2.035,-0.870l0.000,1.161l-2.326,1.742l-0.581,1.162l1.454,-0.580z",
                            "MN": "M715.327,95.356l2.907,-0.582l5.232,-2.323l4.069,-1.161l2.616,0.871l2.908,0.000l1.741,1.162l2.617,0.290l4.071,0.581l2.617,-2.033l-1.163,-1.453l2.907,-2.902l3.196,1.161l2.327,0.290l3.488,0.580l0.290,2.324l4.069,1.162l2.617,-0.582l3.487,-0.290l2.618,0.290l2.615,1.162l1.743,1.453l2.616,0.000l3.490,0.581l2.616,-0.872l3.488,-0.291l4.070,-2.033l1.745,0.291l1.452,0.871l3.197,-0.290l-1.453,2.324l-1.744,2.612l0.581,1.162l1.455,-0.290l2.904,0.290l2.036,-0.872l2.327,0.872l2.325,1.742l-0.291,1.161l-2.034,-0.289l-4.071,0.289l-2.035,0.872l-2.034,1.742l-4.069,1.162l-2.909,1.451l-2.614,-0.580l-1.745,-0.290l-1.454,1.742l0.873,1.162l0.581,0.871l-2.033,0.871l-1.745,1.452l-3.199,0.871l-4.359,0.289l-4.361,0.873l-3.197,1.451l-1.163,-0.870l-3.489,0.000l-4.069,-1.743l-2.615,-0.291l-3.781,0.291l-5.522,-0.580l-3.196,0.000l-1.456,-1.453l-1.163,-2.613l-1.743,-0.291l-3.488,-1.742l-3.778,-0.290l-3.198,-0.581l-0.873,-1.162l0.873,-3.194l-1.746,-2.323l-4.067,-0.872l-2.326,-1.451l0.581,2.032z",
                            "MR": "M440.34,190.602l-2.034,-1.742l-1.454,-2.033l-2.034,-0.580l-1.163,-0.872l-1.454,0.000l-1.452,0.581l-1.456,-0.291l-0.871,0.872l-0.290,-1.453l0.871,-1.451l0.290,-2.614l-0.290,-2.613l-0.291,-1.453l0.291,-1.161l-0.871,-1.452l-1.454,-1.161l0.582,-0.871l11.046,0.000l-0.581,-4.066l0.581,-1.451l2.615,0.000l0.000,-7.261l9.011,0.290l0.000,-4.355l10.176,6.679l-4.070,0.291l1.161,11.615l1.454,11.906l0.582,0.291l-0.582,2.032l-11.046,0.000l-0.581,0.581l-1.161,0.000l-1.455,0.580l-1.744,-0.871l-0.872,0.000l-0.583,1.743l0.871,-0.290z",
                            "MW": "M568.822,262.618l-0.582,2.032l0.582,3.776l1.165,-0.291l0.871,0.871l1.163,2.034l0.289,3.483l-1.163,0.581l-0.871,2.032l-1.744,-1.742l-0.292,-2.032l0.582,-1.161l-0.290,-1.161l-0.873,-0.582l-0.871,0.291l-1.455,-1.454l-1.452,-0.580l0.580,-2.612l0.872,-0.873l-0.290,-2.323l0.290,-2.322l0.582,-0.582l-0.582,-2.322l-1.452,-1.452l2.907,0.581l0.289,0.871l1.163,1.161l-0.582,-3.776z",
                            "MX": "M206.341,159.82l-1.163,2.324l-0.291,2.033l-0.290,3.774l-0.291,1.162l0.581,1.743l0.872,1.161l0.582,2.033l1.744,2.323l0.581,1.452l1.163,1.451l2.906,0.582l1.163,1.161l2.326,-0.871l2.034,-0.290l2.035,-0.291l1.745,-0.581l1.743,-1.161l0.872,-1.452l0.000,-2.323l0.582,-0.871l2.034,-0.581l2.908,-0.872l2.324,0.291l1.745,-0.291l0.582,0.582l0.000,1.161l-1.454,1.742l-0.873,1.742l0.582,0.581l-0.291,1.162l-0.872,2.033l-0.582,-0.581l-0.581,0.000l-0.580,0.000l-0.872,1.742l-0.582,-0.580l-0.290,0.290l0.000,0.290l-2.617,0.000l-2.615,0.000l0.000,1.743l-1.163,0.000l0.872,0.870l1.162,0.581l0.291,0.581l0.582,0.291l-0.292,0.871l-3.487,0.000l-1.164,2.033l0.291,0.580l-0.291,0.581l0.000,0.871l-3.197,-2.903l-1.454,-0.872l-2.325,-0.870l-1.453,0.290l-2.325,1.161l-1.163,0.291l-2.035,-0.872l-2.035,-0.580l-2.617,-1.162l-2.034,-0.291l-3.198,-1.451l-2.325,-1.161l-0.582,-0.872l-1.453,0.000l-2.906,-0.871l-1.163,-1.453l-2.907,-1.451l-1.454,-1.742l-0.581,-1.453l0.872,-0.290l-0.291,-0.581l0.582,-0.871l0.000,-0.871l-0.873,-1.161l-0.290,-1.162l-0.872,-1.452l-2.325,-2.614l-2.908,-2.322l-1.453,-1.453l-2.325,-1.161l-0.290,-0.872l0.290,-1.451l-1.454,-0.871l-1.453,-1.162l-0.872,-2.032l-1.454,-0.291l-1.453,-1.452l-1.454,-1.161l0.000,-0.871l-1.453,-2.033l-1.162,-2.324l0.290,-0.870l-2.035,-1.162l-0.872,0.000l-1.744,-0.581l-0.290,1.162l0.290,1.161l0.290,2.034l0.872,1.161l2.036,2.032l0.581,0.581l0.291,0.290l0.581,0.872l0.291,0.000l0.581,1.742l0.872,0.580l0.581,1.162l1.745,1.162l0.872,2.613l0.872,1.162l0.872,1.452l0.000,1.452l1.453,0.000l0.872,1.160l1.164,1.454l0.000,0.290l-1.164,1.161l-0.581,0.000l-0.581,-1.742l-2.035,-1.452l-1.744,-1.453l-1.454,-0.580l0.000,-2.033l-0.291,-1.452l-1.453,-0.870l-1.744,-1.453l-0.581,0.581l-0.582,-0.871l-1.743,-0.581l-1.745,-1.742l0.291,0.000l1.163,0.000l1.162,-0.872l0.000,-1.451l-2.034,-1.742l-1.744,-0.871l-0.873,-1.742l-1.162,-1.744l-1.163,-2.322l-1.163,-2.323l3.198,-0.291l3.487,-0.290l-0.290,0.581l4.070,1.452l6.395,1.742l5.232,0.000l2.326,0.000l0.000,-1.162l4.650,0.000l1.163,1.162l1.453,0.871l1.454,1.162l0.872,1.451l0.872,1.453l1.454,0.871l2.325,0.871l1.744,-2.323l2.035,0.000l2.034,1.161l1.454,1.742l0.872,1.742l1.744,1.452l0.582,2.033l0.581,1.162l2.326,0.871l1.744,0.580l-1.163,0.000z",
                            "MY": "M751.953,213.833l0.29,1.451l1.744-0.289l0.873-1.162l0.582,0.29l1.741,1.743l1.165,1.741l0.29,1.743l-0.29,1.452v0.87l0.29,1.453l0.871,0.871l1.162,2.322v1.162h-2.033l-2.616-2.033l-3.195-2.032l-0.295-1.452l-1.452-1.743l-0.581-2.322l-0.871-1.452l0.289-2.031l-0.58-1.162l0.291-0.582L751.953,213.833zM800.205,218.769l-2.034,0.871l-2.325-0.58h-3.198l-0.871,3.193l-1.163,0.872l-1.452,3.774l-2.036,0.581l-2.615-0.581l-1.454,0.291l-1.453,1.16h-1.744l-1.744,0.581l-2.033-1.741l-0.584-1.743l2.036,0.871l2.325-0.581l0.581-2.322l1.163-0.29l3.197-0.581l2.036-2.324l1.162-1.741l1.453,1.451l0.58-0.87h1.163l0.291-1.743v-1.451l2.327-1.743l1.161-2.322h1.162l1.455,1.452v1.162l2.034,0.869l2.325,0.872l-0.29,0.872l-1.744,0.289L800.205,218.769z",
                            "MZ": "M568.822,262.618l2.036,-0.292l3.486,0.872l0.581,-0.291l2.036,-0.289l0.872,-0.581l1.746,0.000l2.907,-1.162l2.323,-1.452l0.292,1.162l0.000,2.613l0.289,2.614l0.000,4.064l0.584,1.453l-0.873,2.033l-0.873,1.742l-1.742,1.742l-2.618,1.161l-3.199,1.163l-2.905,3.194l-1.163,0.290l-2.036,2.033l-1.162,0.580l0.000,2.034l1.162,2.032l0.582,1.741l0.000,0.874l0.581,-0.292l-0.291,2.614l-0.290,1.451l0.581,0.290l-0.291,1.162l-1.161,1.161l-2.327,0.873l-3.198,1.451l-1.452,1.162l0.289,1.161l0.873,0.000l-0.291,1.452l-2.034,0.000l-0.291,-1.162l-0.580,-1.161l0.000,-1.162l0.290,-2.904l-0.582,-2.033l-1.452,-3.774l2.904,-3.195l0.874,-2.033l0.289,-0.290l0.293,-1.452l-0.293,-0.870l0.000,-2.033l0.582,-2.032l0.000,-3.486l-1.452,-0.871l-1.163,-0.289l-0.582,-0.582l-1.452,-0.581l-2.325,0.000l0.000,-0.870l-0.292,-2.033l8.429,-2.325l1.455,1.454l0.871,-0.291l0.873,0.582l0.290,1.161l-0.582,1.161l0.292,2.032l1.744,1.742l0.871,-2.032l1.163,-0.581l-0.289,-3.483l-1.163,-2.034l-0.871,-0.871l-1.165,0.291l-0.582,-3.776l-0.582,2.032z",
                            "NA": "M518.825,309.661l-2.036,-2.325l-1.163,-2.033l-0.579,-2.613l-0.584,-2.032l-1.161,-4.065l0.000,-3.485l-0.291,-1.452l-1.163,-1.162l-1.454,-2.034l-1.452,-3.483l-0.582,-1.743l-2.034,-2.613l-0.291,-2.033l1.452,-0.581l1.455,-0.581l1.743,0.292l1.745,1.161l0.581,-0.291l11.047,0.000l2.033,1.162l6.396,0.582l5.232,-1.162l2.326,-0.582l1.745,0.000l0.871,0.582l0.290,0.289l-1.743,0.582l-0.874,0.000l-1.744,1.162l-0.871,-1.162l-4.361,0.871l-2.033,0.291l0.000,9.582l-2.908,0.289l0.000,7.843l0.000,10.163l-2.326,1.451l-1.452,0.290l-1.744,-0.581l-1.162,-0.290l-0.582,-1.162l-1.163,-0.580l1.163,-1.453z",
                            "NC": "M930.142,289.042l2.325,1.452l1.452,1.454l-1.162,0.579l-1.453,-0.871l-2.036,-1.162l-1.744,-1.452l-1.742,-1.741l-0.582,-1.162l1.161,0.000l1.745,1.162l1.162,0.870l-0.874,-0.871z",
                            "NCY": "M563.881,134.267l0.289,0.000l0.291,-0.581l2.035,0.000l2.326,-0.871l-1.745,1.162l0.293,0.580l-0.293,0.000l-0.581,0.000l-0.581,0.000l-0.290,-0.290l-0.582,0.000l-0.582,0.290l0.580,0.290z",
                            "NE": "M479.583,198.151l0.291,-2.032l-3.198,-0.581l-0.291,-1.161l-1.453,-2.033l-0.292,-1.162l0.292,-1.161l1.744,-0.291l0.872,-0.870l3.778,-0.291l2.326,-0.580l0.291,-1.452l1.452,-2.034l0.000,-6.097l4.070,-1.453l7.849,-5.227l9.592,-5.226l4.361,1.161l1.452,1.452l2.036,-1.162l0.581,4.357l1.164,0.871l0.000,0.871l1.163,0.871l-0.581,1.162l-1.164,5.517l-0.292,3.484l-3.486,2.614l-1.165,3.775l1.165,0.871l0.000,1.742l1.742,0.291l-0.289,1.161l-0.582,0.291l-0.292,0.871l-0.289,0.000l-2.036,-2.904l-0.580,-0.291l-2.327,1.453l-2.033,-0.581l-1.455,-0.291l-0.872,0.291l-1.453,0.000l-1.743,1.161l-1.455,0.000l-3.196,-1.161l-1.452,0.581l-1.165,0.000l-1.163,-1.162l-2.617,-0.872l-3.195,0.291l-0.582,0.581l-0.292,1.452l-0.871,1.161l-0.291,2.324l-2.034,-1.453l-0.874,0.000l1.161,-0.871z",
                            "NG": "M497.023,217.898l-2.615,0.871l-1.164,0.000l-1.161,0.581l-2.037,0.000l-1.452,-1.743l-0.873,-2.032l-2.033,-1.742l-2.036,0.000l-2.615,0.000l0.289,-4.647l0.000,-1.741l0.581,-1.743l0.582,-0.871l1.454,-1.452l-0.291,-0.873l0.580,-1.160l-0.580,-1.453l0.000,-1.160l0.291,-2.324l0.871,-1.161l0.292,-1.452l0.582,-0.581l3.195,-0.291l2.617,0.872l1.163,1.162l1.165,0.000l1.452,-0.581l3.196,1.161l1.455,0.000l1.743,-1.161l1.453,0.000l0.872,-0.291l1.455,0.291l2.033,0.581l2.327,-1.453l0.580,0.291l2.036,2.904l0.289,0.000l1.163,0.871l-0.289,0.580l0.000,0.872l-2.326,2.323l-0.873,1.742l-0.289,1.452l-0.582,0.582l-0.581,1.742l-1.455,1.161l-0.581,1.452l-0.580,1.161l-0.291,1.162l-1.744,0.870l-1.746,-1.161l-0.871,0.000l-1.743,1.743l-0.872,0.000l-1.164,2.614l0.872,-2.032z",
                            "NI": "M237.734,200.475l-0.872,-0.871l-1.163,-1.162l-0.581,-0.871l-1.163,-0.871l-1.454,-1.162l0.291,-0.580l0.291,0.580l0.291,-0.290l0.872,0.000l0.291,-0.871l0.581,0.000l-0.290,-1.162l0.871,-0.291l0.582,0.291l0.581,-0.871l0.581,0.580l0.291,-0.289l0.581,-0.291l1.163,-0.871l0.000,-0.581l0.291,0.000l0.291,-0.580l0.291,0.000l0.290,0.290l0.582,0.000l0.581,-0.290l0.872,0.000l0.872,-0.291l0.291,-0.291l1.162,0.000l-0.291,0.291l-0.290,0.581l0.290,0.871l-0.582,1.162l-0.289,0.870l0.000,1.453l0.000,0.580l0.289,1.162l-0.580,0.290l-0.291,1.161l0.291,0.872l-0.581,0.581l0.000,0.871l0.581,0.290l-0.581,0.581l-0.872,0.000l-0.583,-0.581l-0.871,-0.290l-0.581,0.290l-1.745,-0.581l0.581,-0.291z",
                            "NL": "M490.628,83.74l2.035,0.000l0.581,1.161l-0.581,2.323l-0.871,1.162l-1.454,0.000l0.290,2.904l-1.452,-0.582l-1.745,-1.451l-2.617,0.580l-2.034,0.000l1.452,-0.870l2.618,-4.066l-3.778,1.161z",
                            "NO": "M551.381,35.246l8.43,2.032l-3.488,0.582l3.198,1.742l-4.942,1.161l-2.034,0.29l1.161-2.032l-3.486-1.162l-4.362,1.162l-1.452,2.032l-2.615,1.162l-2.907-0.581h-3.488l-3.198-1.452l-1.453,0.581l-1.744,0.29l-0.582,1.743l-5.231-0.291l-0.582,1.452h-2.615l-1.745,2.033l-2.906,2.903l-4.361,3.775l1.165,1.162l-0.873,0.872h-2.907l-1.744,2.613l0.29,3.775l1.743,1.162l-1.162,3.484l-2.033,1.742l-1.455,1.742l-1.742-1.742l-5.524,3.194l-3.488,0.582l-3.778-1.452l-1.163-2.905l-0.871-6.387l2.615-1.743l7.268-2.323l5.523-2.904l4.941-3.774l6.685-5.228l4.651-2.033l7.559-3.484l5.813-1.162h4.651l4.069-2.324l5.231,0.291L551.381,35.246zM541.79,16.951l-6.105,1.162l-4.941-0.87l2.036-0.582l-1.747-0.872l5.814-0.58l0.873,1.161L541.79,16.951zM524.058,11.724l9.01,2.033l-6.977,1.162l-1.452,2.032l-2.325,0.581l-1.455,2.324h-3.196l-6.104-1.743l2.615-0.87l-4.069-0.873l-5.523-2.323l-2.036-2.033l7.56-1.162l1.454,1.162l3.777-0.291l1.163-0.871h4.07L524.058,11.724zM543.823,9.692l5.522,1.161l-4.358,1.452l-7.849,0.29l-8.14-0.581l-0.582-0.58h-3.777l-3.199-1.453l8.722-0.58l3.778,0.58l2.906-0.871L543.823,9.692z",
                            "NP": "M716.198,154.304l0.000,1.161l0.291,1.742l-0.291,1.162l-2.326,0.000l-3.197,-0.581l-2.325,-0.290l-1.453,-1.452l-3.779,-0.291l-3.490,-1.742l-2.614,-1.161l-2.908,-1.162l1.163,-2.613l1.745,-1.161l1.162,-0.582l2.326,0.871l2.616,1.742l1.454,0.291l1.162,1.452l2.034,0.581l2.326,1.162l2.906,0.580l-3.198,-0.291z",
                            "NZ": "M949.907,343.345l0.873,1.161l1.745-1.161l0.87,1.161v1.161l-0.87,1.452l-2.036,2.033l-1.163,1.161l0.873,1.162h-2.034l-2.327,1.162l-0.871,1.74l-1.455,2.904l-2.323,1.161l-1.165,0.871l-2.615-0.289l-1.742-0.872h-3.198l-0.292-1.162l1.453-2.033l3.49-2.613l1.744-0.58l2.034-1.16l2.325-1.452l1.744-1.453l1.162-2.032l0.872-0.58l0.58-1.452l1.745-1.451L949.907,343.345zM954.559,330.277l1.743,2.904l0.292-1.743l1.16,0.58l0.293,2.324l2.324,0.872h1.745l1.743-0.872l1.453,0.289l-0.871,2.326l-0.873,1.74h-2.033l-0.582,0.581v1.452l-0.289,0.291l-1.165,1.452l-1.163,2.032l-2.325,1.161l-0.29-0.87l-1.162-0.291l1.452-2.322l-0.871-1.453l-2.907-1.16v-0.873l2.035-1.159l0.58-2.034l-0.289-1.743l-1.164-1.743l0.292-0.58l-1.454-1.161l-2.034-2.323l-1.162-2.032l0.87-0.291l1.455,1.453l2.325,0.87L954.559,330.277z",
                            "OM": "M635.678,172.888l-0.871,1.742h-1.163l-0.58,0.581l-0.582,1.452l0.29,1.742l-0.29,0.581l-1.163-0.29l-1.744,1.162l-0.291,1.452l-0.58,0.581h-1.743l-1.165,0.582v1.162l-1.163,0.581l-1.452-0.291l-2.034,1.162h-1.163l-0.873-1.743l-2.325-4.645l8.431-2.613l1.745-5.519l-1.165-2.032v-1.162l0.873-1.162v-1.161l1.162-0.581l-0.581-0.291l0.289-1.742h1.456l1.161,1.742l1.745,1.161l2.036,0.291l1.45,0.581l1.165,1.452l0.871,0.872l0.872,0.58v0.582l-0.872,1.451l-0.582,0.872L635.678,172.888zM628.995,159.82l-0.291,0.291l-0.583-0.871l0.874-0.872l0.289,0.291L628.995,159.82z",
                            "PA": "M259.244,211.219l-0.872,-0.871l-0.580,-1.452l0.872,-0.871l-0.872,-0.290l-0.582,-0.871l-1.163,-0.581l-1.162,0.000l-0.582,1.162l-1.162,0.580l-0.582,0.000l-0.291,0.581l1.163,1.451l-0.581,0.581l-0.582,0.291l-1.163,0.290l-0.581,-1.742l-0.291,0.291l-0.872,0.000l-0.581,-1.162l-1.163,-0.291l-0.580,-0.290l-1.164,0.000l-0.291,0.581l-0.290,-0.291l0.290,-0.580l0.291,-0.582l-0.291,-0.289l0.583,-0.581l-0.583,-0.291l0.000,-1.161l0.872,-0.291l1.163,1.162l0.000,0.581l0.872,0.000l0.291,-0.291l0.872,0.872l1.163,-0.291l1.163,-0.581l1.744,-0.579l0.872,-0.873l1.744,0.000l-0.291,0.291l1.745,0.291l1.163,0.291l0.871,0.870l0.872,0.870l-0.290,0.292l0.872,1.741l-0.582,0.871l-0.872,-0.289l0.582,-1.451z",
                            "PE": "M282.208,279.17l-0.872,1.451l-1.163,0.872l-2.905,-1.743l-0.292,-1.162l-5.232,-2.613l-4.942,-3.195l-2.325,-1.451l-1.163,-2.323l0.581,-0.871l-2.326,-3.485l-2.905,-5.227l-2.326,-5.517l-1.163,-1.161l-0.872,-2.033l-2.325,-1.743l-1.745,-1.161l0.872,-1.162l-1.453,-2.613l0.872,-2.033l2.326,-1.742l0.291,1.160l-0.873,0.582l0.000,1.162l1.163,-0.290l1.163,0.290l1.162,1.451l1.454,-1.162l0.582,-1.742l1.744,-2.613l3.196,-0.871l3.198,-2.904l0.872,-1.741l-0.581,-2.324l0.872,-0.291l1.744,1.452l0.872,1.163l1.163,0.870l1.744,2.903l2.035,0.291l1.453,-0.870l1.164,0.579l1.452,-0.290l2.326,1.452l-1.744,2.613l0.582,0.290l1.452,1.454l-2.324,-0.290l-0.583,0.580l-2.033,0.289l-3.198,2.034l-0.291,1.161l-0.581,1.162l0.290,1.451l-1.744,0.581l0.000,1.162l-0.872,0.581l1.163,2.614l1.744,1.451l-0.581,1.451l1.744,0.000l0.872,1.453l2.616,0.000l2.326,-1.453l-0.292,4.066l1.163,0.292l1.744,-0.292l2.326,4.355l-0.582,0.873l-0.290,2.033l0.000,2.323l-1.163,1.452l0.582,0.872l-0.582,0.869l1.163,2.324l1.745,-2.904z",
                            "PG": "M902.817,249.55l-0.873,0.29l-1.163-0.871l-1.162-1.742l-0.581-2.032l0.581-0.289l0.29,0.579l0.583,0.872l1.452,1.741l1.163,0.871L902.817,249.55zM892.063,246.065l-1.455,0.292l-0.29,0.58l-1.454,0.871l-1.452,0.582h-1.452l-2.328-0.872l-1.453-0.872v-0.871l2.616,0.582l1.454-0.292l0.289-1.159l0.582-0.293l0.292,1.452h1.452l0.873-1.159l1.452-0.873l-0.289-1.741h1.741l0.584,0.58l-0.291,1.452L892.063,246.065zM878.982,251.292l2.326,1.742l1.741,2.904h1.745v1.16l2.035,0.582l-0.87,0.291l2.904,1.16l-0.29,0.871l-1.744,0.292l-0.87-0.872l-2.328-0.291l-2.616-0.29l-2.325-1.743l-1.452-1.451l-1.454-2.613l-3.488-1.161l-2.326,0.871l-1.744,0.871l0.292,2.032l-2.034,0.871l-1.744-0.29l-2.617-0.29l-0.29-9.002v-8.712l4.94,1.742l4.941,1.451l2.036,1.453l1.452,1.452l0.292,1.741l4.649,1.743l0.583,1.451l-2.328,0.291L878.982,251.292zM895.259,243.451l-0.873,0.582l-0.582-1.741l-0.579-0.873l-1.162-0.87l-1.455-1.162l-2.034-0.871l0.579-0.58l1.455,0.58l1.163,0.581l1.163,0.871l0.87,1.161l1.165,0.871L895.259,243.451z",
                            "PH": "M821.715,207.735l0.292,2.033v1.451l-0.872,2.322l-0.871-2.612l-1.454,1.452l0.871,2.033l-0.871,1.16l-3.199-1.452l-0.581-2.032l0.874-1.452l-1.745-1.161l-0.873,1.161l-1.452-0.29l-2.034,1.742l-0.292-0.871l0.871-2.323l1.744-0.871l1.455-0.872l1.163,1.162l2.035-0.87l0.29-1.162h2.033v-2.323l2.036,1.453l0.29,1.451L821.715,207.735zM815.03,202.798l-0.871,0.87l-0.873,1.744l-0.871,0.579l-1.744-1.741l0.582-0.871l0.581-0.581l0.289-1.743l1.455-0.29l-0.292,2.033l2.036-2.614L815.03,202.798zM799.916,205.413l-3.488,2.612l1.163-2.033l2.034-1.741l1.743-1.744l1.454-2.902l0.291,2.322l-1.745,1.453L799.916,205.413zM809.216,198.151l1.743,0.872h1.745v1.161l-1.452,1.162l-1.745,0.871v-1.162l0.292-1.451L809.216,198.151zM819.099,197.571l0.874,2.904l-2.036-0.582v0.872l0.581,1.741l-1.162,0.582l-0.29-2.033h-0.584l-0.578-1.742l1.743,0.291v-1.162l-1.743-2.033h2.614L819.099,197.571zM808.344,194.958l-0.873,2.323l-1.161-1.162l-1.454-2.323l2.615,0.291L808.344,194.958zM807.764,180.148l1.743,0.581l0.871-0.581v0.581l-0.289,1.162l0.87,2.033l-0.581,2.324l-1.744,0.87l-0.29,2.323l0.582,2.033l1.452,0.29l1.165-0.29l3.486,1.451l-0.289,1.743l0.87,0.581l-0.289,1.161l-2.036-1.161l-1.163-1.452l-0.579,0.871l-1.744-1.743l-2.617,0.581l-1.454-0.581l0.291-1.162l0.873-0.871l-0.873-0.58l-0.291,1.162l-1.453-1.743l-0.29-1.161l-0.291-2.613l1.162,0.871l0.292-4.355l0.871-2.324H807.764z",
                            "PK": "M680.735,128.75l2.036,1.451l0.870,2.033l4.361,1.162l-2.617,2.323l-3.196,0.290l-4.069,-0.581l-1.453,1.162l1.160,2.324l0.874,2.032l2.325,1.161l-2.325,1.743l0.000,2.032l-2.618,2.614l-1.745,2.904l-2.904,2.904l-3.199,-0.291l-3.197,2.904l1.745,1.162l0.579,2.032l1.455,1.451l0.583,2.324l-6.106,0.000l-1.745,2.033l-2.033,-0.871l-0.873,-2.033l-2.034,-2.033l-5.234,0.580l-4.360,0.000l-4.068,0.291l1.161,-3.193l4.070,-1.162l-0.290,-1.452l-1.453,-0.291l0.000,-2.613l-2.617,-1.162l-1.162,-1.742l-1.453,-1.452l4.649,1.452l2.907,-0.291l1.455,0.291l0.581,-0.580l2.035,0.289l3.488,-1.161l0.291,-2.323l1.452,-1.742l2.034,0.000l0.292,-0.581l2.036,-0.290l1.160,0.000l0.875,-0.580l0.000,-1.743l1.162,-1.743l1.742,-0.580l-1.161,-1.743l2.616,0.000l0.872,-0.871l-0.289,-1.162l1.450,-1.161l-0.289,-1.452l-0.581,-1.162l1.454,-1.161l3.197,-0.580l2.907,-0.291l1.454,-0.581l-1.743,0.290z",
                            "PL": "M515.047,90.418l-1.165,-1.742l0.292,-0.870l-0.581,-1.452l-1.163,-1.162l0.872,-0.581l-0.583,-1.452l1.744,-0.870l4.362,-1.163l3.489,-1.161l2.614,0.581l0.291,0.580l2.617,0.291l3.489,0.290l4.940,-0.290l1.454,0.290l0.582,0.872l0.289,1.452l0.582,0.870l0.000,1.161l-1.453,0.582l0.871,1.162l0.000,1.161l1.455,2.614l-0.292,0.580l-1.452,0.580l-2.617,2.033l0.872,1.452l-0.582,-0.289l-2.616,-1.163l-2.033,0.582l-1.455,-0.291l-1.453,0.581l-1.455,-1.163l-1.160,0.582l0.000,-0.291l-1.454,-1.161l-2.034,-0.290l-0.290,-0.872l-1.746,-0.290l-0.581,0.580l-1.454,-0.580l0.293,-0.580l-2.036,-0.291l1.453,0.872z",
                            "PR": "M291.219,180.148l1.455,0.000l0.581,0.581l-0.872,0.871l-2.035,0.000l-1.453,0.000l-0.291,-1.162l0.582,-0.290l-2.033,0.000z",
                            "PS": "M571.728,141.816l0.000,1.743l-0.581,0.871l-1.160,0.291l0.000,-0.581l0.871,-0.581l-0.871,-0.289l0.578,-1.743l-1.163,-0.289z",
                            "PT": "M448.769,115.683l1.163,-0.581l1.163,-0.291l0.581,1.162l1.744,0.000l0.291,-0.290l1.746,0.000l0.581,1.452l-1.163,0.870l0.000,2.033l-0.582,0.291l0.000,1.451l-1.162,0.291l1.162,1.452l-0.873,2.032l0.873,0.581l-0.291,0.871l-0.871,0.871l0.000,1.162l-0.874,0.581l-1.452,-0.290l-1.454,0.290l0.292,-2.324l-0.292,-1.451l-1.163,-0.291l-0.581,-1.162l0.291,-1.742l0.871,-1.160l0.292,-0.873l0.582,-1.741l0.000,-1.162l-0.582,-0.871l0.292,1.161z",
                            "PY": "M301.103,292.237l1.163,-3.485l0.000,-1.451l1.453,-2.324l4.652,-0.871l2.616,0.000l2.615,1.451l0.000,0.871l0.872,1.452l-0.291,3.776l2.907,0.581l1.163,-0.581l2.035,0.871l0.291,0.581l0.291,2.613l0.290,1.162l1.163,0.000l0.872,-0.290l1.163,0.290l0.000,1.741l-0.292,1.454l-0.580,1.742l-0.582,2.322l-2.325,2.032l-2.326,0.581l-3.197,-0.581l-2.617,-0.580l2.617,-4.354l-0.291,-1.162l-2.906,-1.161l-3.198,-2.034l-2.326,-0.290l5.232,4.356z",
                            "QA": "M613.587,162.725l0.000,-1.743l0.582,-1.452l0.873,-0.290l0.871,0.871l0.000,1.451l-0.581,1.744l-0.872,0.000l0.873,0.581z",
                            "RO": "M536.265,99.13l1.163,-0.581l1.744,0.581l1.745,0.000l1.163,0.581l1.162,-0.581l2.036,-0.291l0.579,-0.580l1.163,0.000l0.873,0.290l0.871,0.872l0.873,1.162l1.453,1.742l0.291,1.161l-0.291,1.161l0.291,1.163l1.452,0.580l1.166,-0.580l1.161,0.580l0.289,0.581l-1.450,0.581l-0.874,0.000l-0.872,3.194l-1.454,-0.290l-2.035,-0.872l-3.196,0.581l-1.452,0.581l-4.071,0.000l-2.035,-0.581l-1.164,0.291l-0.581,-1.162l-0.581,-0.581l0.581,-0.291l-0.581,-0.289l-0.871,0.580l-1.745,-0.872l-0.289,-1.161l-1.454,-0.580l-0.293,-0.872l-1.741,-1.161l2.325,-0.581l1.742,-1.741l1.164,-2.034l-1.743,0.581z",
                            "RS": "M531.325,106.1l1.454,0.580l0.289,1.161l1.745,0.872l0.871,-0.580l0.581,0.289l-0.581,0.291l0.581,0.581l-0.871,0.581l0.290,1.161l1.454,1.162l-1.164,0.871l-0.580,0.871l0.290,0.289l-0.290,0.292l-1.165,0.000l-1.161,0.290l0.000,-0.290l0.290,-0.292l0.292,-0.580l-0.292,0.000l-0.579,-0.580l-0.583,0.000l-0.290,-0.581l-0.581,-0.290l-0.293,-0.291l-0.581,0.291l-0.289,0.871l-0.582,0.000l0.290,0.000l-1.162,-0.581l-0.872,-0.290l-0.290,-0.581l-0.873,-0.290l0.581,-0.291l0.582,-1.161l-1.455,-1.162l0.581,-1.161l-0.871,0.000l1.163,-0.872l-0.873,-0.870l-0.871,-1.163l2.326,-0.580l1.455,0.000l1.741,1.161l-0.293,-0.872z",
                            "RU": "M869.098,91.29l2.907,4.936l-4.07-0.87l-1.743,4.065l2.614,2.613v2.033l-2.034-1.743l-1.743,2.323l-0.582-2.323l0.292-2.904l-0.292-2.904l0.582-2.033v-3.775l-1.454-2.613l0.291-3.774l2.326-1.162l-0.872-1.452l1.163-0.29l0.58,1.742l1.162,2.614l-0.29,2.903L869.098,91.29zM536.265,81.417l-4.94,0.29l-3.488-0.29l0.58-1.452l3.779-0.872l2.906,0.581l1.454,0.291l-0.582,0.871L536.265,81.417zM969.382,36.116l-3.196,0.291l-0.581-0.871l3.777-1.162h-0.01l0.58-0.29h2.326l3.779,0.872v0.29l-2.907,0.871h-3.778H969.382zM869.098,29.728h-4.069l-5.814-0.29l-0.582-0.29l2.618-1.162h3.488l4.067,0.872L869.098,29.728zM888.574,24.501l-3.198,1.162l-4.36-0.291l-4.942-1.16l0.582-0.873l5.232,0.291L888.574,24.501zM873.167,23.049l-2.324,2.033h-9.884l-4.651,0.58l-5.521-1.742l1.454-1.742l3.778-0.582h7.266L873.167,23.049zM632.19,36.407l-1.743,0.291l-9.012-0.291l-0.581-1.161l-4.941-0.872l-0.581-1.452l2.907-0.582V30.89l5.232-2.323l-2.325-0.291l6.393-2.613l-0.578-1.162l6.104-1.452l9.011-1.742l9.3-0.581l4.653-0.871l5.23-0.581l2.036,1.162l-1.745,0.871l-9.883,1.452l-8.43,1.162l-8.43,2.613l-4.069,2.614l-4.361,2.904l0.584,2.033L632.19,36.407zM969.382,52.379h-0.291l-3.486,1.161l-3.488-0.29l2.615,1.452l1.454,2.323l1.455,0.58l0.289,1.162l-0.873,0.872l-4.94-0.582l-7.849,2.033l-2.325,0.291l-4.362,2.033l-4.069,1.742l-0.871,1.161l-4.069-2.033l-6.977,2.324l-1.452-1.162l-2.618,1.162l-3.488-0.291l-0.871,1.742l-3.486,2.613l0.29,1.162l2.906,0.582l-0.291,4.064h-2.615l-1.163,2.324l1.163,1.161l-4.651,1.452l-1.163,3.194l-4.07,0.582l-0.87,2.903l-3.781,2.613l-1.162-2.032l-1.163-3.775l-1.454-6.389l1.164-3.775l2.324-1.453l0.291-1.451l4.36-0.581l4.942-3.484l4.649-2.904l4.943-2.033l2.326-3.775h-3.489l-1.744,2.324l-6.977,3.194l-2.034-3.485l-7.269,0.872l-6.975,4.646l2.325,1.742l-6.105,0.58l-4.359,0.291l0.291-2.032l-4.358-0.292l-3.199,1.453l-8.431-0.581l-9.01,0.871l-9.013,5.227l-10.463,6.679l4.357,0.29l1.165,1.743l2.615,0.581l1.744-1.452l3.196,0.291l3.78,2.904l0.29,2.323l-2.326,2.904v3.194l-1.452,4.356l-4.07,4.066l-0.87,1.741l-3.781,3.194l-3.777,3.194l-1.744,1.742l-3.488,1.452l-1.744,0.291l-1.744-1.453l-3.78,2.033l-0.579,0.871l-0.292-0.582v-1.161l1.454-0.291l0.29-3.194l-0.581-2.324l2.325-0.871l3.198,0.291l2.034-2.613l0.871-2.904l1.163-1.162l1.454-2.323l-4.651,0.871l-2.325,0.872h-4.361l-0.871-2.614l-3.488-1.742l-4.651-0.871l-1.16-2.904l-0.874-1.453l-0.871-1.161l-1.744-2.903l-2.617-1.162l-4.067-0.58h-3.491l-3.486,0.58l-2.325,1.162l1.452,0.871v1.452l-1.452,0.872l-2.328,2.903v1.162l-4.068,1.742l-3.197-1.162l-3.197,0.291l-1.452-0.871l-1.745-0.291l-4.069,2.033l-3.488,0.291l-2.616,0.872l-3.49-0.581h-2.615l-1.743-1.453l-2.615-1.162l-2.618-0.291l-3.486,0.291l-2.617,0.582l-4.069-1.162l-0.29-2.324l-3.488-0.58l-2.326-0.29l-3.196-1.162l-2.907,2.903l1.163,1.453l-2.617,2.033l-4.07-0.581l-2.617-0.29l-1.741-1.162h-2.908l-2.616-0.871l-4.068,1.161l-5.232,2.324l-2.907,0.582l-1.163,0.29l-1.454-1.742l-3.488,0.291l-1.163-1.162l-2.034-0.582l-1.16-1.452l-1.455-0.581l-4.069,0.872l-3.78-1.742l-1.453,1.451l-6.104-6.968l-3.488-2.033l0.871-0.871l-6.975,2.613h-2.617l0.29-1.451l-3.488-0.872l-2.906,0.581l-0.872-2.904l-4.941-0.581l-2.326,1.161l-6.977,1.162l-1.454,0.582l-10.172,0.872l-1.454,1.161l2.036,1.743l-2.617,0.87l0.581,0.581l-2.617,1.452l4.361,1.742l-0.581,1.453l-3.78-0.291l-0.871,0.872l-3.488-1.452l-4.36,0.29l-2.906,1.162l-3.488-1.162l-5.812-2.032h-4.361l-5.814,3.194l-0.289,2.033l-2.906-1.742l-2.036,3.195l0.58,0.29l-1.452,2.324l2.326,1.742h2.034l1.743,1.741l-0.289,1.453l1.452,0.581l-1.163,1.452l-2.906,0.581l-2.615,2.614l2.615,2.613l-0.289,2.032l2.906,3.194l-1.744,1.162l-0.29,0.581h-1.165l-2.033-1.743h-0.873l-1.745-0.871l-0.581-1.162l-2.614-0.58l-1.745,0.58l-0.581-0.58l-3.78-1.162l-3.778-0.581l-2.325-0.581l-0.581,0.581l-3.488-2.323l-3.197-1.161l-2.326-1.743l2.034-0.29l2.328-2.324l-1.455-1.162l4.07-1.162l-0.292-0.581l-2.323,0.581v-1.161l1.452-0.871l2.615-0.291l0.582-0.871l-0.582-1.452l1.163-1.451l-0.29-0.873l-4.07-0.871h-1.454l-1.744-1.162l-2.034,0.291l-3.488-0.871V91.29l-0.871-1.162h-2.327l-0.29-0.871l0.873-0.581l-1.744-1.742l-2.906,0.29h-0.872l-0.584,0.582h-1.16l-0.583-2.033l-0.871-0.872l0.581-0.291l2.326,0.291l1.163-0.58l-0.872-0.872l-2.036-0.581l0.292-0.29l-1.163-0.581l-1.743-1.742l0.578-0.871l-0.289-1.162l-2.615-0.581l-1.454,0.291l-0.29-0.872l-2.907-0.581l-0.871-1.742l-0.291-1.161l-1.455-0.582l1.163-0.871l-0.582-2.613l1.745-1.742l-0.291-0.291l3.199-1.742l-2.908-1.162l5.813-3.485l2.617-1.742l0.871-1.162l-4.069-2.032l1.162-1.742l-2.325-2.033l1.744-2.324l-3.198-3.194l2.617-2.033l-4.362-1.743l0.584-2.033l2.034-0.29l4.942-1.161l2.615-0.872l4.651,1.743l7.557,0.58l10.465,3.195l2.035,1.162v1.741l-2.906,1.453l-4.651,0.871l-12.21-2.033l-2.033,0.291l4.651,2.033v1.161l0.292,2.904l3.486,0.872l2.036,0.58l0.581-1.161l-1.746-1.162l1.746-1.162l6.685,1.742l2.326-0.581l-1.745-2.033l6.396-2.903l2.323,0.29l2.617,0.871l1.745-1.742l-2.326-1.742l1.163-1.742l-2.034-1.452l7.848,0.872l1.453,1.452l-3.489,0.289v1.453l2.326,1.162l4.361-0.582l0.581-2.033l5.812-1.161l9.594-2.323h2.034l-2.907,1.742l3.488,0.29l2.034-0.871h5.232l4.069-1.161l3.197,1.452l2.906-1.742l-2.906-1.453l1.454-1.162l8.14,0.872l3.778,0.871l10.176,3.194l1.742-1.452l-2.907-1.452v-0.581l-3.197-0.291l0.874-1.162l-1.455-2.323v-0.871l4.943-2.323l1.742-2.613l2.035-0.582l7.268,0.872l0.581,1.451l-2.615,2.324l1.743,0.871l0.872,1.742l-0.581,3.775l3.198,1.743l-1.165,1.742l-5.521,4.066l3.197,0.29l1.161-0.871l2.907-0.872l0.874-1.161l2.325-1.453l-1.744-1.452l1.454-1.742l-3.198-0.291l-0.582-1.451l2.326-2.904l-3.778-2.324l4.94-1.741l-0.581-2.033h1.453l1.454,1.452l-1.163,2.613l2.907,0.581l-1.162-2.033l4.65-0.872l5.522-0.29l5.232,1.451l-2.617-2.032l-0.29-3.195l4.94-0.291h6.688l5.812-0.29l-2.324-1.451l3.197-1.743l3.197-0.29l5.521-1.162l7.27-0.58l0.872-0.582l7.268-0.291l2.325,0.582l6.104-1.452h4.94l0.873-1.161l2.615-1.162l6.396-1.161l4.651,0.87l-3.489,0.872l6.104,0.291l0.874,1.452l2.324-0.871h8.141l6.104,1.452l2.325,1.162l-0.873,1.451l-2.907,0.581l-7.267,1.743l-2.036,0.581l3.49,0.58l4.068,0.581l2.326-0.581l1.452,1.743l1.165-0.581l4.359-0.582l9.013,0.582l0.579,1.161l11.628,0.582v-2.033l5.814,0.291h4.359l4.651,1.451l1.163,1.742l-1.745,1.162l3.488,2.323l4.36,1.161l2.615-2.904l4.653,1.162l4.65-0.871l5.233,0.871l2.034-0.581l4.648,0.29l-2.033-2.614l3.488-1.161l24.998,1.741l2.327,1.743l7.267,2.032l11.045-0.581l5.524,0.581l2.324,1.162l-0.58,2.033l3.486,0.581l3.78-0.581h4.941l4.94,0.581l5.234-0.29l4.938,2.323l3.488-0.872l-2.322-1.742l1.162-1.162l8.721,0.872l5.812-0.292l7.848,1.453l4.069,1.162h-0.01l6.976,2.033l6.977,2.614v1.742l1.744,0.871l-0.581-2.033l7.559,0.291l5.231,2.613l-2.616,1.162l-4.651,0.29v2.613l-1.161,0.581h-2.617l-2.034-0.871l-3.779-0.871l-0.582-1.162l-2.615-0.58l-3.199,0.58l-1.452-1.162l0.581-0.872l-3.198,0.582l1.165,1.452l-1.745,1.162H969.382zM762.998,15.499l-15.406,1.162l4.94-3.484l2.328-0.291h2.034l6.977,1.742L762.998,15.499zM614.46,9.401l-3.488,0.291l-2.617,0.29l-0.289,0.581l-3.199,0.291l-3.197-0.581l1.743-0.871h-6.104l5.233-0.581h4.359l0.291,0.581l1.744-0.581l2.618-0.291l4.067,0.581L614.46,9.401zM748.754,14.047l-5.812,0.29l-7.85-0.87l-4.359-0.872l-2.325-2.033l-3.779-0.581l7.268-1.742L738,7.369l5.232,1.452l6.396,2.614L748.754,14.047z",
                            "RW": "M557.485,234.16l1.163,1.452l-0.289,1.741l-0.582,0.291l-1.454,-0.291l-0.874,1.743l-1.743,-0.290l0.293,-1.453l0.290,-0.290l0.000,-1.742l0.871,-0.580l0.582,0.290l-1.743,0.871z",
                            "SA": "M591.496,185.956l-0.291,-1.162l-0.873,-0.871l-0.290,-1.162l-1.453,-0.871l-1.454,-2.323l-0.582,-2.322l-2.034,-1.744l-1.163,-0.580l-1.743,-2.613l-0.292,-1.744l0.000,-1.741l-1.453,-2.904l-1.454,-1.162l-1.453,-0.580l-0.871,-1.452l0.000,-0.872l-0.581,-1.451l-0.874,-0.582l-1.162,-2.032l-1.452,-2.033l-1.456,-2.033l-1.452,0.000l0.290,-1.451l0.292,-0.871l0.292,-1.162l3.196,0.291l1.161,-0.582l0.581,-1.161l2.036,-0.290l0.581,-0.871l0.872,-0.581l-2.905,-2.614l5.522,-1.451l0.582,-0.582l3.488,0.873l4.067,2.032l7.561,5.517l5.230,0.000l2.326,0.290l0.873,1.452l1.743,0.000l1.165,2.323l1.452,0.581l0.289,0.871l2.036,1.162l0.290,1.162l-0.290,0.870l0.290,0.872l0.584,0.871l0.578,0.871l0.292,0.581l0.873,0.581l0.872,0.000l0.290,0.871l0.291,0.871l0.872,2.613l8.430,1.452l0.580,-0.580l1.165,2.031l-1.745,5.519l-8.430,2.613l-7.849,1.162l-2.615,1.161l-2.036,2.904l-1.163,0.291l-0.580,-0.873l-1.164,0.292l-2.615,-0.292l-0.582,-0.289l-3.197,0.000l-0.582,0.289l-1.161,-0.869l-0.873,1.451l0.289,1.161l1.161,-0.872z",
                            "SB": "M919.968,259.712l0.871,0.873h-2.034l-0.873-1.453l1.452,0.58H919.968zM916.48,257.972l-0.874,0.289l-1.743-0.289l-0.58-0.582v-1.161l2.034,0.581l0.873,0.58L916.48,257.972zM918.805,257.39l-0.291,0.582l-2.034-2.613l-0.582-1.453h0.871l0.873,2.033L918.805,257.39zM913.863,253.906v0.581l-2.034-1.161l-1.454-1.162l-1.161-0.871l0.579-0.29l1.164,0.871l2.326,1.161L913.863,253.906zM907.468,251.002l-0.581,0.29l-1.162-0.58l-1.163-1.162v-0.581l1.744,1.162L907.468,251.002z",
                            "SD": "M567.37,204.831l-0.582,0.000l0.000,-1.452l-0.292,-0.873l-1.453,-1.160l-0.292,-1.742l0.292,-2.033l-1.162,-0.291l-0.293,0.582l-1.452,0.289l0.582,0.582l0.291,1.742l-1.454,1.451l-1.453,2.033l-1.454,0.291l-2.325,-1.744l-1.163,0.582l0.000,0.871l-1.454,0.581l-0.290,0.582l-2.617,0.000l-0.289,-0.582l-2.035,0.000l-1.164,0.291l-0.581,-0.291l-1.452,-1.452l-0.584,-0.871l-2.033,0.581l-0.581,1.161l-0.872,2.324l-0.874,0.581l-0.872,0.289l-0.290,0.000l-0.871,-0.870l0.000,-0.870l0.289,-1.163l0.000,-1.162l-1.452,-1.742l-0.292,-1.162l0.000,-0.580l-1.162,-0.871l0.000,-1.453l-0.582,-1.161l-0.873,0.290l0.293,-1.161l0.580,-1.162l-0.289,-1.162l0.871,-0.870l-0.582,-0.581l0.872,-1.743l1.164,-2.032l2.324,0.291l0.000,-11.036l0.000,-0.870l3.199,-0.291l0.000,-5.228l11.045,0.000l10.755,0.000l10.755,0.000l0.874,2.615l-0.581,0.580l0.289,2.614l1.163,3.485l1.164,0.580l1.454,0.872l-1.454,1.742l-2.035,0.289l-0.874,0.873l-0.291,2.033l-1.161,4.065l0.290,0.870l-0.581,2.323l-0.872,2.904l-1.743,1.162l-1.163,2.322l-0.292,1.162l-1.454,0.582l-0.579,2.903l0.000,-0.291z",
                            "SE": "M534.813,50.346l-2.617,1.742l0.291,1.742l-4.362,2.324l-5.230,2.323l-2.036,3.774l2.036,2.033l2.615,1.452l-2.615,3.194l-2.907,0.581l-0.873,4.647l-1.744,2.613l-3.197,-0.291l-1.455,2.033l-3.196,0.291l-0.874,-2.614l-2.323,-3.194l-2.327,-3.776l1.455,-1.742l2.033,-1.742l1.162,-3.485l-1.743,-1.162l-0.290,-3.775l1.744,-2.612l2.907,0.000l0.873,-0.872l-1.165,-1.162l4.361,-3.774l2.907,-2.904l1.745,-2.033l2.615,0.000l0.582,-1.452l5.232,0.290l0.582,-1.742l1.744,-0.290l3.486,1.452l4.361,2.033l0.000,4.065l0.872,1.162l4.649,-0.871z",
                            "SI": "M511.848,102.905l2.326,0.291l1.162,-0.582l2.616,0.000l0.291,-0.580l0.582,0.000l0.582,1.162l-2.325,0.580l-0.293,1.162l-0.871,0.290l0.000,0.582l-1.163,0.000l-0.873,-0.291l-0.580,0.291l-1.743,0.000l0.581,-0.291l-0.581,-1.162l-0.289,1.452z",
                            "SK": "M525.802,94.774l0.000,0.291l1.160,-0.582l1.455,1.163l1.453,-0.581l1.455,0.291l2.033,-0.582l2.616,1.163l-0.872,0.870l-0.580,0.872l-0.582,0.290l-2.908,-0.872l-0.870,0.291l-0.582,0.581l-1.455,0.290l-0.289,0.000l-1.163,0.290l-1.163,0.290l-0.291,0.291l-2.324,0.581l-0.871,-0.290l-1.454,-0.872l-0.292,-0.870l0.292,-0.291l0.289,-0.581l1.165,0.000l0.871,-0.290l0.290,-0.291l0.289,-0.289l0.292,-0.581l0.582,0.000l0.580,-0.582l-0.874,0.000z",
                            "SL": "M442.376,212.381l-0.873,-0.291l-2.034,-1.161l-1.455,-1.452l-0.289,-0.871l-0.292,-2.033l1.455,-1.451l0.289,-0.582l0.292,-0.581l0.871,0.000l0.581,-0.580l2.326,0.000l0.582,0.871l0.581,1.163l0.000,0.870l0.582,0.581l0.000,1.161l0.581,-0.290l-1.163,1.451l-1.454,1.452l0.000,0.871l0.580,-0.872z",
                            "SN": "M427.84,193.505l-1.162,-2.032l-1.454,-1.161l1.164,-0.291l1.452,-2.032l0.582,-1.452l0.871,-0.872l1.456,0.291l1.452,-0.581l1.454,0.000l1.163,0.872l2.034,0.580l1.454,2.033l2.034,1.742l0.000,1.742l0.581,1.742l1.162,0.581l0.000,1.162l0.000,0.871l-0.289,0.290l-1.744,-0.290l0.000,0.290l-0.581,0.000l-2.036,-0.581l-1.453,0.000l-4.942,-0.290l-0.871,0.290l-0.874,0.000l-1.453,0.581l-0.291,-2.323l2.327,0.291l0.580,-0.581l0.582,0.000l1.163,-0.581l1.163,0.581l1.162,0.000l1.163,-0.581l-0.582,-0.872l-0.870,0.581l-0.873,0.000l-1.163,-0.581l-0.871,0.000l-0.581,0.581l2.909,0.000z",
                            "SO": "M610.681,199.023l1.452,-0.290l1.162,-0.871l1.165,0.000l0.000,0.871l-0.291,1.451l0.000,1.453l-0.582,1.161l-0.581,2.904l-1.452,2.904l-1.747,3.484l-2.323,4.066l-2.326,3.194l-3.199,3.775l-2.907,2.323l-4.068,2.613l-2.616,2.033l-2.908,3.486l-0.582,1.451l-0.580,0.581l-1.745,-2.323l0.000,-9.873l2.325,-3.196l0.874,-0.870l1.744,0.000l2.324,-2.033l3.780,0.000l7.850,-8.421l1.742,-2.323l1.163,-1.742l0.000,-1.452l0.000,-2.614l0.000,-1.161l0.290,0.000l0.873,0.000l-1.163,0.581z",
                            "SOL": "M608.355,204.831l-1.163,1.742l-1.742,2.323l-2.328,0.000l-9.010,-3.194l-1.163,-0.871l-0.873,-1.452l-1.163,-1.453l0.583,-1.161l1.161,-1.452l0.873,0.580l0.582,1.162l1.163,1.162l1.163,0.000l2.614,-0.580l3.199,-0.582l2.327,-0.580l1.452,-0.291l0.871,-0.580l1.744,0.000l-0.290,0.000l0.000,1.161l0.000,2.614l0.000,-1.452z",
                            "SR": "M316.509,214.415l3.198,0.580l0.290,-0.291l2.326,-0.289l2.907,0.580l-1.453,2.612l0.289,1.743l1.164,1.742l-0.582,1.161l-0.290,1.163l-0.581,1.162l-1.745,-0.581l-1.162,0.289l-1.163,-0.289l-0.291,0.870l0.581,0.581l-0.290,0.581l-1.454,-0.291l-1.744,-2.322l-0.291,-1.744l-0.872,0.000l-1.453,-2.032l0.581,-1.161l0.000,-0.872l1.453,-0.579l-0.582,2.613z",
                            "SS": "M567.37,204.831l0.000,2.322l-0.582,0.872l-1.455,0.000l-0.872,1.452l1.746,0.291l1.452,1.161l0.290,1.161l1.454,0.580l1.455,3.196l-1.745,1.741l-1.743,1.743l-1.745,1.162l-1.744,0.000l-2.326,0.580l-1.744,-0.580l-1.163,0.870l-2.325,-2.032l-0.874,-1.162l-1.450,0.581l-1.166,0.000l-0.873,0.291l-1.161,-0.291l-1.743,-2.323l-0.292,-0.871l-2.034,-0.871l-0.873,-1.743l-1.163,-1.161l-1.743,-1.452l0.000,-0.871l-1.452,-1.162l-2.037,-1.162l0.872,-0.289l0.874,-0.581l0.872,-2.324l0.581,-1.161l2.033,-0.581l0.584,0.871l1.452,1.452l0.581,0.291l1.164,-0.291l2.035,0.000l0.289,0.582l2.617,0.000l0.290,-0.582l1.454,-0.581l0.000,-0.871l1.163,-0.582l2.325,1.744l1.454,-0.291l1.453,-2.033l1.454,-1.451l-0.291,-1.742l-0.582,-0.582l1.452,-0.289l0.293,-0.582l1.162,0.291l-0.292,2.033l0.292,1.742l1.453,1.160l0.292,0.873l0.000,1.452l-0.582,0.000z",
                            "SV": "M232.211,194.086l-0.291,0.581l-1.743,0.000l-0.872,-0.290l-1.164,-0.581l-1.452,0.000l-0.873,-0.581l0.000,-0.580l0.873,-0.581l0.580,-0.291l0.000,-0.290l0.581,-0.291l0.873,0.291l0.582,0.581l0.872,0.581l0.000,0.289l1.161,-0.289l0.582,0.000l0.291,0.289l0.000,-1.162z",
                            "SY": "M580.45,139.204l-5.234,2.903l-3.195,-1.161l0.289,-0.290l0.000,-1.162l0.873,-1.452l1.452,-1.161l-0.581,-1.162l-1.163,0.000l-0.290,-2.033l0.582,-1.161l0.871,-0.582l0.581,-0.580l0.290,-1.742l0.873,0.580l2.907,-0.870l1.454,0.581l2.327,0.000l3.196,-0.872l1.453,0.000l3.197,-0.581l-1.454,1.742l-1.454,0.872l0.292,2.032l-1.163,3.195l6.103,-2.904z",
                            "SZ": "M562.136,304.433l-0.581,1.161l-1.744,0.290l-1.452,-1.451l-0.292,-0.871l0.870,-1.161l0.293,-0.581l0.872,-0.290l1.163,0.580l0.580,1.161l-0.291,-1.162z",
                            "TD": "M513.593,195.538l0.289,-1.161l-1.742,-0.291l0.000,-1.742l-1.165,-0.871l1.165,-3.775l3.486,-2.614l0.292,-3.484l1.164,-5.517l0.581,-1.162l-1.163,-0.871l0.000,-0.871l-1.164,-0.871l-0.581,-4.357l2.616,-1.451l11.046,5.226l11.045,5.227l0.000,11.036l-2.324,-0.291l-1.164,2.032l-0.872,1.743l0.582,0.581l-0.871,0.870l0.289,1.162l-0.580,1.162l-0.293,1.161l0.873,-0.290l0.582,1.161l0.000,1.453l1.162,0.871l0.000,0.580l-1.744,0.581l-1.452,1.161l-2.034,2.905l-2.617,1.452l-2.618,-0.291l-0.871,0.291l0.292,0.870l-1.454,0.872l-1.163,1.161l-3.488,1.162l-0.582,-0.580l-0.579,-0.291l-0.293,0.871l-2.325,0.290l0.290,-0.870l-0.872,-1.743l-0.289,-1.161l-1.165,-0.581l-1.742,-1.743l0.579,-1.161l1.455,0.289l0.581,-0.289l1.453,0.000l-1.453,-2.324l0.292,-2.032l-0.292,-1.743l1.162,1.742z",
                            "TF": "M663.583,364.542l1.746,0.872l2.617,0.581l0.000,0.291l-0.584,1.452l-4.360,0.000l0.000,-1.452l0.292,-1.161l-0.289,0.583z",
                            "TG": "M479,214.123l-2.324,0.581l-0.582,-1.162l-0.872,-1.742l0.000,-1.162l0.581,-2.613l-0.871,-0.872l-0.292,-2.322l0.000,-2.033l-0.871,-1.161l0.000,-0.872l2.616,0.000l-0.582,1.452l0.873,0.871l0.872,0.871l0.291,1.454l0.579,0.289l-0.290,6.388l-0.872,-2.033z",
                            "TH": "M756.022,197.571l-2.325,-1.452l-2.325,0.000l0.290,-2.033l-2.326,0.000l-0.291,2.904l-1.454,4.065l-0.871,2.613l0.290,1.745l1.744,0.289l1.163,2.323l0.291,2.613l1.745,1.452l1.453,0.291l1.454,1.452l-0.873,1.162l-1.744,0.289l-0.290,-1.451l-2.326,-1.163l-0.291,0.582l-1.163,-1.162l-0.582,-1.452l-1.452,-1.452l-1.163,-1.161l-0.582,1.452l-0.581,-1.452l0.292,-1.742l0.871,-2.615l1.452,-2.903l1.454,-2.614l-1.162,-2.322l0.290,-1.452l-0.582,-1.453l-1.741,-2.322l-0.582,-1.162l0.871,-0.580l1.163,-2.323l-1.163,-2.034l-1.744,-1.742l-1.455,-2.613l1.165,-0.290l1.163,-3.194l2.034,0.000l1.743,-1.163l1.454,-0.580l1.163,0.580l0.290,1.744l1.743,0.289l-0.579,2.904l0.000,2.323l2.907,-1.742l0.871,0.581l1.452,0.000l0.582,-0.871l2.036,0.000l2.325,2.323l0.000,2.613l2.327,2.324l-0.291,2.323l-0.872,1.451l-2.326,-0.581l-3.781,0.581l-1.741,2.323l-0.580,-3.485z",
                            "TJ": "M669.108,120.329l-0.873,0.871l-2.906,-0.582l-0.291,1.743l2.908,-0.290l3.488,0.871l5.233,-0.291l0.579,2.324l0.874,-0.291l1.743,0.582l0.000,1.160l0.292,1.742l-2.909,0.000l-1.745,-0.290l-1.744,1.162l-1.162,0.291l-1.161,0.581l-0.873,-0.872l0.000,-2.323l-0.581,0.000l0.291,-0.871l-1.454,-0.871l-1.455,1.161l-0.290,1.161l-0.289,0.291l-1.745,0.000l-0.872,1.162l-0.872,-0.582l-2.036,0.872l-0.871,-0.290l1.744,-2.614l-0.582,-2.032l-2.033,-0.871l0.579,-1.162l2.328,0.290l1.452,-1.743l0.872,-1.741l3.488,-0.582l-0.581,1.163l0.581,0.871l-0.873,0.000z",
                            "TL": "M817.647,255.359l0.580,-0.582l2.327,-0.580l1.744,-0.291l0.871,-0.290l1.164,0.290l-1.164,0.871l-2.905,1.162l-2.037,0.871l-0.290,-0.871l0.290,0.580z",
                            "TM": "M642.364,132.815l-0.289,-2.323l-2.034,0.000l-3.200,-2.324l-2.325,-0.290l-2.907,-1.452l-2.034,-0.290l-1.162,0.581l-1.745,-0.291l-2.036,1.742l-2.323,0.582l-0.582,-2.033l0.289,-2.904l-2.033,-0.871l0.581,-2.033l-1.743,0.000l0.578,-2.323l2.617,0.581l2.326,-0.872l-2.033,-1.742l-0.582,-1.451l-2.328,0.581l-0.289,2.032l-0.871,-1.742l1.160,-0.871l3.199,-0.581l2.034,0.871l1.744,2.033l1.455,0.000l3.199,0.000l-0.583,-1.452l2.325,-0.871l2.325,-1.742l3.778,1.451l0.292,2.324l1.163,0.580l2.907,-0.290l0.871,0.580l1.455,2.904l2.906,1.742l2.034,1.453l2.909,1.162l3.487,1.160l0.000,1.742l-0.871,0.000l-1.164,-0.871l-0.580,1.162l-2.326,0.291l-0.583,2.323l-1.454,0.870l-2.325,0.291l-0.581,1.452l-2.034,0.291l2.617,1.162z",
                            "TN": "M499.931,147.625l-1.163,-4.936l-1.745,-1.162l0.000,-0.581l-2.325,-1.742l-0.290,-2.034l1.745,-1.451l0.579,-2.323l-0.290,-2.614l0.581,-1.451l2.908,-1.163l2.034,0.291l-0.291,1.453l2.325,-0.872l0.292,0.291l-1.454,1.451l0.000,1.161l1.162,0.872l-0.580,2.324l-1.745,1.451l0.582,1.452l1.452,0.000l0.583,1.452l1.163,0.290l-0.291,2.032l-1.164,0.873l-0.872,0.870l-2.034,1.162l0.290,1.161l-0.290,1.162l1.162,-0.581z",
                            "TR": "M575.509,117.135l3.777,1.161l3.199-0.291l2.323,0.291l3.489-1.451l2.906-0.291l2.615,1.452l0.292,0.872l-0.292,1.452l2.036,0.58l1.162,0.872l-1.743,0.871l0.87,2.904l-0.579,0.871l1.452,2.324l-1.452,0.581l-0.873-0.872l-3.197-0.291l-1.164,0.291l-3.196,0.581h-1.453l-3.196,0.872h-2.327l-1.454-0.581l-2.906,0.871l-0.873-0.58l-0.29,1.742l-0.581,0.58l-0.871,0.582l-0.873-1.452l0.873-0.872l-1.455,0.291l-2.325-0.871l-2.033,1.742l-4.07,0.29l-2.326-1.452h-2.906l-0.582,1.162l-2.036,0.29l-2.615-1.452h-2.906l-1.744-2.904l-2.034-1.452l1.455-2.033l-1.747-1.452l2.907-2.613h4.361l1.163-2.033l5.232,0.29l3.197-1.742l3.196-0.871h4.65L575.509,117.135zM548.764,119.167l-2.325,1.451l-0.871-1.451v-0.581l0.581-0.291l0.871-1.742l-1.452-0.581l2.907-0.871l2.324,0.29l0.291,1.162l2.615,0.872l-0.58,0.58l-3.198,0.291L548.764,119.167z",
                            "TT": "M304.01,201.346l1.454,-0.291l0.581,0.000l0.000,2.033l-2.326,0.291l-0.581,-0.291l0.872,-0.582l0.000,1.160z",
                            "TW": "M808.926,163.886l-1.744,4.356l-1.163,2.322l-1.452,-2.322l-0.292,-2.033l1.744,-2.614l2.325,-2.322l1.163,0.871l0.581,-1.742z",
                            "TZ": "M567.077,233.58l0.582,0.289l9.883,5.517l0.291,1.742l3.780,2.615l-1.163,3.484l0.000,1.452l1.744,1.161l0.292,0.581l-0.873,1.743l0.289,0.871l-0.289,1.162l0.873,1.742l1.161,2.903l1.162,0.581l-2.323,1.452l-2.907,1.162l-1.746,0.000l-0.872,0.581l-2.036,0.289l-0.581,0.291l-3.486,-0.872l-2.036,0.292l-0.582,-3.776l-1.163,-1.161l-0.289,-0.871l-2.907,-0.581l-1.456,-0.870l-1.743,-0.291l-1.161,-0.581l-1.162,-0.581l-1.455,-3.485l-1.744,-1.452l-0.290,-1.742l0.290,-1.452l-0.581,-2.324l1.163,-0.289l0.872,-0.870l1.163,-1.454l0.582,-0.580l0.000,-0.872l-0.582,-0.871l0.000,-0.871l0.582,-0.291l0.289,-1.741l-1.163,-1.452l0.874,-0.291l3.196,0.000l-5.522,0.289z",
                            "UA": "M561.265,87.806l1.160,0.000l0.584,-0.582l0.872,0.000l2.907,-0.290l1.744,1.742l-0.873,0.581l0.290,0.871l2.327,0.000l0.871,1.162l0.000,0.581l3.488,0.870l2.034,-0.290l1.745,1.162l1.454,0.000l4.070,0.870l0.290,0.873l-1.163,1.451l0.582,1.452l-0.582,0.871l-2.615,0.291l-1.452,0.871l0.000,1.161l-2.329,0.292l-1.744,0.869l-2.615,0.000l-2.323,1.162l0.289,1.743l1.161,0.581l2.907,-0.290l-0.580,1.161l-2.906,0.290l-3.781,1.742l-1.452,-0.581l0.582,-1.451l-3.198,-0.581l0.579,-0.580l2.619,-0.872l-0.874,-0.581l-4.068,-0.871l-0.292,-0.872l-2.614,0.291l-0.874,1.452l-2.325,2.033l-1.161,-0.580l-1.166,0.580l-1.452,-0.580l0.872,-0.291l0.291,-0.872l0.872,-0.871l-0.291,-0.580l0.581,-0.291l0.293,0.581l1.743,0.000l0.581,-0.290l-0.290,-0.291l0.000,-0.291l-0.873,-0.580l-0.290,-1.162l-1.164,-0.580l0.293,-0.871l-1.166,-0.872l-1.162,0.000l-2.034,-0.870l-2.033,0.290l-0.584,0.290l-1.163,0.000l-0.579,0.580l-2.036,0.291l-1.162,0.581l-1.163,-0.581l-1.745,0.000l-1.744,-0.581l-1.163,0.581l-0.291,-0.581l-1.452,-0.870l0.580,-0.872l0.872,-0.870l0.582,0.289l-0.872,-1.452l2.617,-2.033l1.452,-0.580l0.292,-0.580l-1.455,-2.614l1.163,0.000l1.746,-0.581l2.035,-0.291l2.615,0.291l3.196,0.581l2.036,0.290l1.163,0.291l1.162,-0.581l0.583,0.581l2.615,0.000l0.873,0.289l0.290,-1.451l0.870,-0.580l-2.328,0.000z",
                            "UG": "M561.555,233.869l-3.196,0.000l-0.874,0.291l-1.743,0.871l-0.582,-0.290l0.000,-2.324l0.582,-0.871l0.291,-2.324l0.581,-1.161l1.163,-1.451l0.871,-0.872l0.873,-0.871l-1.162,-0.289l0.289,-3.196l1.163,-0.870l1.744,0.580l2.326,-0.580l1.744,0.000l1.745,-1.162l1.452,1.742l0.291,1.452l1.163,3.194l-1.163,2.033l-1.164,1.742l-0.872,1.161l0.000,2.906l5.522,-0.289z",
                            "US": "M45.593,178.406l-0.292,0.581l-0.873-0.581l0.292-0.581l-0.582-1.162l0.29-0.291l0.292-0.29l-0.292-0.582l0.292-0.29h0.291l0.872,0.581l0.582,0.291l0.581,0.29l0.582,0.872v0.29l-1.162,0.581L45.593,178.406zM44.14,174.05l-0.872,0.29l-0.582-0.581l-0.292-0.29l0.292-0.291l0.872,0.291l0.872,0.29L44.14,174.05zM42.395,172.598l-0.29,0.291h-1.453l0.29-0.291H42.395zM39.779,172.308v0.29l-0.291-0.29h-0.873l-0.582-0.582l0.873-0.581v0.291L39.779,172.308zM35.128,170.564l-0.291,0.292l-0.872-0.582v-0.291l0.581-0.29l0.582,0.29V170.564zM212.735,95.065l0.582,1.452l0.871,0.581l1.744,0.291l2.907,0.291l2.616,0.871l2.325-0.291l3.488,0.581h0.872l2.326-0.87l2.617,1.161l2.616,1.162l2.326,0.872l2.035,0.871l0.291,0.58l0.582,0.291v0.291h0.58l0.583-0.291l0.29,0.871l0.583,0.291h0.581l0.581,0.29l-0.581,0.581l2.906,1.162l0.583,2.613l0.58,2.323l-0.872,1.742l-1.163,1.451l-0.581,0.873v0.29l0.292,0.581l0.872,0.29h0.581l3.197-1.452l2.907-0.29l3.488-1.453l0.291-0.291l-0.291-0.871l-0.582-0.581l1.454-0.291h2.616h2.616l0.872-1.162l0.291-0.29l2.907-1.743l1.163-0.581h4.07h5.232l0.292-0.871h0.872l1.162-0.58l0.872-1.162l0.873-2.033l2.035-2.032l0.872,0.581l2.035-0.581l1.163,0.87v3.775l1.744,1.452l0.582,1.161l-2.907,1.162l-2.907,0.872l-2.907,0.872l-1.453,1.742l-0.582,0.581v1.453l0.872,1.451h1.163l-0.291-0.871l0.872,0.581l-0.291,0.871l-1.744,0.291h-1.162l-2.036,0.581h-1.452l-1.454,0.291l-2.326,0.58l4.07-0.291l0.872,0.291l-4.07,0.872H270l0.291-0.29l-0.872,0.872h0.872l-0.582,2.032l-2.035,2.033l-0.291-0.58l-0.582-0.291l-0.872-0.581l0.582,1.452l0.582,0.58v0.873l-0.873,1.161l-1.453,2.033h-0.291l0.873-1.742l-1.454-1.162l-0.291-2.322l-0.58,1.16l0.58,1.743l-1.744-0.291l1.744,0.871l0.291,2.614l0.873,0.291l0.291,0.871l0.291,2.613l-1.745,2.033l-2.907,0.871l-1.743,1.742H257.5l-1.452,1.162l-0.291,0.87l-2.907,1.744l-1.744,1.451l-1.163,1.452l-0.582,2.033l0.582,1.742l0.873,2.614l1.163,1.742v1.161l1.453,3.195v2.032l-0.29,0.871l-0.582,1.742l-0.873,0.291l-1.453-0.291l-0.291-1.161l-1.163-0.582l-1.454-2.323l-1.162-2.032l-0.583-1.161l0.583-1.743l-0.583-1.742l-2.325-2.323l-0.873-0.291l-2.906,1.162h-0.581l-1.163-1.451l-1.744-0.581l-3.197,0.29l-2.326-0.29l-2.326,0.29l-0.872,0.291l0.292,0.87v1.162l0.581,0.582l-0.581,0.29l-0.872-0.581l-1.164,0.581h-2.034l-2.035-1.452l-2.325,0.291l-2.035-0.581l-1.745,0.29l-2.325,0.581l-2.325,2.033l-2.908,1.162l-1.452,1.162l-0.582,1.451v1.742v1.452l0.582,0.871h-1.163l-1.744-0.58l-2.326-0.872l-0.581-1.162l-0.582-2.033l-1.744-1.452l-0.873-1.742l-1.453-1.742l-2.034-1.162h-2.036l-1.743,2.323l-2.326-0.871l-1.454-0.871l-0.872-1.453l-0.872-1.451l-1.454-1.162l-1.454-0.871l-1.163-1.162h-4.65v1.162h-2.326h-5.232l-6.395-1.742l-4.07-1.451l0.29-0.582l-3.487,0.291l-3.198,0.291l-0.581-1.453l-1.744-1.451l-1.163-0.582l-0.291-0.58l-1.743-0.291l-0.872-0.581l-2.616-0.29l-0.582-0.582l-0.291-1.452l-2.908-2.904l-2.034-3.775v-0.582l-1.163-0.871l-2.326-2.323l-0.291-2.322l-1.454-1.453l0.582-2.322v-2.324l-0.872-2.032l0.872-2.614l0.582-2.613l0.291-2.323l-0.581-3.775l-0.873-2.323l-0.872-1.162l0.291-0.58l4.069,0.87l1.454,2.613l0.581-0.87l-0.291-2.033l-0.872-2.324h7.849h8.139h2.616h8.43h8.14h8.138h8.43h9.302h9.302h5.813v-1.161H212.735zM52.569,73.867l-2.616,1.162l-1.454-0.871l-0.581-1.162l2.616-1.162l1.454-0.29l1.744,0.29l1.163,0.871L52.569,73.867zM17.978,66.316l-1.744,0.291l-1.745-0.581l-1.744-0.582l2.907-0.581l2.035,0.291L17.978,66.316zM1.118,55.572l1.744,0.582l1.744-0.291l2.035,0.581l2.907,0.581l-0.291,0.29l-2.035,0.581l-2.326-0.87l-0.872-0.291H1.409l-0.582-0.29L1.118,55.572zM47.046,35.246l1.744,1.161l1.453-0.291h4.651l-0.291,0.582l4.36,0.58l2.617-0.29l5.813,0.871l5.232,0.29l2.326,0.291l3.488-0.291l4.36,0.581l2.907,0.581v10.164v15.681h2.616l2.616,0.872l2.035,1.162L95.3,68.93l2.906-1.452l2.616-0.871l1.454,1.451l1.744,1.162l2.616,1.162l1.744,2.033l2.908,2.903l4.65,1.742v1.743l-1.454,1.452l-1.454-1.162l-2.615-0.871l-0.583-2.323l-3.778-2.323l-1.454-2.324l-2.616-0.291h-4.361l-3.197-0.871l-5.814-2.903l-2.616-0.581l-4.651-0.872l-3.778,0.291l-5.523-1.453l-3.198-1.161l-3.197,0.581l0.581,2.033l-1.454,0.29l-3.196,0.58l-2.326,0.873l-3.198,0.581l-0.291-1.742l1.163-2.614l2.907-0.871l-0.582-0.581l-3.488,1.452l-2.035,1.742l-4.07,2.033l2.035,1.161l-2.617,2.033l-2.907,1.162l-2.616,0.871l-0.872,1.162l-4.07,1.451l-0.872,1.452l-3.198,1.162l-2.035-0.29l-2.615,0.871l-2.617,0.87l-2.326,0.872l-4.65,0.871l-0.581-0.582l2.907-1.162l2.906-0.87l2.907-1.453l3.489-0.291l1.163-1.161l3.779-1.742l0.582-0.581l2.035-0.873l0.58-2.033l1.455-1.742l-3.198,0.872l-0.872-0.582L36,70.382l-1.745-1.453l-0.872,0.872l-1.162-1.162l-2.617,0.871h-1.743l-0.292-1.453l0.581-1.162l-1.744-0.87l-3.487,0.581l-2.326-1.452l-2.035-0.581v-1.452l-2.035-1.162l1.163-1.742l2.035-1.452l1.163-1.452l2.035-0.29l2.034,0.58l2.036-1.451l2.035,0.29l2.326-0.872l-0.583-1.161l-1.743-0.582l2.034-1.162h-1.453l-2.906,0.871l-0.873,0.581l-2.325-0.581l-3.779,0.291l-4.07-0.871l-1.163-0.871l-3.487-1.742l3.778-1.162l6.105-1.451h2.325l-0.29,1.451h5.814l-2.327-1.742l-3.197-1.162l-2.034-1.162l-2.616-1.161l-3.779-0.871l1.455-1.452l4.941-0.291l3.488-1.162l0.582-1.453l2.906-1.161l2.617-0.291L36,36.116h2.616l4.07-1.452L47.046,35.246z",
                            "UY": "M315.056,314.017l1.744,-0.292l2.907,2.033l0.872,0.000l2.907,1.743l2.325,1.451l1.454,2.032l-1.163,1.164l0.872,1.740l-1.453,1.742l-2.907,1.453l-2.035,-0.582l-1.454,0.291l-2.616,-1.162l-2.035,0.000l-1.453,-1.452l0.000,-1.741l0.872,-0.580l-0.291,-2.905l0.872,-2.614l-0.582,2.321z",
                            "UZ": "M656.899,128.168l0.000,-1.742l-3.487,-1.160l-2.909,-1.162l-2.034,-1.453l-2.906,-1.742l-1.455,-2.904l-0.871,-0.580l-2.907,0.290l-1.163,-0.580l-0.292,-2.324l-3.778,-1.451l-2.325,1.742l-2.325,0.871l0.583,1.452l-3.199,0.000l0.000,-10.164l6.976,-1.742l0.580,0.291l4.071,2.031l2.324,0.872l2.618,2.614l3.196,-0.291l4.944,-0.290l3.196,2.032l-0.290,2.614l1.453,0.000l0.581,2.323l3.489,0.000l0.580,1.452l1.163,0.000l1.163,-2.032l3.779,-2.033l1.454,-0.291l0.872,0.291l-2.326,1.742l2.035,0.871l2.034,-0.580l3.199,1.451l-3.488,2.032l-2.326,-0.289l-0.873,0.000l-0.581,-0.871l0.581,-1.163l-3.488,0.582l-0.872,1.741l-1.452,1.743l-2.328,-0.290l-0.579,1.162l2.033,0.871l0.582,2.032l-1.744,2.614l-2.035,-0.582l1.453,0.000z",
                            "VE": "M277.558,198.442l-0.290,0.871l-1.454,0.291l0.872,1.161l0.000,1.452l-1.454,1.451l1.164,2.324l1.162,-0.290l0.582,-1.743l-0.872,-1.161l0.000,-2.033l3.487,-1.161l-0.582,-1.162l1.163,-0.871l0.872,1.742l2.035,0.291l1.744,1.451l0.000,0.871l2.617,0.000l2.907,-0.289l1.452,1.161l2.326,0.290l1.455,-0.582l0.000,-0.869l3.487,0.000l3.198,-0.291l-2.326,0.871l0.872,1.451l2.326,0.000l2.034,1.454l0.291,2.323l1.453,-0.292l1.164,0.872l-2.036,1.452l-0.290,1.161l0.872,0.871l-0.582,0.581l-1.743,0.580l0.000,1.163l-0.873,0.582l2.035,2.322l0.291,0.580l-0.872,1.162l-3.198,0.871l-2.035,0.580l-0.581,0.582l-2.326,-0.582l-2.034,-0.290l-0.582,0.000l1.163,0.872l0.000,1.741l0.292,1.744l2.324,0.289l0.291,0.581l-2.035,0.871l-0.291,1.162l-1.162,0.291l-2.036,0.870l-0.580,0.582l-2.036,0.289l-1.452,-1.451l-0.872,-2.614l-0.873,-1.162l-0.872,-0.580l1.454,-1.453l-0.291,-0.580l-0.582,-0.580l-0.581,-2.033l0.000,-2.033l0.872,-0.871l0.291,-1.452l-0.872,-0.290l-1.454,0.290l-2.034,-0.290l-1.163,0.290l-2.035,-2.323l-1.453,-0.291l-3.488,0.291l-0.872,-1.162l-0.583,0.000l0.000,-0.581l0.292,-1.161l-0.292,-1.161l-0.580,-0.582l-0.291,-1.161l-1.453,-0.290l0.581,-1.452l0.582,-2.033l0.581,-1.162l1.163,-0.580l0.581,-1.452l-2.035,0.581z",
                            "VN": "M771.137,171.726l-3.488,2.324l-2.326,2.614l-0.581,1.742l2.034,2.904l2.617,3.774l2.325,1.743l1.744,2.033l1.163,5.226l-0.290,4.647l-2.327,2.032l-3.195,1.741l-2.037,2.325l-3.486,2.322l-1.164,-1.740l0.872,-1.745l-2.034,-1.451l2.326,-1.162l2.906,-0.290l-1.162,-1.742l4.651,-2.033l0.289,-3.194l-0.581,-2.033l0.581,-2.614l-0.870,-2.032l-2.036,-1.742l-1.745,-2.614l-2.325,-3.194l-3.197,-1.742l0.870,-0.872l1.747,-0.580l-1.165,-2.614l-3.488,0.000l-1.161,-2.322l-1.454,-2.324l1.454,-0.580l2.034,0.000l2.615,-0.291l2.329,-1.451l1.452,0.870l2.615,0.581l-0.581,1.742l1.454,0.872l-2.615,-0.870z",
                            "VU": "M935.666,276.266l-0.872,0.291l-0.874-1.163v-0.871L935.666,276.266zM933.628,271.91l0.583,2.324l-0.874-0.292h-0.58l-0.29-0.58v-2.322L933.628,271.91z",
                            "YE": "M619.983,185.084l-2.034,0.872l-0.583,1.161l0.000,0.872l-2.616,1.160l-4.651,1.453l-2.326,1.742l-1.162,0.291l-0.871,-0.291l-1.744,1.161l-1.745,0.581l-2.327,0.291l-0.580,0.000l-0.581,0.871l-0.582,0.000l-0.581,0.871l-1.455,-0.290l-0.870,0.580l-1.745,-0.290l-0.873,-1.452l0.292,-1.452l-0.581,-0.871l-0.581,-2.032l-0.874,-1.163l0.583,-0.289l-0.291,-1.162l0.582,-0.581l-0.291,-1.161l1.161,-0.872l-0.289,-1.161l0.873,-1.451l1.161,0.869l0.582,-0.289l3.197,0.000l0.582,0.289l2.615,0.292l1.164,-0.292l0.580,0.873l1.163,-0.291l2.036,-2.904l2.615,-1.161l7.849,-1.162l2.325,4.645l-0.873,-1.743z",
                            "ZA": "M560.392,311.403l-0.29,0.291l-1.165,1.451l-0.87,1.451l-1.453,2.034l-3.198,2.902l-2.034,1.451l-2.036,1.453l-2.906,0.871l-1.452,0.29l-0.293,0.58l-1.743-0.29l-1.161,0.581l-3.199-0.581l-1.452,0.29h-1.164l-2.906,0.872l-2.325,0.58l-1.744,0.871l-1.162,0.29l-1.163-1.161h-0.871l-1.454-1.161v0.292l-0.29-0.583v-1.741l-0.873-1.742l0.873-0.581v-2.032l-2.034-2.613l-1.165-2.323l-2.034-3.484l1.163-1.453l1.163,0.58l0.582,1.162l1.162,0.29l1.744,0.581l1.452-0.29l2.325-1.451v-10.163l0.874,0.58l1.741,2.613l-0.289,1.741l0.582,0.872l2.033-0.29l1.164-1.162l1.452-0.87l0.582-1.453l1.454-0.58l1.162,0.29l1.162,0.872h2.326l1.744-0.582l0.289-0.87l0.584-1.161l1.452-0.293l0.874-1.16l0.871-1.742l2.324-2.032l4.07-2.033h1.163l1.163,0.581l0.871-0.289l1.454,0.289l1.452,3.774l0.582,2.033l-0.29,2.903v1.162l-1.163-0.58l-0.872,0.29l-0.293,0.581l-0.87,1.161l0.292,0.871l1.452,1.451l1.744-0.29l0.581-1.161h2.034l-0.582,2.031l-0.579,2.323l-0.584,1.162L560.392,311.403zM553.416,310.531l-1.162-0.87l-1.163,0.579l-1.453,1.163l-1.454,1.742l2.036,2.032l0.871-0.291l0.581-0.869l1.454-0.292l0.58-0.871l0.873-1.451L553.416,310.531z",
                            "ZM": "M563.881,256.229l1.452,1.452l0.582,2.322l-0.582,0.582l-0.290,2.322l0.290,2.323l-0.872,0.873l-0.580,2.612l1.452,0.580l-8.429,2.325l0.292,2.033l-2.036,0.289l-1.744,1.162l-0.291,0.871l-0.872,0.291l-2.616,2.322l-1.454,1.744l-0.872,0.000l-0.872,-0.291l-3.197,-0.291l-0.291,-0.291l-0.290,-0.289l-0.871,-0.582l-1.745,0.000l-2.326,0.582l-1.745,-1.744l-2.034,-2.322l0.289,-8.711l5.524,0.000l0.000,-0.873l0.292,-1.161l-0.583,-1.161l0.291,-1.452l-0.291,-0.871l1.164,0.290l0.000,0.872l1.454,-0.291l1.743,0.291l0.871,1.452l2.036,0.291l1.745,-0.873l0.581,1.452l2.325,0.291l0.872,1.162l1.163,1.451l2.033,0.000l-0.289,-2.904l-0.581,0.581l-2.035,-1.160l-0.584,-0.291l0.293,-2.904l0.580,-3.195l-0.873,-1.161l0.873,-1.742l0.873,-0.290l3.490,-0.581l1.163,0.290l1.162,0.581l1.161,0.581l1.743,0.291l-1.456,-0.870z",
                            "ZW": "M559.521,292.237l-1.454,-0.289l-0.871,0.289l-1.163,-0.581l-1.163,0.000l-1.745,-1.162l-2.326,-0.579l-0.580,-1.744l0.000,-0.870l-1.455,-0.292l-2.907,-2.903l-0.870,-1.742l-0.582,-0.580l-1.163,-2.034l3.197,0.291l0.872,0.291l0.872,0.000l1.454,-1.744l2.616,-2.322l0.872,-0.291l0.291,-0.871l1.744,-1.162l2.036,-0.289l0.000,0.870l2.325,0.000l1.452,0.581l0.582,0.582l1.163,0.289l1.452,0.871l0.000,3.486l-0.582,2.032l0.000,2.033l0.293,0.870l-0.293,1.452l-0.289,0.290l-0.874,2.033l2.904,-3.195z"

                        }
                    }
                }
            });

            return Mapael;
        });
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/charts/map.js", ["raphael", "jquery-mapael", "jquery-mapael/js/maps/world_countries"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: map
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("raphael");
    $__require("jquery-mapael");
    $__require("jquery-mapael/js/maps/world_countries");
    $(function () {
        // Plots params
        var plots = {
            'paris': {
                'latitude': 48.86, 'longitude': 2.3444,
                'text': { 'position': 'left', content: 'Paris' }, href: ''
            },
            'newyork': {
                'latitude': 40.667, 'longitude': -73.833,
                'text': { content: 'New york' }, href: ''
            },
            'sydney': {
                'latitude': -33.917, 'longitude': 151.167,
                'text': { content: 'Sydney' }, href: ''
            },
            'brasilia': {
                'latitude': -15.781682, 'longitude': -47.924195,
                'text': { content: 'Brasilia' }, href: ''
            },
            'tokyo': {
                'latitude': 35.687418, 'longitude': 139.692306,
                'text': { content: 'Tokyo' }, href: ''
            }
        };
        // Mapael initialisation
        var $world = $('.world-map');
        $world.find('.hamburger-btn').click(function () {
            $world.find('.search-results').transition();
        });
        $world.mapael({
            map: {
                name: 'world_countries',
                defaultArea: {
                    attrs: { fill: '#f4fafc', stroke: '#797d81', 'stroke-width': 0.3 },
                    attrsHover: { fill: '#e19941' }
                },
                defaultPlot: {
                    text: {
                        attrs: { fill: '#797d81', 'font-size': 12, 'font-family': 'Open Sans' },
                        attrsHover: { fill: '#f4fafc', 'font-weight': 'bold' }
                    }
                },
                zoom: {
                    enabled: true, maxLevel: 10, mousewheel: false, buttons: {
                        in: { cssClass: 'btn-sm-icon btn btn-default zoomIn zoomButton' },
                        out: { cssClass: 'btn-sm-icon btn btn-default zoomOut zoomButton' },
                        reset: {
                            cssClass: 'btn-sm-icon btn btn-default zoomReset zoomButton',
                            content: '<i class="fa fa-crosshairs"></i>'
                        }
                    }
                },
                afterInit: function () {
                    $world.find('.hamburger-btn').click(function () {});
                    $world.find('.item').on('click', 'a', function () {
                        var plot = $(this).data('href');
                        if (plots[plot]) {
                            $world.trigger('zoom', {
                                level: 10,
                                latitude: plots[plot].latitude,
                                longitude: plots[plot].longitude
                            });
                        }
                    });
                }
            },
            legend: {
                area: {
                    display: true, marginBottom: 14, marginLeft: 0,
                    titleAttrs: {
                        'font-size': 16,
                        'font-family': 'Open Sans',
                        y: 200
                    },
                    slices: [{
                        max: 5000000,
                        attrs: { fill: '#5b667f' },
                        label: 'Less than 5M'
                    }, {
                        min: 5000000, max: 10000000,
                        attrs: { fill: '#42495c' },
                        label: 'Between 5M and 10M'
                    }, {
                        min: 10000000, max: 50000000,
                        attrs: { fill: '#353b4a' },
                        label: 'Between 10M and 50M'
                    }, {
                        min: 50000000,
                        attrs: { fill: '#0f1015' },
                        label: 'More than 50M'
                    }]
                },
                plot: {
                    display: true, marginBottom: 14, marginLeft: 0,
                    slices: [{
                        type: 'circle',
                        max: 500000,
                        attrs: { fill: '#71bb54', 'stroke-width': 0 },
                        attrsHover: { transform: 's1.5', 'stroke-width': 0 },
                        label: 'Less than 500 000',
                        size: 10
                    }, {
                        type: 'circle',
                        min: 500000, max: 1000000,
                        attrs: { fill: '#71bb54', 'stroke-width': 0 },
                        attrsHover: { transform: 's1.5', 'stroke-width': 0 },
                        label: 'Between 500 000 and 1M',
                        size: 18
                    }, {
                        type: 'circle',
                        min: 1000000,
                        attrs: { fill: '#71bb54', 'stroke-width': 0 },
                        attrsHover: { transform: 's1.5', 'stroke-width': 0 },
                        label: 'More than 1M',
                        size: 25
                    }]
                }
            },
            plots: $.extend(true, {}, {
                'paris': {
                    value: 382495,
                    tooltip: { content: '<span>Paris</span><br />Sales: $ 382400' }
                },
                'newyork': {
                    value: 881903,
                    tooltip: { content: '<span>New-York</span><br />Sales: $ 881900' }
                },
                'sydney': {
                    value: 695496,
                    tooltip: { content: '<span>Sydney</span><br />Sales: $ 695400' }
                },
                'brasilia': {
                    value: 392706,
                    tooltip: { content: '<span>Brasilia</span><br />Sales: $ 392700' }
                },
                'tokyo': {
                    value: 1491797,
                    tooltip: { content: '<span>Tokyo</span><br />Sales: $ 1491700' }
                }
            }, plots),
            areas: {
                'AF': {
                    value: 5246680, href: '',
                    tooltip: { content: '<span>Afghanistan</span><br />Sales: $ 52466800' }
                },
                'ZA': {
                    value: 2608826, href: '',
                    tooltip: { content: '<span>South Africa</span><br />Sales: $ 26108800' }
                },
                'AL': {
                    value: 535599460, href: '',
                    tooltip: { content: '<span>Albania</span><br />Sales: $ 53559900' }
                },
                'DZ': {
                    value: 49796088, href: '',
                    tooltip: { content: '<span>Algeria</span><br />Sales: $ 49796000' }
                },
                'DE': {
                    value: 76718374, href: '',
                    tooltip: { content: '<span>Germany</span><br />Sales: $ 16718300' }
                },
                'AD': {
                    value: 26774219, href: '',
                    tooltip: { content: '<span>Andorra</span><br />Sales: $ 26774200' }
                },
                'AO': {
                    value: 54956540, href: '',
                    tooltip: { content: '<span>Angola</span><br />Sales: $ 54956500' }
                },
                'AG': {
                    value: 56018610, href: '',
                    tooltip: { content: '<span>Antigua And Barbuda</span><br />Sales: $ 56018600' }
                },
                'SA': {
                    value: 54792020, href: '',
                    tooltip: { content: '<span>Saudi Arabia</span><br />Sales: $ 54792000' }
                },
                'AR': {
                    value: 47445276, href: '',
                    tooltip: { content: '<span>Argentina</span><br />Sales: $ 47445200' }
                },
                'AM': {
                    value: 20670517, href: '',
                    tooltip: { content: '<span>Armenia</span><br />Sales: $ 20670500' }
                },
                'AU': {
                    value: 6435858, href: '',
                    tooltip: { content: '<span>Australia</span><br />Sales: $ 6435800' }
                },
                'AT': {
                    value: 59990860, href: '',
                    tooltip: { content: '<span>Austria</span><br />Sales: $ 59990800' }
                },
                'AZ': {
                    value: 18862622, href: '',
                    tooltip: { content: '<span>Azerbaijan</span><br />Sales: $ 18862600' }
                },
                'BS': {
                    value: 8730001, href: '',
                    tooltip: { content: '<span>Bahamas</span><br />Sales: $ 8730000' }
                },
                'BH': {
                    value: 56413459, href: '',
                    tooltip: { content: '<span>Bahrain</span><br />Sales: $ 56413400' }
                },
                'BD': {
                    value: 15468020, href: '',
                    tooltip: { content: '<span>Bangladesh</span><br />Sales: $ 15468000' }
                },
                'BB': {
                    value: 21516882, href: '',
                    tooltip: { content: '<span>Barbados</span><br />Sales: $ 21516800' }
                },
                'BE': {
                    value: 47213120, href: '',
                    tooltip: { content: '<span>Belgium</span><br />Sales: $ 47213100' }
                },
                'BZ': {
                    value: 31867035, href: '',
                    tooltip: { content: '<span>Belize</span><br />Sales: $ 31867000' }
                },
                'BJ': {
                    value: 54126627, href: '',
                    tooltip: { content: '<span>Benin</span><br />Sales: $ 54126600' }
                },
                'BT': {
                    value: 46048682, href: '',
                    tooltip: { content: '<span>Bhutan</span><br />Sales: $ 46048600' }
                },
                'BY': {
                    value: 14447995, href: '',
                    tooltip: { content: '<span>Belarus</span><br />Sales: $ 14447900' }
                },
                'MM': {
                    value: 28262213, href: '',
                    tooltip: { content: '<span>Myanmar</span><br />Sales: $ 28262200' }
                },
                'BO': {
                    value: 39319803, href: '',
                    tooltip: { content: '<span>Bolivia, Plurinational State Of</span><br />Sales: $ 39319800' }
                },
                'BA': {
                    value: 53148645, href: '',
                    tooltip: { content: '<span>Bosnia And Herzegovina</span><br />Sales: $ 53148600' }
                },
                'BW': {
                    value: 58312754, href: '',
                    tooltip: { content: '<span>Botswana</span><br />Sales: $ 58312700' }
                },
                'BR': {
                    value: 51214618, href: '',
                    tooltip: { content: '<span>Brazil</span><br />Sales: $ 51214600' }
                },
                'BN': {
                    value: 44050675, href: '',
                    tooltip: { content: '<span>Brunei Darussalam</span><br />Sales: $ 44050600' }
                },
                'BG': {
                    value: 33457398, href: '',
                    tooltip: { content: '<span>Bulgaria</span><br />Sales: $ 33457300' }
                },
                'BF': {
                    value: 57135520, href: '',
                    tooltip: { content: '<span>Burkina Faso</span><br />Sales: $ 57135500' }
                },
                'BI': {
                    value: 16489874, href: '',
                    tooltip: { content: '<span>Burundi</span><br />Sales: $ 16489800' }
                },
                'KH': {
                    value: 51472367, href: '',
                    tooltip: { content: '<span>Cambodia</span><br />Sales: $ 51472300' }
                },
                'CM': {
                    value: 7565564, href: '',
                    tooltip: { content: '<span>Cameroon</span><br />Sales: $ 7565500' }
                },
                'CA': {
                    value: 38994418, href: '',
                    tooltip: { content: '<span>Canada</span><br />Sales: $ 38994400' }
                },
                'CV': {
                    value: 49503608, href: '',
                    tooltip: { content: '<span>Cape Verde</span><br />Sales: $ 49503600' }
                },
                'CF': {
                    value: 14788003, href: '',
                    tooltip: { content: '<span>Central African Republic</span><br />Sales: $ 14788000' }
                },
                'CL': {
                    value: 26013769, href: '',
                    tooltip: { content: '<span>Chile</span><br />Sales: $ 26013700' }
                },
                'CN': {
                    value: 2017575, href: '',
                    tooltip: { content: '<span>China</span><br />Sales: $ 2017500' }
                },
                'CY': {
                    value: 6121441, href: '',
                    tooltip: { content: '<span>Cyprus</span><br />Sales: $ 6121400' }
                },
                'CO': {
                    value: 36950711, href: '',
                    tooltip: { content: '<span>Colombia</span><br />Sales: $ 36950700' }
                },
                'KM': {
                    value: 49492639, href: '',
                    tooltip: { content: '<span>Comoros</span><br />Sales: $ 49492600' }
                },
                'CG': {
                    value: 34183115, href: '',
                    tooltip: { content: '<span>Congo</span><br />Sales: $ 34183100' }
                },
                'CD': {
                    value: 11759002, href: '',
                    tooltip: { content: '<span>Congo, The Democratic Republic Of The</span><br />Sales: $ 11759000' }
                },
                'KP': {
                    value: 11263614, href: '',
                    tooltip: { content: '<span>Korea, Democratic People\'s Republic Of</span><br />Sales: $ 11263600' }
                },
                'KR': {
                    value: 8742797, href: '',
                    tooltip: { content: '<span>Korea, Republic Of</span><br />Sales: $ 8742700' }
                },
                'CR': {
                    value: 13819162, href: '',
                    tooltip: { content: '<span>Costa Rica</span><br />Sales: $ 13819100' }
                },
                'CI': {
                    value: 42081915, href: '',
                    tooltip: { content: '<span>C\u00d4te D\'ivoire</span><br />Sales: $ 42081900' }
                },
                'HR': {
                    value: 40679837, href: '',
                    tooltip: { content: '<span>Croatia</span><br />Sales: $ 40679800' }
                },
                'CU': {
                    value: 44154871, href: '',
                    tooltip: { content: '<span>Cuba</span><br />Sales: $ 44154800' }
                },
                'DK': {
                    value: 28903842, href: '',
                    tooltip: { content: '<span>Denmark</span><br />Sales: $ 28903800' }
                },
                'DJ': {
                    value: 42805805, href: '',
                    tooltip: { content: '<span>Djibouti</span><br />Sales: $ 42805800' }
                },
                'DM': {
                    value: 18502505, href: '',
                    tooltip: { content: '<span>Dominica</span><br />Sales: $ 18502500' }
                },
                'EG': {
                    value: 26569482, href: '',
                    tooltip: { content: '<span>Egypt</span><br />Sales: $ 26569400' }
                },
                'AE': {
                    value: 17665280, href: '',
                    tooltip: { content: '<span>United Arab Emirates</span><br />Sales: $ 17665200' }
                },
                'EC': {
                    value: 49496295, href: '',
                    tooltip: { content: '<span>Ecuador</span><br />Sales: $ 49496200' }
                },
                'ER': {
                    value: 47684745, href: '',
                    tooltip: { content: '<span>Eritrea</span><br />Sales: $ 47684700' }
                },
                'ES': {
                    value: 36477258, href: '',
                    tooltip: { content: '<span>Spain</span><br />Sales: $ 36477200' }
                },
                'EE': {
                    value: 8181601, href: '',
                    tooltip: { content: '<span>Estonia</span><br />Sales: $ 8181600' }
                },
                'US': {
                    value: 7869012, href: '',
                    tooltip: { content: '<span>United States</span><br />Sales: $ 7869000' }
                },
                'ET': {
                    value: 21529678, href: '',
                    tooltip: { content: '<span>Ethiopia</span><br />Sales: $ 21529600' }
                },
                'FJ': {
                    value: 4618823, href: '',
                    tooltip: { content: '<span>Fiji</span><br />Sales: $ 4618800' }
                },
                'FI': {
                    value: 58480930, href: '',
                    tooltip: { content: '<span>Finland</span><br />Sales: $ 58480900' }
                },
                'FR': {
                    value: 13389581, href: '',
                    tooltip: { content: '<span>France</span><br />Sales: $ 13389500' }
                },
                'GA': {
                    value: 42990433, href: '',
                    tooltip: { content: '<span>Gabon</span><br />Sales: $ 42990400' }
                },
                'GM': {
                    value: 11484802, href: '',
                    tooltip: { content: '<span>Gambia</span><br />Sales: $ 11484800' }
                },
                'GE': {
                    value: 16941391, href: '',
                    tooltip: { content: '<span>Georgia</span><br />Sales: $ 16941300' }
                },
                'GH': {
                    value: 11773626, href: '',
                    tooltip: { content: '<span>Ghana</span><br />Sales: $ 11773600' }
                },
                'GR': {
                    value: 5370132, href: '',
                    tooltip: { content: '<span>Greece</span><br />Sales: $ 5370100' }
                },
                'GD': {
                    value: 47715821, href: '',
                    tooltip: { content: '<span>Grenada</span><br />Sales: $ 47715800' }
                },
                'GT': {
                    value: 1491110, href: '',
                    tooltip: { content: '<span>Guatemala</span><br />Sales: $ 1491100' }
                },
                'GN': {
                    value: 38586774, href: '',
                    tooltip: { content: '<span>Guinea</span><br />Sales: $ 38586700' }
                },
                'GQ': {
                    value: 11621902, href: '',
                    tooltip: { content: '<span>Equatorial Guinea</span><br />Sales: $ 11621900' }
                },
                'GW': {
                    value: 14102502, href: '',
                    tooltip: { content: '<span>Guinea-bissau</span><br />Sales: $ 14102500' }
                },
                'GY': {
                    value: 40208212, href: '',
                    tooltip: { content: '<span>Guyana</span><br />Sales: $ 40208200' }
                },
                'HT': {
                    value: 39544647, href: '',
                    tooltip: { content: '<span>Haiti</span><br />Sales: $ 39544600' }
                },
                'HN': {
                    value: 14948868, href: '',
                    tooltip: { content: '<span>Honduras</span><br />Sales: $ 14948800' }
                },
                'HU': {
                    value: 21085473, href: '',
                    tooltip: { content: '<span>Hungary</span><br />Sales: $ 21085400' }
                },
                'JM': {
                    value: 11420822, href: '',
                    tooltip: { content: '<span>Jamaica</span><br />Sales: $ 11420800' }
                },
                'JP': {
                    value: 50212873, href: '',
                    tooltip: { content: '<span>Japan</span><br />Sales: $ 50212800' }
                },
                'MH': {
                    value: 58404154, href: '',
                    tooltip: { content: '<span>Marshall Islands</span><br />Sales: $ 58404100' }
                },
                'PW': {
                    value: 29355359, href: '',
                    tooltip: { content: '<span>Palau</span><br />Sales: $ 29355300' }
                },
                'SB': {
                    value: 3107064, href: '',
                    tooltip: { content: '<span>Solomon Islands</span><br />Sales: $ 3107000' }
                },
                'IN': {
                    value: 16307074, href: '',
                    tooltip: { content: '<span>India</span><br />Sales: $ 16307000' }
                },
                'ID': {
                    value: 35290884, href: '',
                    tooltip: { content: '<span>Indonesia</span><br />Sales: $ 35290800' }
                },
                'JO': {
                    value: 29552783, href: '',
                    tooltip: { content: '<span>Jordan</span><br />Sales: $ 29552700' }
                },
                'IR': {
                    value: 13395065, href: '',
                    tooltip: { content: '<span>Iran, Islamic Republic Of</span><br />Sales: $ 13395000' }
                },
                'IQ': {
                    value: 33292877, href: '',
                    tooltip: { content: '<span>Iraq</span><br />Sales: $ 33292800' }
                },
                'IE': {
                    value: 48562186, href: '',
                    tooltip: { content: '<span>Ireland</span><br />Sales: $ 48562100' }
                },
                'IS': {
                    value: 42268372, href: '',
                    tooltip: { content: '<span>Iceland</span><br />Sales: $ 42268300' }
                },
                'IL': {
                    value: 10462948, href: '',
                    tooltip: { content: '<span>Israel</span><br />Sales: $ 10462900' }
                },
                'IT': {
                    value: 46885907, href: '',
                    tooltip: { content: '<span>Italy</span><br />Sales: $ 46885900' }
                },
                'KZ': {
                    value: 51421183, href: '',
                    tooltip: { content: '<span>Kazakhstan</span><br />Sales: $ 51421100' }
                },
                'KE': {
                    value: 58142749, href: '',
                    tooltip: { content: '<span>Kenya</span><br />Sales: $ 58142700' }
                },
                'KG': {
                    value: 52338840, href: '',
                    tooltip: { content: '<span>Kyrgyzstan</span><br />Sales: $ 52338800' }
                },
                'KI': {
                    value: 32751788, href: '',
                    tooltip: { content: '<span>Kiribati</span><br />Sales: $ 32751700' }
                },
                'KW': {
                    value: 27020999, href: '',
                    tooltip: { content: '<span>Kuwait</span><br />Sales: $ 27020900' }
                },
                'LA': {
                    value: 37866541, href: '',
                    tooltip: { content: '<span>Lao People\'s Democratic Republic</span><br />Sales: $ 37866500' }
                },
                'LS': {
                    value: 47300864, href: '',
                    tooltip: { content: '<span>Lesotho</span><br />Sales: $ 47300800' }
                },
                'LV': {
                    value: 56406147, href: '',
                    tooltip: { content: '<span>Latvia</span><br />Sales: $ 56406100' }
                },
                'LB': {
                    value: 48364762, href: '',
                    tooltip: { content: '<span>Lebanon</span><br />Sales: $ 48364700' }
                },
                'LR': {
                    value: 31980371, href: '',
                    tooltip: { content: '<span>Liberia</span><br />Sales: $ 31980300' }
                },
                'LY': {
                    value: 53377146, href: '',
                    tooltip: { content: '<span>Libya</span><br />Sales: $ 53377100' }
                },
                'LI': {
                    value: 33614606, href: '',
                    tooltip: { content: '<span>Liechtenstein</span><br />Sales: $ 33614600' }
                },
                'LT': {
                    value: 38705594, href: '',
                    tooltip: { content: '<span>Lithuania</span><br />Sales: $ 38705500' }
                },
                'LU': {
                    value: 1174865, href: '',
                    tooltip: { content: '<span>Luxembourg</span><br />Sales: $ 1174800' }
                },
                'MK': {
                    value: 38745810, href: '',
                    tooltip: { content: '<span>Macedonia, The Former Yugoslav Republic Of</span><br />Sales: $ 38745800' }
                },
                'MG': {
                    value: 29892792, href: '',
                    tooltip: { content: '<span>Madagascar</span><br />Sales: $ 29892700' }
                },
                'MY': {
                    value: 11146621, href: '',
                    tooltip: { content: '<span>Malaysia</span><br />Sales: $ 11146600' }
                },
                'MW': {
                    value: 55890650, href: '',
                    tooltip: { content: '<span>Malawi</span><br />Sales: $ 55890600' }
                },
                'MV': {
                    value: 1534982, href: '',
                    tooltip: { content: '<span>Maldives</span><br />Sales: $ 1534900' }
                },
                'ML': {
                    value: 20906329, href: '',
                    tooltip: { content: '<span>Mali</span><br />Sales: $ 20906300' }
                },
                'MT': {
                    value: 8740969, href: '',
                    tooltip: { content: '<span>Malta</span><br />Sales: $ 8740900' }
                },
                'MA': {
                    value: 37018347, href: '',
                    tooltip: { content: '<span>Morocco</span><br />Sales: $ 37018300' }
                },
                'MU': {
                    value: 29722787, href: '',
                    tooltip: { content: '<span>Mauritius</span><br />Sales: $ 29722700' }
                },
                'MR': {
                    value: 12270843, href: '',
                    tooltip: { content: '<span>Mauritania</span><br />Sales: $ 12270800' }
                },
                'MX': {
                    value: 44591764, href: '',
                    tooltip: { content: '<span>Mexico</span><br />Sales: $ 44591700' }
                },
                'FM': {
                    value: 54998584, href: '',
                    tooltip: { content: '<span>Micronesia, Federated States Of</span><br />Sales: $ 54998500' }
                },
                'MD': {
                    value: 1637350, href: '',
                    tooltip: { content: '<span>Moldova, Republic Of</span><br />Sales: $ 1637300' }
                },
                'MC': {
                    value: 39551959, href: '',
                    tooltip: { content: '<span>Monaco</span><br />Sales: $ 39551900' }
                },
                'MN': {
                    value: 41952127, href: '',
                    tooltip: { content: '<span>Mongolia</span><br />Sales: $ 41952100' }
                },
                'ME': {
                    value: 10621985, href: '',
                    tooltip: { content: '<span>Montenegro</span><br />Sales: $ 10621900' }
                },
                'MZ': {
                    value: 5256796, href: '',
                    tooltip: { content: '<span>Mozambique</span><br />Sales: $ 5256700' }
                },
                'NA': {
                    value: 48465302, href: '',
                    tooltip: { content: '<span>Namibia</span><br />Sales: $ 48465300' }
                },
                'NP': {
                    value: 13925186, href: '',
                    tooltip: { content: '<span>Nepal</span><br />Sales: $ 13925100' }
                },
                'NI': {
                    value: 14329175, href: '',
                    tooltip: { content: '<span>Nicaragua</span><br />Sales: $ 14329100' }
                },
                'NE': {
                    value: 38709250, href: '',
                    tooltip: { content: '<span>Niger</span><br />Sales: $ 38709200' }
                },
                'NG': {
                    value: 14676495, href: '',
                    tooltip: { content: '<span>Nigeria</span><br />Sales: $ 14676400' }
                },
                'NO': {
                    value: 3564065, href: '',
                    tooltip: { content: '<span>Norway</span><br />Sales: $ 3564000' }
                },
                'NZ': {
                    value: 26810779, href: '',
                    tooltip: { content: '<span>New Zealand</span><br />Sales: $ 26810700' }
                },
                'OM': {
                    value: 10272836, href: '',
                    tooltip: { content: '<span>Oman</span><br />Sales: $ 10272800' }
                },
                'UG': {
                    value: 3701165, href: '',
                    tooltip: { content: '<span>Uganda</span><br />Sales: $ 3701100' }
                },
                'UZ': {
                    value: 23971890, href: '',
                    tooltip: { content: '<span>Uzbekistan</span><br />Sales: $ 23971800' }
                },
                'PK': {
                    value: 38707422, href: '',
                    tooltip: { content: '<span>Pakistan</span><br />Sales: $ 38707400' }
                },
                'PS': {
                    value: 37875681, href: '',
                    tooltip: { content: '<span>Palestine, State Of</span><br />Sales: $ 37875600' }
                },
                'PA': {
                    value: 51104938, href: '',
                    tooltip: { content: '<span>Panama</span><br />Sales: $ 51104900' }
                },
                'PG': {
                    value: 58301786, href: '',
                    tooltip: { content: '<span>Papua New Guinea</span><br />Sales: $ 58301700' }
                },
                'PY': {
                    value: 10709729, href: '',
                    tooltip: { content: '<span>Paraguay</span><br />Sales: $ 10709700' }
                },
                'NL': {
                    value: 29795908, href: '',
                    tooltip: { content: '<span>Netherlands</span><br />Sales: $ 29795900' }
                },
                'PE': {
                    value: 42703436, href: '',
                    tooltip: { content: '<span>Peru</span><br />Sales: $ 42703400' }
                },
                'PH': {
                    value: 59756876, href: '',
                    tooltip: { content: '<span>Philippines</span><br />Sales: $ 59756800' }
                },
                'PL': {
                    value: 53258326, href: '',
                    tooltip: { content: '<span>Poland</span><br />Sales: $ 53258300' }
                },
                'PT': {
                    value: 44061643, href: '',
                    tooltip: { content: '<span>Portugal</span><br />Sales: $ 44061600' }
                },
                'QA': {
                    value: 14062286, href: '',
                    tooltip: { content: '<span>Qatar</span><br />Sales: $ 14062200' }
                },
                'DO': {
                    value: 11490286, href: '',
                    tooltip: { content: '<span>Dominican Republic</span><br />Sales: $ 11490200' }
                },
                'RO': {
                    value: 7243835, href: '',
                    tooltip: { content: '<span>Romania</span><br />Sales: $ 7243800' }
                },
                'GB': {
                    value: 48851010, href: '',
                    tooltip: { content: '<span>United Kingdom</span><br />Sales: $ 48851000' }
                },
                'RU': {
                    value: 30697113, href: '',
                    tooltip: { content: '<span>Russian Federation</span><br />Sales: $ 30697100' }
                },
                'RW': {
                    value: 46405142, href: '',
                    tooltip: { content: '<span>Rwanda</span><br />Sales: $ 46405100' }
                },
                'KN': {
                    value: 43006885, href: '',
                    tooltip: { content: '<span>Saint Kitts And Nevis</span><br />Sales: $ 43006800' }
                },
                'SM': {
                    value: 42292136, href: '',
                    tooltip: { content: '<span>San Marino</span><br />Sales: $ 42292100' }
                },
                'VC': {
                    value: 8373541, href: '',
                    tooltip: { content: '<span>Saint Vincent And The Grenadines</span><br />Sales: $ 8373500' }
                },
                'LC': {
                    value: 27854568, href: '',
                    tooltip: { content: '<span>Saint Lucia</span><br />Sales: $ 27854500' }
                },
                'SV': {
                    value: 1438098, href: '',
                    tooltip: { content: '<span>El Salvador</span><br />Sales: $ 1438000' }
                },
                'WS': {
                    value: 52463144, href: '',
                    tooltip: { content: '<span>Samoa</span><br />Sales: $ 52463100' }
                },
                'ST': {
                    value: 12607196, href: '',
                    tooltip: { content: '<span>Sao Tome And Principe</span><br />Sales: $ 12607100' }
                },
                'SN': {
                    value: 28841690, href: '',
                    tooltip: { content: '<span>Senegal</span><br />Sales: $ 28841600' }
                },
                'RS': {
                    value: 52878101, href: '',
                    tooltip: { content: '<span>Serbia</span><br />Sales: $ 52878100' }
                },
                'SC': {
                    value: 17592160, href: '',
                    tooltip: { content: '<span>Seychelles</span><br />Sales: $ 17592100' }
                },
                'SL': {
                    value: 19063702, href: '',
                    tooltip: { content: '<span>Sierra Leone</span><br />Sales: $ 19063700' }
                },
                'SG': {
                    value: 32519632, href: '',
                    tooltip: { content: '<span>Singapore</span><br />Sales: $ 32519600' }
                },
                'SK': {
                    value: 38217517, href: '',
                    tooltip: { content: '<span>Slovakia</span><br />Sales: $ 38217500' }
                },
                'SI': {
                    value: 25657309, href: '',
                    tooltip: { content: '<span>Slovenia</span><br />Sales: $ 25657300' }
                },
                'SO': {
                    value: 33358685, href: '',
                    tooltip: { content: '<span>Somalia</span><br />Sales: $ 33358600' }
                },
                'SD': {
                    value: 51991520, href: '',
                    tooltip: { content: '<span>Sudan</span><br />Sales: $ 51991500' }
                },
                'SS': {
                    value: 7996972, href: '',
                    tooltip: { content: '<span>South Sudan</span><br />Sales: $ 7996900' }
                },
                'LK': {
                    value: 14886715, href: '',
                    tooltip: { content: '<span>Sri Lanka</span><br />Sales: $ 14886700' }
                },
                'SE': {
                    value: 31157770, href: '',
                    tooltip: { content: '<span>Sweden</span><br />Sales: $ 31157700' }
                },
                'CH': {
                    value: 10510476, href: '',
                    tooltip: { content: '<span>Switzerland</span><br />Sales: $ 10510400' }
                },
                'SR': {
                    value: 42707092, href: '',
                    tooltip: { content: '<span>Suriname</span><br />Sales: $ 42707000' }
                },
                'SZ': {
                    value: 13358505, href: '',
                    tooltip: { content: '<span>Swaziland</span><br />Sales: $ 13358500' }
                },
                'SY': {
                    value: 18076581, href: '',
                    tooltip: { content: '<span>Syrian Arab Republic</span><br />Sales: $ 18076500' }
                },
                'TJ': {
                    value: 40979630, href: '',
                    tooltip: { content: '<span>Tajikistan</span><br />Sales: $ 40979600' }
                },
                'TZ': {
                    value: 13188501, href: '',
                    tooltip: { content: '<span>Tanzania, United Republic Of</span><br />Sales: $ 13188500' }
                },
                'TD': {
                    value: 19200802, href: '',
                    tooltip: { content: '<span>Chad</span><br />Sales: $ 19200800' }
                },
                'CZ': {
                    value: 29680743, href: '',
                    tooltip: { content: '<span>Czech Republic</span><br />Sales: $ 29680700' }
                },
                'TH': {
                    value: 6752102, href: '',
                    tooltip: { content: '<span>Thailand</span><br />Sales: $ 6752100' }
                },
                'TL': {
                    value: 59831824, href: '',
                    tooltip: { content: '<span>Timor-leste</span><br />Sales: $ 59831800' }
                },
                'TG': {
                    value: 591732, href: '',
                    tooltip: { content: '<span>Togo</span><br />Sales: $ 591700' }
                },
                'TO': {
                    value: 11685882, href: '',
                    tooltip: { content: '<span>Tonga</span><br />Sales: $ 11685800' }
                },
                'TT': {
                    value: 40731021, href: '',
                    tooltip: { content: '<span>Trinidad And Tobago</span><br />Sales: $ 40731000' }
                },
                'TN': {
                    value: 53477686, href: '',
                    tooltip: { content: '<span>Tunisia</span><br />Sales: $ 53477600' }
                },
                'TM': {
                    value: 15559421, href: '',
                    tooltip: { content: '<span>Turkmenistan</span><br />Sales: $ 15559400' }
                },
                'TR': {
                    value: 5955762, href: '',
                    tooltip: { content: '<span>Turkey</span><br />Sales: $ 59557600' }
                },
                'TV': {
                    value: 6269509, href: '',
                    tooltip: { content: '<span>Tuvalu</span><br />Sales: $ 6269500' }
                },
                'VU': {
                    value: 14716711, href: '',
                    tooltip: { content: '<span>Vanuatu</span><br />Sales: $ 14716700' }
                },
                'VE': {
                    value: 32281992, href: '',
                    tooltip: { content: '<span>Venezuela, Bolivarian Republic Of</span><br />Sales: $ 32281900' }
                },
                'VN': {
                    value: 59111591, href: '',
                    tooltip: { content: '<span>Viet Nam</span><br />Sales: $ 59111500' }
                },
                'UA': {
                    value: 36270694, href: '',
                    tooltip: { content: '<span>Ukraine</span><br />Sales: $ 36270600' }
                },
                'UY': {
                    value: 53989527, href: '',
                    tooltip: { content: '<span>Uruguay</span><br />Sales: $ 53989500' }
                },
                'YE': {
                    value: 48887571, href: '',
                    tooltip: { content: '<span>Yemen</span><br />Sales: $ 48887500' }
                },
                'ZM': {
                    value: 45913410, href: '',
                    tooltip: { content: '<span>Zambia</span><br />Sales: $ 45913400' }
                },
                'ZW': {
                    value: 53987699, href: '',
                    tooltip: { content: '<span>Zimbabwe</span><br />Sales: $ 53987600' }
                }
            }
        });
    });
});
System.registerDynamic("npm:slick-carousel@1.7.1.json", [], true, function() {
  return {
    "main": "slick/slick.js",
    "format": "global",
    "meta": {
      "*.json": {
        "format": "json"
      },
      "CONTRIBUTING.markdown": {
        "globals": {
          "process": null
        }
      },
      "LICENSE": {
        "globals": {
          "process": null
        }
      },
      "Makefile": {
        "globals": {
          "process": null
        }
      },
      "README.markdown": {
        "globals": {
          "process": null
        }
      },
      "index.html": {
        "globals": {
          "process": null
        }
      },
      "slick/*": {
        "globals": {
          "process": null
        }
      }
    }
  };
});

System.registerDynamic('npm:slick-carousel@1.7.1/slick/slick.js', [], false, function ($__require, $__exports, $__module) {
    var _retrieveGlobal = System.registry.get("@@global-helpers").prepareGlobal($__module.id, null, {});

    (function ($__global) {
        /*
             _ _      _       _
         ___| (_) ___| | __  (_)___
        / __| | |/ __| |/ /  | / __|
        \__ \ | | (__|   < _ | \__ \
        |___/_|_|\___|_|\_(_)/ |___/
                           |__/
        
         Version: 1.7.1
          Author: Ken Wheeler
         Website: http://kenwheeler.github.io
            Docs: http://kenwheeler.github.io/slick
            Repo: http://github.com/kenwheeler/slick
          Issues: http://github.com/kenwheeler/slick/issues
        
         */
        /* global window, document, define, jQuery, setInterval, clearInterval */
        ;(function (factory) {
            'use strict';

            if (typeof define === 'function' && define.amd) {
                define(['jquery'], factory);
            } else if (typeof exports !== 'undefined') {
                module.exports = factory(require('jquery'));
            } else {
                factory(jQuery);
            }
        })(function ($) {
            'use strict';

            var Slick = window.Slick || {};

            Slick = function () {

                var instanceUid = 0;

                function Slick(element, settings) {

                    var _ = this,
                        dataSettings;

                    _.defaults = {
                        accessibility: true,
                        adaptiveHeight: false,
                        appendArrows: $(element),
                        appendDots: $(element),
                        arrows: true,
                        asNavFor: null,
                        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                        autoplay: false,
                        autoplaySpeed: 3000,
                        centerMode: false,
                        centerPadding: '50px',
                        cssEase: 'ease',
                        customPaging: function (slider, i) {
                            return $('<button type="button" />').text(i + 1);
                        },
                        dots: false,
                        dotsClass: 'slick-dots',
                        draggable: true,
                        easing: 'linear',
                        edgeFriction: 0.35,
                        fade: false,
                        focusOnSelect: false,
                        infinite: true,
                        initialSlide: 0,
                        lazyLoad: 'ondemand',
                        mobileFirst: false,
                        pauseOnHover: true,
                        pauseOnFocus: true,
                        pauseOnDotsHover: false,
                        respondTo: 'window',
                        responsive: null,
                        rows: 1,
                        rtl: false,
                        slide: '',
                        slidesPerRow: 1,
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: true,
                        swipeToSlide: false,
                        touchMove: true,
                        touchThreshold: 5,
                        useCSS: true,
                        useTransform: true,
                        variableWidth: false,
                        vertical: false,
                        verticalSwiping: false,
                        waitForAnimate: true,
                        zIndex: 1000
                    };

                    _.initials = {
                        animating: false,
                        dragging: false,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        scrolling: false,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: false,
                        slideOffset: 0,
                        swipeLeft: null,
                        swiping: false,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: false,
                        unslicked: false
                    };

                    $.extend(_, _.initials);

                    _.activeBreakpoint = null;
                    _.animType = null;
                    _.animProp = null;
                    _.breakpoints = [];
                    _.breakpointSettings = [];
                    _.cssTransitions = false;
                    _.focussed = false;
                    _.interrupted = false;
                    _.hidden = 'hidden';
                    _.paused = true;
                    _.positionProp = null;
                    _.respondTo = null;
                    _.rowCount = 1;
                    _.shouldClick = true;
                    _.$slider = $(element);
                    _.$slidesCache = null;
                    _.transformType = null;
                    _.transitionType = null;
                    _.visibilityChange = 'visibilitychange';
                    _.windowWidth = 0;
                    _.windowTimer = null;

                    dataSettings = $(element).data('slick') || {};

                    _.options = $.extend({}, _.defaults, settings, dataSettings);

                    _.currentSlide = _.options.initialSlide;

                    _.originalSettings = _.options;

                    if (typeof document.mozHidden !== 'undefined') {
                        _.hidden = 'mozHidden';
                        _.visibilityChange = 'mozvisibilitychange';
                    } else if (typeof document.webkitHidden !== 'undefined') {
                        _.hidden = 'webkitHidden';
                        _.visibilityChange = 'webkitvisibilitychange';
                    }

                    _.autoPlay = $.proxy(_.autoPlay, _);
                    _.autoPlayClear = $.proxy(_.autoPlayClear, _);
                    _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
                    _.changeSlide = $.proxy(_.changeSlide, _);
                    _.clickHandler = $.proxy(_.clickHandler, _);
                    _.selectHandler = $.proxy(_.selectHandler, _);
                    _.setPosition = $.proxy(_.setPosition, _);
                    _.swipeHandler = $.proxy(_.swipeHandler, _);
                    _.dragHandler = $.proxy(_.dragHandler, _);
                    _.keyHandler = $.proxy(_.keyHandler, _);

                    _.instanceUid = instanceUid++;

                    // A simple way to check for HTML strings
                    // Strict HTML recognition (must start with <)
                    // Extracted from jQuery v1.11 source
                    _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

                    _.registerBreakpoints();
                    _.init(true);
                }

                return Slick;
            }();

            Slick.prototype.activateADA = function () {
                var _ = this;

                _.$slideTrack.find('.slick-active').attr({
                    'aria-hidden': 'false'
                }).find('a, input, button, select').attr({
                    'tabindex': '0'
                });
            };

            Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {

                var _ = this;

                if (typeof index === 'boolean') {
                    addBefore = index;
                    index = null;
                } else if (index < 0 || index >= _.slideCount) {
                    return false;
                }

                _.unload();

                if (typeof index === 'number') {
                    if (index === 0 && _.$slides.length === 0) {
                        $(markup).appendTo(_.$slideTrack);
                    } else if (addBefore) {
                        $(markup).insertBefore(_.$slides.eq(index));
                    } else {
                        $(markup).insertAfter(_.$slides.eq(index));
                    }
                } else {
                    if (addBefore === true) {
                        $(markup).prependTo(_.$slideTrack);
                    } else {
                        $(markup).appendTo(_.$slideTrack);
                    }
                }

                _.$slides = _.$slideTrack.children(this.options.slide);

                _.$slideTrack.children(this.options.slide).detach();

                _.$slideTrack.append(_.$slides);

                _.$slides.each(function (index, element) {
                    $(element).attr('data-slick-index', index);
                });

                _.$slidesCache = _.$slides;

                _.reinit();
            };

            Slick.prototype.animateHeight = function () {
                var _ = this;
                if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
                    var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
                    _.$list.animate({
                        height: targetHeight
                    }, _.options.speed);
                }
            };

            Slick.prototype.animateSlide = function (targetLeft, callback) {

                var animProps = {},
                    _ = this;

                _.animateHeight();

                if (_.options.rtl === true && _.options.vertical === false) {
                    targetLeft = -targetLeft;
                }
                if (_.transformsEnabled === false) {
                    if (_.options.vertical === false) {
                        _.$slideTrack.animate({
                            left: targetLeft
                        }, _.options.speed, _.options.easing, callback);
                    } else {
                        _.$slideTrack.animate({
                            top: targetLeft
                        }, _.options.speed, _.options.easing, callback);
                    }
                } else {

                    if (_.cssTransitions === false) {
                        if (_.options.rtl === true) {
                            _.currentLeft = -_.currentLeft;
                        }
                        $({
                            animStart: _.currentLeft
                        }).animate({
                            animStart: targetLeft
                        }, {
                            duration: _.options.speed,
                            easing: _.options.easing,
                            step: function (now) {
                                now = Math.ceil(now);
                                if (_.options.vertical === false) {
                                    animProps[_.animType] = 'translate(' + now + 'px, 0px)';
                                    _.$slideTrack.css(animProps);
                                } else {
                                    animProps[_.animType] = 'translate(0px,' + now + 'px)';
                                    _.$slideTrack.css(animProps);
                                }
                            },
                            complete: function () {
                                if (callback) {
                                    callback.call();
                                }
                            }
                        });
                    } else {

                        _.applyTransition();
                        targetLeft = Math.ceil(targetLeft);

                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                        } else {
                            animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                        }
                        _.$slideTrack.css(animProps);

                        if (callback) {
                            setTimeout(function () {

                                _.disableTransition();

                                callback.call();
                            }, _.options.speed);
                        }
                    }
                }
            };

            Slick.prototype.getNavTarget = function () {

                var _ = this,
                    asNavFor = _.options.asNavFor;

                if (asNavFor && asNavFor !== null) {
                    asNavFor = $(asNavFor).not(_.$slider);
                }

                return asNavFor;
            };

            Slick.prototype.asNavFor = function (index) {

                var _ = this,
                    asNavFor = _.getNavTarget();

                if (asNavFor !== null && typeof asNavFor === 'object') {
                    asNavFor.each(function () {
                        var target = $(this).slick('getSlick');
                        if (!target.unslicked) {
                            target.slideHandler(index, true);
                        }
                    });
                }
            };

            Slick.prototype.applyTransition = function (slide) {

                var _ = this,
                    transition = {};

                if (_.options.fade === false) {
                    transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
                } else {
                    transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
                }

                if (_.options.fade === false) {
                    _.$slideTrack.css(transition);
                } else {
                    _.$slides.eq(slide).css(transition);
                }
            };

            Slick.prototype.autoPlay = function () {

                var _ = this;

                _.autoPlayClear();

                if (_.slideCount > _.options.slidesToShow) {
                    _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
                }
            };

            Slick.prototype.autoPlayClear = function () {

                var _ = this;

                if (_.autoPlayTimer) {
                    clearInterval(_.autoPlayTimer);
                }
            };

            Slick.prototype.autoPlayIterator = function () {

                var _ = this,
                    slideTo = _.currentSlide + _.options.slidesToScroll;

                if (!_.paused && !_.interrupted && !_.focussed) {

                    if (_.options.infinite === false) {

                        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
                            _.direction = 0;
                        } else if (_.direction === 0) {

                            slideTo = _.currentSlide - _.options.slidesToScroll;

                            if (_.currentSlide - 1 === 0) {
                                _.direction = 1;
                            }
                        }
                    }

                    _.slideHandler(slideTo);
                }
            };

            Slick.prototype.buildArrows = function () {

                var _ = this;

                if (_.options.arrows === true) {

                    _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
                    _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

                    if (_.slideCount > _.options.slidesToShow) {

                        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                        if (_.htmlExpr.test(_.options.prevArrow)) {
                            _.$prevArrow.prependTo(_.options.appendArrows);
                        }

                        if (_.htmlExpr.test(_.options.nextArrow)) {
                            _.$nextArrow.appendTo(_.options.appendArrows);
                        }

                        if (_.options.infinite !== true) {
                            _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                        }
                    } else {

                        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
                            'aria-disabled': 'true',
                            'tabindex': '-1'
                        });
                    }
                }
            };

            Slick.prototype.buildDots = function () {

                var _ = this,
                    i,
                    dot;

                if (_.options.dots === true) {

                    _.$slider.addClass('slick-dotted');

                    dot = $('<ul />').addClass(_.options.dotsClass);

                    for (i = 0; i <= _.getDotCount(); i += 1) {
                        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
                    }

                    _.$dots = dot.appendTo(_.options.appendDots);

                    _.$dots.find('li').first().addClass('slick-active');
                }
            };

            Slick.prototype.buildOut = function () {

                var _ = this;

                _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');

                _.slideCount = _.$slides.length;

                _.$slides.each(function (index, element) {
                    $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
                });

                _.$slider.addClass('slick-slider');

                _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();

                _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();
                _.$slideTrack.css('opacity', 0);

                if (_.options.centerMode === true || _.options.swipeToSlide === true) {
                    _.options.slidesToScroll = 1;
                }

                $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

                _.setupInfinite();

                _.buildArrows();

                _.buildDots();

                _.updateDots();

                _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

                if (_.options.draggable === true) {
                    _.$list.addClass('draggable');
                }
            };

            Slick.prototype.buildRows = function () {

                var _ = this,
                    a,
                    b,
                    c,
                    newSlides,
                    numOfSlides,
                    originalSlides,
                    slidesPerSection;

                newSlides = document.createDocumentFragment();
                originalSlides = _.$slider.children();

                if (_.options.rows > 1) {

                    slidesPerSection = _.options.slidesPerRow * _.options.rows;
                    numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

                    for (a = 0; a < numOfSlides; a++) {
                        var slide = document.createElement('div');
                        for (b = 0; b < _.options.rows; b++) {
                            var row = document.createElement('div');
                            for (c = 0; c < _.options.slidesPerRow; c++) {
                                var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                                if (originalSlides.get(target)) {
                                    row.appendChild(originalSlides.get(target));
                                }
                            }
                            slide.appendChild(row);
                        }
                        newSlides.appendChild(slide);
                    }

                    _.$slider.empty().append(newSlides);
                    _.$slider.children().children().children().css({
                        'width': 100 / _.options.slidesPerRow + '%',
                        'display': 'inline-block'
                    });
                }
            };

            Slick.prototype.checkResponsive = function (initial, forceUpdate) {

                var _ = this,
                    breakpoint,
                    targetBreakpoint,
                    respondToWidth,
                    triggerBreakpoint = false;
                var sliderWidth = _.$slider.width();
                var windowWidth = window.innerWidth || $(window).width();

                if (_.respondTo === 'window') {
                    respondToWidth = windowWidth;
                } else if (_.respondTo === 'slider') {
                    respondToWidth = sliderWidth;
                } else if (_.respondTo === 'min') {
                    respondToWidth = Math.min(windowWidth, sliderWidth);
                }

                if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {

                    targetBreakpoint = null;

                    for (breakpoint in _.breakpoints) {
                        if (_.breakpoints.hasOwnProperty(breakpoint)) {
                            if (_.originalSettings.mobileFirst === false) {
                                if (respondToWidth < _.breakpoints[breakpoint]) {
                                    targetBreakpoint = _.breakpoints[breakpoint];
                                }
                            } else {
                                if (respondToWidth > _.breakpoints[breakpoint]) {
                                    targetBreakpoint = _.breakpoints[breakpoint];
                                }
                            }
                        }
                    }

                    if (targetBreakpoint !== null) {
                        if (_.activeBreakpoint !== null) {
                            if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                                _.activeBreakpoint = targetBreakpoint;
                                if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                                    _.unslick(targetBreakpoint);
                                } else {
                                    _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                                    if (initial === true) {
                                        _.currentSlide = _.options.initialSlide;
                                    }
                                    _.refresh(initial);
                                }
                                triggerBreakpoint = targetBreakpoint;
                            }
                        } else {
                            _.activeBreakpoint = targetBreakpoint;
                            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                                _.unslick(targetBreakpoint);
                            } else {
                                _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                                if (initial === true) {
                                    _.currentSlide = _.options.initialSlide;
                                }
                                _.refresh(initial);
                            }
                            triggerBreakpoint = targetBreakpoint;
                        }
                    } else {
                        if (_.activeBreakpoint !== null) {
                            _.activeBreakpoint = null;
                            _.options = _.originalSettings;
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                            triggerBreakpoint = targetBreakpoint;
                        }
                    }

                    // only trigger breakpoints during an actual break. not on initialize.
                    if (!initial && triggerBreakpoint !== false) {
                        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
                    }
                }
            };

            Slick.prototype.changeSlide = function (event, dontAnimate) {

                var _ = this,
                    $target = $(event.currentTarget),
                    indexOffset,
                    slideOffset,
                    unevenOffset;

                // If target is a link, prevent default action.
                if ($target.is('a')) {
                    event.preventDefault();
                }

                // If target is not the <li> element (ie: a child), find the <li>.
                if (!$target.is('li')) {
                    $target = $target.closest('li');
                }

                unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
                indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

                switch (event.data.message) {

                    case 'previous':
                        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                        if (_.slideCount > _.options.slidesToShow) {
                            _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                        }
                        break;

                    case 'next':
                        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                        if (_.slideCount > _.options.slidesToShow) {
                            _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                        }
                        break;

                    case 'index':
                        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

                        _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                        $target.children().trigger('focus');
                        break;

                    default:
                        return;
                }
            };

            Slick.prototype.checkNavigable = function (index) {

                var _ = this,
                    navigables,
                    prevNavigable;

                navigables = _.getNavigableIndexes();
                prevNavigable = 0;
                if (index > navigables[navigables.length - 1]) {
                    index = navigables[navigables.length - 1];
                } else {
                    for (var n in navigables) {
                        if (index < navigables[n]) {
                            index = prevNavigable;
                            break;
                        }
                        prevNavigable = navigables[n];
                    }
                }

                return index;
            };

            Slick.prototype.cleanUpEvents = function () {

                var _ = this;

                if (_.options.dots && _.$dots !== null) {

                    $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

                    if (_.options.accessibility === true) {
                        _.$dots.off('keydown.slick', _.keyHandler);
                    }
                }

                _.$slider.off('focus.slick blur.slick');

                if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
                    _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
                    _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

                    if (_.options.accessibility === true) {
                        _.$prevArrow.off('keydown.slick', _.keyHandler);
                        _.$nextArrow.off('keydown.slick', _.keyHandler);
                    }
                }

                _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
                _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
                _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
                _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

                _.$list.off('click.slick', _.clickHandler);

                $(document).off(_.visibilityChange, _.visibility);

                _.cleanUpSlideEvents();

                if (_.options.accessibility === true) {
                    _.$list.off('keydown.slick', _.keyHandler);
                }

                if (_.options.focusOnSelect === true) {
                    $(_.$slideTrack).children().off('click.slick', _.selectHandler);
                }

                $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

                $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

                $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

                $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
            };

            Slick.prototype.cleanUpSlideEvents = function () {

                var _ = this;

                _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
                _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
            };

            Slick.prototype.cleanUpRows = function () {

                var _ = this,
                    originalSlides;

                if (_.options.rows > 1) {
                    originalSlides = _.$slides.children().children();
                    originalSlides.removeAttr('style');
                    _.$slider.empty().append(originalSlides);
                }
            };

            Slick.prototype.clickHandler = function (event) {

                var _ = this;

                if (_.shouldClick === false) {
                    event.stopImmediatePropagation();
                    event.stopPropagation();
                    event.preventDefault();
                }
            };

            Slick.prototype.destroy = function (refresh) {

                var _ = this;

                _.autoPlayClear();

                _.touchObject = {};

                _.cleanUpEvents();

                $('.slick-cloned', _.$slider).detach();

                if (_.$dots) {
                    _.$dots.remove();
                }

                if (_.$prevArrow && _.$prevArrow.length) {

                    _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

                    if (_.htmlExpr.test(_.options.prevArrow)) {
                        _.$prevArrow.remove();
                    }
                }

                if (_.$nextArrow && _.$nextArrow.length) {

                    _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

                    if (_.htmlExpr.test(_.options.nextArrow)) {
                        _.$nextArrow.remove();
                    }
                }

                if (_.$slides) {

                    _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
                        $(this).attr('style', $(this).data('originalStyling'));
                    });

                    _.$slideTrack.children(this.options.slide).detach();

                    _.$slideTrack.detach();

                    _.$list.detach();

                    _.$slider.append(_.$slides);
                }

                _.cleanUpRows();

                _.$slider.removeClass('slick-slider');
                _.$slider.removeClass('slick-initialized');
                _.$slider.removeClass('slick-dotted');

                _.unslicked = true;

                if (!refresh) {
                    _.$slider.trigger('destroy', [_]);
                }
            };

            Slick.prototype.disableTransition = function (slide) {

                var _ = this,
                    transition = {};

                transition[_.transitionType] = '';

                if (_.options.fade === false) {
                    _.$slideTrack.css(transition);
                } else {
                    _.$slides.eq(slide).css(transition);
                }
            };

            Slick.prototype.fadeSlide = function (slideIndex, callback) {

                var _ = this;

                if (_.cssTransitions === false) {

                    _.$slides.eq(slideIndex).css({
                        zIndex: _.options.zIndex
                    });

                    _.$slides.eq(slideIndex).animate({
                        opacity: 1
                    }, _.options.speed, _.options.easing, callback);
                } else {

                    _.applyTransition(slideIndex);

                    _.$slides.eq(slideIndex).css({
                        opacity: 1,
                        zIndex: _.options.zIndex
                    });

                    if (callback) {
                        setTimeout(function () {

                            _.disableTransition(slideIndex);

                            callback.call();
                        }, _.options.speed);
                    }
                }
            };

            Slick.prototype.fadeSlideOut = function (slideIndex) {

                var _ = this;

                if (_.cssTransitions === false) {

                    _.$slides.eq(slideIndex).animate({
                        opacity: 0,
                        zIndex: _.options.zIndex - 2
                    }, _.options.speed, _.options.easing);
                } else {

                    _.applyTransition(slideIndex);

                    _.$slides.eq(slideIndex).css({
                        opacity: 0,
                        zIndex: _.options.zIndex - 2
                    });
                }
            };

            Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {

                var _ = this;

                if (filter !== null) {

                    _.$slidesCache = _.$slides;

                    _.unload();

                    _.$slideTrack.children(this.options.slide).detach();

                    _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

                    _.reinit();
                }
            };

            Slick.prototype.focusHandler = function () {

                var _ = this;

                _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*', function (event) {

                    event.stopImmediatePropagation();
                    var $sf = $(this);

                    setTimeout(function () {

                        if (_.options.pauseOnFocus) {
                            _.focussed = $sf.is(':focus');
                            _.autoPlay();
                        }
                    }, 0);
                });
            };

            Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {

                var _ = this;
                return _.currentSlide;
            };

            Slick.prototype.getDotCount = function () {

                var _ = this;

                var breakPoint = 0;
                var counter = 0;
                var pagerQty = 0;

                if (_.options.infinite === true) {
                    if (_.slideCount <= _.options.slidesToShow) {
                        ++pagerQty;
                    } else {
                        while (breakPoint < _.slideCount) {
                            ++pagerQty;
                            breakPoint = counter + _.options.slidesToScroll;
                            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                        }
                    }
                } else if (_.options.centerMode === true) {
                    pagerQty = _.slideCount;
                } else if (!_.options.asNavFor) {
                    pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
                } else {
                    while (breakPoint < _.slideCount) {
                        ++pagerQty;
                        breakPoint = counter + _.options.slidesToScroll;
                        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                    }
                }

                return pagerQty - 1;
            };

            Slick.prototype.getLeft = function (slideIndex) {

                var _ = this,
                    targetLeft,
                    verticalHeight,
                    verticalOffset = 0,
                    targetSlide;

                _.slideOffset = 0;
                verticalHeight = _.$slides.first().outerHeight(true);

                if (_.options.infinite === true) {
                    if (_.slideCount > _.options.slidesToShow) {
                        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
                        verticalOffset = verticalHeight * _.options.slidesToShow * -1;
                    }
                    if (_.slideCount % _.options.slidesToScroll !== 0) {
                        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                            if (slideIndex > _.slideCount) {
                                _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
                                verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
                            } else {
                                _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
                                verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
                            }
                        }
                    }
                } else {
                    if (slideIndex + _.options.slidesToShow > _.slideCount) {
                        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
                        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
                    }
                }

                if (_.slideCount <= _.options.slidesToShow) {
                    _.slideOffset = 0;
                    verticalOffset = 0;
                }

                if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
                    _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
                } else if (_.options.centerMode === true && _.options.infinite === true) {
                    _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
                } else if (_.options.centerMode === true) {
                    _.slideOffset = 0;
                    _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
                }

                if (_.options.vertical === false) {
                    targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
                } else {
                    targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
                }

                if (_.options.variableWidth === true) {

                    if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                    } else {
                        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
                    }

                    if (_.options.rtl === true) {
                        if (targetSlide[0]) {
                            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                        } else {
                            targetLeft = 0;
                        }
                    } else {
                        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                    }

                    if (_.options.centerMode === true) {
                        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                            targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                        } else {
                            targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                        }

                        if (_.options.rtl === true) {
                            if (targetSlide[0]) {
                                targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                            } else {
                                targetLeft = 0;
                            }
                        } else {
                            targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                        }

                        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
                    }
                }

                return targetLeft;
            };

            Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {

                var _ = this;

                return _.options[option];
            };

            Slick.prototype.getNavigableIndexes = function () {

                var _ = this,
                    breakPoint = 0,
                    counter = 0,
                    indexes = [],
                    max;

                if (_.options.infinite === false) {
                    max = _.slideCount;
                } else {
                    breakPoint = _.options.slidesToScroll * -1;
                    counter = _.options.slidesToScroll * -1;
                    max = _.slideCount * 2;
                }

                while (breakPoint < max) {
                    indexes.push(breakPoint);
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }

                return indexes;
            };

            Slick.prototype.getSlick = function () {

                return this;
            };

            Slick.prototype.getSlideCount = function () {

                var _ = this,
                    slidesTraversed,
                    swipedSlide,
                    centerOffset;

                centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

                if (_.options.swipeToSlide === true) {
                    _.$slideTrack.find('.slick-slide').each(function (index, slide) {
                        if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
                            swipedSlide = slide;
                            return false;
                        }
                    });

                    slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

                    return slidesTraversed;
                } else {
                    return _.options.slidesToScroll;
                }
            };

            Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {

                var _ = this;

                _.changeSlide({
                    data: {
                        message: 'index',
                        index: parseInt(slide)
                    }
                }, dontAnimate);
            };

            Slick.prototype.init = function (creation) {

                var _ = this;

                if (!$(_.$slider).hasClass('slick-initialized')) {

                    $(_.$slider).addClass('slick-initialized');

                    _.buildRows();
                    _.buildOut();
                    _.setProps();
                    _.startLoad();
                    _.loadSlider();
                    _.initializeEvents();
                    _.updateArrows();
                    _.updateDots();
                    _.checkResponsive(true);
                    _.focusHandler();
                }

                if (creation) {
                    _.$slider.trigger('init', [_]);
                }

                if (_.options.accessibility === true) {
                    _.initADA();
                }

                if (_.options.autoplay) {

                    _.paused = false;
                    _.autoPlay();
                }
            };

            Slick.prototype.initADA = function () {
                var _ = this,
                    numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                    tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
                    return val >= 0 && val < _.slideCount;
                });

                _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
                    'aria-hidden': 'true',
                    'tabindex': '-1'
                }).find('a, input, button, select').attr({
                    'tabindex': '-1'
                });

                if (_.$dots !== null) {
                    _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
                        var slideControlIndex = tabControlIndexes.indexOf(i);

                        $(this).attr({
                            'role': 'tabpanel',
                            'id': 'slick-slide' + _.instanceUid + i,
                            'tabindex': -1
                        });

                        if (slideControlIndex !== -1) {
                            $(this).attr({
                                'aria-describedby': 'slick-slide-control' + _.instanceUid + slideControlIndex
                            });
                        }
                    });

                    _.$dots.attr('role', 'tablist').find('li').each(function (i) {
                        var mappedSlideIndex = tabControlIndexes[i];

                        $(this).attr({
                            'role': 'presentation'
                        });

                        $(this).find('button').first().attr({
                            'role': 'tab',
                            'id': 'slick-slide-control' + _.instanceUid + i,
                            'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                            'aria-label': i + 1 + ' of ' + numDotGroups,
                            'aria-selected': null,
                            'tabindex': '-1'
                        });
                    }).eq(_.currentSlide).find('button').attr({
                        'aria-selected': 'true',
                        'tabindex': '0'
                    }).end();
                }

                for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
                    _.$slides.eq(i).attr('tabindex', 0);
                }

                _.activateADA();
            };

            Slick.prototype.initArrowEvents = function () {

                var _ = this;

                if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
                    _.$prevArrow.off('click.slick').on('click.slick', {
                        message: 'previous'
                    }, _.changeSlide);
                    _.$nextArrow.off('click.slick').on('click.slick', {
                        message: 'next'
                    }, _.changeSlide);

                    if (_.options.accessibility === true) {
                        _.$prevArrow.on('keydown.slick', _.keyHandler);
                        _.$nextArrow.on('keydown.slick', _.keyHandler);
                    }
                }
            };

            Slick.prototype.initDotEvents = function () {

                var _ = this;

                if (_.options.dots === true) {
                    $('li', _.$dots).on('click.slick', {
                        message: 'index'
                    }, _.changeSlide);

                    if (_.options.accessibility === true) {
                        _.$dots.on('keydown.slick', _.keyHandler);
                    }
                }

                if (_.options.dots === true && _.options.pauseOnDotsHover === true) {

                    $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
                }
            };

            Slick.prototype.initSlideEvents = function () {

                var _ = this;

                if (_.options.pauseOnHover) {

                    _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
                    _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
                }
            };

            Slick.prototype.initializeEvents = function () {

                var _ = this;

                _.initArrowEvents();

                _.initDotEvents();
                _.initSlideEvents();

                _.$list.on('touchstart.slick mousedown.slick', {
                    action: 'start'
                }, _.swipeHandler);
                _.$list.on('touchmove.slick mousemove.slick', {
                    action: 'move'
                }, _.swipeHandler);
                _.$list.on('touchend.slick mouseup.slick', {
                    action: 'end'
                }, _.swipeHandler);
                _.$list.on('touchcancel.slick mouseleave.slick', {
                    action: 'end'
                }, _.swipeHandler);

                _.$list.on('click.slick', _.clickHandler);

                $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

                if (_.options.accessibility === true) {
                    _.$list.on('keydown.slick', _.keyHandler);
                }

                if (_.options.focusOnSelect === true) {
                    $(_.$slideTrack).children().on('click.slick', _.selectHandler);
                }

                $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

                $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

                $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

                $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
                $(_.setPosition);
            };

            Slick.prototype.initUI = function () {

                var _ = this;

                if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

                    _.$prevArrow.show();
                    _.$nextArrow.show();
                }

                if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

                    _.$dots.show();
                }
            };

            Slick.prototype.keyHandler = function (event) {

                var _ = this;
                //Dont slide if the cursor is inside the form fields and arrow keys are pressed
                if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
                    if (event.keyCode === 37 && _.options.accessibility === true) {
                        _.changeSlide({
                            data: {
                                message: _.options.rtl === true ? 'next' : 'previous'
                            }
                        });
                    } else if (event.keyCode === 39 && _.options.accessibility === true) {
                        _.changeSlide({
                            data: {
                                message: _.options.rtl === true ? 'previous' : 'next'
                            }
                        });
                    }
                }
            };

            Slick.prototype.lazyLoad = function () {

                var _ = this,
                    loadRange,
                    cloneRange,
                    rangeStart,
                    rangeEnd;

                function loadImages(imagesScope) {

                    $('img[data-lazy]', imagesScope).each(function () {

                        var image = $(this),
                            imageSource = $(this).attr('data-lazy'),
                            imageSrcSet = $(this).attr('data-srcset'),
                            imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                            imageToLoad = document.createElement('img');

                        imageToLoad.onload = function () {

                            image.animate({ opacity: 0 }, 100, function () {

                                if (imageSrcSet) {
                                    image.attr('srcset', imageSrcSet);

                                    if (imageSizes) {
                                        image.attr('sizes', imageSizes);
                                    }
                                }

                                image.attr('src', imageSource).animate({ opacity: 1 }, 200, function () {
                                    image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
                                });
                                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                            });
                        };

                        imageToLoad.onerror = function () {

                            image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                            _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
                        };

                        imageToLoad.src = imageSource;
                    });
                }

                if (_.options.centerMode === true) {
                    if (_.options.infinite === true) {
                        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                        rangeEnd = rangeStart + _.options.slidesToShow + 2;
                    } else {
                        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
                    }
                } else {
                    rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
                    rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
                    if (_.options.fade === true) {
                        if (rangeStart > 0) rangeStart--;
                        if (rangeEnd <= _.slideCount) rangeEnd++;
                    }
                }

                loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

                if (_.options.lazyLoad === 'anticipated') {
                    var prevSlide = rangeStart - 1,
                        nextSlide = rangeEnd,
                        $slides = _.$slider.find('.slick-slide');

                    for (var i = 0; i < _.options.slidesToScroll; i++) {
                        if (prevSlide < 0) prevSlide = _.slideCount - 1;
                        loadRange = loadRange.add($slides.eq(prevSlide));
                        loadRange = loadRange.add($slides.eq(nextSlide));
                        prevSlide--;
                        nextSlide++;
                    }
                }

                loadImages(loadRange);

                if (_.slideCount <= _.options.slidesToShow) {
                    cloneRange = _.$slider.find('.slick-slide');
                    loadImages(cloneRange);
                } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
                    cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
                    loadImages(cloneRange);
                } else if (_.currentSlide === 0) {
                    cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
                    loadImages(cloneRange);
                }
            };

            Slick.prototype.loadSlider = function () {

                var _ = this;

                _.setPosition();

                _.$slideTrack.css({
                    opacity: 1
                });

                _.$slider.removeClass('slick-loading');

                _.initUI();

                if (_.options.lazyLoad === 'progressive') {
                    _.progressiveLazyLoad();
                }
            };

            Slick.prototype.next = Slick.prototype.slickNext = function () {

                var _ = this;

                _.changeSlide({
                    data: {
                        message: 'next'
                    }
                });
            };

            Slick.prototype.orientationChange = function () {

                var _ = this;

                _.checkResponsive();
                _.setPosition();
            };

            Slick.prototype.pause = Slick.prototype.slickPause = function () {

                var _ = this;

                _.autoPlayClear();
                _.paused = true;
            };

            Slick.prototype.play = Slick.prototype.slickPlay = function () {

                var _ = this;

                _.autoPlay();
                _.options.autoplay = true;
                _.paused = false;
                _.focussed = false;
                _.interrupted = false;
            };

            Slick.prototype.postSlide = function (index) {

                var _ = this;

                if (!_.unslicked) {

                    _.$slider.trigger('afterChange', [_, index]);

                    _.animating = false;

                    if (_.slideCount > _.options.slidesToShow) {
                        _.setPosition();
                    }

                    _.swipeLeft = null;

                    if (_.options.autoplay) {
                        _.autoPlay();
                    }

                    if (_.options.accessibility === true) {
                        _.initADA();
                        // for non-autoplay: once active slide (group) has updated, set focus on first newly showing slide 
                        if (!_.options.autoplay) {
                            var $currentSlide = $(_.$slides.get(_.currentSlide));
                            $currentSlide.attr('tabindex', 0).focus();
                        }
                    }
                }
            };

            Slick.prototype.prev = Slick.prototype.slickPrev = function () {

                var _ = this;

                _.changeSlide({
                    data: {
                        message: 'previous'
                    }
                });
            };

            Slick.prototype.preventDefault = function (event) {

                event.preventDefault();
            };

            Slick.prototype.progressiveLazyLoad = function (tryCount) {

                tryCount = tryCount || 1;

                var _ = this,
                    $imgsToLoad = $('img[data-lazy]', _.$slider),
                    image,
                    imageSource,
                    imageSrcSet,
                    imageSizes,
                    imageToLoad;

                if ($imgsToLoad.length) {

                    image = $imgsToLoad.first();
                    imageSource = image.attr('data-lazy');
                    imageSrcSet = image.attr('data-srcset');
                    imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
                    imageToLoad = document.createElement('img');

                    imageToLoad.onload = function () {

                        if (imageSrcSet) {
                            image.attr('srcset', imageSrcSet);

                            if (imageSizes) {
                                image.attr('sizes', imageSizes);
                            }
                        }

                        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

                        if (_.options.adaptiveHeight === true) {
                            _.setPosition();
                        }

                        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        _.progressiveLazyLoad();
                    };

                    imageToLoad.onerror = function () {

                        if (tryCount < 3) {

                            /**
                             * try to load the image 3 times,
                             * leave a slight delay so we don't get
                             * servers blocking the request.
                             */
                            setTimeout(function () {
                                _.progressiveLazyLoad(tryCount + 1);
                            }, 500);
                        } else {

                            image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

                            _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

                            _.progressiveLazyLoad();
                        }
                    };

                    imageToLoad.src = imageSource;
                } else {

                    _.$slider.trigger('allImagesLoaded', [_]);
                }
            };

            Slick.prototype.refresh = function (initializing) {

                var _ = this,
                    currentSlide,
                    lastVisibleIndex;

                lastVisibleIndex = _.slideCount - _.options.slidesToShow;

                // in non-infinite sliders, we don't want to go past the
                // last visible index.
                if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
                    _.currentSlide = lastVisibleIndex;
                }

                // if less slides than to show, go to start.
                if (_.slideCount <= _.options.slidesToShow) {
                    _.currentSlide = 0;
                }

                currentSlide = _.currentSlide;

                _.destroy(true);

                $.extend(_, _.initials, { currentSlide: currentSlide });

                _.init();

                if (!initializing) {

                    _.changeSlide({
                        data: {
                            message: 'index',
                            index: currentSlide
                        }
                    }, false);
                }
            };

            Slick.prototype.registerBreakpoints = function () {

                var _ = this,
                    breakpoint,
                    currentBreakpoint,
                    l,
                    responsiveSettings = _.options.responsive || null;

                if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {

                    _.respondTo = _.options.respondTo || 'window';

                    for (breakpoint in responsiveSettings) {

                        l = _.breakpoints.length - 1;

                        if (responsiveSettings.hasOwnProperty(breakpoint)) {
                            currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                            // loop through the breakpoints and cut out any existing
                            // ones with the same breakpoint number, we don't want dupes.
                            while (l >= 0) {
                                if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                                    _.breakpoints.splice(l, 1);
                                }
                                l--;
                            }

                            _.breakpoints.push(currentBreakpoint);
                            _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                        }
                    }

                    _.breakpoints.sort(function (a, b) {
                        return _.options.mobileFirst ? a - b : b - a;
                    });
                }
            };

            Slick.prototype.reinit = function () {

                var _ = this;

                _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');

                _.slideCount = _.$slides.length;

                if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
                    _.currentSlide = _.currentSlide - _.options.slidesToScroll;
                }

                if (_.slideCount <= _.options.slidesToShow) {
                    _.currentSlide = 0;
                }

                _.registerBreakpoints();

                _.setProps();
                _.setupInfinite();
                _.buildArrows();
                _.updateArrows();
                _.initArrowEvents();
                _.buildDots();
                _.updateDots();
                _.initDotEvents();
                _.cleanUpSlideEvents();
                _.initSlideEvents();

                _.checkResponsive(false, true);

                if (_.options.focusOnSelect === true) {
                    $(_.$slideTrack).children().on('click.slick', _.selectHandler);
                }

                _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

                _.setPosition();
                _.focusHandler();

                _.paused = !_.options.autoplay;
                _.autoPlay();

                _.$slider.trigger('reInit', [_]);
            };

            Slick.prototype.resize = function () {

                var _ = this;

                if ($(window).width() !== _.windowWidth) {
                    clearTimeout(_.windowDelay);
                    _.windowDelay = window.setTimeout(function () {
                        _.windowWidth = $(window).width();
                        _.checkResponsive();
                        if (!_.unslicked) {
                            _.setPosition();
                        }
                    }, 50);
                }
            };

            Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {

                var _ = this;

                if (typeof index === 'boolean') {
                    removeBefore = index;
                    index = removeBefore === true ? 0 : _.slideCount - 1;
                } else {
                    index = removeBefore === true ? --index : index;
                }

                if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
                    return false;
                }

                _.unload();

                if (removeAll === true) {
                    _.$slideTrack.children().remove();
                } else {
                    _.$slideTrack.children(this.options.slide).eq(index).remove();
                }

                _.$slides = _.$slideTrack.children(this.options.slide);

                _.$slideTrack.children(this.options.slide).detach();

                _.$slideTrack.append(_.$slides);

                _.$slidesCache = _.$slides;

                _.reinit();
            };

            Slick.prototype.setCSS = function (position) {

                var _ = this,
                    positionProps = {},
                    x,
                    y;

                if (_.options.rtl === true) {
                    position = -position;
                }
                x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
                y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

                positionProps[_.positionProp] = position;

                if (_.transformsEnabled === false) {
                    _.$slideTrack.css(positionProps);
                } else {
                    positionProps = {};
                    if (_.cssTransitions === false) {
                        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                        _.$slideTrack.css(positionProps);
                    } else {
                        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                        _.$slideTrack.css(positionProps);
                    }
                }
            };

            Slick.prototype.setDimensions = function () {

                var _ = this;

                if (_.options.vertical === false) {
                    if (_.options.centerMode === true) {
                        _.$list.css({
                            padding: '0px ' + _.options.centerPadding
                        });
                    }
                } else {
                    _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
                    if (_.options.centerMode === true) {
                        _.$list.css({
                            padding: _.options.centerPadding + ' 0px'
                        });
                    }
                }

                _.listWidth = _.$list.width();
                _.listHeight = _.$list.height();

                if (_.options.vertical === false && _.options.variableWidth === false) {
                    _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
                    _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
                } else if (_.options.variableWidth === true) {
                    _.$slideTrack.width(5000 * _.slideCount);
                } else {
                    _.slideWidth = Math.ceil(_.listWidth);
                    _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
                }

                var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
                if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
            };

            Slick.prototype.setFade = function () {

                var _ = this,
                    targetLeft;

                _.$slides.each(function (index, element) {
                    targetLeft = _.slideWidth * index * -1;
                    if (_.options.rtl === true) {
                        $(element).css({
                            position: 'relative',
                            right: targetLeft,
                            top: 0,
                            zIndex: _.options.zIndex - 2,
                            opacity: 0
                        });
                    } else {
                        $(element).css({
                            position: 'relative',
                            left: targetLeft,
                            top: 0,
                            zIndex: _.options.zIndex - 2,
                            opacity: 0
                        });
                    }
                });

                _.$slides.eq(_.currentSlide).css({
                    zIndex: _.options.zIndex - 1,
                    opacity: 1
                });
            };

            Slick.prototype.setHeight = function () {

                var _ = this;

                if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
                    var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
                    _.$list.css('height', targetHeight);
                }
            };

            Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {

                /**
                 * accepts arguments in format of:
                 *
                 *  - for changing a single option's value:
                 *     .slick("setOption", option, value, refresh )
                 *
                 *  - for changing a set of responsive options:
                 *     .slick("setOption", 'responsive', [{}, ...], refresh )
                 *
                 *  - for updating multiple values at once (not responsive)
                 *     .slick("setOption", { 'option': value, ... }, refresh )
                 */

                var _ = this,
                    l,
                    item,
                    option,
                    value,
                    refresh = false,
                    type;

                if ($.type(arguments[0]) === 'object') {

                    option = arguments[0];
                    refresh = arguments[1];
                    type = 'multiple';
                } else if ($.type(arguments[0]) === 'string') {

                    option = arguments[0];
                    value = arguments[1];
                    refresh = arguments[2];

                    if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {

                        type = 'responsive';
                    } else if (typeof arguments[1] !== 'undefined') {

                        type = 'single';
                    }
                }

                if (type === 'single') {

                    _.options[option] = value;
                } else if (type === 'multiple') {

                    $.each(option, function (opt, val) {

                        _.options[opt] = val;
                    });
                } else if (type === 'responsive') {

                    for (item in value) {

                        if ($.type(_.options.responsive) !== 'array') {

                            _.options.responsive = [value[item]];
                        } else {

                            l = _.options.responsive.length - 1;

                            // loop through the responsive object and splice out duplicates.
                            while (l >= 0) {

                                if (_.options.responsive[l].breakpoint === value[item].breakpoint) {

                                    _.options.responsive.splice(l, 1);
                                }

                                l--;
                            }

                            _.options.responsive.push(value[item]);
                        }
                    }
                }

                if (refresh) {

                    _.unload();
                    _.reinit();
                }
            };

            Slick.prototype.setPosition = function () {

                var _ = this;

                _.setDimensions();

                _.setHeight();

                if (_.options.fade === false) {
                    _.setCSS(_.getLeft(_.currentSlide));
                } else {
                    _.setFade();
                }

                _.$slider.trigger('setPosition', [_]);
            };

            Slick.prototype.setProps = function () {

                var _ = this,
                    bodyStyle = document.body.style;

                _.positionProp = _.options.vertical === true ? 'top' : 'left';

                if (_.positionProp === 'top') {
                    _.$slider.addClass('slick-vertical');
                } else {
                    _.$slider.removeClass('slick-vertical');
                }

                if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
                    if (_.options.useCSS === true) {
                        _.cssTransitions = true;
                    }
                }

                if (_.options.fade) {
                    if (typeof _.options.zIndex === 'number') {
                        if (_.options.zIndex < 3) {
                            _.options.zIndex = 3;
                        }
                    } else {
                        _.options.zIndex = _.defaults.zIndex;
                    }
                }

                if (bodyStyle.OTransform !== undefined) {
                    _.animType = 'OTransform';
                    _.transformType = '-o-transform';
                    _.transitionType = 'OTransition';
                    if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
                }
                if (bodyStyle.MozTransform !== undefined) {
                    _.animType = 'MozTransform';
                    _.transformType = '-moz-transform';
                    _.transitionType = 'MozTransition';
                    if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
                }
                if (bodyStyle.webkitTransform !== undefined) {
                    _.animType = 'webkitTransform';
                    _.transformType = '-webkit-transform';
                    _.transitionType = 'webkitTransition';
                    if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
                }
                if (bodyStyle.msTransform !== undefined) {
                    _.animType = 'msTransform';
                    _.transformType = '-ms-transform';
                    _.transitionType = 'msTransition';
                    if (bodyStyle.msTransform === undefined) _.animType = false;
                }
                if (bodyStyle.transform !== undefined && _.animType !== false) {
                    _.animType = 'transform';
                    _.transformType = 'transform';
                    _.transitionType = 'transition';
                }
                _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
            };

            Slick.prototype.setSlideClasses = function (index) {

                var _ = this,
                    centerOffset,
                    allSlides,
                    indexOffset,
                    remainder;

                allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

                _.$slides.eq(index).addClass('slick-current');

                if (_.options.centerMode === true) {

                    centerOffset = Math.floor(_.options.slidesToShow / 2);

                    if (_.options.infinite === true) {

                        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {

                            _.$slides.slice(index - centerOffset, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
                        } else {

                            indexOffset = _.options.slidesToShow + index;
                            allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
                        }

                        if (index === 0) {

                            allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
                        } else if (index === _.slideCount - 1) {

                            allSlides.eq(_.options.slidesToShow).addClass('slick-center');
                        }
                    }

                    _.$slides.eq(index).addClass('slick-center');
                } else {

                    if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {

                        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
                    } else if (allSlides.length <= _.options.slidesToShow) {

                        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
                    } else {

                        remainder = _.slideCount % _.options.slidesToShow;
                        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {

                            allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
                        } else {

                            allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
                        }
                    }
                }

                if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
                    _.lazyLoad();
                }
            };

            Slick.prototype.setupInfinite = function () {

                var _ = this,
                    i,
                    slideIndex,
                    infiniteCount;

                if (_.options.fade === true) {
                    _.options.centerMode = false;
                }

                if (_.options.infinite === true && _.options.fade === false) {

                    slideIndex = null;

                    if (_.slideCount > _.options.slidesToShow) {

                        if (_.options.centerMode === true) {
                            infiniteCount = _.options.slidesToShow + 1;
                        } else {
                            infiniteCount = _.options.slidesToShow;
                        }

                        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
                            slideIndex = i - 1;
                            $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
                        }
                        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
                            slideIndex = i;
                            $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
                        }
                        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
                            $(this).attr('id', '');
                        });
                    }
                }
            };

            Slick.prototype.interrupt = function (toggle) {

                var _ = this;

                if (!toggle) {
                    _.autoPlay();
                }
                _.interrupted = toggle;
            };

            Slick.prototype.selectHandler = function (event) {

                var _ = this;

                var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');

                var index = parseInt(targetElement.attr('data-slick-index'));

                if (!index) index = 0;

                if (_.slideCount <= _.options.slidesToShow) {

                    _.slideHandler(index, false, true);
                    return;
                }

                _.slideHandler(index);
            };

            Slick.prototype.slideHandler = function (index, sync, dontAnimate) {

                var targetSlide,
                    animSlide,
                    oldSlide,
                    slideLeft,
                    targetLeft = null,
                    _ = this,
                    navTarget;

                sync = sync || false;

                if (_.animating === true && _.options.waitForAnimate === true) {
                    return;
                }

                if (_.options.fade === true && _.currentSlide === index) {
                    return;
                }

                if (sync === false) {
                    _.asNavFor(index);
                }

                targetSlide = index;
                targetLeft = _.getLeft(targetSlide);
                slideLeft = _.getLeft(_.currentSlide);

                _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

                if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
                    if (_.options.fade === false) {
                        targetSlide = _.currentSlide;
                        if (dontAnimate !== true) {
                            _.animateSlide(slideLeft, function () {
                                _.postSlide(targetSlide);
                            });
                        } else {
                            _.postSlide(targetSlide);
                        }
                    }
                    return;
                } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
                    if (_.options.fade === false) {
                        targetSlide = _.currentSlide;
                        if (dontAnimate !== true) {
                            _.animateSlide(slideLeft, function () {
                                _.postSlide(targetSlide);
                            });
                        } else {
                            _.postSlide(targetSlide);
                        }
                    }
                    return;
                }

                if (_.options.autoplay) {
                    clearInterval(_.autoPlayTimer);
                }

                if (targetSlide < 0) {
                    if (_.slideCount % _.options.slidesToScroll !== 0) {
                        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
                    } else {
                        animSlide = _.slideCount + targetSlide;
                    }
                } else if (targetSlide >= _.slideCount) {
                    if (_.slideCount % _.options.slidesToScroll !== 0) {
                        animSlide = 0;
                    } else {
                        animSlide = targetSlide - _.slideCount;
                    }
                } else {
                    animSlide = targetSlide;
                }

                _.animating = true;

                _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

                oldSlide = _.currentSlide;
                _.currentSlide = animSlide;

                _.setSlideClasses(_.currentSlide);

                if (_.options.asNavFor) {

                    navTarget = _.getNavTarget();
                    navTarget = navTarget.slick('getSlick');

                    if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                        navTarget.setSlideClasses(_.currentSlide);
                    }
                }

                _.updateDots();
                _.updateArrows();

                if (_.options.fade === true) {
                    if (dontAnimate !== true) {

                        _.fadeSlideOut(oldSlide);

                        _.fadeSlide(animSlide, function () {
                            _.postSlide(animSlide);
                        });
                    } else {
                        _.postSlide(animSlide);
                    }
                    _.animateHeight();
                    return;
                }

                if (dontAnimate !== true) {
                    _.animateSlide(targetLeft, function () {
                        _.postSlide(animSlide);
                    });
                } else {
                    _.postSlide(animSlide);
                }
            };

            Slick.prototype.startLoad = function () {

                var _ = this;

                if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

                    _.$prevArrow.hide();
                    _.$nextArrow.hide();
                }

                if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

                    _.$dots.hide();
                }

                _.$slider.addClass('slick-loading');
            };

            Slick.prototype.swipeDirection = function () {

                var xDist,
                    yDist,
                    r,
                    swipeAngle,
                    _ = this;

                xDist = _.touchObject.startX - _.touchObject.curX;
                yDist = _.touchObject.startY - _.touchObject.curY;
                r = Math.atan2(yDist, xDist);

                swipeAngle = Math.round(r * 180 / Math.PI);
                if (swipeAngle < 0) {
                    swipeAngle = 360 - Math.abs(swipeAngle);
                }

                if (swipeAngle <= 45 && swipeAngle >= 0) {
                    return _.options.rtl === false ? 'left' : 'right';
                }
                if (swipeAngle <= 360 && swipeAngle >= 315) {
                    return _.options.rtl === false ? 'left' : 'right';
                }
                if (swipeAngle >= 135 && swipeAngle <= 225) {
                    return _.options.rtl === false ? 'right' : 'left';
                }
                if (_.options.verticalSwiping === true) {
                    if (swipeAngle >= 35 && swipeAngle <= 135) {
                        return 'down';
                    } else {
                        return 'up';
                    }
                }

                return 'vertical';
            };

            Slick.prototype.swipeEnd = function (event) {

                var _ = this,
                    slideCount,
                    direction;

                _.dragging = false;
                _.swiping = false;

                if (_.scrolling) {
                    _.scrolling = false;
                    return false;
                }

                _.interrupted = false;
                _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

                if (_.touchObject.curX === undefined) {
                    return false;
                }

                if (_.touchObject.edgeHit === true) {
                    _.$slider.trigger('edge', [_, _.swipeDirection()]);
                }

                if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {

                    direction = _.swipeDirection();

                    switch (direction) {

                        case 'left':
                        case 'down':

                            slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();

                            _.currentDirection = 0;

                            break;

                        case 'right':
                        case 'up':

                            slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();

                            _.currentDirection = 1;

                            break;

                        default:

                    }

                    if (direction != 'vertical') {

                        _.slideHandler(slideCount);
                        _.touchObject = {};
                        _.$slider.trigger('swipe', [_, direction]);
                    }
                } else {

                    if (_.touchObject.startX !== _.touchObject.curX) {

                        _.slideHandler(_.currentSlide);
                        _.touchObject = {};
                    }
                }
            };

            Slick.prototype.swipeHandler = function (event) {

                var _ = this;

                if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
                    return;
                } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
                    return;
                }

                _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;

                _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

                if (_.options.verticalSwiping === true) {
                    _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
                }

                switch (event.data.action) {

                    case 'start':
                        _.swipeStart(event);
                        break;

                    case 'move':
                        _.swipeMove(event);
                        break;

                    case 'end':
                        _.swipeEnd(event);
                        break;

                }
            };

            Slick.prototype.swipeMove = function (event) {

                var _ = this,
                    edgeWasHit = false,
                    curLeft,
                    swipeDirection,
                    swipeLength,
                    positionOffset,
                    touches,
                    verticalSwipeLength;

                touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

                if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
                    return false;
                }

                curLeft = _.getLeft(_.currentSlide);

                _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
                _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

                _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

                verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

                if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
                    _.scrolling = true;
                    return false;
                }

                if (_.options.verticalSwiping === true) {
                    _.touchObject.swipeLength = verticalSwipeLength;
                }

                swipeDirection = _.swipeDirection();

                if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
                    _.swiping = true;
                    event.preventDefault();
                }

                positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
                if (_.options.verticalSwiping === true) {
                    positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
                }

                swipeLength = _.touchObject.swipeLength;

                _.touchObject.edgeHit = false;

                if (_.options.infinite === false) {
                    if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
                        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                        _.touchObject.edgeHit = true;
                    }
                }

                if (_.options.vertical === false) {
                    _.swipeLeft = curLeft + swipeLength * positionOffset;
                } else {
                    _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
                }
                if (_.options.verticalSwiping === true) {
                    _.swipeLeft = curLeft + swipeLength * positionOffset;
                }

                if (_.options.fade === true || _.options.touchMove === false) {
                    return false;
                }

                if (_.animating === true) {
                    _.swipeLeft = null;
                    return false;
                }

                _.setCSS(_.swipeLeft);
            };

            Slick.prototype.swipeStart = function (event) {

                var _ = this,
                    touches;

                _.interrupted = true;

                if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
                    _.touchObject = {};
                    return false;
                }

                if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
                    touches = event.originalEvent.touches[0];
                }

                _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
                _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

                _.dragging = true;
            };

            Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {

                var _ = this;

                if (_.$slidesCache !== null) {

                    _.unload();

                    _.$slideTrack.children(this.options.slide).detach();

                    _.$slidesCache.appendTo(_.$slideTrack);

                    _.reinit();
                }
            };

            Slick.prototype.unload = function () {

                var _ = this;

                $('.slick-cloned', _.$slider).remove();

                if (_.$dots) {
                    _.$dots.remove();
                }

                if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.remove();
                }

                if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.remove();
                }

                _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
            };

            Slick.prototype.unslick = function (fromBreakpoint) {

                var _ = this;
                _.$slider.trigger('unslick', [_, fromBreakpoint]);
                _.destroy();
            };

            Slick.prototype.updateArrows = function () {

                var _ = this,
                    centerOffset;

                centerOffset = Math.floor(_.options.slidesToShow / 2);

                if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {

                    _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
                    _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

                    if (_.currentSlide === 0) {

                        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
                    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
                    } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
                    }
                }
            };

            Slick.prototype.updateDots = function () {

                var _ = this;

                if (_.$dots !== null) {

                    _.$dots.find('li').removeClass('slick-active').end();

                    _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
                }
            };

            Slick.prototype.visibility = function () {

                var _ = this;

                if (_.options.autoplay) {

                    if (document[_.hidden]) {

                        _.interrupted = true;
                    } else {

                        _.interrupted = false;
                    }
                }
            };

            $.fn.slick = function () {
                var _ = this,
                    opt = arguments[0],
                    args = Array.prototype.slice.call(arguments, 1),
                    l = _.length,
                    i,
                    ret;
                for (i = 0; i < l; i++) {
                    if (typeof opt == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
                    if (typeof ret != 'undefined') return ret;
                }
                return _;
            };
        });
    })(this);

    return _retrieveGlobal();
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/carousel/init.js", ["slick-carousel"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: Carousel
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("slick-carousel");
    $(function () {
        // new Carousel('.new-product-carousel', {interval: 8000});
        // new Carousel('.top-product-carousel', {interval: 6000});
        var $top = $('#top-products');
        var $new = $('#new-products');
        $top.slick({
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 6000,
            speed: 400,
            slidesToShow: 2,
            slidesToScroll: 2,
            rows: 2,
            nextArrow: $top.parents('.panel').find('[data-slide="next"]'),
            prevArrow: $top.parents('.panel').find('[data-slide="prev"]'),
            responsive: [{
                arrows: false,
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
        $new.slick({
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 8000,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 2,
            rows: 2,
            nextArrow: $new.parents('.panel').find('[data-slide="next"]'),
            prevArrow: $new.parents('.panel').find('[data-slide="prev"]'),
            responsive: [{
                arrows: false,
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        });
    });
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/weather/weather.js", ["css-element-queries/src/ResizeSensor"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: weather-class
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    var ResizeSensor = $__require("css-element-queries/src/ResizeSensor");
    var Weather = function () {
        /**
         *
         * @param {string | Element} selector - Canvas element
         * @param {string} image - image being drown in the canvas
         * @param {number} scale - scale of the image
         * @param {number} dx - animation step in X - axis
         * @param {number} y - Vertical offset
         */
        function Weather(selector, image, scale, dx, y) {
            if (scale === void 0) {
                scale = 1.3;
            }
            if (dx === void 0) {
                dx = .07;
            }
            if (y === void 0) {
                y = -4.5;
            }
            this.selector = selector;
            this.image = image;
            this.scale = scale;
            this.dx = dx;
            this.y = y;
            this.img = new Image();
            this.img.src = this.image;
            this.x = 0;
            $(this.ready.bind(this));
            this.img.onload = this.load.bind(this);
        }
        Weather.requestAnimFrame = function (callback) {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(callback);
            } else if (window.webkitRequestAnimationFrame) {
                window.webkitRequestAnimationFrame(callback);
            } else {
                window.setTimeout(callback, 1000 / 60);
            }
        };
        Weather.prototype.ready = function () {
            var $canvas = $(this.selector);
            $canvas.attr('width', $canvas.parent().width()).attr('height', $canvas.parent().height());
            this.CanvasXSize = $canvas.width();
            this.CanvasYSize = $canvas.height();
            var $parent = $canvas.parents('.panel-wrap');
            if ($parent.parent().hasClass('grid-stack')) {
                $canvas.parents('.grid-stack-item').on('grid-stack-item-updated', this.handleResize.bind(this));
            } else {
                new ResizeSensor($canvas.parent(), this.handleResize.bind(this));
            }
        };
        Weather.prototype.handleResize = function () {
            var $canvas = $(this.selector);
            $canvas.attr('width', $canvas.parent().width()).attr('height', $canvas.parent().height());
            this.CanvasXSize = $canvas.width();
            this.CanvasYSize = $canvas.height();
            this.x = 0;
        };
        Weather.prototype.load = function () {
            this.imgW = this.img.width * this.scale;
            this.imgH = this.img.height * this.scale;
            if (this.imgW > this.CanvasXSize) {
                this.x = this.CanvasXSize - this.imgW;
            } // image larger than canvas
            if (this.imgW > this.CanvasXSize) {
                this.clearX = this.imgW;
            } else {
                this.clearX = this.CanvasXSize;
            }
            // image larger than canvas
            if (this.imgH > this.CanvasYSize) {
                this.clearY = this.imgH;
            } else {
                this.clearY = this.CanvasYSize;
            }
            // Get Canvas Element
            if ($(this.selector).length) {
                this.ctx = $(this.selector).get(0).getContext('2d');
                this.animloop();
            }
        };
        ;
        Weather.prototype.animloop = function () {
            Weather.requestAnimFrame(this.animloop.bind(this));
            this.draw();
        };
        ;
        Weather.prototype.draw = function () {
            //Clear Canvas
            this.ctx.clearRect(0, 0, this.clearX, this.clearY);
            //If image is <= Canvas Size
            if (this.imgW <= this.CanvasXSize) {
                //reset, start from beginning
                if (this.x > this.CanvasXSize) {
                    this.x = 0;
                }
                //draw aditional image
                if (this.x > this.CanvasXSize - this.imgW) {
                    this.ctx.drawImage(this.img, this.x - this.CanvasXSize + 1, this.y, this.imgW, this.imgH);
                }
            } else {
                //reset, start from beginning
                if (this.x > this.CanvasXSize) {
                    this.x = this.CanvasXSize - this.imgW;
                }
                //draw aditional image
                if (this.x > this.CanvasXSize - this.imgW) {
                    this.ctx.drawImage(this.img, this.x - this.imgW + 1, this.y, this.imgW, this.imgH);
                }
            }
            //draw image
            this.ctx.drawImage(this.img, this.x, this.y, this.imgW, this.imgH);
            //amount to move
            this.x += this.dx;
        };
        return Weather;
    }();
    exports.Weather = Weather;
});
System.registerDynamic("npm:skycons@1.0.0.json", [], true, function() {
  return {
    "main": "skycons.js",
    "format": "cjs",
    "meta": {
      "*.json": {
        "format": "json"
      }
    }
  };
});

System.registerDynamic('npm:skycons@1.0.0/skycons.js', [], true, function ($__require, exports, module) {
  /* jshint browser:true, node:true */
  "use strict";

  var global = this || self,
      GLOBAL = global;
  module.exports = function (global) {

    /* Set up a RequestAnimationFrame shim so we can animate efficiently FOR
     * GREAT JUSTICE. */
    var requestInterval, cancelInterval;

    (function () {
      var raf = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame || global.msRequestAnimationFrame,
          caf = global.cancelAnimationFrame || global.webkitCancelAnimationFrame || global.mozCancelAnimationFrame || global.oCancelAnimationFrame || global.msCancelAnimationFrame;

      if (raf && caf) {
        requestInterval = function (fn, delay) {
          var handle = { value: null };

          function loop() {
            handle.value = raf(loop);
            fn();
          }

          loop();
          return handle;
        };

        cancelInterval = function (handle) {
          caf(handle.value);
        };
      } else {
        requestInterval = setInterval;
        cancelInterval = clearInterval;
      }
    })();

    /* Catmull-rom spline stuffs. */
    /*
    function upsample(n, spline) {
      var polyline = [],
          len = spline.length,
          bx  = spline[0],
          by  = spline[1],
          cx  = spline[2],
          cy  = spline[3],
          dx  = spline[4],
          dy  = spline[5],
          i, j, ax, ay, px, qx, rx, sx, py, qy, ry, sy, t;
       for(i = 6; i !== spline.length; i += 2) {
        ax = bx;
        bx = cx;
        cx = dx;
        dx = spline[i    ];
        px = -0.5 * ax + 1.5 * bx - 1.5 * cx + 0.5 * dx;
        qx =        ax - 2.5 * bx + 2.0 * cx - 0.5 * dx;
        rx = -0.5 * ax            + 0.5 * cx           ;
        sx =                   bx                      ;
         ay = by;
        by = cy;
        cy = dy;
        dy = spline[i + 1];
        py = -0.5 * ay + 1.5 * by - 1.5 * cy + 0.5 * dy;
        qy =        ay - 2.5 * by + 2.0 * cy - 0.5 * dy;
        ry = -0.5 * ay            + 0.5 * cy           ;
        sy =                   by                      ;
         for(j = 0; j !== n; ++j) {
          t = j / n;
           polyline.push(
            ((px * t + qx) * t + rx) * t + sx,
            ((py * t + qy) * t + ry) * t + sy
          );
        }
      }
       polyline.push(
        px + qx + rx + sx,
        py + qy + ry + sy
      );
       return polyline;
    }
     function downsample(n, polyline) {
      var len = 0,
          i, dx, dy;
       for(i = 2; i !== polyline.length; i += 2) {
        dx = polyline[i    ] - polyline[i - 2];
        dy = polyline[i + 1] - polyline[i - 1];
        len += Math.sqrt(dx * dx + dy * dy);
      }
       len /= n;
       var small = [],
          target = len,
          min = 0,
          max, t;
       small.push(polyline[0], polyline[1]);
       for(i = 2; i !== polyline.length; i += 2) {
        dx = polyline[i    ] - polyline[i - 2];
        dy = polyline[i + 1] - polyline[i - 1];
        max = min + Math.sqrt(dx * dx + dy * dy);
         if(max > target) {
          t = (target - min) / (max - min);
           small.push(
            polyline[i - 2] + dx * t,
            polyline[i - 1] + dy * t
          );
           target += len;
        }
         min = max;
      }
       small.push(polyline[polyline.length - 2], polyline[polyline.length - 1]);
       return small;
    }
    */

    /* Define skycon things. */
    /* FIXME: I'm *really really* sorry that this code is so gross. Really, I am.
     * I'll try to clean it up eventually! Promise! */
    var KEYFRAME = 500,
        STROKE = 0.08,
        TAU = 2.0 * Math.PI,
        TWO_OVER_SQRT_2 = 2.0 / Math.sqrt(2);

    function circle(ctx, x, y, r) {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, TAU, false);
      ctx.fill();
    }

    function line(ctx, ax, ay, bx, by) {
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }

    function puff(ctx, t, cx, cy, rx, ry, rmin, rmax) {
      var c = Math.cos(t * TAU),
          s = Math.sin(t * TAU);

      rmax -= rmin;

      circle(ctx, cx - s * rx, cy + c * ry + rmax * 0.5, rmin + (1 - c * 0.5) * rmax);
    }

    function puffs(ctx, t, cx, cy, rx, ry, rmin, rmax) {
      var i;

      for (i = 5; i--;) puff(ctx, t + i / 5, cx, cy, rx, ry, rmin, rmax);
    }

    function cloud(ctx, t, cx, cy, cw, s, color) {
      t /= 30000;

      var a = cw * 0.21,
          b = cw * 0.12,
          c = cw * 0.24,
          d = cw * 0.28;

      ctx.fillStyle = color;
      puffs(ctx, t, cx, cy, a, b, c, d);

      ctx.globalCompositeOperation = 'destination-out';
      puffs(ctx, t, cx, cy, a, b, c - s, d - s);
      ctx.globalCompositeOperation = 'source-over';
    }

    function sun(ctx, t, cx, cy, cw, s, color) {
      t /= 120000;

      var a = cw * 0.25 - s * 0.5,
          b = cw * 0.32 + s * 0.5,
          c = cw * 0.50 - s * 0.5,
          i,
          p,
          cos,
          sin;

      ctx.strokeStyle = color;
      ctx.lineWidth = s;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(cx, cy, a, 0, TAU, false);
      ctx.stroke();

      for (i = 8; i--;) {
        p = (t + i / 8) * TAU;
        cos = Math.cos(p);
        sin = Math.sin(p);
        line(ctx, cx + cos * b, cy + sin * b, cx + cos * c, cy + sin * c);
      }
    }

    function moon(ctx, t, cx, cy, cw, s, color) {
      t /= 15000;

      var a = cw * 0.29 - s * 0.5,
          b = cw * 0.05,
          c = Math.cos(t * TAU),
          p = c * TAU / -16;

      ctx.strokeStyle = color;
      ctx.lineWidth = s;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      cx += c * b;

      ctx.beginPath();
      ctx.arc(cx, cy, a, p + TAU / 8, p + TAU * 7 / 8, false);
      ctx.arc(cx + Math.cos(p) * a * TWO_OVER_SQRT_2, cy + Math.sin(p) * a * TWO_OVER_SQRT_2, a, p + TAU * 5 / 8, p + TAU * 3 / 8, true);
      ctx.closePath();
      ctx.stroke();
    }

    function rain(ctx, t, cx, cy, cw, s, color) {
      t /= 1350;

      var a = cw * 0.16,
          b = TAU * 11 / 12,
          c = TAU * 7 / 12,
          i,
          p,
          x,
          y;

      ctx.fillStyle = color;

      for (i = 4; i--;) {
        p = (t + i / 4) % 1;
        x = cx + (i - 1.5) / 1.5 * (i === 1 || i === 2 ? -1 : 1) * a;
        y = cy + p * p * cw;
        ctx.beginPath();
        ctx.moveTo(x, y - s * 1.5);
        ctx.arc(x, y, s * 0.75, b, c, false);
        ctx.fill();
      }
    }

    function sleet(ctx, t, cx, cy, cw, s, color) {
      t /= 750;

      var a = cw * 0.1875,
          b = TAU * 11 / 12,
          c = TAU * 7 / 12,
          i,
          p,
          x,
          y;

      ctx.strokeStyle = color;
      ctx.lineWidth = s * 0.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (i = 4; i--;) {
        p = (t + i / 4) % 1;
        x = Math.floor(cx + (i - 1.5) / 1.5 * (i === 1 || i === 2 ? -1 : 1) * a) + 0.5;
        y = cy + p * cw;
        line(ctx, x, y - s * 1.5, x, y + s * 1.5);
      }
    }

    function snow(ctx, t, cx, cy, cw, s, color) {
      t /= 3000;

      var a = cw * 0.16,
          b = s * 0.75,
          u = t * TAU * 0.7,
          ux = Math.cos(u) * b,
          uy = Math.sin(u) * b,
          v = u + TAU / 3,
          vx = Math.cos(v) * b,
          vy = Math.sin(v) * b,
          w = u + TAU * 2 / 3,
          wx = Math.cos(w) * b,
          wy = Math.sin(w) * b,
          i,
          p,
          x,
          y;

      ctx.strokeStyle = color;
      ctx.lineWidth = s * 0.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (i = 4; i--;) {
        p = (t + i / 4) % 1;
        x = cx + Math.sin((p + i / 4) * TAU) * a;
        y = cy + p * cw;

        line(ctx, x - ux, y - uy, x + ux, y + uy);
        line(ctx, x - vx, y - vy, x + vx, y + vy);
        line(ctx, x - wx, y - wy, x + wx, y + wy);
      }
    }

    function fogbank(ctx, t, cx, cy, cw, s, color) {
      t /= 30000;

      var a = cw * 0.21,
          b = cw * 0.06,
          c = cw * 0.21,
          d = cw * 0.28;

      ctx.fillStyle = color;
      puffs(ctx, t, cx, cy, a, b, c, d);

      ctx.globalCompositeOperation = 'destination-out';
      puffs(ctx, t, cx, cy, a, b, c - s, d - s);
      ctx.globalCompositeOperation = 'source-over';
    }

    /*
    var WIND_PATHS = [
          downsample(63, upsample(8, [
            -1.00, -0.28,
            -0.75, -0.18,
            -0.50,  0.12,
            -0.20,  0.12,
            -0.04, -0.04,
            -0.07, -0.18,
            -0.19, -0.18,
            -0.23, -0.05,
            -0.12,  0.11,
             0.02,  0.16,
             0.20,  0.15,
             0.50,  0.07,
             0.75,  0.18,
             1.00,  0.28
          ])),
          downsample(31, upsample(16, [
            -1.00, -0.10,
            -0.75,  0.00,
            -0.50,  0.10,
            -0.25,  0.14,
             0.00,  0.10,
             0.25,  0.00,
             0.50, -0.10,
             0.75, -0.14,
             1.00, -0.10
          ]))
        ];
    */

    var WIND_PATHS = [[-0.7500, -0.1800, -0.7219, -0.1527, -0.6971, -0.1225, -0.6739, -0.0910, -0.6516, -0.0588, -0.6298, -0.0262, -0.6083, 0.0065, -0.5868, 0.0396, -0.5643, 0.0731, -0.5372, 0.1041, -0.5033, 0.1259, -0.4662, 0.1406, -0.4275, 0.1493, -0.3881, 0.1530, -0.3487, 0.1526, -0.3095, 0.1488, -0.2708, 0.1421, -0.2319, 0.1342, -0.1943, 0.1217, -0.1600, 0.1025, -0.1290, 0.0785, -0.1012, 0.0509, -0.0764, 0.0206, -0.0547, -0.0120, -0.0378, -0.0472, -0.0324, -0.0857, -0.0389, -0.1241, -0.0546, -0.1599, -0.0814, -0.1876, -0.1193, -0.1964, -0.1582, -0.1935, -0.1931, -0.1769, -0.2157, -0.1453, -0.2290, -0.1085, -0.2327, -0.0697, -0.2240, -0.0317, -0.2064, 0.0033, -0.1853, 0.0362, -0.1613, 0.0672, -0.1350, 0.0961, -0.1051, 0.1213, -0.0706, 0.1397, -0.0332, 0.1512, 0.0053, 0.1580, 0.0442, 0.1624, 0.0833, 0.1636, 0.1224, 0.1615, 0.1613, 0.1565, 0.1999, 0.1500, 0.2378, 0.1402, 0.2749, 0.1279, 0.3118, 0.1147, 0.3487, 0.1015, 0.3858, 0.0892, 0.4236, 0.0787, 0.4621, 0.0715, 0.5012, 0.0702, 0.5398, 0.0766, 0.5768, 0.0890, 0.6123, 0.1055, 0.6466, 0.1244, 0.6805, 0.1440, 0.7147, 0.1630, 0.7500, 0.1800], [-0.7500, 0.0000, -0.7033, 0.0195, -0.6569, 0.0399, -0.6104, 0.0600, -0.5634, 0.0789, -0.5155, 0.0954, -0.4667, 0.1089, -0.4174, 0.1206, -0.3676, 0.1299, -0.3174, 0.1365, -0.2669, 0.1398, -0.2162, 0.1391, -0.1658, 0.1347, -0.1157, 0.1271, -0.0661, 0.1169, -0.0170, 0.1046, 0.0316, 0.0903, 0.0791, 0.0728, 0.1259, 0.0534, 0.1723, 0.0331, 0.2188, 0.0129, 0.2656, -0.0064, 0.3122, -0.0263, 0.3586, -0.0466, 0.4052, -0.0665, 0.4525, -0.0847, 0.5007, -0.1002, 0.5497, -0.1130, 0.5991, -0.1240, 0.6491, -0.1325, 0.6994, -0.1380, 0.7500, -0.1400]],
        WIND_OFFSETS = [{ start: 0.36, end: 0.11 }, { start: 0.56, end: 0.16 }];

    function leaf(ctx, t, x, y, cw, s, color) {
      var a = cw / 8,
          b = a / 3,
          c = 2 * b,
          d = t % 1 * TAU,
          e = Math.cos(d),
          f = Math.sin(d);

      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = s;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.arc(x, y, a, d, d + Math.PI, false);
      ctx.arc(x - b * e, y - b * f, c, d + Math.PI, d, false);
      ctx.arc(x + c * e, y + c * f, b, d + Math.PI, d, true);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      ctx.stroke();
    }

    function swoosh(ctx, t, cx, cy, cw, s, index, total, color) {
      t /= 2500;

      var path = WIND_PATHS[index],
          a = (t + index - WIND_OFFSETS[index].start) % total,
          c = (t + index - WIND_OFFSETS[index].end) % total,
          e = (t + index) % total,
          b,
          d,
          f,
          i;

      ctx.strokeStyle = color;
      ctx.lineWidth = s;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (a < 1) {
        ctx.beginPath();

        a *= path.length / 2 - 1;
        b = Math.floor(a);
        a -= b;
        b *= 2;
        b += 2;

        ctx.moveTo(cx + (path[b - 2] * (1 - a) + path[b] * a) * cw, cy + (path[b - 1] * (1 - a) + path[b + 1] * a) * cw);

        if (c < 1) {
          c *= path.length / 2 - 1;
          d = Math.floor(c);
          c -= d;
          d *= 2;
          d += 2;

          for (i = b; i !== d; i += 2) ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);

          ctx.lineTo(cx + (path[d - 2] * (1 - c) + path[d] * c) * cw, cy + (path[d - 1] * (1 - c) + path[d + 1] * c) * cw);
        } else for (i = b; i !== path.length; i += 2) ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);

        ctx.stroke();
      } else if (c < 1) {
        ctx.beginPath();

        c *= path.length / 2 - 1;
        d = Math.floor(c);
        c -= d;
        d *= 2;
        d += 2;

        ctx.moveTo(cx + path[0] * cw, cy + path[1] * cw);

        for (i = 2; i !== d; i += 2) ctx.lineTo(cx + path[i] * cw, cy + path[i + 1] * cw);

        ctx.lineTo(cx + (path[d - 2] * (1 - c) + path[d] * c) * cw, cy + (path[d - 1] * (1 - c) + path[d + 1] * c) * cw);

        ctx.stroke();
      }

      if (e < 1) {
        e *= path.length / 2 - 1;
        f = Math.floor(e);
        e -= f;
        f *= 2;
        f += 2;

        leaf(ctx, t, cx + (path[f - 2] * (1 - e) + path[f] * e) * cw, cy + (path[f - 1] * (1 - e) + path[f + 1] * e) * cw, cw, s, color);
      }
    }

    var Skycons = function (opts) {
      this.list = [];
      this.interval = null;
      this.color = opts && opts.color ? opts.color : "black";
      this.resizeClear = !!(opts && opts.resizeClear);
    };

    Skycons.CLEAR_DAY = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      sun(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
    };

    Skycons.CLEAR_NIGHT = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      moon(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
    };

    Skycons.PARTLY_CLOUDY_DAY = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      sun(ctx, t, w * 0.625, h * 0.375, s * 0.75, s * STROKE, color);
      cloud(ctx, t, w * 0.375, h * 0.625, s * 0.75, s * STROKE, color);
    };

    Skycons.PARTLY_CLOUDY_NIGHT = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      moon(ctx, t, w * 0.667, h * 0.375, s * 0.75, s * STROKE, color);
      cloud(ctx, t, w * 0.375, h * 0.625, s * 0.75, s * STROKE, color);
    };

    Skycons.CLOUDY = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      cloud(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, color);
    };

    Skycons.RAIN = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      rain(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
      cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
    };

    Skycons.SLEET = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      sleet(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
      cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
    };

    Skycons.SNOW = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      snow(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
      cloud(ctx, t, w * 0.5, h * 0.37, s * 0.9, s * STROKE, color);
    };

    Skycons.WIND = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h);

      swoosh(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, 0, 2, color);
      swoosh(ctx, t, w * 0.5, h * 0.5, s, s * STROKE, 1, 2, color);
    };

    Skycons.FOG = function (ctx, t, color) {
      var w = ctx.canvas.width,
          h = ctx.canvas.height,
          s = Math.min(w, h),
          k = s * STROKE;

      fogbank(ctx, t, w * 0.5, h * 0.32, s * 0.75, k, color);

      t /= 5000;

      var a = Math.cos(t * TAU) * s * 0.02,
          b = Math.cos((t + 0.25) * TAU) * s * 0.02,
          c = Math.cos((t + 0.50) * TAU) * s * 0.02,
          d = Math.cos((t + 0.75) * TAU) * s * 0.02,
          n = h * 0.936,
          e = Math.floor(n - k * 0.5) + 0.5,
          f = Math.floor(n - k * 2.5) + 0.5;

      ctx.strokeStyle = color;
      ctx.lineWidth = k;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      line(ctx, a + w * 0.2 + k * 0.5, e, b + w * 0.8 - k * 0.5, e);
      line(ctx, c + w * 0.2 + k * 0.5, f, d + w * 0.8 - k * 0.5, f);
    };

    Skycons.prototype = {
      _determineDrawingFunction: function (draw) {
        if (typeof draw === "string") draw = Skycons[draw.toUpperCase().replace(/-/g, "_")] || null;

        return draw;
      },
      add: function (el, draw) {
        var obj;

        if (typeof el === "string") el = document.getElementById(el);

        // Does nothing if canvas name doesn't exists
        if (el === null) return;

        draw = this._determineDrawingFunction(draw);

        // Does nothing if the draw function isn't actually a function
        if (typeof draw !== "function") return;

        obj = {
          element: el,
          context: el.getContext("2d"),
          drawing: draw
        };

        this.list.push(obj);
        this.draw(obj, KEYFRAME);
      },
      set: function (el, draw) {
        var i;

        if (typeof el === "string") el = document.getElementById(el);

        for (i = this.list.length; i--;) if (this.list[i].element === el) {
          this.list[i].drawing = this._determineDrawingFunction(draw);
          this.draw(this.list[i], KEYFRAME);
          return;
        }

        this.add(el, draw);
      },
      remove: function (el) {
        var i;

        if (typeof el === "string") el = document.getElementById(el);

        for (i = this.list.length; i--;) if (this.list[i].element === el) {
          this.list.splice(i, 1);
          return;
        }
      },
      draw: function (obj, time) {
        var canvas = obj.context.canvas;

        if (this.resizeClear) canvas.width = canvas.width;else obj.context.clearRect(0, 0, canvas.width, canvas.height);

        obj.drawing(obj.context, time, this.color);
      },
      play: function () {
        var self = this;

        this.pause();
        this.interval = requestInterval(function () {
          var now = Date.now(),
              i;

          for (i = self.list.length; i--;) self.draw(self.list[i], now);
        }, 1000 / 60);
      },
      pause: function () {
        var i;

        if (this.interval) {
          cancelInterval(this.interval);
          this.interval = null;
        }
      }
    };
    return Skycons;
  };
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/weather/init.js", ["./weather", "skycons"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  /*!
   * @version: 1.1.2
   * @name: weather
   *
   * @author: https://themeforest.net/user/flexlayers
   */
  var weather_1 = $__require("./weather");
  var SkyCons = $__require("skycons");
  new weather_1.Weather('#weather-bg', 'assets/img/skylg.jpg');
  // new Weather('#weather-single-bg', 'assets/img/skylg.jpg');
  var SkyconsModule = SkyCons(window);
  var Icons = new SkyconsModule({ 'color': '#f5f5f5' });
  Icons.add('weather-icon', SkyconsModule.PARTLY_CLOUDY_DAY);
  Icons.add('weather-clear-day', SkyconsModule.CLEAR_DAY);
  Icons.add('weather-clear-night', SkyconsModule.CLEAR_NIGHT);
  Icons.add('weather-partly-cloudy-day', SkyconsModule.PARTLY_CLOUDY_DAY);
  Icons.add('weather-partly-cloudy-night', SkyconsModule.PARTLY_CLOUDY_NIGHT);
  Icons.add('weather-cloudy', SkyconsModule.CLOUDY);
  Icons.add('weather-rain', SkyconsModule.RAIN);
  Icons.add('weather-sleet', SkyconsModule.SLEET);
  Icons.add('weather-snow', SkyconsModule.SNOW);
  Icons.add('weather-wind', SkyconsModule.WIND);
  Icons.add('weather-fog', SkyconsModule.FOG);
  Icons.play();
});
/*!
 * jQuery UI Sortable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Sortable
//>>group: Interactions
//>>description: Enables items in a list to be sorted using the mouse.
//>>docs: http://api.jqueryui.com/sortable/
//>>demos: http://jqueryui.com/sortable/
//>>css.structure: ../../themes/base/sortable.css

(function (factory) {
	if ("function" === "function" && true) {

		// AMD. Register as an anonymous module.
		System.registerDynamic("github:components/jqueryui@1.12.1/ui/widgets/sortable.js", ["jquery", "./mouse", "../data", "../ie", "../scroll-parent", "../version", "../widget"], false, function ($__require, $__exports, $__module) {
			if (typeof factory === "function") {
				return factory.call(this, $__require("jquery"), $__require("./mouse"), $__require("../data"), $__require("../ie"), $__require("../scroll-parent"), $__require("../version"), $__require("../widget"));
			} else {
				return factory;
			}
		});
	} else {

		// Browser globals
		factory(jQuery);
	}
})(function ($) {

	return $.widget("ui.sortable", $.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "sort",
		ready: false,
		options: {
			appendTo: "parent",
			axis: false,
			connectWith: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			dropOnEmpty: true,
			forcePlaceholderSize: false,
			forceHelperSize: false,
			grid: false,
			handle: false,
			helper: "original",
			items: "> *",
			opacity: false,
			placeholder: false,
			revert: false,
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1000,

			// Callbacks
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},

		_isOverAxis: function (x, reference, size) {
			return x >= reference && x < reference + size;
		},

		_isFloating: function (item) {
			return (/left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display"))
			);
		},

		_create: function () {
			this.containerCache = {};
			this._addClass("ui-sortable");

			//Get the items
			this.refresh();

			//Let's determine the parent's offset
			this.offset = this.element.offset();

			//Initialize mouse events for interaction
			this._mouseInit();

			this._setHandleClassName();

			//We're ready to go
			this.ready = true;
		},

		_setOption: function (key, value) {
			this._super(key, value);

			if (key === "handle") {
				this._setHandleClassName();
			}
		},

		_setHandleClassName: function () {
			var that = this;
			this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
			$.each(this.items, function () {
				that._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle");
			});
		},

		_destroy: function () {
			this._mouseDestroy();

			for (var i = this.items.length - 1; i >= 0; i--) {
				this.items[i].item.removeData(this.widgetName + "-item");
			}

			return this;
		},

		_mouseCapture: function (event, overrideHandle) {
			var currentItem = null,
			    validHandle = false,
			    that = this;

			if (this.reverting) {
				return false;
			}

			if (this.options.disabled || this.options.type === "static") {
				return false;
			}

			//We have to refresh the items data once first
			this._refreshItems(event);

			//Find out if the clicked node (or one of its parents) is a actual item in this.items
			$(event.target).parents().each(function () {
				if ($.data(this, that.widgetName + "-item") === that) {
					currentItem = $(this);
					return false;
				}
			});
			if ($.data(event.target, that.widgetName + "-item") === that) {
				currentItem = $(event.target);
			}

			if (!currentItem) {
				return false;
			}
			if (this.options.handle && !overrideHandle) {
				$(this.options.handle, currentItem).find("*").addBack().each(function () {
					if (this === event.target) {
						validHandle = true;
					}
				});
				if (!validHandle) {
					return false;
				}
			}

			this.currentItem = currentItem;
			this._removeCurrentsFromItems();
			return true;
		},

		_mouseStart: function (event, overrideHandle, noActivation) {

			var i,
			    body,
			    o = this.options;

			this.currentContainer = this;

			//We only need to call refreshPositions, because the refreshItems call has been moved to
			// mouseCapture
			this.refreshPositions();

			//Create and append the visible helper
			this.helper = this._createHelper(event);

			//Cache the helper size
			this._cacheHelperProportions();

			/*
    * - Position generation -
    * This block generates everything position related - it's the core of draggables.
    */

			//Cache the margins of the original element
			this._cacheMargins();

			//Get the next scrolling parent
			this.scrollParent = this.helper.scrollParent();

			//The element's absolute position on the page minus margins
			this.offset = this.currentItem.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};

			$.extend(this.offset, {
				click: { //Where the click happened, relative to the element
					left: event.pageX - this.offset.left,
					top: event.pageY - this.offset.top
				},
				parent: this._getParentOffset(),

				// This is a relative to absolute position minus the actual position calculation -
				// only used for relative positioned helper
				relative: this._getRelativeOffset()
			});

			// Only after we got the offset, we can change the helper's position to absolute
			// TODO: Still need to figure out a way to make relative sorting possible
			this.helper.css("position", "absolute");
			this.cssPosition = this.helper.css("position");

			//Generate the original position
			this.originalPosition = this._generatePosition(event);
			this.originalPageX = event.pageX;
			this.originalPageY = event.pageY;

			//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
			o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt);

			//Cache the former DOM position
			this.domPosition = {
				prev: this.currentItem.prev()[0],
				parent: this.currentItem.parent()[0]
			};

			// If the helper is not the original, hide the original so it's not playing any role during
			// the drag, won't cause anything bad this way
			if (this.helper[0] !== this.currentItem[0]) {
				this.currentItem.hide();
			}

			//Create the placeholder
			this._createPlaceholder();

			//Set a containment if given in the options
			if (o.containment) {
				this._setContainment();
			}

			if (o.cursor && o.cursor !== "auto") {
				// cursor option
				body = this.document.find("body");

				// Support: IE
				this.storedCursor = body.css("cursor");
				body.css("cursor", o.cursor);

				this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body);
			}

			if (o.opacity) {
				// opacity option
				if (this.helper.css("opacity")) {
					this._storedOpacity = this.helper.css("opacity");
				}
				this.helper.css("opacity", o.opacity);
			}

			if (o.zIndex) {
				// zIndex option
				if (this.helper.css("zIndex")) {
					this._storedZIndex = this.helper.css("zIndex");
				}
				this.helper.css("zIndex", o.zIndex);
			}

			//Prepare scrolling
			if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {
				this.overflowOffset = this.scrollParent.offset();
			}

			//Call callbacks
			this._trigger("start", event, this._uiHash());

			//Recache the helper size
			if (!this._preserveHelperProportions) {
				this._cacheHelperProportions();
			}

			//Post "activate" events to possible containers
			if (!noActivation) {
				for (i = this.containers.length - 1; i >= 0; i--) {
					this.containers[i]._trigger("activate", event, this._uiHash(this));
				}
			}

			//Prepare possible droppables
			if ($.ui.ddmanager) {
				$.ui.ddmanager.current = this;
			}

			if ($.ui.ddmanager && !o.dropBehaviour) {
				$.ui.ddmanager.prepareOffsets(this, event);
			}

			this.dragging = true;

			this._addClass(this.helper, "ui-sortable-helper");

			// Execute the drag once - this causes the helper not to be visiblebefore getting its
			// correct position
			this._mouseDrag(event);
			return true;
		},

		_mouseDrag: function (event) {
			var i,
			    item,
			    itemElement,
			    intersection,
			    o = this.options,
			    scrolled = false;

			//Compute the helpers position
			this.position = this._generatePosition(event);
			this.positionAbs = this._convertPositionTo("absolute");

			if (!this.lastPositionAbs) {
				this.lastPositionAbs = this.positionAbs;
			}

			//Do scrolling
			if (this.options.scroll) {
				if (this.scrollParent[0] !== this.document[0] && this.scrollParent[0].tagName !== "HTML") {

					if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity) {
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
					} else if (event.pageY - this.overflowOffset.top < o.scrollSensitivity) {
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;
					}

					if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
					} else if (event.pageX - this.overflowOffset.left < o.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;
					}
				} else {

					if (event.pageY - this.document.scrollTop() < o.scrollSensitivity) {
						scrolled = this.document.scrollTop(this.document.scrollTop() - o.scrollSpeed);
					} else if (this.window.height() - (event.pageY - this.document.scrollTop()) < o.scrollSensitivity) {
						scrolled = this.document.scrollTop(this.document.scrollTop() + o.scrollSpeed);
					}

					if (event.pageX - this.document.scrollLeft() < o.scrollSensitivity) {
						scrolled = this.document.scrollLeft(this.document.scrollLeft() - o.scrollSpeed);
					} else if (this.window.width() - (event.pageX - this.document.scrollLeft()) < o.scrollSensitivity) {
						scrolled = this.document.scrollLeft(this.document.scrollLeft() + o.scrollSpeed);
					}
				}

				if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
					$.ui.ddmanager.prepareOffsets(this, event);
				}
			}

			//Regenerate the absolute position used for position checks
			this.positionAbs = this._convertPositionTo("absolute");

			//Set the helper position
			if (!this.options.axis || this.options.axis !== "y") {
				this.helper[0].style.left = this.position.left + "px";
			}
			if (!this.options.axis || this.options.axis !== "x") {
				this.helper[0].style.top = this.position.top + "px";
			}

			//Rearrange
			for (i = this.items.length - 1; i >= 0; i--) {

				//Cache variables and intersection, continue if no intersection
				item = this.items[i];
				itemElement = item.item[0];
				intersection = this._intersectsWithPointer(item);
				if (!intersection) {
					continue;
				}

				// Only put the placeholder inside the current Container, skip all
				// items from other containers. This works because when moving
				// an item from one container to another the
				// currentContainer is switched before the placeholder is moved.
				//
				// Without this, moving items in "sub-sortables" can cause
				// the placeholder to jitter between the outer and inner container.
				if (item.instance !== this.currentContainer) {
					continue;
				}

				// Cannot intersect with itself
				// no useless actions that have been done before
				// no action if the item moved is the parent of the item checked
				if (itemElement !== this.currentItem[0] && this.placeholder[intersection === 1 ? "next" : "prev"]()[0] !== itemElement && !$.contains(this.placeholder[0], itemElement) && (this.options.type === "semi-dynamic" ? !$.contains(this.element[0], itemElement) : true)) {

					this.direction = intersection === 1 ? "down" : "up";

					if (this.options.tolerance === "pointer" || this._intersectsWithSides(item)) {
						this._rearrange(event, item);
					} else {
						break;
					}

					this._trigger("change", event, this._uiHash());
					break;
				}
			}

			//Post events to containers
			this._contactContainers(event);

			//Interconnect with droppables
			if ($.ui.ddmanager) {
				$.ui.ddmanager.drag(this, event);
			}

			//Call callbacks
			this._trigger("sort", event, this._uiHash());

			this.lastPositionAbs = this.positionAbs;
			return false;
		},

		_mouseStop: function (event, noPropagation) {

			if (!event) {
				return;
			}

			//If we are using droppables, inform the manager about the drop
			if ($.ui.ddmanager && !this.options.dropBehaviour) {
				$.ui.ddmanager.drop(this, event);
			}

			if (this.options.revert) {
				var that = this,
				    cur = this.placeholder.offset(),
				    axis = this.options.axis,
				    animation = {};

				if (!axis || axis === "x") {
					animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft);
				}
				if (!axis || axis === "y") {
					animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop);
				}
				this.reverting = true;
				$(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function () {
					that._clear(event);
				});
			} else {
				this._clear(event, noPropagation);
			}

			return false;
		},

		cancel: function () {

			if (this.dragging) {

				this._mouseUp(new $.Event("mouseup", { target: null }));

				if (this.options.helper === "original") {
					this.currentItem.css(this._storedCSS);
					this._removeClass(this.currentItem, "ui-sortable-helper");
				} else {
					this.currentItem.show();
				}

				//Post deactivating events to containers
				for (var i = this.containers.length - 1; i >= 0; i--) {
					this.containers[i]._trigger("deactivate", null, this._uiHash(this));
					if (this.containers[i].containerCache.over) {
						this.containers[i]._trigger("out", null, this._uiHash(this));
						this.containers[i].containerCache.over = 0;
					}
				}
			}

			if (this.placeholder) {

				//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
				// it unbinds ALL events from the original node!
				if (this.placeholder[0].parentNode) {
					this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
				}
				if (this.options.helper !== "original" && this.helper && this.helper[0].parentNode) {
					this.helper.remove();
				}

				$.extend(this, {
					helper: null,
					dragging: false,
					reverting: false,
					_noFinalSort: null
				});

				if (this.domPosition.prev) {
					$(this.domPosition.prev).after(this.currentItem);
				} else {
					$(this.domPosition.parent).prepend(this.currentItem);
				}
			}

			return this;
		},

		serialize: function (o) {

			var items = this._getItemsAsjQuery(o && o.connected),
			    str = [];
			o = o || {};

			$(items).each(function () {
				var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);
				if (res) {
					str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]));
				}
			});

			if (!str.length && o.key) {
				str.push(o.key + "=");
			}

			return str.join("&");
		},

		toArray: function (o) {

			var items = this._getItemsAsjQuery(o && o.connected),
			    ret = [];

			o = o || {};

			items.each(function () {
				ret.push($(o.item || this).attr(o.attribute || "id") || "");
			});
			return ret;
		},

		/* Be careful with the following core functions */
		_intersectsWith: function (item) {

			var x1 = this.positionAbs.left,
			    x2 = x1 + this.helperProportions.width,
			    y1 = this.positionAbs.top,
			    y2 = y1 + this.helperProportions.height,
			    l = item.left,
			    r = l + item.width,
			    t = item.top,
			    b = t + item.height,
			    dyClick = this.offset.click.top,
			    dxClick = this.offset.click.left,
			    isOverElementHeight = this.options.axis === "x" || y1 + dyClick > t && y1 + dyClick < b,
			    isOverElementWidth = this.options.axis === "y" || x1 + dxClick > l && x1 + dxClick < r,
			    isOverElement = isOverElementHeight && isOverElementWidth;

			if (this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"]) {
				return isOverElement;
			} else {

				return l < x1 + this.helperProportions.width / 2 && // Right Half
				x2 - this.helperProportions.width / 2 < r && // Left Half
				t < y1 + this.helperProportions.height / 2 && // Bottom Half
				y2 - this.helperProportions.height / 2 < b; // Top Half
			}
		},

		_intersectsWithPointer: function (item) {
			var verticalDirection,
			    horizontalDirection,
			    isOverElementHeight = this.options.axis === "x" || this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top, item.height),
			    isOverElementWidth = this.options.axis === "y" || this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left, item.width),
			    isOverElement = isOverElementHeight && isOverElementWidth;

			if (!isOverElement) {
				return false;
			}

			verticalDirection = this._getDragVerticalDirection();
			horizontalDirection = this._getDragHorizontalDirection();

			return this.floating ? horizontalDirection === "right" || verticalDirection === "down" ? 2 : 1 : verticalDirection && (verticalDirection === "down" ? 2 : 1);
		},

		_intersectsWithSides: function (item) {

			var isOverBottomHalf = this._isOverAxis(this.positionAbs.top + this.offset.click.top, item.top + item.height / 2, item.height),
			    isOverRightHalf = this._isOverAxis(this.positionAbs.left + this.offset.click.left, item.left + item.width / 2, item.width),
			    verticalDirection = this._getDragVerticalDirection(),
			    horizontalDirection = this._getDragHorizontalDirection();

			if (this.floating && horizontalDirection) {
				return horizontalDirection === "right" && isOverRightHalf || horizontalDirection === "left" && !isOverRightHalf;
			} else {
				return verticalDirection && (verticalDirection === "down" && isOverBottomHalf || verticalDirection === "up" && !isOverBottomHalf);
			}
		},

		_getDragVerticalDirection: function () {
			var delta = this.positionAbs.top - this.lastPositionAbs.top;
			return delta !== 0 && (delta > 0 ? "down" : "up");
		},

		_getDragHorizontalDirection: function () {
			var delta = this.positionAbs.left - this.lastPositionAbs.left;
			return delta !== 0 && (delta > 0 ? "right" : "left");
		},

		refresh: function (event) {
			this._refreshItems(event);
			this._setHandleClassName();
			this.refreshPositions();
			return this;
		},

		_connectWith: function () {
			var options = this.options;
			return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith;
		},

		_getItemsAsjQuery: function (connected) {

			var i,
			    j,
			    cur,
			    inst,
			    items = [],
			    queries = [],
			    connectWith = this._connectWith();

			if (connectWith && connected) {
				for (i = connectWith.length - 1; i >= 0; i--) {
					cur = $(connectWith[i], this.document[0]);
					for (j = cur.length - 1; j >= 0; j--) {
						inst = $.data(cur[j], this.widgetFullName);
						if (inst && inst !== this && !inst.options.disabled) {
							queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
						}
					}
				}
			}

			queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, { options: this.options, item: this.currentItem }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);

			function addItems() {
				items.push(this);
			}
			for (i = queries.length - 1; i >= 0; i--) {
				queries[i][0].each(addItems);
			}

			return $(items);
		},

		_removeCurrentsFromItems: function () {

			var list = this.currentItem.find(":data(" + this.widgetName + "-item)");

			this.items = $.grep(this.items, function (item) {
				for (var j = 0; j < list.length; j++) {
					if (list[j] === item.item[0]) {
						return false;
					}
				}
				return true;
			});
		},

		_refreshItems: function (event) {

			this.items = [];
			this.containers = [this];

			var i,
			    j,
			    cur,
			    inst,
			    targetData,
			    _queries,
			    item,
			    queriesLength,
			    items = this.items,
			    queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, { item: this.currentItem }) : $(this.options.items, this.element), this]],
			    connectWith = this._connectWith();

			//Shouldn't be run the first time through due to massive slow-down
			if (connectWith && this.ready) {
				for (i = connectWith.length - 1; i >= 0; i--) {
					cur = $(connectWith[i], this.document[0]);
					for (j = cur.length - 1; j >= 0; j--) {
						inst = $.data(cur[j], this.widgetFullName);
						if (inst && inst !== this && !inst.options.disabled) {
							queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, { item: this.currentItem }) : $(inst.options.items, inst.element), inst]);
							this.containers.push(inst);
						}
					}
				}
			}

			for (i = queries.length - 1; i >= 0; i--) {
				targetData = queries[i][1];
				_queries = queries[i][0];

				for (j = 0, queriesLength = _queries.length; j < queriesLength; j++) {
					item = $(_queries[j]);

					// Data for target checking (mouse manager)
					item.data(this.widgetName + "-item", targetData);

					items.push({
						item: item,
						instance: targetData,
						width: 0, height: 0,
						left: 0, top: 0
					});
				}
			}
		},

		refreshPositions: function (fast) {

			// Determine whether items are being displayed horizontally
			this.floating = this.items.length ? this.options.axis === "x" || this._isFloating(this.items[0].item) : false;

			//This has to be redone because due to the item being moved out/into the offsetParent,
			// the offsetParent's position will change
			if (this.offsetParent && this.helper) {
				this.offset.parent = this._getParentOffset();
			}

			var i, item, t, p;

			for (i = this.items.length - 1; i >= 0; i--) {
				item = this.items[i];

				//We ignore calculating positions of all connected containers when we're not over them
				if (item.instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0]) {
					continue;
				}

				t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item;

				if (!fast) {
					item.width = t.outerWidth();
					item.height = t.outerHeight();
				}

				p = t.offset();
				item.left = p.left;
				item.top = p.top;
			}

			if (this.options.custom && this.options.custom.refreshContainers) {
				this.options.custom.refreshContainers.call(this);
			} else {
				for (i = this.containers.length - 1; i >= 0; i--) {
					p = this.containers[i].element.offset();
					this.containers[i].containerCache.left = p.left;
					this.containers[i].containerCache.top = p.top;
					this.containers[i].containerCache.width = this.containers[i].element.outerWidth();
					this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
				}
			}

			return this;
		},

		_createPlaceholder: function (that) {
			that = that || this;
			var className,
			    o = that.options;

			if (!o.placeholder || o.placeholder.constructor === String) {
				className = o.placeholder;
				o.placeholder = {
					element: function () {

						var nodeName = that.currentItem[0].nodeName.toLowerCase(),
						    element = $("<" + nodeName + ">", that.document[0]);

						that._addClass(element, "ui-sortable-placeholder", className || that.currentItem[0].className)._removeClass(element, "ui-sortable-helper");

						if (nodeName === "tbody") {
							that._createTrPlaceholder(that.currentItem.find("tr").eq(0), $("<tr>", that.document[0]).appendTo(element));
						} else if (nodeName === "tr") {
							that._createTrPlaceholder(that.currentItem, element);
						} else if (nodeName === "img") {
							element.attr("src", that.currentItem.attr("src"));
						}

						if (!className) {
							element.css("visibility", "hidden");
						}

						return element;
					},
					update: function (container, p) {

						// 1. If a className is set as 'placeholder option, we don't force sizes -
						// the class is responsible for that
						// 2. The option 'forcePlaceholderSize can be enabled to force it even if a
						// class name is specified
						if (className && !o.forcePlaceholderSize) {
							return;
						}

						//If the element doesn't have a actual height by itself (without styles coming
						// from a stylesheet), it receives the inline height from the dragged item
						if (!p.height()) {
							p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10));
						}
						if (!p.width()) {
							p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10));
						}
					}
				};
			}

			//Create the placeholder
			that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem));

			//Append it after the actual current item
			that.currentItem.after(that.placeholder);

			//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
			o.placeholder.update(that, that.placeholder);
		},

		_createTrPlaceholder: function (sourceTr, targetTr) {
			var that = this;

			sourceTr.children().each(function () {
				$("<td>&#160;</td>", that.document[0]).attr("colspan", $(this).attr("colspan") || 1).appendTo(targetTr);
			});
		},

		_contactContainers: function (event) {
			var i,
			    j,
			    dist,
			    itemWithLeastDistance,
			    posProperty,
			    sizeProperty,
			    cur,
			    nearBottom,
			    floating,
			    axis,
			    innermostContainer = null,
			    innermostIndex = null;

			// Get innermost container that intersects with item
			for (i = this.containers.length - 1; i >= 0; i--) {

				// Never consider a container that's located within the item itself
				if ($.contains(this.currentItem[0], this.containers[i].element[0])) {
					continue;
				}

				if (this._intersectsWith(this.containers[i].containerCache)) {

					// If we've already found a container and it's more "inner" than this, then continue
					if (innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0])) {
						continue;
					}

					innermostContainer = this.containers[i];
					innermostIndex = i;
				} else {

					// container doesn't intersect. trigger "out" event if necessary
					if (this.containers[i].containerCache.over) {
						this.containers[i]._trigger("out", event, this._uiHash(this));
						this.containers[i].containerCache.over = 0;
					}
				}
			}

			// If no intersecting containers found, return
			if (!innermostContainer) {
				return;
			}

			// Move the item into the container if it's not there already
			if (this.containers.length === 1) {
				if (!this.containers[innermostIndex].containerCache.over) {
					this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
					this.containers[innermostIndex].containerCache.over = 1;
				}
			} else {

				// When entering a new container, we will find the item with the least distance and
				// append our item near it
				dist = 10000;
				itemWithLeastDistance = null;
				floating = innermostContainer.floating || this._isFloating(this.currentItem);
				posProperty = floating ? "left" : "top";
				sizeProperty = floating ? "width" : "height";
				axis = floating ? "pageX" : "pageY";

				for (j = this.items.length - 1; j >= 0; j--) {
					if (!$.contains(this.containers[innermostIndex].element[0], this.items[j].item[0])) {
						continue;
					}
					if (this.items[j].item[0] === this.currentItem[0]) {
						continue;
					}

					cur = this.items[j].item.offset()[posProperty];
					nearBottom = false;
					if (event[axis] - cur > this.items[j][sizeProperty] / 2) {
						nearBottom = true;
					}

					if (Math.abs(event[axis] - cur) < dist) {
						dist = Math.abs(event[axis] - cur);
						itemWithLeastDistance = this.items[j];
						this.direction = nearBottom ? "up" : "down";
					}
				}

				//Check if dropOnEmpty is enabled
				if (!itemWithLeastDistance && !this.options.dropOnEmpty) {
					return;
				}

				if (this.currentContainer === this.containers[innermostIndex]) {
					if (!this.currentContainer.containerCache.over) {
						this.containers[innermostIndex]._trigger("over", event, this._uiHash());
						this.currentContainer.containerCache.over = 1;
					}
					return;
				}

				itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, true) : this._rearrange(event, null, this.containers[innermostIndex].element, true);
				this._trigger("change", event, this._uiHash());
				this.containers[innermostIndex]._trigger("change", event, this._uiHash(this));
				this.currentContainer = this.containers[innermostIndex];

				//Update the placeholder
				this.options.placeholder.update(this.currentContainer, this.placeholder);

				this.containers[innermostIndex]._trigger("over", event, this._uiHash(this));
				this.containers[innermostIndex].containerCache.over = 1;
			}
		},

		_createHelper: function (event) {

			var o = this.options,
			    helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [event, this.currentItem])) : o.helper === "clone" ? this.currentItem.clone() : this.currentItem;

			//Add the helper to the DOM if that didn't happen already
			if (!helper.parents("body").length) {
				$(o.appendTo !== "parent" ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]);
			}

			if (helper[0] === this.currentItem[0]) {
				this._storedCSS = {
					width: this.currentItem[0].style.width,
					height: this.currentItem[0].style.height,
					position: this.currentItem.css("position"),
					top: this.currentItem.css("top"),
					left: this.currentItem.css("left")
				};
			}

			if (!helper[0].style.width || o.forceHelperSize) {
				helper.width(this.currentItem.width());
			}
			if (!helper[0].style.height || o.forceHelperSize) {
				helper.height(this.currentItem.height());
			}

			return helper;
		},

		_adjustOffsetFromHelper: function (obj) {
			if (typeof obj === "string") {
				obj = obj.split(" ");
			}
			if ($.isArray(obj)) {
				obj = { left: +obj[0], top: +obj[1] || 0 };
			}
			if ("left" in obj) {
				this.offset.click.left = obj.left + this.margins.left;
			}
			if ("right" in obj) {
				this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
			}
			if ("top" in obj) {
				this.offset.click.top = obj.top + this.margins.top;
			}
			if ("bottom" in obj) {
				this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
			}
		},

		_getParentOffset: function () {

			//Get the offsetParent and cache its position
			this.offsetParent = this.helper.offsetParent();
			var po = this.offsetParent.offset();

			// This is a special case where we need to modify a offset calculated on start, since the
			// following happened:
			// 1. The position of the helper is absolute, so it's position is calculated based on the
			// next positioned parent
			// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
			// the document, which means that the scroll is included in the initial calculation of the
			// offset of the parent, and never recalculated upon drag
			if (this.cssPosition === "absolute" && this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) {
				po.left += this.scrollParent.scrollLeft();
				po.top += this.scrollParent.scrollTop();
			}

			// This needs to be actually done for all browsers, since pageX/pageY includes this
			// information with an ugly IE fix
			if (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && $.ui.ie) {
				po = { top: 0, left: 0 };
			}

			return {
				top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			};
		},

		_getRelativeOffset: function () {

			if (this.cssPosition === "relative") {
				var p = this.currentItem.position();
				return {
					top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				};
			} else {
				return { top: 0, left: 0 };
			}
		},

		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			};
		},

		_cacheHelperProportions: function () {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			};
		},

		_setContainment: function () {

			var ce,
			    co,
			    over,
			    o = this.options;
			if (o.containment === "parent") {
				o.containment = this.helper[0].parentNode;
			}
			if (o.containment === "document" || o.containment === "window") {
				this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, o.containment === "document" ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, (o.containment === "document" ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
			}

			if (!/^(document|window|parent)$/.test(o.containment)) {
				ce = $(o.containment)[0];
				co = $(o.containment).offset();
				over = $(ce).css("overflow") !== "hidden";

				this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top];
			}
		},

		_convertPositionTo: function (d, pos) {

			if (!pos) {
				pos = this.position;
			}
			var mod = d === "absolute" ? 1 : -1,
			    scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			    scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);

			return {
				top:

				// The absolute mouse position
				pos.top +

				// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.relative.top * mod +

				// The offsetParent's offset without borders (offset + border)
				this.offset.parent.top * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
				left:

				// The absolute mouse position
				pos.left +

				// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.relative.left * mod +

				// The offsetParent's offset without borders (offset + border)
				this.offset.parent.left * mod - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
			};
		},

		_generatePosition: function (event) {

			var top,
			    left,
			    o = this.options,
			    pageX = event.pageX,
			    pageY = event.pageY,
			    scroll = this.cssPosition === "absolute" && !(this.scrollParent[0] !== this.document[0] && $.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			    scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);

			// This is another very weird special case that only happens for relative elements:
			// 1. If the css position is relative
			// 2. and the scroll parent is the document or similar to the offset parent
			// we have to refresh the relative offset during the scroll so there are no jumps
			if (this.cssPosition === "relative" && !(this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0])) {
				this.offset.relative = this._getRelativeOffset();
			}

			/*
    * - Position constraining -
    * Constrain the position to a mix of grid, containment.
    */

			if (this.originalPosition) {
				//If we are not dragging yet, we won't check for options

				if (this.containment) {
					if (event.pageX - this.offset.click.left < this.containment[0]) {
						pageX = this.containment[0] + this.offset.click.left;
					}
					if (event.pageY - this.offset.click.top < this.containment[1]) {
						pageY = this.containment[1] + this.offset.click.top;
					}
					if (event.pageX - this.offset.click.left > this.containment[2]) {
						pageX = this.containment[2] + this.offset.click.left;
					}
					if (event.pageY - this.offset.click.top > this.containment[3]) {
						pageY = this.containment[3] + this.offset.click.top;
					}
				}

				if (o.grid) {
					top = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1];
					pageY = this.containment ? top - this.offset.click.top >= this.containment[1] && top - this.offset.click.top <= this.containment[3] ? top : top - this.offset.click.top >= this.containment[1] ? top - o.grid[1] : top + o.grid[1] : top;

					left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0];
					pageX = this.containment ? left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0] : left;
				}
			}

			return {
				top:

				// The absolute mouse position
				pageY -

				// Click offset (relative to the element)
				this.offset.click.top -

				// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.relative.top -

				// The offsetParent's offset without borders (offset + border)
				this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
				left:

				// The absolute mouse position
				pageX -

				// Click offset (relative to the element)
				this.offset.click.left -

				// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.relative.left -

				// The offsetParent's offset without borders (offset + border)
				this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
			};
		},

		_rearrange: function (event, i, a, hardRefresh) {

			a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? i.item[0] : i.item[0].nextSibling);

			//Various things done here to improve the performance:
			// 1. we create a setTimeout, that calls refreshPositions
			// 2. on the instance, we have a counter variable, that get's higher after every append
			// 3. on the local scope, we copy the counter variable, and check in the timeout,
			// if it's still the same
			// 4. this lets only the last addition to the timeout stack through
			this.counter = this.counter ? ++this.counter : 1;
			var counter = this.counter;

			this._delay(function () {
				if (counter === this.counter) {

					//Precompute after each DOM insertion, NOT on mousemove
					this.refreshPositions(!hardRefresh);
				}
			});
		},

		_clear: function (event, noPropagation) {

			this.reverting = false;

			// We delay all events that have to be triggered to after the point where the placeholder
			// has been removed and everything else normalized again
			var i,
			    delayedTriggers = [];

			// We first have to update the dom position of the actual currentItem
			// Note: don't do it if the current item is already removed (by a user), or it gets
			// reappended (see #4088)
			if (!this._noFinalSort && this.currentItem.parent().length) {
				this.placeholder.before(this.currentItem);
			}
			this._noFinalSort = null;

			if (this.helper[0] === this.currentItem[0]) {
				for (i in this._storedCSS) {
					if (this._storedCSS[i] === "auto" || this._storedCSS[i] === "static") {
						this._storedCSS[i] = "";
					}
				}
				this.currentItem.css(this._storedCSS);
				this._removeClass(this.currentItem, "ui-sortable-helper");
			} else {
				this.currentItem.show();
			}

			if (this.fromOutside && !noPropagation) {
				delayedTriggers.push(function (event) {
					this._trigger("receive", event, this._uiHash(this.fromOutside));
				});
			}
			if ((this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !noPropagation) {

				// Trigger update callback if the DOM position has changed
				delayedTriggers.push(function (event) {
					this._trigger("update", event, this._uiHash());
				});
			}

			// Check if the items Container has Changed and trigger appropriate
			// events.
			if (this !== this.currentContainer) {
				if (!noPropagation) {
					delayedTriggers.push(function (event) {
						this._trigger("remove", event, this._uiHash());
					});
					delayedTriggers.push(function (c) {
						return function (event) {
							c._trigger("receive", event, this._uiHash(this));
						};
					}.call(this, this.currentContainer));
					delayedTriggers.push(function (c) {
						return function (event) {
							c._trigger("update", event, this._uiHash(this));
						};
					}.call(this, this.currentContainer));
				}
			}

			//Post events to containers
			function delayEvent(type, instance, container) {
				return function (event) {
					container._trigger(type, event, instance._uiHash(instance));
				};
			}
			for (i = this.containers.length - 1; i >= 0; i--) {
				if (!noPropagation) {
					delayedTriggers.push(delayEvent("deactivate", this, this.containers[i]));
				}
				if (this.containers[i].containerCache.over) {
					delayedTriggers.push(delayEvent("out", this, this.containers[i]));
					this.containers[i].containerCache.over = 0;
				}
			}

			//Do what was originally in plugins
			if (this.storedCursor) {
				this.document.find("body").css("cursor", this.storedCursor);
				this.storedStylesheet.remove();
			}
			if (this._storedOpacity) {
				this.helper.css("opacity", this._storedOpacity);
			}
			if (this._storedZIndex) {
				this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex);
			}

			this.dragging = false;

			if (!noPropagation) {
				this._trigger("beforeStop", event, this._uiHash());
			}

			//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
			// it unbinds ALL events from the original node!
			this.placeholder[0].parentNode.removeChild(this.placeholder[0]);

			if (!this.cancelHelperRemoval) {
				if (this.helper[0] !== this.currentItem[0]) {
					this.helper.remove();
				}
				this.helper = null;
			}

			if (!noPropagation) {
				for (i = 0; i < delayedTriggers.length; i++) {

					// Trigger all delayed events
					delayedTriggers[i].call(this, event);
				}
				this._trigger("stop", event, this._uiHash());
			}

			this.fromOutside = false;
			return !this.cancelHelperRemoval;
		},

		_trigger: function () {
			if ($.Widget.prototype._trigger.apply(this, arguments) === false) {
				this.cancel();
			}
		},

		_uiHash: function (_inst) {
			var inst = _inst || this;
			return {
				helper: inst.helper,
				placeholder: inst.placeholder || $([]),
				position: inst.position,
				originalPosition: inst.originalPosition,
				offset: inst.positionAbs,
				item: inst.currentItem,
				sender: _inst ? _inst.element : null
			};
		}

	});
});
System.registerDynamic("reactiveadmintemplate/scripts/modules/sortable.js", ["jquery-ui/ui/widgets/sortable"], true, function ($__require, exports, module) {
    'use strict';

    var global = this || self,
        GLOBAL = global;
    Object.defineProperty(exports, "__esModule", { value: true });
    /*!
     * @version: 1.1.2
     * @name: main
     *
     * @author: https://themeforest.net/user/flexlayers
     */
    $__require("jquery-ui/ui/widgets/sortable");
    $(function () {
        $('.sortable-list').each(function () {
            var id = Math.round(Math.random() * 100000);
            var newContainment = 'sortable-containment-' + id;
            var newSelector = 'sortable-list-' + id;
            $(this).parents('.sortable-containment').addClass(newContainment);
            $(this).addClass(newSelector);
            $('.' + newSelector).sortable({
                containment: '.' + newContainment,
                revert: 100,
                items: '.sortable-list-item',
                cursor: "move",
                handle: '.sortable-list-handle'
            });
        });
        $('.sortable-columns').each(function () {
            var id = Math.round(Math.random() * 100000);
            var newSelector = 'sortable-columns-' + id;
            $(this).addClass(newSelector);
            $('.' + newSelector).sortable({
                containment: '.content-wrap',
                revert: 100,
                items: '.sortable-column',
                cursor: "move",
                // handle: '.sortable-column-handle',
                connectWith: '.sortable-columns',
                helper: 'clone',
                appendTo: '#main'
            });
        });
    });
});
System.registerDynamic("reactiveadmintemplate/scripts/dash2.js", ["./app", "./modules/charts/map", "./modules/carousel/init", "./modules/weather/init", "./modules/sortable"], true, function ($__require, exports, module) {
  'use strict';

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", { value: true });
  /*!
   * @version: 1.1.2
   * @name: dash2
   *
   * @author: https://themeforest.net/user/flexlayers
   */
  $__require("./app");
  $__require("./modules/charts/map");
  $__require("./modules/carousel/init");
  $__require("./modules/weather/init");
  $__require("./modules/sortable");
});