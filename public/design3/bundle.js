!(function (e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = e.document
              ? t(e, !0)
              : function (e) {
                    if (!e.document)
                        throw new Error(
                            "jQuery requires a window with a document"
                        );
                    return t(e);
                })
        : t(e);
})("undefined" != typeof window ? window : this, function (T, e) {
    "use strict";
    function g(e) {
        return null != e && e === e.window;
    }
    var t = [],
        n = Object.getPrototypeOf,
        a = t.slice,
        y = t.flat
            ? function (e) {
                  return t.flat.call(e);
              }
            : function (e) {
                  return t.concat.apply([], e);
              },
        u = t.push,
        i = t.indexOf,
        r = {},
        o = r.toString,
        m = r.hasOwnProperty,
        s = m.toString,
        l = s.call(Object),
        v = {},
        x = function (e) {
            return (
                "function" == typeof e &&
                "number" != typeof e.nodeType &&
                "function" != typeof e.item
            );
        },
        C = T.document,
        c = { type: !0, src: !0, nonce: !0, noModule: !0 };
    function b(e, t, n) {
        var r,
            i,
            o = (n = n || C).createElement("script");
        if (((o.text = e), t))
            for (r in c)
                (i = t[r] || (t.getAttribute && t.getAttribute(r))) &&
                    o.setAttribute(r, i);
        n.head.appendChild(o).parentNode.removeChild(o);
    }
    function h(e) {
        return null == e
            ? e + ""
            : "object" == typeof e || "function" == typeof e
            ? r[o.call(e)] || "object"
            : typeof e;
    }
    var f = "3.6.3",
        S = function (e, t) {
            return new S.fn.init(e, t);
        };
    function p(e) {
        var t = !!e && "length" in e && e.length,
            n = h(e);
        return (
            !x(e) &&
            !g(e) &&
            ("array" === n ||
                0 === t ||
                ("number" == typeof t && 0 < t && t - 1 in e))
        );
    }
    (S.fn = S.prototype =
        {
            jquery: f,
            constructor: S,
            length: 0,
            toArray: function () {
                return a.call(this);
            },
            get: function (e) {
                return null == e
                    ? a.call(this)
                    : e < 0
                    ? this[e + this.length]
                    : this[e];
            },
            pushStack: function (e) {
                e = S.merge(this.constructor(), e);
                return (e.prevObject = this), e;
            },
            each: function (e) {
                return S.each(this, e);
            },
            map: function (n) {
                return this.pushStack(
                    S.map(this, function (e, t) {
                        return n.call(e, t, e);
                    })
                );
            },
            slice: function () {
                return this.pushStack(a.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            even: function () {
                return this.pushStack(
                    S.grep(this, function (e, t) {
                        return (t + 1) % 2;
                    })
                );
            },
            odd: function () {
                return this.pushStack(
                    S.grep(this, function (e, t) {
                        return t % 2;
                    })
                );
            },
            eq: function (e) {
                var t = this.length,
                    e = +e + (e < 0 ? t : 0);
                return this.pushStack(0 <= e && e < t ? [this[e]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: u,
            sort: t.sort,
            splice: t.splice,
        }),
        (S.extend = S.fn.extend =
            function () {
                var e,
                    t,
                    n,
                    r,
                    i,
                    o = arguments[0] || {},
                    s = 1,
                    a = arguments.length,
                    u = !1;
                for (
                    "boolean" == typeof o &&
                        ((u = o), (o = arguments[s] || {}), s++),
                        "object" == typeof o || x(o) || (o = {}),
                        s === a && ((o = this), s--);
                    s < a;
                    s++
                )
                    if (null != (e = arguments[s]))
                        for (t in e)
                            (n = e[t]),
                                "__proto__" !== t &&
                                    o !== n &&
                                    (u &&
                                    n &&
                                    (S.isPlainObject(n) ||
                                        (r = Array.isArray(n)))
                                        ? ((i = o[t]),
                                          (i =
                                              r && !Array.isArray(i)
                                                  ? []
                                                  : r || S.isPlainObject(i)
                                                  ? i
                                                  : {}),
                                          (r = !1),
                                          (o[t] = S.extend(u, i, n)))
                                        : void 0 !== n && (o[t] = n));
                return o;
            }),
        S.extend({
            expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (e) {
                throw new Error(e);
            },
            noop: function () {},
            isPlainObject: function (e) {
                return !(
                    !e ||
                    "[object Object]" !== o.call(e) ||
                    ((e = n(e)) &&
                        ("function" !=
                            typeof (e =
                                m.call(e, "constructor") && e.constructor) ||
                            s.call(e) !== l))
                );
            },
            isEmptyObject: function (e) {
                for (var t in e) return !1;
                return !0;
            },
            globalEval: function (e, t, n) {
                b(e, { nonce: t && t.nonce }, n);
            },
            each: function (e, t) {
                var n,
                    r = 0;
                if (p(e))
                    for (
                        n = e.length;
                        r < n && !1 !== t.call(e[r], r, e[r]);
                        r++
                    );
                else for (r in e) if (!1 === t.call(e[r], r, e[r])) break;
                return e;
            },
            makeArray: function (e, t) {
                t = t || [];
                return (
                    null != e &&
                        (p(Object(e))
                            ? S.merge(t, "string" == typeof e ? [e] : e)
                            : u.call(t, e)),
                    t
                );
            },
            inArray: function (e, t, n) {
                return null == t ? -1 : i.call(t, e, n);
            },
            merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                    e[i++] = t[r];
                return (e.length = i), e;
            },
            grep: function (e, t, n) {
                for (var r = [], i = 0, o = e.length, s = !n; i < o; i++)
                    !t(e[i], i) != s && r.push(e[i]);
                return r;
            },
            map: function (e, t, n) {
                var r,
                    i,
                    o = 0,
                    s = [];
                if (p(e))
                    for (r = e.length; o < r; o++)
                        null != (i = t(e[o], o, n)) && s.push(i);
                else for (o in e) null != (i = t(e[o], o, n)) && s.push(i);
                return y(s);
            },
            guid: 1,
            support: v,
        }),
        "function" == typeof Symbol &&
            (S.fn[Symbol.iterator] = t[Symbol.iterator]),
        S.each(
            "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                " "
            ),
            function (e, t) {
                r["[object " + t + "]"] = t.toLowerCase();
            }
        );
    var d = (function (n) {
        function f(e, t) {
            return (
                (e = "0x" + e.slice(1) - 65536),
                t ||
                    (e < 0
                        ? String.fromCharCode(65536 + e)
                        : String.fromCharCode(
                              (e >> 10) | 55296,
                              (1023 & e) | 56320
                          ))
            );
        }
        function r() {
            T();
        }
        var e,
            p,
            b,
            o,
            i,
            d,
            h,
            g,
            w,
            u,
            l,
            T,
            C,
            s,
            S,
            y,
            a,
            c,
            m,
            E = "sizzle" + +new Date(),
            v = n.document,
            k = 0,
            x = 0,
            A = ue(),
            N = ue(),
            j = ue(),
            D = ue(),
            q = function (e, t) {
                return e === t && (l = !0), 0;
            },
            L = {}.hasOwnProperty,
            t = [],
            H = t.pop,
            O = t.push,
            P = t.push,
            R = t.slice,
            M = function (e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t) return n;
                return -1;
            },
            I =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            W = "[\\x20\\t\\r\\n\\f]",
            F =
                "(?:\\\\[\\da-fA-F]{1,6}" +
                W +
                "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
            $ =
                "\\[" +
                W +
                "*(" +
                F +
                ")(?:" +
                W +
                "*([*^$|!~]?=)" +
                W +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                F +
                "))|)" +
                W +
                "*\\]",
            B =
                ":(" +
                F +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                $ +
                ")*)|.*)\\)|)",
            _ = new RegExp(W + "+", "g"),
            z = new RegExp(
                "^" + W + "+|((?:^|[^\\\\])(?:\\\\.)*)" + W + "+$",
                "g"
            ),
            U = new RegExp("^" + W + "*," + W + "*"),
            X = new RegExp("^" + W + "*([>+~]|" + W + ")" + W + "*"),
            V = new RegExp(W + "|>"),
            G = new RegExp(B),
            Y = new RegExp("^" + F + "$"),
            Q = {
                ID: new RegExp("^#(" + F + ")"),
                CLASS: new RegExp("^\\.(" + F + ")"),
                TAG: new RegExp("^(" + F + "|[*])"),
                ATTR: new RegExp("^" + $),
                PSEUDO: new RegExp("^" + B),
                CHILD: new RegExp(
                    "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                        W +
                        "*(even|odd|(([+-]|)(\\d*)n|)" +
                        W +
                        "*(?:([+-]|)" +
                        W +
                        "*(\\d+)|))" +
                        W +
                        "*\\)|)",
                    "i"
                ),
                bool: new RegExp("^(?:" + I + ")$", "i"),
                needsContext: new RegExp(
                    "^" +
                        W +
                        "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        W +
                        "*((?:-\\d)?\\d*)" +
                        W +
                        "*\\)|)(?=[^-]|$)",
                    "i"
                ),
            },
            J = /HTML$/i,
            K = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            ee = /^[^{]+\{\s*\[native \w/,
            te = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            ne = /[+~]/,
            re = new RegExp(
                "\\\\[\\da-fA-F]{1,6}" + W + "?|\\\\([^\\r\\n\\f])",
                "g"
            ),
            ie = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            oe = function (e, t) {
                return t
                    ? "\0" === e
                        ? "ï¿½"
                        : e.slice(0, -1) +
                          "\\" +
                          e.charCodeAt(e.length - 1).toString(16) +
                          " "
                    : "\\" + e;
            },
            se = ve(
                function (e) {
                    return (
                        !0 === e.disabled &&
                        "fieldset" === e.nodeName.toLowerCase()
                    );
                },
                { dir: "parentNode", next: "legend" }
            );
        try {
            P.apply((t = R.call(v.childNodes)), v.childNodes),
                t[v.childNodes.length].nodeType;
        } catch (e) {
            P = {
                apply: t.length
                    ? function (e, t) {
                          O.apply(e, R.call(t));
                      }
                    : function (e, t) {
                          for (var n = e.length, r = 0; (e[n++] = t[r++]); );
                          e.length = n - 1;
                      },
            };
        }
        function ae(e, t, n, r) {
            var i,
                o,
                s,
                a,
                u,
                l,
                c = t && t.ownerDocument,
                f = t ? t.nodeType : 9;
            if (
                ((n = n || []),
                "string" != typeof e || !e || (1 !== f && 9 !== f && 11 !== f))
            )
                return n;
            if (!r && (T(t), (t = t || C), S)) {
                if (11 !== f && (a = te.exec(e)))
                    if ((l = a[1])) {
                        if (9 === f) {
                            if (!(o = t.getElementById(l))) return n;
                            if (o.id === l) return n.push(o), n;
                        } else if (
                            c &&
                            (o = c.getElementById(l)) &&
                            m(t, o) &&
                            o.id === l
                        )
                            return n.push(o), n;
                    } else {
                        if (a[2])
                            return P.apply(n, t.getElementsByTagName(e)), n;
                        if (
                            (l = a[3]) &&
                            p.getElementsByClassName &&
                            t.getElementsByClassName
                        )
                            return P.apply(n, t.getElementsByClassName(l)), n;
                    }
                if (
                    p.qsa &&
                    !D[e + " "] &&
                    (!y || !y.test(e)) &&
                    (1 !== f || "object" !== t.nodeName.toLowerCase())
                ) {
                    if (
                        ((l = e), (c = t), 1 === f && (V.test(e) || X.test(e)))
                    ) {
                        for (
                            ((c = (ne.test(e) && ge(t.parentNode)) || t) ===
                                t &&
                                p.scope) ||
                                ((s = t.getAttribute("id"))
                                    ? (s = s.replace(ie, oe))
                                    : t.setAttribute("id", (s = E))),
                                i = (u = d(e)).length;
                            i--;

                        )
                            u[i] = (s ? "#" + s : ":scope") + " " + me(u[i]);
                        l = u.join(",");
                    }
                    try {
                        if (
                            p.cssSupportsSelector &&
                            !CSS.supports("selector(:is(" + l + "))")
                        )
                            throw new Error();
                        return P.apply(n, c.querySelectorAll(l)), n;
                    } catch (t) {
                        D(e, !0);
                    } finally {
                        s === E && t.removeAttribute("id");
                    }
                }
            }
            return g(e.replace(z, "$1"), t, n, r);
        }
        function ue() {
            var r = [];
            return function e(t, n) {
                return (
                    r.push(t + " ") > b.cacheLength && delete e[r.shift()],
                    (e[t + " "] = n)
                );
            };
        }
        function le(e) {
            return (e[E] = !0), e;
        }
        function ce(e) {
            var t = C.createElement("fieldset");
            try {
                return !!e(t);
            } catch (e) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
            }
        }
        function fe(e, t) {
            for (var n = e.split("|"), r = n.length; r--; )
                b.attrHandle[n[r]] = t;
        }
        function pe(e, t) {
            var n = t && e,
                r =
                    n &&
                    1 === e.nodeType &&
                    1 === t.nodeType &&
                    e.sourceIndex - t.sourceIndex;
            if (r) return r;
            if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function de(t) {
            return function (e) {
                return "form" in e
                    ? e.parentNode && !1 === e.disabled
                        ? "label" in e
                            ? "label" in e.parentNode
                                ? e.parentNode.disabled === t
                                : e.disabled === t
                            : e.isDisabled === t ||
                              (e.isDisabled !== !t && se(e) === t)
                        : e.disabled === t
                    : "label" in e && e.disabled === t;
            };
        }
        function he(s) {
            return le(function (o) {
                return (
                    (o = +o),
                    le(function (e, t) {
                        for (var n, r = s([], e.length, o), i = r.length; i--; )
                            e[(n = r[i])] && (e[n] = !(t[n] = e[n]));
                    })
                );
            });
        }
        function ge(e) {
            return e && void 0 !== e.getElementsByTagName && e;
        }
        for (e in ((p = ae.support = {}),
        (i = ae.isXML =
            function (e) {
                var t = e && e.namespaceURI,
                    e = e && (e.ownerDocument || e).documentElement;
                return !J.test(t || (e && e.nodeName) || "HTML");
            }),
        (T = ae.setDocument =
            function (e) {
                var t,
                    e = e ? e.ownerDocument || e : v;
                return (
                    e != C &&
                        9 === e.nodeType &&
                        e.documentElement &&
                        ((s = (C = e).documentElement),
                        (S = !i(C)),
                        v != C &&
                            (t = C.defaultView) &&
                            t.top !== t &&
                            (t.addEventListener
                                ? t.addEventListener("unload", r, !1)
                                : t.attachEvent &&
                                  t.attachEvent("onunload", r)),
                        (p.scope = ce(function (e) {
                            return (
                                s
                                    .appendChild(e)
                                    .appendChild(C.createElement("div")),
                                void 0 !== e.querySelectorAll &&
                                    !e.querySelectorAll(":scope fieldset div")
                                        .length
                            );
                        })),
                        (p.cssSupportsSelector = ce(function () {
                            return (
                                CSS.supports("selector(*)") &&
                                C.querySelectorAll(":is(:jqfake)") &&
                                !CSS.supports("selector(:is(*,:jqfake))")
                            );
                        })),
                        (p.attributes = ce(function (e) {
                            return (
                                (e.className = "i"),
                                !e.getAttribute("className")
                            );
                        })),
                        (p.getElementsByTagName = ce(function (e) {
                            return (
                                e.appendChild(C.createComment("")),
                                !e.getElementsByTagName("*").length
                            );
                        })),
                        (p.getElementsByClassName = ee.test(
                            C.getElementsByClassName
                        )),
                        (p.getById = ce(function (e) {
                            return (
                                (s.appendChild(e).id = E),
                                !C.getElementsByName ||
                                    !C.getElementsByName(E).length
                            );
                        })),
                        p.getById
                            ? ((b.filter.ID = function (e) {
                                  var t = e.replace(re, f);
                                  return function (e) {
                                      return e.getAttribute("id") === t;
                                  };
                              }),
                              (b.find.ID = function (e, t) {
                                  if (void 0 !== t.getElementById && S) {
                                      e = t.getElementById(e);
                                      return e ? [e] : [];
                                  }
                              }))
                            : ((b.filter.ID = function (e) {
                                  var t = e.replace(re, f);
                                  return function (e) {
                                      e =
                                          void 0 !== e.getAttributeNode &&
                                          e.getAttributeNode("id");
                                      return e && e.value === t;
                                  };
                              }),
                              (b.find.ID = function (e, t) {
                                  if (void 0 !== t.getElementById && S) {
                                      var n,
                                          r,
                                          i,
                                          o = t.getElementById(e);
                                      if (o) {
                                          if (
                                              (n = o.getAttributeNode("id")) &&
                                              n.value === e
                                          )
                                              return [o];
                                          for (
                                              i = t.getElementsByName(e), r = 0;
                                              (o = i[r++]);

                                          )
                                              if (
                                                  (n =
                                                      o.getAttributeNode(
                                                          "id"
                                                      )) &&
                                                  n.value === e
                                              )
                                                  return [o];
                                      }
                                      return [];
                                  }
                              })),
                        (b.find.TAG = p.getElementsByTagName
                            ? function (e, t) {
                                  return void 0 !== t.getElementsByTagName
                                      ? t.getElementsByTagName(e)
                                      : p.qsa
                                      ? t.querySelectorAll(e)
                                      : void 0;
                              }
                            : function (e, t) {
                                  var n,
                                      r = [],
                                      i = 0,
                                      o = t.getElementsByTagName(e);
                                  if ("*" !== e) return o;
                                  for (; (n = o[i++]); )
                                      1 === n.nodeType && r.push(n);
                                  return r;
                              }),
                        (b.find.CLASS =
                            p.getElementsByClassName &&
                            function (e, t) {
                                if (void 0 !== t.getElementsByClassName && S)
                                    return t.getElementsByClassName(e);
                            }),
                        (a = []),
                        (y = []),
                        (p.qsa = ee.test(C.querySelectorAll)) &&
                            (ce(function (e) {
                                var t;
                                (s.appendChild(e).innerHTML =
                                    "<a id='" +
                                    E +
                                    "'></a><select id='" +
                                    E +
                                    "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                    e.querySelectorAll("[msallowcapture^='']")
                                        .length &&
                                        y.push("[*^$]=" + W + "*(?:''|\"\")"),
                                    e.querySelectorAll("[selected]").length ||
                                        y.push(
                                            "\\[" + W + "*(?:value|" + I + ")"
                                        ),
                                    e.querySelectorAll("[id~=" + E + "-]")
                                        .length || y.push("~="),
                                    (t = C.createElement("input")).setAttribute(
                                        "name",
                                        ""
                                    ),
                                    e.appendChild(t),
                                    e.querySelectorAll("[name='']").length ||
                                        y.push(
                                            "\\[" +
                                                W +
                                                "*name" +
                                                W +
                                                "*=" +
                                                W +
                                                "*(?:''|\"\")"
                                        ),
                                    e.querySelectorAll(":checked").length ||
                                        y.push(":checked"),
                                    e.querySelectorAll("a#" + E + "+*")
                                        .length || y.push(".#.+[+~]"),
                                    e.querySelectorAll("\\\f"),
                                    y.push("[\\r\\n\\f]");
                            }),
                            ce(function (e) {
                                e.innerHTML =
                                    "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                                var t = C.createElement("input");
                                t.setAttribute("type", "hidden"),
                                    e.appendChild(t).setAttribute("name", "D"),
                                    e.querySelectorAll("[name=d]").length &&
                                        y.push("name" + W + "*[*^$|!~]?="),
                                    2 !==
                                        e.querySelectorAll(":enabled").length &&
                                        y.push(":enabled", ":disabled"),
                                    (s.appendChild(e).disabled = !0),
                                    2 !==
                                        e.querySelectorAll(":disabled")
                                            .length &&
                                        y.push(":enabled", ":disabled"),
                                    e.querySelectorAll("*,:x"),
                                    y.push(",.*:");
                            })),
                        (p.matchesSelector = ee.test(
                            (c =
                                s.matches ||
                                s.webkitMatchesSelector ||
                                s.mozMatchesSelector ||
                                s.oMatchesSelector ||
                                s.msMatchesSelector)
                        )) &&
                            ce(function (e) {
                                (p.disconnectedMatch = c.call(e, "*")),
                                    c.call(e, "[s!='']:x"),
                                    a.push("!=", B);
                            }),
                        p.cssSupportsSelector || y.push(":has"),
                        (y = y.length && new RegExp(y.join("|"))),
                        (a = a.length && new RegExp(a.join("|"))),
                        (t = ee.test(s.compareDocumentPosition)),
                        (m =
                            t || ee.test(s.contains)
                                ? function (e, t) {
                                      var n =
                                              (9 === e.nodeType &&
                                                  e.documentElement) ||
                                              e,
                                          t = t && t.parentNode;
                                      return (
                                          e === t ||
                                          !(
                                              !t ||
                                              1 !== t.nodeType ||
                                              !(n.contains
                                                  ? n.contains(t)
                                                  : e.compareDocumentPosition &&
                                                    16 &
                                                        e.compareDocumentPosition(
                                                            t
                                                        ))
                                          )
                                      );
                                  }
                                : function (e, t) {
                                      if (t)
                                          for (; (t = t.parentNode); )
                                              if (t === e) return !0;
                                      return !1;
                                  }),
                        (q = t
                            ? function (e, t) {
                                  if (e === t) return (l = !0), 0;
                                  var n =
                                      !e.compareDocumentPosition -
                                      !t.compareDocumentPosition;
                                  return (
                                      n ||
                                      (1 &
                                          (n =
                                              (e.ownerDocument || e) ==
                                              (t.ownerDocument || t)
                                                  ? e.compareDocumentPosition(t)
                                                  : 1) ||
                                      (!p.sortDetached &&
                                          t.compareDocumentPosition(e) === n)
                                          ? e == C ||
                                            (e.ownerDocument == v && m(v, e))
                                              ? -1
                                              : t == C ||
                                                (t.ownerDocument == v &&
                                                    m(v, t))
                                              ? 1
                                              : u
                                              ? M(u, e) - M(u, t)
                                              : 0
                                          : 4 & n
                                          ? -1
                                          : 1)
                                  );
                              }
                            : function (e, t) {
                                  if (e === t) return (l = !0), 0;
                                  var n,
                                      r = 0,
                                      i = e.parentNode,
                                      o = t.parentNode,
                                      s = [e],
                                      a = [t];
                                  if (!i || !o)
                                      return e == C
                                          ? -1
                                          : t == C
                                          ? 1
                                          : i
                                          ? -1
                                          : o
                                          ? 1
                                          : u
                                          ? M(u, e) - M(u, t)
                                          : 0;
                                  if (i === o) return pe(e, t);
                                  for (n = e; (n = n.parentNode); )
                                      s.unshift(n);
                                  for (n = t; (n = n.parentNode); )
                                      a.unshift(n);
                                  for (; s[r] === a[r]; ) r++;
                                  return r
                                      ? pe(s[r], a[r])
                                      : s[r] == v
                                      ? -1
                                      : a[r] == v
                                      ? 1
                                      : 0;
                              })),
                    C
                );
            }),
        (ae.matches = function (e, t) {
            return ae(e, null, null, t);
        }),
        (ae.matchesSelector = function (e, t) {
            if (
                (T(e),
                p.matchesSelector &&
                    S &&
                    !D[t + " "] &&
                    (!a || !a.test(t)) &&
                    (!y || !y.test(t)))
            )
                try {
                    var n = c.call(e, t);
                    if (
                        n ||
                        p.disconnectedMatch ||
                        (e.document && 11 !== e.document.nodeType)
                    )
                        return n;
                } catch (e) {
                    D(t, !0);
                }
            return 0 < ae(t, C, null, [e]).length;
        }),
        (ae.contains = function (e, t) {
            return (e.ownerDocument || e) != C && T(e), m(e, t);
        }),
        (ae.attr = function (e, t) {
            (e.ownerDocument || e) != C && T(e);
            var n = b.attrHandle[t.toLowerCase()],
                n =
                    n && L.call(b.attrHandle, t.toLowerCase())
                        ? n(e, t, !S)
                        : void 0;
            return void 0 !== n
                ? n
                : p.attributes || !S
                ? e.getAttribute(t)
                : (n = e.getAttributeNode(t)) && n.specified
                ? n.value
                : null;
        }),
        (ae.escape = function (e) {
            return (e + "").replace(ie, oe);
        }),
        (ae.error = function (e) {
            throw new Error("Syntax error, unrecognized expression: " + e);
        }),
        (ae.uniqueSort = function (e) {
            var t,
                n = [],
                r = 0,
                i = 0;
            if (
                ((l = !p.detectDuplicates),
                (u = !p.sortStable && e.slice(0)),
                e.sort(q),
                l)
            ) {
                for (; (t = e[i++]); ) t === e[i] && (r = n.push(i));
                for (; r--; ) e.splice(n[r], 1);
            }
            return (u = null), e;
        }),
        (o = ae.getText =
            function (e) {
                var t,
                    n = "",
                    r = 0,
                    i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent)
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += o(e);
                    } else if (3 === i || 4 === i) return e.nodeValue;
                } else for (; (t = e[r++]); ) n += o(t);
                return n;
            }),
        ((b = ae.selectors =
            {
                cacheLength: 50,
                createPseudo: le,
                match: Q,
                attrHandle: {},
                find: {},
                relative: {
                    ">": { dir: "parentNode", first: !0 },
                    " ": { dir: "parentNode" },
                    "+": { dir: "previousSibling", first: !0 },
                    "~": { dir: "previousSibling" },
                },
                preFilter: {
                    ATTR: function (e) {
                        return (
                            (e[1] = e[1].replace(re, f)),
                            (e[3] = (e[3] || e[4] || e[5] || "").replace(
                                re,
                                f
                            )),
                            "~=" === e[2] && (e[3] = " " + e[3] + " "),
                            e.slice(0, 4)
                        );
                    },
                    CHILD: function (e) {
                        return (
                            (e[1] = e[1].toLowerCase()),
                            "nth" === e[1].slice(0, 3)
                                ? (e[3] || ae.error(e[0]),
                                  (e[4] = +(e[4]
                                      ? e[5] + (e[6] || 1)
                                      : 2 *
                                        ("even" === e[3] || "odd" === e[3]))),
                                  (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                                : e[3] && ae.error(e[0]),
                            e
                        );
                    },
                    PSEUDO: function (e) {
                        var t,
                            n = !e[6] && e[2];
                        return Q.CHILD.test(e[0])
                            ? null
                            : (e[3]
                                  ? (e[2] = e[4] || e[5] || "")
                                  : n &&
                                    G.test(n) &&
                                    (t = d(n, !0)) &&
                                    (t =
                                        n.indexOf(")", n.length - t) -
                                        n.length) &&
                                    ((e[0] = e[0].slice(0, t)),
                                    (e[2] = n.slice(0, t))),
                              e.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(re, f).toLowerCase();
                        return "*" === e
                            ? function () {
                                  return !0;
                              }
                            : function (e) {
                                  return (
                                      e.nodeName &&
                                      e.nodeName.toLowerCase() === t
                                  );
                              };
                    },
                    CLASS: function (e) {
                        var t = A[e + " "];
                        return (
                            t ||
                            ((t = new RegExp(
                                "(^|" + W + ")" + e + "(" + W + "|$)"
                            )) &&
                                A(e, function (e) {
                                    return t.test(
                                        ("string" == typeof e.className &&
                                            e.className) ||
                                            (void 0 !== e.getAttribute &&
                                                e.getAttribute("class")) ||
                                            ""
                                    );
                                }))
                        );
                    },
                    ATTR: function (t, n, r) {
                        return function (e) {
                            e = ae.attr(e, t);
                            return null == e
                                ? "!=" === n
                                : !n ||
                                      ((e += ""),
                                      "=" === n
                                          ? e === r
                                          : "!=" === n
                                          ? e !== r
                                          : "^=" === n
                                          ? r && 0 === e.indexOf(r)
                                          : "*=" === n
                                          ? r && -1 < e.indexOf(r)
                                          : "$=" === n
                                          ? r && e.slice(-r.length) === r
                                          : "~=" === n
                                          ? -1 <
                                            (
                                                " " +
                                                e.replace(_, " ") +
                                                " "
                                            ).indexOf(r)
                                          : "|=" === n &&
                                            (e === r ||
                                                e.slice(0, r.length + 1) ===
                                                    r + "-"));
                        };
                    },
                    CHILD: function (h, e, t, g, y) {
                        var m = "nth" !== h.slice(0, 3),
                            v = "last" !== h.slice(-4),
                            x = "of-type" === e;
                        return 1 === g && 0 === y
                            ? function (e) {
                                  return !!e.parentNode;
                              }
                            : function (e, t, n) {
                                  var r,
                                      i,
                                      o,
                                      s,
                                      a,
                                      u,
                                      l =
                                          m != v
                                              ? "nextSibling"
                                              : "previousSibling",
                                      c = e.parentNode,
                                      f = x && e.nodeName.toLowerCase(),
                                      p = !n && !x,
                                      d = !1;
                                  if (c) {
                                      if (m) {
                                          for (; l; ) {
                                              for (s = e; (s = s[l]); )
                                                  if (
                                                      x
                                                          ? s.nodeName.toLowerCase() ===
                                                            f
                                                          : 1 === s.nodeType
                                                  )
                                                      return !1;
                                              u = l =
                                                  "only" === h &&
                                                  !u &&
                                                  "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (
                                          ((u = [
                                              v ? c.firstChild : c.lastChild,
                                          ]),
                                          v && p)
                                      ) {
                                          for (
                                              d =
                                                  (a =
                                                      (r =
                                                          (i =
                                                              (o =
                                                                  (s = c)[E] ||
                                                                  (s[E] = {}))[
                                                                  s.uniqueID
                                                              ] ||
                                                              (o[s.uniqueID] =
                                                                  {}))[h] ||
                                                          [])[0] === k &&
                                                      r[1]) && r[2],
                                                  s = a && c.childNodes[a];
                                              (s =
                                                  (++a && s && s[l]) ||
                                                  (d = a = 0) ||
                                                  u.pop());

                                          )
                                              if (
                                                  1 === s.nodeType &&
                                                  ++d &&
                                                  s === e
                                              ) {
                                                  i[h] = [k, a, d];
                                                  break;
                                              }
                                      } else if (
                                          !1 ===
                                          (d = p
                                              ? (a =
                                                    (r =
                                                        (i =
                                                            (o =
                                                                (s = e)[E] ||
                                                                (s[E] = {}))[
                                                                s.uniqueID
                                                            ] ||
                                                            (o[s.uniqueID] =
                                                                {}))[h] ||
                                                        [])[0] === k && r[1])
                                              : d)
                                      )
                                          for (
                                              ;
                                              (s =
                                                  (++a && s && s[l]) ||
                                                  (d = a = 0) ||
                                                  u.pop()) &&
                                              ((x
                                                  ? s.nodeName.toLowerCase() !==
                                                    f
                                                  : 1 !== s.nodeType) ||
                                                  !++d ||
                                                  (p &&
                                                      ((i =
                                                          (o =
                                                              s[E] ||
                                                              (s[E] = {}))[
                                                              s.uniqueID
                                                          ] ||
                                                          (o[s.uniqueID] = {}))[
                                                          h
                                                      ] = [k, d]),
                                                  s !== e));

                                          );
                                      return (
                                          (d -= y) === g ||
                                          (d % g == 0 && 0 <= d / g)
                                      );
                                  }
                              };
                    },
                    PSEUDO: function (e, o) {
                        var t,
                            s =
                                b.pseudos[e] ||
                                b.setFilters[e.toLowerCase()] ||
                                ae.error("unsupported pseudo: " + e);
                        return s[E]
                            ? s(o)
                            : 1 < s.length
                            ? ((t = [e, e, "", o]),
                              b.setFilters.hasOwnProperty(e.toLowerCase())
                                  ? le(function (e, t) {
                                        for (
                                            var n, r = s(e, o), i = r.length;
                                            i--;

                                        )
                                            e[(n = M(e, r[i]))] = !(t[n] =
                                                r[i]);
                                    })
                                  : function (e) {
                                        return s(e, 0, t);
                                    })
                            : s;
                    },
                },
                pseudos: {
                    not: le(function (e) {
                        var r = [],
                            i = [],
                            a = h(e.replace(z, "$1"));
                        return a[E]
                            ? le(function (e, t, n, r) {
                                  for (
                                      var i,
                                          o = a(e, null, r, []),
                                          s = e.length;
                                      s--;

                                  )
                                      (i = o[s]) && (e[s] = !(t[s] = i));
                              })
                            : function (e, t, n) {
                                  return (
                                      (r[0] = e),
                                      a(r, null, n, i),
                                      (r[0] = null),
                                      !i.pop()
                                  );
                              };
                    }),
                    has: le(function (t) {
                        return function (e) {
                            return 0 < ae(t, e).length;
                        };
                    }),
                    contains: le(function (t) {
                        return (
                            (t = t.replace(re, f)),
                            function (e) {
                                return -1 < (e.textContent || o(e)).indexOf(t);
                            }
                        );
                    }),
                    lang: le(function (n) {
                        return (
                            Y.test(n || "") ||
                                ae.error("unsupported lang: " + n),
                            (n = n.replace(re, f).toLowerCase()),
                            function (e) {
                                var t;
                                do {
                                    if (
                                        (t = S
                                            ? e.lang
                                            : e.getAttribute("xml:lang") ||
                                              e.getAttribute("lang"))
                                    )
                                        return (
                                            (t = t.toLowerCase()) === n ||
                                            0 === t.indexOf(n + "-")
                                        );
                                } while (
                                    (e = e.parentNode) &&
                                    1 === e.nodeType
                                );
                                return !1;
                            }
                        );
                    }),
                    target: function (e) {
                        var t = n.location && n.location.hash;
                        return t && t.slice(1) === e.id;
                    },
                    root: function (e) {
                        return e === s;
                    },
                    focus: function (e) {
                        return (
                            e === C.activeElement &&
                            (!C.hasFocus || C.hasFocus()) &&
                            !!(e.type || e.href || ~e.tabIndex)
                        );
                    },
                    enabled: de(!1),
                    disabled: de(!0),
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return (
                            ("input" === t && !!e.checked) ||
                            ("option" === t && !!e.selected)
                        );
                    },
                    selected: function (e) {
                        return (
                            e.parentNode && e.parentNode.selectedIndex,
                            !0 === e.selected
                        );
                    },
                    empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (e) {
                        return !b.pseudos.empty(e);
                    },
                    header: function (e) {
                        return Z.test(e.nodeName);
                    },
                    input: function (e) {
                        return K.test(e.nodeName);
                    },
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return (
                            ("input" === t && "button" === e.type) ||
                            "button" === t
                        );
                    },
                    text: function (e) {
                        return (
                            "input" === e.nodeName.toLowerCase() &&
                            "text" === e.type &&
                            (null == (e = e.getAttribute("type")) ||
                                "text" === e.toLowerCase())
                        );
                    },
                    first: he(function () {
                        return [0];
                    }),
                    last: he(function (e, t) {
                        return [t - 1];
                    }),
                    eq: he(function (e, t, n) {
                        return [n < 0 ? n + t : n];
                    }),
                    even: he(function (e, t) {
                        for (var n = 0; n < t; n += 2) e.push(n);
                        return e;
                    }),
                    odd: he(function (e, t) {
                        for (var n = 1; n < t; n += 2) e.push(n);
                        return e;
                    }),
                    lt: he(function (e, t, n) {
                        for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; )
                            e.push(r);
                        return e;
                    }),
                    gt: he(function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t; ) e.push(r);
                        return e;
                    }),
                },
            }).pseudos.nth = b.pseudos.eq),
        { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }))
            b.pseudos[e] = (function (t) {
                return function (e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t;
                };
            })(e);
        for (e in { submit: !0, reset: !0 })
            b.pseudos[e] = (function (n) {
                return function (e) {
                    var t = e.nodeName.toLowerCase();
                    return ("input" === t || "button" === t) && e.type === n;
                };
            })(e);
        function ye() {}
        function me(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++) r += e[t].value;
            return r;
        }
        function ve(s, e, t) {
            var a = e.dir,
                u = e.next,
                l = u || a,
                c = t && "parentNode" === l,
                f = x++;
            return e.first
                ? function (e, t, n) {
                      for (; (e = e[a]); )
                          if (1 === e.nodeType || c) return s(e, t, n);
                      return !1;
                  }
                : function (e, t, n) {
                      var r,
                          i,
                          o = [k, f];
                      if (n) {
                          for (; (e = e[a]); )
                              if ((1 === e.nodeType || c) && s(e, t, n))
                                  return !0;
                      } else
                          for (; (e = e[a]); )
                              if (1 === e.nodeType || c)
                                  if (
                                      ((r =
                                          (i = e[E] || (e[E] = {}))[
                                              e.uniqueID
                                          ] || (i[e.uniqueID] = {})),
                                      u && u === e.nodeName.toLowerCase())
                                  )
                                      e = e[a] || e;
                                  else {
                                      if (
                                          (i = r[l]) &&
                                          i[0] === k &&
                                          i[1] === f
                                      )
                                          return (o[2] = i[2]);
                                      if (((r[l] = o)[2] = s(e, t, n)))
                                          return !0;
                                  }
                      return !1;
                  };
        }
        function xe(i) {
            return 1 < i.length
                ? function (e, t, n) {
                      for (var r = i.length; r--; )
                          if (!i[r](e, t, n)) return !1;
                      return !0;
                  }
                : i[0];
        }
        function be(e, t, n, r, i) {
            for (var o, s = [], a = 0, u = e.length, l = null != t; a < u; a++)
                (o = e[a]) &&
                    ((n && !n(o, r, i)) || (s.push(o), l && t.push(a)));
            return s;
        }
        function we(e) {
            for (
                var r,
                    t,
                    n,
                    i = e.length,
                    o = b.relative[e[0].type],
                    s = o || b.relative[" "],
                    a = o ? 1 : 0,
                    u = ve(
                        function (e) {
                            return e === r;
                        },
                        s,
                        !0
                    ),
                    l = ve(
                        function (e) {
                            return -1 < M(r, e);
                        },
                        s,
                        !0
                    ),
                    c = [
                        function (e, t, n) {
                            n =
                                (!o && (n || t !== w)) ||
                                ((r = t).nodeType ? u : l)(e, t, n);
                            return (r = null), n;
                        },
                    ];
                a < i;
                a++
            )
                if ((t = b.relative[e[a].type])) c = [ve(xe(c), t)];
                else {
                    if (
                        (t = b.filter[e[a].type].apply(null, e[a].matches))[E]
                    ) {
                        for (n = ++a; n < i && !b.relative[e[n].type]; n++);
                        return (function e(d, h, g, y, m, t) {
                            return (
                                y && !y[E] && (y = e(y)),
                                m && !m[E] && (m = e(m, t)),
                                le(function (e, t, n, r) {
                                    var i,
                                        o,
                                        s,
                                        a = [],
                                        u = [],
                                        l = t.length,
                                        c =
                                            e ||
                                            (function (e, t, n) {
                                                for (
                                                    var r = 0, i = t.length;
                                                    r < i;
                                                    r++
                                                )
                                                    ae(e, t[r], n);
                                                return n;
                                            })(
                                                h || "*",
                                                n.nodeType ? [n] : n,
                                                []
                                            ),
                                        f =
                                            !d || (!e && h)
                                                ? c
                                                : be(c, a, d, n, r),
                                        p = g
                                            ? m || (e ? d : l || y)
                                                ? []
                                                : t
                                            : f;
                                    if ((g && g(f, p, n, r), y))
                                        for (
                                            i = be(p, u),
                                                y(i, [], n, r),
                                                o = i.length;
                                            o--;

                                        )
                                            (s = i[o]) &&
                                                (p[u[o]] = !(f[u[o]] = s));
                                    if (e) {
                                        if (m || d) {
                                            if (m) {
                                                for (
                                                    i = [], o = p.length;
                                                    o--;

                                                )
                                                    (s = p[o]) &&
                                                        i.push((f[o] = s));
                                                m(null, (p = []), i, r);
                                            }
                                            for (o = p.length; o--; )
                                                (s = p[o]) &&
                                                    -1 <
                                                        (i = m
                                                            ? M(e, s)
                                                            : a[o]) &&
                                                    (e[i] = !(t[i] = s));
                                        }
                                    } else (p = be(p === t ? p.splice(l, p.length) : p)), m ? m(null, t, p, r) : P.apply(t, p);
                                })
                            );
                        })(
                            1 < a && xe(c),
                            1 < a &&
                                me(
                                    e
                                        .slice(0, a - 1)
                                        .concat({
                                            value:
                                                " " === e[a - 2].type
                                                    ? "*"
                                                    : "",
                                        })
                                ).replace(z, "$1"),
                            t,
                            a < n && we(e.slice(a, n)),
                            n < i && we((e = e.slice(n))),
                            n < i && me(e)
                        );
                    }
                    c.push(t);
                }
            return xe(c);
        }
        return (
            (ye.prototype = b.filters = b.pseudos),
            (b.setFilters = new ye()),
            (d = ae.tokenize =
                function (e, t) {
                    var n,
                        r,
                        i,
                        o,
                        s,
                        a,
                        u,
                        l = N[e + " "];
                    if (l) return t ? 0 : l.slice(0);
                    for (s = e, a = [], u = b.preFilter; s; ) {
                        for (o in ((n && !(r = U.exec(s))) ||
                            (r && (s = s.slice(r[0].length) || s),
                            a.push((i = []))),
                        (n = !1),
                        (r = X.exec(s)) &&
                            ((n = r.shift()),
                            i.push({ value: n, type: r[0].replace(z, " ") }),
                            (s = s.slice(n.length))),
                        b.filter))
                            !(r = Q[o].exec(s)) ||
                                (u[o] && !(r = u[o](r))) ||
                                ((n = r.shift()),
                                i.push({ value: n, type: o, matches: r }),
                                (s = s.slice(n.length)));
                        if (!n) break;
                    }
                    return t ? s.length : s ? ae.error(e) : N(e, a).slice(0);
                }),
            (h = ae.compile =
                function (e, t) {
                    var n,
                        y,
                        m,
                        v,
                        x,
                        r,
                        i = [],
                        o = [],
                        s = j[e + " "];
                    if (!s) {
                        for (n = (t = t || d(e)).length; n--; )
                            ((s = we(t[n]))[E] ? i : o).push(s);
                        (s = j(
                            e,
                            ((v = 0 < (m = i).length),
                            (x = 0 < (y = o).length),
                            (r = function (e, t, n, r, i) {
                                var o,
                                    s,
                                    a,
                                    u = 0,
                                    l = "0",
                                    c = e && [],
                                    f = [],
                                    p = w,
                                    d = e || (x && b.find.TAG("*", i)),
                                    h = (k +=
                                        null == p ? 1 : Math.random() || 0.1),
                                    g = d.length;
                                for (
                                    i && (w = t == C || t || i);
                                    l !== g && null != (o = d[l]);
                                    l++
                                ) {
                                    if (x && o) {
                                        for (
                                            s = 0,
                                                t ||
                                                    o.ownerDocument == C ||
                                                    (T(o), (n = !S));
                                            (a = y[s++]);

                                        )
                                            if (a(o, t || C, n)) {
                                                r.push(o);
                                                break;
                                            }
                                        i && (k = h);
                                    }
                                    v && ((o = !a && o) && u--, e && c.push(o));
                                }
                                if (((u += l), v && l !== u)) {
                                    for (s = 0; (a = m[s++]); ) a(c, f, t, n);
                                    if (e) {
                                        if (0 < u)
                                            for (; l--; )
                                                c[l] ||
                                                    f[l] ||
                                                    (f[l] = H.call(r));
                                        f = be(f);
                                    }
                                    P.apply(r, f),
                                        i &&
                                            !e &&
                                            0 < f.length &&
                                            1 < u + m.length &&
                                            ae.uniqueSort(r);
                                }
                                return i && ((k = h), (w = p)), c;
                            }),
                            v ? le(r) : r)
                        )).selector = e;
                    }
                    return s;
                }),
            (g = ae.select =
                function (e, t, n, r) {
                    var i,
                        o,
                        s,
                        a,
                        u,
                        l = "function" == typeof e && e,
                        c = !r && d((e = l.selector || e));
                    if (((n = n || []), 1 === c.length)) {
                        if (
                            2 < (o = c[0] = c[0].slice(0)).length &&
                            "ID" === (s = o[0]).type &&
                            9 === t.nodeType &&
                            S &&
                            b.relative[o[1].type]
                        ) {
                            if (
                                !(t = (b.find.ID(
                                    s.matches[0].replace(re, f),
                                    t
                                ) || [])[0])
                            )
                                return n;
                            l && (t = t.parentNode),
                                (e = e.slice(o.shift().value.length));
                        }
                        for (
                            i = Q.needsContext.test(e) ? 0 : o.length;
                            i-- && ((s = o[i]), !b.relative[(a = s.type)]);

                        )
                            if (
                                (u = b.find[a]) &&
                                (r = u(
                                    s.matches[0].replace(re, f),
                                    (ne.test(o[0].type) && ge(t.parentNode)) ||
                                        t
                                ))
                            ) {
                                if ((o.splice(i, 1), !(e = r.length && me(o))))
                                    return P.apply(n, r), n;
                                break;
                            }
                    }
                    return (
                        (l || h(e, c))(
                            r,
                            t,
                            !S,
                            n,
                            !t || (ne.test(e) && ge(t.parentNode)) || t
                        ),
                        n
                    );
                }),
            (p.sortStable = E.split("").sort(q).join("") === E),
            (p.detectDuplicates = !!l),
            T(),
            (p.sortDetached = ce(function (e) {
                return (
                    1 & e.compareDocumentPosition(C.createElement("fieldset"))
                );
            })),
            ce(function (e) {
                return (
                    (e.innerHTML = "<a href='#'></a>"),
                    "#" === e.firstChild.getAttribute("href")
                );
            }) ||
                fe("type|href|height|width", function (e, t, n) {
                    if (!n)
                        return e.getAttribute(
                            t,
                            "type" === t.toLowerCase() ? 1 : 2
                        );
                }),
            (p.attributes &&
                ce(function (e) {
                    return (
                        (e.innerHTML = "<input/>"),
                        e.firstChild.setAttribute("value", ""),
                        "" === e.firstChild.getAttribute("value")
                    );
                })) ||
                fe("value", function (e, t, n) {
                    if (!n && "input" === e.nodeName.toLowerCase())
                        return e.defaultValue;
                }),
            ce(function (e) {
                return null == e.getAttribute("disabled");
            }) ||
                fe(I, function (e, t, n) {
                    if (!n)
                        return !0 === e[t]
                            ? t.toLowerCase()
                            : (t = e.getAttributeNode(t)) && t.specified
                            ? t.value
                            : null;
                }),
            ae
        );
    })(T);
    (S.find = d),
        (S.expr = d.selectors),
        (S.expr[":"] = S.expr.pseudos),
        (S.uniqueSort = S.unique = d.uniqueSort),
        (S.text = d.getText),
        (S.isXMLDoc = d.isXML),
        (S.contains = d.contains),
        (S.escapeSelector = d.escape);
    function w(e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
            if (1 === e.nodeType) {
                if (i && S(e).is(n)) break;
                r.push(e);
            }
        return r;
    }
    function E(e, t) {
        for (var n = []; e; e = e.nextSibling)
            1 === e.nodeType && e !== t && n.push(e);
        return n;
    }
    var k = S.expr.match.needsContext;
    function A(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
    }
    var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
    function j(e, n, r) {
        return x(n)
            ? S.grep(e, function (e, t) {
                  return !!n.call(e, t, e) !== r;
              })
            : n.nodeType
            ? S.grep(e, function (e) {
                  return (e === n) !== r;
              })
            : "string" != typeof n
            ? S.grep(e, function (e) {
                  return -1 < i.call(n, e) !== r;
              })
            : S.filter(n, e, r);
    }
    (S.filter = function (e, t, n) {
        var r = t[0];
        return (
            n && (e = ":not(" + e + ")"),
            1 === t.length && 1 === r.nodeType
                ? S.find.matchesSelector(r, e)
                    ? [r]
                    : []
                : S.find.matches(
                      e,
                      S.grep(t, function (e) {
                          return 1 === e.nodeType;
                      })
                  )
        );
    }),
        S.fn.extend({
            find: function (e) {
                var t,
                    n,
                    r = this.length,
                    i = this;
                if ("string" != typeof e)
                    return this.pushStack(
                        S(e).filter(function () {
                            for (t = 0; t < r; t++)
                                if (S.contains(i[t], this)) return !0;
                        })
                    );
                for (n = this.pushStack([]), t = 0; t < r; t++)
                    S.find(e, i[t], n);
                return 1 < r ? S.uniqueSort(n) : n;
            },
            filter: function (e) {
                return this.pushStack(j(this, e || [], !1));
            },
            not: function (e) {
                return this.pushStack(j(this, e || [], !0));
            },
            is: function (e) {
                return !!j(
                    this,
                    "string" == typeof e && k.test(e) ? S(e) : e || [],
                    !1
                ).length;
            },
        });
    var D = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (S.fn.init = function (e, t, n) {
        if (!e) return this;
        if (((n = n || q), "string" != typeof e))
            return e.nodeType
                ? ((this[0] = e), (this.length = 1), this)
                : x(e)
                ? void 0 !== n.ready
                    ? n.ready(e)
                    : e(S)
                : S.makeArray(e, this);
        if (
            !(r =
                "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length
                    ? [null, e, null]
                    : D.exec(e)) ||
            (!r[1] && t)
        )
            return (!t || t.jquery ? t || n : this.constructor(t)).find(e);
        if (r[1]) {
            if (
                ((t = t instanceof S ? t[0] : t),
                S.merge(
                    this,
                    S.parseHTML(
                        r[1],
                        t && t.nodeType ? t.ownerDocument || t : C,
                        !0
                    )
                ),
                N.test(r[1]) && S.isPlainObject(t))
            )
                for (var r in t)
                    x(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
            return this;
        }
        return (
            (e = C.getElementById(r[2])) && ((this[0] = e), (this.length = 1)),
            this
        );
    }).prototype = S.fn;
    var q = S(C),
        L = /^(?:parents|prev(?:Until|All))/,
        H = { children: !0, contents: !0, next: !0, prev: !0 };
    function O(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; );
        return e;
    }
    S.fn.extend({
        has: function (e) {
            var t = S(e, this),
                n = t.length;
            return this.filter(function () {
                for (var e = 0; e < n; e++)
                    if (S.contains(this, t[e])) return !0;
            });
        },
        closest: function (e, t) {
            var n,
                r = 0,
                i = this.length,
                o = [],
                s = "string" != typeof e && S(e);
            if (!k.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (
                            n.nodeType < 11 &&
                            (s
                                ? -1 < s.index(n)
                                : 1 === n.nodeType &&
                                  S.find.matchesSelector(n, e))
                        ) {
                            o.push(n);
                            break;
                        }
            return this.pushStack(1 < o.length ? S.uniqueSort(o) : o);
        },
        index: function (e) {
            return e
                ? "string" == typeof e
                    ? i.call(S(e), this[0])
                    : i.call(this, e.jquery ? e[0] : e)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
        },
        add: function (e, t) {
            return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))));
        },
        addBack: function (e) {
            return this.add(
                null == e ? this.prevObject : this.prevObject.filter(e)
            );
        },
    }),
        S.each(
            {
                parent: function (e) {
                    e = e.parentNode;
                    return e && 11 !== e.nodeType ? e : null;
                },
                parents: function (e) {
                    return w(e, "parentNode");
                },
                parentsUntil: function (e, t, n) {
                    return w(e, "parentNode", n);
                },
                next: function (e) {
                    return O(e, "nextSibling");
                },
                prev: function (e) {
                    return O(e, "previousSibling");
                },
                nextAll: function (e) {
                    return w(e, "nextSibling");
                },
                prevAll: function (e) {
                    return w(e, "previousSibling");
                },
                nextUntil: function (e, t, n) {
                    return w(e, "nextSibling", n);
                },
                prevUntil: function (e, t, n) {
                    return w(e, "previousSibling", n);
                },
                siblings: function (e) {
                    return E((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                    return E(e.firstChild);
                },
                contents: function (e) {
                    return null != e.contentDocument && n(e.contentDocument)
                        ? e.contentDocument
                        : (A(e, "template") && (e = e.content || e),
                          S.merge([], e.childNodes));
                },
            },
            function (r, i) {
                S.fn[r] = function (e, t) {
                    var n = S.map(this, i, e);
                    return (
                        (t = "Until" !== r.slice(-5) ? e : t) &&
                            "string" == typeof t &&
                            (n = S.filter(t, n)),
                        1 < this.length &&
                            (H[r] || S.uniqueSort(n), L.test(r) && n.reverse()),
                        this.pushStack(n)
                    );
                };
            }
        );
    var P = /[^\x20\t\r\n\f]+/g;
    function R(e) {
        return e;
    }
    function M(e) {
        throw e;
    }
    function I(e, t, n, r) {
        var i;
        try {
            e && x((i = e.promise))
                ? i.call(e).done(t).fail(n)
                : e && x((i = e.then))
                ? i.call(e, t, n)
                : t.apply(void 0, [e].slice(r));
        } catch (e) {
            n.apply(void 0, [e]);
        }
    }
    (S.Callbacks = function (r) {
        var n;
        r =
            "string" == typeof r
                ? ((n = {}),
                  S.each(r.match(P) || [], function (e, t) {
                      n[t] = !0;
                  }),
                  n)
                : S.extend({}, r);
        function i() {
            for (s = s || r.once, t = o = !0; u.length; l = -1)
                for (e = u.shift(); ++l < a.length; )
                    !1 === a[l].apply(e[0], e[1]) &&
                        r.stopOnFalse &&
                        ((l = a.length), (e = !1));
            r.memory || (e = !1), (o = !1), s && (a = e ? [] : "");
        }
        var o,
            e,
            t,
            s,
            a = [],
            u = [],
            l = -1,
            c = {
                add: function () {
                    return (
                        a &&
                            (e && !o && ((l = a.length - 1), u.push(e)),
                            (function n(e) {
                                S.each(e, function (e, t) {
                                    x(t)
                                        ? (r.unique && c.has(t)) || a.push(t)
                                        : t &&
                                          t.length &&
                                          "string" !== h(t) &&
                                          n(t);
                                });
                            })(arguments),
                            e && !o && i()),
                        this
                    );
                },
                remove: function () {
                    return (
                        S.each(arguments, function (e, t) {
                            for (var n; -1 < (n = S.inArray(t, a, n)); )
                                a.splice(n, 1), n <= l && l--;
                        }),
                        this
                    );
                },
                has: function (e) {
                    return e ? -1 < S.inArray(e, a) : 0 < a.length;
                },
                empty: function () {
                    return (a = a && []), this;
                },
                disable: function () {
                    return (s = u = []), (a = e = ""), this;
                },
                disabled: function () {
                    return !a;
                },
                lock: function () {
                    return (s = u = []), e || o || (a = e = ""), this;
                },
                locked: function () {
                    return !!s;
                },
                fireWith: function (e, t) {
                    return (
                        s ||
                            ((t = [e, (t = t || []).slice ? t.slice() : t]),
                            u.push(t),
                            o || i()),
                        this
                    );
                },
                fire: function () {
                    return c.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!t;
                },
            };
        return c;
    }),
        S.extend({
            Deferred: function (e) {
                var o = [
                        [
                            "notify",
                            "progress",
                            S.Callbacks("memory"),
                            S.Callbacks("memory"),
                            2,
                        ],
                        [
                            "resolve",
                            "done",
                            S.Callbacks("once memory"),
                            S.Callbacks("once memory"),
                            0,
                            "resolved",
                        ],
                        [
                            "reject",
                            "fail",
                            S.Callbacks("once memory"),
                            S.Callbacks("once memory"),
                            1,
                            "rejected",
                        ],
                    ],
                    i = "pending",
                    s = {
                        state: function () {
                            return i;
                        },
                        always: function () {
                            return a.done(arguments).fail(arguments), this;
                        },
                        catch: function (e) {
                            return s.then(null, e);
                        },
                        pipe: function () {
                            var i = arguments;
                            return S.Deferred(function (r) {
                                S.each(o, function (e, t) {
                                    var n = x(i[t[4]]) && i[t[4]];
                                    a[t[1]](function () {
                                        var e = n && n.apply(this, arguments);
                                        e && x(e.promise)
                                            ? e
                                                  .promise()
                                                  .progress(r.notify)
                                                  .done(r.resolve)
                                                  .fail(r.reject)
                                            : r[t[0] + "With"](
                                                  this,
                                                  n ? [e] : arguments
                                              );
                                    });
                                }),
                                    (i = null);
                            }).promise();
                        },
                        then: function (t, n, r) {
                            var u = 0;
                            function l(i, o, s, a) {
                                return function () {
                                    function e() {
                                        var e, t;
                                        if (!(i < u)) {
                                            if (
                                                (e = s.apply(n, r)) ===
                                                o.promise()
                                            )
                                                throw new TypeError(
                                                    "Thenable self-resolution"
                                                );
                                            (t =
                                                e &&
                                                ("object" == typeof e ||
                                                    "function" == typeof e) &&
                                                e.then),
                                                x(t)
                                                    ? a
                                                        ? t.call(
                                                              e,
                                                              l(u, o, R, a),
                                                              l(u, o, M, a)
                                                          )
                                                        : (u++,
                                                          t.call(
                                                              e,
                                                              l(u, o, R, a),
                                                              l(u, o, M, a),
                                                              l(
                                                                  u,
                                                                  o,
                                                                  R,
                                                                  o.notifyWith
                                                              )
                                                          ))
                                                    : (s !== R &&
                                                          ((n = void 0),
                                                          (r = [e])),
                                                      (a || o.resolveWith)(
                                                          n,
                                                          r
                                                      ));
                                        }
                                    }
                                    var n = this,
                                        r = arguments,
                                        t = a
                                            ? e
                                            : function () {
                                                  try {
                                                      e();
                                                  } catch (e) {
                                                      S.Deferred
                                                          .exceptionHook &&
                                                          S.Deferred.exceptionHook(
                                                              e,
                                                              t.stackTrace
                                                          ),
                                                          u <= i + 1 &&
                                                              (s !== M &&
                                                                  ((n = void 0),
                                                                  (r = [e])),
                                                              o.rejectWith(
                                                                  n,
                                                                  r
                                                              ));
                                                  }
                                              };
                                    i
                                        ? t()
                                        : (S.Deferred.getStackHook &&
                                              (t.stackTrace =
                                                  S.Deferred.getStackHook()),
                                          T.setTimeout(t));
                                };
                            }
                            return S.Deferred(function (e) {
                                o[0][3].add(
                                    l(0, e, x(r) ? r : R, e.notifyWith)
                                ),
                                    o[1][3].add(l(0, e, x(t) ? t : R)),
                                    o[2][3].add(l(0, e, x(n) ? n : M));
                            }).promise();
                        },
                        promise: function (e) {
                            return null != e ? S.extend(e, s) : s;
                        },
                    },
                    a = {};
                return (
                    S.each(o, function (e, t) {
                        var n = t[2],
                            r = t[5];
                        (s[t[1]] = n.add),
                            r &&
                                n.add(
                                    function () {
                                        i = r;
                                    },
                                    o[3 - e][2].disable,
                                    o[3 - e][3].disable,
                                    o[0][2].lock,
                                    o[0][3].lock
                                ),
                            n.add(t[3].fire),
                            (a[t[0]] = function () {
                                return (
                                    a[t[0] + "With"](
                                        this === a ? void 0 : this,
                                        arguments
                                    ),
                                    this
                                );
                            }),
                            (a[t[0] + "With"] = n.fireWith);
                    }),
                    s.promise(a),
                    e && e.call(a, a),
                    a
                );
            },
            when: function (e) {
                function t(t) {
                    return function (e) {
                        (i[t] = this),
                            (o[t] =
                                1 < arguments.length ? a.call(arguments) : e),
                            --n || s.resolveWith(i, o);
                    };
                }
                var n = arguments.length,
                    r = n,
                    i = Array(r),
                    o = a.call(arguments),
                    s = S.Deferred();
                if (
                    n <= 1 &&
                    (I(e, s.done(t(r)).resolve, s.reject, !n),
                    "pending" === s.state() || x(o[r] && o[r].then))
                )
                    return s.then();
                for (; r--; ) I(o[r], t(r), s.reject);
                return s.promise();
            },
        });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    (S.Deferred.exceptionHook = function (e, t) {
        T.console &&
            T.console.warn &&
            e &&
            W.test(e.name) &&
            T.console.warn(
                "jQuery.Deferred exception: " + e.message,
                e.stack,
                t
            );
    }),
        (S.readyException = function (e) {
            T.setTimeout(function () {
                throw e;
            });
        });
    var F = S.Deferred();
    function $() {
        C.removeEventListener("DOMContentLoaded", $),
            T.removeEventListener("load", $),
            S.ready();
    }
    (S.fn.ready = function (e) {
        return (
            F.then(e).catch(function (e) {
                S.readyException(e);
            }),
            this
        );
    }),
        S.extend({
            isReady: !1,
            readyWait: 1,
            ready: function (e) {
                (!0 === e ? --S.readyWait : S.isReady) ||
                    ((S.isReady = !0) !== e && 0 < --S.readyWait) ||
                    F.resolveWith(C, [S]);
            },
        }),
        (S.ready.then = F.then),
        "complete" === C.readyState ||
        ("loading" !== C.readyState && !C.documentElement.doScroll)
            ? T.setTimeout(S.ready)
            : (C.addEventListener("DOMContentLoaded", $),
              T.addEventListener("load", $));
    var B = function (e, t, n, r, i, o, s) {
            var a = 0,
                u = e.length,
                l = null == n;
            if ("object" === h(n))
                for (a in ((i = !0), n)) B(e, t, a, n[a], !0, o, s);
            else if (
                void 0 !== r &&
                ((i = !0),
                x(r) || (s = !0),
                (t = l
                    ? s
                        ? (t.call(e, r), null)
                        : ((l = t),
                          function (e, t, n) {
                              return l.call(S(e), n);
                          })
                    : t))
            )
                for (; a < u; a++)
                    t(e[a], n, s ? r : r.call(e[a], a, t(e[a], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o;
        },
        _ = /^-ms-/,
        z = /-([a-z])/g;
    function U(e, t) {
        return t.toUpperCase();
    }
    function X(e) {
        return e.replace(_, "ms-").replace(z, U);
    }
    function V(e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }
    function G() {
        this.expando = S.expando + G.uid++;
    }
    (G.uid = 1),
        (G.prototype = {
            cache: function (e) {
                var t = e[this.expando];
                return (
                    t ||
                        ((t = {}),
                        V(e) &&
                            (e.nodeType
                                ? (e[this.expando] = t)
                                : Object.defineProperty(e, this.expando, {
                                      value: t,
                                      configurable: !0,
                                  }))),
                    t
                );
            },
            set: function (e, t, n) {
                var r,
                    i = this.cache(e);
                if ("string" == typeof t) i[X(t)] = n;
                else for (r in t) i[X(r)] = t[r];
                return i;
            },
            get: function (e, t) {
                return void 0 === t
                    ? this.cache(e)
                    : e[this.expando] && e[this.expando][X(t)];
            },
            access: function (e, t, n) {
                return void 0 === t ||
                    (t && "string" == typeof t && void 0 === n)
                    ? this.get(e, t)
                    : (this.set(e, t, n), void 0 !== n ? n : t);
            },
            remove: function (e, t) {
                var n,
                    r = e[this.expando];
                if (void 0 !== r) {
                    if (void 0 !== t) {
                        n = (t = Array.isArray(t)
                            ? t.map(X)
                            : (t = X(t)) in r
                            ? [t]
                            : t.match(P) || []).length;
                        for (; n--; ) delete r[t[n]];
                    }
                    (void 0 !== t && !S.isEmptyObject(r)) ||
                        (e.nodeType
                            ? (e[this.expando] = void 0)
                            : delete e[this.expando]);
                }
            },
            hasData: function (e) {
                e = e[this.expando];
                return void 0 !== e && !S.isEmptyObject(e);
            },
        });
    var Y = new G(),
        Q = new G(),
        J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        K = /[A-Z]/g;
    function Z(e, t, n) {
        var r, i;
        if (void 0 === n && 1 === e.nodeType)
            if (
                ((r = "data-" + t.replace(K, "-$&").toLowerCase()),
                "string" == typeof (n = e.getAttribute(r)))
            ) {
                try {
                    n =
                        "true" === (i = n) ||
                        ("false" !== i &&
                            ("null" === i
                                ? null
                                : i === +i + ""
                                ? +i
                                : J.test(i)
                                ? JSON.parse(i)
                                : i));
                } catch (e) {}
                Q.set(e, t, n);
            } else n = void 0;
        return n;
    }
    S.extend({
        hasData: function (e) {
            return Q.hasData(e) || Y.hasData(e);
        },
        data: function (e, t, n) {
            return Q.access(e, t, n);
        },
        removeData: function (e, t) {
            Q.remove(e, t);
        },
        _data: function (e, t, n) {
            return Y.access(e, t, n);
        },
        _removeData: function (e, t) {
            Y.remove(e, t);
        },
    }),
        S.fn.extend({
            data: function (n, e) {
                var t,
                    r,
                    i,
                    o = this[0],
                    s = o && o.attributes;
                if (void 0 !== n)
                    return "object" == typeof n
                        ? this.each(function () {
                              Q.set(this, n);
                          })
                        : B(
                              this,
                              function (e) {
                                  var t;
                                  return o && void 0 === e
                                      ? void 0 !== (t = Q.get(o, n)) ||
                                        void 0 !== (t = Z(o, n))
                                          ? t
                                          : void 0
                                      : void this.each(function () {
                                            Q.set(this, n, e);
                                        });
                              },
                              null,
                              e,
                              1 < arguments.length,
                              null,
                              !0
                          );
                if (
                    this.length &&
                    ((i = Q.get(o)),
                    1 === o.nodeType && !Y.get(o, "hasDataAttrs"))
                ) {
                    for (t = s.length; t--; )
                        s[t] &&
                            0 === (r = s[t].name).indexOf("data-") &&
                            ((r = X(r.slice(5))), Z(o, r, i[r]));
                    Y.set(o, "hasDataAttrs", !0);
                }
                return i;
            },
            removeData: function (e) {
                return this.each(function () {
                    Q.remove(this, e);
                });
            },
        }),
        S.extend({
            queue: function (e, t, n) {
                var r;
                if (e)
                    return (
                        (r = Y.get(e, (t = (t || "fx") + "queue"))),
                        n &&
                            (!r || Array.isArray(n)
                                ? (r = Y.access(e, t, S.makeArray(n)))
                                : r.push(n)),
                        r || []
                    );
            },
            dequeue: function (e, t) {
                var n = S.queue(e, (t = t || "fx")),
                    r = n.length,
                    i = n.shift(),
                    o = S._queueHooks(e, t);
                "inprogress" === i && ((i = n.shift()), r--),
                    i &&
                        ("fx" === t && n.unshift("inprogress"),
                        delete o.stop,
                        i.call(
                            e,
                            function () {
                                S.dequeue(e, t);
                            },
                            o
                        )),
                    !r && o && o.empty.fire();
            },
            _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return (
                    Y.get(e, n) ||
                    Y.access(e, n, {
                        empty: S.Callbacks("once memory").add(function () {
                            Y.remove(e, [t + "queue", n]);
                        }),
                    })
                );
            },
        }),
        S.fn.extend({
            queue: function (t, n) {
                var e = 2;
                return (
                    "string" != typeof t && ((n = t), (t = "fx"), e--),
                    arguments.length < e
                        ? S.queue(this[0], t)
                        : void 0 === n
                        ? this
                        : this.each(function () {
                              var e = S.queue(this, t, n);
                              S._queueHooks(this, t),
                                  "fx" === t &&
                                      "inprogress" !== e[0] &&
                                      S.dequeue(this, t);
                          })
                );
            },
            dequeue: function (e) {
                return this.each(function () {
                    S.dequeue(this, e);
                });
            },
            clearQueue: function (e) {
                return this.queue(e || "fx", []);
            },
            promise: function (e, t) {
                function n() {
                    --i || o.resolveWith(s, [s]);
                }
                var r,
                    i = 1,
                    o = S.Deferred(),
                    s = this,
                    a = this.length;
                for (
                    "string" != typeof e && ((t = e), (e = void 0)),
                        e = e || "fx";
                    a--;

                )
                    (r = Y.get(s[a], e + "queueHooks")) &&
                        r.empty &&
                        (i++, r.empty.add(n));
                return n(), o.promise(t);
            },
        });
    var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$", "i"),
        ne = ["Top", "Right", "Bottom", "Left"],
        re = C.documentElement,
        ie = function (e) {
            return S.contains(e.ownerDocument, e);
        },
        oe = { composed: !0 };
    re.getRootNode &&
        (ie = function (e) {
            return (
                S.contains(e.ownerDocument, e) ||
                e.getRootNode(oe) === e.ownerDocument
            );
        });
    function se(e, t) {
        return (
            "none" === (e = t || e).style.display ||
            ("" === e.style.display && ie(e) && "none" === S.css(e, "display"))
        );
    }
    function ae(e, t, n, r) {
        var i,
            o,
            s = 20,
            a = r
                ? function () {
                      return r.cur();
                  }
                : function () {
                      return S.css(e, t, "");
                  },
            u = a(),
            l = (n && n[3]) || (S.cssNumber[t] ? "" : "px"),
            c =
                e.nodeType &&
                (S.cssNumber[t] || ("px" !== l && +u)) &&
                te.exec(S.css(e, t));
        if (c && c[3] !== l) {
            for (l = l || c[3], c = +(u /= 2) || 1; s--; )
                S.style(e, t, c + l),
                    (1 - o) * (1 - (o = a() / u || 0.5)) <= 0 && (s = 0),
                    (c /= o);
            S.style(e, t, (c *= 2) + l), (n = n || []);
        }
        return (
            n &&
                ((c = +c || +u || 0),
                (i = n[1] ? c + (n[1] + 1) * n[2] : +n[2]),
                r && ((r.unit = l), (r.start = c), (r.end = i))),
            i
        );
    }
    var ue = {};
    function le(e, t) {
        for (var n, r, i, o, s, a, u = [], l = 0, c = e.length; l < c; l++)
            (r = e[l]).style &&
                ((n = r.style.display),
                t
                    ? ("none" === n &&
                          ((u[l] = Y.get(r, "display") || null),
                          u[l] || (r.style.display = "")),
                      "" === r.style.display &&
                          se(r) &&
                          (u[l] =
                              ((a = o = i = void 0),
                              (o = r.ownerDocument),
                              (s = r.nodeName),
                              (a = ue[s]) ||
                                  ((i = o.body.appendChild(o.createElement(s))),
                                  (a = S.css(i, "display")),
                                  i.parentNode.removeChild(i),
                                  (ue[s] = a = "none" === a ? "block" : a)))))
                    : "none" !== n &&
                      ((u[l] = "none"), Y.set(r, "display", n)));
        for (l = 0; l < c; l++) null != u[l] && (e[l].style.display = u[l]);
        return e;
    }
    S.fn.extend({
        show: function () {
            return le(this, !0);
        },
        hide: function () {
            return le(this);
        },
        toggle: function (e) {
            return "boolean" == typeof e
                ? e
                    ? this.show()
                    : this.hide()
                : this.each(function () {
                      se(this) ? S(this).show() : S(this).hide();
                  });
        },
    });
    var ce = /^(?:checkbox|radio)$/i,
        fe = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i,
        pe = /^$|^module$|\/(?:java|ecma)script/i,
        f = C.createDocumentFragment().appendChild(C.createElement("div"));
    (d = C.createElement("input")).setAttribute("type", "radio"),
        d.setAttribute("checked", "checked"),
        d.setAttribute("name", "t"),
        f.appendChild(d),
        (v.checkClone = f.cloneNode(!0).cloneNode(!0).lastChild.checked),
        (f.innerHTML = "<textarea>x</textarea>"),
        (v.noCloneChecked = !!f.cloneNode(!0).lastChild.defaultValue),
        (f.innerHTML = "<option></option>"),
        (v.option = !!f.lastChild);
    var de = {
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""],
    };
    function he(e, t) {
        var n =
            void 0 !== e.getElementsByTagName
                ? e.getElementsByTagName(t || "*")
                : void 0 !== e.querySelectorAll
                ? e.querySelectorAll(t || "*")
                : [];
        return void 0 === t || (t && A(e, t)) ? S.merge([e], n) : n;
    }
    function ge(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"));
    }
    (de.tbody = de.tfoot = de.colgroup = de.caption = de.thead),
        (de.th = de.td),
        v.option ||
            (de.optgroup = de.option =
                [1, "<select multiple='multiple'>", "</select>"]);
    var ye = /<|&#?\w+;/;
    function me(e, t, n, r, i) {
        for (
            var o,
                s,
                a,
                u,
                l,
                c = t.createDocumentFragment(),
                f = [],
                p = 0,
                d = e.length;
            p < d;
            p++
        )
            if ((o = e[p]) || 0 === o)
                if ("object" === h(o)) S.merge(f, o.nodeType ? [o] : o);
                else if (ye.test(o)) {
                    for (
                        s = s || c.appendChild(t.createElement("div")),
                            a = (fe.exec(o) || ["", ""])[1].toLowerCase(),
                            a = de[a] || de._default,
                            s.innerHTML = a[1] + S.htmlPrefilter(o) + a[2],
                            l = a[0];
                        l--;

                    )
                        s = s.lastChild;
                    S.merge(f, s.childNodes),
                        ((s = c.firstChild).textContent = "");
                } else f.push(t.createTextNode(o));
        for (c.textContent = "", p = 0; (o = f[p++]); )
            if (r && -1 < S.inArray(o, r)) i && i.push(o);
            else if (
                ((u = ie(o)),
                (s = he(c.appendChild(o), "script")),
                u && ge(s),
                n)
            )
                for (l = 0; (o = s[l++]); ) pe.test(o.type || "") && n.push(o);
        return c;
    }
    var ve = /^([^.]*)(?:\.(.+)|)/;
    function xe() {
        return !0;
    }
    function be() {
        return !1;
    }
    function we(e, t) {
        return (
            (e ===
                (function () {
                    try {
                        return C.activeElement;
                    } catch (e) {}
                })()) ==
            ("focus" === t)
        );
    }
    function Te(e, t, n, r, i, o) {
        var s, a;
        if ("object" == typeof t) {
            for (a in ("string" != typeof n && ((r = r || n), (n = void 0)), t))
                Te(e, a, n, r, t[a], o);
            return e;
        }
        if (
            (null == r && null == i
                ? ((i = n), (r = n = void 0))
                : null == i &&
                  ("string" == typeof n
                      ? ((i = r), (r = void 0))
                      : ((i = r), (r = n), (n = void 0))),
            !1 === i)
        )
            i = be;
        else if (!i) return e;
        return (
            1 === o &&
                ((s = i),
                ((i = function (e) {
                    return S().off(e), s.apply(this, arguments);
                }).guid = s.guid || (s.guid = S.guid++))),
            e.each(function () {
                S.event.add(this, t, i, r, n);
            })
        );
    }
    function Ce(e, i, o) {
        o
            ? (Y.set(e, i, !1),
              S.event.add(e, i, {
                  namespace: !1,
                  handler: function (e) {
                      var t,
                          n,
                          r = Y.get(this, i);
                      if (1 & e.isTrigger && this[i]) {
                          if (r.length)
                              (S.event.special[i] || {}).delegateType &&
                                  e.stopPropagation();
                          else if (
                              ((r = a.call(arguments)),
                              Y.set(this, i, r),
                              (t = o(this, i)),
                              this[i](),
                              r !== (n = Y.get(this, i)) || t
                                  ? Y.set(this, i, !1)
                                  : (n = {}),
                              r !== n)
                          )
                              return (
                                  e.stopImmediatePropagation(),
                                  e.preventDefault(),
                                  n && n.value
                              );
                      } else
                          r.length &&
                              (Y.set(this, i, {
                                  value: S.event.trigger(
                                      S.extend(r[0], S.Event.prototype),
                                      r.slice(1),
                                      this
                                  ),
                              }),
                              e.stopImmediatePropagation());
                  },
              }))
            : void 0 === Y.get(e, i) && S.event.add(e, i, xe);
    }
    (S.event = {
        global: {},
        add: function (t, e, n, r, i) {
            var o,
                s,
                a,
                u,
                l,
                c,
                f,
                p,
                d,
                h = Y.get(t);
            if (V(t))
                for (
                    n.handler && ((n = (o = n).handler), (i = o.selector)),
                        i && S.find.matchesSelector(re, i),
                        n.guid || (n.guid = S.guid++),
                        (a = h.events) || (a = h.events = Object.create(null)),
                        (s = h.handle) ||
                            (s = h.handle =
                                function (e) {
                                    return void 0 !== S &&
                                        S.event.triggered !== e.type
                                        ? S.event.dispatch.apply(t, arguments)
                                        : void 0;
                                }),
                        u = (e = (e || "").match(P) || [""]).length;
                    u--;

                )
                    (f = d = (l = ve.exec(e[u]) || [])[1]),
                        (p = (l[2] || "").split(".").sort()),
                        f &&
                            ((c = S.event.special[f] || {}),
                            (f = (i ? c.delegateType : c.bindType) || f),
                            (c = S.event.special[f] || {}),
                            (l = S.extend(
                                {
                                    type: f,
                                    origType: d,
                                    data: r,
                                    handler: n,
                                    guid: n.guid,
                                    selector: i,
                                    needsContext:
                                        i && S.expr.match.needsContext.test(i),
                                    namespace: p.join("."),
                                },
                                o
                            )),
                            (d = a[f]) ||
                                (((d = a[f] = []).delegateCount = 0),
                                (c.setup && !1 !== c.setup.call(t, r, p, s)) ||
                                    (t.addEventListener &&
                                        t.addEventListener(f, s))),
                            c.add &&
                                (c.add.call(t, l),
                                l.handler.guid || (l.handler.guid = n.guid)),
                            i ? d.splice(d.delegateCount++, 0, l) : d.push(l),
                            (S.event.global[f] = !0));
        },
        remove: function (e, t, n, r, i) {
            var o,
                s,
                a,
                u,
                l,
                c,
                f,
                p,
                d,
                h,
                g,
                y = Y.hasData(e) && Y.get(e);
            if (y && (u = y.events)) {
                for (l = (t = (t || "").match(P) || [""]).length; l--; )
                    if (
                        ((d = g = (a = ve.exec(t[l]) || [])[1]),
                        (h = (a[2] || "").split(".").sort()),
                        d)
                    ) {
                        for (
                            f = S.event.special[d] || {},
                                p =
                                    u[
                                        (d =
                                            (r ? f.delegateType : f.bindType) ||
                                            d)
                                    ] || [],
                                a =
                                    a[2] &&
                                    new RegExp(
                                        "(^|\\.)" +
                                            h.join("\\.(?:.*\\.|)") +
                                            "(\\.|$)"
                                    ),
                                s = o = p.length;
                            o--;

                        )
                            (c = p[o]),
                                (!i && g !== c.origType) ||
                                    (n && n.guid !== c.guid) ||
                                    (a && !a.test(c.namespace)) ||
                                    (r &&
                                        r !== c.selector &&
                                        ("**" !== r || !c.selector)) ||
                                    (p.splice(o, 1),
                                    c.selector && p.delegateCount--,
                                    f.remove && f.remove.call(e, c));
                        s &&
                            !p.length &&
                            ((f.teardown &&
                                !1 !== f.teardown.call(e, h, y.handle)) ||
                                S.removeEvent(e, d, y.handle),
                            delete u[d]);
                    } else for (d in u) S.event.remove(e, d + t[l], n, r, !0);
                S.isEmptyObject(u) && Y.remove(e, "handle events");
            }
        },
        dispatch: function (e) {
            var t,
                n,
                r,
                i,
                o,
                s = new Array(arguments.length),
                a = S.event.fix(e),
                u =
                    (Y.get(this, "events") || Object.create(null))[a.type] ||
                    [],
                e = S.event.special[a.type] || {};
            for (s[0] = a, t = 1; t < arguments.length; t++)
                s[t] = arguments[t];
            if (
                ((a.delegateTarget = this),
                !e.preDispatch || !1 !== e.preDispatch.call(this, a))
            ) {
                for (
                    o = S.event.handlers.call(this, a, u), t = 0;
                    (r = o[t++]) && !a.isPropagationStopped();

                )
                    for (
                        a.currentTarget = r.elem, n = 0;
                        (i = r.handlers[n++]) &&
                        !a.isImmediatePropagationStopped();

                    )
                        (a.rnamespace &&
                            !1 !== i.namespace &&
                            !a.rnamespace.test(i.namespace)) ||
                            ((a.handleObj = i),
                            (a.data = i.data),
                            void 0 !==
                                (i = (
                                    (S.event.special[i.origType] || {})
                                        .handle || i.handler
                                ).apply(r.elem, s)) &&
                                !1 === (a.result = i) &&
                                (a.preventDefault(), a.stopPropagation()));
                return e.postDispatch && e.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function (e, t) {
            var n,
                r,
                i,
                o,
                s,
                a = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (
                        1 === l.nodeType &&
                        ("click" !== e.type || !0 !== l.disabled)
                    ) {
                        for (o = [], s = {}, n = 0; n < u; n++)
                            void 0 === s[(i = (r = t[n]).selector + " ")] &&
                                (s[i] = r.needsContext
                                    ? -1 < S(i, this).index(l)
                                    : S.find(i, this, null, [l]).length),
                                s[i] && o.push(r);
                        o.length && a.push({ elem: l, handlers: o });
                    }
            return (
                (l = this),
                u < t.length && a.push({ elem: l, handlers: t.slice(u) }),
                a
            );
        },
        addProp: function (t, e) {
            Object.defineProperty(S.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: x(e)
                    ? function () {
                          if (this.originalEvent) return e(this.originalEvent);
                      }
                    : function () {
                          if (this.originalEvent) return this.originalEvent[t];
                      },
                set: function (e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e,
                    });
                },
            });
        },
        fix: function (e) {
            return e[S.expando] ? e : new S.Event(e);
        },
        special: {
            load: { noBubble: !0 },
            click: {
                setup: function (e) {
                    e = this || e;
                    return (
                        ce.test(e.type) &&
                            e.click &&
                            A(e, "input") &&
                            Ce(e, "click", xe),
                        !1
                    );
                },
                trigger: function (e) {
                    e = this || e;
                    return (
                        ce.test(e.type) &&
                            e.click &&
                            A(e, "input") &&
                            Ce(e, "click"),
                        !0
                    );
                },
                _default: function (e) {
                    e = e.target;
                    return (
                        (ce.test(e.type) &&
                            e.click &&
                            A(e, "input") &&
                            Y.get(e, "click")) ||
                        A(e, "a")
                    );
                },
            },
            beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result &&
                        e.originalEvent &&
                        (e.originalEvent.returnValue = e.result);
                },
            },
        },
    }),
        (S.removeEvent = function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n);
        }),
        (S.Event = function (e, t) {
            if (!(this instanceof S.Event)) return new S.Event(e, t);
            e && e.type
                ? ((this.originalEvent = e),
                  (this.type = e.type),
                  (this.isDefaultPrevented =
                      e.defaultPrevented ||
                      (void 0 === e.defaultPrevented && !1 === e.returnValue)
                          ? xe
                          : be),
                  (this.target =
                      e.target && 3 === e.target.nodeType
                          ? e.target.parentNode
                          : e.target),
                  (this.currentTarget = e.currentTarget),
                  (this.relatedTarget = e.relatedTarget))
                : (this.type = e),
                t && S.extend(this, t),
                (this.timeStamp = (e && e.timeStamp) || Date.now()),
                (this[S.expando] = !0);
        }),
        (S.Event.prototype = {
            constructor: S.Event,
            isDefaultPrevented: be,
            isPropagationStopped: be,
            isImmediatePropagationStopped: be,
            isSimulated: !1,
            preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = xe),
                    e && !this.isSimulated && e.preventDefault();
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = xe),
                    e && !this.isSimulated && e.stopPropagation();
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = xe),
                    e && !this.isSimulated && e.stopImmediatePropagation(),
                    this.stopPropagation();
            },
        }),
        S.each(
            {
                altKey: !0,
                bubbles: !0,
                cancelable: !0,
                changedTouches: !0,
                ctrlKey: !0,
                detail: !0,
                eventPhase: !0,
                metaKey: !0,
                pageX: !0,
                pageY: !0,
                shiftKey: !0,
                view: !0,
                char: !0,
                code: !0,
                charCode: !0,
                key: !0,
                keyCode: !0,
                button: !0,
                buttons: !0,
                clientX: !0,
                clientY: !0,
                offsetX: !0,
                offsetY: !0,
                pointerId: !0,
                pointerType: !0,
                screenX: !0,
                screenY: !0,
                targetTouches: !0,
                toElement: !0,
                touches: !0,
                which: !0,
            },
            S.event.addProp
        ),
        S.each({ focus: "focusin", blur: "focusout" }, function (t, e) {
            S.event.special[t] = {
                setup: function () {
                    return Ce(this, t, we), !1;
                },
                trigger: function () {
                    return Ce(this, t), !0;
                },
                _default: function (e) {
                    return Y.get(e.target, t);
                },
                delegateType: e,
            };
        }),
        S.each(
            {
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout",
            },
            function (e, i) {
                S.event.special[e] = {
                    delegateType: i,
                    bindType: i,
                    handle: function (e) {
                        var t,
                            n = e.relatedTarget,
                            r = e.handleObj;
                        return (
                            (n && (n === this || S.contains(this, n))) ||
                                ((e.type = r.origType),
                                (t = r.handler.apply(this, arguments)),
                                (e.type = i)),
                            t
                        );
                    },
                };
            }
        ),
        S.fn.extend({
            on: function (e, t, n, r) {
                return Te(this, e, t, n, r);
            },
            one: function (e, t, n, r) {
                return Te(this, e, t, n, r, 1);
            },
            off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj)
                    return (
                        (r = e.handleObj),
                        S(e.delegateTarget).off(
                            r.namespace
                                ? r.origType + "." + r.namespace
                                : r.origType,
                            r.selector,
                            r.handler
                        ),
                        this
                    );
                if ("object" != typeof e)
                    return (
                        (!1 !== t && "function" != typeof t) ||
                            ((n = t), (t = void 0)),
                        !1 === n && (n = be),
                        this.each(function () {
                            S.event.remove(this, e, n, t);
                        })
                    );
                for (i in e) this.off(i, t, e[i]);
                return this;
            },
        });
    var Se = /<script|<style|<link/i,
        Ee = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ke = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
    function Ae(e, t) {
        return (
            (A(e, "table") &&
                A(11 !== t.nodeType ? t : t.firstChild, "tr") &&
                S(e).children("tbody")[0]) ||
            e
        );
    }
    function Ne(e) {
        return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function je(e) {
        return (
            "true/" === (e.type || "").slice(0, 5)
                ? (e.type = e.type.slice(5))
                : e.removeAttribute("type"),
            e
        );
    }
    function De(e, t) {
        var n, r, i, o;
        if (1 === t.nodeType) {
            if (Y.hasData(e) && (o = Y.get(e).events))
                for (i in (Y.remove(t, "handle events"), o))
                    for (n = 0, r = o[i].length; n < r; n++)
                        S.event.add(t, i, o[i][n]);
            Q.hasData(e) &&
                ((e = Q.access(e)), (e = S.extend({}, e)), Q.set(t, e));
        }
    }
    function qe(n, r, i, o) {
        r = y(r);
        var e,
            t,
            s,
            a,
            u,
            l,
            c = 0,
            f = n.length,
            p = f - 1,
            d = r[0],
            h = x(d);
        if (h || (1 < f && "string" == typeof d && !v.checkClone && Ee.test(d)))
            return n.each(function (e) {
                var t = n.eq(e);
                h && (r[0] = d.call(this, e, t.html())), qe(t, r, i, o);
            });
        if (
            f &&
            ((t = (e = me(r, n[0].ownerDocument, !1, n, o)).firstChild),
            1 === e.childNodes.length && (e = t),
            t || o)
        ) {
            for (a = (s = S.map(he(e, "script"), Ne)).length; c < f; c++)
                (u = e),
                    c !== p &&
                        ((u = S.clone(u, !0, !0)),
                        a && S.merge(s, he(u, "script"))),
                    i.call(n[c], u, c);
            if (a)
                for (
                    l = s[s.length - 1].ownerDocument, S.map(s, je), c = 0;
                    c < a;
                    c++
                )
                    (u = s[c]),
                        pe.test(u.type || "") &&
                            !Y.access(u, "globalEval") &&
                            S.contains(l, u) &&
                            (u.src && "module" !== (u.type || "").toLowerCase()
                                ? S._evalUrl &&
                                  !u.noModule &&
                                  S._evalUrl(
                                      u.src,
                                      {
                                          nonce:
                                              u.nonce ||
                                              u.getAttribute("nonce"),
                                      },
                                      l
                                  )
                                : b(u.textContent.replace(ke, ""), u, l));
        }
        return n;
    }
    function Le(e, t, n) {
        for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || S.cleanData(he(r)),
                r.parentNode &&
                    (n && ie(r) && ge(he(r, "script")),
                    r.parentNode.removeChild(r));
        return e;
    }
    S.extend({
        htmlPrefilter: function (e) {
            return e;
        },
        clone: function (e, t, n) {
            var r,
                i,
                o,
                s,
                a,
                u,
                l,
                c = e.cloneNode(!0),
                f = ie(e);
            if (
                !(
                    v.noCloneChecked ||
                    (1 !== e.nodeType && 11 !== e.nodeType) ||
                    S.isXMLDoc(e)
                )
            )
                for (s = he(c), r = 0, i = (o = he(e)).length; r < i; r++)
                    (a = o[r]),
                        "input" === (l = (u = s[r]).nodeName.toLowerCase()) &&
                        ce.test(a.type)
                            ? (u.checked = a.checked)
                            : ("input" !== l && "textarea" !== l) ||
                              (u.defaultValue = a.defaultValue);
            if (t)
                if (n)
                    for (
                        o = o || he(e), s = s || he(c), r = 0, i = o.length;
                        r < i;
                        r++
                    )
                        De(o[r], s[r]);
                else De(e, c);
            return (
                0 < (s = he(c, "script")).length &&
                    ge(s, !f && he(e, "script")),
                c
            );
        },
        cleanData: function (e) {
            for (
                var t, n, r, i = S.event.special, o = 0;
                void 0 !== (n = e[o]);
                o++
            )
                if (V(n)) {
                    if ((t = n[Y.expando])) {
                        if (t.events)
                            for (r in t.events)
                                i[r]
                                    ? S.event.remove(n, r)
                                    : S.removeEvent(n, r, t.handle);
                        n[Y.expando] = void 0;
                    }
                    n[Q.expando] && (n[Q.expando] = void 0);
                }
        },
    }),
        S.fn.extend({
            detach: function (e) {
                return Le(this, e, !0);
            },
            remove: function (e) {
                return Le(this, e);
            },
            text: function (e) {
                return B(
                    this,
                    function (e) {
                        return void 0 === e
                            ? S.text(this)
                            : this.empty().each(function () {
                                  (1 !== this.nodeType &&
                                      11 !== this.nodeType &&
                                      9 !== this.nodeType) ||
                                      (this.textContent = e);
                              });
                    },
                    null,
                    e,
                    arguments.length
                );
            },
            append: function () {
                return qe(this, arguments, function (e) {
                    (1 !== this.nodeType &&
                        11 !== this.nodeType &&
                        9 !== this.nodeType) ||
                        Ae(this, e).appendChild(e);
                });
            },
            prepend: function () {
                return qe(this, arguments, function (e) {
                    var t;
                    (1 !== this.nodeType &&
                        11 !== this.nodeType &&
                        9 !== this.nodeType) ||
                        (t = Ae(this, e)).insertBefore(e, t.firstChild);
                });
            },
            before: function () {
                return qe(this, arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this);
                });
            },
            after: function () {
                return qe(this, arguments, function (e) {
                    this.parentNode &&
                        this.parentNode.insertBefore(e, this.nextSibling);
                });
            },
            empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++)
                    1 === e.nodeType &&
                        (S.cleanData(he(e, !1)), (e.textContent = ""));
                return this;
            },
            clone: function (e, t) {
                return (
                    (e = null != e && e),
                    (t = null == t ? e : t),
                    this.map(function () {
                        return S.clone(this, e, t);
                    })
                );
            },
            html: function (e) {
                return B(
                    this,
                    function (e) {
                        var t = this[0] || {},
                            n = 0,
                            r = this.length;
                        if (void 0 === e && 1 === t.nodeType)
                            return t.innerHTML;
                        if (
                            "string" == typeof e &&
                            !Se.test(e) &&
                            !de[(fe.exec(e) || ["", ""])[1].toLowerCase()]
                        ) {
                            e = S.htmlPrefilter(e);
                            try {
                                for (; n < r; n++)
                                    1 === (t = this[n] || {}).nodeType &&
                                        (S.cleanData(he(t, !1)),
                                        (t.innerHTML = e));
                                t = 0;
                            } catch (e) {}
                        }
                        t && this.empty().append(e);
                    },
                    null,
                    e,
                    arguments.length
                );
            },
            replaceWith: function () {
                var n = [];
                return qe(
                    this,
                    arguments,
                    function (e) {
                        var t = this.parentNode;
                        S.inArray(this, n) < 0 &&
                            (S.cleanData(he(this)),
                            t && t.replaceChild(e, this));
                    },
                    n
                );
            },
        }),
        S.each(
            {
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith",
            },
            function (e, s) {
                S.fn[e] = function (e) {
                    for (
                        var t, n = [], r = S(e), i = r.length - 1, o = 0;
                        o <= i;
                        o++
                    )
                        (t = o === i ? this : this.clone(!0)),
                            S(r[o])[s](t),
                            u.apply(n, t.get());
                    return this.pushStack(n);
                };
            }
        );
    function He(e, t, n) {
        var r,
            i = {};
        for (r in t) (i[r] = e.style[r]), (e.style[r] = t[r]);
        for (r in ((n = n.call(e)), t)) e.style[r] = i[r];
        return n;
    }
    var Oe,
        Pe,
        Re,
        Me,
        Ie,
        We,
        Fe,
        $e,
        Be = new RegExp("^(" + ee + ")(?!px)[a-z%]+$", "i"),
        _e = /^--/,
        ze = function (e) {
            var t = e.ownerDocument.defaultView;
            return (t = !t || !t.opener ? T : t).getComputedStyle(e);
        },
        Ue = new RegExp(ne.join("|"), "i"),
        f = "[\\x20\\t\\r\\n\\f]",
        Xe = new RegExp(
            "^" + f + "+|((?:^|[^\\\\])(?:\\\\.)*)" + f + "+$",
            "g"
        );
    function Ve(e, t, n) {
        var r,
            i = _e.test(t),
            o = e.style;
        return (
            (n = n || ze(e)) &&
                ((r = n.getPropertyValue(t) || n[t]),
                "" !== (r = i && r ? r.replace(Xe, "$1") || void 0 : r) ||
                    ie(e) ||
                    (r = S.style(e, t)),
                !v.pixelBoxStyles() &&
                    Be.test(r) &&
                    Ue.test(t) &&
                    ((i = o.width),
                    (e = o.minWidth),
                    (t = o.maxWidth),
                    (o.minWidth = o.maxWidth = o.width = r),
                    (r = n.width),
                    (o.width = i),
                    (o.minWidth = e),
                    (o.maxWidth = t))),
            void 0 !== r ? r + "" : r
        );
    }
    function Ge(e, t) {
        return {
            get: function () {
                if (!e()) return (this.get = t).apply(this, arguments);
                delete this.get;
            },
        };
    }
    function Ye() {
        var e;
        $e &&
            ((Fe.style.cssText =
                "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0"),
            ($e.style.cssText =
                "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%"),
            re.appendChild(Fe).appendChild($e),
            (e = T.getComputedStyle($e)),
            (Oe = "1%" !== e.top),
            (We = 12 === Qe(e.marginLeft)),
            ($e.style.right = "60%"),
            (Me = 36 === Qe(e.right)),
            (Pe = 36 === Qe(e.width)),
            ($e.style.position = "absolute"),
            (Re = 12 === Qe($e.offsetWidth / 3)),
            re.removeChild(Fe),
            ($e = null));
    }
    function Qe(e) {
        return Math.round(parseFloat(e));
    }
    (Fe = C.createElement("div")),
        ($e = C.createElement("div")).style &&
            (($e.style.backgroundClip = "content-box"),
            ($e.cloneNode(!0).style.backgroundClip = ""),
            (v.clearCloneStyle = "content-box" === $e.style.backgroundClip),
            S.extend(v, {
                boxSizingReliable: function () {
                    return Ye(), Pe;
                },
                pixelBoxStyles: function () {
                    return Ye(), Me;
                },
                pixelPosition: function () {
                    return Ye(), Oe;
                },
                reliableMarginLeft: function () {
                    return Ye(), We;
                },
                scrollboxSize: function () {
                    return Ye(), Re;
                },
                reliableTrDimensions: function () {
                    var e, t, n;
                    return (
                        null == Ie &&
                            ((e = C.createElement("table")),
                            (t = C.createElement("tr")),
                            (n = C.createElement("div")),
                            (e.style.cssText =
                                "position:absolute;left:-11111px;border-collapse:separate"),
                            (t.style.cssText = "border:1px solid"),
                            (t.style.height = "1px"),
                            (n.style.height = "9px"),
                            (n.style.display = "block"),
                            re.appendChild(e).appendChild(t).appendChild(n),
                            (n = T.getComputedStyle(t)),
                            (Ie =
                                parseInt(n.height, 10) +
                                    parseInt(n.borderTopWidth, 10) +
                                    parseInt(n.borderBottomWidth, 10) ===
                                t.offsetHeight),
                            re.removeChild(e)),
                        Ie
                    );
                },
            }));
    var Je = ["Webkit", "Moz", "ms"],
        Ke = C.createElement("div").style,
        Ze = {};
    function et(e) {
        return (
            S.cssProps[e] ||
            Ze[e] ||
            (e in Ke
                ? e
                : (Ze[e] =
                      (function (e) {
                          for (
                              var t = e[0].toUpperCase() + e.slice(1),
                                  n = Je.length;
                              n--;

                          )
                              if ((e = Je[n] + t) in Ke) return e;
                      })(e) || e))
        );
    }
    var tt = /^(none|table(?!-c[ea]).+)/,
        nt = { position: "absolute", visibility: "hidden", display: "block" },
        rt = { letterSpacing: "0", fontWeight: "400" };
    function it(e, t, n) {
        var r = te.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t;
    }
    function ot(e, t, n, r, i, o) {
        var s = "width" === t ? 1 : 0,
            a = 0,
            u = 0;
        if (n === (r ? "border" : "content")) return 0;
        for (; s < 4; s += 2)
            "margin" === n && (u += S.css(e, n + ne[s], !0, i)),
                r
                    ? ("content" === n &&
                          (u -= S.css(e, "padding" + ne[s], !0, i)),
                      "margin" !== n &&
                          (u -= S.css(e, "border" + ne[s] + "Width", !0, i)))
                    : ((u += S.css(e, "padding" + ne[s], !0, i)),
                      "padding" !== n
                          ? (u += S.css(e, "border" + ne[s] + "Width", !0, i))
                          : (a += S.css(e, "border" + ne[s] + "Width", !0, i)));
        return (
            !r &&
                0 <= o &&
                (u +=
                    Math.max(
                        0,
                        Math.ceil(
                            e["offset" + t[0].toUpperCase() + t.slice(1)] -
                                o -
                                u -
                                a -
                                0.5
                        )
                    ) || 0),
            u
        );
    }
    function st(e, t, n) {
        var r = ze(e),
            i =
                (!v.boxSizingReliable() || n) &&
                "border-box" === S.css(e, "boxSizing", !1, r),
            o = i,
            s = Ve(e, t, r),
            a = "offset" + t[0].toUpperCase() + t.slice(1);
        if (Be.test(s)) {
            if (!n) return s;
            s = "auto";
        }
        return (
            ((!v.boxSizingReliable() && i) ||
                (!v.reliableTrDimensions() && A(e, "tr")) ||
                "auto" === s ||
                (!parseFloat(s) && "inline" === S.css(e, "display", !1, r))) &&
                e.getClientRects().length &&
                ((i = "border-box" === S.css(e, "boxSizing", !1, r)),
                (o = a in e) && (s = e[a])),
            (s = parseFloat(s) || 0) +
                ot(e, t, n || (i ? "border" : "content"), o, r, s) +
                "px"
        );
    }
    function at(e, t, n, r, i) {
        return new at.prototype.init(e, t, n, r, i);
    }
    S.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        e = Ve(e, "opacity");
                        return "" === e ? "1" : e;
                    }
                },
            },
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            gridArea: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnStart: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowStart: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
        },
        cssProps: {},
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i,
                    o,
                    s,
                    a = X(t),
                    u = _e.test(t),
                    l = e.style;
                if (
                    (u || (t = et(a)),
                    (s = S.cssHooks[t] || S.cssHooks[a]),
                    void 0 === n)
                )
                    return s && "get" in s && void 0 !== (i = s.get(e, !1, r))
                        ? i
                        : l[t];
                "string" == (o = typeof n) &&
                    (i = te.exec(n)) &&
                    i[1] &&
                    ((n = ae(e, t, i)), (o = "number")),
                    null != n &&
                        n == n &&
                        ("number" !== o ||
                            u ||
                            (n += (i && i[3]) || (S.cssNumber[a] ? "" : "px")),
                        v.clearCloneStyle ||
                            "" !== n ||
                            0 !== t.indexOf("background") ||
                            (l[t] = "inherit"),
                        (s && "set" in s && void 0 === (n = s.set(e, n, r))) ||
                            (u ? l.setProperty(t, n) : (l[t] = n)));
            }
        },
        css: function (e, t, n, r) {
            var i,
                o = X(t);
            return (
                _e.test(t) || (t = et(o)),
                "normal" ===
                    (i =
                        void 0 ===
                        (i =
                            (o = S.cssHooks[t] || S.cssHooks[o]) && "get" in o
                                ? o.get(e, !0, n)
                                : i)
                            ? Ve(e, t, r)
                            : i) &&
                    t in rt &&
                    (i = rt[t]),
                "" === n || n
                    ? ((t = parseFloat(i)),
                      !0 === n || isFinite(t) ? t || 0 : i)
                    : i
            );
        },
    }),
        S.each(["height", "width"], function (e, a) {
            S.cssHooks[a] = {
                get: function (e, t, n) {
                    if (t)
                        return !tt.test(S.css(e, "display")) ||
                            (e.getClientRects().length &&
                                e.getBoundingClientRect().width)
                            ? st(e, a, n)
                            : He(e, nt, function () {
                                  return st(e, a, n);
                              });
                },
                set: function (e, t, n) {
                    var r,
                        i = ze(e),
                        o = !v.scrollboxSize() && "absolute" === i.position,
                        s =
                            (o || n) &&
                            "border-box" === S.css(e, "boxSizing", !1, i),
                        n = n ? ot(e, a, n, s, i) : 0;
                    return (
                        s &&
                            o &&
                            (n -= Math.ceil(
                                e["offset" + a[0].toUpperCase() + a.slice(1)] -
                                    parseFloat(i[a]) -
                                    ot(e, a, "border", !1, i) -
                                    0.5
                            )),
                        n &&
                            (r = te.exec(t)) &&
                            "px" !== (r[3] || "px") &&
                            ((e.style[a] = t), (t = S.css(e, a))),
                        it(0, t, n)
                    );
                },
            };
        }),
        (S.cssHooks.marginLeft = Ge(v.reliableMarginLeft, function (e, t) {
            if (t)
                return (
                    (parseFloat(Ve(e, "marginLeft")) ||
                        e.getBoundingClientRect().left -
                            He(e, { marginLeft: 0 }, function () {
                                return e.getBoundingClientRect().left;
                            })) + "px"
                );
        })),
        S.each({ margin: "", padding: "", border: "Width" }, function (i, o) {
            (S.cssHooks[i + o] = {
                expand: function (e) {
                    for (
                        var t = 0,
                            n = {},
                            r = "string" == typeof e ? e.split(" ") : [e];
                        t < 4;
                        t++
                    )
                        n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
                    return n;
                },
            }),
                "margin" !== i && (S.cssHooks[i + o].set = it);
        }),
        S.fn.extend({
            css: function (e, t) {
                return B(
                    this,
                    function (e, t, n) {
                        var r,
                            i,
                            o = {},
                            s = 0;
                        if (Array.isArray(t)) {
                            for (r = ze(e), i = t.length; s < i; s++)
                                o[t[s]] = S.css(e, t[s], !1, r);
                            return o;
                        }
                        return void 0 !== n ? S.style(e, t, n) : S.css(e, t);
                    },
                    e,
                    t,
                    1 < arguments.length
                );
            },
        }),
        (((S.Tween = at).prototype = {
            constructor: at,
            init: function (e, t, n, r, i, o) {
                (this.elem = e),
                    (this.prop = n),
                    (this.easing = i || S.easing._default),
                    (this.options = t),
                    (this.start = this.now = this.cur()),
                    (this.end = r),
                    (this.unit = o || (S.cssNumber[n] ? "" : "px"));
            },
            cur: function () {
                var e = at.propHooks[this.prop];
                return (e && e.get ? e : at.propHooks._default).get(this);
            },
            run: function (e) {
                var t,
                    n = at.propHooks[this.prop];
                return (
                    this.options.duration
                        ? (this.pos = t =
                              S.easing[this.easing](
                                  e,
                                  this.options.duration * e,
                                  0,
                                  1,
                                  this.options.duration
                              ))
                        : (this.pos = t = e),
                    (this.now = (this.end - this.start) * t + this.start),
                    this.options.step &&
                        this.options.step.call(this.elem, this.now, this),
                    (n && n.set ? n : at.propHooks._default).set(this),
                    this
                );
            },
        }).init.prototype = at.prototype),
        ((at.propHooks = {
            _default: {
                get: function (e) {
                    return 1 !== e.elem.nodeType ||
                        (null != e.elem[e.prop] && null == e.elem.style[e.prop])
                        ? e.elem[e.prop]
                        : (e = S.css(e.elem, e.prop, "")) && "auto" !== e
                        ? e
                        : 0;
                },
                set: function (e) {
                    S.fx.step[e.prop]
                        ? S.fx.step[e.prop](e)
                        : 1 !== e.elem.nodeType ||
                          (!S.cssHooks[e.prop] &&
                              null == e.elem.style[et(e.prop)])
                        ? (e.elem[e.prop] = e.now)
                        : S.style(e.elem, e.prop, e.now + e.unit);
                },
            },
        }).scrollTop = at.propHooks.scrollLeft =
            {
                set: function (e) {
                    e.elem.nodeType &&
                        e.elem.parentNode &&
                        (e.elem[e.prop] = e.now);
                },
            }),
        (S.easing = {
            linear: function (e) {
                return e;
            },
            swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
            },
            _default: "swing",
        }),
        (S.fx = at.prototype.init),
        (S.fx.step = {});
    var ut,
        lt,
        ct = /^(?:toggle|show|hide)$/,
        ft = /queueHooks$/;
    function pt() {
        lt &&
            (!1 === C.hidden && T.requestAnimationFrame
                ? T.requestAnimationFrame(pt)
                : T.setTimeout(pt, S.fx.interval),
            S.fx.tick());
    }
    function dt() {
        return (
            T.setTimeout(function () {
                ut = void 0;
            }),
            (ut = Date.now())
        );
    }
    function ht(e, t) {
        var n,
            r = 0,
            i = { height: e };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            i["margin" + (n = ne[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i;
    }
    function gt(e, t, n) {
        for (
            var r,
                i = (yt.tweeners[t] || []).concat(yt.tweeners["*"]),
                o = 0,
                s = i.length;
            o < s;
            o++
        )
            if ((r = i[o].call(n, t, e))) return r;
    }
    function yt(i, e, t) {
        var n,
            o,
            r = 0,
            s = yt.prefilters.length,
            a = S.Deferred().always(function () {
                delete u.elem;
            }),
            u = function () {
                if (o) return !1;
                for (
                    var e = ut || dt(),
                        e = Math.max(0, l.startTime + l.duration - e),
                        t = 1 - (e / l.duration || 0),
                        n = 0,
                        r = l.tweens.length;
                    n < r;
                    n++
                )
                    l.tweens[n].run(t);
                return (
                    a.notifyWith(i, [l, t, e]),
                    t < 1 && r
                        ? e
                        : (r || a.notifyWith(i, [l, 1, 0]),
                          a.resolveWith(i, [l]),
                          !1)
                );
            },
            l = a.promise({
                elem: i,
                props: S.extend({}, e),
                opts: S.extend(
                    !0,
                    { specialEasing: {}, easing: S.easing._default },
                    t
                ),
                originalProperties: e,
                originalOptions: t,
                startTime: ut || dt(),
                duration: t.duration,
                tweens: [],
                createTween: function (e, t) {
                    e = S.Tween(
                        i,
                        l.opts,
                        e,
                        t,
                        l.opts.specialEasing[e] || l.opts.easing
                    );
                    return l.tweens.push(e), e;
                },
                stop: function (e) {
                    var t = 0,
                        n = e ? l.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; t < n; t++) l.tweens[t].run(1);
                    return (
                        e
                            ? (a.notifyWith(i, [l, 1, 0]),
                              a.resolveWith(i, [l, e]))
                            : a.rejectWith(i, [l, e]),
                        this
                    );
                },
            }),
            c = l.props;
        for (
            (function (e, t) {
                var n, r, i, o, s;
                for (n in e)
                    if (
                        ((i = t[(r = X(n))]),
                        (o = e[n]),
                        Array.isArray(o) && ((i = o[1]), (o = e[n] = o[0])),
                        n !== r && ((e[r] = o), delete e[n]),
                        (s = S.cssHooks[r]) && ("expand" in s))
                    )
                        for (n in ((o = s.expand(o)), delete e[r], o))
                            (n in e) || ((e[n] = o[n]), (t[n] = i));
                    else t[r] = i;
            })(c, l.opts.specialEasing);
            r < s;
            r++
        )
            if ((n = yt.prefilters[r].call(l, i, c, l.opts)))
                return (
                    x(n.stop) &&
                        (S._queueHooks(l.elem, l.opts.queue).stop =
                            n.stop.bind(n)),
                    n
                );
        return (
            S.map(c, gt, l),
            x(l.opts.start) && l.opts.start.call(i, l),
            l
                .progress(l.opts.progress)
                .done(l.opts.done, l.opts.complete)
                .fail(l.opts.fail)
                .always(l.opts.always),
            S.fx.timer(S.extend(u, { elem: i, anim: l, queue: l.opts.queue })),
            l
        );
    }
    (S.Animation = S.extend(yt, {
        tweeners: {
            "*": [
                function (e, t) {
                    var n = this.createTween(e, t);
                    return ae(n.elem, e, te.exec(t), n), n;
                },
            ],
        },
        tweener: function (e, t) {
            for (
                var n,
                    r = 0,
                    i = (e = x(e) ? ((t = e), ["*"]) : e.match(P)).length;
                r < i;
                r++
            )
                (n = e[r]),
                    (yt.tweeners[n] = yt.tweeners[n] || []),
                    yt.tweeners[n].unshift(t);
        },
        prefilters: [
            function (e, t, n) {
                var r,
                    i,
                    o,
                    s,
                    a,
                    u,
                    l,
                    c = "width" in t || "height" in t,
                    f = this,
                    p = {},
                    d = e.style,
                    h = e.nodeType && se(e),
                    g = Y.get(e, "fxshow");
                for (r in (n.queue ||
                    (null == (s = S._queueHooks(e, "fx")).unqueued &&
                        ((s.unqueued = 0),
                        (a = s.empty.fire),
                        (s.empty.fire = function () {
                            s.unqueued || a();
                        })),
                    s.unqueued++,
                    f.always(function () {
                        f.always(function () {
                            s.unqueued--,
                                S.queue(e, "fx").length || s.empty.fire();
                        });
                    })),
                t))
                    if (((i = t[r]), ct.test(i))) {
                        if (
                            (delete t[r],
                            (o = o || "toggle" === i),
                            i === (h ? "hide" : "show"))
                        ) {
                            if ("show" !== i || !g || void 0 === g[r]) continue;
                            h = !0;
                        }
                        p[r] = (g && g[r]) || S.style(e, r);
                    }
                if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(p))
                    for (r in (c &&
                        1 === e.nodeType &&
                        ((n.overflow = [d.overflow, d.overflowX, d.overflowY]),
                        null == (l = g && g.display) &&
                            (l = Y.get(e, "display")),
                        "none" === (c = S.css(e, "display")) &&
                            (l
                                ? (c = l)
                                : (le([e], !0),
                                  (l = e.style.display || l),
                                  (c = S.css(e, "display")),
                                  le([e]))),
                        ("inline" === c ||
                            ("inline-block" === c && null != l)) &&
                            "none" === S.css(e, "float") &&
                            (u ||
                                (f.done(function () {
                                    d.display = l;
                                }),
                                null == l &&
                                    ((c = d.display),
                                    (l = "none" === c ? "" : c))),
                            (d.display = "inline-block"))),
                    n.overflow &&
                        ((d.overflow = "hidden"),
                        f.always(function () {
                            (d.overflow = n.overflow[0]),
                                (d.overflowX = n.overflow[1]),
                                (d.overflowY = n.overflow[2]);
                        })),
                    (u = !1),
                    p))
                        u ||
                            (g
                                ? "hidden" in g && (h = g.hidden)
                                : (g = Y.access(e, "fxshow", { display: l })),
                            o && (g.hidden = !h),
                            h && le([e], !0),
                            f.done(function () {
                                for (r in (h || le([e]),
                                Y.remove(e, "fxshow"),
                                p))
                                    S.style(e, r, p[r]);
                            })),
                            (u = gt(h ? g[r] : 0, r, f)),
                            r in g ||
                                ((g[r] = u.start),
                                h && ((u.end = u.start), (u.start = 0)));
            },
        ],
        prefilter: function (e, t) {
            t ? yt.prefilters.unshift(e) : yt.prefilters.push(e);
        },
    })),
        (S.speed = function (e, t, n) {
            var r =
                e && "object" == typeof e
                    ? S.extend({}, e)
                    : {
                          complete: n || (!n && t) || (x(e) && e),
                          duration: e,
                          easing: (n && t) || (t && !x(t) && t),
                      };
            return (
                S.fx.off
                    ? (r.duration = 0)
                    : "number" != typeof r.duration &&
                      (r.duration in S.fx.speeds
                          ? (r.duration = S.fx.speeds[r.duration])
                          : (r.duration = S.fx.speeds._default)),
                (null != r.queue && !0 !== r.queue) || (r.queue = "fx"),
                (r.old = r.complete),
                (r.complete = function () {
                    x(r.old) && r.old.call(this),
                        r.queue && S.dequeue(this, r.queue);
                }),
                r
            );
        }),
        S.fn.extend({
            fadeTo: function (e, t, n, r) {
                return this.filter(se)
                    .css("opacity", 0)
                    .show()
                    .end()
                    .animate({ opacity: t }, e, n, r);
            },
            animate: function (t, e, n, r) {
                var i = S.isEmptyObject(t),
                    o = S.speed(e, n, r),
                    r = function () {
                        var e = yt(this, S.extend({}, t), o);
                        (i || Y.get(this, "finish")) && e.stop(!0);
                    };
                return (
                    (r.finish = r),
                    i || !1 === o.queue ? this.each(r) : this.queue(o.queue, r)
                );
            },
            stop: function (i, e, o) {
                function s(e) {
                    var t = e.stop;
                    delete e.stop, t(o);
                }
                return (
                    "string" != typeof i && ((o = e), (e = i), (i = void 0)),
                    e && this.queue(i || "fx", []),
                    this.each(function () {
                        var e = !0,
                            t = null != i && i + "queueHooks",
                            n = S.timers,
                            r = Y.get(this);
                        if (t) r[t] && r[t].stop && s(r[t]);
                        else
                            for (t in r)
                                r[t] && r[t].stop && ft.test(t) && s(r[t]);
                        for (t = n.length; t--; )
                            n[t].elem !== this ||
                                (null != i && n[t].queue !== i) ||
                                (n[t].anim.stop(o), (e = !1), n.splice(t, 1));
                        (!e && o) || S.dequeue(this, i);
                    })
                );
            },
            finish: function (s) {
                return (
                    !1 !== s && (s = s || "fx"),
                    this.each(function () {
                        var e,
                            t = Y.get(this),
                            n = t[s + "queue"],
                            r = t[s + "queueHooks"],
                            i = S.timers,
                            o = n ? n.length : 0;
                        for (
                            t.finish = !0,
                                S.queue(this, s, []),
                                r && r.stop && r.stop.call(this, !0),
                                e = i.length;
                            e--;

                        )
                            i[e].elem === this &&
                                i[e].queue === s &&
                                (i[e].anim.stop(!0), i.splice(e, 1));
                        for (e = 0; e < o; e++)
                            n[e] && n[e].finish && n[e].finish.call(this);
                        delete t.finish;
                    })
                );
            },
        }),
        S.each(["toggle", "show", "hide"], function (e, r) {
            var i = S.fn[r];
            S.fn[r] = function (e, t, n) {
                return null == e || "boolean" == typeof e
                    ? i.apply(this, arguments)
                    : this.animate(ht(r, !0), e, t, n);
            };
        }),
        S.each(
            {
                slideDown: ht("show"),
                slideUp: ht("hide"),
                slideToggle: ht("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" },
            },
            function (e, r) {
                S.fn[e] = function (e, t, n) {
                    return this.animate(r, e, t, n);
                };
            }
        ),
        (S.timers = []),
        (S.fx.tick = function () {
            var e,
                t = 0,
                n = S.timers;
            for (ut = Date.now(); t < n.length; t++)
                (e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || S.fx.stop(), (ut = void 0);
        }),
        (S.fx.timer = function (e) {
            S.timers.push(e), S.fx.start();
        }),
        (S.fx.interval = 13),
        (S.fx.start = function () {
            lt || ((lt = !0), pt());
        }),
        (S.fx.stop = function () {
            lt = null;
        }),
        (S.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (S.fn.delay = function (r, e) {
            return (
                (r = (S.fx && S.fx.speeds[r]) || r),
                this.queue((e = e || "fx"), function (e, t) {
                    var n = T.setTimeout(e, r);
                    t.stop = function () {
                        T.clearTimeout(n);
                    };
                })
            );
        }),
        (ee = C.createElement("input")),
        (f = C.createElement("select").appendChild(C.createElement("option"))),
        (ee.type = "checkbox"),
        (v.checkOn = "" !== ee.value),
        (v.optSelected = f.selected),
        ((ee = C.createElement("input")).value = "t"),
        (ee.type = "radio"),
        (v.radioValue = "t" === ee.value);
    var mt,
        vt = S.expr.attrHandle;
    S.fn.extend({
        attr: function (e, t) {
            return B(this, S.attr, e, t, 1 < arguments.length);
        },
        removeAttr: function (e) {
            return this.each(function () {
                S.removeAttr(this, e);
            });
        },
    }),
        S.extend({
            attr: function (e, t, n) {
                var r,
                    i,
                    o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return void 0 === e.getAttribute
                        ? S.prop(e, t, n)
                        : ((1 === o && S.isXMLDoc(e)) ||
                              (i =
                                  S.attrHooks[t.toLowerCase()] ||
                                  (S.expr.match.bool.test(t) ? mt : void 0)),
                          void 0 !== n
                              ? null === n
                                  ? void S.removeAttr(e, t)
                                  : i &&
                                    "set" in i &&
                                    void 0 !== (r = i.set(e, n, t))
                                  ? r
                                  : (e.setAttribute(t, n + ""), n)
                              : !(
                                    i &&
                                    "get" in i &&
                                    null !== (r = i.get(e, t))
                                ) && null == (r = S.find.attr(e, t))
                              ? void 0
                              : r);
            },
            attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!v.radioValue && "radio" === t && A(e, "input")) {
                            var n = e.value;
                            return (
                                e.setAttribute("type", t), n && (e.value = n), t
                            );
                        }
                    },
                },
            },
            removeAttr: function (e, t) {
                var n,
                    r = 0,
                    i = t && t.match(P);
                if (i && 1 === e.nodeType)
                    for (; (n = i[r++]); ) e.removeAttribute(n);
            },
        }),
        (mt = {
            set: function (e, t, n) {
                return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n), n;
            },
        }),
        S.each(S.expr.match.bool.source.match(/\w+/g), function (e, t) {
            var s = vt[t] || S.find.attr;
            vt[t] = function (e, t, n) {
                var r,
                    i,
                    o = t.toLowerCase();
                return (
                    n ||
                        ((i = vt[o]),
                        (vt[o] = r),
                        (r = null != s(e, t, n) ? o : null),
                        (vt[o] = i)),
                    r
                );
            };
        });
    var xt = /^(?:input|select|textarea|button)$/i,
        bt = /^(?:a|area)$/i;
    function wt(e) {
        return (e.match(P) || []).join(" ");
    }
    function Tt(e) {
        return (e.getAttribute && e.getAttribute("class")) || "";
    }
    function Ct(e) {
        return Array.isArray(e)
            ? e
            : ("string" == typeof e && e.match(P)) || [];
    }
    S.fn.extend({
        prop: function (e, t) {
            return B(this, S.prop, e, t, 1 < arguments.length);
        },
        removeProp: function (e) {
            return this.each(function () {
                delete this[S.propFix[e] || e];
            });
        },
    }),
        S.extend({
            prop: function (e, t, n) {
                var r,
                    i,
                    o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return (
                        (1 === o && S.isXMLDoc(e)) ||
                            ((t = S.propFix[t] || t), (i = S.propHooks[t])),
                        void 0 !== n
                            ? i && "set" in i && void 0 !== (r = i.set(e, n, t))
                                ? r
                                : (e[t] = n)
                            : i && "get" in i && null !== (r = i.get(e, t))
                            ? r
                            : e[t]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (e) {
                        var t = S.find.attr(e, "tabindex");
                        return t
                            ? parseInt(t, 10)
                            : xt.test(e.nodeName) ||
                              (bt.test(e.nodeName) && e.href)
                            ? 0
                            : -1;
                    },
                },
            },
            propFix: { for: "htmlFor", class: "className" },
        }),
        v.optSelected ||
            (S.propHooks.selected = {
                get: function (e) {
                    e = e.parentNode;
                    return (
                        e && e.parentNode && e.parentNode.selectedIndex, null
                    );
                },
                set: function (e) {
                    e = e.parentNode;
                    e &&
                        (e.selectedIndex,
                        e.parentNode && e.parentNode.selectedIndex);
                },
            }),
        S.each(
            [
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable",
            ],
            function () {
                S.propFix[this.toLowerCase()] = this;
            }
        ),
        S.fn.extend({
            addClass: function (t) {
                var e, n, r, i, o, s;
                return x(t)
                    ? this.each(function (e) {
                          S(this).addClass(t.call(this, e, Tt(this)));
                      })
                    : (e = Ct(t)).length
                    ? this.each(function () {
                          if (
                              ((r = Tt(this)),
                              (n = 1 === this.nodeType && " " + wt(r) + " "))
                          ) {
                              for (o = 0; o < e.length; o++)
                                  (i = e[o]),
                                      n.indexOf(" " + i + " ") < 0 &&
                                          (n += i + " ");
                              (s = wt(n)),
                                  r !== s && this.setAttribute("class", s);
                          }
                      })
                    : this;
            },
            removeClass: function (t) {
                var e, n, r, i, o, s;
                return x(t)
                    ? this.each(function (e) {
                          S(this).removeClass(t.call(this, e, Tt(this)));
                      })
                    : arguments.length
                    ? (e = Ct(t)).length
                        ? this.each(function () {
                              if (
                                  ((r = Tt(this)),
                                  (n =
                                      1 === this.nodeType && " " + wt(r) + " "))
                              ) {
                                  for (o = 0; o < e.length; o++)
                                      for (
                                          i = e[o];
                                          -1 < n.indexOf(" " + i + " ");

                                      )
                                          n = n.replace(" " + i + " ", " ");
                                  (s = wt(n)),
                                      r !== s && this.setAttribute("class", s);
                              }
                          })
                        : this
                    : this.attr("class", "");
            },
            toggleClass: function (t, n) {
                var e,
                    r,
                    i,
                    o,
                    s = typeof t,
                    a = "string" == s || Array.isArray(t);
                return x(t)
                    ? this.each(function (e) {
                          S(this).toggleClass(t.call(this, e, Tt(this), n), n);
                      })
                    : "boolean" == typeof n && a
                    ? n
                        ? this.addClass(t)
                        : this.removeClass(t)
                    : ((e = Ct(t)),
                      this.each(function () {
                          if (a)
                              for (o = S(this), i = 0; i < e.length; i++)
                                  (r = e[i]),
                                      o.hasClass(r)
                                          ? o.removeClass(r)
                                          : o.addClass(r);
                          else
                              (void 0 !== t && "boolean" != s) ||
                                  ((r = Tt(this)) &&
                                      Y.set(this, "__className__", r),
                                  this.setAttribute &&
                                      this.setAttribute(
                                          "class",
                                          (!r &&
                                              !1 !== t &&
                                              Y.get(this, "__className__")) ||
                                              ""
                                      ));
                      }));
            },
            hasClass: function (e) {
                for (var t, n = 0, r = " " + e + " "; (t = this[n++]); )
                    if (
                        1 === t.nodeType &&
                        -1 < (" " + wt(Tt(t)) + " ").indexOf(r)
                    )
                        return !0;
                return !1;
            },
        });
    var St = /\r/g;
    S.fn.extend({
        val: function (t) {
            var n,
                e,
                r,
                i = this[0];
            return arguments.length
                ? ((r = x(t)),
                  this.each(function (e) {
                      1 === this.nodeType &&
                          (null == (e = r ? t.call(this, e, S(this).val()) : t)
                              ? (e = "")
                              : "number" == typeof e
                              ? (e += "")
                              : Array.isArray(e) &&
                                (e = S.map(e, function (e) {
                                    return null == e ? "" : e + "";
                                })),
                          ((n =
                              S.valHooks[this.type] ||
                              S.valHooks[this.nodeName.toLowerCase()]) &&
                              "set" in n &&
                              void 0 !== n.set(this, e, "value")) ||
                              (this.value = e));
                  }))
                : i
                ? (n =
                      S.valHooks[i.type] ||
                      S.valHooks[i.nodeName.toLowerCase()]) &&
                  "get" in n &&
                  void 0 !== (e = n.get(i, "value"))
                    ? e
                    : "string" == typeof (e = i.value)
                    ? e.replace(St, "")
                    : null == e
                    ? ""
                    : e
                : void 0;
        },
    }),
        S.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = S.find.attr(e, "value");
                        return null != t ? t : wt(S.text(e));
                    },
                },
                select: {
                    get: function (e) {
                        for (
                            var t,
                                n = e.options,
                                r = e.selectedIndex,
                                i = "select-one" === e.type,
                                o = i ? null : [],
                                s = i ? r + 1 : n.length,
                                a = r < 0 ? s : i ? r : 0;
                            a < s;
                            a++
                        )
                            if (
                                ((t = n[a]).selected || a === r) &&
                                !t.disabled &&
                                (!t.parentNode.disabled ||
                                    !A(t.parentNode, "optgroup"))
                            ) {
                                if (((t = S(t).val()), i)) return t;
                                o.push(t);
                            }
                        return o;
                    },
                    set: function (e, t) {
                        for (
                            var n,
                                r,
                                i = e.options,
                                o = S.makeArray(t),
                                s = i.length;
                            s--;

                        )
                            ((r = i[s]).selected =
                                -1 < S.inArray(S.valHooks.option.get(r), o)) &&
                                (n = !0);
                        return n || (e.selectedIndex = -1), o;
                    },
                },
            },
        }),
        S.each(["radio", "checkbox"], function () {
            (S.valHooks[this] = {
                set: function (e, t) {
                    if (Array.isArray(t))
                        return (e.checked = -1 < S.inArray(S(e).val(), t));
                },
            }),
                v.checkOn ||
                    (S.valHooks[this].get = function (e) {
                        return null === e.getAttribute("value")
                            ? "on"
                            : e.value;
                    });
        }),
        (v.focusin = "onfocusin" in T);
    function Et(e) {
        e.stopPropagation();
    }
    var kt = /^(?:focusinfocus|focusoutblur)$/;
    S.extend(S.event, {
        trigger: function (e, t, n, r) {
            var i,
                o,
                s,
                a,
                u,
                l,
                c,
                f = [n || C],
                p = m.call(e, "type") ? e.type : e,
                d = m.call(e, "namespace") ? e.namespace.split(".") : [],
                h = (c = o = n = n || C);
            if (
                3 !== n.nodeType &&
                8 !== n.nodeType &&
                !kt.test(p + S.event.triggered) &&
                (-1 < p.indexOf(".") &&
                    ((p = (d = p.split(".")).shift()), d.sort()),
                (a = p.indexOf(":") < 0 && "on" + p),
                ((e = e[S.expando]
                    ? e
                    : new S.Event(p, "object" == typeof e && e)).isTrigger = r
                    ? 2
                    : 3),
                (e.namespace = d.join(".")),
                (e.rnamespace = e.namespace
                    ? new RegExp(
                          "(^|\\.)" + d.join("\\.(?:.*\\.|)") + "(\\.|$)"
                      )
                    : null),
                (e.result = void 0),
                e.target || (e.target = n),
                (t = null == t ? [e] : S.makeArray(t, [e])),
                (l = S.event.special[p] || {}),
                r || !l.trigger || !1 !== l.trigger.apply(n, t))
            ) {
                if (!r && !l.noBubble && !g(n)) {
                    for (
                        s = l.delegateType || p,
                            kt.test(s + p) || (h = h.parentNode);
                        h;
                        h = h.parentNode
                    )
                        f.push(h), (o = h);
                    o === (n.ownerDocument || C) &&
                        f.push(o.defaultView || o.parentWindow || T);
                }
                for (i = 0; (h = f[i++]) && !e.isPropagationStopped(); )
                    (c = h),
                        (e.type = 1 < i ? s : l.bindType || p),
                        (u =
                            (Y.get(h, "events") || Object.create(null))[
                                e.type
                            ] && Y.get(h, "handle")) && u.apply(h, t),
                        (u = a && h[a]) &&
                            u.apply &&
                            V(h) &&
                            ((e.result = u.apply(h, t)),
                            !1 === e.result && e.preventDefault());
                return (
                    (e.type = p),
                    r ||
                        e.isDefaultPrevented() ||
                        (l._default && !1 !== l._default.apply(f.pop(), t)) ||
                        !V(n) ||
                        (a &&
                            x(n[p]) &&
                            !g(n) &&
                            ((o = n[a]) && (n[a] = null),
                            (S.event.triggered = p),
                            e.isPropagationStopped() &&
                                c.addEventListener(p, Et),
                            n[p](),
                            e.isPropagationStopped() &&
                                c.removeEventListener(p, Et),
                            (S.event.triggered = void 0),
                            o && (n[a] = o))),
                    e.result
                );
            }
        },
        simulate: function (e, t, n) {
            e = S.extend(new S.Event(), n, { type: e, isSimulated: !0 });
            S.event.trigger(e, null, t);
        },
    }),
        S.fn.extend({
            trigger: function (e, t) {
                return this.each(function () {
                    S.event.trigger(e, t, this);
                });
            },
            triggerHandler: function (e, t) {
                var n = this[0];
                if (n) return S.event.trigger(e, t, n, !0);
            },
        }),
        v.focusin ||
            S.each({ focus: "focusin", blur: "focusout" }, function (n, r) {
                function i(e) {
                    S.event.simulate(r, e.target, S.event.fix(e));
                }
                S.event.special[r] = {
                    setup: function () {
                        var e = this.ownerDocument || this.document || this,
                            t = Y.access(e, r);
                        t || e.addEventListener(n, i, !0),
                            Y.access(e, r, (t || 0) + 1);
                    },
                    teardown: function () {
                        var e = this.ownerDocument || this.document || this,
                            t = Y.access(e, r) - 1;
                        t
                            ? Y.access(e, r, t)
                            : (e.removeEventListener(n, i, !0), Y.remove(e, r));
                    },
                };
            });
    var At = T.location,
        Nt = { guid: Date.now() },
        jt = /\?/;
    S.parseXML = function (e) {
        var t, n;
        if (!e || "string" != typeof e) return null;
        try {
            t = new T.DOMParser().parseFromString(e, "text/xml");
        } catch (e) {}
        return (
            (n = t && t.getElementsByTagName("parsererror")[0]),
            (t && !n) ||
                S.error(
                    "Invalid XML: " +
                        (n
                            ? S.map(n.childNodes, function (e) {
                                  return e.textContent;
                              }).join("\n")
                            : e)
                ),
            t
        );
    };
    var Dt = /\[\]$/,
        qt = /\r?\n/g,
        Lt = /^(?:submit|button|image|reset|file)$/i,
        Ht = /^(?:input|select|textarea|keygen)/i;
    (S.param = function (e, t) {
        function n(e, t) {
            (t = x(t) ? t() : t),
                (i[i.length] =
                    encodeURIComponent(e) +
                    "=" +
                    encodeURIComponent(null == t ? "" : t));
        }
        var r,
            i = [];
        if (null == e) return "";
        if (Array.isArray(e) || (e.jquery && !S.isPlainObject(e)))
            S.each(e, function () {
                n(this.name, this.value);
            });
        else
            for (r in e)
                !(function n(r, e, i, o) {
                    if (Array.isArray(e))
                        S.each(e, function (e, t) {
                            i || Dt.test(r)
                                ? o(r, t)
                                : n(
                                      r +
                                          "[" +
                                          ("object" == typeof t && null != t
                                              ? e
                                              : "") +
                                          "]",
                                      t,
                                      i,
                                      o
                                  );
                        });
                    else if (i || "object" !== h(e)) o(r, e);
                    else for (var t in e) n(r + "[" + t + "]", e[t], i, o);
                })(r, e[r], t, n);
        return i.join("&");
    }),
        S.fn.extend({
            serialize: function () {
                return S.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var e = S.prop(this, "elements");
                    return e ? S.makeArray(e) : this;
                })
                    .filter(function () {
                        var e = this.type;
                        return (
                            this.name &&
                            !S(this).is(":disabled") &&
                            Ht.test(this.nodeName) &&
                            !Lt.test(e) &&
                            (this.checked || !ce.test(e))
                        );
                    })
                    .map(function (e, t) {
                        var n = S(this).val();
                        return null == n
                            ? null
                            : Array.isArray(n)
                            ? S.map(n, function (e) {
                                  return {
                                      name: t.name,
                                      value: e.replace(qt, "\r\n"),
                                  };
                              })
                            : { name: t.name, value: n.replace(qt, "\r\n") };
                    })
                    .get();
            },
        });
    var Ot = /%20/g,
        Pt = /#.*$/,
        Rt = /([?&])_=[^&]*/,
        Mt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        It = /^(?:GET|HEAD)$/,
        Wt = /^\/\//,
        Ft = {},
        $t = {},
        Bt = "*/".concat("*"),
        _t = C.createElement("a");
    function zt(o) {
        return function (e, t) {
            "string" != typeof e && ((t = e), (e = "*"));
            var n,
                r = 0,
                i = e.toLowerCase().match(P) || [];
            if (x(t))
                for (; (n = i[r++]); )
                    "+" === n[0]
                        ? ((n = n.slice(1) || "*"),
                          (o[n] = o[n] || []).unshift(t))
                        : (o[n] = o[n] || []).push(t);
        };
    }
    function Ut(t, r, i, o) {
        var s = {},
            a = t === $t;
        function u(e) {
            var n;
            return (
                (s[e] = !0),
                S.each(t[e] || [], function (e, t) {
                    t = t(r, i, o);
                    return "string" != typeof t || a || s[t]
                        ? a
                            ? !(n = t)
                            : void 0
                        : (r.dataTypes.unshift(t), u(t), !1);
                }),
                n
            );
        }
        return u(r.dataTypes[0]) || (!s["*"] && u("*"));
    }
    function Xt(e, t) {
        var n,
            r,
            i = S.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((i[n] ? e : (r = r || {}))[n] = t[n]);
        return r && S.extend(!0, e, r), e;
    }
    (_t.href = At.href),
        S.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: At.href,
                type: "GET",
                isLocal:
                    /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(
                        At.protocol
                    ),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": Bt,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript",
                },
                contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON",
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": S.parseXML,
                },
                flatOptions: { url: !0, context: !0 },
            },
            ajaxSetup: function (e, t) {
                return t ? Xt(Xt(e, S.ajaxSettings), t) : Xt(S.ajaxSettings, e);
            },
            ajaxPrefilter: zt(Ft),
            ajaxTransport: zt($t),
            ajax: function (e, t) {
                "object" == typeof e && ((t = e), (e = void 0));
                var u,
                    l,
                    c,
                    n,
                    f,
                    p,
                    d,
                    r,
                    i,
                    h = S.ajaxSetup({}, (t = t || {})),
                    g = h.context || h,
                    y = h.context && (g.nodeType || g.jquery) ? S(g) : S.event,
                    m = S.Deferred(),
                    v = S.Callbacks("once memory"),
                    x = h.statusCode || {},
                    o = {},
                    s = {},
                    a = "canceled",
                    b = {
                        readyState: 0,
                        getResponseHeader: function (e) {
                            var t;
                            if (p) {
                                if (!n)
                                    for (n = {}; (t = Mt.exec(c)); )
                                        n[t[1].toLowerCase() + " "] = (
                                            n[t[1].toLowerCase() + " "] || []
                                        ).concat(t[2]);
                                t = n[e.toLowerCase() + " "];
                            }
                            return null == t ? null : t.join(", ");
                        },
                        getAllResponseHeaders: function () {
                            return p ? c : null;
                        },
                        setRequestHeader: function (e, t) {
                            return (
                                null == p &&
                                    ((e = s[e.toLowerCase()] =
                                        s[e.toLowerCase()] || e),
                                    (o[e] = t)),
                                this
                            );
                        },
                        overrideMimeType: function (e) {
                            return null == p && (h.mimeType = e), this;
                        },
                        statusCode: function (e) {
                            if (e)
                                if (p) b.always(e[b.status]);
                                else for (var t in e) x[t] = [x[t], e[t]];
                            return this;
                        },
                        abort: function (e) {
                            e = e || a;
                            return u && u.abort(e), w(0, e), this;
                        },
                    };
                if (
                    (m.promise(b),
                    (h.url = ((e || h.url || At.href) + "").replace(
                        Wt,
                        At.protocol + "//"
                    )),
                    (h.type = t.method || t.type || h.method || h.type),
                    (h.dataTypes = (h.dataType || "*")
                        .toLowerCase()
                        .match(P) || [""]),
                    null == h.crossDomain)
                ) {
                    i = C.createElement("a");
                    try {
                        (i.href = h.url),
                            (i.href = i.href),
                            (h.crossDomain =
                                _t.protocol + "//" + _t.host !=
                                i.protocol + "//" + i.host);
                    } catch (e) {
                        h.crossDomain = !0;
                    }
                }
                if (
                    (h.data &&
                        h.processData &&
                        "string" != typeof h.data &&
                        (h.data = S.param(h.data, h.traditional)),
                    Ut(Ft, h, t, b),
                    p)
                )
                    return b;
                for (r in ((d = S.event && h.global) &&
                    0 == S.active++ &&
                    S.event.trigger("ajaxStart"),
                (h.type = h.type.toUpperCase()),
                (h.hasContent = !It.test(h.type)),
                (l = h.url.replace(Pt, "")),
                h.hasContent
                    ? h.data &&
                      h.processData &&
                      0 ===
                          (h.contentType || "").indexOf(
                              "application/x-www-form-urlencoded"
                          ) &&
                      (h.data = h.data.replace(Ot, "+"))
                    : ((i = h.url.slice(l.length)),
                      h.data &&
                          (h.processData || "string" == typeof h.data) &&
                          ((l += (jt.test(l) ? "&" : "?") + h.data),
                          delete h.data),
                      !1 === h.cache &&
                          ((l = l.replace(Rt, "$1")),
                          (i =
                              (jt.test(l) ? "&" : "?") + "_=" + Nt.guid++ + i)),
                      (h.url = l + i)),
                h.ifModified &&
                    (S.lastModified[l] &&
                        b.setRequestHeader(
                            "If-Modified-Since",
                            S.lastModified[l]
                        ),
                    S.etag[l] &&
                        b.setRequestHeader("If-None-Match", S.etag[l])),
                ((h.data && h.hasContent && !1 !== h.contentType) ||
                    t.contentType) &&
                    b.setRequestHeader("Content-Type", h.contentType),
                b.setRequestHeader(
                    "Accept",
                    h.dataTypes[0] && h.accepts[h.dataTypes[0]]
                        ? h.accepts[h.dataTypes[0]] +
                              ("*" !== h.dataTypes[0]
                                  ? ", " + Bt + "; q=0.01"
                                  : "")
                        : h.accepts["*"]
                ),
                h.headers))
                    b.setRequestHeader(r, h.headers[r]);
                if (h.beforeSend && (!1 === h.beforeSend.call(g, b, h) || p))
                    return b.abort();
                if (
                    ((a = "abort"),
                    v.add(h.complete),
                    b.done(h.success),
                    b.fail(h.error),
                    (u = Ut($t, h, t, b)))
                ) {
                    if (
                        ((b.readyState = 1),
                        d && y.trigger("ajaxSend", [b, h]),
                        p)
                    )
                        return b;
                    h.async &&
                        0 < h.timeout &&
                        (f = T.setTimeout(function () {
                            b.abort("timeout");
                        }, h.timeout));
                    try {
                        (p = !1), u.send(o, w);
                    } catch (e) {
                        if (p) throw e;
                        w(-1, e);
                    }
                } else w(-1, "No Transport");
                function w(e, t, n, r) {
                    var i,
                        o,
                        s,
                        a = t;
                    p ||
                        ((p = !0),
                        f && T.clearTimeout(f),
                        (u = void 0),
                        (c = r || ""),
                        (b.readyState = 0 < e ? 4 : 0),
                        (r = (200 <= e && e < 300) || 304 === e),
                        n &&
                            (s = (function (e, t, n) {
                                for (
                                    var r,
                                        i,
                                        o,
                                        s,
                                        a = e.contents,
                                        u = e.dataTypes;
                                    "*" === u[0];

                                )
                                    u.shift(),
                                        void 0 === r &&
                                            (r =
                                                e.mimeType ||
                                                t.getResponseHeader(
                                                    "Content-Type"
                                                ));
                                if (r)
                                    for (i in a)
                                        if (a[i] && a[i].test(r)) {
                                            u.unshift(i);
                                            break;
                                        }
                                if (u[0] in n) o = u[0];
                                else {
                                    for (i in n) {
                                        if (
                                            !u[0] ||
                                            e.converters[i + " " + u[0]]
                                        ) {
                                            o = i;
                                            break;
                                        }
                                        s = s || i;
                                    }
                                    o = o || s;
                                }
                                if (o) return o !== u[0] && u.unshift(o), n[o];
                            })(h, b, n)),
                        !r &&
                            -1 < S.inArray("script", h.dataTypes) &&
                            S.inArray("json", h.dataTypes) < 0 &&
                            (h.converters["text script"] = function () {}),
                        (s = (function (e, t, n, r) {
                            var i,
                                o,
                                s,
                                a,
                                u,
                                l = {},
                                c = e.dataTypes.slice();
                            if (c[1])
                                for (s in e.converters)
                                    l[s.toLowerCase()] = e.converters[s];
                            for (o = c.shift(); o; )
                                if (
                                    (e.responseFields[o] &&
                                        (n[e.responseFields[o]] = t),
                                    !u &&
                                        r &&
                                        e.dataFilter &&
                                        (t = e.dataFilter(t, e.dataType)),
                                    (u = o),
                                    (o = c.shift()))
                                )
                                    if ("*" === o) o = u;
                                    else if ("*" !== u && u !== o) {
                                        if (
                                            !(s = l[u + " " + o] || l["* " + o])
                                        )
                                            for (i in l)
                                                if (
                                                    (a = i.split(" "))[1] ===
                                                        o &&
                                                    (s =
                                                        l[u + " " + a[0]] ||
                                                        l["* " + a[0]])
                                                ) {
                                                    !0 === s
                                                        ? (s = l[i])
                                                        : !0 !== l[i] &&
                                                          ((o = a[0]),
                                                          c.unshift(a[1]));
                                                    break;
                                                }
                                        if (!0 !== s)
                                            if (s && e.throws) t = s(t);
                                            else
                                                try {
                                                    t = s(t);
                                                } catch (e) {
                                                    return {
                                                        state: "parsererror",
                                                        error: s
                                                            ? e
                                                            : "No conversion from " +
                                                              u +
                                                              " to " +
                                                              o,
                                                    };
                                                }
                                    }
                            return { state: "success", data: t };
                        })(h, s, b, r)),
                        r
                            ? (h.ifModified &&
                                  ((n = b.getResponseHeader("Last-Modified")) &&
                                      (S.lastModified[l] = n),
                                  (n = b.getResponseHeader("etag")) &&
                                      (S.etag[l] = n)),
                              204 === e || "HEAD" === h.type
                                  ? (a = "nocontent")
                                  : 304 === e
                                  ? (a = "notmodified")
                                  : ((a = s.state),
                                    (i = s.data),
                                    (r = !(o = s.error))))
                            : ((o = a),
                              (!e && a) || ((a = "error"), e < 0 && (e = 0))),
                        (b.status = e),
                        (b.statusText = (t || a) + ""),
                        r
                            ? m.resolveWith(g, [i, a, b])
                            : m.rejectWith(g, [b, a, o]),
                        b.statusCode(x),
                        (x = void 0),
                        d &&
                            y.trigger(r ? "ajaxSuccess" : "ajaxError", [
                                b,
                                h,
                                r ? i : o,
                            ]),
                        v.fireWith(g, [b, a]),
                        d &&
                            (y.trigger("ajaxComplete", [b, h]),
                            --S.active || S.event.trigger("ajaxStop")));
                }
                return b;
            },
            getJSON: function (e, t, n) {
                return S.get(e, t, n, "json");
            },
            getScript: function (e, t) {
                return S.get(e, void 0, t, "script");
            },
        }),
        S.each(["get", "post"], function (e, i) {
            S[i] = function (e, t, n, r) {
                return (
                    x(t) && ((r = r || n), (n = t), (t = void 0)),
                    S.ajax(
                        S.extend(
                            {
                                url: e,
                                type: i,
                                dataType: r,
                                data: t,
                                success: n,
                            },
                            S.isPlainObject(e) && e
                        )
                    )
                );
            };
        }),
        S.ajaxPrefilter(function (e) {
            for (var t in e.headers)
                "content-type" === t.toLowerCase() &&
                    (e.contentType = e.headers[t] || "");
        }),
        (S._evalUrl = function (e, t, n) {
            return S.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: { "text script": function () {} },
                dataFilter: function (e) {
                    S.globalEval(e, t, n);
                },
            });
        }),
        S.fn.extend({
            wrapAll: function (e) {
                return (
                    this[0] &&
                        (x(e) && (e = e.call(this[0])),
                        (e = S(e, this[0].ownerDocument).eq(0).clone(!0)),
                        this[0].parentNode && e.insertBefore(this[0]),
                        e
                            .map(function () {
                                for (var e = this; e.firstElementChild; )
                                    e = e.firstElementChild;
                                return e;
                            })
                            .append(this)),
                    this
                );
            },
            wrapInner: function (n) {
                return x(n)
                    ? this.each(function (e) {
                          S(this).wrapInner(n.call(this, e));
                      })
                    : this.each(function () {
                          var e = S(this),
                              t = e.contents();
                          t.length ? t.wrapAll(n) : e.append(n);
                      });
            },
            wrap: function (t) {
                var n = x(t);
                return this.each(function (e) {
                    S(this).wrapAll(n ? t.call(this, e) : t);
                });
            },
            unwrap: function (e) {
                return (
                    this.parent(e)
                        .not("body")
                        .each(function () {
                            S(this).replaceWith(this.childNodes);
                        }),
                    this
                );
            },
        }),
        (S.expr.pseudos.hidden = function (e) {
            return !S.expr.pseudos.visible(e);
        }),
        (S.expr.pseudos.visible = function (e) {
            return !!(
                e.offsetWidth ||
                e.offsetHeight ||
                e.getClientRects().length
            );
        }),
        (S.ajaxSettings.xhr = function () {
            try {
                return new T.XMLHttpRequest();
            } catch (e) {}
        });
    var Vt = { 0: 200, 1223: 204 },
        Gt = S.ajaxSettings.xhr();
    (v.cors = !!Gt && "withCredentials" in Gt),
        (v.ajax = Gt = !!Gt),
        S.ajaxTransport(function (i) {
            var o, s;
            if (v.cors || (Gt && !i.crossDomain))
                return {
                    send: function (e, t) {
                        var n,
                            r = i.xhr();
                        if (
                            (r.open(
                                i.type,
                                i.url,
                                i.async,
                                i.username,
                                i.password
                            ),
                            i.xhrFields)
                        )
                            for (n in i.xhrFields) r[n] = i.xhrFields[n];
                        for (n in (i.mimeType &&
                            r.overrideMimeType &&
                            r.overrideMimeType(i.mimeType),
                        i.crossDomain ||
                            e["X-Requested-With"] ||
                            (e["X-Requested-With"] = "XMLHttpRequest"),
                        e))
                            r.setRequestHeader(n, e[n]);
                        (o = function (e) {
                            return function () {
                                o &&
                                    ((o =
                                        s =
                                        r.onload =
                                        r.onerror =
                                        r.onabort =
                                        r.ontimeout =
                                        r.onreadystatechange =
                                            null),
                                    "abort" === e
                                        ? r.abort()
                                        : "error" === e
                                        ? "number" != typeof r.status
                                            ? t(0, "error")
                                            : t(r.status, r.statusText)
                                        : t(
                                              Vt[r.status] || r.status,
                                              r.statusText,
                                              "text" !==
                                                  (r.responseType || "text") ||
                                                  "string" !=
                                                      typeof r.responseText
                                                  ? { binary: r.response }
                                                  : { text: r.responseText },
                                              r.getAllResponseHeaders()
                                          ));
                            };
                        }),
                            (r.onload = o()),
                            (s = r.onerror = r.ontimeout = o("error")),
                            void 0 !== r.onabort
                                ? (r.onabort = s)
                                : (r.onreadystatechange = function () {
                                      4 === r.readyState &&
                                          T.setTimeout(function () {
                                              o && s();
                                          });
                                  }),
                            (o = o("abort"));
                        try {
                            r.send((i.hasContent && i.data) || null);
                        } catch (e) {
                            if (o) throw e;
                        }
                    },
                    abort: function () {
                        o && o();
                    },
                };
        }),
        S.ajaxPrefilter(function (e) {
            e.crossDomain && (e.contents.script = !1);
        }),
        S.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
            },
            contents: { script: /\b(?:java|ecma)script\b/ },
            converters: {
                "text script": function (e) {
                    return S.globalEval(e), e;
                },
            },
        }),
        S.ajaxPrefilter("script", function (e) {
            void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET");
        }),
        S.ajaxTransport("script", function (n) {
            var r, i;
            if (n.crossDomain || n.scriptAttrs)
                return {
                    send: function (e, t) {
                        (r = S("<script>")
                            .attr(n.scriptAttrs || {})
                            .prop({ charset: n.scriptCharset, src: n.url })
                            .on(
                                "load error",
                                (i = function (e) {
                                    r.remove(),
                                        (i = null),
                                        e &&
                                            t(
                                                "error" === e.type ? 404 : 200,
                                                e.type
                                            );
                                })
                            )),
                            C.head.appendChild(r[0]);
                    },
                    abort: function () {
                        i && i();
                    },
                };
        });
    var Yt = [],
        Qt = /(=)\?(?=&|$)|\?\?/;
    S.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = Yt.pop() || S.expando + "_" + Nt.guid++;
            return (this[e] = !0), e;
        },
    }),
        S.ajaxPrefilter("json jsonp", function (e, t, n) {
            var r,
                i,
                o,
                s =
                    !1 !== e.jsonp &&
                    (Qt.test(e.url)
                        ? "url"
                        : "string" == typeof e.data &&
                          0 ===
                              (e.contentType || "").indexOf(
                                  "application/x-www-form-urlencoded"
                              ) &&
                          Qt.test(e.data) &&
                          "data");
            if (s || "jsonp" === e.dataTypes[0])
                return (
                    (r = e.jsonpCallback =
                        x(e.jsonpCallback)
                            ? e.jsonpCallback()
                            : e.jsonpCallback),
                    s
                        ? (e[s] = e[s].replace(Qt, "$1" + r))
                        : !1 !== e.jsonp &&
                          (e.url +=
                              (jt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
                    (e.converters["script json"] = function () {
                        return o || S.error(r + " was not called"), o[0];
                    }),
                    (e.dataTypes[0] = "json"),
                    (i = T[r]),
                    (T[r] = function () {
                        o = arguments;
                    }),
                    n.always(function () {
                        void 0 === i ? S(T).removeProp(r) : (T[r] = i),
                            e[r] &&
                                ((e.jsonpCallback = t.jsonpCallback),
                                Yt.push(r)),
                            o && x(i) && i(o[0]),
                            (o = i = void 0);
                    }),
                    "script"
                );
        }),
        (v.createHTMLDocument =
            (((ee = C.implementation.createHTMLDocument("").body).innerHTML =
                "<form></form><form></form>"),
            2 === ee.childNodes.length)),
        (S.parseHTML = function (e, t, n) {
            return "string" != typeof e
                ? []
                : ("boolean" == typeof t && ((n = t), (t = !1)),
                  t ||
                      (v.createHTMLDocument
                          ? (((r = (t =
                                C.implementation.createHTMLDocument(
                                    ""
                                )).createElement("base")).href =
                                C.location.href),
                            t.head.appendChild(r))
                          : (t = C)),
                  (r = !n && []),
                  (n = N.exec(e))
                      ? [t.createElement(n[1])]
                      : ((n = me([e], t, r)),
                        r && r.length && S(r).remove(),
                        S.merge([], n.childNodes)));
            var r;
        }),
        (S.fn.load = function (e, t, n) {
            var r,
                i,
                o,
                s = this,
                a = e.indexOf(" ");
            return (
                -1 < a && ((r = wt(e.slice(a))), (e = e.slice(0, a))),
                x(t)
                    ? ((n = t), (t = void 0))
                    : t && "object" == typeof t && (i = "POST"),
                0 < s.length &&
                    S.ajax({
                        url: e,
                        type: i || "GET",
                        dataType: "html",
                        data: t,
                    })
                        .done(function (e) {
                            (o = arguments),
                                s.html(
                                    r
                                        ? S("<div>")
                                              .append(S.parseHTML(e))
                                              .find(r)
                                        : e
                                );
                        })
                        .always(
                            n &&
                                function (e, t) {
                                    s.each(function () {
                                        n.apply(
                                            this,
                                            o || [e.responseText, t, e]
                                        );
                                    });
                                }
                        ),
                this
            );
        }),
        (S.expr.pseudos.animated = function (t) {
            return S.grep(S.timers, function (e) {
                return t === e.elem;
            }).length;
        }),
        (S.offset = {
            setOffset: function (e, t, n) {
                var r,
                    i,
                    o,
                    s,
                    a = S.css(e, "position"),
                    u = S(e),
                    l = {};
                "static" === a && (e.style.position = "relative"),
                    (o = u.offset()),
                    (r = S.css(e, "top")),
                    (s = S.css(e, "left")),
                    (s =
                        ("absolute" === a || "fixed" === a) &&
                        -1 < (r + s).indexOf("auto")
                            ? ((i = (a = u.position()).top), a.left)
                            : ((i = parseFloat(r) || 0), parseFloat(s) || 0)),
                    null !=
                        (t = x(t) ? t.call(e, n, S.extend({}, o)) : t).top &&
                        (l.top = t.top - o.top + i),
                    null != t.left && (l.left = t.left - o.left + s),
                    "using" in t ? t.using.call(e, l) : u.css(l);
            },
        }),
        S.fn.extend({
            offset: function (t) {
                if (arguments.length)
                    return void 0 === t
                        ? this
                        : this.each(function (e) {
                              S.offset.setOffset(this, t, e);
                          });
                var e,
                    n = this[0];
                return n
                    ? n.getClientRects().length
                        ? ((e = n.getBoundingClientRect()),
                          (n = n.ownerDocument.defaultView),
                          {
                              top: e.top + n.pageYOffset,
                              left: e.left + n.pageXOffset,
                          })
                        : { top: 0, left: 0 }
                    : void 0;
            },
            position: function () {
                if (this[0]) {
                    var e,
                        t,
                        n,
                        r = this[0],
                        i = { top: 0, left: 0 };
                    if ("fixed" === S.css(r, "position"))
                        t = r.getBoundingClientRect();
                    else {
                        for (
                            t = this.offset(),
                                n = r.ownerDocument,
                                e = r.offsetParent || n.documentElement;
                            e &&
                            (e === n.body || e === n.documentElement) &&
                            "static" === S.css(e, "position");

                        )
                            e = e.parentNode;
                        e &&
                            e !== r &&
                            1 === e.nodeType &&
                            (((i = S(e).offset()).top += S.css(
                                e,
                                "borderTopWidth",
                                !0
                            )),
                            (i.left += S.css(e, "borderLeftWidth", !0)));
                    }
                    return {
                        top: t.top - i.top - S.css(r, "marginTop", !0),
                        left: t.left - i.left - S.css(r, "marginLeft", !0),
                    };
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (
                        var e = this.offsetParent;
                        e && "static" === S.css(e, "position");

                    )
                        e = e.offsetParent;
                    return e || re;
                });
            },
        }),
        S.each(
            { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
            function (t, i) {
                var o = "pageYOffset" === i;
                S.fn[t] = function (e) {
                    return B(
                        this,
                        function (e, t, n) {
                            var r;
                            return (
                                g(e)
                                    ? (r = e)
                                    : 9 === e.nodeType && (r = e.defaultView),
                                void 0 === n
                                    ? r
                                        ? r[i]
                                        : e[t]
                                    : void (r
                                          ? r.scrollTo(
                                                o ? r.pageXOffset : n,
                                                o ? n : r.pageYOffset
                                            )
                                          : (e[t] = n))
                            );
                        },
                        t,
                        e,
                        arguments.length
                    );
                };
            }
        ),
        S.each(["top", "left"], function (e, n) {
            S.cssHooks[n] = Ge(v.pixelPosition, function (e, t) {
                if (t)
                    return (
                        (t = Ve(e, n)),
                        Be.test(t) ? S(e).position()[n] + "px" : t
                    );
            });
        }),
        S.each({ Height: "height", Width: "width" }, function (s, a) {
            S.each(
                { padding: "inner" + s, content: a, "": "outer" + s },
                function (r, o) {
                    S.fn[o] = function (e, t) {
                        var n =
                                arguments.length &&
                                (r || "boolean" != typeof e),
                            i =
                                r ||
                                (!0 === e || !0 === t ? "margin" : "border");
                        return B(
                            this,
                            function (e, t, n) {
                                var r;
                                return g(e)
                                    ? 0 === o.indexOf("outer")
                                        ? e["inner" + s]
                                        : e.document.documentElement[
                                              "client" + s
                                          ]
                                    : 9 === e.nodeType
                                    ? ((r = e.documentElement),
                                      Math.max(
                                          e.body["scroll" + s],
                                          r["scroll" + s],
                                          e.body["offset" + s],
                                          r["offset" + s],
                                          r["client" + s]
                                      ))
                                    : void 0 === n
                                    ? S.css(e, t, i)
                                    : S.style(e, t, n, i);
                            },
                            a,
                            n ? e : void 0,
                            n
                        );
                    };
                }
            );
        }),
        S.each(
            [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
            ],
            function (e, t) {
                S.fn[t] = function (e) {
                    return this.on(t, e);
                };
            }
        ),
        S.fn.extend({
            bind: function (e, t, n) {
                return this.on(e, null, t, n);
            },
            unbind: function (e, t) {
                return this.off(e, null, t);
            },
            delegate: function (e, t, n, r) {
                return this.on(t, e, n, r);
            },
            undelegate: function (e, t, n) {
                return 1 === arguments.length
                    ? this.off(e, "**")
                    : this.off(t, e || "**", n);
            },
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e);
            },
        }),
        S.each(
            "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(
                " "
            ),
            function (e, n) {
                S.fn[n] = function (e, t) {
                    return 0 < arguments.length
                        ? this.on(n, null, e, t)
                        : this.trigger(n);
                };
            }
        );
    var Jt = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
    (S.proxy = function (e, t) {
        var n, r;
        if (("string" == typeof t && ((r = e[t]), (t = e), (e = r)), x(e)))
            return (
                (n = a.call(arguments, 2)),
                ((r = function () {
                    return e.apply(t || this, n.concat(a.call(arguments)));
                }).guid = e.guid =
                    e.guid || S.guid++),
                r
            );
    }),
        (S.holdReady = function (e) {
            e ? S.readyWait++ : S.ready(!0);
        }),
        (S.isArray = Array.isArray),
        (S.parseJSON = JSON.parse),
        (S.nodeName = A),
        (S.isFunction = x),
        (S.isWindow = g),
        (S.camelCase = X),
        (S.type = h),
        (S.now = Date.now),
        (S.isNumeric = function (e) {
            var t = S.type(e);
            return (
                ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
            );
        }),
        (S.trim = function (e) {
            return null == e ? "" : (e + "").replace(Jt, "$1");
        }),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return S;
            });
    var Kt = T.jQuery,
        Zt = T.$;
    return (
        (S.noConflict = function (e) {
            return (
                T.$ === S && (T.$ = Zt),
                e && T.jQuery === S && (T.jQuery = Kt),
                S
            );
        }),
        void 0 === e && (T.jQuery = T.$ = S),
        S
    );
});
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : ((e =
              "undefined" != typeof globalThis
                  ? globalThis
                  : e || self).bootstrap = t());
})(this, function () {
    "use strict";
    const o = "transitionend",
        n = (e) =>
            (e =
                e && window.CSS && window.CSS.escape
                    ? e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)
                    : e),
        r = (e) => {
            e.dispatchEvent(new Event(o));
        },
        a = (e) =>
            !(!e || "object" != typeof e) &&
            void 0 !== (e = void 0 !== e.jquery ? e[0] : e).nodeType,
        s = (e) =>
            a(e)
                ? e.jquery
                    ? e[0]
                    : e
                : "string" == typeof e && 0 < e.length
                ? document.querySelector(n(e))
                : null,
        l = (e) => {
            if (!a(e) || 0 === e.getClientRects().length) return !1;
            var t =
                    "visible" ===
                    getComputedStyle(e).getPropertyValue("visibility"),
                i = e.closest("details:not([open])");
            if (!i) return t;
            if (i !== e) {
                e = e.closest("summary");
                if (e && e.parentNode !== i) return !1;
                if (null === e) return !1;
            }
            return t;
        },
        c = (e) =>
            !e ||
            e.nodeType !== Node.ELEMENT_NODE ||
            !!e.classList.contains("disabled") ||
            (void 0 !== e.disabled
                ? e.disabled
                : e.hasAttribute("disabled") &&
                  "false" !== e.getAttribute("disabled")),
        h = (e) => {
            if (!document.documentElement.attachShadow) return null;
            if ("function" != typeof e.getRootNode)
                return e instanceof ShadowRoot
                    ? e
                    : e.parentNode
                    ? h(e.parentNode)
                    : null;
            e = e.getRootNode();
            return e instanceof ShadowRoot ? e : null;
        },
        d = () => {},
        u = (e) => {
            e.offsetHeight;
        },
        f = () =>
            window.jQuery && !document.body.hasAttribute("data-bs-no-jquery")
                ? window.jQuery
                : null,
        t = [],
        p = () => "rtl" === document.documentElement.dir;
    var e = (n) => {
        var e;
        (e = () => {
            const e = f();
            if (e) {
                const t = n.NAME,
                    i = e.fn[t];
                (e.fn[t] = n.jQueryInterface),
                    (e.fn[t].Constructor = n),
                    (e.fn[t].noConflict = () => (
                        (e.fn[t] = i), n.jQueryInterface
                    ));
            }
        }),
            "loading" === document.readyState
                ? (t.length ||
                      document.addEventListener("DOMContentLoaded", () => {
                          for (const e of t) e();
                      }),
                  t.push(e))
                : e();
    };
    const m = (e, t = [], i = e) => ("function" == typeof e ? e(...t) : i),
        g = (i, n, e = !0) => {
            if (e) {
                e =
                    ((e) => {
                        if (!e) return 0;
                        let { transitionDuration: t, transitionDelay: i } =
                            window.getComputedStyle(e);
                        var n = Number.parseFloat(t),
                            e = Number.parseFloat(i);
                        return n || e
                            ? ((t = t.split(",")[0]),
                              (i = i.split(",")[0]),
                              1e3 *
                                  (Number.parseFloat(t) + Number.parseFloat(i)))
                            : 0;
                    })(n) + 5;
                let t = !1;
                const s = ({ target: e }) => {
                    e === n && ((t = !0), n.removeEventListener(o, s), m(i));
                };
                n.addEventListener(o, s),
                    setTimeout(() => {
                        t || r(n);
                    }, e);
            } else m(i);
        },
        _ = (e, t, i, n) => {
            var s = e.length;
            let o = e.indexOf(t);
            return -1 === o
                ? !i && n
                    ? e[s - 1]
                    : e[0]
                : ((o += i ? 1 : -1),
                  n && (o = (o + s) % s),
                  e[Math.max(0, Math.min(o, s - 1))]);
        },
        b = /[^.]*(?=\..*)\.|.*/,
        i = /\..*/,
        v = /::\d+$/,
        y = {};
    let w = 1;
    const A = { mouseenter: "mouseover", mouseleave: "mouseout" },
        E = new Set([
            "click",
            "dblclick",
            "mouseup",
            "mousedown",
            "contextmenu",
            "mousewheel",
            "DOMMouseScroll",
            "mouseover",
            "mouseout",
            "mousemove",
            "selectstart",
            "selectend",
            "keydown",
            "keypress",
            "keyup",
            "orientationchange",
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointerleave",
            "pointercancel",
            "gesturestart",
            "gesturechange",
            "gestureend",
            "focus",
            "blur",
            "change",
            "reset",
            "select",
            "submit",
            "focusin",
            "focusout",
            "load",
            "unload",
            "beforeunload",
            "resize",
            "move",
            "DOMContentLoaded",
            "readystatechange",
            "error",
            "abort",
            "scroll",
        ]);
    function T(e, t) {
        return (t && `${t}::${w++}`) || e.uidEvent || w++;
    }
    function C(e) {
        var t = T(e);
        return (e.uidEvent = t), (y[t] = y[t] || {}), y[t];
    }
    function O(e, t, i = null) {
        return Object.values(e).find(
            (e) => e.callable === t && e.delegationSelector === i
        );
    }
    function x(e, t, i) {
        var n = "string" == typeof t,
            i = (!n && t) || i;
        let s = S(e);
        return E.has(s) || (s = e), [n, i, s];
    }
    function k(n, s, o, r, a) {
        if ("string" == typeof s && n) {
            let [e, t, i] = x(s, o, r);
            var l;
            s in A &&
                (t =
                    ((l = t),
                    function (e) {
                        if (
                            !e.relatedTarget ||
                            (e.relatedTarget !== e.delegateTarget &&
                                !e.delegateTarget.contains(e.relatedTarget))
                        )
                            return l.call(this, e);
                    }));
            const p = C(n),
                m = p[i] || (p[i] = {}),
                g = O(m, t, e ? o : null);
            if (g) g.oneOff = g.oneOff && a;
            else {
                var c,
                    h,
                    d,
                    u,
                    f,
                    s = T(t, s.replace(b, ""));
                const _ = e
                    ? ((d = n),
                      (u = o),
                      (f = t),
                      function t(i) {
                          var n = d.querySelectorAll(u);
                          for (
                              let { target: e } = i;
                              e && e !== this;
                              e = e.parentNode
                          )
                              for (const s of n)
                                  if (s === e)
                                      return (
                                          I(i, { delegateTarget: e }),
                                          t.oneOff && D.off(d, i.type, u, f),
                                          f.apply(e, [i])
                                      );
                      })
                    : ((c = n),
                      (h = t),
                      function e(t) {
                          return (
                              I(t, { delegateTarget: c }),
                              e.oneOff && D.off(c, t.type, h),
                              h.apply(c, [t])
                          );
                      });
                (_.delegationSelector = e ? o : null),
                    (_.callable = t),
                    (_.oneOff = a),
                    (_.uidEvent = s),
                    (m[s] = _),
                    n.addEventListener(i, _, e);
            }
        }
    }
    function L(e, t, i, n, s) {
        n = O(t[i], n, s);
        n && (e.removeEventListener(i, n, Boolean(s)), delete t[i][n.uidEvent]);
    }
    function S(e) {
        return (e = e.replace(i, "")), A[e] || e;
    }
    const D = {
        on(e, t, i, n) {
            k(e, t, i, n, !1);
        },
        one(e, t, i, n) {
            k(e, t, i, n, !0);
        },
        off(e, t, i, n) {
            if ("string" == typeof t && e) {
                var s,
                    o,
                    [r, a, l] = x(t, i, n),
                    c = l !== t,
                    h = C(e),
                    d = h[l] || {},
                    n = t.startsWith(".");
                if (void 0 !== a)
                    return Object.keys(d).length
                        ? void L(e, h, l, a, r ? i : null)
                        : void 0;
                if (n)
                    for (const f of Object.keys(h))
                        !(function (e, t, i, n) {
                            var s,
                                o,
                                r = t[i] || {};
                            for ([s, o] of Object.entries(r))
                                s.includes(n) &&
                                    L(
                                        e,
                                        t,
                                        i,
                                        o.callable,
                                        o.delegationSelector
                                    );
                        })(e, h, f, t.slice(1));
                for ([s, o] of Object.entries(d)) {
                    var u = s.replace(v, "");
                    (c && !t.includes(u)) ||
                        L(e, h, l, o.callable, o.delegationSelector);
                }
            }
        },
        trigger(e, t, i) {
            if ("string" != typeof t || !e) return null;
            const n = f();
            let s = null,
                o = !0,
                r = !0,
                a = !1;
            t !== S(t) &&
                n &&
                ((s = n.Event(t, i)),
                n(e).trigger(s),
                (o = !s.isPropagationStopped()),
                (r = !s.isImmediatePropagationStopped()),
                (a = s.isDefaultPrevented()));
            let l = new Event(t, { bubbles: o, cancelable: !0 });
            return (
                (l = I(l, i)),
                a && l.preventDefault(),
                r && e.dispatchEvent(l),
                l.defaultPrevented && s && s.preventDefault(),
                l
            );
        },
    };
    function I(t, e = {}) {
        for (const [i, n] of Object.entries(e))
            try {
                t[i] = n;
            } catch (e) {
                Object.defineProperty(t, i, {
                    configurable: !0,
                    get() {
                        return n;
                    },
                });
            }
        return t;
    }
    const N = new Map(),
        P = {
            set(e, t, i) {
                N.has(e) || N.set(e, new Map());
                const n = N.get(e);
                n.has(t) || 0 === n.size
                    ? n.set(t, i)
                    : console.error(
                          `Bootstrap doesn't allow more than one instance per element. Bound instance: ${
                              Array.from(n.keys())[0]
                          }.`
                      );
            },
            get(e, t) {
                return (N.has(e) && N.get(e).get(t)) || null;
            },
            remove(e, t) {
                if (N.has(e)) {
                    const i = N.get(e);
                    i.delete(t), 0 === i.size && N.delete(e);
                }
            },
        };
    function j(t) {
        if ("true" === t) return !0;
        if ("false" === t) return !1;
        if (t === Number(t).toString()) return Number(t);
        if ("" === t || "null" === t) return null;
        if ("string" != typeof t) return t;
        try {
            return JSON.parse(decodeURIComponent(t));
        } catch (e) {
            return t;
        }
    }
    function M(e) {
        return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
    }
    const $ = {
        setDataAttribute(e, t, i) {
            e.setAttribute(`data-bs-${M(t)}`, i);
        },
        removeDataAttribute(e, t) {
            e.removeAttribute(`data-bs-${M(t)}`);
        },
        getDataAttributes(t) {
            if (!t) return {};
            const i = {};
            for (const n of Object.keys(t.dataset).filter(
                (e) => e.startsWith("bs") && !e.startsWith("bsConfig")
            )) {
                let e = n.replace(/^bs/, "");
                (e = e.charAt(0).toLowerCase() + e.slice(1, e.length)),
                    (i[e] = j(t.dataset[n]));
            }
            return i;
        },
        getDataAttribute(e, t) {
            return j(e.getAttribute(`data-bs-${M(t)}`));
        },
    };
    class F {
        static get Default() {
            return {};
        }
        static get DefaultType() {
            return {};
        }
        static get NAME() {
            throw new Error(
                'You have to implement the static method "NAME", for each component!'
            );
        }
        _getConfig(e) {
            return (
                (e = this._mergeConfigObj(e)),
                (e = this._configAfterMerge(e)),
                this._typeCheckConfig(e),
                e
            );
        }
        _configAfterMerge(e) {
            return e;
        }
        _mergeConfigObj(e, t) {
            var i = a(t) ? $.getDataAttribute(t, "config") : {};
            return {
                ...this.constructor.Default,
                ...("object" == typeof i ? i : {}),
                ...(a(t) ? $.getDataAttributes(t) : {}),
                ...("object" == typeof e ? e : {}),
            };
        }
        _typeCheckConfig(e, t = this.constructor.DefaultType) {
            for (var [i, n] of Object.entries(t)) {
                var s = e[i],
                    o = a(s)
                        ? "element"
                        : null == (o = s)
                        ? `${o}`
                        : Object.prototype.toString
                              .call(o)
                              .match(/\s([a-z]+)/i)[1]
                              .toLowerCase();
                if (!new RegExp(n).test(o))
                    throw new TypeError(
                        `${this.constructor.NAME.toUpperCase()}: Option "${i}" provided type "${o}" but expected type "${n}".`
                    );
            }
            var o;
        }
    }
    class H extends F {
        constructor(e, t) {
            super(),
                (e = s(e)) &&
                    ((this._element = e),
                    (this._config = this._getConfig(t)),
                    P.set(this._element, this.constructor.DATA_KEY, this));
        }
        dispose() {
            P.remove(this._element, this.constructor.DATA_KEY),
                D.off(this._element, this.constructor.EVENT_KEY);
            for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
        }
        _queueCallback(e, t, i = !0) {
            g(e, t, i);
        }
        _getConfig(e) {
            return (
                (e = this._mergeConfigObj(e, this._element)),
                (e = this._configAfterMerge(e)),
                this._typeCheckConfig(e),
                e
            );
        }
        static getInstance(e) {
            return P.get(s(e), this.DATA_KEY);
        }
        static getOrCreateInstance(e, t = {}) {
            return (
                this.getInstance(e) ||
                new this(e, "object" == typeof t ? t : null)
            );
        }
        static get VERSION() {
            return "5.3.0-alpha1";
        }
        static get DATA_KEY() {
            return `bs.${this.NAME}`;
        }
        static get EVENT_KEY() {
            return `.${this.DATA_KEY}`;
        }
        static eventName(e) {
            return `${e}${this.EVENT_KEY}`;
        }
    }
    const W = (t) => {
            let i = t.getAttribute("data-bs-target");
            if (!i || "#" === i) {
                let e = t.getAttribute("href");
                if (!e || (!e.includes("#") && !e.startsWith("."))) return null;
                e.includes("#") &&
                    !e.startsWith("#") &&
                    (e = `#${e.split("#")[1]}`),
                    (i = e && "#" !== e ? e.trim() : null);
            }
            return n(i);
        },
        B = {
            find(e, t = document.documentElement) {
                return [].concat(
                    ...Element.prototype.querySelectorAll.call(t, e)
                );
            },
            findOne(e, t = document.documentElement) {
                return Element.prototype.querySelector.call(t, e);
            },
            children(e, t) {
                return [].concat(...e.children).filter((e) => e.matches(t));
            },
            parents(e, t) {
                const i = [];
                let n = e.parentNode.closest(t);
                for (; n; ) i.push(n), (n = n.parentNode.closest(t));
                return i;
            },
            prev(e, t) {
                let i = e.previousElementSibling;
                for (; i; ) {
                    if (i.matches(t)) return [i];
                    i = i.previousElementSibling;
                }
                return [];
            },
            next(e, t) {
                let i = e.nextElementSibling;
                for (; i; ) {
                    if (i.matches(t)) return [i];
                    i = i.nextElementSibling;
                }
                return [];
            },
            focusableChildren(e) {
                var t = [
                    "a",
                    "button",
                    "input",
                    "textarea",
                    "select",
                    "details",
                    "[tabindex]",
                    '[contenteditable="true"]',
                ]
                    .map((e) => `${e}:not([tabindex^="-"])`)
                    .join(",");
                return this.find(t, e).filter((e) => !c(e) && l(e));
            },
            getSelectorFromElement(e) {
                e = W(e);
                return e && B.findOne(e) ? e : null;
            },
            getElementFromSelector(e) {
                e = W(e);
                return e ? B.findOne(e) : null;
            },
            getMultipleElementsFromSelector(e) {
                e = W(e);
                return e ? B.find(e) : [];
            },
        };
    var z = (i, n = "hide") => {
        var e = `click.dismiss${i.EVENT_KEY}`;
        const s = i.NAME;
        D.on(document, e, `[data-bs-dismiss="${s}"]`, function (e) {
            if (
                (["A", "AREA"].includes(this.tagName) && e.preventDefault(),
                !c(this))
            ) {
                e = B.getElementFromSelector(this) || this.closest(`.${s}`);
                const t = i.getOrCreateInstance(e);
                t[n]();
            }
        });
    };
    class R extends H {
        static get NAME() {
            return "alert";
        }
        close() {
            var e;
            D.trigger(this._element, "close.bs.alert").defaultPrevented ||
                (this._element.classList.remove("show"),
                (e = this._element.classList.contains("fade")),
                this._queueCallback(
                    () => this._destroyElement(),
                    this._element,
                    e
                ));
        }
        _destroyElement() {
            this._element.remove(),
                D.trigger(this._element, "closed.bs.alert"),
                this.dispose();
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = R.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (
                        void 0 === e[t] ||
                        t.startsWith("_") ||
                        "constructor" === t
                    )
                        throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    z(R, "close"), e(R);
    const q = '[data-bs-toggle="button"]';
    class V extends H {
        static get NAME() {
            return "button";
        }
        toggle() {
            this._element.setAttribute(
                "aria-pressed",
                this._element.classList.toggle("active")
            );
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = V.getOrCreateInstance(this);
                "toggle" === t && e[t]();
            });
        }
    }
    D.on(document, "click.bs.button.data-api", q, (e) => {
        e.preventDefault();
        e = e.target.closest(q);
        const t = V.getOrCreateInstance(e);
        t.toggle();
    }),
        e(V);
    const K = ".bs.swipe",
        Q =
            (K,
            K,
            K,
            K,
            K,
            { endCallback: null, leftCallback: null, rightCallback: null }),
        X = {
            endCallback: "(function|null)",
            leftCallback: "(function|null)",
            rightCallback: "(function|null)",
        };
    class Y extends F {
        constructor(e, t) {
            super(),
                (this._element = e) &&
                    Y.isSupported() &&
                    ((this._config = this._getConfig(t)),
                    (this._deltaX = 0),
                    (this._supportPointerEvents = Boolean(window.PointerEvent)),
                    this._initEvents());
        }
        static get Default() {
            return Q;
        }
        static get DefaultType() {
            return X;
        }
        static get NAME() {
            return "swipe";
        }
        dispose() {
            D.off(this._element, K);
        }
        _start(e) {
            this._supportPointerEvents
                ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX)
                : (this._deltaX = e.touches[0].clientX);
        }
        _end(e) {
            this._eventIsPointerPenTouch(e) &&
                (this._deltaX = e.clientX - this._deltaX),
                this._handleSwipe(),
                m(this._config.endCallback);
        }
        _move(e) {
            this._deltaX =
                e.touches && 1 < e.touches.length
                    ? 0
                    : e.touches[0].clientX - this._deltaX;
        }
        _handleSwipe() {
            var e = Math.abs(this._deltaX);
            e <= 40 ||
                ((e = e / this._deltaX),
                (this._deltaX = 0),
                e &&
                    m(
                        0 < e
                            ? this._config.rightCallback
                            : this._config.leftCallback
                    ));
        }
        _initEvents() {
            this._supportPointerEvents
                ? (D.on(this._element, "pointerdown.bs.swipe", (e) =>
                      this._start(e)
                  ),
                  D.on(this._element, "pointerup.bs.swipe", (e) =>
                      this._end(e)
                  ),
                  this._element.classList.add("pointer-event"))
                : (D.on(this._element, "touchstart.bs.swipe", (e) =>
                      this._start(e)
                  ),
                  D.on(this._element, "touchmove.bs.swipe", (e) =>
                      this._move(e)
                  ),
                  D.on(this._element, "touchend.bs.swipe", (e) =>
                      this._end(e)
                  ));
        }
        _eventIsPointerPenTouch(e) {
            return (
                this._supportPointerEvents &&
                ("pen" === e.pointerType || "touch" === e.pointerType)
            );
        }
        static isSupported() {
            return (
                "ontouchstart" in document.documentElement ||
                0 < navigator.maxTouchPoints
            );
        }
    }
    var U = ".bs.carousel";
    const G = "next",
        J = "prev",
        Z = "left",
        ee = "right",
        te = `slid${U}`;
    const ie = "carousel",
        ne = "active",
        se = ".active",
        oe = ".carousel-item";
    se, oe;
    const re = { ArrowLeft: ee, ArrowRight: Z },
        ae = {
            interval: 5e3,
            keyboard: !0,
            pause: "hover",
            ride: !1,
            touch: !0,
            wrap: !0,
        },
        le = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            pause: "(string|boolean)",
            ride: "(boolean|string)",
            touch: "boolean",
            wrap: "boolean",
        };
    class ce extends H {
        constructor(e, t) {
            super(e, t),
                (this._interval = null),
                (this._activeElement = null),
                (this._isSliding = !1),
                (this.touchTimeout = null),
                (this._swipeHelper = null),
                (this._indicatorsElement = B.findOne(
                    ".carousel-indicators",
                    this._element
                )),
                this._addEventListeners(),
                this._config.ride === ie && this.cycle();
        }
        static get Default() {
            return ae;
        }
        static get DefaultType() {
            return le;
        }
        static get NAME() {
            return "carousel";
        }
        next() {
            this._slide(G);
        }
        nextWhenVisible() {
            !document.hidden && l(this._element) && this.next();
        }
        prev() {
            this._slide(J);
        }
        pause() {
            this._isSliding && r(this._element), this._clearInterval();
        }
        cycle() {
            this._clearInterval(),
                this._updateInterval(),
                (this._interval = setInterval(
                    () => this.nextWhenVisible(),
                    this._config.interval
                ));
        }
        _maybeEnableCycle() {
            this._config.ride &&
                (this._isSliding
                    ? D.one(this._element, te, () => this.cycle())
                    : this.cycle());
        }
        to(e) {
            var t,
                i = this._getItems();
            e > i.length - 1 ||
                e < 0 ||
                (this._isSliding
                    ? D.one(this._element, te, () => this.to(e))
                    : (t = this._getItemIndex(this._getActive())) !== e &&
                      ((t = t < e ? G : J), this._slide(t, i[e])));
        }
        dispose() {
            this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
        }
        _configAfterMerge(e) {
            return (e.defaultInterval = e.interval), e;
        }
        _addEventListeners() {
            this._config.keyboard &&
                D.on(this._element, "keydown.bs.carousel", (e) =>
                    this._keydown(e)
                ),
                "hover" === this._config.pause &&
                    (D.on(this._element, "mouseenter.bs.carousel", () =>
                        this.pause()
                    ),
                    D.on(this._element, "mouseleave.bs.carousel", () =>
                        this._maybeEnableCycle()
                    )),
                this._config.touch &&
                    Y.isSupported() &&
                    this._addTouchEventListeners();
        }
        _addTouchEventListeners() {
            for (const t of B.find(".carousel-item img", this._element))
                D.on(t, "dragstart.bs.carousel", (e) => e.preventDefault());
            var e = {
                leftCallback: () => this._slide(this._directionToOrder(Z)),
                rightCallback: () => this._slide(this._directionToOrder(ee)),
                endCallback: () => {
                    "hover" === this._config.pause &&
                        (this.pause(),
                        this.touchTimeout && clearTimeout(this.touchTimeout),
                        (this.touchTimeout = setTimeout(
                            () => this._maybeEnableCycle(),
                            500 + this._config.interval
                        )));
                },
            };
            this._swipeHelper = new Y(this._element, e);
        }
        _keydown(e) {
            var t;
            /input|textarea/i.test(e.target.tagName) ||
                ((t = re[e.key]) &&
                    (e.preventDefault(),
                    this._slide(this._directionToOrder(t))));
        }
        _getItemIndex(e) {
            return this._getItems().indexOf(e);
        }
        _setActiveIndicatorElement(e) {
            if (this._indicatorsElement) {
                const t = B.findOne(se, this._indicatorsElement);
                t.classList.remove(ne), t.removeAttribute("aria-current");
                const i = B.findOne(
                    `[data-bs-slide-to="${e}"]`,
                    this._indicatorsElement
                );
                i &&
                    (i.classList.add(ne),
                    i.setAttribute("aria-current", "true"));
            }
        }
        _updateInterval() {
            const e = this._activeElement || this._getActive();
            var t;
            e &&
                ((t = Number.parseInt(e.getAttribute("data-bs-interval"), 10)),
                (this._config.interval = t || this._config.defaultInterval));
        }
        _slide(t, e = null) {
            if (!this._isSliding) {
                const n = this._getActive();
                var i = t === G;
                const s = e || _(this._getItems(), n, i, this._config.wrap);
                if (s !== n) {
                    const o = this._getItemIndex(s),
                        r = (e) =>
                            D.trigger(this._element, e, {
                                relatedTarget: s,
                                direction: this._orderToDirection(t),
                                from: this._getItemIndex(n),
                                to: o,
                            });
                    e = r("slide.bs.carousel");
                    if (!e.defaultPrevented && n && s) {
                        e = Boolean(this._interval);
                        this.pause(),
                            (this._isSliding = !0),
                            this._setActiveIndicatorElement(o),
                            (this._activeElement = s);
                        const a = i
                                ? "carousel-item-start"
                                : "carousel-item-end",
                            l = i ? "carousel-item-next" : "carousel-item-prev";
                        s.classList.add(l),
                            u(s),
                            n.classList.add(a),
                            s.classList.add(a);
                        this._queueCallback(
                            () => {
                                s.classList.remove(a, l),
                                    s.classList.add(ne),
                                    n.classList.remove(ne, l, a),
                                    (this._isSliding = !1),
                                    r(te);
                            },
                            n,
                            this._isAnimated()
                        ),
                            e && this.cycle();
                    }
                }
            }
        }
        _isAnimated() {
            return this._element.classList.contains("slide");
        }
        _getActive() {
            return B.findOne(".active.carousel-item", this._element);
        }
        _getItems() {
            return B.find(oe, this._element);
        }
        _clearInterval() {
            this._interval &&
                (clearInterval(this._interval), (this._interval = null));
        }
        _directionToOrder(e) {
            return p() ? (e === Z ? J : G) : e === Z ? G : J;
        }
        _orderToDirection(e) {
            return p() ? (e === J ? Z : ee) : e === J ? ee : Z;
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = ce.getOrCreateInstance(this, t);
                if ("number" != typeof t) {
                    if ("string" == typeof t) {
                        if (
                            void 0 === e[t] ||
                            t.startsWith("_") ||
                            "constructor" === t
                        )
                            throw new TypeError(`No method named "${t}"`);
                        e[t]();
                    }
                } else e.to(t);
            });
        }
    }
    D.on(
        document,
        "click.bs.carousel.data-api",
        "[data-bs-slide], [data-bs-slide-to]",
        function (e) {
            const t = B.getElementFromSelector(this);
            if (t && t.classList.contains(ie)) {
                e.preventDefault();
                const i = ce.getOrCreateInstance(t);
                e = this.getAttribute("data-bs-slide-to");
                return e
                    ? (i.to(e), void i._maybeEnableCycle())
                    : ("next" === $.getDataAttribute(this, "slide")
                          ? i.next()
                          : i.prev(),
                      void i._maybeEnableCycle());
            }
        }
    ),
        D.on(window, "load.bs.carousel.data-api", () => {
            for (const e of B.find('[data-bs-ride="carousel"]'))
                ce.getOrCreateInstance(e);
        }),
        e(ce);
    const he = "show",
        de = "collapse",
        ue = "collapsing",
        fe = (de, de, '[data-bs-toggle="collapse"]'),
        pe = { parent: null, toggle: !0 },
        me = { parent: "(null|element)", toggle: "boolean" };
    class ge extends H {
        constructor(e, t) {
            super(e, t),
                (this._isTransitioning = !1),
                (this._triggerArray = []);
            for (const s of B.find(fe)) {
                var i = B.getSelectorFromElement(s),
                    n = B.find(i).filter((e) => e === this._element);
                null !== i && n.length && this._triggerArray.push(s);
            }
            this._initializeChildren(),
                this._config.parent ||
                    this._addAriaAndCollapsedClass(
                        this._triggerArray,
                        this._isShown()
                    ),
                this._config.toggle && this.toggle();
        }
        static get Default() {
            return pe;
        }
        static get DefaultType() {
            return me;
        }
        static get NAME() {
            return "collapse";
        }
        toggle() {
            this._isShown() ? this.hide() : this.show();
        }
        show() {
            if (!this._isTransitioning && !this._isShown()) {
                let e = [];
                if (
                    (this._config.parent &&
                        (e = this._getFirstLevelChildren(
                            ".collapse.show, .collapse.collapsing"
                        )
                            .filter((e) => e !== this._element)
                            .map((e) =>
                                ge.getOrCreateInstance(e, { toggle: !1 })
                            )),
                    !e.length || !e[0]._isTransitioning)
                )
                    if (
                        !D.trigger(this._element, "show.bs.collapse")
                            .defaultPrevented
                    ) {
                        for (const n of e) n.hide();
                        const i = this._getDimension();
                        this._element.classList.remove(de),
                            this._element.classList.add(ue),
                            (this._element.style[i] = 0),
                            this._addAriaAndCollapsedClass(
                                this._triggerArray,
                                !0
                            ),
                            (this._isTransitioning = !0);
                        var t = `scroll${i[0].toUpperCase() + i.slice(1)}`;
                        this._queueCallback(
                            () => {
                                (this._isTransitioning = !1),
                                    this._element.classList.remove(ue),
                                    this._element.classList.add(de, he),
                                    (this._element.style[i] = ""),
                                    D.trigger(
                                        this._element,
                                        "shown.bs.collapse"
                                    );
                            },
                            this._element,
                            !0
                        ),
                            (this._element.style[i] = `${this._element[t]}px`);
                    }
            }
        }
        hide() {
            if (
                !this._isTransitioning &&
                this._isShown() &&
                !D.trigger(this._element, "hide.bs.collapse").defaultPrevented
            ) {
                var e = this._getDimension();
                (this._element.style[e] = `${
                    this._element.getBoundingClientRect()[e]
                }px`),
                    u(this._element),
                    this._element.classList.add(ue),
                    this._element.classList.remove(de, he);
                for (const i of this._triggerArray) {
                    var t = B.getElementFromSelector(i);
                    t &&
                        !this._isShown(t) &&
                        this._addAriaAndCollapsedClass([i], !1);
                }
                this._isTransitioning = !0;
                (this._element.style[e] = ""),
                    this._queueCallback(
                        () => {
                            (this._isTransitioning = !1),
                                this._element.classList.remove(ue),
                                this._element.classList.add(de),
                                D.trigger(this._element, "hidden.bs.collapse");
                        },
                        this._element,
                        !0
                    );
            }
        }
        _isShown(e = this._element) {
            return e.classList.contains(he);
        }
        _configAfterMerge(e) {
            return (e.toggle = Boolean(e.toggle)), (e.parent = s(e.parent)), e;
        }
        _getDimension() {
            return this._element.classList.contains("collapse-horizontal")
                ? "width"
                : "height";
        }
        _initializeChildren() {
            if (this._config.parent)
                for (const t of this._getFirstLevelChildren(fe)) {
                    var e = B.getElementFromSelector(t);
                    e && this._addAriaAndCollapsedClass([t], this._isShown(e));
                }
        }
        _getFirstLevelChildren(e) {
            const t = B.find(":scope .collapse .collapse", this._config.parent);
            return B.find(e, this._config.parent).filter((e) => !t.includes(e));
        }
        _addAriaAndCollapsedClass(e, t) {
            if (e.length)
                for (const i of e)
                    i.classList.toggle("collapsed", !t),
                        i.setAttribute("aria-expanded", t);
        }
        static jQueryInterface(t) {
            const i = {};
            return (
                "string" == typeof t && /show|hide/.test(t) && (i.toggle = !1),
                this.each(function () {
                    const e = ge.getOrCreateInstance(this, i);
                    if ("string" == typeof t) {
                        if (void 0 === e[t])
                            throw new TypeError(`No method named "${t}"`);
                        e[t]();
                    }
                })
            );
        }
    }
    D.on(document, "click.bs.collapse.data-api", fe, function (e) {
        ("A" === e.target.tagName ||
            (e.delegateTarget && "A" === e.delegateTarget.tagName)) &&
            e.preventDefault();
        for (const t of B.getMultipleElementsFromSelector(this))
            ge.getOrCreateInstance(t, { toggle: !1 }).toggle();
    }),
        e(ge);
    var _e = "top",
        be = "bottom",
        ve = "right",
        ye = "left",
        we = "auto",
        Ae = [_e, be, ve, ye],
        Ee = "start",
        Te = "end",
        Ce = "clippingParents",
        Oe = "viewport",
        xe = "popper",
        ke = "reference",
        Le = Ae.reduce(function (e, t) {
            return e.concat([t + "-" + Ee, t + "-" + Te]);
        }, []),
        Se = [].concat(Ae, [we]).reduce(function (e, t) {
            return e.concat([t, t + "-" + Ee, t + "-" + Te]);
        }, []),
        De = "beforeRead",
        Ie = "afterRead",
        Ne = "beforeMain",
        Pe = "afterMain",
        je = "beforeWrite",
        Me = "afterWrite",
        $e = [De, "read", Ie, Ne, "main", Pe, je, "write", Me];
    function Fe(e) {
        return e ? (e.nodeName || "").toLowerCase() : null;
    }
    function He(e) {
        if (null == e) return window;
        if ("[object Window]" === e.toString()) return e;
        e = e.ownerDocument;
        return (e && e.defaultView) || window;
    }
    function We(e) {
        return e instanceof He(e).Element || e instanceof Element;
    }
    function Be(e) {
        return e instanceof He(e).HTMLElement || e instanceof HTMLElement;
    }
    function ze(e) {
        return (
            "undefined" != typeof ShadowRoot &&
            (e instanceof He(e).ShadowRoot || e instanceof ShadowRoot)
        );
    }
    var Re = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (e) {
            var s = e.state;
            Object.keys(s.elements).forEach(function (e) {
                var t = s.styles[e] || {},
                    i = s.attributes[e] || {},
                    n = s.elements[e];
                Be(n) &&
                    Fe(n) &&
                    (Object.assign(n.style, t),
                    Object.keys(i).forEach(function (e) {
                        var t = i[e];
                        !1 === t
                            ? n.removeAttribute(e)
                            : n.setAttribute(e, !0 === t ? "" : t);
                    }));
            });
        },
        effect: function (e) {
            var n = e.state,
                s = {
                    popper: {
                        position: n.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0",
                    },
                    arrow: { position: "absolute" },
                    reference: {},
                };
            return (
                Object.assign(n.elements.popper.style, s.popper),
                (n.styles = s),
                n.elements.arrow &&
                    Object.assign(n.elements.arrow.style, s.arrow),
                function () {
                    Object.keys(n.elements).forEach(function (e) {
                        var t = n.elements[e],
                            i = n.attributes[e] || {},
                            e = Object.keys(
                                (n.styles.hasOwnProperty(e) ? n.styles : s)[e]
                            ).reduce(function (e, t) {
                                return (e[t] = ""), e;
                            }, {});
                        Be(t) &&
                            Fe(t) &&
                            (Object.assign(t.style, e),
                            Object.keys(i).forEach(function (e) {
                                t.removeAttribute(e);
                            }));
                    });
                }
            );
        },
        requires: ["computeStyles"],
    };
    function qe(e) {
        return e.split("-")[0];
    }
    var Ve = Math.max,
        Ke = Math.min,
        Qe = Math.round;
    function Xe() {
        var e = navigator.userAgentData;
        return null != e && e.brands
            ? e.brands
                  .map(function (e) {
                      return e.brand + "/" + e.version;
                  })
                  .join(" ")
            : navigator.userAgent;
    }
    function Ye() {
        return !/^((?!chrome|android).)*safari/i.test(Xe());
    }
    function Ue(e, t, i) {
        void 0 === t && (t = !1), void 0 === i && (i = !1);
        var n = e.getBoundingClientRect(),
            s = 1,
            o = 1;
        t &&
            Be(e) &&
            ((s = (0 < e.offsetWidth && Qe(n.width) / e.offsetWidth) || 1),
            (o = (0 < e.offsetHeight && Qe(n.height) / e.offsetHeight) || 1));
        (t = (We(e) ? He(e) : window).visualViewport),
            (e = !Ye() && i),
            (i = (n.left + (e && t ? t.offsetLeft : 0)) / s),
            (t = (n.top + (e && t ? t.offsetTop : 0)) / o),
            (s = n.width / s),
            (o = n.height / o);
        return {
            width: s,
            height: o,
            top: t,
            right: i + s,
            bottom: t + o,
            left: i,
            x: i,
            y: t,
        };
    }
    function Ge(e) {
        var t = Ue(e),
            i = e.offsetWidth,
            n = e.offsetHeight;
        return (
            Math.abs(t.width - i) <= 1 && (i = t.width),
            Math.abs(t.height - n) <= 1 && (n = t.height),
            { x: e.offsetLeft, y: e.offsetTop, width: i, height: n }
        );
    }
    function Je(e, t) {
        var i = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (i && ze(i)) {
            var n = t;
            do {
                if (n && e.isSameNode(n)) return !0;
            } while ((n = n.parentNode || n.host));
        }
        return !1;
    }
    function Ze(e) {
        return He(e).getComputedStyle(e);
    }
    function et(e) {
        return (
            (We(e) ? e.ownerDocument : e.document) || window.document
        ).documentElement;
    }
    function tt(e) {
        return "html" === Fe(e)
            ? e
            : e.assignedSlot ||
                  e.parentNode ||
                  (ze(e) ? e.host : null) ||
                  et(e);
    }
    function it(e) {
        return Be(e) && "fixed" !== Ze(e).position ? e.offsetParent : null;
    }
    function nt(e) {
        for (
            var t = He(e), i = it(e);
            i &&
            0 <= ["table", "td", "th"].indexOf(Fe(i)) &&
            "static" === Ze(i).position;

        )
            i = it(i);
        return (
            ((!i ||
                ("html" !== Fe(i) &&
                    ("body" !== Fe(i) || "static" !== Ze(i).position))) &&
                (i ||
                    (function (e) {
                        var t = /firefox/i.test(Xe()),
                            i = /Trident/i.test(Xe());
                        if (i && Be(e) && "fixed" === Ze(e).position)
                            return null;
                        var n = tt(e);
                        for (
                            ze(n) && (n = n.host);
                            Be(n) && ["html", "body"].indexOf(Fe(n)) < 0;

                        ) {
                            var s = Ze(n);
                            if (
                                "none" !== s.transform ||
                                "none" !== s.perspective ||
                                "paint" === s.contain ||
                                -1 !==
                                    ["transform", "perspective"].indexOf(
                                        s.willChange
                                    ) ||
                                (t && "filter" === s.willChange) ||
                                (t && s.filter && "none" !== s.filter)
                            )
                                return n;
                            n = n.parentNode;
                        }
                        return null;
                    })(e))) ||
            t
        );
    }
    function st(e) {
        return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y";
    }
    function ot(e, t, i) {
        return Ve(e, Ke(t, i));
    }
    function rt() {
        return { top: 0, right: 0, bottom: 0, left: 0 };
    }
    function at(e) {
        return Object.assign({}, rt(), e);
    }
    function lt(i, e) {
        return e.reduce(function (e, t) {
            return (e[t] = i), e;
        }, {});
    }
    var ct = {
        name: "arrow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
            var t,
                i,
                n = e.state,
                s = e.name,
                o = e.options,
                r = n.elements.arrow,
                a = n.modifiersData.popperOffsets,
                l = qe(n.placement),
                c = st(l),
                h = 0 <= [ye, ve].indexOf(l) ? "height" : "width";
            r &&
                a &&
                ((t = o.padding),
                (i = n),
                (e = at(
                    "number" !=
                        typeof (t =
                            "function" == typeof t
                                ? t(
                                      Object.assign({}, i.rects, {
                                          placement: i.placement,
                                      })
                                  )
                                : t)
                        ? t
                        : lt(t, Ae)
                )),
                (l = Ge(r)),
                (o = "y" === c ? _e : ye),
                (i = "y" === c ? be : ve),
                (t =
                    n.rects.reference[h] +
                    n.rects.reference[c] -
                    a[c] -
                    n.rects.popper[h]),
                (a = a[c] - n.rects.reference[c]),
                (r = (r = nt(r))
                    ? "y" === c
                        ? r.clientHeight || 0
                        : r.clientWidth || 0
                    : 0),
                (o = e[o]),
                (i = r - l[h] - e[i]),
                (i = ot(o, (a = r / 2 - l[h] / 2 + (t / 2 - a / 2)), i)),
                (n.modifiersData[s] =
                    (((s = {})[c] = i), (s.centerOffset = i - a), s)));
        },
        effect: function (e) {
            var t = e.state;
            null !=
                (e =
                    void 0 === (e = e.options.element)
                        ? "[data-popper-arrow]"
                        : e) &&
                ("string" != typeof e ||
                    (e = t.elements.popper.querySelector(e))) &&
                Je(t.elements.popper, e) &&
                (t.elements.arrow = e);
        },
        requires: ["popperOffsets"],
        requiresIfExists: ["preventOverflow"],
    };
    function ht(e) {
        return e.split("-")[1];
    }
    var dt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
    function ut(e) {
        var t = e.popper,
            i = e.popperRect,
            n = e.placement,
            s = e.variation,
            o = e.offsets,
            r = e.position,
            a = e.gpuAcceleration,
            l = e.adaptive,
            c = e.roundOffsets,
            h = e.isFixed,
            d = o.x,
            u = void 0 === d ? 0 : d,
            f = o.y,
            p = void 0 === f ? 0 : f,
            m = "function" == typeof c ? c({ x: u, y: p }) : { x: u, y: p },
            u = m.x,
            p = m.y,
            g = o.hasOwnProperty("x"),
            _ = o.hasOwnProperty("y"),
            b = ye,
            e = _e,
            d = window;
        l &&
            ((f = "clientHeight"),
            (m = "clientWidth"),
            (o = nt(t)) === He(t) &&
                "static" !== Ze((o = et(t))).position &&
                "absolute" === r &&
                ((f = "scrollHeight"), (m = "scrollWidth")),
            (n !== _e && ((n !== ye && n !== ve) || s !== Te)) ||
                ((e = be),
                (p -=
                    (h && o === d && d.visualViewport
                        ? d.visualViewport.height
                        : o[f]) - i.height),
                (p *= a ? 1 : -1)),
            (n !== ye && ((n !== _e && n !== be) || s !== Te)) ||
                ((b = ve),
                (u -=
                    (h && o === d && d.visualViewport
                        ? d.visualViewport.width
                        : o[m]) - i.width),
                (u *= a ? 1 : -1)));
        var v,
            r = Object.assign({ position: r }, l && dt),
            v =
                !0 === c
                    ? ((l = (v = { x: u, y: p }).x),
                      (c = v.y),
                      (v = window.devicePixelRatio || 1),
                      { x: Qe(l * v) / v || 0, y: Qe(c * v) / v || 0 })
                    : { x: u, y: p };
        return (
            (u = v.x),
            (p = v.y),
            a
                ? Object.assign(
                      {},
                      r,
                      (((a = {})[e] = _ ? "0" : ""),
                      (a[b] = g ? "0" : ""),
                      (a.transform =
                          (d.devicePixelRatio || 1) <= 1
                              ? "translate(" + u + "px, " + p + "px)"
                              : "translate3d(" + u + "px, " + p + "px, 0)"),
                      a)
                  )
                : Object.assign(
                      {},
                      r,
                      (((r = {})[e] = _ ? p + "px" : ""),
                      (r[b] = g ? u + "px" : ""),
                      (r.transform = ""),
                      r)
                  )
        );
    }
    var ft = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function (e) {
                var t = e.state,
                    i = e.options,
                    e = void 0 === (n = i.gpuAcceleration) || n,
                    n = void 0 === (n = i.adaptive) || n,
                    i = void 0 === (i = i.roundOffsets) || i,
                    e = {
                        placement: qe(t.placement),
                        variation: ht(t.placement),
                        popper: t.elements.popper,
                        popperRect: t.rects.popper,
                        gpuAcceleration: e,
                        isFixed: "fixed" === t.options.strategy,
                    };
                null != t.modifiersData.popperOffsets &&
                    (t.styles.popper = Object.assign(
                        {},
                        t.styles.popper,
                        ut(
                            Object.assign({}, e, {
                                offsets: t.modifiersData.popperOffsets,
                                position: t.options.strategy,
                                adaptive: n,
                                roundOffsets: i,
                            })
                        )
                    )),
                    null != t.modifiersData.arrow &&
                        (t.styles.arrow = Object.assign(
                            {},
                            t.styles.arrow,
                            ut(
                                Object.assign({}, e, {
                                    offsets: t.modifiersData.arrow,
                                    position: "absolute",
                                    adaptive: !1,
                                    roundOffsets: i,
                                })
                            )
                        )),
                    (t.attributes.popper = Object.assign(
                        {},
                        t.attributes.popper,
                        { "data-popper-placement": t.placement }
                    ));
            },
            data: {},
        },
        pt = { passive: !0 };
    var mt = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function () {},
            effect: function (e) {
                var t = e.state,
                    i = e.instance,
                    n = e.options,
                    s = void 0 === (e = n.scroll) || e,
                    o = void 0 === (n = n.resize) || n,
                    r = He(t.elements.popper),
                    a = [].concat(
                        t.scrollParents.reference,
                        t.scrollParents.popper
                    );
                return (
                    s &&
                        a.forEach(function (e) {
                            e.addEventListener("scroll", i.update, pt);
                        }),
                    o && r.addEventListener("resize", i.update, pt),
                    function () {
                        s &&
                            a.forEach(function (e) {
                                e.removeEventListener("scroll", i.update, pt);
                            }),
                            o && r.removeEventListener("resize", i.update, pt);
                    }
                );
            },
            data: {},
        },
        gt = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function _t(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
            return gt[e];
        });
    }
    var bt = { start: "end", end: "start" };
    function vt(e) {
        return e.replace(/start|end/g, function (e) {
            return bt[e];
        });
    }
    function yt(e) {
        e = He(e);
        return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
    }
    function wt(e) {
        return Ue(et(e)).left + yt(e).scrollLeft;
    }
    function At(e) {
        var t = Ze(e),
            i = t.overflow,
            e = t.overflowX,
            t = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(i + t + e);
    }
    function Et(e, t) {
        void 0 === t && (t = []);
        var i = (function e(t) {
                return 0 <= ["html", "body", "#document"].indexOf(Fe(t))
                    ? t.ownerDocument.body
                    : Be(t) && At(t)
                    ? t
                    : e(tt(t));
            })(e),
            e = i === (null == (n = e.ownerDocument) ? void 0 : n.body),
            n = He(i),
            i = e ? [n].concat(n.visualViewport || [], At(i) ? i : []) : i,
            t = t.concat(i);
        return e ? t : t.concat(Et(tt(i)));
    }
    function Tt(e) {
        return Object.assign({}, e, {
            left: e.x,
            top: e.y,
            right: e.x + e.width,
            bottom: e.y + e.height,
        });
    }
    function Ct(e, t, i) {
        return t === Oe
            ? Tt(
                  ((r = i),
                  (a = He((o = e))),
                  (l = et(o)),
                  (c = a.visualViewport),
                  (h = l.clientWidth),
                  (d = l.clientHeight),
                  (a = u = 0),
                  c &&
                      ((h = c.width),
                      (d = c.height),
                      ((l = Ye()) || (!l && "fixed" === r)) &&
                          ((u = c.offsetLeft), (a = c.offsetTop))),
                  { width: h, height: d, x: u + wt(o), y: a })
              )
            : We(t)
            ? (((s = Ue((n = t), !1, "fixed" === (s = i))).top =
                  s.top + n.clientTop),
              (s.left = s.left + n.clientLeft),
              (s.bottom = s.top + n.clientHeight),
              (s.right = s.left + n.clientWidth),
              (s.width = n.clientWidth),
              (s.height = n.clientHeight),
              (s.x = s.left),
              (s.y = s.top),
              s)
            : Tt(
                  ((a = et(e)),
                  (t = et(a)),
                  (i = yt(a)),
                  (s = null == (n = a.ownerDocument) ? void 0 : n.body),
                  (e = Ve(
                      t.scrollWidth,
                      t.clientWidth,
                      s ? s.scrollWidth : 0,
                      s ? s.clientWidth : 0
                  )),
                  (n = Ve(
                      t.scrollHeight,
                      t.clientHeight,
                      s ? s.scrollHeight : 0,
                      s ? s.clientHeight : 0
                  )),
                  (a = -i.scrollLeft + wt(a)),
                  (i = -i.scrollTop),
                  "rtl" === Ze(s || t).direction &&
                      (a += Ve(t.clientWidth, s ? s.clientWidth : 0) - e),
                  { width: e, height: n, x: a, y: i })
              );
        var n, s, o, r, a, l, c, h, d, u;
    }
    function Ot(i, e, t, n) {
        var s,
            o,
            r,
            e =
                "clippingParents" === e
                    ? ((o = Et(tt((s = i)))),
                      We(
                          (r =
                              0 <=
                                  ["absolute", "fixed"].indexOf(
                                      Ze(s).position
                                  ) && Be(s)
                                  ? nt(s)
                                  : s)
                      )
                          ? o.filter(function (e) {
                                return We(e) && Je(e, r) && "body" !== Fe(e);
                            })
                          : [])
                    : [].concat(e),
            e = [].concat(e, [t]),
            t = e[0],
            t = e.reduce(function (e, t) {
                t = Ct(i, t, n);
                return (
                    (e.top = Ve(t.top, e.top)),
                    (e.right = Ke(t.right, e.right)),
                    (e.bottom = Ke(t.bottom, e.bottom)),
                    (e.left = Ve(t.left, e.left)),
                    e
                );
            }, Ct(i, t, n));
        return (
            (t.width = t.right - t.left),
            (t.height = t.bottom - t.top),
            (t.x = t.left),
            (t.y = t.top),
            t
        );
    }
    function xt(e) {
        var t,
            i = e.reference,
            n = e.element,
            s = e.placement,
            e = s ? qe(s) : null,
            s = s ? ht(s) : null,
            o = i.x + i.width / 2 - n.width / 2,
            r = i.y + i.height / 2 - n.height / 2;
        switch (e) {
            case _e:
                t = { x: o, y: i.y - n.height };
                break;
            case be:
                t = { x: o, y: i.y + i.height };
                break;
            case ve:
                t = { x: i.x + i.width, y: r };
                break;
            case ye:
                t = { x: i.x - n.width, y: r };
                break;
            default:
                t = { x: i.x, y: i.y };
        }
        var a = e ? st(e) : null;
        if (null != a) {
            var l = "y" === a ? "height" : "width";
            switch (s) {
                case Ee:
                    t[a] = t[a] - (i[l] / 2 - n[l] / 2);
                    break;
                case Te:
                    t[a] = t[a] + (i[l] / 2 - n[l] / 2);
            }
        }
        return t;
    }
    function kt(e, t) {
        var n,
            i = (t = void 0 === t ? {} : t).placement,
            s = void 0 === i ? e.placement : i,
            o = t.strategy,
            r = void 0 === o ? e.strategy : o,
            a = t.boundary,
            l = void 0 === a ? Ce : a,
            c = t.rootBoundary,
            i = void 0 === c ? Oe : c,
            o = t.elementContext,
            a = void 0 === o ? xe : o,
            c = t.altBoundary,
            o = void 0 !== c && c,
            c = t.padding,
            t = void 0 === c ? 0 : c,
            c = at("number" != typeof t ? t : lt(t, Ae)),
            t = e.rects.popper,
            o = e.elements[o ? (a === xe ? ke : xe) : a],
            l = Ot(
                We(o) ? o : o.contextElement || et(e.elements.popper),
                l,
                i,
                r
            ),
            i = Ue(e.elements.reference),
            r = xt({
                reference: i,
                element: t,
                strategy: "absolute",
                placement: s,
            }),
            r = Tt(Object.assign({}, t, r)),
            i = a === xe ? r : i,
            h = {
                top: l.top - i.top + c.top,
                bottom: i.bottom - l.bottom + c.bottom,
                left: l.left - i.left + c.left,
                right: i.right - l.right + c.right,
            },
            e = e.modifiersData.offset;
        return (
            a === xe &&
                e &&
                ((n = e[s]),
                Object.keys(h).forEach(function (e) {
                    var t = 0 <= [ve, be].indexOf(e) ? 1 : -1,
                        i = 0 <= [_e, be].indexOf(e) ? "y" : "x";
                    h[e] += n[i] * t;
                })),
            h
        );
    }
    var Lt = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function (e) {
            var d = e.state,
                t = e.options,
                i = e.name;
            if (!d.modifiersData[i]._skip) {
                for (
                    var n = t.mainAxis,
                        s = void 0 === n || n,
                        e = t.altAxis,
                        o = void 0 === e || e,
                        n = t.fallbackPlacements,
                        u = t.padding,
                        f = t.boundary,
                        p = t.rootBoundary,
                        r = t.altBoundary,
                        e = t.flipVariations,
                        m = void 0 === e || e,
                        g = t.allowedAutoPlacements,
                        e = d.options.placement,
                        t = qe(e),
                        t =
                            n ||
                            (t === e || !m
                                ? [_t(e)]
                                : (function (e) {
                                      if (qe(e) === we) return [];
                                      var t = _t(e);
                                      return [vt(e), t, vt(t)];
                                  })(e)),
                        a = [e].concat(t).reduce(function (e, t) {
                            return e.concat(
                                qe(t) === we
                                    ? ((i = d),
                                      (s = (n =
                                          void 0 ===
                                          (n = {
                                              placement: t,
                                              boundary: f,
                                              rootBoundary: p,
                                              padding: u,
                                              flipVariations: m,
                                              allowedAutoPlacements: g,
                                          })
                                              ? {}
                                              : n).placement),
                                      (o = n.boundary),
                                      (r = n.rootBoundary),
                                      (a = n.padding),
                                      (e = n.flipVariations),
                                      (l =
                                          void 0 ===
                                          (n = n.allowedAutoPlacements)
                                              ? Se
                                              : n),
                                      (c = ht(s)),
                                      (s = c
                                          ? e
                                              ? Le
                                              : Le.filter(function (e) {
                                                    return ht(e) === c;
                                                })
                                          : Ae),
                                      (h = (e =
                                          0 ===
                                          (e = s.filter(function (e) {
                                              return 0 <= l.indexOf(e);
                                          })).length
                                              ? s
                                              : e).reduce(function (e, t) {
                                          return (
                                              (e[t] = kt(i, {
                                                  placement: t,
                                                  boundary: o,
                                                  rootBoundary: r,
                                                  padding: a,
                                              })[qe(t)]),
                                              e
                                          );
                                      }, {})),
                                      Object.keys(h).sort(function (e, t) {
                                          return h[e] - h[t];
                                      }))
                                    : t
                            );
                            var i, n, s, o, r, a, l, c, h;
                        }, []),
                        l = d.rects.reference,
                        c = d.rects.popper,
                        h = new Map(),
                        _ = !0,
                        b = a[0],
                        v = 0;
                    v < a.length;
                    v++
                ) {
                    var y = a[v],
                        w = qe(y),
                        A = ht(y) === Ee,
                        E = 0 <= [_e, be].indexOf(w),
                        T = E ? "width" : "height",
                        C = kt(d, {
                            placement: y,
                            boundary: f,
                            rootBoundary: p,
                            altBoundary: r,
                            padding: u,
                        }),
                        E = E ? (A ? ve : ye) : A ? be : _e;
                    l[T] > c[T] && (E = _t(E));
                    (A = _t(E)), (T = []);
                    if (
                        (s && T.push(C[w] <= 0),
                        o && T.push(C[E] <= 0, C[A] <= 0),
                        T.every(function (e) {
                            return e;
                        }))
                    ) {
                        (b = y), (_ = !1);
                        break;
                    }
                    h.set(y, T);
                }
                if (_)
                    for (var O = m ? 3 : 1; 0 < O; O--)
                        if (
                            "break" ===
                            (function (t) {
                                var e = a.find(function (e) {
                                    e = h.get(e);
                                    if (e)
                                        return e
                                            .slice(0, t)
                                            .every(function (e) {
                                                return e;
                                            });
                                });
                                if (e) return (b = e), "break";
                            })(O)
                        )
                            break;
                d.placement !== b &&
                    ((d.modifiersData[i]._skip = !0),
                    (d.placement = b),
                    (d.reset = !0));
            }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 },
    };
    function St(e, t, i) {
        return {
            top: e.top - t.height - (i = void 0 === i ? { x: 0, y: 0 } : i).y,
            right: e.right - t.width + i.x,
            bottom: e.bottom - t.height + i.y,
            left: e.left - t.width - i.x,
        };
    }
    function Dt(t) {
        return [_e, ve, be, ye].some(function (e) {
            return 0 <= t[e];
        });
    }
    var It = {
        name: "hide",
        enabled: !0,
        phase: "main",
        requiresIfExists: ["preventOverflow"],
        fn: function (e) {
            var t = e.state,
                i = e.name,
                n = t.rects.reference,
                s = t.rects.popper,
                o = t.modifiersData.preventOverflow,
                r = kt(t, { elementContext: "reference" }),
                e = kt(t, { altBoundary: !0 }),
                n = St(r, n),
                e = St(e, s, o),
                s = Dt(n),
                o = Dt(e);
            (t.modifiersData[i] = {
                referenceClippingOffsets: n,
                popperEscapeOffsets: e,
                isReferenceHidden: s,
                hasPopperEscaped: o,
            }),
                (t.attributes.popper = Object.assign({}, t.attributes.popper, {
                    "data-popper-reference-hidden": s,
                    "data-popper-escaped": o,
                }));
        },
    };
    U = {
        name: "offset",
        enabled: !0,
        phase: "main",
        requires: ["popperOffsets"],
        fn: function (e) {
            var r = e.state,
                t = e.options,
                i = e.name,
                a = void 0 === (n = t.offset) ? [0, 0] : n,
                e = Se.reduce(function (e, t) {
                    var i, n, s, o;
                    return (
                        (e[t] =
                            ((i = t),
                            (n = r.rects),
                            (s = a),
                            (o = qe(i)),
                            (t = 0 <= [ye, _e].indexOf(o) ? -1 : 1),
                            (s =
                                (s = (i =
                                    "function" == typeof s
                                        ? s(
                                              Object.assign({}, n, {
                                                  placement: i,
                                              })
                                          )
                                        : s)[0]) || 0),
                            (i = ((i = i[1]) || 0) * t),
                            0 <= [ye, ve].indexOf(o)
                                ? { x: i, y: s }
                                : { x: s, y: i })),
                        e
                    );
                }, {}),
                n = (t = e[r.placement]).x,
                t = t.y;
            null != r.modifiersData.popperOffsets &&
                ((r.modifiersData.popperOffsets.x += n),
                (r.modifiersData.popperOffsets.y += t)),
                (r.modifiersData[i] = e);
        },
    };
    var Nt = {
        name: "popperOffsets",
        enabled: !0,
        phase: "read",
        fn: function (e) {
            var t = e.state,
                e = e.name;
            t.modifiersData[e] = xt({
                reference: t.rects.reference,
                element: t.rects.popper,
                strategy: "absolute",
                placement: t.placement,
            });
        },
        data: {},
    };
    var Pt = {
        name: "preventOverflow",
        enabled: !0,
        phase: "main",
        fn: function (e) {
            var t,
                i,
                n,
                s = e.state,
                o = e.options,
                r = e.name,
                a = o.mainAxis,
                l = void 0 === a || a,
                c = void 0 !== (T = o.altAxis) && T,
                h = o.boundary,
                d = o.rootBoundary,
                u = o.altBoundary,
                f = o.padding,
                p = void 0 === (C = o.tether) || C,
                m = o.tetherOffset,
                g = void 0 === m ? 0 : m,
                _ = kt(s, {
                    boundary: h,
                    rootBoundary: d,
                    padding: f,
                    altBoundary: u,
                }),
                b = qe(s.placement),
                v = ht(s.placement),
                y = !v,
                w = "x" === (n = st(b)) ? "y" : "x",
                A = s.modifiersData.popperOffsets,
                E = s.rects.reference,
                e = s.rects.popper,
                T =
                    "number" ==
                    typeof (a =
                        "function" == typeof g
                            ? g(
                                  Object.assign({}, s.rects, {
                                      placement: s.placement,
                                  })
                              )
                            : g)
                        ? { mainAxis: a, altAxis: a }
                        : Object.assign({ mainAxis: 0, altAxis: 0 }, a),
                C = s.modifiersData.offset
                    ? s.modifiersData.offset[s.placement]
                    : null,
                o = { x: 0, y: 0 };
            A &&
                (l &&
                    ((m = "y" === n ? "height" : "width"),
                    (d = (t = A[n]) + _[(h = "y" === n ? _e : ye)]),
                    (i = t - _[(f = "y" === n ? be : ve)]),
                    (u = p ? -e[m] / 2 : 0),
                    (g = (v === Ee ? E : e)[m]),
                    (a = v === Ee ? -e[m] : -E[m]),
                    (l = s.elements.arrow),
                    (v = p && l ? Ge(l) : { width: 0, height: 0 }),
                    (h = (l = s.modifiersData["arrow#persistent"]
                        ? s.modifiersData["arrow#persistent"].padding
                        : rt())[h]),
                    (f = l[f]),
                    (v = ot(0, E[m], v[m])),
                    (h = y
                        ? E[m] / 2 - u - v - h - T.mainAxis
                        : g - v - h - T.mainAxis),
                    (a = y
                        ? -E[m] / 2 + u + v + f + T.mainAxis
                        : a + v + f + T.mainAxis),
                    (f = (v = s.elements.arrow && nt(s.elements.arrow))
                        ? "y" === n
                            ? v.clientTop || 0
                            : v.clientLeft || 0
                        : 0),
                    (v =
                        t +
                        a -
                        (a = null != (v = null == C ? void 0 : C[n]) ? v : 0)),
                    (i = ot(p ? Ke(d, t + h - a - f) : d, t, p ? Ve(i, v) : i)),
                    (A[n] = i),
                    (o[n] = i - t)),
                c &&
                    ((i = "y" == w ? "height" : "width"),
                    (c = (t = A[w]) + _["x" === n ? _e : ye]),
                    (_ = t - _["x" === n ? be : ve]),
                    (n = -1 !== [_e, ye].indexOf(b)),
                    (C = null != (b = null == C ? void 0 : C[w]) ? b : 0),
                    (b = n ? c : t - E[i] - e[i] - C + T.altAxis),
                    (C = n ? t + E[i] + e[i] - C - T.altAxis : _),
                    (_ =
                        p && n
                            ? ((T = ot(b, (T = t), (n = C))), n < T ? n : T)
                            : ot(p ? b : c, t, p ? C : _)),
                    (A[w] = _),
                    (o[w] = _ - t)),
                (s.modifiersData[r] = o));
        },
        requiresIfExists: ["offset"],
    };
    function jt(e, t, i) {
        void 0 === i && (i = !1);
        var n = Be(t),
            s =
                Be(t) &&
                ((s = (r = t).getBoundingClientRect()),
                (o = Qe(s.width) / r.offsetWidth || 1),
                (r = Qe(s.height) / r.offsetHeight || 1),
                1 !== o || 1 !== r),
            o = et(t),
            r = Ue(e, s, i),
            e = { scrollLeft: 0, scrollTop: 0 },
            s = { x: 0, y: 0 };
        return (
            (!n && (n || i)) ||
                (("body" === Fe(t) && !At(o)) ||
                    (e =
                        (n = t) !== He(n) && Be(n)
                            ? {
                                  scrollLeft: (i = n).scrollLeft,
                                  scrollTop: i.scrollTop,
                              }
                            : yt(n)),
                Be(t)
                    ? (((s = Ue(t, !0)).x += t.clientLeft),
                      (s.y += t.clientTop))
                    : o && (s.x = wt(o))),
            {
                x: r.left + e.scrollLeft - s.x,
                y: r.top + e.scrollTop - s.y,
                width: r.width,
                height: r.height,
            }
        );
    }
    function Mt(e) {
        var i = new Map(),
            n = new Set(),
            s = [];
        return (
            e.forEach(function (e) {
                i.set(e.name, e);
            }),
            e.forEach(function (e) {
                n.has(e.name) ||
                    !(function t(e) {
                        n.add(e.name),
                            []
                                .concat(
                                    e.requires || [],
                                    e.requiresIfExists || []
                                )
                                .forEach(function (e) {
                                    n.has(e) || ((e = i.get(e)) && t(e));
                                }),
                            s.push(e);
                    })(e);
            }),
            s
        );
    }
    var $t = { placement: "bottom", modifiers: [], strategy: "absolute" };
    function Ft() {
        for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
            t[i] = arguments[i];
        return !t.some(function (e) {
            return !(e && "function" == typeof e.getBoundingClientRect);
        });
    }
    function Ht(e) {
        var t = (e = void 0 === e ? {} : e).defaultModifiers,
            d = void 0 === t ? [] : t,
            e = e.defaultOptions,
            u = void 0 === e ? $t : e;
        return function (n, s, t) {
            void 0 === t && (t = u);
            var i,
                o,
                r = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign({}, $t, u),
                    modifiersData: {},
                    elements: { reference: n, popper: s },
                    attributes: {},
                    styles: {},
                },
                a = [],
                l = !1,
                c = {
                    state: r,
                    setOptions: function (e) {
                        e = "function" == typeof e ? e(r.options) : e;
                        h(),
                            (r.options = Object.assign({}, u, r.options, e)),
                            (r.scrollParents = {
                                reference: We(n)
                                    ? Et(n)
                                    : n.contextElement
                                    ? Et(n.contextElement)
                                    : [],
                                popper: Et(s),
                            });
                        var i,
                            t,
                            e =
                                ((e = [].concat(d, r.options.modifiers)),
                                (t = e.reduce(function (e, t) {
                                    var i = e[t.name];
                                    return (
                                        (e[t.name] = i
                                            ? Object.assign({}, i, t, {
                                                  options: Object.assign(
                                                      {},
                                                      i.options,
                                                      t.options
                                                  ),
                                                  data: Object.assign(
                                                      {},
                                                      i.data,
                                                      t.data
                                                  ),
                                              })
                                            : t),
                                        e
                                    );
                                }, {})),
                                (e = Object.keys(t).map(function (e) {
                                    return t[e];
                                })),
                                (i = Mt(e)),
                                $e.reduce(function (e, t) {
                                    return e.concat(
                                        i.filter(function (e) {
                                            return e.phase === t;
                                        })
                                    );
                                }, []));
                        return (
                            (r.orderedModifiers = e.filter(function (e) {
                                return e.enabled;
                            })),
                            r.orderedModifiers.forEach(function (e) {
                                var t = e.name,
                                    i = e.options,
                                    e = e.effect;
                                "function" == typeof e &&
                                    ((i = e({
                                        state: r,
                                        name: t,
                                        instance: c,
                                        options: void 0 === i ? {} : i,
                                    })),
                                    a.push(i || function () {}));
                            }),
                            c.update()
                        );
                    },
                    forceUpdate: function () {
                        if (!l) {
                            var e = r.elements,
                                t = e.reference,
                                e = e.popper;
                            if (Ft(t, e)) {
                                (r.rects = {
                                    reference: jt(
                                        t,
                                        nt(e),
                                        "fixed" === r.options.strategy
                                    ),
                                    popper: Ge(e),
                                }),
                                    (r.reset = !1),
                                    (r.placement = r.options.placement),
                                    r.orderedModifiers.forEach(function (e) {
                                        return (r.modifiersData[e.name] =
                                            Object.assign({}, e.data));
                                    });
                                for (
                                    var i, n, s, o = 0;
                                    o < r.orderedModifiers.length;
                                    o++
                                )
                                    !0 !== r.reset
                                        ? ((i = (s = r.orderedModifiers[o]).fn),
                                          (n = s.options),
                                          (s = s.name),
                                          "function" == typeof i &&
                                              (r =
                                                  i({
                                                      state: r,
                                                      options:
                                                          void 0 === n ? {} : n,
                                                      name: s,
                                                      instance: c,
                                                  }) || r))
                                        : ((r.reset = !1), (o = -1));
                            }
                        }
                    },
                    update:
                        ((i = function () {
                            return new Promise(function (e) {
                                c.forceUpdate(), e(r);
                            });
                        }),
                        function () {
                            return (o =
                                o ||
                                new Promise(function (e) {
                                    Promise.resolve().then(function () {
                                        (o = void 0), e(i());
                                    });
                                }));
                        }),
                    destroy: function () {
                        h(), (l = !0);
                    },
                };
            return (
                Ft(n, s) &&
                    c.setOptions(t).then(function (e) {
                        !l && t.onFirstUpdate && t.onFirstUpdate(e);
                    }),
                c
            );
            function h() {
                a.forEach(function (e) {
                    return e();
                }),
                    (a = []);
            }
        };
    }
    var Wt = Ht({ defaultModifiers: [mt, Nt, ft, Re, U, Lt, Pt, ct, It] });
    const Bt = Object.freeze(
            Object.defineProperty(
                {
                    __proto__: null,
                    popperGenerator: Ht,
                    detectOverflow: kt,
                    createPopperBase: Ht(),
                    createPopper: Wt,
                    createPopperLite: Ht({
                        defaultModifiers: [mt, Nt, ft, Re],
                    }),
                    top: _e,
                    bottom: be,
                    right: ve,
                    left: ye,
                    auto: we,
                    basePlacements: Ae,
                    start: Ee,
                    end: Te,
                    clippingParents: Ce,
                    viewport: Oe,
                    popper: xe,
                    reference: ke,
                    variationPlacements: Le,
                    placements: Se,
                    beforeRead: De,
                    read: "read",
                    afterRead: Ie,
                    beforeMain: Ne,
                    main: "main",
                    afterMain: Pe,
                    beforeWrite: je,
                    write: "write",
                    afterWrite: Me,
                    modifierPhases: $e,
                    applyStyles: Re,
                    arrow: ct,
                    computeStyles: ft,
                    eventListeners: mt,
                    flip: Lt,
                    hide: It,
                    offset: U,
                    popperOffsets: Nt,
                    preventOverflow: Pt,
                },
                Symbol.toStringTag,
                { value: "Module" }
            )
        ),
        zt = "dropdown";
    (It = ".bs.dropdown"), (U = ".data-api");
    const Rt = "ArrowUp",
        qt = "ArrowDown";
    (Nt = `click${It}${U}`), (Pt = `keydown${It}${U}`);
    const Vt = "show",
        Kt = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
        Qt = (Kt, ".dropdown-menu"),
        Xt = p() ? "top-end" : "top-start",
        Yt = p() ? "top-start" : "top-end",
        Ut = p() ? "bottom-end" : "bottom-start",
        Gt = p() ? "bottom-start" : "bottom-end",
        Jt = p() ? "left-start" : "right-start",
        Zt = p() ? "right-start" : "left-start",
        ei = {
            autoClose: !0,
            boundary: "clippingParents",
            display: "dynamic",
            offset: [0, 2],
            popperConfig: null,
            reference: "toggle",
        },
        ti = {
            autoClose: "(boolean|string)",
            boundary: "(string|element)",
            display: "string",
            offset: "(array|string|function)",
            popperConfig: "(null|object|function)",
            reference: "(string|element|object)",
        };
    class ii extends H {
        constructor(e, t) {
            super(e, t),
                (this._popper = null),
                (this._parent = this._element.parentNode),
                (this._menu =
                    B.next(this._element, Qt)[0] ||
                    B.prev(this._element, Qt)[0] ||
                    B.findOne(Qt, this._parent)),
                (this._inNavbar = this._detectNavbar());
        }
        static get Default() {
            return ei;
        }
        static get DefaultType() {
            return ti;
        }
        static get NAME() {
            return zt;
        }
        toggle() {
            return this._isShown() ? this.hide() : this.show();
        }
        show() {
            if (!c(this._element) && !this._isShown()) {
                var e = { relatedTarget: this._element };
                if (
                    !D.trigger(this._element, "show.bs.dropdown", e)
                        .defaultPrevented
                ) {
                    if (
                        (this._createPopper(),
                        "ontouchstart" in document.documentElement &&
                            !this._parent.closest(".navbar-nav"))
                    )
                        for (const t of [].concat(...document.body.children))
                            D.on(t, "mouseover", d);
                    this._element.focus(),
                        this._element.setAttribute("aria-expanded", !0),
                        this._menu.classList.add(Vt),
                        this._element.classList.add(Vt),
                        D.trigger(this._element, "shown.bs.dropdown", e);
                }
            }
        }
        hide() {
            var e;
            !c(this._element) &&
                this._isShown() &&
                ((e = { relatedTarget: this._element }), this._completeHide(e));
        }
        dispose() {
            this._popper && this._popper.destroy(), super.dispose();
        }
        update() {
            (this._inNavbar = this._detectNavbar()),
                this._popper && this._popper.update();
        }
        _completeHide(e) {
            if (
                !D.trigger(this._element, "hide.bs.dropdown", e)
                    .defaultPrevented
            ) {
                if ("ontouchstart" in document.documentElement)
                    for (const t of [].concat(...document.body.children))
                        D.off(t, "mouseover", d);
                this._popper && this._popper.destroy(),
                    this._menu.classList.remove(Vt),
                    this._element.classList.remove(Vt),
                    this._element.setAttribute("aria-expanded", "false"),
                    $.removeDataAttribute(this._menu, "popper"),
                    D.trigger(this._element, "hidden.bs.dropdown", e);
            }
        }
        _getConfig(e) {
            if (
                "object" == typeof (e = super._getConfig(e)).reference &&
                !a(e.reference) &&
                "function" != typeof e.reference.getBoundingClientRect
            )
                throw new TypeError(
                    `${zt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
                );
            return e;
        }
        _createPopper() {
            if (void 0 === Bt)
                throw new TypeError(
                    "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                );
            let e = this._element;
            "parent" === this._config.reference
                ? (e = this._parent)
                : a(this._config.reference)
                ? (e = s(this._config.reference))
                : "object" == typeof this._config.reference &&
                  (e = this._config.reference);
            var t = this._getPopperConfig();
            this._popper = Wt(e, this._menu, t);
        }
        _isShown() {
            return this._menu.classList.contains(Vt);
        }
        _getPlacement() {
            const e = this._parent;
            if (e.classList.contains("dropend")) return Jt;
            if (e.classList.contains("dropstart")) return Zt;
            if (e.classList.contains("dropup-center")) return "top";
            if (e.classList.contains("dropdown-center")) return "bottom";
            var t =
                "end" ===
                getComputedStyle(this._menu)
                    .getPropertyValue("--bs-position")
                    .trim();
            return e.classList.contains("dropup") ? (t ? Yt : Xt) : t ? Gt : Ut;
        }
        _detectNavbar() {
            return null !== this._element.closest(".navbar");
        }
        _getOffset() {
            const { offset: t } = this._config;
            return "string" == typeof t
                ? t.split(",").map((e) => Number.parseInt(e, 10))
                : "function" == typeof t
                ? (e) => t(e, this._element)
                : t;
        }
        _getPopperConfig() {
            const e = {
                placement: this._getPlacement(),
                modifiers: [
                    {
                        name: "preventOverflow",
                        options: { boundary: this._config.boundary },
                    },
                    { name: "offset", options: { offset: this._getOffset() } },
                ],
            };
            return (
                (!this._inNavbar && "static" !== this._config.display) ||
                    ($.setDataAttribute(this._menu, "popper", "static"),
                    (e.modifiers = [{ name: "applyStyles", enabled: !1 }])),
                { ...e, ...m(this._config.popperConfig, [e]) }
            );
        }
        _selectMenuItem({ key: e, target: t }) {
            const i = B.find(
                ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
                this._menu
            ).filter((e) => l(e));
            i.length && _(i, t, e === qt, !i.includes(t)).focus();
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = ii.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t])
                        throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
        static clearMenus(e) {
            if (2 !== e.button && ("keyup" !== e.type || "Tab" === e.key))
                for (const i of B.find(
                    '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled).show'
                )) {
                    const n = ii.getInstance(i);
                    if (n && !1 !== n._config.autoClose) {
                        const s = e.composedPath();
                        var t = s.includes(n._menu);
                        if (
                            !(
                                s.includes(n._element) ||
                                ("inside" === n._config.autoClose && !t) ||
                                ("outside" === n._config.autoClose && t) ||
                                (n._menu.contains(e.target) &&
                                    (("keyup" === e.type && "Tab" === e.key) ||
                                        /input|select|option|textarea|form/i.test(
                                            e.target.tagName
                                        )))
                            )
                        ) {
                            const o = { relatedTarget: n._element };
                            "click" === e.type && (o.clickEvent = e),
                                n._completeHide(o);
                        }
                    }
                }
        }
        static dataApiKeydownHandler(e) {
            var t = /input|textarea/i.test(e.target.tagName),
                i = "Escape" === e.key,
                n = [Rt, qt].includes(e.key);
            if ((n || i) && (!t || i)) {
                e.preventDefault();
                const s = this.matches(Kt)
                        ? this
                        : B.prev(this, Kt)[0] ||
                          B.next(this, Kt)[0] ||
                          B.findOne(Kt, e.delegateTarget.parentNode),
                    o = ii.getOrCreateInstance(s);
                if (n)
                    return (
                        e.stopPropagation(), o.show(), void o._selectMenuItem(e)
                    );
                o._isShown() && (e.stopPropagation(), o.hide(), s.focus());
            }
        }
    }
    D.on(document, Pt, Kt, ii.dataApiKeydownHandler),
        D.on(document, Pt, Qt, ii.dataApiKeydownHandler),
        D.on(document, Nt, ii.clearMenus),
        D.on(document, "keyup.bs.dropdown.data-api", ii.clearMenus),
        D.on(document, Nt, Kt, function (e) {
            e.preventDefault(), ii.getOrCreateInstance(this).toggle();
        }),
        e(ii);
    const ni = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
        si = ".sticky-top",
        oi = "padding-right",
        ri = "margin-right";
    class ai {
        constructor() {
            this._element = document.body;
        }
        getWidth() {
            var e = document.documentElement.clientWidth;
            return Math.abs(window.innerWidth - e);
        }
        hide() {
            const t = this.getWidth();
            this._disableOverFlow(),
                this._setElementAttributes(this._element, oi, (e) => e + t),
                this._setElementAttributes(ni, oi, (e) => e + t),
                this._setElementAttributes(si, ri, (e) => e - t);
        }
        reset() {
            this._resetElementAttributes(this._element, "overflow"),
                this._resetElementAttributes(this._element, oi),
                this._resetElementAttributes(ni, oi),
                this._resetElementAttributes(si, ri);
        }
        isOverflowing() {
            return 0 < this.getWidth();
        }
        _disableOverFlow() {
            this._saveInitialAttribute(this._element, "overflow"),
                (this._element.style.overflow = "hidden");
        }
        _setElementAttributes(e, i, n) {
            const s = this.getWidth();
            this._applyManipulationCallback(e, (e) => {
                var t;
                (e !== this._element &&
                    window.innerWidth > e.clientWidth + s) ||
                    (this._saveInitialAttribute(e, i),
                    (t = window.getComputedStyle(e).getPropertyValue(i)),
                    e.style.setProperty(i, `${n(Number.parseFloat(t))}px`));
            });
        }
        _saveInitialAttribute(e, t) {
            var i = e.style.getPropertyValue(t);
            i && $.setDataAttribute(e, t, i);
        }
        _resetElementAttributes(e, i) {
            this._applyManipulationCallback(e, (e) => {
                var t = $.getDataAttribute(e, i);
                null !== t
                    ? ($.removeDataAttribute(e, i), e.style.setProperty(i, t))
                    : e.style.removeProperty(i);
            });
        }
        _applyManipulationCallback(e, t) {
            if (a(e)) t(e);
            else for (const i of B.find(e, this._element)) t(i);
        }
    }
    const li = "backdrop",
        ci = `mousedown.bs.${li}`,
        hi = {
            className: "modal-backdrop",
            clickCallback: null,
            isAnimated: !1,
            isVisible: !0,
            rootElement: "body",
        },
        di = {
            className: "string",
            clickCallback: "(function|null)",
            isAnimated: "boolean",
            isVisible: "boolean",
            rootElement: "(element|string)",
        };
    class ui extends F {
        constructor(e) {
            super(),
                (this._config = this._getConfig(e)),
                (this._isAppended = !1),
                (this._element = null);
        }
        static get Default() {
            return hi;
        }
        static get DefaultType() {
            return di;
        }
        static get NAME() {
            return li;
        }
        show(e) {
            if (this._config.isVisible) {
                this._append();
                const t = this._getElement();
                this._config.isAnimated && u(t),
                    t.classList.add("show"),
                    this._emulateAnimation(() => {
                        m(e);
                    });
            } else m(e);
        }
        hide(e) {
            this._config.isVisible
                ? (this._getElement().classList.remove("show"),
                  this._emulateAnimation(() => {
                      this.dispose(), m(e);
                  }))
                : m(e);
        }
        dispose() {
            this._isAppended &&
                (D.off(this._element, ci),
                this._element.remove(),
                (this._isAppended = !1));
        }
        _getElement() {
            if (!this._element) {
                const e = document.createElement("div");
                (e.className = this._config.className),
                    this._config.isAnimated && e.classList.add("fade"),
                    (this._element = e);
            }
            return this._element;
        }
        _configAfterMerge(e) {
            return (e.rootElement = s(e.rootElement)), e;
        }
        _append() {
            var e;
            this._isAppended ||
                ((e = this._getElement()),
                this._config.rootElement.append(e),
                D.on(e, ci, () => {
                    m(this._config.clickCallback);
                }),
                (this._isAppended = !0));
        }
        _emulateAnimation(e) {
            g(e, this._getElement(), this._config.isAnimated);
        }
    }
    const fi = ".bs.focustrap",
        pi = (fi, fi, "backward"),
        mi = { autofocus: !0, trapElement: null },
        gi = { autofocus: "boolean", trapElement: "element" };
    class _i extends F {
        constructor(e) {
            super(),
                (this._config = this._getConfig(e)),
                (this._isActive = !1),
                (this._lastTabNavDirection = null);
        }
        static get Default() {
            return mi;
        }
        static get DefaultType() {
            return gi;
        }
        static get NAME() {
            return "focustrap";
        }
        activate() {
            this._isActive ||
                (this._config.autofocus && this._config.trapElement.focus(),
                D.off(document, fi),
                D.on(document, "focusin.bs.focustrap", (e) =>
                    this._handleFocusin(e)
                ),
                D.on(document, "keydown.tab.bs.focustrap", (e) =>
                    this._handleKeydown(e)
                ),
                (this._isActive = !0));
        }
        deactivate() {
            this._isActive && ((this._isActive = !1), D.off(document, fi));
        }
        _handleFocusin(e) {
            const { trapElement: t } = this._config;
            if (
                e.target !== document &&
                e.target !== t &&
                !t.contains(e.target)
            ) {
                const i = B.focusableChildren(t);
                (0 === i.length
                    ? t
                    : this._lastTabNavDirection === pi
                    ? i[i.length - 1]
                    : i[0]
                ).focus();
            }
        }
        _handleKeydown(e) {
            "Tab" === e.key &&
                (this._lastTabNavDirection = e.shiftKey ? pi : "forward");
        }
    }
    const bi = ".bs.modal";
    bi, bi;
    const vi = `hidden${bi}`,
        yi = `show${bi}`;
    bi, bi, bi, bi, bi;
    bi;
    const wi = "modal-open",
        Ai = "modal-static";
    const Ei = { backdrop: !0, focus: !0, keyboard: !0 },
        Ti = {
            backdrop: "(boolean|string)",
            focus: "boolean",
            keyboard: "boolean",
        };
    class Ci extends H {
        constructor(e, t) {
            super(e, t),
                (this._dialog = B.findOne(".modal-dialog", this._element)),
                (this._backdrop = this._initializeBackDrop()),
                (this._focustrap = this._initializeFocusTrap()),
                (this._isShown = !1),
                (this._isTransitioning = !1),
                (this._scrollBar = new ai()),
                this._addEventListeners();
        }
        static get Default() {
            return Ei;
        }
        static get DefaultType() {
            return Ti;
        }
        static get NAME() {
            return "modal";
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e);
        }
        show(e) {
            this._isShown ||
                this._isTransitioning ||
                D.trigger(this._element, yi, { relatedTarget: e })
                    .defaultPrevented ||
                ((this._isShown = !0),
                (this._isTransitioning = !0),
                this._scrollBar.hide(),
                document.body.classList.add(wi),
                this._adjustDialog(),
                this._backdrop.show(() => this._showElement(e)));
        }
        hide() {
            this._isShown &&
                !this._isTransitioning &&
                (D.trigger(this._element, "hide.bs.modal").defaultPrevented ||
                    ((this._isShown = !1),
                    (this._isTransitioning = !0),
                    this._focustrap.deactivate(),
                    this._element.classList.remove("show"),
                    this._queueCallback(
                        () => this._hideModal(),
                        this._element,
                        this._isAnimated()
                    )));
        }
        dispose() {
            for (const e of [window, this._dialog]) D.off(e, bi);
            this._backdrop.dispose(),
                this._focustrap.deactivate(),
                super.dispose();
        }
        handleUpdate() {
            this._adjustDialog();
        }
        _initializeBackDrop() {
            return new ui({
                isVisible: Boolean(this._config.backdrop),
                isAnimated: this._isAnimated(),
            });
        }
        _initializeFocusTrap() {
            return new _i({ trapElement: this._element });
        }
        _showElement(e) {
            document.body.contains(this._element) ||
                document.body.append(this._element),
                (this._element.style.display = "block"),
                this._element.removeAttribute("aria-hidden"),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                (this._element.scrollTop = 0);
            const t = B.findOne(".modal-body", this._dialog);
            t && (t.scrollTop = 0),
                u(this._element),
                this._element.classList.add("show");
            this._queueCallback(
                () => {
                    this._config.focus && this._focustrap.activate(),
                        (this._isTransitioning = !1),
                        D.trigger(this._element, "shown.bs.modal", {
                            relatedTarget: e,
                        });
                },
                this._dialog,
                this._isAnimated()
            );
        }
        _addEventListeners() {
            D.on(this._element, "keydown.dismiss.bs.modal", (e) => {
                if ("Escape" === e.key)
                    return this._config.keyboard
                        ? (e.preventDefault(), void this.hide())
                        : void this._triggerBackdropTransition();
            }),
                D.on(window, "resize.bs.modal", () => {
                    this._isShown &&
                        !this._isTransitioning &&
                        this._adjustDialog();
                }),
                D.on(this._element, "mousedown.dismiss.bs.modal", (t) => {
                    D.one(this._element, "click.dismiss.bs.modal", (e) => {
                        this._element === t.target &&
                            this._element === e.target &&
                            ("static" !== this._config.backdrop
                                ? this._config.backdrop && this.hide()
                                : this._triggerBackdropTransition());
                    });
                });
        }
        _hideModal() {
            (this._element.style.display = "none"),
                this._element.setAttribute("aria-hidden", !0),
                this._element.removeAttribute("aria-modal"),
                this._element.removeAttribute("role"),
                (this._isTransitioning = !1),
                this._backdrop.hide(() => {
                    document.body.classList.remove(wi),
                        this._resetAdjustments(),
                        this._scrollBar.reset(),
                        D.trigger(this._element, vi);
                });
        }
        _isAnimated() {
            return this._element.classList.contains("fade");
        }
        _triggerBackdropTransition() {
            if (
                !D.trigger(this._element, "hidePrevented.bs.modal")
                    .defaultPrevented
            ) {
                var e =
                    this._element.scrollHeight >
                    document.documentElement.clientHeight;
                const t = this._element.style.overflowY;
                "hidden" === t ||
                    this._element.classList.contains(Ai) ||
                    (e || (this._element.style.overflowY = "hidden"),
                    this._element.classList.add(Ai),
                    this._queueCallback(() => {
                        this._element.classList.remove(Ai),
                            this._queueCallback(() => {
                                this._element.style.overflowY = t;
                            }, this._dialog);
                    }, this._dialog),
                    this._element.focus());
            }
        }
        _adjustDialog() {
            var e,
                t =
                    this._element.scrollHeight >
                    document.documentElement.clientHeight,
                i = this._scrollBar.getWidth(),
                n = 0 < i;
            n &&
                !t &&
                ((e = p() ? "paddingLeft" : "paddingRight"),
                (this._element.style[e] = `${i}px`)),
                !n &&
                    t &&
                    ((t = p() ? "paddingRight" : "paddingLeft"),
                    (this._element.style[t] = `${i}px`));
        }
        _resetAdjustments() {
            (this._element.style.paddingLeft = ""),
                (this._element.style.paddingRight = "");
        }
        static jQueryInterface(t, i) {
            return this.each(function () {
                const e = Ci.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t])
                        throw new TypeError(`No method named "${t}"`);
                    e[t](i);
                }
            });
        }
    }
    D.on(
        document,
        "click.bs.modal.data-api",
        '[data-bs-toggle="modal"]',
        function (e) {
            const t = B.getElementFromSelector(this);
            ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
                D.one(t, yi, (e) => {
                    e.defaultPrevented ||
                        D.one(t, vi, () => {
                            l(this) && this.focus();
                        });
                });
            e = B.findOne(".modal.show");
            e && Ci.getInstance(e).hide();
            const i = Ci.getOrCreateInstance(t);
            i.toggle(this);
        }
    ),
        z(Ci),
        e(Ci);
    Pt = ".bs.offcanvas";
    const Oi = "showing",
        xi = ".offcanvas.show",
        ki = `hidePrevented${Pt}`,
        Li = `hidden${Pt}`;
    const Si = { backdrop: !0, keyboard: !0, scroll: !1 },
        Di = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            scroll: "boolean",
        };
    class Ii extends H {
        constructor(e, t) {
            super(e, t),
                (this._isShown = !1),
                (this._backdrop = this._initializeBackDrop()),
                (this._focustrap = this._initializeFocusTrap()),
                this._addEventListeners();
        }
        static get Default() {
            return Si;
        }
        static get DefaultType() {
            return Di;
        }
        static get NAME() {
            return "offcanvas";
        }
        toggle(e) {
            return this._isShown ? this.hide() : this.show(e);
        }
        show(e) {
            this._isShown ||
                D.trigger(this._element, "show.bs.offcanvas", {
                    relatedTarget: e,
                }).defaultPrevented ||
                ((this._isShown = !0),
                this._backdrop.show(),
                this._config.scroll || new ai().hide(),
                this._element.setAttribute("aria-modal", !0),
                this._element.setAttribute("role", "dialog"),
                this._element.classList.add(Oi),
                this._queueCallback(
                    () => {
                        (this._config.scroll && !this._config.backdrop) ||
                            this._focustrap.activate(),
                            this._element.classList.add("show"),
                            this._element.classList.remove(Oi),
                            D.trigger(this._element, "shown.bs.offcanvas", {
                                relatedTarget: e,
                            });
                    },
                    this._element,
                    !0
                ));
        }
        hide() {
            this._isShown &&
                (D.trigger(this._element, "hide.bs.offcanvas")
                    .defaultPrevented ||
                    (this._focustrap.deactivate(),
                    this._element.blur(),
                    (this._isShown = !1),
                    this._element.classList.add("hiding"),
                    this._backdrop.hide(),
                    this._queueCallback(
                        () => {
                            this._element.classList.remove("show", "hiding"),
                                this._element.removeAttribute("aria-modal"),
                                this._element.removeAttribute("role"),
                                this._config.scroll || new ai().reset(),
                                D.trigger(this._element, Li);
                        },
                        this._element,
                        !0
                    )));
        }
        dispose() {
            this._backdrop.dispose(),
                this._focustrap.deactivate(),
                super.dispose();
        }
        _initializeBackDrop() {
            var e = Boolean(this._config.backdrop);
            return new ui({
                className: "offcanvas-backdrop",
                isVisible: e,
                isAnimated: !0,
                rootElement: this._element.parentNode,
                clickCallback: e
                    ? () => {
                          "static" !== this._config.backdrop
                              ? this.hide()
                              : D.trigger(this._element, ki);
                      }
                    : null,
            });
        }
        _initializeFocusTrap() {
            return new _i({ trapElement: this._element });
        }
        _addEventListeners() {
            D.on(this._element, "keydown.dismiss.bs.offcanvas", (e) => {
                "Escape" === e.key &&
                    (this._config.keyboard
                        ? this.hide()
                        : D.trigger(this._element, ki));
            });
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Ii.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (
                        void 0 === e[t] ||
                        t.startsWith("_") ||
                        "constructor" === t
                    )
                        throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    D.on(
        document,
        "click.bs.offcanvas.data-api",
        '[data-bs-toggle="offcanvas"]',
        function (e) {
            var t = B.getElementFromSelector(this);
            if (
                (["A", "AREA"].includes(this.tagName) && e.preventDefault(),
                !c(this))
            ) {
                D.one(t, Li, () => {
                    l(this) && this.focus();
                });
                e = B.findOne(xi);
                e && e !== t && Ii.getInstance(e).hide();
                const i = Ii.getOrCreateInstance(t);
                i.toggle(this);
            }
        }
    ),
        D.on(window, "load.bs.offcanvas.data-api", () => {
            for (const e of B.find(xi)) Ii.getOrCreateInstance(e).show();
        }),
        D.on(window, "resize.bs.offcanvas", () => {
            for (const e of B.find(
                "[aria-modal][class*=show][class*=offcanvas-]"
            ))
                "fixed" !== getComputedStyle(e).position &&
                    Ii.getOrCreateInstance(e).hide();
        }),
        z(Ii),
        e(Ii);
    const Ni = new Set([
        "background",
        "cite",
        "href",
        "itemtype",
        "longdesc",
        "poster",
        "src",
        "xlink:href",
    ]);
    const Pi = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i,
        ji =
            /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
    Pt = {
        "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
    };
    function Mi(e, t, i) {
        if (!e.length) return e;
        if (i && "function" == typeof i) return i(e);
        const n = new window.DOMParser(),
            s = n.parseFromString(e, "text/html");
        for (const l of [].concat(...s.body.querySelectorAll("*"))) {
            var o = l.nodeName.toLowerCase();
            if (Object.keys(t).includes(o)) {
                var r = [].concat(...l.attributes),
                    a = [].concat(t["*"] || [], t[o] || []);
                for (const c of r)
                    ((e, t) => {
                        const i = e.nodeName.toLowerCase();
                        return t.includes(i)
                            ? !Ni.has(i) ||
                                  Boolean(
                                      Pi.test(e.nodeValue) ||
                                          ji.test(e.nodeValue)
                                  )
                            : t
                                  .filter((e) => e instanceof RegExp)
                                  .some((e) => e.test(i));
                    })(c, a) || l.removeAttribute(c.nodeName);
            } else l.remove();
        }
        return s.body.innerHTML;
    }
    const $i = {
            allowList: Pt,
            content: {},
            extraClass: "",
            html: !1,
            sanitize: !0,
            sanitizeFn: null,
            template: "<div></div>",
        },
        Fi = {
            allowList: "object",
            content: "object",
            extraClass: "(string|function)",
            html: "boolean",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            template: "string",
        },
        Hi = {
            entry: "(string|element|function|null)",
            selector: "(string|element)",
        };
    class Wi extends F {
        constructor(e) {
            super(), (this._config = this._getConfig(e));
        }
        static get Default() {
            return $i;
        }
        static get DefaultType() {
            return Fi;
        }
        static get NAME() {
            return "TemplateFactory";
        }
        getContent() {
            return Object.values(this._config.content)
                .map((e) => this._resolvePossibleFunction(e))
                .filter(Boolean);
        }
        hasContent() {
            return 0 < this.getContent().length;
        }
        changeContent(e) {
            return (
                this._checkContent(e),
                (this._config.content = { ...this._config.content, ...e }),
                this
            );
        }
        toHtml() {
            const e = document.createElement("div");
            e.innerHTML = this._maybeSanitize(this._config.template);
            for (var [t, i] of Object.entries(this._config.content))
                this._setContent(e, i, t);
            const n = e.children[0],
                s = this._resolvePossibleFunction(this._config.extraClass);
            return s && n.classList.add(...s.split(" ")), n;
        }
        _typeCheckConfig(e) {
            super._typeCheckConfig(e), this._checkContent(e.content);
        }
        _checkContent(e) {
            for (var [t, i] of Object.entries(e))
                super._typeCheckConfig({ selector: t, entry: i }, Hi);
        }
        _setContent(e, t, i) {
            const n = B.findOne(i, e);
            n &&
                ((t = this._resolvePossibleFunction(t))
                    ? a(t)
                        ? this._putElementInTemplate(s(t), n)
                        : this._config.html
                        ? (n.innerHTML = this._maybeSanitize(t))
                        : (n.textContent = t)
                    : n.remove());
        }
        _maybeSanitize(e) {
            return this._config.sanitize
                ? Mi(e, this._config.allowList, this._config.sanitizeFn)
                : e;
        }
        _resolvePossibleFunction(e) {
            return m(e, [this]);
        }
        _putElementInTemplate(e, t) {
            if (this._config.html) return (t.innerHTML = ""), void t.append(e);
            t.textContent = e.textContent;
        }
    }
    const Bi = new Set(["sanitize", "allowList", "sanitizeFn"]),
        zi = "fade";
    const Ri = "show",
        qi = "hide.bs.modal",
        Vi = "hover",
        Ki = "focus",
        Qi = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: p() ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: p() ? "right" : "left",
        },
        Xi = {
            allowList: Pt,
            animation: !0,
            boundary: "clippingParents",
            container: !1,
            customClass: "",
            delay: 0,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            html: !1,
            offset: [0, 0],
            placement: "top",
            popperConfig: null,
            sanitize: !0,
            sanitizeFn: null,
            selector: !1,
            template:
                '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            title: "",
            trigger: "hover focus",
        },
        Yi = {
            allowList: "object",
            animation: "boolean",
            boundary: "(string|element)",
            container: "(string|element|boolean)",
            customClass: "(string|function)",
            delay: "(number|object)",
            fallbackPlacements: "array",
            html: "boolean",
            offset: "(array|string|function)",
            placement: "(string|function)",
            popperConfig: "(null|object|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            selector: "(string|boolean)",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
        };
    class Ui extends H {
        constructor(e, t) {
            if (void 0 === Bt)
                throw new TypeError(
                    "Bootstrap's tooltips require Popper (https://popper.js.org)"
                );
            super(e, t),
                (this._isEnabled = !0),
                (this._timeout = 0),
                (this._isHovered = null),
                (this._activeTrigger = {}),
                (this._popper = null),
                (this._templateFactory = null),
                (this._newContent = null),
                (this.tip = null),
                this._setListeners(),
                this._config.selector || this._fixTitle();
        }
        static get Default() {
            return Xi;
        }
        static get DefaultType() {
            return Yi;
        }
        static get NAME() {
            return "tooltip";
        }
        enable() {
            this._isEnabled = !0;
        }
        disable() {
            this._isEnabled = !1;
        }
        toggleEnabled() {
            this._isEnabled = !this._isEnabled;
        }
        toggle() {
            this._isEnabled &&
                ((this._activeTrigger.click = !this._activeTrigger.click),
                this._isShown() ? this._leave() : this._enter());
        }
        dispose() {
            clearTimeout(this._timeout),
                D.off(
                    this._element.closest(".modal"),
                    qi,
                    this._hideModalHandler
                ),
                this._element.getAttribute("data-bs-original-title") &&
                    this._element.setAttribute(
                        "title",
                        this._element.getAttribute("data-bs-original-title")
                    ),
                this._disposePopper(),
                super.dispose();
        }
        show() {
            if ("none" === this._element.style.display)
                throw new Error("Please use show on visible elements");
            if (this._isWithContent() && this._isEnabled) {
                var e = D.trigger(
                    this._element,
                    this.constructor.eventName("show")
                );
                const i = h(this._element);
                var t = (
                    i || this._element.ownerDocument.documentElement
                ).contains(this._element);
                if (!e.defaultPrevented && t) {
                    this._disposePopper();
                    const n = this._getTipElement();
                    this._element.setAttribute(
                        "aria-describedby",
                        n.getAttribute("id")
                    );
                    const { container: s } = this._config;
                    if (
                        (this._element.ownerDocument.documentElement.contains(
                            this.tip
                        ) ||
                            (s.append(n),
                            D.trigger(
                                this._element,
                                this.constructor.eventName("inserted")
                            )),
                        (this._popper = this._createPopper(n)),
                        n.classList.add(Ri),
                        "ontouchstart" in document.documentElement)
                    )
                        for (const o of [].concat(...document.body.children))
                            D.on(o, "mouseover", d);
                    this._queueCallback(
                        () => {
                            D.trigger(
                                this._element,
                                this.constructor.eventName("shown")
                            ),
                                !1 === this._isHovered && this._leave(),
                                (this._isHovered = !1);
                        },
                        this.tip,
                        this._isAnimated()
                    );
                }
            }
        }
        hide() {
            if (
                this._isShown() &&
                !D.trigger(this._element, this.constructor.eventName("hide"))
                    .defaultPrevented
            ) {
                const e = this._getTipElement();
                if (
                    (e.classList.remove(Ri),
                    "ontouchstart" in document.documentElement)
                )
                    for (const t of [].concat(...document.body.children))
                        D.off(t, "mouseover", d);
                (this._activeTrigger.click = !1),
                    (this._activeTrigger[Ki] = !1),
                    (this._activeTrigger[Vi] = !1),
                    (this._isHovered = null);
                this._queueCallback(
                    () => {
                        this._isWithActiveTrigger() ||
                            (this._isHovered || this._disposePopper(),
                            this._element.removeAttribute("aria-describedby"),
                            D.trigger(
                                this._element,
                                this.constructor.eventName("hidden")
                            ));
                    },
                    this.tip,
                    this._isAnimated()
                );
            }
        }
        update() {
            this._popper && this._popper.update();
        }
        _isWithContent() {
            return Boolean(this._getTitle());
        }
        _getTipElement() {
            return (
                this.tip ||
                    (this.tip = this._createTipElement(
                        this._newContent || this._getContentForTemplate()
                    )),
                this.tip
            );
        }
        _createTipElement(e) {
            const t = this._getTemplateFactory(e).toHtml();
            if (!t) return null;
            t.classList.remove(zi, Ri),
                t.classList.add(`bs-${this.constructor.NAME}-auto`);
            e = ((e) => {
                for (
                    ;
                    (e += Math.floor(1e6 * Math.random())),
                        document.getElementById(e);

                );
                return e;
            })(this.constructor.NAME).toString();
            return (
                t.setAttribute("id", e),
                this._isAnimated() && t.classList.add(zi),
                t
            );
        }
        setContent(e) {
            (this._newContent = e),
                this._isShown() && (this._disposePopper(), this.show());
        }
        _getTemplateFactory(e) {
            return (
                this._templateFactory
                    ? this._templateFactory.changeContent(e)
                    : (this._templateFactory = new Wi({
                          ...this._config,
                          content: e,
                          extraClass: this._resolvePossibleFunction(
                              this._config.customClass
                          ),
                      })),
                this._templateFactory
            );
        }
        _getContentForTemplate() {
            return { ".tooltip-inner": this._getTitle() };
        }
        _getTitle() {
            return (
                this._resolvePossibleFunction(this._config.title) ||
                this._element.getAttribute("data-bs-original-title")
            );
        }
        _initializeOnDelegatedTarget(e) {
            return this.constructor.getOrCreateInstance(
                e.delegateTarget,
                this._getDelegateConfig()
            );
        }
        _isAnimated() {
            return (
                this._config.animation ||
                (this.tip && this.tip.classList.contains(zi))
            );
        }
        _isShown() {
            return this.tip && this.tip.classList.contains(Ri);
        }
        _createPopper(e) {
            const t = m(this._config.placement, [this, e, this._element]);
            var i = Qi[t.toUpperCase()];
            return Wt(this._element, e, this._getPopperConfig(i));
        }
        _getOffset() {
            const { offset: t } = this._config;
            return "string" == typeof t
                ? t.split(",").map((e) => Number.parseInt(e, 10))
                : "function" == typeof t
                ? (e) => t(e, this._element)
                : t;
        }
        _resolvePossibleFunction(e) {
            return m(e, [this._element]);
        }
        _getPopperConfig(e) {
            e = {
                placement: e,
                modifiers: [
                    {
                        name: "flip",
                        options: {
                            fallbackPlacements: this._config.fallbackPlacements,
                        },
                    },
                    { name: "offset", options: { offset: this._getOffset() } },
                    {
                        name: "preventOverflow",
                        options: { boundary: this._config.boundary },
                    },
                    {
                        name: "arrow",
                        options: { element: `.${this.constructor.NAME}-arrow` },
                    },
                    {
                        name: "preSetPlacement",
                        enabled: !0,
                        phase: "beforeMain",
                        fn: (e) => {
                            this._getTipElement().setAttribute(
                                "data-popper-placement",
                                e.state.placement
                            );
                        },
                    },
                ],
            };
            return { ...e, ...m(this._config.popperConfig, [e]) };
        }
        _setListeners() {
            var e, t;
            for (const i of this._config.trigger.split(" "))
                "click" === i
                    ? D.on(
                          this._element,
                          this.constructor.eventName("click"),
                          this._config.selector,
                          (e) => {
                              const t = this._initializeOnDelegatedTarget(e);
                              t.toggle();
                          }
                      )
                    : "manual" !== i &&
                      ((e =
                          i === Vi
                              ? this.constructor.eventName("mouseenter")
                              : this.constructor.eventName("focusin")),
                      (t =
                          i === Vi
                              ? this.constructor.eventName("mouseleave")
                              : this.constructor.eventName("focusout")),
                      D.on(this._element, e, this._config.selector, (e) => {
                          const t = this._initializeOnDelegatedTarget(e);
                          (t._activeTrigger["focusin" === e.type ? Ki : Vi] =
                              !0),
                              t._enter();
                      }),
                      D.on(this._element, t, this._config.selector, (e) => {
                          const t = this._initializeOnDelegatedTarget(e);
                          (t._activeTrigger["focusout" === e.type ? Ki : Vi] =
                              t._element.contains(e.relatedTarget)),
                              t._leave();
                      }));
            (this._hideModalHandler = () => {
                this._element && this.hide();
            }),
                D.on(
                    this._element.closest(".modal"),
                    qi,
                    this._hideModalHandler
                );
        }
        _fixTitle() {
            var e = this._element.getAttribute("title");
            e &&
                (this._element.getAttribute("aria-label") ||
                    this._element.textContent.trim() ||
                    this._element.setAttribute("aria-label", e),
                this._element.setAttribute("data-bs-original-title", e),
                this._element.removeAttribute("title"));
        }
        _enter() {
            this._isShown() || this._isHovered
                ? (this._isHovered = !0)
                : ((this._isHovered = !0),
                  this._setTimeout(() => {
                      this._isHovered && this.show();
                  }, this._config.delay.show));
        }
        _leave() {
            this._isWithActiveTrigger() ||
                ((this._isHovered = !1),
                this._setTimeout(() => {
                    this._isHovered || this.hide();
                }, this._config.delay.hide));
        }
        _setTimeout(e, t) {
            clearTimeout(this._timeout), (this._timeout = setTimeout(e, t));
        }
        _isWithActiveTrigger() {
            return Object.values(this._activeTrigger).includes(!0);
        }
        _getConfig(e) {
            const t = $.getDataAttributes(this._element);
            for (const i of Object.keys(t)) Bi.has(i) && delete t[i];
            return (
                (e = { ...t, ...("object" == typeof e && e ? e : {}) }),
                (e = this._mergeConfigObj(e)),
                (e = this._configAfterMerge(e)),
                this._typeCheckConfig(e),
                e
            );
        }
        _configAfterMerge(e) {
            return (
                (e.container =
                    !1 === e.container ? document.body : s(e.container)),
                "number" == typeof e.delay &&
                    (e.delay = { show: e.delay, hide: e.delay }),
                "number" == typeof e.title && (e.title = e.title.toString()),
                "number" == typeof e.content &&
                    (e.content = e.content.toString()),
                e
            );
        }
        _getDelegateConfig() {
            const e = {};
            for (var [t, i] of Object.entries(this._config))
                this.constructor.Default[t] !== i && (e[t] = i);
            return (e.selector = !1), (e.trigger = "manual"), e;
        }
        _disposePopper() {
            this._popper && (this._popper.destroy(), (this._popper = null)),
                this.tip && (this.tip.remove(), (this.tip = null));
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Ui.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t])
                        throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    e(Ui);
    const Gi = {
            ...Ui.Default,
            content: "",
            offset: [0, 8],
            placement: "right",
            template:
                '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
            trigger: "click",
        },
        Ji = { ...Ui.DefaultType, content: "(null|string|element|function)" };
    class Zi extends Ui {
        static get Default() {
            return Gi;
        }
        static get DefaultType() {
            return Ji;
        }
        static get NAME() {
            return "popover";
        }
        _isWithContent() {
            return this._getTitle() || this._getContent();
        }
        _getContentForTemplate() {
            return {
                ".popover-header": this._getTitle(),
                ".popover-body": this._getContent(),
            };
        }
        _getContent() {
            return this._resolvePossibleFunction(this._config.content);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = Zi.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t])
                        throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    e(Zi);
    Pt = ".bs.scrollspy";
    const en = `click${Pt}`;
    const tn = "active",
        nn = "[href]";
    const sn = {
            offset: null,
            rootMargin: "0px 0px -25%",
            smoothScroll: !1,
            target: null,
            threshold: [0.1, 0.5, 1],
        },
        on = {
            offset: "(number|null)",
            rootMargin: "string",
            smoothScroll: "boolean",
            target: "element",
            threshold: "array",
        };
    class rn extends H {
        constructor(e, t) {
            super(e, t),
                (this._targetLinks = new Map()),
                (this._observableSections = new Map()),
                (this._rootElement =
                    "visible" === getComputedStyle(this._element).overflowY
                        ? null
                        : this._element),
                (this._activeTarget = null),
                (this._observer = null),
                (this._previousScrollData = {
                    visibleEntryTop: 0,
                    parentScrollTop: 0,
                }),
                this.refresh();
        }
        static get Default() {
            return sn;
        }
        static get DefaultType() {
            return on;
        }
        static get NAME() {
            return "scrollspy";
        }
        refresh() {
            this._initializeTargetsAndObservables(),
                this._maybeEnableSmoothScroll(),
                this._observer
                    ? this._observer.disconnect()
                    : (this._observer = this._getNewObserver());
            for (const e of this._observableSections.values())
                this._observer.observe(e);
        }
        dispose() {
            this._observer.disconnect(), super.dispose();
        }
        _configAfterMerge(e) {
            return (
                (e.target = s(e.target) || document.body),
                (e.rootMargin = e.offset
                    ? `${e.offset}px 0px -30%`
                    : e.rootMargin),
                "string" == typeof e.threshold &&
                    (e.threshold = e.threshold
                        .split(",")
                        .map((e) => Number.parseFloat(e))),
                e
            );
        }
        _maybeEnableSmoothScroll() {
            this._config.smoothScroll &&
                (D.off(this._config.target, en),
                D.on(this._config.target, en, nn, (e) => {
                    var t = this._observableSections.get(e.target.hash);
                    if (t) {
                        e.preventDefault();
                        const i = this._rootElement || window;
                        t = t.offsetTop - this._element.offsetTop;
                        i.scrollTo
                            ? i.scrollTo({ top: t, behavior: "smooth" })
                            : (i.scrollTop = t);
                    }
                }));
        }
        _getNewObserver() {
            var e = {
                root: this._rootElement,
                threshold: this._config.threshold,
                rootMargin: this._config.rootMargin,
            };
            return new IntersectionObserver(
                (e) => this._observerCallback(e),
                e
            );
        }
        _observerCallback(e) {
            const t = (e) => this._targetLinks.get(`#${e.target.id}`);
            var i = (e) => {
                    (this._previousScrollData.visibleEntryTop =
                        e.target.offsetTop),
                        this._process(t(e));
                },
                n = (this._rootElement || document.documentElement).scrollTop,
                s = n >= this._previousScrollData.parentScrollTop;
            this._previousScrollData.parentScrollTop = n;
            for (const r of e)
                if (r.isIntersecting) {
                    var o =
                        r.target.offsetTop >=
                        this._previousScrollData.visibleEntryTop;
                    if (s && o) {
                        if ((i(r), !n)) return;
                    } else s || o || i(r);
                } else
                    (this._activeTarget = null), this._clearActiveClass(t(r));
        }
        _initializeTargetsAndObservables() {
            var e;
            (this._targetLinks = new Map()),
                (this._observableSections = new Map());
            for (const t of B.find(nn, this._config.target))
                t.hash &&
                    !c(t) &&
                    ((e = B.findOne(t.hash, this._element)),
                    l(e) &&
                        (this._targetLinks.set(t.hash, t),
                        this._observableSections.set(t.hash, e)));
        }
        _process(e) {
            this._activeTarget !== e &&
                (this._clearActiveClass(this._config.target),
                (this._activeTarget = e).classList.add(tn),
                this._activateParents(e),
                D.trigger(this._element, "activate.bs.scrollspy", {
                    relatedTarget: e,
                }));
        }
        _activateParents(e) {
            if (e.classList.contains("dropdown-item"))
                B.findOne(
                    ".dropdown-toggle",
                    e.closest(".dropdown")
                ).classList.add(tn);
            else
                for (const t of B.parents(e, ".nav, .list-group"))
                    for (const i of B.prev(
                        t,
                        ".nav-link, .nav-item > .nav-link, .list-group-item"
                    ))
                        i.classList.add(tn);
        }
        _clearActiveClass(e) {
            e.classList.remove(tn);
            for (const t of B.find(`${nn}.${tn}`, e)) t.classList.remove(tn);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = rn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (
                        void 0 === e[t] ||
                        t.startsWith("_") ||
                        "constructor" === t
                    )
                        throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    D.on(window, "load.bs.scrollspy.data-api", () => {
        for (const e of B.find('[data-bs-spy="scroll"]'))
            rn.getOrCreateInstance(e);
    }),
        e(rn);
    const an = "ArrowLeft",
        ln = "ArrowRight",
        cn = "ArrowUp",
        hn = "ArrowDown",
        dn = "active",
        un = "show";
    Pt =
        '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
    const fn = `.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ${Pt}`;
    dn, dn, dn;
    class pn extends H {
        constructor(e) {
            super(e),
                (this._parent = this._element.closest(
                    '.list-group, .nav, [role="tablist"]'
                )),
                this._parent &&
                    (this._setInitialAttributes(
                        this._parent,
                        this._getChildren()
                    ),
                    D.on(this._element, "keydown.bs.tab", (e) =>
                        this._keydown(e)
                    ));
        }
        static get NAME() {
            return "tab";
        }
        show() {
            var e,
                t,
                i = this._element;
            this._elemIsActive(i) ||
                ((t = (e = this._getActiveElem())
                    ? D.trigger(e, "hide.bs.tab", { relatedTarget: i })
                    : null),
                D.trigger(i, "show.bs.tab", { relatedTarget: e })
                    .defaultPrevented ||
                    (t && t.defaultPrevented) ||
                    (this._deactivate(e, i), this._activate(i, e)));
        }
        _activate(e, t) {
            e &&
                (e.classList.add(dn),
                this._activate(B.getElementFromSelector(e)),
                this._queueCallback(
                    () => {
                        "tab" === e.getAttribute("role")
                            ? (e.removeAttribute("tabindex"),
                              e.setAttribute("aria-selected", !0),
                              this._toggleDropDown(e, !0),
                              D.trigger(e, "shown.bs.tab", {
                                  relatedTarget: t,
                              }))
                            : e.classList.add(un);
                    },
                    e,
                    e.classList.contains("fade")
                ));
        }
        _deactivate(e, t) {
            e &&
                (e.classList.remove(dn),
                e.blur(),
                this._deactivate(B.getElementFromSelector(e)),
                this._queueCallback(
                    () => {
                        "tab" === e.getAttribute("role")
                            ? (e.setAttribute("aria-selected", !1),
                              e.setAttribute("tabindex", "-1"),
                              this._toggleDropDown(e, !1),
                              D.trigger(e, "hidden.bs.tab", {
                                  relatedTarget: t,
                              }))
                            : e.classList.remove(un);
                    },
                    e,
                    e.classList.contains("fade")
                ));
        }
        _keydown(e) {
            if ([an, ln, cn, hn].includes(e.key)) {
                e.stopPropagation(), e.preventDefault();
                var t = [ln, hn].includes(e.key);
                const i = _(
                    this._getChildren().filter((e) => !c(e)),
                    e.target,
                    t,
                    !0
                );
                i &&
                    (i.focus({ preventScroll: !0 }),
                    pn.getOrCreateInstance(i).show());
            }
        }
        _getChildren() {
            return B.find(fn, this._parent);
        }
        _getActiveElem() {
            return (
                this._getChildren().find((e) => this._elemIsActive(e)) || null
            );
        }
        _setInitialAttributes(e, t) {
            this._setAttributeIfNotExists(e, "role", "tablist");
            for (const i of t) this._setInitialAttributesOnChild(i);
        }
        _setInitialAttributesOnChild(e) {
            e = this._getInnerElement(e);
            var t = this._elemIsActive(e),
                i = this._getOuterElement(e);
            e.setAttribute("aria-selected", t),
                i !== e &&
                    this._setAttributeIfNotExists(i, "role", "presentation"),
                t || e.setAttribute("tabindex", "-1"),
                this._setAttributeIfNotExists(e, "role", "tab"),
                this._setInitialAttributesOnTargetPanel(e);
        }
        _setInitialAttributesOnTargetPanel(e) {
            var t = B.getElementFromSelector(e);
            t &&
                (this._setAttributeIfNotExists(t, "role", "tabpanel"),
                e.id &&
                    this._setAttributeIfNotExists(
                        t,
                        "aria-labelledby",
                        `#${e.id}`
                    ));
        }
        _toggleDropDown(e, n) {
            const s = this._getOuterElement(e);
            s.classList.contains("dropdown") &&
                ((e = (e, t) => {
                    const i = B.findOne(e, s);
                    i && i.classList.toggle(t, n);
                })(".dropdown-toggle", dn),
                e(".dropdown-menu", un),
                s.setAttribute("aria-expanded", n));
        }
        _setAttributeIfNotExists(e, t, i) {
            e.hasAttribute(t) || e.setAttribute(t, i);
        }
        _elemIsActive(e) {
            return e.classList.contains(dn);
        }
        _getInnerElement(e) {
            return e.matches(fn) ? e : B.findOne(fn, e);
        }
        _getOuterElement(e) {
            return e.closest(".nav-item, .list-group-item") || e;
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = pn.getOrCreateInstance(this);
                if ("string" == typeof t) {
                    if (
                        void 0 === e[t] ||
                        t.startsWith("_") ||
                        "constructor" === t
                    )
                        throw new TypeError(`No method named "${t}"`);
                    e[t]();
                }
            });
        }
    }
    D.on(document, "click.bs.tab", Pt, function (e) {
        ["A", "AREA"].includes(this.tagName) && e.preventDefault(),
            c(this) || pn.getOrCreateInstance(this).show();
    }),
        D.on(window, "load.bs.tab", () => {
            for (const e of B.find(
                '.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]'
            ))
                pn.getOrCreateInstance(e);
        }),
        e(pn);
    const mn = "show",
        gn = "showing",
        _n = { animation: "boolean", autohide: "boolean", delay: "number" },
        bn = { animation: !0, autohide: !0, delay: 5e3 };
    class vn extends H {
        constructor(e, t) {
            super(e, t),
                (this._timeout = null),
                (this._hasMouseInteraction = !1),
                (this._hasKeyboardInteraction = !1),
                this._setListeners();
        }
        static get Default() {
            return bn;
        }
        static get DefaultType() {
            return _n;
        }
        static get NAME() {
            return "toast";
        }
        show() {
            D.trigger(this._element, "show.bs.toast").defaultPrevented ||
                (this._clearTimeout(),
                this._config.animation && this._element.classList.add("fade"),
                this._element.classList.remove("hide"),
                u(this._element),
                this._element.classList.add(mn, gn),
                this._queueCallback(
                    () => {
                        this._element.classList.remove(gn),
                            D.trigger(this._element, "shown.bs.toast"),
                            this._maybeScheduleHide();
                    },
                    this._element,
                    this._config.animation
                ));
        }
        hide() {
            this.isShown() &&
                (D.trigger(this._element, "hide.bs.toast").defaultPrevented ||
                    (this._element.classList.add(gn),
                    this._queueCallback(
                        () => {
                            this._element.classList.add("hide"),
                                this._element.classList.remove(gn, mn),
                                D.trigger(this._element, "hidden.bs.toast");
                        },
                        this._element,
                        this._config.animation
                    )));
        }
        dispose() {
            this._clearTimeout(),
                this.isShown() && this._element.classList.remove(mn),
                super.dispose();
        }
        isShown() {
            return this._element.classList.contains(mn);
        }
        _maybeScheduleHide() {
            this._config.autohide &&
                (this._hasMouseInteraction ||
                    this._hasKeyboardInteraction ||
                    (this._timeout = setTimeout(() => {
                        this.hide();
                    }, this._config.delay)));
        }
        _onInteraction(e, t) {
            switch (e.type) {
                case "mouseover":
                case "mouseout":
                    this._hasMouseInteraction = t;
                    break;
                case "focusin":
                case "focusout":
                    this._hasKeyboardInteraction = t;
            }
            t
                ? this._clearTimeout()
                : ((e = e.relatedTarget),
                  this._element === e ||
                      this._element.contains(e) ||
                      this._maybeScheduleHide());
        }
        _setListeners() {
            D.on(this._element, "mouseover.bs.toast", (e) =>
                this._onInteraction(e, !0)
            ),
                D.on(this._element, "mouseout.bs.toast", (e) =>
                    this._onInteraction(e, !1)
                ),
                D.on(this._element, "focusin.bs.toast", (e) =>
                    this._onInteraction(e, !0)
                ),
                D.on(this._element, "focusout.bs.toast", (e) =>
                    this._onInteraction(e, !1)
                );
        }
        _clearTimeout() {
            clearTimeout(this._timeout), (this._timeout = null);
        }
        static jQueryInterface(t) {
            return this.each(function () {
                const e = vn.getOrCreateInstance(this, t);
                if ("string" == typeof t) {
                    if (void 0 === e[t])
                        throw new TypeError(`No method named "${t}"`);
                    e[t](this);
                }
            });
        }
    }
    return (
        z(vn),
        e(vn),
        {
            Alert: R,
            Button: V,
            Carousel: ce,
            Collapse: ge,
            Dropdown: ii,
            Modal: Ci,
            Offcanvas: Ii,
            Popover: Zi,
            ScrollSpy: rn,
            Tab: pn,
            Toast: vn,
            Tooltip: Ui,
        }
    );
});
!(function (e) {
    "function" == typeof define && define.amd
        ? define(["jquery"], e)
        : e(
              "object" == typeof exports
                  ? require("jquery")
                  : window.jQuery || window.Zepto
          );
})(function (c) {
    function e() {}
    function d(e, t) {
        f.ev.on(n + e + w, t);
    }
    function u(e, t, n, o) {
        var i = document.createElement("div");
        return (
            (i.className = "mfp-" + e),
            n && (i.innerHTML = n),
            o ? t && t.appendChild(i) : ((i = c(i)), t && i.appendTo(t)),
            i
        );
    }
    function p(e, t) {
        f.ev.triggerHandler(n + e, t),
            f.st.callbacks &&
                ((e = e.charAt(0).toLowerCase() + e.slice(1)),
                f.st.callbacks[e] &&
                    f.st.callbacks[e].apply(f, c.isArray(t) ? t : [t]));
    }
    function m(e) {
        return (
            (e === t && f.currTemplate.closeBtn) ||
                ((f.currTemplate.closeBtn = c(
                    f.st.closeMarkup.replace("%title%", f.st.tClose)
                )),
                (t = e)),
            f.currTemplate.closeBtn
        );
    }
    function r() {
        c.magnificPopup.instance ||
            ((f = new e()).init(), (c.magnificPopup.instance = f));
    }
    var f,
        o,
        g,
        i,
        h,
        t,
        l = "Close",
        v = "BeforeClose",
        y = "MarkupParse",
        C = "Open",
        a = "Change",
        n = "mfp",
        w = "." + n,
        b = "mfp-ready",
        s = "mfp-removing",
        I = "mfp-prevent-close",
        x = !!window.jQuery,
        k = c(window);
    (e.prototype = {
        constructor: e,
        init: function () {
            var e = navigator.appVersion;
            (f.isLowIE = f.isIE8 = document.all && !document.addEventListener),
                (f.isAndroid = /android/gi.test(e)),
                (f.isIOS = /iphone|ipad|ipod/gi.test(e)),
                (f.supportsTransition = (function () {
                    var e = document.createElement("p").style,
                        t = ["ms", "O", "Moz", "Webkit"];
                    if (void 0 !== e.transition) return !0;
                    for (; t.length; )
                        if (t.pop() + "Transition" in e) return !0;
                    return !1;
                })()),
                (f.probablyMobile =
                    f.isAndroid ||
                    f.isIOS ||
                    /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
                        navigator.userAgent
                    )),
                (g = c(document)),
                (f.popupsCache = {});
        },
        open: function (e) {
            if (!1 === e.isObj) {
                (f.items = e.items.toArray()), (f.index = 0);
                for (var t, n = e.items, o = 0; o < n.length; o++)
                    if ((t = (t = n[o]).parsed ? t.el[0] : t) === e.el[0]) {
                        f.index = o;
                        break;
                    }
            } else
                (f.items = c.isArray(e.items) ? e.items : [e.items]),
                    (f.index = e.index || 0);
            if (!f.isOpen) {
                (f.types = []),
                    (h = ""),
                    e.mainEl && e.mainEl.length
                        ? (f.ev = e.mainEl.eq(0))
                        : (f.ev = g),
                    e.key
                        ? (f.popupsCache[e.key] || (f.popupsCache[e.key] = {}),
                          (f.currTemplate = f.popupsCache[e.key]))
                        : (f.currTemplate = {}),
                    (f.st = c.extend(!0, {}, c.magnificPopup.defaults, e)),
                    (f.fixedContentPos =
                        "auto" === f.st.fixedContentPos
                            ? !f.probablyMobile
                            : f.st.fixedContentPos),
                    f.st.modal &&
                        ((f.st.closeOnContentClick = !1),
                        (f.st.closeOnBgClick = !1),
                        (f.st.showCloseBtn = !1),
                        (f.st.enableEscapeKey = !1)),
                    f.bgOverlay ||
                        ((f.bgOverlay = u("bg").on("click" + w, function () {
                            f.close();
                        })),
                        (f.wrap = u("wrap")
                            .attr("tabindex", -1)
                            .on("click" + w, function (e) {
                                f._checkIfClose(e.target) && f.close();
                            })),
                        (f.container = u("container", f.wrap))),
                    (f.contentContainer = u("content")),
                    f.st.preloader &&
                        (f.preloader = u(
                            "preloader",
                            f.container,
                            f.st.tLoading
                        ));
                var i = c.magnificPopup.modules;
                for (o = 0; o < i.length; o++) {
                    var r = (r = i[o]).charAt(0).toUpperCase() + r.slice(1);
                    f["init" + r].call(f);
                }
                p("BeforeOpen"),
                    f.st.showCloseBtn &&
                        (f.st.closeBtnInside
                            ? (d(y, function (e, t, n, o) {
                                  n.close_replaceWith = m(o.type);
                              }),
                              (h += " mfp-close-btn-in"))
                            : f.wrap.append(m())),
                    f.st.alignTop && (h += " mfp-align-top"),
                    f.fixedContentPos
                        ? f.wrap.css({
                              overflow: f.st.overflowY,
                              overflowX: "hidden",
                              overflowY: f.st.overflowY,
                          })
                        : f.wrap.css({
                              top: k.scrollTop(),
                              position: "absolute",
                          }),
                    (!1 !== f.st.fixedBgPos &&
                        ("auto" !== f.st.fixedBgPos || f.fixedContentPos)) ||
                        f.bgOverlay.css({
                            height: g.height(),
                            position: "absolute",
                        }),
                    f.st.enableEscapeKey &&
                        g.on("keyup" + w, function (e) {
                            27 === e.keyCode && f.close();
                        }),
                    k.on("resize" + w, function () {
                        f.updateSize();
                    }),
                    f.st.closeOnContentClick || (h += " mfp-auto-cursor"),
                    h && f.wrap.addClass(h);
                var a = (f.wH = k.height()),
                    s = {};
                f.fixedContentPos &&
                    f._hasScrollBar(a) &&
                    (l = f._getScrollbarSize()) &&
                    (s.marginRight = l),
                    f.fixedContentPos &&
                        (f.isIE7
                            ? c("body, html").css("overflow", "hidden")
                            : (s.overflow = "hidden"));
                var l = f.st.mainClass;
                return (
                    f.isIE7 && (l += " mfp-ie7"),
                    l && f._addClassToMFP(l),
                    f.updateItemHTML(),
                    p("BuildControls"),
                    c("html").css(s),
                    f.bgOverlay
                        .add(f.wrap)
                        .prependTo(f.st.prependTo || c(document.body)),
                    (f._lastFocusedEl = document.activeElement),
                    setTimeout(function () {
                        f.content
                            ? (f._addClassToMFP(b), f._setFocus())
                            : f.bgOverlay.addClass(b),
                            g.on("focusin" + w, f._onFocusIn);
                    }, 16),
                    (f.isOpen = !0),
                    f.updateSize(a),
                    p(C),
                    e
                );
            }
            f.updateItemHTML();
        },
        close: function () {
            f.isOpen &&
                (p(v),
                (f.isOpen = !1),
                f.st.removalDelay && !f.isLowIE && f.supportsTransition
                    ? (f._addClassToMFP(s),
                      setTimeout(function () {
                          f._close();
                      }, f.st.removalDelay))
                    : f._close());
        },
        _close: function () {
            p(l);
            var e = s + " " + b + " ";
            f.bgOverlay.detach(),
                f.wrap.detach(),
                f.container.empty(),
                f.st.mainClass && (e += f.st.mainClass + " "),
                f._removeClassFromMFP(e),
                f.fixedContentPos &&
                    ((e = { marginRight: "" }),
                    f.isIE7
                        ? c("body, html").css("overflow", "")
                        : (e.overflow = ""),
                    c("html").css(e)),
                g.off("keyup.mfp focusin" + w),
                f.ev.off(w),
                f.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                f.bgOverlay.attr("class", "mfp-bg"),
                f.container.attr("class", "mfp-container"),
                !f.st.showCloseBtn ||
                    (f.st.closeBtnInside &&
                        !0 !== f.currTemplate[f.currItem.type]) ||
                    (f.currTemplate.closeBtn &&
                        f.currTemplate.closeBtn.detach()),
                f.st.autoFocusLast &&
                    f._lastFocusedEl &&
                    c(f._lastFocusedEl).focus(),
                (f.currItem = null),
                (f.content = null),
                (f.currTemplate = null),
                (f.prevHeight = 0),
                p("AfterClose");
        },
        updateSize: function (e) {
            var t;
            f.isIOS
                ? ((t =
                      document.documentElement.clientWidth / window.innerWidth),
                  (t = window.innerHeight * t),
                  f.wrap.css("height", t),
                  (f.wH = t))
                : (f.wH = e || k.height()),
                f.fixedContentPos || f.wrap.css("height", f.wH),
                p("Resize");
        },
        updateItemHTML: function () {
            var e = f.items[f.index];
            f.contentContainer.detach(), f.content && f.content.detach();
            var t = (e = !e.parsed ? f.parseEl(f.index) : e).type;
            p("BeforeChange", [f.currItem ? f.currItem.type : "", t]),
                (f.currItem = e),
                f.currTemplate[t] ||
                    ((n = !!f.st[t] && f.st[t].markup),
                    p("FirstMarkupParse", n),
                    (f.currTemplate[t] = !n || c(n))),
                i &&
                    i !== e.type &&
                    f.container.removeClass("mfp-" + i + "-holder");
            var n = f["get" + t.charAt(0).toUpperCase() + t.slice(1)](
                e,
                f.currTemplate[t]
            );
            f.appendContent(n, t),
                (e.preloaded = !0),
                p(a, e),
                (i = e.type),
                f.container.prepend(f.contentContainer),
                p("AfterChange");
        },
        appendContent: function (e, t) {
            (f.content = e)
                ? f.st.showCloseBtn &&
                  f.st.closeBtnInside &&
                  !0 === f.currTemplate[t]
                    ? f.content.find(".mfp-close").length ||
                      f.content.append(m())
                    : (f.content = e)
                : (f.content = ""),
                p("BeforeAppend"),
                f.container.addClass("mfp-" + t + "-holder"),
                f.contentContainer.append(f.content);
        },
        parseEl: function (e) {
            var t,
                n = f.items[e];
            if (
                (n = n.tagName
                    ? { el: c(n) }
                    : ((t = n.type), { data: n, src: n.src })).el
            ) {
                for (var o = f.types, i = 0; i < o.length; i++)
                    if (n.el.hasClass("mfp-" + o[i])) {
                        t = o[i];
                        break;
                    }
                (n.src = n.el.attr("data-mfp-src")),
                    n.src || (n.src = n.el.attr("href"));
            }
            return (
                (n.type = t || f.st.type || "inline"),
                (n.index = e),
                (n.parsed = !0),
                (f.items[e] = n),
                p("ElementParse", n),
                f.items[e]
            );
        },
        addGroup: function (t, n) {
            function e(e) {
                (e.mfpEl = this), f._openClick(e, t, n);
            }
            var o = "click.magnificPopup";
            ((n = n || {}).mainEl = t),
                n.items
                    ? ((n.isObj = !0), t.off(o).on(o, e))
                    : ((n.isObj = !1),
                      n.delegate
                          ? t.off(o).on(o, n.delegate, e)
                          : (n.items = t).off(o).on(o, e));
        },
        _openClick: function (e, t, n) {
            if (
                (void 0 !== n.midClick ? n : c.magnificPopup.defaults)
                    .midClick ||
                !(
                    2 === e.which ||
                    e.ctrlKey ||
                    e.metaKey ||
                    e.altKey ||
                    e.shiftKey
                )
            ) {
                var o = (void 0 !== n.disableOn ? n : c.magnificPopup.defaults)
                    .disableOn;
                if (o)
                    if (c.isFunction(o)) {
                        if (!o.call(f)) return !0;
                    } else if (k.width() < o) return !0;
                e.type && (e.preventDefault(), f.isOpen && e.stopPropagation()),
                    (n.el = c(e.mfpEl)),
                    n.delegate && (n.items = t.find(n.delegate)),
                    f.open(n);
            }
        },
        updateStatus: function (e, t) {
            var n;
            f.preloader &&
                (o !== e && f.container.removeClass("mfp-s-" + o),
                (n = {
                    status: e,
                    text: (t = !t && "loading" === e ? f.st.tLoading : t),
                }),
                p("UpdateStatus", n),
                (e = n.status),
                f.preloader.html((t = n.text)),
                f.preloader.find("a").on("click", function (e) {
                    e.stopImmediatePropagation();
                }),
                f.container.addClass("mfp-s-" + e),
                (o = e));
        },
        _checkIfClose: function (e) {
            if (!c(e).hasClass(I)) {
                var t = f.st.closeOnContentClick,
                    n = f.st.closeOnBgClick;
                if (t && n) return !0;
                if (
                    !f.content ||
                    c(e).hasClass("mfp-close") ||
                    (f.preloader && e === f.preloader[0])
                )
                    return !0;
                if (e === f.content[0] || c.contains(f.content[0], e)) {
                    if (t) return !0;
                } else if (n && c.contains(document, e)) return !0;
                return !1;
            }
        },
        _addClassToMFP: function (e) {
            f.bgOverlay.addClass(e), f.wrap.addClass(e);
        },
        _removeClassFromMFP: function (e) {
            this.bgOverlay.removeClass(e), f.wrap.removeClass(e);
        },
        _hasScrollBar: function (e) {
            return (
                (f.isIE7 ? g.height() : document.body.scrollHeight) >
                (e || k.height())
            );
        },
        _setFocus: function () {
            (f.st.focus ? f.content.find(f.st.focus).eq(0) : f.wrap).focus();
        },
        _onFocusIn: function (e) {
            return e.target === f.wrap[0] || c.contains(f.wrap[0], e.target)
                ? void 0
                : (f._setFocus(), !1);
        },
        _parseMarkup: function (i, e, t) {
            var r;
            t.data && (e = c.extend(t.data, e)),
                p(y, [i, e, t]),
                c.each(e, function (e, t) {
                    return (
                        void 0 === t ||
                        !1 === t ||
                        void (1 < (r = e.split("_")).length
                            ? 0 < (n = i.find(w + "-" + r[0])).length &&
                              ("replaceWith" === (o = r[1])
                                  ? n[0] !== t[0] && n.replaceWith(t)
                                  : "img" === o
                                  ? n.is("img")
                                      ? n.attr("src", t)
                                      : n.replaceWith(
                                            c("<img>")
                                                .attr("src", t)
                                                .attr("class", n.attr("class"))
                                        )
                                  : n.attr(r[1], t))
                            : i.find(w + "-" + e).html(t))
                    );
                    var n, o;
                });
        },
        _getScrollbarSize: function () {
            var e;
            return (
                void 0 === f.scrollbarSize &&
                    (((e = document.createElement("div")).style.cssText =
                        "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
                    document.body.appendChild(e),
                    (f.scrollbarSize = e.offsetWidth - e.clientWidth),
                    document.body.removeChild(e)),
                f.scrollbarSize
            );
        },
    }),
        (c.magnificPopup = {
            instance: null,
            proto: e.prototype,
            modules: [],
            open: function (e, t) {
                return (
                    r(),
                    ((e = e ? c.extend(!0, {}, e) : {}).isObj = !0),
                    (e.index = t || 0),
                    this.instance.open(e)
                );
            },
            close: function () {
                return (
                    c.magnificPopup.instance && c.magnificPopup.instance.close()
                );
            },
            registerModule: function (e, t) {
                t.options && (c.magnificPopup.defaults[e] = t.options),
                    c.extend(this.proto, t.proto),
                    this.modules.push(e);
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup:
                    '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0,
            },
        }),
        (c.fn.magnificPopup = function (e) {
            r();
            var t,
                n,
                o,
                i = c(this);
            return (
                "string" == typeof e
                    ? "open" === e
                        ? ((t = x
                              ? i.data("magnificPopup")
                              : i[0].magnificPopup),
                          (n = parseInt(arguments[1], 10) || 0),
                          (o = t.items
                              ? t.items[n]
                              : ((o = i),
                                (o = t.delegate ? o.find(t.delegate) : o).eq(
                                    n
                                ))),
                          f._openClick({ mfpEl: o }, i, t))
                        : f.isOpen &&
                          f[e].apply(
                              f,
                              Array.prototype.slice.call(arguments, 1)
                          )
                    : ((e = c.extend(!0, {}, e)),
                      x ? i.data("magnificPopup", e) : (i[0].magnificPopup = e),
                      f.addGroup(i, e)),
                i
            );
        });
    function T() {
        S && (P.after(S.addClass(_)).detach(), (S = null));
    }
    var _,
        P,
        S,
        E = "inline";
    c.magnificPopup.registerModule(E, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found",
        },
        proto: {
            initInline: function () {
                f.types.push(E),
                    d(l + "." + E, function () {
                        T();
                    });
            },
            getInline: function (e, t) {
                if ((T(), e.src)) {
                    var n,
                        o = f.st.inline,
                        i = c(e.src);
                    return (
                        i.length
                            ? ((n = i[0].parentNode) &&
                                  n.tagName &&
                                  (P ||
                                      ((_ = o.hiddenClass),
                                      (P = u(_)),
                                      (_ = "mfp-" + _)),
                                  (S = i.after(P).detach().removeClass(_))),
                              f.updateStatus("ready"))
                            : (f.updateStatus("error", o.tNotFound),
                              (i = c("<div>"))),
                        (e.inlineElement = i)
                    );
                }
                return f.updateStatus("ready"), f._parseMarkup(t, {}, e), t;
            },
        },
    });
    function z() {
        M && c(document.body).removeClass(M);
    }
    function O() {
        z(), f.req && f.req.abort();
    }
    var M,
        B = "ajax";
    c.magnificPopup.registerModule(B, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.',
        },
        proto: {
            initAjax: function () {
                f.types.push(B),
                    (M = f.st.ajax.cursor),
                    d(l + "." + B, O),
                    d("BeforeChange." + B, O);
            },
            getAjax: function (o) {
                M && c(document.body).addClass(M), f.updateStatus("loading");
                var e = c.extend(
                    {
                        url: o.src,
                        success: function (e, t, n) {
                            n = { data: e, xhr: n };
                            p("ParseAjax", n),
                                f.appendContent(c(n.data), B),
                                (o.finished = !0),
                                z(),
                                f._setFocus(),
                                setTimeout(function () {
                                    f.wrap.addClass(b);
                                }, 16),
                                f.updateStatus("ready"),
                                p("AjaxContentAdded");
                        },
                        error: function () {
                            z(),
                                (o.finished = o.loadError = !0),
                                f.updateStatus(
                                    "error",
                                    f.st.ajax.tError.replace("%url%", o.src)
                                );
                        },
                    },
                    f.st.ajax.settings
                );
                return (f.req = c.ajax(e)), "";
            },
        },
    });
    var L;
    c.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.',
        },
        proto: {
            initImage: function () {
                var e = f.st.image,
                    t = ".image";
                f.types.push("image"),
                    d(C + t, function () {
                        "image" === f.currItem.type &&
                            e.cursor &&
                            c(document.body).addClass(e.cursor);
                    }),
                    d(l + t, function () {
                        e.cursor && c(document.body).removeClass(e.cursor),
                            k.off("resize" + w);
                    }),
                    d("Resize" + t, f.resizeImage),
                    f.isLowIE && d("AfterChange", f.resizeImage);
            },
            resizeImage: function () {
                var e,
                    t = f.currItem;
                t &&
                    t.img &&
                    f.st.image.verticalFit &&
                    ((e = 0),
                    f.isLowIE &&
                        (e =
                            parseInt(t.img.css("padding-top"), 10) +
                            parseInt(t.img.css("padding-bottom"), 10)),
                    t.img.css("max-height", f.wH - e));
            },
            _onImageHasSize: function (e) {
                e.img &&
                    ((e.hasSize = !0),
                    L && clearInterval(L),
                    (e.isCheckingImgSize = !1),
                    p("ImageHasSize", e),
                    e.imgHidden &&
                        (f.content && f.content.removeClass("mfp-loading"),
                        (e.imgHidden = !1)));
            },
            findImageSize: function (t) {
                var n = 0,
                    o = t.img[0],
                    i = function (e) {
                        L && clearInterval(L),
                            (L = setInterval(function () {
                                return 0 < o.naturalWidth
                                    ? void f._onImageHasSize(t)
                                    : (200 < n && clearInterval(L),
                                      void (3 === ++n
                                          ? i(10)
                                          : 40 === n
                                          ? i(50)
                                          : 100 === n && i(500)));
                            }, e));
                    };
                i(1);
            },
            getImage: function (e, t) {
                var n,
                    o = 0,
                    i = function () {
                        e &&
                            (e.img[0].complete
                                ? (e.img.off(".mfploader"),
                                  e === f.currItem &&
                                      (f._onImageHasSize(e),
                                      f.updateStatus("ready")),
                                  (e.hasSize = !0),
                                  (e.loaded = !0),
                                  p("ImageLoadComplete"))
                                : ++o < 200
                                ? setTimeout(i, 100)
                                : r());
                    },
                    r = function () {
                        e &&
                            (e.img.off(".mfploader"),
                            e === f.currItem &&
                                (f._onImageHasSize(e),
                                f.updateStatus(
                                    "error",
                                    a.tError.replace("%url%", e.src)
                                )),
                            (e.hasSize = !0),
                            (e.loaded = !0),
                            (e.loadError = !0));
                    },
                    a = f.st.image,
                    s = t.find(".mfp-img");
                return (
                    s.length &&
                        (((n = document.createElement("img")).className =
                            "mfp-img"),
                        e.el &&
                            e.el.find("img").length &&
                            (n.alt = e.el.find("img").attr("alt")),
                        (e.img = c(n)
                            .on("load.mfploader", i)
                            .on("error.mfploader", r)),
                        (n.src = e.src),
                        s.is("img") && (e.img = e.img.clone()),
                        0 < (n = e.img[0]).naturalWidth
                            ? (e.hasSize = !0)
                            : n.width || (e.hasSize = !1)),
                    f._parseMarkup(
                        t,
                        {
                            title: (function (e) {
                                if (e.data && void 0 !== e.data.title)
                                    return e.data.title;
                                var t = f.st.image.titleSrc;
                                if (t) {
                                    if (c.isFunction(t)) return t.call(f, e);
                                    if (e.el) return e.el.attr(t) || "";
                                }
                                return "";
                            })(e),
                            img_replaceWith: e.img,
                        },
                        e
                    ),
                    f.resizeImage(),
                    e.hasSize
                        ? (L && clearInterval(L),
                          e.loadError
                              ? (t.addClass("mfp-loading"),
                                f.updateStatus(
                                    "error",
                                    a.tError.replace("%url%", e.src)
                                ))
                              : (t.removeClass("mfp-loading"),
                                f.updateStatus("ready")))
                        : (f.updateStatus("loading"),
                          (e.loading = !0),
                          e.hasSize ||
                              ((e.imgHidden = !0),
                              t.addClass("mfp-loading"),
                              f.findImageSize(e))),
                    t
                );
            },
        },
    });
    var H;
    c.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function (e) {
                return e.is("img") ? e : e.find("img");
            },
        },
        proto: {
            initZoom: function () {
                var e,
                    t,
                    n,
                    o,
                    i,
                    r,
                    a = f.st.zoom,
                    s = ".zoom";
                a.enabled &&
                    f.supportsTransition &&
                    ((o = a.duration),
                    (i = function (e) {
                        var t = e
                                .clone()
                                .removeAttr("style")
                                .removeAttr("class")
                                .addClass("mfp-animated-image"),
                            n = "all " + a.duration / 1e3 + "s " + a.easing,
                            o = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden",
                            },
                            e = "transition";
                        return (
                            (o["-webkit-" + e] =
                                o["-moz-" + e] =
                                o["-o-" + e] =
                                o[e] =
                                    n),
                            t.css(o),
                            t
                        );
                    }),
                    (r = function () {
                        f.content.css("visibility", "visible");
                    }),
                    d("BuildControls" + s, function () {
                        f._allowZoom() &&
                            (clearTimeout(t),
                            f.content.css("visibility", "hidden"),
                            (e = f._getItemToZoom())
                                ? ((n = i(e)).css(f._getOffset()),
                                  f.wrap.append(n),
                                  (t = setTimeout(function () {
                                      n.css(f._getOffset(!0)),
                                          (t = setTimeout(function () {
                                              r(),
                                                  setTimeout(function () {
                                                      n.remove(),
                                                          (e = n = null),
                                                          p(
                                                              "ZoomAnimationEnded"
                                                          );
                                                  }, 16);
                                          }, o));
                                  }, 16)))
                                : r());
                    }),
                    d(v + s, function () {
                        if (f._allowZoom()) {
                            if (
                                (clearTimeout(t), (f.st.removalDelay = o), !e)
                            ) {
                                if (!(e = f._getItemToZoom())) return;
                                n = i(e);
                            }
                            n.css(f._getOffset(!0)),
                                f.wrap.append(n),
                                f.content.css("visibility", "hidden"),
                                setTimeout(function () {
                                    n.css(f._getOffset());
                                }, 16);
                        }
                    }),
                    d(l + s, function () {
                        f._allowZoom() && (r(), n && n.remove(), (e = null));
                    }));
            },
            _allowZoom: function () {
                return "image" === f.currItem.type;
            },
            _getItemToZoom: function () {
                return !!f.currItem.hasSize && f.currItem.img;
            },
            _getOffset: function (e) {
                var t = e
                        ? f.currItem.img
                        : f.st.zoom.opener(f.currItem.el || f.currItem),
                    n = t.offset(),
                    o = parseInt(t.css("padding-top"), 10),
                    e = parseInt(t.css("padding-bottom"), 10);
                n.top -= c(window).scrollTop() - o;
                o = {
                    width: t.width(),
                    height: (x ? t.innerHeight() : t[0].offsetHeight) - e - o,
                };
                return (
                    (H =
                        void 0 === H
                            ? void 0 !==
                              document.createElement("p").style.MozTransform
                            : H)
                        ? (o["-moz-transform"] = o.transform =
                              "translate(" + n.left + "px," + n.top + "px)")
                        : ((o.left = n.left), (o.top = n.top)),
                    o
                );
            },
        },
    });
    function A(e) {
        var t;
        !f.currTemplate[F] ||
            ((t = f.currTemplate[F].find("iframe")).length &&
                (e || (t[0].src = "//about:blank"),
                f.isIE8 && t.css("display", e ? "block" : "none")));
    }
    var F = "iframe";
    c.magnificPopup.registerModule(F, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1",
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1",
                },
                gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
            },
        },
        proto: {
            initIframe: function () {
                f.types.push(F),
                    d("BeforeChange", function (e, t, n) {
                        t !== n && (t === F ? A() : n === F && A(!0));
                    }),
                    d(l + "." + F, function () {
                        A();
                    });
            },
            getIframe: function (e, t) {
                var n = e.src,
                    o = f.st.iframe;
                c.each(o.patterns, function () {
                    return -1 < n.indexOf(this.index)
                        ? (this.id &&
                              (n =
                                  "string" == typeof this.id
                                      ? n.substr(
                                            n.lastIndexOf(this.id) +
                                                this.id.length,
                                            n.length
                                        )
                                      : this.id.call(this, n)),
                          (n = this.src.replace("%id%", n)),
                          !1)
                        : void 0;
                });
                var i = {};
                return (
                    o.srcAction && (i[o.srcAction] = n),
                    f._parseMarkup(t, i, e),
                    f.updateStatus("ready"),
                    t
                );
            },
        },
    });
    function j(e) {
        var t = f.items.length;
        return t - 1 < e ? e - t : e < 0 ? t + e : e;
    }
    function N(e, t, n) {
        return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, n);
    }
    c.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup:
                '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%",
        },
        proto: {
            initGallery: function () {
                var r = f.st.gallery,
                    e = ".mfp-gallery";
                return (
                    (f.direction = !0),
                    !(!r || !r.enabled) &&
                        ((h += " mfp-gallery"),
                        d(C + e, function () {
                            r.navigateByImgClick &&
                                f.wrap.on("click" + e, ".mfp-img", function () {
                                    return 1 < f.items.length
                                        ? (f.next(), !1)
                                        : void 0;
                                }),
                                g.on("keydown" + e, function (e) {
                                    37 === e.keyCode
                                        ? f.prev()
                                        : 39 === e.keyCode && f.next();
                                });
                        }),
                        d("UpdateStatus" + e, function (e, t) {
                            t.text &&
                                (t.text = N(
                                    t.text,
                                    f.currItem.index,
                                    f.items.length
                                ));
                        }),
                        d(y + e, function (e, t, n, o) {
                            var i = f.items.length;
                            n.counter = 1 < i ? N(r.tCounter, o.index, i) : "";
                        }),
                        d("BuildControls" + e, function () {
                            var e, t;
                            1 < f.items.length &&
                                r.arrows &&
                                !f.arrowLeft &&
                                ((t = r.arrowMarkup),
                                (e = f.arrowLeft =
                                    c(
                                        t
                                            .replace(/%title%/gi, r.tPrev)
                                            .replace(/%dir%/gi, "left")
                                    ).addClass(I)),
                                (t = f.arrowRight =
                                    c(
                                        t
                                            .replace(/%title%/gi, r.tNext)
                                            .replace(/%dir%/gi, "right")
                                    ).addClass(I)),
                                e.click(function () {
                                    f.prev();
                                }),
                                t.click(function () {
                                    f.next();
                                }),
                                f.container.append(e.add(t)));
                        }),
                        d(a + e, function () {
                            f._preloadTimeout &&
                                clearTimeout(f._preloadTimeout),
                                (f._preloadTimeout = setTimeout(function () {
                                    f.preloadNearbyImages(),
                                        (f._preloadTimeout = null);
                                }, 16));
                        }),
                        void d(l + e, function () {
                            g.off(e),
                                f.wrap.off("click" + e),
                                (f.arrowRight = f.arrowLeft = null);
                        }))
                );
            },
            next: function () {
                (f.direction = !0),
                    (f.index = j(f.index + 1)),
                    f.updateItemHTML();
            },
            prev: function () {
                (f.direction = !1),
                    (f.index = j(f.index - 1)),
                    f.updateItemHTML();
            },
            goTo: function (e) {
                (f.direction = e >= f.index), (f.index = e), f.updateItemHTML();
            },
            preloadNearbyImages: function () {
                for (
                    var e = f.st.gallery.preload,
                        t = Math.min(e[0], f.items.length),
                        n = Math.min(e[1], f.items.length),
                        o = 1;
                    o <= (f.direction ? n : t);
                    o++
                )
                    f._preloadItem(f.index + o);
                for (o = 1; o <= (f.direction ? t : n); o++)
                    f._preloadItem(f.index - o);
            },
            _preloadItem: function (e) {
                var t;
                (e = j(e)),
                    f.items[e].preloaded ||
                        ((t = f.items[e]).parsed || (t = f.parseEl(e)),
                        p("LazyLoad", t),
                        "image" === t.type &&
                            (t.img = c('<img class="mfp-img" />')
                                .on("load.mfploader", function () {
                                    t.hasSize = !0;
                                })
                                .on("error.mfploader", function () {
                                    (t.hasSize = !0),
                                        (t.loadError = !0),
                                        p("LazyLoadError", t);
                                })
                                .attr("src", t.src)),
                        (t.preloaded = !0));
            },
        },
    });
    var W = "retina";
    c.magnificPopup.registerModule(W, {
        options: {
            replaceSrc: function (e) {
                return e.src.replace(/\.\w+$/, function (e) {
                    return "@2x" + e;
                });
            },
            ratio: 1,
        },
        proto: {
            initRetina: function () {
                var n, o;
                1 < window.devicePixelRatio &&
                    ((n = f.st.retina),
                    (o = n.ratio),
                    1 < (o = isNaN(o) ? o() : o) &&
                        (d("ImageHasSize." + W, function (e, t) {
                            t.img.css({
                                "max-width": t.img[0].naturalWidth / o,
                                width: "100%",
                            });
                        }),
                        d("ElementParse." + W, function (e, t) {
                            t.src = n.replaceSrc(t, o);
                        })));
            },
        },
    }),
        r();
});
var Kinetic = {};
!(function (t) {
    var e = Math.PI / 180;
    (Kinetic = {
        version: "5.1.1",
        stages: [],
        idCounter: 0,
        ids: {},
        names: {},
        shapes: {},
        listenClickTap: !1,
        inDblClickWindow: !1,
        enableTrace: !1,
        traceArrMax: 100,
        dblClickWindow: 400,
        pixelRatio: void 0,
        dragDistance: 0,
        angleDeg: !0,
        showWarnings: !0,
        Filters: {},
        Node: function (t) {
            this._init(t);
        },
        Shape: function (t) {
            this.__init(t);
        },
        Container: function (t) {
            this.__init(t);
        },
        Stage: function (t) {
            this.___init(t);
        },
        BaseLayer: function (t) {
            this.___init(t);
        },
        Layer: function (t) {
            this.____init(t);
        },
        FastLayer: function (t) {
            this.____init(t);
        },
        Group: function (t) {
            this.___init(t);
        },
        isDragging: function () {
            var t = Kinetic.DD;
            return !!t && t.isDragging;
        },
        isDragReady: function () {
            var t = Kinetic.DD;
            return !!t && !!t.node;
        },
        _addId: function (t, e) {
            void 0 !== e && (this.ids[e] = t);
        },
        _removeId: function (t) {
            void 0 !== t && delete this.ids[t];
        },
        _addName: function (t, e) {
            if (void 0 !== e)
                for (var i = e.split(/\W+/g), n = 0; n < i.length; n++)
                    i[n] &&
                        (void 0 === this.names[i[n]] && (this.names[i[n]] = []),
                        this.names[i[n]].push(t));
        },
        _removeName: function (t, e) {
            if (void 0 !== t) {
                var i = this.names[t];
                if (void 0 !== i) {
                    for (var n = 0; n < i.length; n++)
                        i[n]._id === e && i.splice(n, 1);
                    0 === i.length && delete this.names[t];
                }
            }
        },
        getAngle: function (t) {
            return this.angleDeg ? t * e : t;
        },
        _parseUA: function (t) {
            var e = t.toLowerCase(),
                i =
                    /(chrome)[ \/]([\w.]+)/.exec(e) ||
                    /(webkit)[ \/]([\w.]+)/.exec(e) ||
                    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) ||
                    /(msie) ([\w.]+)/.exec(e) ||
                    (e.indexOf("compatible") < 0 &&
                        /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)) ||
                    [],
                e = !!t.match(
                    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
                ),
                t = !!t.match(/IEMobile/i);
            return {
                browser: i[1] || "",
                version: i[2] || "0",
                mobile: e,
                ieMobile: t,
            };
        },
        UA: void 0,
    }).UA = Kinetic._parseUA((t.navigator && t.navigator.userAgent) || "");
})(this),
    (function (t, e) {
        if ("object" == typeof exports) {
            var i,
                n,
                a = e();
            return (
                global.window === global
                    ? ((Kinetic.document = global.document),
                      (Kinetic.window = global))
                    : ((i = require("canvas")),
                      (n = require("jsdom").jsdom),
                      (Kinetic.document = n(
                          "<!DOCTYPE html><html><head></head><body></body></html>"
                      )),
                      (Kinetic.window = Kinetic.document.createWindow()),
                      (Kinetic.window.Image = i.Image),
                      (Kinetic._nodeCanvas = i)),
                (Kinetic.root = t),
                (module.exports = a)
            );
        }
        "function" == typeof define && define.amd && define(e),
            (Kinetic.document = document),
            (Kinetic.window = window),
            (Kinetic.root = t);
    })(this, function () {
        return Kinetic;
    }),
    (function () {
        (Kinetic.Collection = function () {
            var t = [].slice.call(arguments),
                e = t.length,
                i = 0;
            for (this.length = e; i < e; i++) this[i] = t[i];
            return this;
        }),
            (Kinetic.Collection.prototype = []),
            (Kinetic.Collection.prototype.each = function (t) {
                for (var e = 0; e < this.length; e++) t(this[e], e);
            }),
            (Kinetic.Collection.prototype.toArray = function () {
                for (var t = [], e = this.length, i = 0; i < e; i++)
                    t.push(this[i]);
                return t;
            }),
            (Kinetic.Collection.toCollection = function (t) {
                for (
                    var e = new Kinetic.Collection(), i = t.length, n = 0;
                    n < i;
                    n++
                )
                    e.push(t[n]);
                return e;
            }),
            (Kinetic.Collection._mapMethod = function (n) {
                Kinetic.Collection.prototype[n] = function () {
                    for (
                        var t = this.length,
                            e = [].slice.call(arguments),
                            i = 0;
                        i < t;
                        i++
                    )
                        this[i][n].apply(this[i], e);
                    return this;
                };
            }),
            (Kinetic.Collection.mapMethods = function (t) {
                for (var e in t.prototype) Kinetic.Collection._mapMethod(e);
            }),
            (Kinetic.Transform = function (t) {
                this.m = (t && t.slice()) || [1, 0, 0, 1, 0, 0];
            }),
            (Kinetic.Transform.prototype = {
                copy: function () {
                    return new Kinetic.Transform(this.m);
                },
                point: function (t) {
                    var e = this.m;
                    return {
                        x: e[0] * t.x + e[2] * t.y + e[4],
                        y: e[1] * t.x + e[3] * t.y + e[5],
                    };
                },
                translate: function (t, e) {
                    return (
                        (this.m[4] += this.m[0] * t + this.m[2] * e),
                        (this.m[5] += this.m[1] * t + this.m[3] * e),
                        this
                    );
                },
                scale: function (t, e) {
                    return (
                        (this.m[0] *= t),
                        (this.m[1] *= t),
                        (this.m[2] *= e),
                        (this.m[3] *= e),
                        this
                    );
                },
                rotate: function (t) {
                    var e = Math.cos(t),
                        i = Math.sin(t),
                        n = this.m[0] * e + this.m[2] * i,
                        a = this.m[1] * e + this.m[3] * i,
                        t = this.m[0] * -i + this.m[2] * e,
                        e = this.m[1] * -i + this.m[3] * e;
                    return (
                        (this.m[0] = n),
                        (this.m[1] = a),
                        (this.m[2] = t),
                        (this.m[3] = e),
                        this
                    );
                },
                getTranslation: function () {
                    return { x: this.m[4], y: this.m[5] };
                },
                skew: function (t, e) {
                    var i = this.m[0] + this.m[2] * e,
                        n = this.m[1] + this.m[3] * e,
                        e = this.m[2] + this.m[0] * t,
                        t = this.m[3] + this.m[1] * t;
                    return (
                        (this.m[0] = i),
                        (this.m[1] = n),
                        (this.m[2] = e),
                        (this.m[3] = t),
                        this
                    );
                },
                multiply: function (t) {
                    var e = this.m[0] * t.m[0] + this.m[2] * t.m[1],
                        i = this.m[1] * t.m[0] + this.m[3] * t.m[1],
                        n = this.m[0] * t.m[2] + this.m[2] * t.m[3],
                        a = this.m[1] * t.m[2] + this.m[3] * t.m[3],
                        r = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4],
                        t = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
                    return (
                        (this.m[0] = e),
                        (this.m[1] = i),
                        (this.m[2] = n),
                        (this.m[3] = a),
                        (this.m[4] = r),
                        (this.m[5] = t),
                        this
                    );
                },
                invert: function () {
                    var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
                        e = this.m[3] * t,
                        i = -this.m[1] * t,
                        n = -this.m[2] * t,
                        a = this.m[0] * t,
                        r = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
                        t = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
                    return (
                        (this.m[0] = e),
                        (this.m[1] = i),
                        (this.m[2] = n),
                        (this.m[3] = a),
                        (this.m[4] = r),
                        (this.m[5] = t),
                        this
                    );
                },
                getMatrix: function () {
                    return this.m;
                },
                setAbsolutePosition: function (t, e) {
                    var i = this.m[0],
                        n = this.m[1],
                        a = this.m[2],
                        r = this.m[3],
                        s = this.m[4],
                        n =
                            (i * (e - this.m[5]) - n * (t - s)) /
                            (i * r - n * a);
                    return this.translate((t - s - a * n) / i, n);
                },
            });
        var e = Math.PI / 180,
            i = 180 / Math.PI,
            n = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0],
            },
            a = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
        Kinetic.Util = {
            _isElement: function (t) {
                return !(!t || 1 != t.nodeType);
            },
            _isFunction: function (t) {
                return !!(t && t.constructor && t.call && t.apply);
            },
            _isObject: function (t) {
                return !!t && t.constructor == Object;
            },
            _isArray: function (t) {
                return "[object Array]" == Object.prototype.toString.call(t);
            },
            _isNumber: function (t) {
                return "[object Number]" == Object.prototype.toString.call(t);
            },
            _isString: function (t) {
                return "[object String]" == Object.prototype.toString.call(t);
            },
            _throttle: function (i, n, t) {
                function a() {
                    (h = !1 === l.leading ? 0 : new Date().getTime()),
                        (c = null),
                        (o = i.apply(r, s)),
                        (r = s = null);
                }
                var r,
                    s,
                    o,
                    c = null,
                    h = 0,
                    l = t || {};
                return function () {
                    var t = new Date().getTime();
                    h || !1 !== l.leading || (h = t);
                    var e = n - (t - h);
                    return (
                        (r = this),
                        (s = arguments),
                        e <= 0
                            ? (clearTimeout(c),
                              (c = null),
                              (h = t),
                              (o = i.apply(r, s)),
                              (r = s = null))
                            : c || !1 === l.trailing || (c = setTimeout(a, e)),
                        o
                    );
                };
            },
            _hasMethods: function (t) {
                var e,
                    i = [];
                for (e in t) this._isFunction(t[e]) && i.push(e);
                return 0 < i.length;
            },
            createCanvasElement: function () {
                var t = Kinetic.document.createElement("canvas");
                try {
                    t.style = t.style || {};
                } catch (t) {}
                return t;
            },
            isBrowser: function () {
                return "object" != typeof exports;
            },
            _isInDocument: function (t) {
                for (; (t = t.parentNode); )
                    if (t == Kinetic.document) return !0;
                return !1;
            },
            _simplifyArray: function (t) {
                for (
                    var e, i = [], n = t.length, a = Kinetic.Util, r = 0;
                    r < n;
                    r++
                )
                    (e = t[r]),
                        a._isNumber(e)
                            ? (e = Math.round(1e3 * e) / 1e3)
                            : a._isString(e) || (e = e.toString()),
                        i.push(e);
                return i;
            },
            _getImage: function (t, e) {
                var i, n;
                t
                    ? this._isElement(t)
                        ? e(t)
                        : this._isString(t)
                        ? (((i = new Kinetic.window.Image()).onload =
                              function () {
                                  e(i);
                              }),
                          (i.src = t))
                        : t.data
                        ? (((n = Kinetic.Util.createCanvasElement()).width =
                              t.width),
                          (n.height = t.height),
                          n.getContext("2d").putImageData(t, 0, 0),
                          this._getImage(n.toDataURL(), e))
                        : e(null)
                    : e(null);
            },
            _getRGBAString: function (t) {
                return [
                    "rgba(",
                    t.red || 0,
                    ",",
                    t.green || 0,
                    ",",
                    t.blue || 0,
                    ",",
                    t.alpha || 1,
                    ")",
                ].join("");
            },
            _rgbToHex: function (t, e, i) {
                return ((1 << 24) + (t << 16) + (e << 8) + i)
                    .toString(16)
                    .slice(1);
            },
            _hexToRgb: function (t) {
                t = t.replace("#", "");
                t = parseInt(t, 16);
                return { r: (t >> 16) & 255, g: (t >> 8) & 255, b: 255 & t };
            },
            getRandomColor: function () {
                for (
                    var t = ((16777215 * Math.random()) << 0).toString(16);
                    t.length < 6;

                )
                    t = "0" + t;
                return "#" + t;
            },
            get: function (t, e) {
                return void 0 === t ? e : t;
            },
            getRGB: function (t) {
                var e;
                return t in n
                    ? { r: (e = n[t])[0], g: e[1], b: e[2] }
                    : "#" === t[0]
                    ? this._hexToRgb(t.substring(1))
                    : "rgb(" === t.substr(0, 4)
                    ? ((e = a.exec(t.replace(/ /g, ""))),
                      {
                          r: parseInt(e[1], 10),
                          g: parseInt(e[2], 10),
                          b: parseInt(e[3], 10),
                      })
                    : { r: 0, g: 0, b: 0 };
            },
            _merge: function (t, e) {
                var i,
                    n = this._clone(e);
                for (i in t)
                    n[i] = this._isObject(t[i])
                        ? this._merge(t[i], n[i])
                        : t[i];
                return n;
            },
            cloneObject: function (t) {
                var e,
                    i = {};
                for (e in t)
                    i[e] = this._isObject(t[e])
                        ? this.cloneObject(t[e])
                        : this._isArray(t[e])
                        ? this.cloneArray(t[e])
                        : t[e];
                return i;
            },
            cloneArray: function (t) {
                return t.slice(0);
            },
            _degToRad: function (t) {
                return t * e;
            },
            _radToDeg: function (t) {
                return t * i;
            },
            _capitalize: function (t) {
                return t.charAt(0).toUpperCase() + t.slice(1);
            },
            error: function (t) {
                throw new Error("Kinetic error: " + t);
            },
            warn: function (t) {
                Kinetic.root.console &&
                    console.warn &&
                    Kinetic.showWarnings &&
                    console.warn("Kinetic warning: " + t);
            },
            extend: function (t, e) {
                for (var i in e.prototype)
                    i in t.prototype || (t.prototype[i] = e.prototype[i]);
            },
            addMethods: function (t, e) {
                for (var i in e) t.prototype[i] = e[i];
            },
            _getControlPoints: function (t, e, i, n, a, r, s) {
                var o = Math.sqrt(Math.pow(i - t, 2) + Math.pow(n - e, 2)),
                    c = Math.sqrt(Math.pow(a - i, 2) + Math.pow(r - n, 2)),
                    h = (s * o) / (o + c),
                    c = (s * c) / (o + c);
                return [
                    i - h * (a - t),
                    n - h * (r - e),
                    i + c * (a - t),
                    n + c * (r - e),
                ];
            },
            _expandPoints: function (t, e) {
                for (var i, n = t.length, a = [], r = 2; r < n - 2; r += 2)
                    (i = Kinetic.Util._getControlPoints(
                        t[r - 2],
                        t[r - 1],
                        t[r],
                        t[r + 1],
                        t[r + 2],
                        t[r + 3],
                        e
                    )),
                        a.push(i[0]),
                        a.push(i[1]),
                        a.push(t[r]),
                        a.push(t[r + 1]),
                        a.push(i[2]),
                        a.push(i[3]);
                return a;
            },
            _removeLastLetter: function (t) {
                return t.substring(0, t.length - 1);
            },
        };
    })(),
    (function () {
        var t = Kinetic.Util.createCanvasElement().getContext("2d"),
            e = Kinetic.UA.mobile
                ? (window.devicePixelRatio || 1) /
                  (t.webkitBackingStorePixelRatio ||
                      t.mozBackingStorePixelRatio ||
                      t.msBackingStorePixelRatio ||
                      t.oBackingStorePixelRatio ||
                      t.backingStorePixelRatio ||
                      1)
                : 1;
        (Kinetic.Canvas = function (t) {
            this.init(t);
        }),
            (Kinetic.Canvas.prototype = {
                init: function (t) {
                    t = (t || {}).pixelRatio || Kinetic.pixelRatio || e;
                    (this.pixelRatio = t),
                        (this._canvas = Kinetic.Util.createCanvasElement()),
                        (this._canvas.style.padding = 0),
                        (this._canvas.style.margin = 0),
                        (this._canvas.style.border = 0),
                        (this._canvas.style.background = "transparent"),
                        (this._canvas.style.position = "absolute"),
                        (this._canvas.style.top = 0),
                        (this._canvas.style.left = 0);
                },
                getContext: function () {
                    return this.context;
                },
                getPixelRatio: function () {
                    return this.pixelRatio;
                },
                setPixelRatio: function (t) {
                    (this.pixelRatio = t),
                        this.setSize(this.getWidth(), this.getHeight());
                },
                setWidth: function (t) {
                    (this.width = this._canvas.width = t * this.pixelRatio),
                        (this._canvas.style.width = t + "px");
                },
                setHeight: function (t) {
                    (this.height = this._canvas.height = t * this.pixelRatio),
                        (this._canvas.style.height = t + "px");
                },
                getWidth: function () {
                    return this.width;
                },
                getHeight: function () {
                    return this.height;
                },
                setSize: function (t, e) {
                    this.setWidth(t), this.setHeight(e);
                },
                toDataURL: function (t, e) {
                    try {
                        return this._canvas.toDataURL(t, e);
                    } catch (t) {
                        try {
                            return this._canvas.toDataURL();
                        } catch (t) {
                            return (
                                Kinetic.Util.warn(
                                    "Unable to get data URL. " + t.message
                                ),
                                ""
                            );
                        }
                    }
                },
            }),
            (Kinetic.SceneCanvas = function (t) {
                var e = t || {},
                    i = e.width || 0,
                    t = e.height || 0;
                Kinetic.Canvas.call(this, e),
                    (this.context = new Kinetic.SceneContext(this)),
                    this.setSize(i, t);
            }),
            (Kinetic.SceneCanvas.prototype = {
                setWidth: function (t) {
                    var e = this.pixelRatio,
                        i = this.getContext()._context;
                    Kinetic.Canvas.prototype.setWidth.call(this, t),
                        i.scale(e, e);
                },
                setHeight: function (t) {
                    var e = this.pixelRatio,
                        i = this.getContext()._context;
                    Kinetic.Canvas.prototype.setHeight.call(this, t),
                        i.scale(e, e);
                },
            }),
            Kinetic.Util.extend(Kinetic.SceneCanvas, Kinetic.Canvas),
            (Kinetic.HitCanvas = function (t) {
                var e = t || {},
                    i = e.width || 0,
                    t = e.height || 0;
                Kinetic.Canvas.call(this, e),
                    (this.context = new Kinetic.HitContext(this)),
                    this.setSize(i, t),
                    (this.hitCanvas = !0);
            }),
            Kinetic.Util.extend(Kinetic.HitCanvas, Kinetic.Canvas);
    })(),
    (function () {
        var s = [
            "arc",
            "arcTo",
            "beginPath",
            "bezierCurveTo",
            "clearRect",
            "clip",
            "closePath",
            "createLinearGradient",
            "createPattern",
            "createRadialGradient",
            "drawImage",
            "fill",
            "fillText",
            "getImageData",
            "createImageData",
            "lineTo",
            "moveTo",
            "putImageData",
            "quadraticCurveTo",
            "rect",
            "restore",
            "rotate",
            "save",
            "scale",
            "setLineDash",
            "setTransform",
            "stroke",
            "strokeText",
            "transform",
            "translate",
        ];
        (Kinetic.Context = function (t) {
            this.init(t);
        }),
            (Kinetic.Context.prototype = {
                init: function (t) {
                    (this.canvas = t),
                        (this._context = t._canvas.getContext("2d")),
                        Kinetic.enableTrace &&
                            ((this.traceArr = []), this._enableTrace());
                },
                fillShape: function (t) {
                    t.getFillEnabled() && this._fill(t);
                },
                strokeShape: function (t) {
                    t.getStrokeEnabled() && this._stroke(t);
                },
                fillStrokeShape: function (t) {
                    t.getFillEnabled() && this._fill(t),
                        t.getStrokeEnabled() && this._stroke(t);
                },
                getTrace: function (t) {
                    for (
                        var e,
                            i,
                            n,
                            a = this.traceArr,
                            r = a.length,
                            s = "",
                            o = 0;
                        o < r;
                        o++
                    )
                        (i = (e = a[o]).method)
                            ? ((n = e.args),
                              (s += i),
                              (s += t
                                  ? "()"
                                  : Kinetic.Util._isArray(n[0])
                                  ? "([" + n.join(",") + "])"
                                  : "(" + n.join(",") + ")"))
                            : ((s += e.property), t || (s += "=" + e.val)),
                            (s += ";");
                    return s;
                },
                clearTrace: function () {
                    this.traceArr = [];
                },
                _trace: function (t) {
                    var e = this.traceArr;
                    e.push(t), e.length >= Kinetic.traceArrMax && e.shift();
                },
                reset: function () {
                    var t = this.getCanvas().getPixelRatio();
                    this.setTransform(+t, 0, 0, +t, 0, 0);
                },
                getCanvas: function () {
                    return this.canvas;
                },
                clear: function (t) {
                    var e = this.getCanvas();
                    t
                        ? this.clearRect(
                              t.x || 0,
                              t.y || 0,
                              t.width || 0,
                              t.height || 0
                          )
                        : this.clearRect(0, 0, e.getWidth(), e.getHeight());
                },
                _applyLineCap: function (t) {
                    t = t.getLineCap();
                    t && this.setAttr("lineCap", t);
                },
                _applyOpacity: function (t) {
                    t = t.getAbsoluteOpacity();
                    1 !== t && this.setAttr("globalAlpha", t);
                },
                _applyLineJoin: function (t) {
                    t = t.getLineJoin();
                    t && this.setAttr("lineJoin", t);
                },
                setAttr: function (t, e) {
                    this._context[t] = e;
                },
                arc: function () {
                    var t = arguments;
                    this._context.arc(t[0], t[1], t[2], t[3], t[4], t[5]);
                },
                beginPath: function () {
                    this._context.beginPath();
                },
                bezierCurveTo: function () {
                    var t = arguments;
                    this._context.bezierCurveTo(
                        t[0],
                        t[1],
                        t[2],
                        t[3],
                        t[4],
                        t[5]
                    );
                },
                clearRect: function () {
                    var t = arguments;
                    this._context.clearRect(t[0], t[1], t[2], t[3]);
                },
                clip: function () {
                    this._context.clip();
                },
                closePath: function () {
                    this._context.closePath();
                },
                createImageData: function () {
                    var t = arguments;
                    return 2 === t.length
                        ? this._context.createImageData(t[0], t[1])
                        : 1 === t.length
                        ? this._context.createImageData(t[0])
                        : void 0;
                },
                createLinearGradient: function () {
                    var t = arguments;
                    return this._context.createLinearGradient(
                        t[0],
                        t[1],
                        t[2],
                        t[3]
                    );
                },
                createPattern: function () {
                    var t = arguments;
                    return this._context.createPattern(t[0], t[1]);
                },
                createRadialGradient: function () {
                    var t = arguments;
                    return this._context.createRadialGradient(
                        t[0],
                        t[1],
                        t[2],
                        t[3],
                        t[4],
                        t[5]
                    );
                },
                drawImage: function () {
                    var t = arguments,
                        e = this._context;
                    3 === t.length
                        ? e.drawImage(t[0], t[1], t[2])
                        : 5 === t.length
                        ? e.drawImage(t[0], t[1], t[2], t[3], t[4])
                        : 9 === t.length &&
                          e.drawImage(
                              t[0],
                              t[1],
                              t[2],
                              t[3],
                              t[4],
                              t[5],
                              t[6],
                              t[7],
                              t[8]
                          );
                },
                fill: function () {
                    this._context.fill();
                },
                fillText: function () {
                    var t = arguments;
                    this._context.fillText(t[0], t[1], t[2]);
                },
                getImageData: function () {
                    var t = arguments;
                    return this._context.getImageData(t[0], t[1], t[2], t[3]);
                },
                lineTo: function () {
                    var t = arguments;
                    this._context.lineTo(t[0], t[1]);
                },
                moveTo: function () {
                    var t = arguments;
                    this._context.moveTo(t[0], t[1]);
                },
                rect: function () {
                    var t = arguments;
                    this._context.rect(t[0], t[1], t[2], t[3]);
                },
                putImageData: function () {
                    var t = arguments;
                    this._context.putImageData(t[0], t[1], t[2]);
                },
                quadraticCurveTo: function () {
                    var t = arguments;
                    this._context.quadraticCurveTo(t[0], t[1], t[2], t[3]);
                },
                restore: function () {
                    this._context.restore();
                },
                rotate: function () {
                    this._context.rotate(arguments[0]);
                },
                save: function () {
                    this._context.save();
                },
                scale: function () {
                    var t = arguments;
                    this._context.scale(t[0], t[1]);
                },
                setLineDash: function () {
                    var t = arguments,
                        e = this._context;
                    this._context.setLineDash
                        ? e.setLineDash(t[0])
                        : "mozDash" in e
                        ? (e.mozDash = t[0])
                        : "webkitLineDash" in e && (e.webkitLineDash = t[0]);
                },
                setTransform: function () {
                    var t = arguments;
                    this._context.setTransform(
                        t[0],
                        t[1],
                        t[2],
                        t[3],
                        t[4],
                        t[5]
                    );
                },
                stroke: function () {
                    this._context.stroke();
                },
                strokeText: function () {
                    var t = arguments;
                    this._context.strokeText(t[0], t[1], t[2]);
                },
                transform: function () {
                    var t = arguments;
                    this._context.transform(t[0], t[1], t[2], t[3], t[4], t[5]);
                },
                translate: function () {
                    var t = arguments;
                    this._context.translate(t[0], t[1]);
                },
                _enableTrace: function () {
                    for (
                        var n,
                            a = this,
                            t = s.length,
                            r = Kinetic.Util._simplifyArray,
                            e = this.setAttr,
                            i = 0;
                        i < t;
                        i++
                    )
                        !(function (t) {
                            var e,
                                i = a[t];
                            a[t] = function () {
                                return (
                                    (n = r(
                                        Array.prototype.slice.call(arguments, 0)
                                    )),
                                    (e = i.apply(a, arguments)),
                                    a._trace({ method: t, args: n }),
                                    e
                                );
                            };
                        })(s[i]);
                    a.setAttr = function () {
                        e.apply(a, arguments),
                            a._trace({
                                property: arguments[0],
                                val: arguments[1],
                            });
                    };
                },
            }),
            (Kinetic.SceneContext = function (t) {
                Kinetic.Context.call(this, t);
            }),
            (Kinetic.SceneContext.prototype = {
                _fillColor: function (t) {
                    var e =
                        t.fill() ||
                        Kinetic.Util._getRGBAString({
                            red: t.fillRed(),
                            green: t.fillGreen(),
                            blue: t.fillBlue(),
                            alpha: t.fillAlpha(),
                        });
                    this.setAttr("fillStyle", e), t._fillFunc(this);
                },
                _fillPattern: function (t) {
                    var e = t.getFillPatternImage(),
                        i = t.getFillPatternX(),
                        n = t.getFillPatternY(),
                        a = t.getFillPatternScale(),
                        r = Kinetic.getAngle(t.getFillPatternRotation()),
                        s = t.getFillPatternOffset(),
                        t = t.getFillPatternRepeat();
                    (i || n) && this.translate(i || 0, n || 0),
                        r && this.rotate(r),
                        a && this.scale(a.x, a.y),
                        s && this.translate(-1 * s.x, -1 * s.y),
                        this.setAttr(
                            "fillStyle",
                            this.createPattern(e, t || "repeat")
                        ),
                        this.fill();
                },
                _fillLinearGradient: function (t) {
                    var e = t.getFillLinearGradientStartPoint(),
                        i = t.getFillLinearGradientEndPoint(),
                        n = t.getFillLinearGradientColorStops(),
                        a = this.createLinearGradient(e.x, e.y, i.x, i.y);
                    if (n) {
                        for (var r = 0; r < n.length; r += 2)
                            a.addColorStop(n[r], n[r + 1]);
                        this.setAttr("fillStyle", a), this.fill();
                    }
                },
                _fillRadialGradient: function (t) {
                    for (
                        var e = t.getFillRadialGradientStartPoint(),
                            i = t.getFillRadialGradientEndPoint(),
                            n = t.getFillRadialGradientStartRadius(),
                            a = t.getFillRadialGradientEndRadius(),
                            r = t.getFillRadialGradientColorStops(),
                            s = this.createRadialGradient(
                                e.x,
                                e.y,
                                n,
                                i.x,
                                i.y,
                                a
                            ),
                            o = 0;
                        o < r.length;
                        o += 2
                    )
                        s.addColorStop(r[o], r[o + 1]);
                    this.setAttr("fillStyle", s), this.fill();
                },
                _fill: function (t) {
                    var e =
                            t.fill() ||
                            t.fillRed() ||
                            t.fillGreen() ||
                            t.fillBlue(),
                        i = t.getFillPatternImage(),
                        n = t.getFillLinearGradientColorStops(),
                        a = t.getFillRadialGradientColorStops(),
                        r = t.getFillPriority();
                    e && "color" === r
                        ? this._fillColor(t)
                        : i && "pattern" === r
                        ? this._fillPattern(t)
                        : n && "linear-gradient" === r
                        ? this._fillLinearGradient(t)
                        : a && "radial-gradient" === r
                        ? this._fillRadialGradient(t)
                        : e
                        ? this._fillColor(t)
                        : i
                        ? this._fillPattern(t)
                        : n
                        ? this._fillLinearGradient(t)
                        : a && this._fillRadialGradient(t);
                },
                _stroke: function (t) {
                    var e = t.dash(),
                        i = t.getStrokeScaleEnabled();
                    t.hasStroke() &&
                        (i ||
                            (this.save(), this.setTransform(1, 0, 0, 1, 0, 0)),
                        this._applyLineCap(t),
                        e && t.dashEnabled() && this.setLineDash(e),
                        this.setAttr("lineWidth", t.strokeWidth()),
                        this.setAttr(
                            "strokeStyle",
                            t.stroke() ||
                                Kinetic.Util._getRGBAString({
                                    red: t.strokeRed(),
                                    green: t.strokeGreen(),
                                    blue: t.strokeBlue(),
                                    alpha: t.strokeAlpha(),
                                })
                        ),
                        t._strokeFunc(this),
                        i || this.restore());
                },
                _applyShadow: function (t) {
                    var e = Kinetic.Util,
                        i = t.getAbsoluteOpacity(),
                        n = e.get(t.getShadowColor(), "black"),
                        a = e.get(t.getShadowBlur(), 5),
                        r = e.get(t.getShadowOpacity(), 1),
                        t = e.get(t.getShadowOffset(), { x: 0, y: 0 });
                    r && this.setAttr("globalAlpha", r * i),
                        this.setAttr("shadowColor", n),
                        this.setAttr("shadowBlur", a),
                        this.setAttr("shadowOffsetX", t.x),
                        this.setAttr("shadowOffsetY", t.y);
                },
            }),
            Kinetic.Util.extend(Kinetic.SceneContext, Kinetic.Context),
            (Kinetic.HitContext = function (t) {
                Kinetic.Context.call(this, t);
            }),
            (Kinetic.HitContext.prototype = {
                _fill: function (t) {
                    this.save(),
                        this.setAttr("fillStyle", t.colorKey),
                        t._fillFuncHit(this),
                        this.restore();
                },
                _stroke: function (t) {
                    t.hasStroke() &&
                        (this._applyLineCap(t),
                        this.setAttr("lineWidth", t.strokeWidth()),
                        this.setAttr("strokeStyle", t.colorKey),
                        t._strokeFuncHit(this));
                },
            }),
            Kinetic.Util.extend(Kinetic.HitContext, Kinetic.Context);
    })(),
    (Kinetic.Factory = {
        addGetterSetter: function (t, e, i, n, a) {
            this.addGetter(t, e, i),
                this.addSetter(t, e, n, a),
                this.addOverloadedGetterSetter(t, e);
        },
        addGetter: function (t, e, i) {
            var n = "get" + Kinetic.Util._capitalize(e);
            t.prototype[n] = function () {
                var t = this.attrs[e];
                return void 0 === t ? i : t;
            };
        },
        addSetter: function (t, e, i, n) {
            var a = "set" + Kinetic.Util._capitalize(e);
            t.prototype[a] = function (t) {
                return (
                    i && (t = i.call(this, t)),
                    this._setAttr(e, t),
                    n && n.call(this),
                    this
                );
            };
        },
        addComponentsGetterSetter: function (t, n, e, a, r) {
            var i,
                s,
                o = e.length,
                c = Kinetic.Util._capitalize,
                h = "get" + c(n),
                l = "set" + c(n);
            (t.prototype[h] = function () {
                var t = {};
                for (i = 0; i < o; i++) t[(s = e[i])] = this.getAttr(n + c(s));
                return t;
            }),
                (t.prototype[l] = function (t) {
                    var e,
                        i = this.attrs[n];
                    for (e in (t = a ? a.call(this, t) : t))
                        this._setAttr(n + c(e), t[e]);
                    return (
                        this._fireChangeEvent(n, i, t), r && r.call(this), this
                    );
                }),
                this.addOverloadedGetterSetter(t, n);
        },
        addOverloadedGetterSetter: function (t, e) {
            var i = Kinetic.Util._capitalize(e),
                n = "set" + i,
                a = "get" + i;
            t.prototype[e] = function () {
                return arguments.length
                    ? (this[n](arguments[0]), this)
                    : this[a]();
            };
        },
        backCompat: function (t, e) {
            for (var i in e) t.prototype[i] = t.prototype[e[i]];
        },
        afterSetFilter: function () {
            this._filterUpToDate = !1;
        },
    }),
    (Kinetic.Validators = {
        RGBComponent: function (t) {
            return 255 < t ? 255 : t < 0 ? 0 : Math.round(t);
        },
        alphaComponent: function (t) {
            return 1 < t ? 1 : t < 1e-4 ? 1e-4 : t;
        },
    }),
    (function () {
        var i = "absoluteOpacity",
            n = "absoluteTransform",
            a = "listening",
            r = "mouseenter",
            s = "mouseleave",
            o = "transform",
            c = "visible",
            l = ["id"],
            h = [
                "xChange.kinetic",
                "yChange.kinetic",
                "scaleXChange.kinetic",
                "scaleYChange.kinetic",
                "skewXChange.kinetic",
                "skewYChange.kinetic",
                "rotationChange.kinetic",
                "offsetXChange.kinetic",
                "offsetYChange.kinetic",
                "transformsEnabledChange.kinetic",
            ].join(" ");
        Kinetic.Util.addMethods(Kinetic.Node, {
            _init: function (t) {
                var e = this;
                (this._id = Kinetic.idCounter++),
                    (this.eventListeners = {}),
                    (this.attrs = {}),
                    (this._cache = {}),
                    (this._filterUpToDate = !1),
                    this.setAttrs(t),
                    this.on(h, function () {
                        this._clearCache(o), e._clearSelfAndDescendantCache(n);
                    }),
                    this.on("visibleChange.kinetic", function () {
                        e._clearSelfAndDescendantCache(c);
                    }),
                    this.on("listeningChange.kinetic", function () {
                        e._clearSelfAndDescendantCache(a);
                    }),
                    this.on("opacityChange.kinetic", function () {
                        e._clearSelfAndDescendantCache(i);
                    });
            },
            _clearCache: function (t) {
                t ? delete this._cache[t] : (this._cache = {});
            },
            _getCache: function (t, e) {
                return (
                    void 0 === this._cache[t] &&
                        (this._cache[t] = e.call(this)),
                    this._cache[t]
                );
            },
            _clearSelfAndDescendantCache: function (e) {
                this._clearCache(e),
                    this.children &&
                        this.getChildren().each(function (t) {
                            t._clearSelfAndDescendantCache(e);
                        });
            },
            clearCache: function () {
                return (
                    delete this._cache.canvas, (this._filterUpToDate = !1), this
                );
            },
            cache: function (t) {
                var e = t || {},
                    i = e.x || 0,
                    n = e.y || 0,
                    a = e.width || this.width(),
                    r = e.height || this.height(),
                    s = e.drawBorder || !1;
                if (0 !== a && 0 !== r) {
                    var o = new Kinetic.SceneCanvas({
                            pixelRatio: 1,
                            width: a,
                            height: r,
                        }),
                        c = new Kinetic.SceneCanvas({
                            pixelRatio: 1,
                            width: a,
                            height: r,
                        }),
                        h = new Kinetic.HitCanvas({ width: a, height: r }),
                        t = o.getContext(),
                        e = h.getContext();
                    return (
                        (h.isCache = !0),
                        this.clearCache(),
                        t.save(),
                        e.save(),
                        s &&
                            (t.save(),
                            t.beginPath(),
                            t.rect(0, 0, a, r),
                            t.closePath(),
                            t.setAttr("strokeStyle", "red"),
                            t.setAttr("lineWidth", 5),
                            t.stroke(),
                            t.restore()),
                        t.translate(-1 * i, -1 * n),
                        e.translate(-1 * i, -1 * n),
                        "Shape" === this.nodeType &&
                            (t.translate(-1 * this.x(), -1 * this.y()),
                            e.translate(-1 * this.x(), -1 * this.y())),
                        this.drawScene(o, this),
                        this.drawHit(h, this),
                        t.restore(),
                        e.restore(),
                        (this._cache.canvas = { scene: o, filter: c, hit: h }),
                        this
                    );
                }
                Kinetic.Util.warn(
                    "Width or height of caching configuration equals 0. Cache is ignored."
                );
            },
            _drawCachedSceneCanvas: function (t) {
                t.save(),
                    this.getLayer()._applyTransform(this, t),
                    t._applyOpacity(this),
                    t.drawImage(this._getCachedSceneCanvas()._canvas, 0, 0),
                    t.restore();
            },
            _getCachedSceneCanvas: function () {
                var t,
                    e,
                    i,
                    n = this.filters(),
                    a = this._cache.canvas,
                    r = a.scene,
                    a = a.filter,
                    s = a.getContext();
                if (n) {
                    if (!this._filterUpToDate) {
                        try {
                            for (
                                t = n.length,
                                    s.clear(),
                                    s.drawImage(r._canvas, 0, 0),
                                    e = s.getImageData(
                                        0,
                                        0,
                                        a.getWidth(),
                                        a.getHeight()
                                    ),
                                    i = 0;
                                i < t;
                                i++
                            )
                                n[i].call(this, e), s.putImageData(e, 0, 0);
                        } catch (t) {
                            Kinetic.Util.warn(
                                "Unable to apply filter. " + t.message
                            );
                        }
                        this._filterUpToDate = !0;
                    }
                    return a;
                }
                return r;
            },
            _drawCachedHitCanvas: function (t) {
                var e = this._cache.canvas.hit;
                t.save(),
                    this.getLayer()._applyTransform(this, t),
                    t.drawImage(e._canvas, 0, 0),
                    t.restore();
            },
            on: function (t, e) {
                for (
                    var i, n, a = t.split(" "), r = a.length, s = 0;
                    s < r;
                    s++
                )
                    (i = (n = a[s].split("."))[0]),
                        (n = n[1] || ""),
                        this.eventListeners[i] || (this.eventListeners[i] = []),
                        this.eventListeners[i].push({ name: n, handler: e });
                return this;
            },
            off: function (t) {
                var e,
                    i,
                    n,
                    a,
                    r,
                    s = (t || "").split(" "),
                    o = s.length;
                if (!t) for (i in this.eventListeners) this._off(i);
                for (e = 0; e < o; e++)
                    if (((a = (n = s[e].split("."))[0]), (r = n[1]), a))
                        this.eventListeners[a] && this._off(a, r);
                    else for (i in this.eventListeners) this._off(i, r);
                return this;
            },
            dispatchEvent: function (t) {
                var e = { target: this, type: t.type, evt: t };
                this.fire(t.type, e);
            },
            addEventListener: function (t, e) {
                this.on(t, function (t) {
                    e.call(this, t.evt);
                });
            },
            removeEventListener: function (t) {
                this.off(t);
            },
            remove: function () {
                var t = this.getParent();
                return (
                    t &&
                        t.children &&
                        (t.children.splice(this.index, 1),
                        t._setChildrenIndices(),
                        delete this.parent),
                    this._clearSelfAndDescendantCache("stage"),
                    this._clearSelfAndDescendantCache(n),
                    this._clearSelfAndDescendantCache(c),
                    this._clearSelfAndDescendantCache(a),
                    this._clearSelfAndDescendantCache(i),
                    this
                );
            },
            destroy: function () {
                Kinetic._removeId(this.getId()),
                    Kinetic._removeName(this.getName(), this._id),
                    this.remove();
            },
            getAttr: function (t) {
                var e = "get" + Kinetic.Util._capitalize(t);
                return Kinetic.Util._isFunction(this[e])
                    ? this[e]()
                    : this.attrs[t];
            },
            getAncestors: function () {
                for (
                    var t = this.getParent(), e = new Kinetic.Collection();
                    t;

                )
                    e.push(t), (t = t.getParent());
                return e;
            },
            getAttrs: function () {
                return this.attrs || {};
            },
            setAttrs: function (t) {
                var e, i;
                if (t)
                    for (e in t)
                        "children" === e ||
                            ((i = "set" + Kinetic.Util._capitalize(e)),
                            Kinetic.Util._isFunction(this[i])
                                ? this[i](t[e])
                                : this._setAttr(e, t[e]));
                return this;
            },
            isListening: function () {
                return this._getCache(a, this._isListening);
            },
            _isListening: function () {
                var t = this.getListening(),
                    e = this.getParent();
                return "inherit" === t ? !e || e.isListening() : t;
            },
            isVisible: function () {
                return this._getCache(c, this._isVisible);
            },
            _isVisible: function () {
                var t = this.getVisible(),
                    e = this.getParent();
                return "inherit" === t ? !e || e.isVisible() : t;
            },
            shouldDrawHit: function (t) {
                var e = this.getLayer();
                return (
                    (t && t.isCache) ||
                    (e &&
                        e.hitGraphEnabled() &&
                        this.isListening() &&
                        this.isVisible() &&
                        !Kinetic.isDragging())
                );
            },
            show: function () {
                return this.setVisible(!0), this;
            },
            hide: function () {
                return this.setVisible(!1), this;
            },
            getZIndex: function () {
                return this.index || 0;
            },
            getAbsoluteZIndex: function () {
                var i,
                    n,
                    a,
                    r,
                    s = this.getDepth(),
                    o = this,
                    c = 0;
                return (
                    "Stage" !== o.nodeType &&
                        (function t(e) {
                            for (i = [], n = e.length, a = 0; a < n; a++)
                                (r = e[a]),
                                    c++,
                                    "Shape" !== r.nodeType &&
                                        (i = i.concat(
                                            r.getChildren().toArray()
                                        )),
                                    r._id === o._id && (a = n);
                            0 < i.length && i[0].getDepth() <= s && t(i);
                        })(o.getStage().getChildren()),
                    c
                );
            },
            getDepth: function () {
                for (var t = 0, e = this.parent; e; ) t++, (e = e.parent);
                return t;
            },
            setPosition: function (t) {
                return this.setX(t.x), this.setY(t.y), this;
            },
            getPosition: function () {
                return { x: this.getX(), y: this.getY() };
            },
            getAbsolutePosition: function () {
                var t = this.getAbsoluteTransform().getMatrix(),
                    e = new Kinetic.Transform(),
                    i = this.offset();
                return (
                    (e.m = t.slice()), e.translate(i.x, i.y), e.getTranslation()
                );
            },
            setAbsolutePosition: function (t) {
                var e,
                    i = this._clearTransform();
                return (
                    (this.attrs.x = i.x),
                    (this.attrs.y = i.y),
                    delete i.x,
                    delete i.y,
                    (e = this.getAbsoluteTransform()).invert(),
                    e.translate(t.x, t.y),
                    (t = {
                        x: this.attrs.x + e.getTranslation().x,
                        y: this.attrs.y + e.getTranslation().y,
                    }),
                    this.setPosition({ x: t.x, y: t.y }),
                    this._setTransform(i),
                    this
                );
            },
            _setTransform: function (t) {
                for (var e in t) this.attrs[e] = t[e];
                this._clearCache(o), this._clearSelfAndDescendantCache(n);
            },
            _clearTransform: function () {
                var t = {
                    x: this.getX(),
                    y: this.getY(),
                    rotation: this.getRotation(),
                    scaleX: this.getScaleX(),
                    scaleY: this.getScaleY(),
                    offsetX: this.getOffsetX(),
                    offsetY: this.getOffsetY(),
                    skewX: this.getSkewX(),
                    skewY: this.getSkewY(),
                };
                return (
                    (this.attrs.x = 0),
                    (this.attrs.y = 0),
                    (this.attrs.rotation = 0),
                    (this.attrs.scaleX = 1),
                    (this.attrs.scaleY = 1),
                    (this.attrs.offsetX = 0),
                    (this.attrs.offsetY = 0),
                    (this.attrs.skewX = 0),
                    (this.attrs.skewY = 0),
                    this._clearCache(o),
                    this._clearSelfAndDescendantCache(n),
                    t
                );
            },
            move: function (t) {
                var e = t.x,
                    i = t.y,
                    n = this.getX(),
                    t = this.getY();
                return (
                    void 0 !== e && (n += e),
                    void 0 !== i && (t += i),
                    this.setPosition({ x: n, y: t }),
                    this
                );
            },
            _eachAncestorReverse: function (t, e) {
                var i,
                    n,
                    a = [],
                    r = this.getParent();
                if (e && e._id === this._id) return t(this), !0;
                for (a.unshift(this); r && (!e || r._id !== e._id); )
                    a.unshift(r), (r = r.parent);
                for (i = a.length, n = 0; n < i; n++) t(a[n]);
            },
            rotate: function (t) {
                return this.setRotation(this.getRotation() + t), this;
            },
            moveToTop: function () {
                if (this.parent) {
                    var t = this.index;
                    return (
                        this.parent.children.splice(t, 1),
                        this.parent.children.push(this),
                        this.parent._setChildrenIndices(),
                        !0
                    );
                }
                Kinetic.Util.warn(
                    "Node has no parent. moveToTop function is ignored."
                );
            },
            moveUp: function () {
                if (this.parent) {
                    var t = this.index;
                    return (
                        t < this.parent.getChildren().length - 1 &&
                        (this.parent.children.splice(t, 1),
                        this.parent.children.splice(t + 1, 0, this),
                        this.parent._setChildrenIndices(),
                        !0)
                    );
                }
                Kinetic.Util.warn(
                    "Node has no parent. moveUp function is ignored."
                );
            },
            moveDown: function () {
                if (this.parent) {
                    var t = this.index;
                    return (
                        0 < t &&
                        (this.parent.children.splice(t, 1),
                        this.parent.children.splice(t - 1, 0, this),
                        this.parent._setChildrenIndices(),
                        !0)
                    );
                }
                Kinetic.Util.warn(
                    "Node has no parent. moveDown function is ignored."
                );
            },
            moveToBottom: function () {
                if (this.parent) {
                    var t = this.index;
                    return (
                        0 < t &&
                        (this.parent.children.splice(t, 1),
                        this.parent.children.unshift(this),
                        this.parent._setChildrenIndices(),
                        !0)
                    );
                }
                Kinetic.Util.warn(
                    "Node has no parent. moveToBottom function is ignored."
                );
            },
            setZIndex: function (t) {
                if (this.parent) {
                    var e = this.index;
                    return (
                        this.parent.children.splice(e, 1),
                        this.parent.children.splice(t, 0, this),
                        this.parent._setChildrenIndices(),
                        this
                    );
                }
                Kinetic.Util.warn(
                    "Node has no parent. zIndex parameter is ignored."
                );
            },
            getAbsoluteOpacity: function () {
                return this._getCache(i, this._getAbsoluteOpacity);
            },
            _getAbsoluteOpacity: function () {
                var t = this.getOpacity();
                return (
                    this.getParent() &&
                        (t *= this.getParent().getAbsoluteOpacity()),
                    t
                );
            },
            moveTo: function (t) {
                return (
                    this.getParent() !== t && (this.remove(), t.add(this)), this
                );
            },
            toObject: function () {
                var t,
                    e,
                    i,
                    n = Kinetic.Util,
                    a = {},
                    r = this.getAttrs();
                for (t in ((a.attrs = {}), r))
                    (e = r[t]),
                        n._isFunction(e) ||
                            n._isElement(e) ||
                            (n._isObject(e) && n._hasMethods(e)) ||
                            ((i = this[t]),
                            delete r[t],
                            (i = i ? i.call(this) : null),
                            (r[t] = e),
                            i !== e && (a.attrs[t] = e));
                return (a.className = this.getClassName()), a;
            },
            toJSON: function () {
                return JSON.stringify(this.toObject());
            },
            getParent: function () {
                return this.parent;
            },
            getLayer: function () {
                var t = this.getParent();
                return t ? t.getLayer() : null;
            },
            getStage: function () {
                return this._getCache("stage", this._getStage);
            },
            _getStage: function () {
                var t = this.getParent();
                return t ? t.getStage() : void 0;
            },
            fire: function (t, e, i) {
                return (
                    i
                        ? this._fireAndBubble(t, e || {})
                        : this._fire(t, e || {}),
                    this
                );
            },
            getAbsoluteTransform: function (t) {
                return t
                    ? this._getAbsoluteTransform(t)
                    : this._getCache(n, this._getAbsoluteTransform);
            },
            _getAbsoluteTransform: function (t) {
                var e,
                    i,
                    n = new Kinetic.Transform();
                return (
                    this._eachAncestorReverse(function (t) {
                        (e = t.transformsEnabled()),
                            (i = t.getTransform()),
                            "all" === e
                                ? n.multiply(i)
                                : "position" === e && n.translate(t.x(), t.y());
                    }, t),
                    n
                );
            },
            getTransform: function () {
                return this._getCache(o, this._getTransform);
            },
            _getTransform: function () {
                var t = new Kinetic.Transform(),
                    e = this.getX(),
                    i = this.getY(),
                    n = Kinetic.getAngle(this.getRotation()),
                    a = this.getScaleX(),
                    r = this.getScaleY(),
                    s = this.getSkewX(),
                    o = this.getSkewY(),
                    c = this.getOffsetX(),
                    h = this.getOffsetY();
                return (
                    (0 === e && 0 === i) || t.translate(e, i),
                    0 !== n && t.rotate(n),
                    (0 === s && 0 === o) || t.skew(s, o),
                    (1 === a && 1 === r) || t.scale(a, r),
                    (0 === c && 0 === h) || t.translate(-1 * c, -1 * h),
                    t
                );
            },
            clone: function (t) {
                var e,
                    i,
                    n,
                    a,
                    r,
                    s,
                    o = this.getClassName(),
                    c = Kinetic.Util.cloneObject(this.attrs);
                for (s in l) delete c[l[s]];
                for (e in t) c[e] = t[e];
                var h = new Kinetic[o](c);
                for (e in this.eventListeners)
                    for (
                        i = this.eventListeners[e], n = i.length, a = 0;
                        a < n;
                        a++
                    )
                        (r = i[a]),
                            r.name.indexOf("kinetic") < 0 &&
                                (h.eventListeners[e] ||
                                    (h.eventListeners[e] = []),
                                h.eventListeners[e].push(r));
                return h;
            },
            toDataURL: function (t) {
                var e = (t = t || {}).mimeType || null,
                    i = t.quality || null,
                    n = this.getStage(),
                    a = t.x || 0,
                    r = t.y || 0,
                    t = new Kinetic.SceneCanvas({
                        width:
                            t.width ||
                            this.getWidth() ||
                            (n ? n.getWidth() : 0),
                        height:
                            t.height ||
                            this.getHeight() ||
                            (n ? n.getHeight() : 0),
                        pixelRatio: 1,
                    }),
                    n = t.getContext();
                return (
                    n.save(),
                    (a || r) && n.translate(-1 * a, -1 * r),
                    this.drawScene(t),
                    n.restore(),
                    t.toDataURL(e, i)
                );
            },
            toImage: function (e) {
                Kinetic.Util._getImage(this.toDataURL(e), function (t) {
                    e.callback(t);
                });
            },
            setSize: function (t) {
                return this.setWidth(t.width), this.setHeight(t.height), this;
            },
            getSize: function () {
                return { width: this.getWidth(), height: this.getHeight() };
            },
            getWidth: function () {
                return this.attrs.width || 0;
            },
            getHeight: function () {
                return this.attrs.height || 0;
            },
            getClassName: function () {
                return this.className || this.nodeType;
            },
            getType: function () {
                return this.nodeType;
            },
            getDragDistance: function () {
                return void 0 !== this.attrs.dragDistance
                    ? this.attrs.dragDistance
                    : this.parent
                    ? this.parent.getDragDistance()
                    : Kinetic.dragDistance;
            },
            _get: function (t) {
                return this.className === t || this.nodeType === t
                    ? [this]
                    : [];
            },
            _off: function (t, e) {
                for (
                    var i, n = this.eventListeners[t], a = 0;
                    a < n.length;
                    a++
                )
                    if (
                        !(
                            ("kinetic" === (i = n[a].name) &&
                                "kinetic" !== e) ||
                            (e && i !== e)
                        )
                    ) {
                        if ((n.splice(a, 1), 0 === n.length)) {
                            delete this.eventListeners[t];
                            break;
                        }
                        a--;
                    }
            },
            _fireChangeEvent: function (t, e, i) {
                this._fire(t + "Change", { oldVal: e, newVal: i });
            },
            setId: function (t) {
                var e = this.getId();
                return (
                    Kinetic._removeId(e),
                    Kinetic._addId(this, t),
                    this._setAttr("id", t),
                    this
                );
            },
            setName: function (t) {
                var e = this.getName();
                return (
                    Kinetic._removeName(e, this._id),
                    Kinetic._addName(this, t),
                    this._setAttr("name", t),
                    this
                );
            },
            setAttr: function (t, e) {
                var i = this["set" + Kinetic.Util._capitalize(t)];
                return (
                    Kinetic.Util._isFunction(i)
                        ? i.call(this, e)
                        : this._setAttr(t, e),
                    this
                );
            },
            _setAttr: function (t, e) {
                var i;
                void 0 !== e &&
                    ((i = this.attrs[t]),
                    (this.attrs[t] = e),
                    this._fireChangeEvent(t, i, e));
            },
            _setComponentAttr: function (t, e, i) {
                var n;
                void 0 !== i &&
                    ((n = this.attrs[t]) || (this.attrs[t] = this.getAttr(t)),
                    (this.attrs[t][e] = i),
                    this._fireChangeEvent(t, n, i));
            },
            _fireAndBubble: function (t, e, i) {
                var n = !0;
                e && "Shape" === this.nodeType && (e.target = this),
                    (n =
                        !(
                            (t === r &&
                                i &&
                                (this._id === i._id ||
                                    (this.isAncestorOf &&
                                        this.isAncestorOf(i)))) ||
                            (t === s &&
                                i &&
                                (this._id === i._id ||
                                    (this.isAncestorOf &&
                                        this.isAncestorOf(i))))
                        ) && n) &&
                        (this._fire(t, e),
                        (n =
                            (t === r || t === s) &&
                            ((i && i.isAncestorOf && i.isAncestorOf(this)) ||
                                !(!i || !i.isAncestorOf))),
                        e &&
                            !e.cancelBubble &&
                            this.parent &&
                            this.parent.isListening() &&
                            !n &&
                            (i && i.parent
                                ? this._fireAndBubble.call(
                                      this.parent,
                                      t,
                                      e,
                                      i.parent
                                  )
                                : this._fireAndBubble.call(this.parent, t, e)));
            },
            _fire: function (t, e) {
                var i,
                    n = this.eventListeners[t];
                if (((e.type = t), n))
                    for (i = 0; i < n.length; i++) n[i].handler.call(this, e);
            },
            draw: function () {
                return this.drawScene(), this.drawHit(), this;
            },
        }),
            (Kinetic.Node.create = function (t, e) {
                return this._createNode(JSON.parse(t), e);
            }),
            (Kinetic.Node._createNode = function (t, e) {
                var i,
                    n,
                    a,
                    r = Kinetic.Node.prototype.getClassName.call(t),
                    s = t.children;
                if (
                    (e && (t.attrs.container = e),
                    (i = new Kinetic[r](t.attrs)),
                    s)
                )
                    for (n = s.length, a = 0; a < n; a++)
                        i.add(this._createNode(s[a]));
                return i;
            }),
            Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node, "position"),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "x", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "y", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "opacity", 1),
            Kinetic.Factory.addGetter(Kinetic.Node, "name"),
            Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node, "name"),
            Kinetic.Factory.addGetter(Kinetic.Node, "id"),
            Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node, "id"),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "rotation", 0),
            Kinetic.Factory.addComponentsGetterSetter(Kinetic.Node, "scale", [
                "x",
                "y",
            ]),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "scaleX", 1),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "scaleY", 1),
            Kinetic.Factory.addComponentsGetterSetter(Kinetic.Node, "skew", [
                "x",
                "y",
            ]),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "skewX", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "skewY", 0),
            Kinetic.Factory.addComponentsGetterSetter(Kinetic.Node, "offset", [
                "x",
                "y",
            ]),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "offsetX", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "offsetY", 0),
            Kinetic.Factory.addSetter(Kinetic.Node, "dragDistance"),
            Kinetic.Factory.addOverloadedGetterSetter(
                Kinetic.Node,
                "dragDistance"
            ),
            Kinetic.Factory.addSetter(Kinetic.Node, "width", 0),
            Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node, "width"),
            Kinetic.Factory.addSetter(Kinetic.Node, "height", 0),
            Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node, "height"),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Node,
                "listening",
                "inherit"
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Node,
                "filters",
                void 0,
                function (t) {
                    return (this._filterUpToDate = !1), t;
                }
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "visible", "inherit"),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Node,
                "transformsEnabled",
                "all"
            ),
            Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Node, "size"),
            Kinetic.Factory.backCompat(Kinetic.Node, {
                rotateDeg: "rotate",
                setRotationDeg: "setRotation",
                getRotationDeg: "getRotation",
            }),
            Kinetic.Collection.mapMethods(Kinetic.Node);
    })(),
    (Kinetic.Filters.Grayscale = function (t) {
        for (var e, i = t.data, n = i.length, a = 0; a < n; a += 4)
            (e = 0.34 * i[a] + 0.5 * i[a + 1] + 0.16 * i[a + 2]),
                (i[a] = e),
                (i[a + 1] = e),
                (i[a + 2] = e);
    }),
    (Kinetic.Filters.Brighten = function (t) {
        for (
            var e = 255 * this.brightness(), i = t.data, n = i.length, a = 0;
            a < n;
            a += 4
        )
            (i[a] += e), (i[a + 1] += e), (i[a + 2] += e);
    }),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "brightness",
        0,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    (Kinetic.Filters.Invert = function (t) {
        for (var e = t.data, i = e.length, n = 0; n < i; n += 4)
            (e[n] = 255 - e[n]),
                (e[n + 1] = 255 - e[n + 1]),
                (e[n + 2] = 255 - e[n + 2]);
    }),
    (function () {
        function E() {
            (this.r = 0),
                (this.g = 0),
                (this.b = 0),
                (this.a = 0),
                (this.next = null);
        }
        var H = [
                512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388,
                335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388,
                360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345,
                328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388,
                374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497,
                482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345,
                337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507,
                496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388,
                381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307,
                302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497,
                489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411,
                405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345,
                341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294,
                291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507,
                501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442,
                437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388,
                385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344,
                341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307,
                304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275,
                273, 271, 269, 267, 265, 263, 261, 259,
            ],
            W = [
                9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
                17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
                19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
                20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
                21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
                22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
                23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
                23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
            ];
        (Kinetic.Filters.Blur = function (t) {
            var e = Math.round(this.blurRadius());
            0 < e &&
                (function (t, e) {
                    for (
                        var i,
                            n,
                            a,
                            r,
                            s,
                            o,
                            c,
                            h,
                            l,
                            d,
                            u,
                            f,
                            g,
                            p,
                            K,
                            v,
                            _,
                            m,
                            y,
                            S,
                            C,
                            x,
                            w,
                            F = t.data,
                            b = t.width,
                            P = t.height,
                            T = e + e + 1,
                            A = b - 1,
                            D = P - 1,
                            G = e + 1,
                            k = (G * (G + 1)) / 2,
                            M = new E(),
                            L = null,
                            R = M,
                            I = null,
                            N = null,
                            U = H[e],
                            O = W[e],
                            B = 1;
                        B < T;
                        B++
                    )
                        (R = R.next = new E()), B == G && (L = R);
                    for (R.next = M, n = o = s = 0; n < P; n++) {
                        for (
                            K = v = _ = m = c = h = l = d = 0,
                                u = G * (y = F[s]),
                                f = G * (S = F[s + 1]),
                                g = G * (C = F[s + 2]),
                                p = G * (x = F[s + 3]),
                                c += k * y,
                                h += k * S,
                                l += k * C,
                                d += k * x,
                                R = M,
                                B = 0;
                            B < G;
                            B++
                        )
                            (R.r = y),
                                (R.g = S),
                                (R.b = C),
                                (R.a = x),
                                (R = R.next);
                        for (B = 1; B < G; B++)
                            (c +=
                                (R.r = y =
                                    F[(a = s + ((A < B ? A : B) << 2))]) *
                                (w = G - B)),
                                (h += (R.g = S = F[a + 1]) * w),
                                (l += (R.b = C = F[a + 2]) * w),
                                (d += (R.a = x = F[a + 3]) * w),
                                (K += y),
                                (v += S),
                                (_ += C),
                                (m += x),
                                (R = R.next);
                        for (I = M, N = L, i = 0; i < b; i++)
                            (F[s + 3] = x = (d * U) >> O),
                                0 !== x
                                    ? ((F[s] = ((c * U) >> O) * (x = 255 / x)),
                                      (F[s + 1] = ((h * U) >> O) * x),
                                      (F[s + 2] = ((l * U) >> O) * x))
                                    : (F[s] = F[s + 1] = F[s + 2] = 0),
                                (c -= u),
                                (h -= f),
                                (l -= g),
                                (d -= p),
                                (u -= I.r),
                                (f -= I.g),
                                (g -= I.b),
                                (p -= I.a),
                                (a = (o + ((a = i + e + 1) < A ? a : A)) << 2),
                                (c += K += I.r = F[a]),
                                (h += v += I.g = F[a + 1]),
                                (l += _ += I.b = F[a + 2]),
                                (d += m += I.a = F[a + 3]),
                                (I = I.next),
                                (u += y = N.r),
                                (f += S = N.g),
                                (g += C = N.b),
                                (p += x = N.a),
                                (K -= y),
                                (v -= S),
                                (_ -= C),
                                (m -= x),
                                (N = N.next),
                                (s += 4);
                        o += b;
                    }
                    for (i = 0; i < b; i++) {
                        for (
                            v = _ = m = K = h = l = d = c = 0,
                                u = G * (y = F[(s = i << 2)]),
                                f = G * (S = F[s + 1]),
                                g = G * (C = F[s + 2]),
                                p = G * (x = F[s + 3]),
                                c += k * y,
                                h += k * S,
                                l += k * C,
                                d += k * x,
                                R = M,
                                B = 0;
                            B < G;
                            B++
                        )
                            (R.r = y),
                                (R.g = S),
                                (R.b = C),
                                (R.a = x),
                                (R = R.next);
                        for (r = b, B = 1; B <= e; B++)
                            (c +=
                                (R.r = y = F[(s = (r + i) << 2)]) *
                                (w = G - B)),
                                (h += (R.g = S = F[s + 1]) * w),
                                (l += (R.b = C = F[s + 2]) * w),
                                (d += (R.a = x = F[s + 3]) * w),
                                (K += y),
                                (v += S),
                                (_ += C),
                                (m += x),
                                (R = R.next),
                                B < D && (r += b);
                        for (s = i, I = M, N = L, n = 0; n < P; n++)
                            (F[(a = s << 2) + 3] = x = (d * U) >> O),
                                0 < x
                                    ? ((F[a] = ((c * U) >> O) * (x = 255 / x)),
                                      (F[a + 1] = ((h * U) >> O) * x),
                                      (F[a + 2] = ((l * U) >> O) * x))
                                    : (F[a] = F[a + 1] = F[a + 2] = 0),
                                (c -= u),
                                (h -= f),
                                (l -= g),
                                (d -= p),
                                (u -= I.r),
                                (f -= I.g),
                                (g -= I.b),
                                (p -= I.a),
                                (a = (i + ((a = n + G) < D ? a : D) * b) << 2),
                                (c += K += I.r = F[a]),
                                (h += v += I.g = F[a + 1]),
                                (l += _ += I.b = F[a + 2]),
                                (d += m += I.a = F[a + 3]),
                                (I = I.next),
                                (u += y = N.r),
                                (f += S = N.g),
                                (g += C = N.b),
                                (p += x = N.a),
                                (K -= y),
                                (v -= S),
                                (_ -= C),
                                (m -= x),
                                (N = N.next),
                                (s += b);
                    }
                })(t, e);
        }),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Node,
                "blurRadius",
                0,
                null,
                Kinetic.Factory.afterSetFilter
            );
    })(),
    (function () {
        function d(t, e, i) {
            (i = 4 * (i * t.width + e)), (e = []);
            return (
                e.push(t.data[i++], t.data[i++], t.data[i++], t.data[i++]), e
            );
        }
        function u(t, e) {
            return Math.sqrt(
                Math.pow(t[0] - e[0], 2) +
                    Math.pow(t[1] - e[1], 2) +
                    Math.pow(t[2] - e[2], 2)
            );
        }
        function i(t, e) {
            var i = d(t, 0, 0),
                n = d(t, t.width - 1, 0),
                a = d(t, 0, t.height - 1),
                r = d(t, t.width - 1, t.height - 1),
                s = e || 10;
            if (u(i, n) < s && u(n, r) < s && u(r, a) < s && u(a, i) < s) {
                for (
                    var o = (function (t) {
                            for (var e = [0, 0, 0], i = 0; i < t.length; i++)
                                (e[0] += t[i][0]),
                                    (e[1] += t[i][1]),
                                    (e[2] += t[i][2]);
                            return (
                                (e[0] /= t.length),
                                (e[1] /= t.length),
                                (e[2] /= t.length),
                                e
                            );
                        })([n, i, r, a]),
                        c = [],
                        h = 0;
                    h < t.width * t.height;
                    h++
                ) {
                    var l = u(o, [
                        t.data[4 * h],
                        t.data[4 * h + 1],
                        t.data[4 * h + 2],
                    ]);
                    c[h] = l < s ? 0 : 255;
                }
                return c;
            }
        }
        (Kinetic.Filters.Mask = function (t) {
            var e = i(t, this.threshold());
            return (
                e &&
                    (function (t, e) {
                        for (var i = 0; i < t.width * t.height; i++)
                            t.data[4 * i + 3] = e[i];
                    })(
                        t,
                        (function (t, e, i) {
                            for (
                                var n = [
                                        1 / 9,
                                        1 / 9,
                                        1 / 9,
                                        1 / 9,
                                        1 / 9,
                                        1 / 9,
                                        1 / 9,
                                        1 / 9,
                                        1 / 9,
                                    ],
                                    a = Math.round(Math.sqrt(n.length)),
                                    r = Math.floor(a / 2),
                                    s = [],
                                    o = 0;
                                o < i;
                                o++
                            )
                                for (var c = 0; c < e; c++) {
                                    for (
                                        var h = o * e + c, l = 0, d = 0;
                                        d < a;
                                        d++
                                    )
                                        for (var u = 0; u < a; u++) {
                                            var f = o + d - r,
                                                g = c + u - r;
                                            0 <= f &&
                                                f < i &&
                                                0 <= g &&
                                                g < e &&
                                                (l +=
                                                    t[f * e + g] *
                                                    n[d * a + u]);
                                        }
                                    s[h] = l;
                                }
                            return s;
                        })(
                            (function (t, e, i) {
                                for (
                                    var n = [1, 1, 1, 1, 1, 1, 1, 1, 1],
                                        a = Math.round(Math.sqrt(n.length)),
                                        r = Math.floor(a / 2),
                                        s = [],
                                        o = 0;
                                    o < i;
                                    o++
                                )
                                    for (var c = 0; c < e; c++) {
                                        for (
                                            var h = o * e + c, l = 0, d = 0;
                                            d < a;
                                            d++
                                        )
                                            for (var u = 0; u < a; u++) {
                                                var f = o + d - r,
                                                    g = c + u - r;
                                                0 <= f &&
                                                    f < i &&
                                                    0 <= g &&
                                                    g < e &&
                                                    (l +=
                                                        t[f * e + g] *
                                                        n[d * a + u]);
                                            }
                                        s[h] = 1020 <= l ? 255 : 0;
                                    }
                                return s;
                            })(
                                (function (t, e, i) {
                                    for (
                                        var n = [1, 1, 1, 1, 0, 1, 1, 1, 1],
                                            a = Math.round(Math.sqrt(n.length)),
                                            r = Math.floor(a / 2),
                                            s = [],
                                            o = 0;
                                        o < i;
                                        o++
                                    )
                                        for (var c = 0; c < e; c++) {
                                            for (
                                                var h = o * e + c, l = 0, d = 0;
                                                d < a;
                                                d++
                                            )
                                                for (var u = 0; u < a; u++) {
                                                    var f = o + d - r,
                                                        g = c + u - r;
                                                    0 <= f &&
                                                        f < i &&
                                                        0 <= g &&
                                                        g < e &&
                                                        (l +=
                                                            t[f * e + g] *
                                                            n[d * a + u]);
                                                }
                                            s[h] = 2040 === l ? 255 : 0;
                                        }
                                    return s;
                                })(e, t.width, t.height),
                                t.width,
                                t.height
                            ),
                            t.width,
                            t.height
                        )
                    ),
                t
            );
        }),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Node,
                "threshold",
                0,
                null,
                Kinetic.Factory.afterSetFilter
            );
    })(),
    (Kinetic.Filters.RGB = function (t) {
        for (
            var e,
                i = t.data,
                n = i.length,
                a = this.red(),
                r = this.green(),
                s = this.blue(),
                o = 0;
            o < n;
            o += 4
        )
            (e = (0.34 * i[o] + 0.5 * i[o + 1] + 0.16 * i[o + 2]) / 255),
                (i[o] = e * a),
                (i[o + 1] = e * r),
                (i[o + 2] = e * s),
                (i[o + 3] = i[o + 3]);
    }),
    Kinetic.Factory.addGetterSetter(Kinetic.Node, "red", 0, function (t) {
        return (
            (this._filterUpToDate = !1),
            255 < t ? 255 : t < 0 ? 0 : Math.round(t)
        );
    }),
    Kinetic.Factory.addGetterSetter(Kinetic.Node, "green", 0, function (t) {
        return (
            (this._filterUpToDate = !1),
            255 < t ? 255 : t < 0 ? 0 : Math.round(t)
        );
    }),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "blue",
        0,
        Kinetic.Validators.RGBComponent,
        Kinetic.Factory.afterSetFilter
    ),
    (Kinetic.Filters.HSV = function (t) {
        for (
            var e,
                i,
                n,
                a,
                r = t.data,
                s = r.length,
                o = Math.pow(2, this.value()),
                c = Math.pow(2, this.saturation()),
                h = Math.abs(this.hue() + 360) % 360,
                t = o * c * Math.cos((h * Math.PI) / 180),
                h = o * c * Math.sin((h * Math.PI) / 180),
                l = 0.299 * o + 0.701 * t + 0.167 * h,
                d = 0.587 * o - 0.587 * t + 0.33 * h,
                u = 0.114 * o - 0.114 * t - 0.497 * h,
                f = 0.299 * o - 0.299 * t - 0.328 * h,
                g = 0.587 * o + 0.413 * t + 0.035 * h,
                p = 0.114 * o - 0.114 * t + 0.293 * h,
                K = 0.299 * o - 0.3 * t + 1.25 * h,
                v = 0.587 * o - 0.586 * t - 1.05 * h,
                _ = 0.114 * o + 0.886 * t - 0.2 * h,
                m = 0;
            m < s;
            m += 4
        )
            (e = r[m + 0]),
                (i = r[m + 1]),
                (n = r[m + 2]),
                (a = r[m + 3]),
                (r[m + 0] = l * e + d * i + u * n),
                (r[m + 1] = f * e + g * i + p * n),
                (r[m + 2] = K * e + v * i + _ * n),
                (r[m + 3] = a);
    }),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "hue",
        0,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "saturation",
        0,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "value",
        0,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "hue",
        0,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "saturation",
        0,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "luminance",
        0,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    (Kinetic.Filters.HSL = function (t) {
        for (
            var e,
                i,
                n,
                a,
                r = t.data,
                s = r.length,
                o = Math.pow(2, this.saturation()),
                c = Math.abs(this.hue() + 360) % 360,
                h = 127 * this.luminance(),
                t = +o * Math.cos((c * Math.PI) / 180),
                c = +o * Math.sin((c * Math.PI) / 180),
                l = 0.299 + 0.701 * t + 0.167 * c,
                d = 0.587 - 0.587 * t + 0.33 * c,
                u = 0.114 - 0.114 * t - 0.497 * c,
                f = 0.299 - 0.299 * t - 0.328 * c,
                g = 0.587 + 0.413 * t + 0.035 * c,
                p = 0.114 - 0.114 * t + 0.293 * c,
                K = 0.299 - 0.3 * t + 1.25 * c,
                v = 0.587 - 0.586 * t - 1.05 * c,
                _ = 0.114 + 0.886 * t - 0.2 * c,
                m = 0;
            m < s;
            m += 4
        )
            (e = r[m + 0]),
                (i = r[m + 1]),
                (n = r[m + 2]),
                (a = r[m + 3]),
                (r[m + 0] = l * e + d * i + u * n + h),
                (r[m + 1] = f * e + g * i + p * n + h),
                (r[m + 2] = K * e + v * i + _ * n + h),
                (r[m + 3] = a);
    }),
    (Kinetic.Filters.Emboss = function (t) {
        var e = 10 * this.embossStrength(),
            i = 255 * this.embossWhiteLevel(),
            n = this.embossDirection(),
            a = this.embossBlend(),
            r = 0,
            s = 0,
            o = t.data,
            c = t.width,
            h = t.height,
            l = 4 * c,
            d = h;
        switch (n) {
            case "top-left":
                s = r = -1;
                break;
            case "top":
                (r = -1), (s = 0);
                break;
            case "top-right":
                (r = -1), (s = 1);
                break;
            case "right":
                (r = 0), (s = 1);
                break;
            case "bottom-right":
                s = r = 1;
                break;
            case "bottom":
                (r = 1), (s = 0);
                break;
            case "bottom-left":
                s = -(r = 1);
                break;
            case "left":
                (r = 0), (s = -1);
        }
        do {
            var u = (d - 1) * l,
                f = r,
                g =
                    (d - 1 + (f = h < d + (f = d + f < 1 ? 0 : f) ? 0 : f)) *
                    c *
                    4,
                p = c;
            do {
                var K = u + 4 * (p - 1),
                    v = s,
                    _ =
                        g +
                        4 *
                            (p -
                                1 +
                                (v = c < p + (v = p + v < 1 ? 0 : v) ? 0 : v)),
                    m = o[K] - o[_],
                    y = o[1 + K] - o[1 + _],
                    v = o[2 + K] - o[2 + _],
                    _ = m,
                    m = 0 < _ ? _ : -_;
            } while (
                (m < (0 < y ? y : -y) && (_ = y),
                m < (0 < v ? v : -v) && (_ = v),
                (_ *= e),
                a
                    ? ((y = o[K] + _),
                      (m = o[1 + K] + _),
                      (v = o[2 + K] + _),
                      (o[K] = 255 < y ? 255 : y < 0 ? 0 : y),
                      (o[1 + K] = 255 < m ? 255 : m < 0 ? 0 : m),
                      (o[2 + K] = 255 < v ? 255 : v < 0 ? 0 : v))
                    : ((_ = i - _) < 0 ? (_ = 0) : 255 < _ && (_ = 255),
                      (o[K] = o[1 + K] = o[2 + K] = _)),
                --p)
            );
        } while (--d);
    }),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "embossStrength",
        0.5,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "embossWhiteLevel",
        0.5,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "embossDirection",
        "top-left",
        null,
        Kinetic.Factory.afterSetFilter
    ),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "embossBlend",
        !1,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    (function () {
        function _(t, e, i, n, a) {
            (i -= e), (a -= n);
            return 0 == i ? n + a / 2 : 0 == a ? n : a * ((t - e) / i) + n;
        }
        (Kinetic.Filters.Enhance = function (t) {
            var e,
                i,
                n,
                a,
                r,
                s,
                o,
                c,
                h = t.data,
                l = h.length,
                d = h[0],
                u = d,
                f = h[1],
                g = f,
                p = h[2],
                K = p,
                v = this.enhance();
            if (0 !== v) {
                for (i = 0; i < l; i += 4)
                    (e = h[i + 0]) < d ? (d = e) : u < e && (u = e),
                        (e = h[i + 1]) < f ? (f = e) : g < e && (g = e),
                        (e = h[i + 2]) < p ? (p = e) : K < e && (K = e);
                for (
                    u === d && ((u = 255), (d = 0)),
                        g === f && ((g = 255), (f = 0)),
                        K === p && ((K = 255), (p = 0)),
                        c =
                            0 < v
                                ? ((n = u + v * (255 - u)),
                                  (a = d - v * +d),
                                  (r = g + v * (255 - g)),
                                  (s = f - v * +f),
                                  (o = K + v * (255 - K)),
                                  p - v * +p)
                                : ((n = u + v * (u - (t = 0.5 * (u + d)))),
                                  (a = d + v * (d - t)),
                                  (r = g + v * (g - (t = 0.5 * (g + f)))),
                                  (s = f + v * (f - t)),
                                  (o = K + v * (K - (t = 0.5 * (K + p)))),
                                  p + v * (p - t)),
                        i = 0;
                    i < l;
                    i += 4
                )
                    (h[i + 0] = _(h[i + 0], d, u, a, n)),
                        (h[i + 1] = _(h[i + 1], f, g, s, r)),
                        (h[i + 2] = _(h[i + 2], p, K, c, o));
            }
        }),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Node,
                "enhance",
                0,
                null,
                Kinetic.Factory.afterSetFilter
            );
    })(),
    (Kinetic.Filters.Posterize = function (t) {
        for (
            var e = Math.round(254 * this.levels()) + 1,
                i = t.data,
                n = i.length,
                a = 255 / e,
                r = 0;
            r < n;
            r += 1
        )
            i[r] = Math.floor(i[r] / a) * a;
    }),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "levels",
        0.5,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    (Kinetic.Filters.Noise = function (t) {
        for (
            var e = 255 * this.noise(),
                i = t.data,
                n = i.length,
                a = e / 2,
                r = 0;
            r < n;
            r += 4
        )
            (i[r + 0] += a - 2 * a * Math.random()),
                (i[r + 1] += a - 2 * a * Math.random()),
                (i[r + 2] += a - 2 * a * Math.random());
    }),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "noise",
        0.2,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    (Kinetic.Filters.Pixelate = function (t) {
        var e,
            i,
            n,
            a,
            r,
            s,
            o,
            c,
            h,
            l,
            d,
            u,
            f,
            g,
            p = Math.ceil(this.pixelSize()),
            K = t.width,
            v = t.height,
            _ = Math.ceil(K / p),
            m = Math.ceil(v / p);
        for (t = t.data, u = 0; u < _; u += 1)
            for (f = 0; f < m; f += 1) {
                for (
                    h = (c = u * p) + p,
                        d = (l = f * p) + p,
                        g = o = s = r = a = 0,
                        e = c;
                    e < h;
                    e += 1
                )
                    if (!(K <= e))
                        for (i = l; i < d; i += 1)
                            v <= i ||
                                ((a += t[(n = 4 * (K * i + e)) + 0]),
                                (r += t[n + 1]),
                                (s += t[n + 2]),
                                (o += t[n + 3]),
                                (g += 1));
                for (a /= g, r /= g, s /= g, e = c; e < h; e += 1)
                    if (!(K <= e))
                        for (i = l; i < d; i += 1)
                            v <= i ||
                                ((t[(n = 4 * (K * i + e)) + 0] = a),
                                (t[n + 1] = r),
                                (t[n + 2] = s),
                                (t[n + 3] = o));
            }
    }),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "pixelSize",
        8,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    (Kinetic.Filters.Threshold = function (t) {
        for (
            var e = 255 * this.threshold(), i = t.data, n = i.length, a = 0;
            a < n;
            a += 1
        )
            i[a] = i[a] < e ? 0 : 255;
    }),
    Kinetic.Factory.addGetterSetter(
        Kinetic.Node,
        "threshold",
        0.5,
        null,
        Kinetic.Factory.afterSetFilter
    ),
    (Kinetic.Filters.Sepia = function (t) {
        var e,
            i,
            n,
            a,
            r,
            s,
            o,
            c,
            h = t.data,
            l = t.width,
            d = t.height,
            u = 4 * l;
        do {
            for (
                e = (d - 1) * u, i = l;
                (n = e + 4 * (i - 1)),
                    (a = h[n]),
                    (r = h[1 + n]),
                    (c = h[2 + n]),
                    (s = 0.393 * a + 0.769 * r + 0.189 * c),
                    (o = 0.349 * a + 0.686 * r + 0.168 * c),
                    (c = 0.272 * a + 0.534 * r + 0.131 * c),
                    (h[n] = 255 < s ? 255 : s),
                    (h[1 + n] = 255 < o ? 255 : o),
                    (h[2 + n] = 255 < c ? 255 : c),
                    (h[3 + n] = h[3 + n]),
                    --i;

            );
        } while (--d);
    }),
    (Kinetic.Filters.Solarize = function (t) {
        var e = t.data,
            i = t.width,
            n = 4 * i,
            a = t.height;
        do {
            var r = (a - 1) * n,
                s = i;
            do {
                var o = r + 4 * (s - 1),
                    c = e[o],
                    h = e[1 + o],
                    l = e[2 + o];
            } while (
                (127 < c && (c = 255 - c),
                127 < h && (h = 255 - h),
                127 < l && (l = 255 - l),
                (e[o] = c),
                (e[1 + o] = h),
                (e[2 + o] = l),
                --s)
            );
        } while (--a);
    }),
    (function () {
        var C = Kinetic.Util.createCanvasElement();
        (Kinetic.Filters.Kaleidoscope = function (t) {
            var e,
                i,
                n,
                a,
                r,
                s,
                o,
                c,
                h,
                l,
                d = t.width,
                u = t.height,
                f = Math.round(this.kaleidoscopePower()),
                g = Math.round(this.kaleidoscopeAngle()),
                p = Math.floor((d * (g % 360)) / 360);
            if (!(f < 1)) {
                (C.width = d), (C.height = u);
                var K = C.getContext("2d").getImageData(0, 0, d, u);
                !(function (t, e, i) {
                    for (
                        var n,
                            a,
                            r,
                            s,
                            o,
                            c,
                            h,
                            l,
                            d = t.data,
                            u = e.data,
                            f = t.width,
                            t = t.height,
                            g = i.polarCenterX || f / 2,
                            p = i.polarCenterY || t / 2,
                            K = Math.sqrt(g * g + p * p),
                            v = f - g,
                            _ = t - p,
                            i = Math.sqrt(v * v + _ * _),
                            K = K < i ? i : K,
                            m = t,
                            y = f,
                            S = ((360 / y) * Math.PI) / 180,
                            C = 0;
                        C < y;
                        C += 1
                    )
                        for (
                            h = Math.sin(C * S), l = Math.cos(C * S), c = 0;
                            c < m;
                            c += 1
                        )
                            (v = Math.floor(g + ((K * c) / m) * l)),
                                (a =
                                    d[
                                        0 +
                                            (n =
                                                4 *
                                                (Math.floor(
                                                    p + ((K * c) / m) * h
                                                ) *
                                                    f +
                                                    v))
                                    ]),
                                (r = d[1 + n]),
                                (s = d[2 + n]),
                                (o = d[3 + n]),
                                (u[0 + (n = 4 * (C + c * f))] = a),
                                (u[1 + n] = r),
                                (u[2 + n] = s),
                                (u[3 + n] = o);
                })(t, K, { polarCenterX: d / 2, polarCenterY: u / 2 });
                for (var v = d / Math.pow(2, f); v <= 8; ) (v *= 2), --f;
                var _ = (v = Math.ceil(v)),
                    m = 0,
                    y = _,
                    S = 1;
                for (
                    d < p + v && ((m = _), (y = 0), (S = -1)), i = 0;
                    i < u;
                    i += 1
                )
                    for (e = m; e !== y; e += S)
                        (n = Math.round(e + p) % d),
                            (r = K.data[(h = 4 * (d * i + n)) + 0]),
                            (s = K.data[h + 1]),
                            (o = K.data[h + 2]),
                            (c = K.data[h + 3]),
                            (K.data[(l = 4 * (d * i + e)) + 0] = r),
                            (K.data[l + 1] = s),
                            (K.data[l + 2] = o),
                            (K.data[l + 3] = c);
                for (i = 0; i < u; i += 1)
                    for (_ = Math.floor(v), a = 0; a < f; a += 1) {
                        for (e = 0; e < _ + 1; e += 1)
                            (r = K.data[(h = 4 * (d * i + e)) + 0]),
                                (s = K.data[h + 1]),
                                (o = K.data[h + 2]),
                                (c = K.data[h + 3]),
                                (K.data[(l = 4 * (d * i + 2 * _ - e - 1)) + 0] =
                                    r),
                                (K.data[l + 1] = s),
                                (K.data[l + 2] = o),
                                (K.data[l + 3] = c);
                        _ *= 2;
                    }
                !(function (t, e, i) {
                    var n,
                        a,
                        r,
                        s,
                        o,
                        c,
                        h,
                        l = t.data,
                        d = e.data,
                        u = t.width,
                        f = t.height,
                        g = i.polarCenterX || u / 2,
                        p = i.polarCenterY || f / 2,
                        K = Math.sqrt(g * g + p * p),
                        v = u - g,
                        _ = f - p,
                        t = Math.sqrt(v * v + _ * _),
                        K = K < t ? t : K,
                        m = f,
                        y = u,
                        S = i.polarRotation || 0;
                    for (v = 0; v < u; v += 1)
                        for (_ = 0; _ < f; _ += 1)
                            (h = v - g),
                                (n = _ - p),
                                (c = (Math.sqrt(h * h + n * n) * m) / K),
                                (h =
                                    ((((180 * Math.atan2(n, h)) / Math.PI +
                                        360 +
                                        S) %
                                        360) *
                                        y) /
                                    360),
                                (h = Math.floor(h)),
                                (a = l[0 + (h = 4 * (Math.floor(c) * u + h))]),
                                (r = l[1 + h]),
                                (s = l[2 + h]),
                                (o = l[3 + h]),
                                (d[0 + (h = 4 * (_ * u + v))] = a),
                                (d[1 + h] = r),
                                (d[2 + h] = s),
                                (d[3 + h] = o);
                })(K, t, { polarRotation: 0 });
            }
        }),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Node,
                "kaleidoscopePower",
                2,
                null,
                Kinetic.Factory.afterSetFilter
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Node,
                "kaleidoscopeAngle",
                0,
                null,
                Kinetic.Factory.afterSetFilter
            );
    })(),
    (function () {
        var l =
                Kinetic.root.performance && Kinetic.root.performance.now
                    ? function () {
                          return Kinetic.root.performance.now();
                      }
                    : function () {
                          return new Date().getTime();
                      },
            e =
                Kinetic.root.requestAnimationFrame ||
                Kinetic.root.webkitRequestAnimationFrame ||
                Kinetic.root.mozRequestAnimationFrame ||
                Kinetic.root.oRequestAnimationFrame ||
                Kinetic.root.msRequestAnimationFrame ||
                function (t) {
                    setTimeout(t, 1e3 / 60);
                };
        (Kinetic.Animation = function (t, e) {
            var i = Kinetic.Animation;
            (this.func = t),
                this.setLayers(e),
                (this.id = i.animIdCounter++),
                (this.frame = { time: 0, timeDiff: 0, lastTime: l() });
        }),
            (Kinetic.Animation.prototype = {
                setLayers: function (t) {
                    var e = t ? (0 < t.length ? t : [t]) : [];
                    this.layers = e;
                },
                getLayers: function () {
                    return this.layers;
                },
                addLayer: function (t) {
                    var e,
                        i,
                        n = this.layers;
                    if (n) {
                        for (e = n.length, i = 0; i < e; i++)
                            if (n[i]._id === t._id) return !1;
                    } else this.layers = [];
                    return this.layers.push(t), !0;
                },
                isRunning: function () {
                    for (
                        var t = Kinetic.Animation.animations,
                            e = t.length,
                            i = 0;
                        i < e;
                        i++
                    )
                        if (t[i].id === this.id) return !0;
                    return !1;
                },
                start: function () {
                    var t = Kinetic.Animation;
                    this.stop(),
                        (this.frame.timeDiff = 0),
                        (this.frame.lastTime = l()),
                        t._addAnimation(this);
                },
                stop: function () {
                    Kinetic.Animation._removeAnimation(this);
                },
                _updateFrameObject: function (t) {
                    (this.frame.timeDiff = t - this.frame.lastTime),
                        (this.frame.lastTime = t),
                        (this.frame.time += this.frame.timeDiff),
                        (this.frame.frameRate = 1e3 / this.frame.timeDiff);
                },
            }),
            (Kinetic.Animation.animations = []),
            (Kinetic.Animation.animIdCounter = 0),
            (Kinetic.Animation.animRunning = !1),
            (Kinetic.Animation._addAnimation = function (t) {
                this.animations.push(t), this._handleAnimation();
            }),
            (Kinetic.Animation._removeAnimation = function (t) {
                for (
                    var e = t.id, i = this.animations, n = i.length, a = 0;
                    a < n;
                    a++
                )
                    if (i[a].id === e) {
                        this.animations.splice(a, 1);
                        break;
                    }
            }),
            (Kinetic.Animation._runFrames = function () {
                for (
                    var t, e, i, n, a, r, s, o = {}, c = this.animations, h = 0;
                    h < c.length;
                    h++
                )
                    if (
                        ((e = (t = c[h]).layers),
                        (i = t.func),
                        t._updateFrameObject(l()),
                        (a = e.length),
                        !i || !1 !== i.call(t, t.frame))
                    )
                        for (n = 0; n < a; n++)
                            void 0 !== (r = e[n])._id && (o[r._id] = r);
                for (s in o) o[s].draw();
            }),
            (Kinetic.Animation._animationLoop = function () {
                var t = Kinetic.Animation;
                t.animations.length
                    ? ((function () {
                          e.apply(Kinetic.root, arguments);
                      })(t._animationLoop),
                      t._runFrames())
                    : (t.animRunning = !1);
            }),
            (Kinetic.Animation._handleAnimation = function () {
                this.animRunning ||
                    ((this.animRunning = !0), this._animationLoop());
            });
        var i = Kinetic.Node.prototype.moveTo;
        (Kinetic.Node.prototype.moveTo = function (t) {
            i.call(this, t);
        }),
            (Kinetic.BaseLayer.prototype.batchDraw = function () {
                var t = this,
                    e = Kinetic.Animation;
                this.batchAnim ||
                    (this.batchAnim = new e(function () {
                        t.lastBatchDrawTime &&
                            500 < l() - t.lastBatchDrawTime &&
                            t.batchAnim.stop();
                    }, this)),
                    (this.lastBatchDrawTime = l()),
                    this.batchAnim.isRunning() ||
                        (this.draw(), this.batchAnim.start());
            }),
            (Kinetic.Stage.prototype.batchDraw = function () {
                this.getChildren().each(function (t) {
                    t.batchDraw();
                });
            });
    })(),
    (function () {
        var c = { node: 1, duration: 1, easing: 1, onFinish: 1, yoyo: 1 },
            h = 0;
        (Kinetic.Tween = function (t) {
            var e,
                i = this,
                n = t.node,
                a = n._id,
                r = t.easing || Kinetic.Easings.Linear,
                s = !!t.yoyo,
                o =
                    void 0 === t.duration
                        ? 1
                        : 0 === t.duration
                        ? 0.001
                        : t.duration;
            for (e in ((this.node = n),
            (this._id = h++),
            (this.anim = new Kinetic.Animation(function () {
                i.tween.onEnterFrame();
            }, n.getLayer() ||
                (n instanceof Kinetic.Stage ? n.getLayers() : null))),
            (this.tween = new l(
                e,
                function (t) {
                    i._tweenFunc(t);
                },
                r,
                0,
                1,
                1e3 * o,
                s
            )),
            this._addListeners(),
            Kinetic.Tween.attrs[a] || (Kinetic.Tween.attrs[a] = {}),
            Kinetic.Tween.attrs[a][this._id] ||
                (Kinetic.Tween.attrs[a][this._id] = {}),
            Kinetic.Tween.tweens[a] || (Kinetic.Tween.tweens[a] = {}),
            t))
                void 0 === c[e] && this._addAttr(e, t[e]);
            this.reset(),
                (this.onFinish = t.onFinish),
                (this.onReset = t.onReset);
        }),
            (Kinetic.Tween.attrs = {}),
            (Kinetic.Tween.tweens = {}),
            (Kinetic.Tween.prototype = {
                _addAttr: function (t, e) {
                    var i,
                        n,
                        a,
                        r,
                        s = this.node,
                        o = s._id,
                        c = Kinetic.Tween.tweens[o][t];
                    if (
                        (c && delete Kinetic.Tween.attrs[o][c][t],
                        (i = s.getAttr(t)),
                        Kinetic.Util._isArray(e))
                    )
                        for (n = [], r = e.length, a = 0; a < r; a++)
                            n.push(e[a] - i[a]);
                    else n = e - i;
                    (Kinetic.Tween.attrs[o][this._id][t] = {
                        start: i,
                        diff: n,
                    }),
                        (Kinetic.Tween.tweens[o][t] = this._id);
                },
                _tweenFunc: function (t) {
                    var e,
                        i,
                        n,
                        a,
                        r,
                        s,
                        o,
                        c = this.node,
                        h = Kinetic.Tween.attrs[c._id][this._id];
                    for (e in h) {
                        if (
                            ((n = (i = h[e]).start),
                            (a = i.diff),
                            Kinetic.Util._isArray(n))
                        )
                            for (r = [], o = n.length, s = 0; s < o; s++)
                                r.push(n[s] + a[s] * t);
                        else r = n + a * t;
                        c.setAttr(e, r);
                    }
                },
                _addListeners: function () {
                    var t = this;
                    (this.tween.onPlay = function () {
                        t.anim.start();
                    }),
                        (this.tween.onReverse = function () {
                            t.anim.start();
                        }),
                        (this.tween.onPause = function () {
                            t.anim.stop();
                        }),
                        (this.tween.onFinish = function () {
                            t.onFinish && t.onFinish();
                        }),
                        (this.tween.onReset = function () {
                            t.onReset && t.onReset();
                        });
                },
                play: function () {
                    return this.tween.play(), this;
                },
                reverse: function () {
                    return this.tween.reverse(), this;
                },
                reset: function () {
                    return this.tween.reset(), this;
                },
                seek: function (t) {
                    return this.tween.seek(1e3 * t), this;
                },
                pause: function () {
                    return this.tween.pause(), this;
                },
                finish: function () {
                    return this.tween.finish(), this;
                },
                destroy: function () {
                    var t,
                        e = this.node._id,
                        i = this._id,
                        n = Kinetic.Tween.tweens[e];
                    for (t in (this.pause(), n))
                        delete Kinetic.Tween.tweens[e][t];
                    delete Kinetic.Tween.attrs[e][i];
                },
            });
        var l = function (t, e, i, n, a, r, s) {
            (this.prop = t),
                (this.propFunc = e),
                (this.begin = n),
                (this._pos = n),
                (this.duration = r),
                (this._change = 0),
                (this.prevPos = 0),
                (this.yoyo = s),
                (this._time = 0),
                (this._position = 0),
                (this._startTime = 0),
                (this._finish = 0),
                (this.func = i),
                (this._change = a - this.begin),
                this.pause();
        };
        (l.prototype = {
            fire: function (t) {
                t = this[t];
                t && t();
            },
            setTime: function (t) {
                t > this.duration
                    ? this.yoyo
                        ? ((this._time = this.duration), this.reverse())
                        : this.finish()
                    : t < 0
                    ? this.yoyo
                        ? ((this._time = 0), this.play())
                        : this.reset()
                    : ((this._time = t), this.update());
            },
            getTime: function () {
                return this._time;
            },
            setPosition: function (t) {
                (this.prevPos = this._pos), this.propFunc(t), (this._pos = t);
            },
            getPosition: function (t) {
                return (
                    void 0 === t && (t = this._time),
                    this.func(t, this.begin, this._change, this.duration)
                );
            },
            play: function () {
                (this.state = 2),
                    (this._startTime = this.getTimer() - this._time),
                    this.onEnterFrame(),
                    this.fire("onPlay");
            },
            reverse: function () {
                (this.state = 3),
                    (this._time = this.duration - this._time),
                    (this._startTime = this.getTimer() - this._time),
                    this.onEnterFrame(),
                    this.fire("onReverse");
            },
            seek: function (t) {
                this.pause(),
                    (this._time = t),
                    this.update(),
                    this.fire("onSeek");
            },
            reset: function () {
                this.pause(),
                    (this._time = 0),
                    this.update(),
                    this.fire("onReset");
            },
            finish: function () {
                this.pause(),
                    (this._time = this.duration),
                    this.update(),
                    this.fire("onFinish");
            },
            update: function () {
                this.setPosition(this.getPosition(this._time));
            },
            onEnterFrame: function () {
                var t = this.getTimer() - this._startTime;
                2 === this.state
                    ? this.setTime(t)
                    : 3 === this.state && this.setTime(this.duration - t);
            },
            pause: function () {
                (this.state = 1), this.fire("onPause");
            },
            getTimer: function () {
                return new Date().getTime();
            },
        }),
            (Kinetic.Easings = {
                BackEaseIn: function (t, e, i, n) {
                    return i * (t /= n) * t * (2.70158 * t - 1.70158) + e;
                },
                BackEaseOut: function (t, e, i, n) {
                    return (
                        i *
                            ((t = t / n - 1) * t * (2.70158 * t + 1.70158) +
                                1) +
                        e
                    );
                },
                BackEaseInOut: function (t, e, i, n) {
                    var a = 1.70158;
                    return (t /= n / 2) < 1
                        ? (i / 2) * t * t * ((1 + (a *= 1.525)) * t - a) + e
                        : (i / 2) *
                              ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) +
                                  2) +
                              e;
                },
                ElasticEaseIn: function (t, e, i, n, a, r) {
                    var s = 0;
                    return 0 === t
                        ? e
                        : 1 == (t /= n)
                        ? e + i
                        : ((r = r || 0.3 * n),
                          (s =
                              !a || a < Math.abs(i)
                                  ? ((a = i), r / 4)
                                  : (r / (2 * Math.PI)) * Math.asin(i / a)),
                          -(
                              a *
                              Math.pow(2, 10 * --t) *
                              Math.sin((2 * (t * n - s) * Math.PI) / r)
                          ) + e);
                },
                ElasticEaseOut: function (t, e, i, n, a, r) {
                    var s = 0;
                    return 0 === t
                        ? e
                        : 1 == (t /= n)
                        ? e + i
                        : ((r = r || 0.3 * n),
                          (s =
                              !a || a < Math.abs(i)
                                  ? ((a = i), r / 4)
                                  : (r / (2 * Math.PI)) * Math.asin(i / a)),
                          a *
                              Math.pow(2, -10 * t) *
                              Math.sin((2 * (t * n - s) * Math.PI) / r) +
                              i +
                              e);
                },
                ElasticEaseInOut: function (t, e, i, n, a, r) {
                    var s = 0;
                    return 0 === t
                        ? e
                        : 2 == (t /= n / 2)
                        ? e + i
                        : ((r = r || 0.3 * n * 1.5),
                          (s =
                              !a || a < Math.abs(i)
                                  ? ((a = i), r / 4)
                                  : (r / (2 * Math.PI)) * Math.asin(i / a)),
                          t < 1
                              ? -0.5 *
                                    a *
                                    Math.pow(2, 10 * --t) *
                                    Math.sin((2 * (t * n - s) * Math.PI) / r) +
                                e
                              : a *
                                    Math.pow(2, -10 * --t) *
                                    Math.sin((2 * (t * n - s) * Math.PI) / r) *
                                    0.5 +
                                i +
                                e);
                },
                BounceEaseOut: function (t, e, i, n) {
                    return (t /= n) < 1 / 2.75
                        ? 7.5625 * i * t * t + e
                        : t < 2 / 2.75
                        ? i * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + e
                        : t < 2.5 / 2.75
                        ? i * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + e
                        : i * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + e;
                },
                BounceEaseIn: function (t, e, i, n) {
                    return (
                        i - Kinetic.Easings.BounceEaseOut(n - t, 0, i, n) + e
                    );
                },
                BounceEaseInOut: function (t, e, i, n) {
                    return t < n / 2
                        ? 0.5 * Kinetic.Easings.BounceEaseIn(2 * t, 0, i, n) + e
                        : 0.5 *
                              Kinetic.Easings.BounceEaseOut(
                                  2 * t - n,
                                  0,
                                  i,
                                  n
                              ) +
                              0.5 * i +
                              e;
                },
                EaseIn: function (t, e, i, n) {
                    return i * (t /= n) * t + e;
                },
                EaseOut: function (t, e, i, n) {
                    return -i * (t /= n) * (t - 2) + e;
                },
                EaseInOut: function (t, e, i, n) {
                    return (t /= n / 2) < 1
                        ? (i / 2) * t * t + e
                        : (-i / 2) * (--t * (t - 2) - 1) + e;
                },
                StrongEaseIn: function (t, e, i, n) {
                    return i * (t /= n) * t * t * t * t + e;
                },
                StrongEaseOut: function (t, e, i, n) {
                    return i * ((t = t / n - 1) * t * t * t * t + 1) + e;
                },
                StrongEaseInOut: function (t, e, i, n) {
                    return (t /= n / 2) < 1
                        ? (i / 2) * t * t * t * t * t + e
                        : (i / 2) * ((t -= 2) * t * t * t * t + 2) + e;
                },
                Linear: function (t, e, i, n) {
                    return (i * t) / n + e;
                },
            });
    })(),
    (function () {
        (Kinetic.DD = {
            anim: new Kinetic.Animation(function () {
                var t = this.dirty;
                return (this.dirty = !1), t;
            }),
            isDragging: !1,
            justDragged: !1,
            offset: { x: 0, y: 0 },
            node: null,
            _drag: function (t) {
                var e = Kinetic.DD,
                    i = e.node;
                if (i) {
                    if (!e.isDragging) {
                        var n = i.getStage().getPointerPosition(),
                            a = i.dragDistance();
                        if (
                            Math.max(
                                Math.abs(n.x - e.startPointerPos.x),
                                Math.abs(n.y - e.startPointerPos.y)
                            ) < a
                        )
                            return;
                    }
                    i._setDragPosition(t),
                        e.isDragging ||
                            ((e.isDragging = !0),
                            i.fire(
                                "dragstart",
                                { type: "dragstart", target: i, evt: t },
                                !0
                            )),
                        i.fire(
                            "dragmove",
                            { type: "dragmove", target: i, evt: t },
                            !0
                        );
                }
            },
            _endDragBefore: function (t) {
                var e,
                    i = Kinetic.DD,
                    n = i.node;
                n &&
                    (n.nodeType,
                    (e = n.getLayer()),
                    i.anim.stop(),
                    i.isDragging &&
                        ((i.isDragging = !1),
                        (i.justDragged = !0),
                        (Kinetic.listenClickTap = !1),
                        t && (t.dragEndNode = n)),
                    delete i.node,
                    (e || n).draw());
            },
            _endDragAfter: function (t) {
                var e = (t = t || {}).dragEndNode;
                t &&
                    e &&
                    e.fire(
                        "dragend",
                        { type: "dragend", target: e, evt: t },
                        !0
                    );
            },
        }),
            (Kinetic.Node.prototype.startDrag = function () {
                var t = Kinetic.DD,
                    e = this.getStage(),
                    i = this.getLayer(),
                    n = e.getPointerPosition(),
                    e = this.getAbsolutePosition();
                n &&
                    (t.node && t.node.stopDrag(),
                    (t.node = this),
                    (t.startPointerPos = n),
                    (t.offset.x = n.x - e.x),
                    (t.offset.y = n.y - e.y),
                    t.anim.setLayers(i || this.getLayers()),
                    t.anim.start(),
                    this._setDragPosition());
            }),
            (Kinetic.Node.prototype._setDragPosition = function (t) {
                var e = Kinetic.DD,
                    i = this.getStage().getPointerPosition(),
                    n = this.getDragBoundFunc();
                i &&
                    ((i = { x: i.x - e.offset.x, y: i.y - e.offset.y }),
                    void 0 !== n && (i = n.call(this, i, t)),
                    this.setAbsolutePosition(i),
                    (this._lastPos &&
                        this._lastPos.x === i.x &&
                        this._lastPos.y === i.y) ||
                        (e.anim.dirty = !0),
                    (this._lastPos = i));
            }),
            (Kinetic.Node.prototype.stopDrag = function () {
                var t = Kinetic.DD,
                    e = {};
                t._endDragBefore(e), t._endDragAfter(e);
            }),
            (Kinetic.Node.prototype.setDraggable = function (t) {
                this._setAttr("draggable", t), this._dragChange();
            });
        var e = Kinetic.Node.prototype.destroy;
        (Kinetic.Node.prototype.destroy = function () {
            var t = Kinetic.DD;
            t.node && t.node._id === this._id && this.stopDrag(), e.call(this);
        }),
            (Kinetic.Node.prototype.isDragging = function () {
                var t = Kinetic.DD;
                return !(!t.node || t.node._id !== this._id || !t.isDragging);
            }),
            (Kinetic.Node.prototype._listenDrag = function () {
                var e = this;
                this._dragCleanup(),
                    "Stage" === this.getClassName()
                        ? this.on(
                              "contentMousedown.kinetic contentTouchstart.kinetic",
                              function (t) {
                                  Kinetic.DD.node || e.startDrag(t);
                              }
                          )
                        : this.on(
                              "mousedown.kinetic touchstart.kinetic",
                              function (t) {
                                  1 !== t.evt.button &&
                                      2 !== t.evt.button &&
                                      (Kinetic.DD.node || e.startDrag(t));
                              }
                          );
            }),
            (Kinetic.Node.prototype._dragChange = function () {
                var t, e;
                this.attrs.draggable
                    ? this._listenDrag()
                    : (this._dragCleanup(),
                      (t = this.getStage()),
                      (e = Kinetic.DD),
                      t &&
                          e.node &&
                          e.node._id === this._id &&
                          e.node.stopDrag());
            }),
            (Kinetic.Node.prototype._dragCleanup = function () {
                "Stage" === this.getClassName()
                    ? (this.off("contentMousedown.kinetic"),
                      this.off("contentTouchstart.kinetic"))
                    : (this.off("mousedown.kinetic"),
                      this.off("touchstart.kinetic"));
            }),
            Kinetic.Factory.addGetterSetter(Kinetic.Node, "dragBoundFunc"),
            Kinetic.Factory.addGetter(Kinetic.Node, "draggable", !1),
            Kinetic.Factory.addOverloadedGetterSetter(
                Kinetic.Node,
                "draggable"
            );
        var t = Kinetic.document.documentElement;
        t.addEventListener("mouseup", Kinetic.DD._endDragBefore, !0),
            t.addEventListener("touchend", Kinetic.DD._endDragBefore, !0),
            t.addEventListener("mouseup", Kinetic.DD._endDragAfter, !1),
            t.addEventListener("touchend", Kinetic.DD._endDragAfter, !1);
    })(),
    Kinetic.Util.addMethods(Kinetic.Container, {
        __init: function (t) {
            (this.children = new Kinetic.Collection()),
                Kinetic.Node.call(this, t);
        },
        getChildren: function (e) {
            if (e) {
                var i = new Kinetic.Collection();
                return (
                    this.children.each(function (t) {
                        e(t) && i.push(t);
                    }),
                    i
                );
            }
            return this.children;
        },
        hasChildren: function () {
            return 0 < this.getChildren().length;
        },
        removeChildren: function () {
            for (
                var t,
                    e = Kinetic.Collection.toCollection(this.children),
                    i = 0;
                i < e.length;
                i++
            )
                delete (t = e[i]).parent,
                    (t.index = 0),
                    t.hasChildren() && t.removeChildren(),
                    t.remove();
            return (e = null), (this.children = new Kinetic.Collection()), this;
        },
        destroyChildren: function () {
            for (
                var t,
                    e = Kinetic.Collection.toCollection(this.children),
                    i = 0;
                i < e.length;
                i++
            )
                delete (t = e[i]).parent, (t.index = 0), t.destroy();
            return (e = null), (this.children = new Kinetic.Collection()), this;
        },
        add: function (t) {
            if (1 < arguments.length) {
                for (var e = 0; e < arguments.length; e++)
                    this.add(arguments[e]);
                return this;
            }
            if (t.getParent()) return t.moveTo(this), this;
            var i = this.children;
            return (
                this._validateAdd(t),
                (t.index = i.length),
                (t.parent = this),
                i.push(t),
                this._fire("add", { child: t }),
                this
            );
        },
        destroy: function () {
            this.hasChildren() && this.destroyChildren(),
                Kinetic.Node.prototype.destroy.call(this);
        },
        find: function (t) {
            for (
                var e,
                    i,
                    n,
                    a,
                    r,
                    s = [],
                    o = t.replace(/ /g, "").split(","),
                    c = o.length,
                    h = 0;
                h < c;
                h++
            )
                if ("#" === (i = o[h]).charAt(0))
                    (n = this._getNodeById(i.slice(1))) && s.push(n);
                else if ("." === i.charAt(0))
                    (n = this._getNodesByName(i.slice(1))), (s = s.concat(n));
                else
                    for (r = (a = this.getChildren()).length, e = 0; e < r; e++)
                        s = s.concat(a[e]._get(i));
            return Kinetic.Collection.toCollection(s);
        },
        _getNodeById: function (t) {
            t = Kinetic.ids[t];
            return void 0 !== t && this.isAncestorOf(t) ? t : null;
        },
        _getNodesByName: function (t) {
            t = Kinetic.names[t] || [];
            return this._getDescendants(t);
        },
        _get: function (t) {
            for (
                var e = Kinetic.Node.prototype._get.call(this, t),
                    i = this.getChildren(),
                    n = i.length,
                    a = 0;
                a < n;
                a++
            )
                e = e.concat(i[a]._get(t));
            return e;
        },
        toObject: function () {
            var t = Kinetic.Node.prototype.toObject.call(this);
            t.children = [];
            for (var e = this.getChildren(), i = e.length, n = 0; n < i; n++) {
                var a = e[n];
                t.children.push(a.toObject());
            }
            return t;
        },
        _getDescendants: function (t) {
            for (var e = [], i = t.length, n = 0; n < i; n++) {
                var a = t[n];
                this.isAncestorOf(a) && e.push(a);
            }
            return e;
        },
        isAncestorOf: function (t) {
            for (var e = t.getParent(); e; ) {
                if (e._id === this._id) return !0;
                e = e.getParent();
            }
            return !1;
        },
        clone: function (t) {
            var e = Kinetic.Node.prototype.clone.call(this, t);
            return (
                this.getChildren().each(function (t) {
                    e.add(t.clone());
                }),
                e
            );
        },
        getAllIntersections: function (e) {
            var i = [];
            return (
                this.find("Shape").each(function (t) {
                    t.isVisible() && t.intersects(e) && i.push(t);
                }),
                i
            );
        },
        _setChildrenIndices: function () {
            this.children.each(function (t, e) {
                t.index = e;
            });
        },
        drawScene: function (t, e) {
            var i = this.getLayer(),
                n = t || (i && i.getCanvas()),
                t = n && n.getContext(),
                i = this._cache.canvas,
                i = i && i.scene;
            return (
                this.isVisible() &&
                    (i
                        ? this._drawCachedSceneCanvas(t)
                        : this._drawChildren(n, "drawScene", e)),
                this
            );
        },
        drawHit: function (t, e) {
            var i = this.getLayer(),
                n = t || (i && i.hitCanvas),
                a = n && n.getContext(),
                t = this._cache.canvas,
                t = t && t.hit;
            return (
                this.shouldDrawHit(n) &&
                    (i && i.clearHitCache(),
                    t
                        ? this._drawCachedHitCanvas(a)
                        : this._drawChildren(n, "drawHit", e)),
                this
            );
        },
        _drawChildren: function (e, i, n) {
            var t,
                a,
                r = this.getLayer(),
                s = e && e.getContext(),
                o = this.getClipWidth(),
                c = this.getClipHeight(),
                h = o && c;
            h &&
                r &&
                ((t = this.getClipX()),
                (a = this.getClipY()),
                s.save(),
                r._applyTransform(this, s),
                s.beginPath(),
                s.rect(t, a, o, c),
                s.clip(),
                s.reset()),
                this.children.each(function (t) {
                    t[i](e, n);
                }),
                h && s.restore();
        },
        shouldDrawHit: function (t) {
            var e = this.getLayer();
            return (
                (t && t.isCache) ||
                (e &&
                    e.hitGraphEnabled() &&
                    this.isVisible() &&
                    !Kinetic.isDragging())
            );
        },
    }),
    Kinetic.Util.extend(Kinetic.Container, Kinetic.Node),
    (Kinetic.Container.prototype.get = Kinetic.Container.prototype.find),
    Kinetic.Factory.addComponentsGetterSetter(Kinetic.Container, "clip", [
        "x",
        "y",
        "width",
        "height",
    ]),
    Kinetic.Factory.addGetterSetter(Kinetic.Container, "clipX"),
    Kinetic.Factory.addGetterSetter(Kinetic.Container, "clipY"),
    Kinetic.Factory.addGetterSetter(Kinetic.Container, "clipWidth"),
    Kinetic.Factory.addGetterSetter(Kinetic.Container, "clipHeight"),
    Kinetic.Collection.mapMethods(Kinetic.Container),
    (function () {
        function n(t) {
            t.fill();
        }
        function a(t) {
            t.stroke();
        }
        function r(t) {
            t.fill();
        }
        function s(t) {
            t.stroke();
        }
        function o() {
            this._clearCache(t);
        }
        var t = "hasShadow";
        Kinetic.Util.addMethods(Kinetic.Shape, {
            __init: function (t) {
                (this.nodeType = "Shape"),
                    (this._fillFunc = n),
                    (this._strokeFunc = a),
                    (this._fillFuncHit = r),
                    (this._strokeFuncHit = s);
                for (
                    var e, i = Kinetic.shapes;
                    !(e = Kinetic.Util.getRandomColor()) || e in i;

                );
                (i[(this.colorKey = e)] = this),
                    Kinetic.Node.call(this, t),
                    this.on(
                        "shadowColorChange.kinetic shadowBlurChange.kinetic shadowOffsetChange.kinetic shadowOpacityChange.kinetic shadowEnabledChange.kinetic",
                        o
                    );
            },
            hasChildren: function () {
                return !1;
            },
            getChildren: function () {
                return [];
            },
            getContext: function () {
                return this.getLayer().getContext();
            },
            getCanvas: function () {
                return this.getLayer().getCanvas();
            },
            hasShadow: function () {
                return this._getCache(t, this._hasShadow);
            },
            _hasShadow: function () {
                return (
                    this.getShadowEnabled() &&
                    0 !== this.getShadowOpacity() &&
                    !!(
                        this.getShadowColor() ||
                        this.getShadowBlur() ||
                        this.getShadowOffsetX() ||
                        this.getShadowOffsetY()
                    )
                );
            },
            hasFill: function () {
                return !!(
                    this.getFill() ||
                    this.getFillPatternImage() ||
                    this.getFillLinearGradientColorStops() ||
                    this.getFillRadialGradientColorStops()
                );
            },
            hasStroke: function () {
                return !!(
                    this.stroke() ||
                    this.strokeRed() ||
                    this.strokeGreen() ||
                    this.strokeBlue()
                );
            },
            intersects: function (t) {
                var e = this.getStage().bufferHitCanvas;
                return (
                    e.getContext().clear(),
                    this.drawScene(e),
                    0 <
                        e.context.getImageData(
                            Math.round(t.x),
                            Math.round(t.y),
                            1,
                            1
                        ).data[3]
                );
            },
            destroy: function () {
                Kinetic.Node.prototype.destroy.call(this),
                    delete Kinetic.shapes[this.colorKey];
            },
            _useBufferCanvas: function () {
                return (
                    (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) &&
                    this.hasFill() &&
                    this.hasStroke() &&
                    this.getStage()
                );
            },
            drawScene: function (t, e) {
                var i,
                    n = this.getLayer(),
                    a = t || n.getCanvas(),
                    r = a.getContext(),
                    s = this._cache.canvas,
                    o = this.sceneFunc(),
                    c = this.hasShadow();
                return (
                    this.isVisible() &&
                        (s
                            ? this._drawCachedSceneCanvas(r)
                            : o &&
                              (r.save(),
                              this._useBufferCanvas()
                                  ? ((t = (i =
                                        this.getStage()
                                            .bufferCanvas).getContext()).clear(),
                                    t.save(),
                                    t._applyLineJoin(this),
                                    n
                                        ? n._applyTransform(this, t, e)
                                        : ((s =
                                              this.getAbsoluteTransform(
                                                  e
                                              ).getMatrix()),
                                          r.transform(
                                              s[0],
                                              s[1],
                                              s[2],
                                              s[3],
                                              s[4],
                                              s[5]
                                          )),
                                    o.call(this, t),
                                    t.restore(),
                                    c &&
                                        !a.hitCanvas &&
                                        (r.save(),
                                        r._applyShadow(this),
                                        r.drawImage(i._canvas, 0, 0),
                                        r.restore()),
                                    r._applyOpacity(this),
                                    r.drawImage(i._canvas, 0, 0))
                                  : (r._applyLineJoin(this),
                                    n
                                        ? n._applyTransform(this, r, e)
                                        : ((e =
                                              this.getAbsoluteTransform(
                                                  e
                                              ).getMatrix()),
                                          r.transform(
                                              e[0],
                                              e[1],
                                              e[2],
                                              e[3],
                                              e[4],
                                              e[5]
                                          )),
                                    c &&
                                        !a.hitCanvas &&
                                        (r.save(),
                                        r._applyShadow(this),
                                        o.call(this, r),
                                        r.restore()),
                                    r._applyOpacity(this),
                                    o.call(this, r)),
                              r.restore())),
                    this
                );
            },
            drawHit: function (t, e) {
                var i = this.getLayer(),
                    n = t || i.hitCanvas,
                    a = n.getContext(),
                    r = this.hitFunc() || this.sceneFunc(),
                    t = this._cache.canvas,
                    t = t && t.hit;
                return (
                    this.shouldDrawHit(n) &&
                        (i && i.clearHitCache(),
                        t
                            ? this._drawCachedHitCanvas(a)
                            : r &&
                              (a.save(),
                              a._applyLineJoin(this),
                              i
                                  ? i._applyTransform(this, a, e)
                                  : ((e =
                                        this.getAbsoluteTransform(
                                            e
                                        ).getMatrix()),
                                    a.transform(
                                        e[0],
                                        e[1],
                                        e[2],
                                        e[3],
                                        e[4],
                                        e[5]
                                    )),
                              r.call(this, a),
                              a.restore())),
                    this
                );
            },
            drawHitFromCache: function (t) {
                var e,
                    i,
                    n,
                    a,
                    r,
                    s,
                    o = t || 0,
                    c = this._cache.canvas,
                    h = this._getCachedSceneCanvas(),
                    l = h.getContext(),
                    t = c.hit.getContext(),
                    c = h.getWidth(),
                    h = h.getHeight();
                t.clear();
                try {
                    for (
                        e = l.getImageData(0, 0, c, h).data,
                            n = (i = t.getImageData(0, 0, c, h)).data,
                            a = e.length,
                            r = Kinetic.Util._hexToRgb(this.colorKey),
                            s = 0;
                        s < a;
                        s += 4
                    )
                        o < e[s + 3] &&
                            ((n[s] = r.r),
                            (n[s + 1] = r.g),
                            (n[s + 2] = r.b),
                            (n[s + 3] = 255));
                    t.putImageData(i, 0, 0);
                } catch (t) {
                    Kinetic.Util.warn(
                        "Unable to draw hit graph from cached scene canvas. " +
                            t.message
                    );
                }
                return this;
            },
        }),
            Kinetic.Util.extend(Kinetic.Shape, Kinetic.Node),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "stroke"),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "strokeRed",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "strokeGreen",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "strokeBlue",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "strokeAlpha",
                1,
                Kinetic.Validators.alphaComponent
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "strokeWidth", 2),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "lineJoin"),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "lineCap"),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "sceneFunc"),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "hitFunc"),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "dash"),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "shadowColor"),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "shadowRed",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "shadowGreen",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "shadowBlue",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "shadowAlpha",
                1,
                Kinetic.Validators.alphaComponent
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "shadowBlur"),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "shadowOpacity"),
            Kinetic.Factory.addComponentsGetterSetter(
                Kinetic.Shape,
                "shadowOffset",
                ["x", "y"]
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "shadowOffsetX", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "shadowOffsetY", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "fillPatternImage"),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "fill"),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillRed",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillGreen",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillBlue",
                0,
                Kinetic.Validators.RGBComponent
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillAlpha",
                1,
                Kinetic.Validators.alphaComponent
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "fillPatternX", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "fillPatternY", 0),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillLinearGradientColorStops"
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientStartRadius",
                0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientEndRadius",
                0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientColorStops"
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillPatternRepeat",
                "repeat"
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "fillEnabled", !0),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "strokeEnabled", !0),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "shadowEnabled", !0),
            Kinetic.Factory.addGetterSetter(Kinetic.Shape, "dashEnabled", !0),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "strokeScaleEnabled",
                !0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillPriority",
                "color"
            ),
            Kinetic.Factory.addComponentsGetterSetter(
                Kinetic.Shape,
                "fillPatternOffset",
                ["x", "y"]
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillPatternOffsetX",
                0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillPatternOffsetY",
                0
            ),
            Kinetic.Factory.addComponentsGetterSetter(
                Kinetic.Shape,
                "fillPatternScale",
                ["x", "y"]
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillPatternScaleX",
                1
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillPatternScaleY",
                1
            ),
            Kinetic.Factory.addComponentsGetterSetter(
                Kinetic.Shape,
                "fillLinearGradientStartPoint",
                ["x", "y"]
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillLinearGradientStartPointX",
                0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillLinearGradientStartPointY",
                0
            ),
            Kinetic.Factory.addComponentsGetterSetter(
                Kinetic.Shape,
                "fillLinearGradientEndPoint",
                ["x", "y"]
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillLinearGradientEndPointX",
                0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillLinearGradientEndPointY",
                0
            ),
            Kinetic.Factory.addComponentsGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientStartPoint",
                ["x", "y"]
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientStartPointX",
                0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientStartPointY",
                0
            ),
            Kinetic.Factory.addComponentsGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientEndPoint",
                ["x", "y"]
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientEndPointX",
                0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillRadialGradientEndPointY",
                0
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Shape,
                "fillPatternRotation",
                0
            ),
            Kinetic.Factory.backCompat(Kinetic.Shape, {
                dashArray: "dash",
                getDashArray: "getDash",
                setDashArray: "getDash",
                drawFunc: "sceneFunc",
                getDrawFunc: "getSceneFunc",
                setDrawFunc: "setSceneFunc",
                drawHitFunc: "hitFunc",
                getDrawHitFunc: "getHitFunc",
                setDrawHitFunc: "setHitFunc",
            }),
            Kinetic.Collection.mapMethods(Kinetic.Shape);
    })(),
    (function () {
        var n = "mouseout",
            a = "mouseleave",
            r = "mouseover",
            s = "mousemove",
            i = "mousedown",
            o = "mouseup",
            c = "touchstart",
            h = "touchend",
            l = "touchmove",
            d = "mousewheel",
            u = "_",
            e = [i, s, o, n, c, l, h, r, "DOMMouseScroll", d, "wheel"],
            f = e.length;
        Kinetic.Util.addMethods(Kinetic.Stage, {
            ___init: function (t) {
                (this.nodeType = "Stage"),
                    Kinetic.Container.call(this, t),
                    (this._id = Kinetic.idCounter++),
                    this._buildDOM(),
                    this._bindContentEvents(),
                    (this._enableNestedTransforms = !1),
                    Kinetic.stages.push(this);
            },
            _validateAdd: function (t) {
                "Layer" !== t.getType() &&
                    Kinetic.Util.error("You may only add layers to the stage.");
            },
            setContainer: function (t) {
                if ("string" == typeof t) {
                    var e = t;
                    if (!(t = Kinetic.document.getElementById(t)))
                        throw "Can not find container in document with id " + e;
                }
                return this._setAttr("container", t), this;
            },
            shouldDrawHit: function () {
                return !0;
            },
            draw: function () {
                return Kinetic.Node.prototype.draw.call(this), this;
            },
            setHeight: function (t) {
                return (
                    Kinetic.Node.prototype.setHeight.call(this, t),
                    this._resizeDOM(),
                    this
                );
            },
            setWidth: function (t) {
                return (
                    Kinetic.Node.prototype.setWidth.call(this, t),
                    this._resizeDOM(),
                    this
                );
            },
            clear: function () {
                for (var t = this.children, e = t.length, i = 0; i < e; i++)
                    t[i].clear();
                return this;
            },
            clone: function (t) {
                return (
                    ((t = t || {}).container =
                        Kinetic.document.createElement("div")),
                    Kinetic.Container.prototype.clone.call(this, t)
                );
            },
            destroy: function () {
                var t = this.content;
                Kinetic.Container.prototype.destroy.call(this),
                    t &&
                        Kinetic.Util._isInDocument(t) &&
                        this.getContainer().removeChild(t);
                t = Kinetic.stages.indexOf(this);
                -1 < t && Kinetic.stages.splice(t, 1);
            },
            getPointerPosition: function () {
                return this.pointerPos;
            },
            getStage: function () {
                return this;
            },
            getContent: function () {
                return this.content;
            },
            toDataURL: function (a) {
                var r = (a = a || {}).mimeType || null,
                    s = a.quality || null,
                    t = a.x || 0,
                    e = a.y || 0,
                    o = new Kinetic.SceneCanvas({
                        width: a.width || this.getWidth(),
                        height: a.height || this.getHeight(),
                        pixelRatio: 1,
                    }),
                    c = o.getContext()._context,
                    h = this.children;
                (t || e) && c.translate(-1 * t, -1 * e),
                    (function t(e) {
                        var i = h[e].toDataURL(),
                            n = new Kinetic.window.Image();
                        (n.onload = function () {
                            c.drawImage(n, 0, 0),
                                e < h.length - 1
                                    ? t(e + 1)
                                    : a.callback(o.toDataURL(r, s));
                        }),
                            (n.src = i);
                    })(0);
            },
            toImage: function (t) {
                var e = t.callback;
                (t.callback = function (t) {
                    Kinetic.Util._getImage(t, function (t) {
                        e(t);
                    });
                }),
                    this.toDataURL(t);
            },
            getIntersection: function (t) {
                for (
                    var e, i = this.getChildren(), n = i.length - 1;
                    0 <= n;
                    n--
                )
                    if ((e = i[n].getIntersection(t))) return e;
                return null;
            },
            _resizeDOM: function () {
                if (this.content) {
                    var t,
                        e,
                        i = this.getWidth(),
                        n = this.getHeight(),
                        a = this.getChildren(),
                        r = a.length;
                    for (
                        this.content.style.width = i + "px",
                            this.content.style.height = n + "px",
                            this.bufferCanvas.setSize(i, n),
                            this.bufferHitCanvas.setSize(i, n),
                            t = 0;
                        t < r;
                        t++
                    )
                        (e = a[t]).setSize(i, n), e.draw();
                }
            },
            add: function (t) {
                if (!(1 < arguments.length))
                    return (
                        Kinetic.Container.prototype.add.call(this, t),
                        t._setCanvasSize(this.width(), this.height()),
                        t.draw(),
                        this.content.appendChild(t.canvas._canvas),
                        this
                    );
                for (var e = 0; e < arguments.length; e++)
                    this.add(arguments[e]);
            },
            getParent: function () {
                return null;
            },
            getLayer: function () {
                return null;
            },
            getLayers: function () {
                return this.getChildren();
            },
            _bindContentEvents: function () {
                for (var t = 0; t < f; t++)
                    !(function (e, i) {
                        e.content.addEventListener(
                            i,
                            function (t) {
                                e[u + i](t);
                            },
                            !1
                        );
                    })(this, e[t]);
            },
            _mouseover: function (t) {
                Kinetic.UA.mobile ||
                    (this._setPointerPosition(t),
                    this._fire("contentMouseover", { evt: t }));
            },
            _mouseout: function (t) {
                var e;
                Kinetic.UA.mobile ||
                    (this._setPointerPosition(t),
                    (e = this.targetShape) &&
                        !Kinetic.isDragging() &&
                        (e._fireAndBubble(n, { evt: t }),
                        e._fireAndBubble(a, { evt: t }),
                        (this.targetShape = null)),
                    (this.pointerPos = void 0),
                    this._fire("contentMouseout", { evt: t }));
            },
            _mousemove: function (t) {
                if (Kinetic.UA.ieMobile) return this._touchmove(t);
                var e, i;
                ((void 0 !== t.webkitMovementX ||
                    void 0 !== t.webkitMovementY) &&
                    0 === t.webkitMovementY &&
                    0 === t.webkitMovementX) ||
                    Kinetic.UA.mobile ||
                    (this._setPointerPosition(t),
                    (i = Kinetic.DD),
                    Kinetic.isDragging() ||
                        ((e = this.getIntersection(
                            this.getPointerPosition()
                        )) && e.isListening()
                            ? Kinetic.isDragging() ||
                              (this.targetShape &&
                                  this.targetShape._id === e._id)
                                ? e._fireAndBubble(s, { evt: t })
                                : (this.targetShape &&
                                      (this.targetShape._fireAndBubble(
                                          n,
                                          { evt: t },
                                          e
                                      ),
                                      this.targetShape._fireAndBubble(
                                          a,
                                          { evt: t },
                                          e
                                      )),
                                  e._fireAndBubble(
                                      r,
                                      { evt: t },
                                      this.targetShape
                                  ),
                                  e._fireAndBubble(
                                      "mouseenter",
                                      { evt: t },
                                      this.targetShape
                                  ),
                                  (this.targetShape = e))
                            : this.targetShape &&
                              !Kinetic.isDragging() &&
                              (this.targetShape._fireAndBubble(n, { evt: t }),
                              this.targetShape._fireAndBubble(a, { evt: t }),
                              (this.targetShape = null)),
                        this._fire("contentMousemove", { evt: t })),
                    i && i._drag(t),
                    t.preventDefault && t.preventDefault());
            },
            _mousedown: function (t) {
                if (Kinetic.UA.ieMobile) return this._touchstart(t);
                var e;
                Kinetic.UA.mobile ||
                    (this._setPointerPosition(t),
                    (e = this.getIntersection(this.getPointerPosition())),
                    (Kinetic.listenClickTap = !0),
                    e &&
                        e.isListening() &&
                        (this.clickStartShape = e)._fireAndBubble(i, {
                            evt: t,
                        }),
                    this._fire("contentMousedown", { evt: t })),
                    t.preventDefault && t.preventDefault();
            },
            _mouseup: function (t) {
                if (Kinetic.UA.ieMobile) return this._touchend(t);
                var e, i, n, a;
                Kinetic.UA.mobile ||
                    (this._setPointerPosition(t),
                    (e = this.getIntersection(this.getPointerPosition())),
                    (i = this.clickStartShape),
                    (n = !1),
                    (a = Kinetic.DD),
                    Kinetic.inDblClickWindow
                        ? (Kinetic.inDblClickWindow = !(n = !0))
                        : a && a.justDragged
                        ? a && (a.justDragged = !1)
                        : (Kinetic.inDblClickWindow = !0),
                    setTimeout(function () {
                        Kinetic.inDblClickWindow = !1;
                    }, Kinetic.dblClickWindow),
                    e &&
                        e.isListening() &&
                        (e._fireAndBubble(o, { evt: t }),
                        Kinetic.listenClickTap &&
                            i &&
                            i._id === e._id &&
                            (e._fireAndBubble("click", { evt: t }),
                            n && e._fireAndBubble("dblclick", { evt: t }))),
                    this._fire("contentMouseup", { evt: t }),
                    Kinetic.listenClickTap &&
                        (this._fire("contentClick", { evt: t }),
                        n && this._fire("contentDblclick", { evt: t })),
                    (Kinetic.listenClickTap = !1)),
                    t.preventDefault && t.preventDefault();
            },
            _touchstart: function (t) {
                this._setPointerPosition(t);
                var e = this.getIntersection(this.getPointerPosition());
                (Kinetic.listenClickTap = !0),
                    e &&
                        e.isListening() &&
                        ((this.tapStartShape = e)._fireAndBubble(c, { evt: t }),
                        e.isListening() &&
                            t.preventDefault &&
                            t.preventDefault()),
                    this._fire("contentTouchstart", { evt: t });
            },
            _touchend: function (t) {
                this._setPointerPosition(t);
                var e = this.getIntersection(this.getPointerPosition()),
                    i = !1;
                Kinetic.inDblClickWindow
                    ? (Kinetic.inDblClickWindow = !(i = !0))
                    : (Kinetic.inDblClickWindow = !0),
                    setTimeout(function () {
                        Kinetic.inDblClickWindow = !1;
                    }, Kinetic.dblClickWindow),
                    e &&
                        e.isListening() &&
                        (e._fireAndBubble(h, { evt: t }),
                        Kinetic.listenClickTap &&
                            e._id === this.tapStartShape._id &&
                            (e._fireAndBubble("tap", { evt: t }),
                            i && e._fireAndBubble("dbltap", { evt: t })),
                        e.isListening() &&
                            t.preventDefault &&
                            t.preventDefault()),
                    Kinetic.listenClickTap &&
                        (this._fire("contentTouchend", { evt: t }),
                        i && this._fire("contentDbltap", { evt: t })),
                    (Kinetic.listenClickTap = !1);
            },
            _touchmove: function (t) {
                this._setPointerPosition(t);
                var e,
                    i = Kinetic.DD;
                Kinetic.isDragging() ||
                    ((e = this.getIntersection(this.getPointerPosition())) &&
                        e.isListening() &&
                        (e._fireAndBubble(l, { evt: t }),
                        e.isListening() &&
                            t.preventDefault &&
                            t.preventDefault()),
                    this._fire("contentTouchmove", { evt: t })),
                    i &&
                        (i._drag(t),
                        Kinetic.isDragging() && t.preventDefault());
            },
            _DOMMouseScroll: function (t) {
                this._mousewheel(t);
            },
            _mousewheel: function (t) {
                this._setPointerPosition(t);
                var e = this.getIntersection(this.getPointerPosition());
                e && e.isListening() && e._fireAndBubble(d, { evt: t });
            },
            _wheel: function (t) {
                this._mousewheel(t);
            },
            _setPointerPosition: function (t) {
                var e,
                    i = this._getContentPosition(),
                    n = t.offsetX,
                    a = t.clientX,
                    r = null,
                    s = null;
                void 0 !== (t = t || window.event).touches
                    ? 0 < t.touches.length &&
                      ((r = (e = t.touches[0]).clientX - i.left),
                      (s = e.clientY - i.top))
                    : void 0 !== n
                    ? ((r = n), (s = t.offsetY))
                    : "mozilla" === Kinetic.UA.browser
                    ? ((r = t.layerX), (s = t.layerY))
                    : void 0 !== a &&
                      i &&
                      ((r = a - i.left), (s = t.clientY - i.top)),
                    null !== r &&
                        null !== s &&
                        (this.pointerPos = { x: r, y: s });
            },
            _getContentPosition: function () {
                var t = this.content.getBoundingClientRect
                    ? this.content.getBoundingClientRect()
                    : { top: 0, left: 0 };
                return { top: t.top, left: t.left };
            },
            _buildDOM: function () {
                var t = this.getContainer();
                if (!t) {
                    if (Kinetic.Util.isBrowser())
                        throw "Stage has no container. A container is required.";
                    t = Kinetic.document.createElement("div");
                }
                (t.innerHTML = ""),
                    (this.content = Kinetic.document.createElement("div")),
                    (this.content.style.position = "relative"),
                    (this.content.style.display = "inline-block"),
                    (this.content.className = "kineticjs-content"),
                    this.content.setAttribute("role", "presentation"),
                    t.appendChild(this.content),
                    (this.bufferCanvas = new Kinetic.SceneCanvas({
                        pixelRatio: 1,
                    })),
                    (this.bufferHitCanvas = new Kinetic.HitCanvas()),
                    this._resizeDOM();
            },
            _onContent: function (t, e) {
                for (var i, n = t.split(" "), a = n.length, r = 0; r < a; r++)
                    (i = n[r]), this.content.addEventListener(i, e, !1);
            },
            cache: function () {
                Kinetic.Util.warn(
                    "Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."
                );
            },
            clearCache: function () {},
        }),
            Kinetic.Util.extend(Kinetic.Stage, Kinetic.Container),
            Kinetic.Factory.addGetter(Kinetic.Stage, "container"),
            Kinetic.Factory.addOverloadedGetterSetter(
                Kinetic.Stage,
                "container"
            );
    })(),
    Kinetic.Util.addMethods(Kinetic.BaseLayer, {
        ___init: function (t) {
            (this.nodeType = "Layer"), Kinetic.Container.call(this, t);
        },
        createPNGStream: function () {
            return this.canvas._canvas.createPNGStream();
        },
        getCanvas: function () {
            return this.canvas;
        },
        getHitCanvas: function () {
            return this.hitCanvas;
        },
        getContext: function () {
            return this.getCanvas().getContext();
        },
        clear: function (t) {
            return (
                this.getContext().clear(t),
                this.getHitCanvas().getContext().clear(t),
                this
            );
        },
        clearHitCache: function () {
            this._hitImageData = void 0;
        },
        setZIndex: function (t) {
            Kinetic.Node.prototype.setZIndex.call(this, t);
            var e = this.getStage();
            return (
                e &&
                    (e.content.removeChild(this.getCanvas()._canvas),
                    t < e.getChildren().length - 1
                        ? e.content.insertBefore(
                              this.getCanvas()._canvas,
                              e.getChildren()[t + 1].getCanvas()._canvas
                          )
                        : e.content.appendChild(this.getCanvas()._canvas)),
                this
            );
        },
        moveToTop: function () {
            Kinetic.Node.prototype.moveToTop.call(this);
            var t = this.getStage();
            t &&
                (t.content.removeChild(this.getCanvas()._canvas),
                t.content.appendChild(this.getCanvas()._canvas));
        },
        moveUp: function () {
            var t;
            !Kinetic.Node.prototype.moveUp.call(this) ||
                ((t = this.getStage()) &&
                    (t.content.removeChild(this.getCanvas()._canvas),
                    this.index < t.getChildren().length - 1
                        ? t.content.insertBefore(
                              this.getCanvas()._canvas,
                              t.getChildren()[this.index + 1].getCanvas()
                                  ._canvas
                          )
                        : t.content.appendChild(this.getCanvas()._canvas)));
        },
        moveDown: function () {
            var t, e;
            !Kinetic.Node.prototype.moveDown.call(this) ||
                ((t = this.getStage()) &&
                    ((e = t.getChildren()),
                    t.content.removeChild(this.getCanvas()._canvas),
                    t.content.insertBefore(
                        this.getCanvas()._canvas,
                        e[this.index + 1].getCanvas()._canvas
                    )));
        },
        moveToBottom: function () {
            var t, e;
            !Kinetic.Node.prototype.moveToBottom.call(this) ||
                ((t = this.getStage()) &&
                    ((e = t.getChildren()),
                    t.content.removeChild(this.getCanvas()._canvas),
                    t.content.insertBefore(
                        this.getCanvas()._canvas,
                        e[1].getCanvas()._canvas
                    )));
        },
        getLayer: function () {
            return this;
        },
        remove: function () {
            var t = this.getCanvas()._canvas;
            return (
                Kinetic.Node.prototype.remove.call(this),
                t &&
                    t.parentNode &&
                    Kinetic.Util._isInDocument(t) &&
                    t.parentNode.removeChild(t),
                this
            );
        },
        getStage: function () {
            return this.parent;
        },
        setSize: function (t, e) {
            this.canvas.setSize(t, e);
        },
        getWidth: function () {
            return this.parent ? this.parent.getWidth() : void 0;
        },
        setWidth: function () {
            Kinetic.Util.warn(
                'Can not change width of layer. Use "stage.width(value)" function instead.'
            );
        },
        getHeight: function () {
            return this.parent ? this.parent.getHeight() : void 0;
        },
        setHeight: function () {
            Kinetic.Util.warn(
                'Can not change height of layer. Use "stage.height(value)" function instead.'
            );
        },
    }),
    Kinetic.Util.extend(Kinetic.BaseLayer, Kinetic.Container),
    Kinetic.Factory.addGetterSetter(Kinetic.BaseLayer, "clearBeforeDraw", !0),
    Kinetic.Collection.mapMethods(Kinetic.BaseLayer),
    (function () {
        var s = [
                { x: 0, y: 0 },
                { x: -1, y: 0 },
                { x: -1, y: -1 },
                { x: 0, y: -1 },
                { x: 1, y: -1 },
                { x: 1, y: 0 },
                { x: 1, y: 1 },
                { x: 0, y: 1 },
                { x: -1, y: 1 },
            ],
            o = s.length;
        Kinetic.Util.addMethods(Kinetic.Layer, {
            ____init: function (t) {
                (this.nodeType = "Layer"),
                    (this.canvas = new Kinetic.SceneCanvas()),
                    (this.hitCanvas = new Kinetic.HitCanvas()),
                    Kinetic.BaseLayer.call(this, t);
            },
            _setCanvasSize: function (t, e) {
                this.canvas.setSize(t, e), this.hitCanvas.setSize(t, e);
            },
            _validateAdd: function (t) {
                t = t.getType();
                "Group" !== t &&
                    "Shape" !== t &&
                    Kinetic.Util.error(
                        "You may only add groups and shapes to a layer."
                    );
            },
            getIntersection: function (t) {
                var e, i, n;
                if (!this.hitGraphEnabled() || !this.isVisible()) return null;
                for (var a = 1, r = !1; ; ) {
                    for (i = 0; i < o; i++) {
                        if (
                            (n = (e = this._getIntersection({
                                x: t.x + (n = s[i]).x * a,
                                y: t.y + n.y * a,
                            })).shape)
                        )
                            return n;
                        e.antialiased && (r = !0);
                    }
                    if (!r) return;
                    a += 1;
                }
            },
            _getImageData: function (t, e) {
                var i = this.hitCanvas.width || 1,
                    n = this.hitCanvas.height || 1,
                    t = Math.round(e) * i + Math.round(t);
                return (
                    this._hitImageData ||
                        (this._hitImageData =
                            this.hitCanvas.context.getImageData(0, 0, i, n)),
                    [
                        this._hitImageData.data[4 * t + 0],
                        this._hitImageData.data[4 * t + 1],
                        this._hitImageData.data[4 * t + 2],
                        this._hitImageData.data[4 * t + 3],
                    ]
                );
            },
            _getIntersection: function (t) {
                var e = this.hitCanvas.context.getImageData(
                        t.x,
                        t.y,
                        1,
                        1
                    ).data,
                    t = e[3];
                return 255 === t
                    ? ((e = Kinetic.Util._rgbToHex(e[0], e[1], e[2])),
                      { shape: Kinetic.shapes["#" + e] })
                    : 0 < t
                    ? { antialiased: !0 }
                    : {};
            },
            drawScene: function (t, e) {
                var i = this.getLayer(),
                    i = t || (i && i.getCanvas());
                return (
                    this._fire("beforeDraw", { node: this }),
                    this.getClearBeforeDraw() && i.getContext().clear(),
                    Kinetic.Container.prototype.drawScene.call(this, i, e),
                    this._fire("draw", { node: this }),
                    this
                );
            },
            _applyTransform: function (t, e, i) {
                i = t.getAbsoluteTransform(i).getMatrix();
                e.transform(i[0], i[1], i[2], i[3], i[4], i[5]);
            },
            drawHit: function (t, e) {
                var i = this.getLayer(),
                    t = t || (i && i.hitCanvas);
                return (
                    i &&
                        i.getClearBeforeDraw() &&
                        i.getHitCanvas().getContext().clear(),
                    Kinetic.Container.prototype.drawHit.call(this, t, e),
                    (this.imageData = null),
                    this
                );
            },
            clear: function (t) {
                return (
                    this.getContext().clear(t),
                    this.getHitCanvas().getContext().clear(t),
                    (this.imageData = null),
                    this
                );
            },
            setVisible: function (t) {
                return (
                    Kinetic.Node.prototype.setVisible.call(this, t),
                    t
                        ? ((this.getCanvas()._canvas.style.display = "block"),
                          (this.hitCanvas._canvas.style.display = "block"))
                        : ((this.getCanvas()._canvas.style.display = "none"),
                          (this.hitCanvas._canvas.style.display = "none")),
                    this
                );
            },
            enableHitGraph: function () {
                return this.setHitGraphEnabled(!0), this;
            },
            disableHitGraph: function () {
                return this.setHitGraphEnabled(!1), this;
            },
            setSize: function (t, e) {
                Kinetic.BaseLayer.prototype.setSize.call(this, t, e),
                    this.hitCanvas.setSize(t, e);
            },
        }),
            Kinetic.Util.extend(Kinetic.Layer, Kinetic.BaseLayer),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Layer,
                "hitGraphEnabled",
                !0
            ),
            Kinetic.Collection.mapMethods(Kinetic.Layer);
    })(),
    Kinetic.Util.addMethods(Kinetic.FastLayer, {
        ____init: function (t) {
            (this.nodeType = "Layer"),
                (this.canvas = new Kinetic.SceneCanvas()),
                Kinetic.BaseLayer.call(this, t);
        },
        _validateAdd: function (t) {
            "Shape" !== t.getType() &&
                Kinetic.Util.error("You may only add shapes to a fast layer.");
        },
        _setCanvasSize: function (t, e) {
            this.canvas.setSize(t, e);
        },
        hitGraphEnabled: function () {
            return !1;
        },
        getIntersection: function () {
            return null;
        },
        drawScene: function (t) {
            var e = this.getLayer(),
                e = t || (e && e.getCanvas());
            return (
                this.getClearBeforeDraw() && e.getContext().clear(),
                Kinetic.Container.prototype.drawScene.call(this, e),
                this
            );
        },
        _applyTransform: function (t, e, i) {
            (i && i._id === this._id) ||
                ((t = t.getTransform().getMatrix()),
                e.transform(t[0], t[1], t[2], t[3], t[4], t[5]));
        },
        draw: function () {
            return this.drawScene(), this;
        },
        clear: function (t) {
            return this.getContext().clear(t), this;
        },
        setVisible: function (t) {
            return (
                Kinetic.Node.prototype.setVisible.call(this, t),
                (this.getCanvas()._canvas.style.display = t ? "block" : "none"),
                this
            );
        },
    }),
    Kinetic.Util.extend(Kinetic.FastLayer, Kinetic.BaseLayer),
    Kinetic.Collection.mapMethods(Kinetic.FastLayer),
    Kinetic.Util.addMethods(Kinetic.Group, {
        ___init: function (t) {
            (this.nodeType = "Group"), Kinetic.Container.call(this, t);
        },
        _validateAdd: function (t) {
            t = t.getType();
            "Group" !== t &&
                "Shape" !== t &&
                Kinetic.Util.error(
                    "You may only add groups and shapes to groups."
                );
        },
    }),
    Kinetic.Util.extend(Kinetic.Group, Kinetic.Container),
    Kinetic.Collection.mapMethods(Kinetic.Group),
    (Kinetic.Rect = function (t) {
        this.___init(t);
    }),
    (Kinetic.Rect.prototype = {
        ___init: function (t) {
            Kinetic.Shape.call(this, t),
                (this.className = "Rect"),
                this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function (t) {
            var e = this.getCornerRadius(),
                i = this.getWidth(),
                n = this.getHeight();
            t.beginPath(),
                e
                    ? (t.moveTo(e, 0),
                      t.lineTo(i - e, 0),
                      t.arc(i - e, e, e, (3 * Math.PI) / 2, 0, !1),
                      t.lineTo(i, n - e),
                      t.arc(i - e, n - e, e, 0, Math.PI / 2, !1),
                      t.lineTo(e, n),
                      t.arc(e, n - e, e, Math.PI / 2, Math.PI, !1),
                      t.lineTo(0, e),
                      t.arc(e, e, e, Math.PI, (3 * Math.PI) / 2, !1))
                    : t.rect(0, 0, i, n),
                t.closePath(),
                t.fillStrokeShape(this);
        },
    }),
    Kinetic.Util.extend(Kinetic.Rect, Kinetic.Shape),
    Kinetic.Factory.addGetterSetter(Kinetic.Rect, "cornerRadius", 0),
    Kinetic.Collection.mapMethods(Kinetic.Rect),
    (function () {
        var e = 2 * Math.PI - 1e-4;
        (Kinetic.Circle = function (t) {
            this.___init(t);
        }),
            (Kinetic.Circle.prototype = {
                ___init: function (t) {
                    Kinetic.Shape.call(this, t),
                        (this.className = "Circle"),
                        this.sceneFunc(this._sceneFunc);
                },
                _sceneFunc: function (t) {
                    t.beginPath(),
                        t.arc(0, 0, this.getRadius(), 0, e, !1),
                        t.closePath(),
                        t.fillStrokeShape(this);
                },
                getWidth: function () {
                    return 2 * this.getRadius();
                },
                getHeight: function () {
                    return 2 * this.getRadius();
                },
                setWidth: function (t) {
                    Kinetic.Node.prototype.setWidth.call(this, t),
                        this.radius() !== t / 2 && this.setRadius(t / 2);
                },
                setHeight: function (t) {
                    Kinetic.Node.prototype.setHeight.call(this, t),
                        this.radius() !== t / 2 && this.setRadius(t / 2);
                },
                setRadius: function (t) {
                    this._setAttr("radius", t),
                        this.setWidth(2 * t),
                        this.setHeight(2 * t);
                },
            }),
            Kinetic.Util.extend(Kinetic.Circle, Kinetic.Shape),
            Kinetic.Factory.addGetter(Kinetic.Circle, "radius", 0),
            Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Circle, "radius"),
            Kinetic.Collection.mapMethods(Kinetic.Circle);
    })(),
    (function () {
        var n = 2 * Math.PI - 1e-4;
        (Kinetic.Ellipse = function (t) {
            this.___init(t);
        }),
            (Kinetic.Ellipse.prototype = {
                ___init: function (t) {
                    Kinetic.Shape.call(this, t),
                        (this.className = "Ellipse"),
                        this.sceneFunc(this._sceneFunc);
                },
                _sceneFunc: function (t) {
                    var e = this.getRadiusX(),
                        i = this.getRadiusY();
                    t.beginPath(),
                        t.save(),
                        e !== i && t.scale(1, i / e),
                        t.arc(0, 0, e, 0, n, !1),
                        t.restore(),
                        t.closePath(),
                        t.fillStrokeShape(this);
                },
                getWidth: function () {
                    return 2 * this.getRadiusX();
                },
                getHeight: function () {
                    return 2 * this.getRadiusY();
                },
                setWidth: function (t) {
                    Kinetic.Node.prototype.setWidth.call(this, t),
                        this.setRadius({ x: t / 2 });
                },
                setHeight: function (t) {
                    Kinetic.Node.prototype.setHeight.call(this, t),
                        this.setRadius({ y: t / 2 });
                },
            }),
            Kinetic.Util.extend(Kinetic.Ellipse, Kinetic.Shape),
            Kinetic.Factory.addComponentsGetterSetter(
                Kinetic.Ellipse,
                "radius",
                ["x", "y"]
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Ellipse, "radiusX", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Ellipse, "radiusY", 0),
            Kinetic.Collection.mapMethods(Kinetic.Ellipse);
    })(),
    (function () {
        var e = 2 * Math.PI - 1e-4;
        (Kinetic.Ring = function (t) {
            this.___init(t);
        }),
            (Kinetic.Ring.prototype = {
                ___init: function (t) {
                    Kinetic.Shape.call(this, t),
                        (this.className = "Ring"),
                        this.sceneFunc(this._sceneFunc);
                },
                _sceneFunc: function (t) {
                    t.beginPath(),
                        t.arc(0, 0, this.getInnerRadius(), 0, e, !1),
                        t.moveTo(this.getOuterRadius(), 0),
                        t.arc(0, 0, this.getOuterRadius(), e, 0, !0),
                        t.closePath(),
                        t.fillStrokeShape(this);
                },
                getWidth: function () {
                    return 2 * this.getOuterRadius();
                },
                getHeight: function () {
                    return 2 * this.getOuterRadius();
                },
                setWidth: function (t) {
                    Kinetic.Node.prototype.setWidth.call(this, t),
                        this.outerRadius() !== t / 2 &&
                            this.setOuterRadius(t / 2);
                },
                setHeight: function (t) {
                    Kinetic.Node.prototype.setHeight.call(this, t),
                        this.outerRadius() !== t / 2 &&
                            this.setOuterRadius(t / 2);
                },
                setOuterRadius: function (t) {
                    this._setAttr("outerRadius", t),
                        this.setWidth(2 * t),
                        this.setHeight(2 * t);
                },
            }),
            Kinetic.Util.extend(Kinetic.Ring, Kinetic.Shape),
            Kinetic.Factory.addGetterSetter(Kinetic.Ring, "innerRadius", 0),
            Kinetic.Factory.addGetter(Kinetic.Ring, "outerRadius", 0),
            Kinetic.Factory.addOverloadedGetterSetter(
                Kinetic.Ring,
                "outerRadius"
            ),
            Kinetic.Collection.mapMethods(Kinetic.Ring);
    })(),
    (Kinetic.Wedge = function (t) {
        this.___init(t);
    }),
    (Kinetic.Wedge.prototype = {
        ___init: function (t) {
            Kinetic.Shape.call(this, t),
                (this.className = "Wedge"),
                this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function (t) {
            t.beginPath(),
                t.arc(
                    0,
                    0,
                    this.getRadius(),
                    0,
                    Kinetic.getAngle(this.getAngle()),
                    this.getClockwise()
                ),
                t.lineTo(0, 0),
                t.closePath(),
                t.fillStrokeShape(this);
        },
    }),
    Kinetic.Util.extend(Kinetic.Wedge, Kinetic.Shape),
    Kinetic.Factory.addGetterSetter(Kinetic.Wedge, "radius", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Wedge, "angle", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Wedge, "clockwise", !1),
    Kinetic.Factory.backCompat(Kinetic.Wedge, {
        angleDeg: "angle",
        getAngleDeg: "getAngle",
        setAngleDeg: "setAngle",
    }),
    Kinetic.Collection.mapMethods(Kinetic.Wedge),
    (Kinetic.Arc = function (t) {
        this.___init(t);
    }),
    (Kinetic.Arc.prototype = {
        ___init: function (t) {
            Kinetic.Shape.call(this, t),
                (this.className = "Arc"),
                this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function (t) {
            var e = Kinetic.getAngle(this.angle()),
                i = this.clockwise();
            t.beginPath(),
                t.arc(0, 0, this.getOuterRadius(), 0, e, i),
                t.arc(0, 0, this.getInnerRadius(), e, 0, !i),
                t.closePath(),
                t.fillStrokeShape(this);
        },
    }),
    Kinetic.Util.extend(Kinetic.Arc, Kinetic.Shape),
    Kinetic.Factory.addGetterSetter(Kinetic.Arc, "innerRadius", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Arc, "outerRadius", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Arc, "angle", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Arc, "clockwise", !1),
    Kinetic.Collection.mapMethods(Kinetic.Arc),
    (Kinetic.Image = function (t) {
        this.___init(t);
    }),
    (Kinetic.Image.prototype = {
        ___init: function (t) {
            Kinetic.Shape.call(this, t),
                (this.className = "Image"),
                this.sceneFunc(this._sceneFunc),
                this.hitFunc(this._hitFunc);
        },
        _useBufferCanvas: function () {
            return (
                (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) &&
                this.hasStroke() &&
                this.getStage()
            );
        },
        _sceneFunc: function (t) {
            var e,
                i,
                n = this.getWidth(),
                a = this.getHeight(),
                r = this.getImage();
            r &&
                ((e = this.getCropWidth()),
                (i = this.getCropHeight()),
                (i =
                    e && i
                        ? [
                              r,
                              this.getCropX(),
                              this.getCropY(),
                              e,
                              i,
                              0,
                              0,
                              n,
                              a,
                          ]
                        : [r, 0, 0, n, a])),
                (this.hasFill() || this.hasStroke() || this.hasShadow()) &&
                    (t.beginPath(),
                    t.rect(0, 0, n, a),
                    t.closePath(),
                    t.fillStrokeShape(this)),
                r && t.drawImage.apply(t, i);
        },
        _hitFunc: function (t) {
            var e = this.getWidth(),
                i = this.getHeight();
            t.beginPath(),
                t.rect(0, 0, e, i),
                t.closePath(),
                t.fillStrokeShape(this);
        },
        getWidth: function () {
            var t = this.getImage();
            return this.attrs.width || (t ? t.width : 0);
        },
        getHeight: function () {
            var t = this.getImage();
            return this.attrs.height || (t ? t.height : 0);
        },
    }),
    Kinetic.Util.extend(Kinetic.Image, Kinetic.Shape),
    Kinetic.Factory.addGetterSetter(Kinetic.Image, "image"),
    Kinetic.Factory.addComponentsGetterSetter(Kinetic.Image, "crop", [
        "x",
        "y",
        "width",
        "height",
    ]),
    Kinetic.Factory.addGetterSetter(Kinetic.Image, "cropX", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Image, "cropY", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Image, "cropWidth", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Image, "cropHeight", 0),
    Kinetic.Collection.mapMethods(Kinetic.Image),
    (function () {
        function i(t) {
            t.fillText(this.partialText, 0, 0);
        }
        function n(t) {
            t.strokeText(this.partialText, 0, 0);
        }
        var b = "auto",
            a = [
                "fontFamily",
                "fontSize",
                "fontStyle",
                "fontVariant",
                "padding",
                "align",
                "lineHeight",
                "text",
                "width",
                "height",
                "wrap",
            ],
            r = a.length,
            P = Kinetic.Util.createCanvasElement().getContext("2d");
        (Kinetic.Text = function (t) {
            this.___init(t);
        }),
            (Kinetic.Text.prototype = {
                ___init: function (t) {
                    void 0 === t.width && (t.width = b),
                        void 0 === t.height && (t.height = b),
                        Kinetic.Shape.call(this, t),
                        (this._fillFunc = i),
                        (this._strokeFunc = n),
                        (this.className = "Text");
                    for (var e = 0; e < r; e++)
                        this.on(a[e] + "Change.kinetic", this._setTextData);
                    this._setTextData(),
                        this.sceneFunc(this._sceneFunc),
                        this.hitFunc(this._hitFunc);
                },
                _sceneFunc: function (t) {
                    var e,
                        i = this.getPadding(),
                        n = this.getTextHeight(),
                        a = this.getLineHeight() * n,
                        r = this.textArr,
                        s = r.length,
                        o = this.getWidth();
                    for (
                        t.setAttr("font", this._getContextFont()),
                            t.setAttr("textBaseline", "middle"),
                            t.setAttr("textAlign", "left"),
                            t.save(),
                            t.translate(i, 0),
                            t.translate(0, i + n / 2),
                            e = 0;
                        e < s;
                        e++
                    ) {
                        var c = r[e],
                            h = c.text,
                            c = c.width;
                        t.save(),
                            "right" === this.getAlign()
                                ? t.translate(o - c - 2 * i, 0)
                                : "center" === this.getAlign() &&
                                  t.translate((o - c - 2 * i) / 2, 0),
                            (this.partialText = h),
                            t.fillStrokeShape(this),
                            t.restore(),
                            t.translate(0, a);
                    }
                    t.restore();
                },
                _hitFunc: function (t) {
                    var e = this.getWidth(),
                        i = this.getHeight();
                    t.beginPath(),
                        t.rect(0, 0, e, i),
                        t.closePath(),
                        t.fillStrokeShape(this);
                },
                setText: function (t) {
                    t = Kinetic.Util._isString(t) ? t : t.toString();
                    return this._setAttr("text", t), this;
                },
                getWidth: function () {
                    return this.attrs.width === b
                        ? this.getTextWidth() + 2 * this.getPadding()
                        : this.attrs.width;
                },
                getHeight: function () {
                    return this.attrs.height === b
                        ? this.getTextHeight() *
                              this.textArr.length *
                              this.getLineHeight() +
                              2 * this.getPadding()
                        : this.attrs.height;
                },
                getTextWidth: function () {
                    return this.textWidth;
                },
                getTextHeight: function () {
                    return this.textHeight;
                },
                _getTextSize: function (t) {
                    var e = P,
                        i = this.getFontSize();
                    return (
                        e.save(),
                        (e.font = this._getContextFont()),
                        (t = e.measureText(t)),
                        e.restore(),
                        { width: t.width, height: parseInt(i, 10) }
                    );
                },
                _getContextFont: function () {
                    return (
                        this.getFontStyle() +
                        " " +
                        this.getFontVariant() +
                        " " +
                        this.getFontSize() +
                        "px " +
                        this.getFontFamily()
                    );
                },
                _addTextLine: function (t, e) {
                    return this.textArr.push({ text: t, width: e });
                },
                _getTextWidth: function (t) {
                    return P.measureText(t).width;
                },
                _setTextData: function () {
                    var t = this.getText().split("\n"),
                        e = +this.getFontSize(),
                        i = 0,
                        n = this.getLineHeight() * e,
                        a = this.attrs.width,
                        r = this.attrs.height,
                        s = a !== b,
                        o = r !== b,
                        c = this.getPadding(),
                        h = a - 2 * c,
                        l = r - 2 * c,
                        d = 0,
                        c = this.getWrap(),
                        u = "none" !== c,
                        f = "char" !== c && u;
                    (this.textArr = []),
                        P.save(),
                        (P.font = this._getContextFont());
                    for (var g = 0, p = t.length; g < p; ++g) {
                        var K = t[g],
                            v = this._getTextWidth(K);
                        if (s && h < v)
                            for (; 0 < K.length; ) {
                                for (
                                    var _, m = 0, y = K.length, S = "", C = 0;
                                    m < y;

                                ) {
                                    var x = (m + y) >>> 1,
                                        w = K.slice(0, 1 + x),
                                        F = this._getTextWidth(w);
                                    F <= h
                                        ? ((m = 1 + x), (S = w), (C = F))
                                        : (y = x);
                                }
                                if (!S) break;
                                if (
                                    (!f ||
                                        (0 <
                                            (_ =
                                                Math.max(
                                                    S.lastIndexOf(" "),
                                                    S.lastIndexOf("-")
                                                ) + 1) &&
                                            ((S = S.slice(0, (m = _))),
                                            (C = this._getTextWidth(S)))),
                                    this._addTextLine(S, C),
                                    (i = Math.max(i, C)),
                                    (d += n),
                                    !u || (o && l < d + n))
                                )
                                    break;
                                if (
                                    0 < (K = K.slice(m)).length &&
                                    (v = this._getTextWidth(K)) <= h
                                ) {
                                    this._addTextLine(K, v),
                                        (d += n),
                                        (i = Math.max(i, v));
                                    break;
                                }
                            }
                        else
                            this._addTextLine(K, v),
                                (d += n),
                                (i = Math.max(i, v));
                        if (o && l < d + n) break;
                    }
                    P.restore(), (this.textHeight = e), (this.textWidth = i);
                },
            }),
            Kinetic.Util.extend(Kinetic.Text, Kinetic.Shape),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Text,
                "fontFamily",
                "Arial"
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Text, "fontSize", 12),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Text,
                "fontStyle",
                "normal"
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Text,
                "fontVariant",
                "normal"
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Text, "padding", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Text, "align", "left"),
            Kinetic.Factory.addGetterSetter(Kinetic.Text, "lineHeight", 1),
            Kinetic.Factory.addGetterSetter(Kinetic.Text, "wrap", "word"),
            Kinetic.Factory.addGetter(Kinetic.Text, "text", ""),
            Kinetic.Factory.addOverloadedGetterSetter(Kinetic.Text, "text"),
            Kinetic.Collection.mapMethods(Kinetic.Text);
    })(),
    (Kinetic.Line = function (t) {
        this.___init(t);
    }),
    (Kinetic.Line.prototype = {
        ___init: function (t) {
            Kinetic.Shape.call(this, t),
                (this.className = "Line"),
                this.on(
                    "pointsChange.kinetic tensionChange.kinetic closedChange.kinetic",
                    function () {
                        this._clearCache("tensionPoints");
                    }
                ),
                this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function (t) {
            var e,
                i,
                n,
                a = this.getPoints(),
                r = a.length,
                s = this.getTension(),
                o = this.getClosed();
            if ((t.beginPath(), t.moveTo(a[0], a[1]), 0 !== s && 4 < r)) {
                for (
                    i = (e = this.getTensionPoints()).length,
                        n = o ? 0 : 4,
                        o || t.quadraticCurveTo(e[0], e[1], e[2], e[3]);
                    n < i - 2;

                )
                    t.bezierCurveTo(
                        e[n++],
                        e[n++],
                        e[n++],
                        e[n++],
                        e[n++],
                        e[n++]
                    );
                o || t.quadraticCurveTo(e[i - 2], e[i - 1], a[r - 2], a[r - 1]);
            } else for (n = 2; n < r; n += 2) t.lineTo(a[n], a[n + 1]);
            o ? (t.closePath(), t.fillStrokeShape(this)) : t.strokeShape(this);
        },
        getTensionPoints: function () {
            return this._getCache("tensionPoints", this._getTensionPoints);
        },
        _getTensionPoints: function () {
            return this.getClosed()
                ? this._getTensionPointsClosed()
                : Kinetic.Util._expandPoints(
                      this.getPoints(),
                      this.getTension()
                  );
        },
        _getTensionPointsClosed: function () {
            var t = this.getPoints(),
                e = t.length,
                i = this.getTension(),
                n = Kinetic.Util,
                a = n._getControlPoints(
                    t[e - 2],
                    t[e - 1],
                    t[0],
                    t[1],
                    t[2],
                    t[3],
                    i
                ),
                n = n._getControlPoints(
                    t[e - 4],
                    t[e - 3],
                    t[e - 2],
                    t[e - 1],
                    t[0],
                    t[1],
                    i
                ),
                i = Kinetic.Util._expandPoints(t, i);
            return [a[2], a[3]]
                .concat(i)
                .concat([
                    n[0],
                    n[1],
                    t[e - 2],
                    t[e - 1],
                    n[2],
                    n[3],
                    a[0],
                    a[1],
                    t[0],
                    t[1],
                ]);
        },
    }),
    Kinetic.Util.extend(Kinetic.Line, Kinetic.Shape),
    Kinetic.Factory.addGetterSetter(Kinetic.Line, "closed", !1),
    Kinetic.Factory.addGetterSetter(Kinetic.Line, "tension", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Line, "points"),
    Kinetic.Collection.mapMethods(Kinetic.Line),
    (Kinetic.Sprite = function (t) {
        this.___init(t);
    }),
    (Kinetic.Sprite.prototype = {
        ___init: function (t) {
            Kinetic.Shape.call(this, t),
                (this.className = "Sprite"),
                (this._updated = !0);
            var e = this;
            (this.anim = new Kinetic.Animation(function () {
                var t = e._updated;
                return (e._updated = !1), t;
            })),
                this.on("animationChange.kinetic", function () {
                    this.frameIndex(0);
                }),
                this.on("frameIndexChange.kinetic", function () {
                    this._updated = !0;
                }),
                this.on("frameRateChange.kinetic", function () {
                    this.anim.isRunning() &&
                        (clearInterval(this.interval), this._setInterval());
                }),
                this.sceneFunc(this._sceneFunc),
                this.hitFunc(this._hitFunc);
        },
        _sceneFunc: function (t) {
            var e = this.getAnimation(),
                i = 4 * this.frameIndex(),
                n = this.getAnimations()[e],
                a = n[0 + i],
                r = n[1 + i],
                e = n[2 + i],
                n = n[3 + i],
                i = this.getImage();
            i && t.drawImage(i, a, r, e, n, 0, 0, e, n);
        },
        _hitFunc: function (t) {
            var e = this.getAnimation(),
                i = 4 * this.frameIndex(),
                n = this.getAnimations()[e],
                e = n[2 + i],
                i = n[3 + i];
            t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillShape(this);
        },
        _useBufferCanvas: function () {
            return (
                (this.hasShadow() || 1 !== this.getAbsoluteOpacity()) &&
                this.hasStroke()
            );
        },
        _setInterval: function () {
            var t = this;
            this.interval = setInterval(function () {
                t._updateIndex();
            }, 1e3 / this.getFrameRate());
        },
        start: function () {
            var t = this.getLayer();
            this.anim.setLayers(t), this._setInterval(), this.anim.start();
        },
        stop: function () {
            this.anim.stop(), clearInterval(this.interval);
        },
        isRunning: function () {
            return this.anim.isRunning();
        },
        _updateIndex: function () {
            var t = this.frameIndex(),
                e = this.getAnimation(),
                e = this.getAnimations()[e].length / 4;
            this.frameIndex(t < e - 1 ? t + 1 : 0);
        },
    }),
    Kinetic.Util.extend(Kinetic.Sprite, Kinetic.Shape),
    Kinetic.Factory.addGetterSetter(Kinetic.Sprite, "animation"),
    Kinetic.Factory.addGetterSetter(Kinetic.Sprite, "animations"),
    Kinetic.Factory.addGetterSetter(Kinetic.Sprite, "image"),
    Kinetic.Factory.addGetterSetter(Kinetic.Sprite, "frameIndex", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Sprite, "frameRate", 17),
    Kinetic.Factory.backCompat(Kinetic.Sprite, {
        index: "frameIndex",
        getIndex: "getFrameIndex",
        setIndex: "setFrameIndex",
    }),
    Kinetic.Collection.mapMethods(Kinetic.Sprite),
    (Kinetic.Path = function (t) {
        this.___init(t);
    }),
    (Kinetic.Path.prototype = {
        ___init: function (t) {
            this.dataArray = [];
            var e = this;
            Kinetic.Shape.call(this, t),
                (this.className = "Path"),
                (this.dataArray = Kinetic.Path.parsePathData(this.getData())),
                this.on("dataChange.kinetic", function () {
                    e.dataArray = Kinetic.Path.parsePathData(this.getData());
                }),
                this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function (t) {
            var e = this.dataArray,
                i = !1;
            t.beginPath();
            for (var n = 0; n < e.length; n++) {
                var a = e[n].command,
                    r = e[n].points;
                switch (a) {
                    case "L":
                        t.lineTo(r[0], r[1]);
                        break;
                    case "M":
                        t.moveTo(r[0], r[1]);
                        break;
                    case "C":
                        t.bezierCurveTo(r[0], r[1], r[2], r[3], r[4], r[5]);
                        break;
                    case "Q":
                        t.quadraticCurveTo(r[0], r[1], r[2], r[3]);
                        break;
                    case "A":
                        var s = r[0],
                            o = r[1],
                            c = r[2],
                            h = r[3],
                            l = r[4],
                            d = r[5],
                            u = r[6],
                            f = r[7],
                            g = h < c ? c : h,
                            p = h < c ? 1 : c / h,
                            c = h < c ? h / c : 1;
                        t.translate(s, o),
                            t.rotate(u),
                            t.scale(p, c),
                            t.arc(0, 0, g, l, l + d, 1 - f),
                            t.scale(1 / p, 1 / c),
                            t.rotate(-u),
                            t.translate(-s, -o);
                        break;
                    case "z":
                        t.closePath(), (i = !0);
                }
            }
            i ? t.fillStrokeShape(this) : t.strokeShape(this);
        },
    }),
    Kinetic.Util.extend(Kinetic.Path, Kinetic.Shape),
    (Kinetic.Path.getLineLength = function (t, e, i, n) {
        return Math.sqrt((i - t) * (i - t) + (n - e) * (n - e));
    }),
    (Kinetic.Path.getPointOnLine = function (t, e, i, n, a, r, s) {
        void 0 === r && (r = e), void 0 === s && (s = i);
        var o = (a - i) / (n - e + 1e-8),
            c = Math.sqrt((t * t) / (1 + o * o));
        n < e && (c *= -1);
        var h,
            l = o * c;
        if (n === e) h = { x: r, y: s + l };
        else if ((s - i) / (r - e + 1e-8) == o) h = { x: r + c, y: s + l };
        else {
            var d = this.getLineLength(e, i, n, a);
            if (d < 1e-8) return;
            var u = (r - e) * (n - e) + (s - i) * (a - i),
                i = this.getLineLength(
                    r,
                    s,
                    (d = e + (u /= d * d) * (n - e)),
                    (a = i + u * (a - i))
                ),
                i = Math.sqrt(t * t - i * i),
                c = Math.sqrt((i * i) / (1 + o * o));
            n < e && (c *= -1), (h = { x: d + c, y: a + (l = o * c) });
        }
        return h;
    }),
    (Kinetic.Path.getPointOnCubicBezier = function (t, e, i, n, a, r, s, o, c) {
        function h(t) {
            return t * t * t;
        }
        function l(t) {
            return 3 * t * t * (1 - t);
        }
        function d(t) {
            return 3 * t * (1 - t) * (1 - t);
        }
        function u(t) {
            return (1 - t) * (1 - t) * (1 - t);
        }
        return {
            x: o * h(t) + r * l(t) + n * d(t) + e * u(t),
            y: c * h(t) + s * l(t) + a * d(t) + i * u(t),
        };
    }),
    (Kinetic.Path.getPointOnQuadraticBezier = function (t, e, i, n, a, r, s) {
        function o(t) {
            return t * t;
        }
        function c(t) {
            return 2 * t * (1 - t);
        }
        function h(t) {
            return (1 - t) * (1 - t);
        }
        return {
            x: r * o(t) + n * c(t) + e * h(t),
            y: s * o(t) + a * c(t) + i * h(t),
        };
    }),
    (Kinetic.Path.getPointOnEllipticalArc = function (t, e, i, n, a, r) {
        var s = Math.cos(r),
            r = Math.sin(r),
            i = i * Math.cos(a),
            a = n * Math.sin(a);
        return { x: t + (i * s - a * r), y: e + (i * r + a * s) };
    }),
    (Kinetic.Path.parsePathData = function (t) {
        if (!t) return [];
        for (
            var e = [
                    "m",
                    "M",
                    "l",
                    "L",
                    "v",
                    "V",
                    "h",
                    "H",
                    "z",
                    "Z",
                    "c",
                    "C",
                    "q",
                    "Q",
                    "t",
                    "T",
                    "s",
                    "S",
                    "a",
                    "A",
                ],
                i = (i = t).replace(new RegExp(" ", "g"), ","),
                n = 0;
            n < e.length;
            n++
        )
            i = i.replace(new RegExp(e[n], "g"), "|" + e[n]);
        for (
            var a = i.split("|"), r = [], s = 0, o = 0, n = 1;
            n < a.length;
            n++
        ) {
            var c = a[n],
                h = c.charAt(0),
                l = (c = (c = (c = (c = c.slice(1)).replace(
                    new RegExp(",-", "g"),
                    "-"
                )).replace(new RegExp("-", "g"), ",-")).replace(
                    new RegExp("e,-", "g"),
                    "e-"
                )).split(",");
            0 < l.length && "" === l[0] && l.shift();
            for (var d = 0; d < l.length; d++) l[d] = parseFloat(l[d]);
            for (; 0 < l.length && !isNaN(l[0]); ) {
                var u,
                    f,
                    g,
                    p,
                    K,
                    v,
                    _,
                    m,
                    y,
                    S,
                    C = null,
                    x = [],
                    w = s,
                    F = o;
                switch (h) {
                    case "l":
                        (s += l.shift()),
                            (o += l.shift()),
                            (C = "L"),
                            x.push(s, o);
                        break;
                    case "L":
                        (s = l.shift()), (o = l.shift()), x.push(s, o);
                        break;
                    case "m":
                        var b = l.shift(),
                            P = l.shift();
                        if (
                            ((s += b),
                            (o += P),
                            (C = "M"),
                            2 < r.length && "z" === r[r.length - 1].command)
                        )
                            for (var T = r.length - 2; 0 <= T; T--)
                                if ("M" === r[T].command) {
                                    (s = r[T].points[0] + b),
                                        (o = r[T].points[1] + P);
                                    break;
                                }
                        x.push(s, o), (h = "l");
                        break;
                    case "M":
                        (s = l.shift()),
                            (o = l.shift()),
                            (C = "M"),
                            x.push(s, o),
                            (h = "L");
                        break;
                    case "h":
                        (s += l.shift()), (C = "L"), x.push(s, o);
                        break;
                    case "H":
                        (s = l.shift()), (C = "L"), x.push(s, o);
                        break;
                    case "v":
                        (o += l.shift()), (C = "L"), x.push(s, o);
                        break;
                    case "V":
                        (o = l.shift()), (C = "L"), x.push(s, o);
                        break;
                    case "C":
                        x.push(l.shift(), l.shift(), l.shift(), l.shift()),
                            (s = l.shift()),
                            (o = l.shift()),
                            x.push(s, o);
                        break;
                    case "c":
                        x.push(
                            s + l.shift(),
                            o + l.shift(),
                            s + l.shift(),
                            o + l.shift()
                        ),
                            (s += l.shift()),
                            (o += l.shift()),
                            (C = "C"),
                            x.push(s, o);
                        break;
                    case "S":
                        (f = s),
                            (g = o),
                            "C" === (u = r[r.length - 1]).command &&
                                ((f = s + (s - u.points[2])),
                                (g = o + (o - u.points[3]))),
                            x.push(f, g, l.shift(), l.shift()),
                            (s = l.shift()),
                            (o = l.shift()),
                            (C = "C"),
                            x.push(s, o);
                        break;
                    case "s":
                        (f = s),
                            (g = o),
                            "C" === (u = r[r.length - 1]).command &&
                                ((f = s + (s - u.points[2])),
                                (g = o + (o - u.points[3]))),
                            x.push(f, g, s + l.shift(), o + l.shift()),
                            (s += l.shift()),
                            (o += l.shift()),
                            (C = "C"),
                            x.push(s, o);
                        break;
                    case "Q":
                        x.push(l.shift(), l.shift()),
                            (s = l.shift()),
                            (o = l.shift()),
                            x.push(s, o);
                        break;
                    case "q":
                        x.push(s + l.shift(), o + l.shift()),
                            (s += l.shift()),
                            (o += l.shift()),
                            (C = "Q"),
                            x.push(s, o);
                        break;
                    case "T":
                        (f = s),
                            (g = o),
                            "Q" === (u = r[r.length - 1]).command &&
                                ((f = s + (s - u.points[0])),
                                (g = o + (o - u.points[1]))),
                            (s = l.shift()),
                            (o = l.shift()),
                            (C = "Q"),
                            x.push(f, g, s, o);
                        break;
                    case "t":
                        (f = s),
                            (g = o),
                            "Q" === (u = r[r.length - 1]).command &&
                                ((f = s + (s - u.points[0])),
                                (g = o + (o - u.points[1]))),
                            (s += l.shift()),
                            (o += l.shift()),
                            (C = "Q"),
                            x.push(f, g, s, o);
                        break;
                    case "A":
                        (p = l.shift()),
                            (K = l.shift()),
                            (v = l.shift()),
                            (_ = l.shift()),
                            (m = l.shift()),
                            (y = s),
                            (S = o),
                            (s = l.shift()),
                            (o = l.shift()),
                            (C = "A"),
                            (x = this.convertEndpointToCenterParameterization(
                                y,
                                S,
                                s,
                                o,
                                _,
                                m,
                                p,
                                K,
                                v
                            ));
                        break;
                    case "a":
                        (p = l.shift()),
                            (K = l.shift()),
                            (v = l.shift()),
                            (_ = l.shift()),
                            (m = l.shift()),
                            (y = s),
                            (S = o),
                            (s += l.shift()),
                            (o += l.shift()),
                            (C = "A"),
                            (x = this.convertEndpointToCenterParameterization(
                                y,
                                S,
                                s,
                                o,
                                _,
                                m,
                                p,
                                K,
                                v
                            ));
                }
                r.push({
                    command: C || h,
                    points: x,
                    start: { x: w, y: F },
                    pathLength: this.calcLength(w, F, C || h, x),
                });
            }
            ("z" !== h && "Z" !== h) ||
                r.push({
                    command: "z",
                    points: [],
                    start: void 0,
                    pathLength: 0,
                });
        }
        return r;
    }),
    (Kinetic.Path.calcLength = function (t, e, i, n) {
        var a,
            r,
            s,
            o = Kinetic.Path;
        switch (i) {
            case "L":
                return o.getLineLength(t, e, n[0], n[1]);
            case "C":
                for (
                    a = o.getPointOnCubicBezier(
                        (c = 0),
                        t,
                        e,
                        n[0],
                        n[1],
                        n[2],
                        n[3],
                        n[4],
                        n[5]
                    ),
                        s = 0.01;
                    s <= 1;
                    s += 0.01
                )
                    (r = o.getPointOnCubicBezier(
                        s,
                        t,
                        e,
                        n[0],
                        n[1],
                        n[2],
                        n[3],
                        n[4],
                        n[5]
                    )),
                        (c += o.getLineLength(a.x, a.y, r.x, r.y)),
                        (a = r);
                return c;
            case "Q":
                for (
                    a = o.getPointOnQuadraticBezier(
                        (c = 0),
                        t,
                        e,
                        n[0],
                        n[1],
                        n[2],
                        n[3]
                    ),
                        s = 0.01;
                    s <= 1;
                    s += 0.01
                )
                    (r = o.getPointOnQuadraticBezier(
                        s,
                        t,
                        e,
                        n[0],
                        n[1],
                        n[2],
                        n[3]
                    )),
                        (c += o.getLineLength(a.x, a.y, r.x, r.y)),
                        (a = r);
                return c;
            case "A":
                var c = 0,
                    h = n[4],
                    l = n[5],
                    d = n[4] + l,
                    u = Math.PI / 180;
                if (
                    (Math.abs(h - d) < u && (u = Math.abs(h - d)),
                    (a = o.getPointOnEllipticalArc(
                        n[0],
                        n[1],
                        n[2],
                        n[3],
                        h,
                        0
                    )),
                    l < 0)
                )
                    for (s = h - u; d < s; s -= u)
                        (r = o.getPointOnEllipticalArc(
                            n[0],
                            n[1],
                            n[2],
                            n[3],
                            s,
                            0
                        )),
                            (c += o.getLineLength(a.x, a.y, r.x, r.y)),
                            (a = r);
                else
                    for (s = h + u; s < d; s += u)
                        (r = o.getPointOnEllipticalArc(
                            n[0],
                            n[1],
                            n[2],
                            n[3],
                            s,
                            0
                        )),
                            (c += o.getLineLength(a.x, a.y, r.x, r.y)),
                            (a = r);
                return (
                    (r = o.getPointOnEllipticalArc(
                        n[0],
                        n[1],
                        n[2],
                        n[3],
                        d,
                        0
                    )),
                    c + o.getLineLength(a.x, a.y, r.x, r.y)
                );
        }
        return 0;
    }),
    (Kinetic.Path.convertEndpointToCenterParameterization = function (
        t,
        e,
        i,
        n,
        a,
        r,
        s,
        o,
        c
    ) {
        var h = c * (Math.PI / 180),
            l = (Math.cos(h) * (t - i)) / 2 + (Math.sin(h) * (e - n)) / 2,
            d = (-1 * Math.sin(h) * (t - i)) / 2 + (Math.cos(h) * (e - n)) / 2,
            u = (l * l) / (s * s) + (d * d) / (o * o);
        1 < u && ((s *= Math.sqrt(u)), (o *= Math.sqrt(u)));
        c = Math.sqrt(
            (s * s * o * o - s * s * d * d - o * o * l * l) /
                (s * s * d * d + o * o * l * l)
        );
        a === r && (c *= -1);
        function f(t) {
            return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
        }
        function g(t, e) {
            return (t[0] * e[0] + t[1] * e[1]) / (f(t) * f(e));
        }
        (u = ((c = isNaN(c) ? 0 : c) * s * d) / o),
            (a = (c * -o * l) / s),
            (c = (t + i) / 2 + Math.cos(h) * u - Math.sin(h) * a),
            (t = (e + n) / 2 + Math.sin(h) * u + Math.cos(h) * a),
            (i = function (t, e) {
                return (
                    (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(g(t, e))
                );
            }),
            (e = i([1, 0], [(l - u) / s, (d - a) / o])),
            (n = [(l - u) / s, (d - a) / o]),
            (a = [(-1 * l - u) / s, (-1 * d - a) / o]),
            (i = i(n, a));
        return (
            g(n, a) <= -1 && (i = Math.PI),
            1 <= g(n, a) && (i = 0),
            0 === r && 0 < i && (i -= 2 * Math.PI),
            1 === r && i < 0 && (i += 2 * Math.PI),
            [c, t, s, o, e, i, h, r]
        );
    }),
    Kinetic.Factory.addGetterSetter(Kinetic.Path, "data"),
    Kinetic.Collection.mapMethods(Kinetic.Path),
    (function () {
        function i(t) {
            t.fillText(this.partialText, 0, 0);
        }
        function n(t) {
            t.strokeText(this.partialText, 0, 0);
        }
        (Kinetic.TextPath = function (t) {
            this.___init(t);
        }),
            (Kinetic.TextPath.prototype = {
                ___init: function (t) {
                    var e = this;
                    (this.dummyCanvas = Kinetic.Util.createCanvasElement()),
                        (this.dataArray = []),
                        Kinetic.Shape.call(this, t),
                        (this._fillFunc = i),
                        (this._strokeFunc = n),
                        (this._fillFuncHit = i),
                        (this._strokeFuncHit = n),
                        (this.className = "TextPath"),
                        (this.dataArray = Kinetic.Path.parsePathData(
                            this.attrs.data
                        )),
                        this.on("dataChange.kinetic", function () {
                            e.dataArray = Kinetic.Path.parsePathData(
                                this.attrs.data
                            );
                        }),
                        this.on(
                            "textChange.kinetic textStroke.kinetic textStrokeWidth.kinetic",
                            e._setTextData
                        ),
                        e._setTextData(),
                        this.sceneFunc(this._sceneFunc);
                },
                _sceneFunc: function (t) {
                    t.setAttr("font", this._getContextFont()),
                        t.setAttr("textBaseline", "middle"),
                        t.setAttr("textAlign", "left"),
                        t.save();
                    for (var e = this.glyphInfo, i = 0; i < e.length; i++) {
                        t.save();
                        var n = e[i].p0;
                        t.translate(n.x, n.y),
                            t.rotate(e[i].rotation),
                            (this.partialText = e[i].text),
                            t.fillStrokeShape(this),
                            t.restore();
                    }
                    t.restore();
                },
                getTextWidth: function () {
                    return this.textWidth;
                },
                getTextHeight: function () {
                    return this.textHeight;
                },
                setText: function (t) {
                    Kinetic.Text.prototype.setText.call(this, t);
                },
                _getTextSize: function (t) {
                    var e = this.dummyCanvas.getContext("2d");
                    e.save(), (e.font = this._getContextFont());
                    t = e.measureText(t);
                    return (
                        e.restore(),
                        {
                            width: t.width,
                            height: parseInt(this.attrs.fontSize, 10),
                        }
                    );
                },
                _setTextData: function () {
                    var h = this,
                        t = this._getTextSize(this.attrs.text);
                    (this.textWidth = t.width),
                        (this.textHeight = t.height),
                        (this.glyphInfo = []);
                    function e(t) {
                        var e = h._getTextSize(t).width,
                            i = 0,
                            n = 0;
                        for (
                            d = void 0;
                            0.01 < Math.abs(e - i) / e && n < 25;

                        ) {
                            n++;
                            for (var a = i; void 0 === u; )
                                (u = (function () {
                                    g = 0;
                                    for (
                                        var t = h.dataArray, e = f + 1;
                                        e < t.length;
                                        e++
                                    ) {
                                        if (0 < t[e].pathLength)
                                            return t[(f = e)];
                                        "M" == t[e].command &&
                                            (l = {
                                                x: t[e].points[0],
                                                y: t[e].points[1],
                                            });
                                    }
                                    return {};
                                })()) &&
                                    a + u.pathLength < e &&
                                    ((a += u.pathLength), (u = void 0));
                            if (u === {} || void 0 === l) return;
                            var r = !1;
                            switch (u.command) {
                                case "L":
                                    Kinetic.Path.getLineLength(
                                        l.x,
                                        l.y,
                                        u.points[0],
                                        u.points[1]
                                    ) > e
                                        ? (d = Kinetic.Path.getPointOnLine(
                                              e,
                                              l.x,
                                              l.y,
                                              u.points[0],
                                              u.points[1],
                                              l.x,
                                              l.y
                                          ))
                                        : (u = void 0);
                                    break;
                                case "A":
                                    var s = u.points[4],
                                        o = u.points[5],
                                        c = u.points[4] + o;
                                    0 === g
                                        ? (g = s + 1e-8)
                                        : i < e
                                        ? (g +=
                                              ((Math.PI / 180) * o) /
                                              Math.abs(o))
                                        : (g -=
                                              ((Math.PI / 360) * o) /
                                              Math.abs(o)),
                                        ((o < 0 && g < c) ||
                                            (0 <= o && c < g)) &&
                                            ((g = c), (r = !0)),
                                        (d =
                                            Kinetic.Path.getPointOnEllipticalArc(
                                                u.points[0],
                                                u.points[1],
                                                u.points[2],
                                                u.points[3],
                                                g,
                                                u.points[6]
                                            ));
                                    break;
                                case "C":
                                    0 === g
                                        ? (g =
                                              e > u.pathLength
                                                  ? 1e-8
                                                  : e / u.pathLength)
                                        : i < e
                                        ? (g += (e - i) / u.pathLength)
                                        : (g -= (i - e) / u.pathLength),
                                        1 < g && ((g = 1), (r = !0)),
                                        (d = Kinetic.Path.getPointOnCubicBezier(
                                            g,
                                            u.start.x,
                                            u.start.y,
                                            u.points[0],
                                            u.points[1],
                                            u.points[2],
                                            u.points[3],
                                            u.points[4],
                                            u.points[5]
                                        ));
                                    break;
                                case "Q":
                                    0 === g
                                        ? (g = e / u.pathLength)
                                        : i < e
                                        ? (g += (e - i) / u.pathLength)
                                        : (g -= (i - e) / u.pathLength),
                                        1 < g && ((g = 1), (r = !0)),
                                        (d =
                                            Kinetic.Path.getPointOnQuadraticBezier(
                                                g,
                                                u.start.x,
                                                u.start.y,
                                                u.points[0],
                                                u.points[1],
                                                u.points[2],
                                                u.points[3]
                                            ));
                            }
                            void 0 !== d &&
                                (i = Kinetic.Path.getLineLength(
                                    l.x,
                                    l.y,
                                    d.x,
                                    d.y
                                )),
                                r && ((r = !1), (u = void 0));
                        }
                    }
                    for (
                        var l,
                            d,
                            u,
                            i = this.attrs.text.split(""),
                            f = -1,
                            g = 0,
                            n = 0;
                        n < i.length && (e(i[n]), void 0 !== l && void 0 !== d);
                        n++
                    ) {
                        var a = Kinetic.Path.getLineLength(l.x, l.y, d.x, d.y),
                            r = Kinetic.Path.getPointOnLine(
                                0 + a / 2,
                                l.x,
                                l.y,
                                d.x,
                                d.y
                            ),
                            a = Math.atan2(d.y - l.y, d.x - l.x);
                        this.glyphInfo.push({
                            transposeX: r.x,
                            transposeY: r.y,
                            text: i[n],
                            rotation: a,
                            p0: l,
                            p1: d,
                        }),
                            (l = d);
                    }
                },
            }),
            (Kinetic.TextPath.prototype._getContextFont =
                Kinetic.Text.prototype._getContextFont),
            Kinetic.Util.extend(Kinetic.TextPath, Kinetic.Shape),
            Kinetic.Factory.addGetterSetter(
                Kinetic.TextPath,
                "fontFamily",
                "Arial"
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.TextPath, "fontSize", 12),
            Kinetic.Factory.addGetterSetter(
                Kinetic.TextPath,
                "fontStyle",
                "normal"
            ),
            Kinetic.Factory.addGetterSetter(
                Kinetic.TextPath,
                "fontVariant",
                "normal"
            ),
            Kinetic.Factory.addGetter(Kinetic.TextPath, "text", ""),
            Kinetic.Collection.mapMethods(Kinetic.TextPath);
    })(),
    (Kinetic.RegularPolygon = function (t) {
        this.___init(t);
    }),
    (Kinetic.RegularPolygon.prototype = {
        ___init: function (t) {
            Kinetic.Shape.call(this, t),
                (this.className = "RegularPolygon"),
                this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function (t) {
            var e,
                i,
                n,
                a = this.attrs.sides,
                r = this.attrs.radius;
            for (t.beginPath(), t.moveTo(0, 0 - r), e = 1; e < a; e++)
                (i = r * Math.sin((2 * e * Math.PI) / a)),
                    (n = -1 * r * Math.cos((2 * e * Math.PI) / a)),
                    t.lineTo(i, n);
            t.closePath(), t.fillStrokeShape(this);
        },
    }),
    Kinetic.Util.extend(Kinetic.RegularPolygon, Kinetic.Shape),
    Kinetic.Factory.addGetterSetter(Kinetic.RegularPolygon, "radius", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.RegularPolygon, "sides", 0),
    Kinetic.Collection.mapMethods(Kinetic.RegularPolygon),
    (Kinetic.Star = function (t) {
        this.___init(t);
    }),
    (Kinetic.Star.prototype = {
        ___init: function (t) {
            Kinetic.Shape.call(this, t),
                (this.className = "Star"),
                this.sceneFunc(this._sceneFunc);
        },
        _sceneFunc: function (t) {
            var e = this.innerRadius(),
                i = this.outerRadius(),
                n = this.numPoints();
            t.beginPath(), t.moveTo(0, 0 - i);
            for (var a = 1; a < 2 * n; a++) {
                var r = a % 2 == 0 ? i : e,
                    s = r * Math.sin((a * Math.PI) / n),
                    r = -1 * r * Math.cos((a * Math.PI) / n);
                t.lineTo(s, r);
            }
            t.closePath(), t.fillStrokeShape(this);
        },
    }),
    Kinetic.Util.extend(Kinetic.Star, Kinetic.Shape),
    Kinetic.Factory.addGetterSetter(Kinetic.Star, "numPoints", 5),
    Kinetic.Factory.addGetterSetter(Kinetic.Star, "innerRadius", 0),
    Kinetic.Factory.addGetterSetter(Kinetic.Star, "outerRadius", 0),
    Kinetic.Collection.mapMethods(Kinetic.Star),
    (function () {
        var a = [
                "fontFamily",
                "fontSize",
                "fontStyle",
                "padding",
                "lineHeight",
                "text",
            ],
            r = a.length;
        (Kinetic.Label = function (t) {
            this.____init(t);
        }),
            (Kinetic.Label.prototype = {
                ____init: function (t) {
                    var e = this;
                    Kinetic.Group.call(this, t),
                        (this.className = "Label"),
                        this.on("add.kinetic", function (t) {
                            e._addListeners(t.child), e._sync();
                        });
                },
                getText: function () {
                    return this.find("Text")[0];
                },
                getTag: function () {
                    return this.find("Tag")[0];
                },
                _addListeners: function (t) {
                    function e() {
                        i._sync();
                    }
                    for (var i = this, n = 0; n < r; n++)
                        t.on(a[n] + "Change.kinetic", e);
                },
                getWidth: function () {
                    return this.getText().getWidth();
                },
                getHeight: function () {
                    return this.getText().getHeight();
                },
                _sync: function () {
                    var t,
                        e,
                        i,
                        n,
                        a,
                        r,
                        s,
                        o = this.getText(),
                        c = this.getTag();
                    if (o && c) {
                        switch (
                            ((t = o.getWidth()),
                            (e = o.getHeight()),
                            (i = c.getPointerDirection()),
                            (n = c.getPointerWidth()),
                            (s = c.getPointerHeight()),
                            (r = a = 0),
                            i)
                        ) {
                            case "up":
                                (a = t / 2), (r = -1 * s);
                                break;
                            case "right":
                                (a = t + n), (r = e / 2);
                                break;
                            case "down":
                                (a = t / 2), (r = e + s);
                                break;
                            case "left":
                                (a = -1 * n), (r = e / 2);
                        }
                        c.setAttrs({
                            x: -1 * a,
                            y: -1 * r,
                            width: t,
                            height: e,
                        }),
                            o.setAttrs({ x: -1 * a, y: -1 * r });
                    }
                },
            }),
            Kinetic.Util.extend(Kinetic.Label, Kinetic.Group),
            Kinetic.Collection.mapMethods(Kinetic.Label),
            (Kinetic.Tag = function (t) {
                this.___init(t);
            }),
            (Kinetic.Tag.prototype = {
                ___init: function (t) {
                    Kinetic.Shape.call(this, t),
                        (this.className = "Tag"),
                        this.sceneFunc(this._sceneFunc);
                },
                _sceneFunc: function (t) {
                    var e = this.getWidth(),
                        i = this.getHeight(),
                        n = this.getPointerDirection(),
                        a = this.getPointerWidth(),
                        r = this.getPointerHeight(),
                        s = this.getCornerRadius();
                    t.beginPath(),
                        t.moveTo(0, 0),
                        "up" === n &&
                            (t.lineTo((e - a) / 2, 0),
                            t.lineTo(e / 2, -1 * r),
                            t.lineTo((e + a) / 2, 0)),
                        s
                            ? (t.lineTo(e - s, 0),
                              t.arc(e - s, s, s, (3 * Math.PI) / 2, 0, !1))
                            : t.lineTo(e, 0),
                        "right" === n &&
                            (t.lineTo(e, (i - r) / 2),
                            t.lineTo(e + a, i / 2),
                            t.lineTo(e, (i + r) / 2)),
                        s
                            ? (t.lineTo(e, i - s),
                              t.arc(e - s, i - s, s, 0, Math.PI / 2, !1))
                            : t.lineTo(e, i),
                        "down" === n &&
                            (t.lineTo((e + a) / 2, i),
                            t.lineTo(e / 2, i + r),
                            t.lineTo((e - a) / 2, i)),
                        s
                            ? (t.lineTo(s, i),
                              t.arc(s, i - s, s, Math.PI / 2, Math.PI, !1))
                            : t.lineTo(0, i),
                        "left" === n &&
                            (t.lineTo(0, (i + r) / 2),
                            t.lineTo(-1 * a, i / 2),
                            t.lineTo(0, (i - r) / 2)),
                        s &&
                            (t.lineTo(0, s),
                            t.arc(s, s, s, Math.PI, (3 * Math.PI) / 2, !1)),
                        t.closePath(),
                        t.fillStrokeShape(this);
                },
            }),
            Kinetic.Util.extend(Kinetic.Tag, Kinetic.Shape),
            Kinetic.Factory.addGetterSetter(
                Kinetic.Tag,
                "pointerDirection",
                "none"
            ),
            Kinetic.Factory.addGetterSetter(Kinetic.Tag, "pointerWidth", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Tag, "pointerHeight", 0),
            Kinetic.Factory.addGetterSetter(Kinetic.Tag, "cornerRadius", 0),
            Kinetic.Collection.mapMethods(Kinetic.Tag);
    })(),
    (Kinetic.Arrow = function (t) {
        this.____init(t);
    }),
    (Kinetic.Arrow.prototype = {
        ____init: function (t) {
            Kinetic.Line.call(this, t), (this.className = "Arrow");
        },
        _sceneFunc: function (t) {
            var e = 2 * Math.PI,
                i = this.points(),
                n = i.length,
                a = i[n - 2] - i[n - 4],
                r = i[n - 1] - i[n - 3],
                s = (Math.atan2(r, a) + e) % e,
                o = this.pointerLength(),
                c = this.pointerWidth();
            t.save(),
                t.beginPath(),
                t.translate(i[n - 2], i[n - 1]),
                t.rotate(s),
                t.moveTo(0, 0),
                t.lineTo(-o, c / 2),
                t.lineTo(-o, -c / 2),
                t.closePath(),
                t.restore(),
                this.pointerAtBeginning() &&
                    (t.save(),
                    t.translate(i[0], i[1]),
                    (a = i[2] - i[0]),
                    (r = i[3] - i[1]),
                    t.rotate((Math.atan2(-r, -a) + e) % e),
                    t.moveTo(0, 0),
                    t.lineTo(-10, 6),
                    t.lineTo(-10, -6),
                    t.closePath(),
                    t.restore()),
                t.fillStrokeShape(this),
                Kinetic.Line.prototype._sceneFunc.apply(this, arguments);
        },
    }),
    Kinetic.Util.extend(Kinetic.Arrow, Kinetic.Line),
    Kinetic.Factory.addGetterSetter(Kinetic.Arrow, "pointerLength", 10),
    Kinetic.Factory.addGetterSetter(Kinetic.Arrow, "pointerWidth", 10),
    Kinetic.Factory.addGetterSetter(Kinetic.Arrow, "pointerAtBeginning", !1),
    Kinetic.Collection.mapMethods(Kinetic.Arrow);
!(function (r) {
    function n() {
        w.draw(), v.draw(), b.draw(), f.draw();
    }
    function a(e) {
        return (Math.PI / 180) * e - (Math.PI / 180) * 90;
    }
    var d, i, c, h, l, u, w, v, b, f, y, _;
    r.fn.final_countdown = function (e, o) {
        var s, t;
        (y = r(this)).is(":visible") &&
            ((s = r.extend(
                {
                    start: void 0,
                    end: void 0,
                    now: void 0,
                    selectors: {
                        value_seconds: ".clock-seconds .val",
                        canvas_seconds: "canvas-seconds",
                        value_minutes: ".clock-minutes .val",
                        canvas_minutes: "canvas-minutes",
                        value_hours: ".clock-hours .val",
                        canvas_hours: "canvas-hours",
                        value_days: ".clock-days .val",
                        canvas_days: "canvas-days",
                    },
                    seconds: { borderColor: "#7995D5", borderWidth: "6" },
                    minutes: { borderColor: "#ACC742", borderWidth: "6" },
                    hours: { borderColor: "#ECEFCB", borderWidth: "6" },
                    days: { borderColor: "#FF9900", borderWidth: "6" },
                },
                e
            )),
            void 0 === (d = r.extend({}, s, e)).start &&
                (d.start = y.data("start")),
            void 0 === d.end && (d.end = y.data("end")),
            void 0 === d.now && (d.now = y.data("now")),
            y.data("border-color") &&
                (d.seconds.borderColor =
                    d.minutes.borderColor =
                    d.hours.borderColor =
                    d.days.borderColor =
                        y.data("border-color")),
            d.now < d.start && ((d.start = d.now), (d.end = d.now)),
            d.now > d.end && ((d.start = d.now), (d.end = d.now)),
            "function" == typeof o && (_ = o),
            r(window).on("load", function () {
                n();
            }),
            r(window).on("redraw", function () {
                (switched = !1), n();
            }),
            r(window).on("resize", n),
            (i = {
                total: Math.floor((d.end - d.start) / 86400),
                days: Math.floor((d.end - d.now) / 86400),
                hours: 24 - Math.floor(((d.end - d.now) % 86400) / 3600),
                minutes:
                    60 - Math.floor((((d.end - d.now) % 86400) % 3600) / 60),
                seconds:
                    60 - Math.floor((((d.end - d.now) % 86400) % 3600) % 60),
            }),
            (o = r("#" + d.selectors.canvas_seconds).width()),
            (o = new Kinetic.Stage({
                container: d.selectors.canvas_seconds,
                width: o,
                height: o,
            })),
            (c = new Kinetic.Shape({
                drawFunc: function (e) {
                    var o = r("#" + d.selectors.canvas_seconds).width(),
                        s = o / 2 - d.seconds.borderWidth / 2,
                        t = o / 2,
                        o = o / 2;
                    e.beginPath(),
                        e.arc(t, o, s, a(0), a(6 * i.seconds)),
                        e.fillStrokeShape(this),
                        r(d.selectors.value_seconds).html(60 - i.seconds);
                },
                stroke: d.seconds.borderColor,
                strokeWidth: d.seconds.borderWidth,
            })),
            (w = new Kinetic.Layer()).add(c),
            o.add(w),
            (o = r("#" + d.selectors.canvas_minutes).width()),
            (o = new Kinetic.Stage({
                container: d.selectors.canvas_minutes,
                width: o,
                height: o,
            })),
            (h = new Kinetic.Shape({
                drawFunc: function (e) {
                    var o = r("#" + d.selectors.canvas_minutes).width(),
                        s = o / 2 - d.minutes.borderWidth / 2,
                        t = o / 2,
                        o = o / 2;
                    e.beginPath(),
                        e.arc(t, o, s, a(0), a(6 * i.minutes)),
                        e.fillStrokeShape(this),
                        r(d.selectors.value_minutes).html(60 - i.minutes);
                },
                stroke: d.minutes.borderColor,
                strokeWidth: d.minutes.borderWidth,
            })),
            (v = new Kinetic.Layer()).add(h),
            o.add(v),
            (o = r("#" + d.selectors.canvas_hours).width()),
            (o = new Kinetic.Stage({
                container: d.selectors.canvas_hours,
                width: o,
                height: o,
            })),
            (l = new Kinetic.Shape({
                drawFunc: function (e) {
                    var o = r("#" + d.selectors.canvas_hours).width(),
                        s = o / 2 - d.hours.borderWidth / 2,
                        t = o / 2,
                        o = o / 2;
                    e.beginPath(),
                        e.arc(t, o, s, a(0), a((360 * i.hours) / 24)),
                        e.fillStrokeShape(this),
                        r(d.selectors.value_hours).html(24 - i.hours);
                },
                stroke: d.hours.borderColor,
                strokeWidth: d.hours.borderWidth,
            })),
            (b = new Kinetic.Layer()).add(l),
            o.add(b),
            (o = r("#" + d.selectors.canvas_days).width()),
            (o = new Kinetic.Stage({
                container: d.selectors.canvas_days,
                width: o,
                height: o,
            })),
            (u = new Kinetic.Shape({
                drawFunc: function (e) {
                    var o = r("#" + d.selectors.canvas_days).width(),
                        s = o / 2 - d.days.borderWidth / 2,
                        t = o / 2,
                        o = o / 2;
                    e.beginPath(),
                        0 == i.total
                            ? e.arc(t, o, s, a(0), a(360))
                            : e.arc(
                                  t,
                                  o,
                                  s,
                                  a(0),
                                  a((360 / i.total) * (i.total - i.days))
                              ),
                        e.fillStrokeShape(this),
                        r(d.selectors.value_days).html(i.days);
                },
                stroke: d.days.borderColor,
                strokeWidth: d.days.borderWidth,
            })),
            (f = new Kinetic.Layer()).add(u),
            o.add(f),
            (t = setInterval(function () {
                if (59 < i.seconds) {
                    if (60 - i.minutes == 0 && 24 - i.hours == 0 && 0 == i.days)
                        return (
                            clearInterval(t),
                            void (void 0 !== _ && _.call(this))
                        );
                    (i.seconds = 1),
                        59 < i.minutes
                            ? ((i.minutes = 1),
                              v.draw(),
                              23 < i.hours
                                  ? ((i.hours = 1),
                                    0 < i.days && (i.days--, f.draw()))
                                  : i.hours++,
                              b.draw())
                            : i.minutes++,
                        v.draw();
                } else i.seconds++;
                w.draw();
            }, 1e3)));
    };
})(jQuery);
!(function (e) {
    "function" == typeof define && define.amd
        ? define(["jquery"], e)
        : e(
              "object" == typeof module && module.exports
                  ? require("jquery")
                  : jQuery
          );
})(function (p) {
    function t(e) {
        var t = [],
            l = e.dir && "left" === e.dir ? "scrollLeft" : "scrollTop";
        return (
            this.each(function () {
                var e = p(this);
                if (this !== document && this !== window)
                    return !document.scrollingElement ||
                        (this !== document.documentElement &&
                            this !== document.body)
                        ? void (0 < e[l]()
                              ? t.push(this)
                              : (e[l](1), 0 < e[l]() && t.push(this), e[l](0)))
                        : (t.push(document.scrollingElement), !1);
            }),
            t.length ||
                this.each(function () {
                    (t =
                        this === document.documentElement &&
                        "smooth" === p(this).css("scrollBehavior")
                            ? [this]
                            : t).length ||
                        "BODY" !== this.nodeName ||
                        (t = [this]);
                }),
            (t = "first" === e.el && 1 < t.length ? [t[0]] : t)
        );
    }
    var u = {},
        o = /^([\-\+]=)(\d+)/;
    p.fn.extend({
        scrollable: function (e) {
            e = t.call(this, { dir: e });
            return this.pushStack(e);
        },
        firstScrollable: function (e) {
            e = t.call(this, { el: "first", dir: e });
            return this.pushStack(e);
        },
        smoothScroll: function (e, t) {
            if ("options" === (e = e || {}))
                return t
                    ? this.each(function () {
                          var e = p(this),
                              e = p.extend(e.data("ssOpts") || {}, t);
                          p(this).data("ssOpts", e);
                      })
                    : this.first().data("ssOpts");
            function l(e) {
                function t(e) {
                    return e.replace(/(:|\.|\/)/g, "\\$1");
                }
                var l = this,
                    o = p(this),
                    n = p.extend({}, m, o.data("ssOpts") || {}),
                    s = m.exclude,
                    r = n.excludeWithin,
                    c = 0,
                    i = 0,
                    a = !0,
                    f = {},
                    u = p.smoothScroll.filterPath(location.pathname),
                    h = p.smoothScroll.filterPath(l.pathname),
                    d = location.hostname === l.hostname || !l.hostname,
                    h = n.scrollTarget || h === u;
                if (
                    ((u = t(l.hash)) && !p(u).length && (a = !1),
                    n.scrollTarget || (d && h && u))
                ) {
                    for (; a && c < s.length; ) o.is(t(s[c++])) && (a = !1);
                    for (; a && i < r.length; )
                        o.closest(r[i++]).length && (a = !1);
                } else a = !1;
                a &&
                    (n.preventDefault && e.preventDefault(),
                    p.extend(f, n, {
                        scrollTarget: n.scrollTarget || u,
                        link: l,
                    }),
                    p.smoothScroll(f));
            }
            var m = p.extend({}, p.fn.smoothScroll.defaults, e);
            return (
                null !== e.delegateSelector
                    ? this.off("click.smoothscroll", e.delegateSelector).on(
                          "click.smoothscroll",
                          e.delegateSelector,
                          l
                      )
                    : this.off("click.smoothscroll").on(
                          "click.smoothscroll",
                          l
                      ),
                this
            );
        },
    });
    function h(e) {
        var t = { relative: "" },
            l = "string" == typeof e && o.exec(e);
        return (
            "number" == typeof e
                ? (t.px = e)
                : l && ((t.relative = l[1]), (t.px = parseFloat(l[2]) || 0)),
            t
        );
    }
    function d(e) {
        var t = p(e.scrollTarget);
        e.autoFocus &&
            t.length &&
            (t[0].focus(),
            t.is(document.activeElement) ||
                (t.prop({ tabIndex: -1 }), t[0].focus())),
            e.afterScroll.call(e.link, e);
    }
    (p.smoothScroll = function (e, t) {
        if ("options" === e && "object" == typeof t) return p.extend(u, t);
        var l,
            o,
            n,
            s = h(e),
            r = 0,
            c = "offset",
            i = "scrollTop",
            a = {},
            f = {};
        s.px
            ? (l = p.extend({ link: null }, p.fn.smoothScroll.defaults, u))
            : (!(l = p.extend(
                  { link: null },
                  p.fn.smoothScroll.defaults,
                  e || {},
                  u
              )).scrollElement ||
                  ("static" === l.scrollElement.css((c = "position")) &&
                      l.scrollElement.css("position", "relative")),
              t && (s = h(t))),
            (i = "left" === l.direction ? "scrollLeft" : i),
            l.scrollElement
                ? ((o = l.scrollElement),
                  s.px || /^(?:HTML|BODY)$/.test(o[0].nodeName) || (r = o[i]()))
                : (o = p("html, body").firstScrollable(l.direction)),
            l.beforeScroll.call(o, l),
            (n = s.px
                ? s
                : {
                      relative: "",
                      px:
                          (p(l.scrollTarget)[c]() &&
                              p(l.scrollTarget)[c]()[l.direction]) ||
                          0,
                  }),
            (a[i] = n.relative + (n.px + r + l.offset)),
            (f = {
                duration: (r =
                    "auto" === (r = l.speed)
                        ? Math.abs(a[i] - o[i]()) / l.autoCoefficient
                        : r),
                easing: l.easing,
                complete: function () {
                    d(l);
                },
            }),
            l.step && (f.step = l.step),
            o.length ? o.stop().animate(a, f) : d(l);
    }),
        (p.smoothScroll.version = "2.2.0"),
        (p.smoothScroll.filterPath = function (e) {
            return (e = e || "")
                .replace(/^\//, "")
                .replace(/(?:index|default).[a-zA-Z]{3,4}$/, "")
                .replace(/\/$/, "");
        }),
        (p.fn.smoothScroll.defaults = {
            exclude: [],
            excludeWithin: [],
            offset: 0,
            direction: "top",
            delegateSelector: null,
            scrollElement: null,
            scrollTarget: null,
            autoFocus: !1,
            beforeScroll: function () {},
            afterScroll: function () {},
            easing: "swing",
            speed: 400,
            autoCoefficient: 2,
            preventDefault: !0,
        });
});
!(function (t) {
    "function" == typeof define && define.amd
        ? define(["jquery"], t)
        : "object" == typeof module && module.exports
        ? (module.exports = t(require("jquery")))
        : t(jQuery);
})(function (d) {
    d.extend(d.fn, {
        validate: function (t) {
            if (this.length) {
                var s = d.data(this[0], "validator");
                return s
                    ? s
                    : (this.attr("novalidate", "novalidate"),
                      (s = new d.validator(t, this[0])),
                      d.data(this[0], "validator", s),
                      s.settings.onsubmit &&
                          (this.on("click.validate", ":submit", function (t) {
                              (s.submitButton = t.currentTarget),
                                  d(this).hasClass("cancel") &&
                                      (s.cancelSubmit = !0),
                                  void 0 !== d(this).attr("formnovalidate") &&
                                      (s.cancelSubmit = !0);
                          }),
                          this.on("submit.validate", function (i) {
                              function t() {
                                  var t, e;
                                  return (
                                      s.submitButton &&
                                          (s.settings.submitHandler ||
                                              s.formSubmitted) &&
                                          (t = d("<input type='hidden'/>")
                                              .attr("name", s.submitButton.name)
                                              .val(d(s.submitButton).val())
                                              .appendTo(s.currentForm)),
                                      !(
                                          s.settings.submitHandler &&
                                          !s.settings.debug
                                      ) ||
                                          ((e = s.settings.submitHandler.call(
                                              s,
                                              s.currentForm,
                                              i
                                          )),
                                          t && t.remove(),
                                          void 0 !== e && e)
                                  );
                              }
                              return (
                                  s.settings.debug && i.preventDefault(),
                                  s.cancelSubmit
                                      ? ((s.cancelSubmit = !1), t())
                                      : s.form()
                                      ? s.pendingRequest
                                          ? !(s.formSubmitted = !0)
                                          : t()
                                      : (s.focusInvalid(), !1)
                              );
                          })),
                      s);
            }
            t &&
                t.debug &&
                window.console &&
                console.warn(
                    "Nothing selected, can't validate, returning nothing."
                );
        },
        valid: function () {
            var t, e, i;
            return (
                d(this[0]).is("form")
                    ? (t = this.validate().form())
                    : ((i = []),
                      (t = !0),
                      (e = d(this[0].form).validate()),
                      this.each(function () {
                          (t = e.element(this) && t) ||
                              (i = i.concat(e.errorList));
                      }),
                      (e.errorList = i)),
                t
            );
        },
        rules: function (t, e) {
            var i,
                s,
                n,
                r,
                a,
                o = this[0],
                l =
                    void 0 !== this.attr("contenteditable") &&
                    "false" !== this.attr("contenteditable");
            if (
                null != o &&
                (!o.form &&
                    l &&
                    ((o.form = this.closest("form")[0]),
                    (o.name = this.attr("name"))),
                null != o.form)
            ) {
                if (t)
                    switch (
                        ((s = (i = d.data(o.form, "validator").settings).rules),
                        (n = d.validator.staticRules(o)),
                        t)
                    ) {
                        case "add":
                            d.extend(n, d.validator.normalizeRule(e)),
                                delete n.messages,
                                (s[o.name] = n),
                                e.messages &&
                                    (i.messages[o.name] = d.extend(
                                        i.messages[o.name],
                                        e.messages
                                    ));
                            break;
                        case "remove":
                            return e
                                ? ((a = {}),
                                  d.each(e.split(/\s/), function (t, e) {
                                      (a[e] = n[e]), delete n[e];
                                  }),
                                  a)
                                : (delete s[o.name], n);
                    }
                return (
                    (t = d.validator.normalizeRules(
                        d.extend(
                            {},
                            d.validator.classRules(o),
                            d.validator.attributeRules(o),
                            d.validator.dataRules(o),
                            d.validator.staticRules(o)
                        ),
                        o
                    )).required &&
                        ((r = t.required),
                        delete t.required,
                        (t = d.extend({ required: r }, t))),
                    t.remote &&
                        ((r = t.remote),
                        delete t.remote,
                        (t = d.extend(t, { remote: r }))),
                    t
                );
            }
        },
    });
    function e(t) {
        return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }
    var i;
    d.extend(d.expr.pseudos || d.expr[":"], {
        blank: function (t) {
            return !e("" + d(t).val());
        },
        filled: function (t) {
            t = d(t).val();
            return null !== t && !!e("" + t);
        },
        unchecked: function (t) {
            return !d(t).prop("checked");
        },
    }),
        (d.validator = function (t, e) {
            (this.settings = d.extend(!0, {}, d.validator.defaults, t)),
                (this.currentForm = e),
                this.init();
        }),
        (d.validator.format = function (i, t) {
            return 1 === arguments.length
                ? function () {
                      var t = d.makeArray(arguments);
                      return t.unshift(i), d.validator.format.apply(this, t);
                  }
                : (void 0 === t ||
                      ((t =
                          2 < arguments.length && t.constructor !== Array
                              ? d.makeArray(arguments).slice(1)
                              : t).constructor !== Array && (t = [t]),
                      d.each(t, function (t, e) {
                          i = i.replace(
                              new RegExp("\\{" + t + "\\}", "g"),
                              function () {
                                  return e;
                              }
                          );
                      })),
                  i);
        }),
        d.extend(d.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                pendingClass: "pending",
                validClass: "valid",
                errorElement: "label",
                focusCleanup: !1,
                focusInvalid: !0,
                errorContainer: d([]),
                errorLabelContainer: d([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (t) {
                    (this.lastActive = t),
                        this.settings.focusCleanup &&
                            (this.settings.unhighlight &&
                                this.settings.unhighlight.call(
                                    this,
                                    t,
                                    this.settings.errorClass,
                                    this.settings.validClass
                                ),
                            this.hideThese(this.errorsFor(t)));
                },
                onfocusout: function (t) {
                    this.checkable(t) ||
                        (!(t.name in this.submitted) && this.optional(t)) ||
                        this.element(t);
                },
                onkeyup: function (t, e) {
                    (9 === e.which && "" === this.elementValue(t)) ||
                        -1 !==
                            d.inArray(
                                e.keyCode,
                                [
                                    16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45,
                                    144, 225,
                                ]
                            ) ||
                        ((t.name in this.submitted || t.name in this.invalid) &&
                            this.element(t));
                },
                onclick: function (t) {
                    t.name in this.submitted
                        ? this.element(t)
                        : t.parentNode.name in this.submitted &&
                          this.element(t.parentNode);
                },
                highlight: function (t, e, i) {
                    ("radio" === t.type ? this.findByName(t.name) : d(t))
                        .addClass(e)
                        .removeClass(i);
                },
                unhighlight: function (t, e, i) {
                    ("radio" === t.type ? this.findByName(t.name) : d(t))
                        .removeClass(e)
                        .addClass(i);
                },
            },
            setDefaults: function (t) {
                d.extend(d.validator.defaults, t);
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                equalTo: "Please enter the same value again.",
                maxlength: d.validator.format(
                    "Please enter no more than {0} characters."
                ),
                minlength: d.validator.format(
                    "Please enter at least {0} characters."
                ),
                rangelength: d.validator.format(
                    "Please enter a value between {0} and {1} characters long."
                ),
                range: d.validator.format(
                    "Please enter a value between {0} and {1}."
                ),
                max: d.validator.format(
                    "Please enter a value less than or equal to {0}."
                ),
                min: d.validator.format(
                    "Please enter a value greater than or equal to {0}."
                ),
                step: d.validator.format("Please enter a multiple of {0}."),
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    (this.labelContainer = d(
                        this.settings.errorLabelContainer
                    )),
                        (this.errorContext =
                            (this.labelContainer.length &&
                                this.labelContainer) ||
                            d(this.currentForm)),
                        (this.containers = d(this.settings.errorContainer).add(
                            this.settings.errorLabelContainer
                        )),
                        (this.submitted = {}),
                        (this.valueCache = {}),
                        (this.pendingRequest = 0),
                        (this.pending = {}),
                        (this.invalid = {}),
                        this.reset();
                    var i,
                        n = this.currentForm,
                        s = (this.groups = {});
                    function t(t) {
                        var e,
                            i,
                            s =
                                void 0 !== d(this).attr("contenteditable") &&
                                "false" !== d(this).attr("contenteditable");
                        !this.form &&
                            s &&
                            ((this.form = d(this).closest("form")[0]),
                            (this.name = d(this).attr("name"))),
                            n === this.form &&
                                ((e = d.data(this.form, "validator")),
                                (i = "on" + t.type.replace(/^validate/, "")),
                                (s = e.settings)[i] &&
                                    !d(this).is(s.ignore) &&
                                    s[i].call(e, this, t));
                    }
                    d.each(this.settings.groups, function (i, t) {
                        "string" == typeof t && (t = t.split(/\s/)),
                            d.each(t, function (t, e) {
                                s[e] = i;
                            });
                    }),
                        (i = this.settings.rules),
                        d.each(i, function (t, e) {
                            i[t] = d.validator.normalizeRule(e);
                        }),
                        d(this.currentForm)
                            .on(
                                "focusin.validate focusout.validate keyup.validate",
                                ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']",
                                t
                            )
                            .on(
                                "click.validate",
                                "select, option, [type='radio'], [type='checkbox']",
                                t
                            ),
                        this.settings.invalidHandler &&
                            d(this.currentForm).on(
                                "invalid-form.validate",
                                this.settings.invalidHandler
                            );
                },
                form: function () {
                    return (
                        this.checkForm(),
                        d.extend(this.submitted, this.errorMap),
                        (this.invalid = d.extend({}, this.errorMap)),
                        this.valid() ||
                            d(this.currentForm).triggerHandler("invalid-form", [
                                this,
                            ]),
                        this.showErrors(),
                        this.valid()
                    );
                },
                checkForm: function () {
                    this.prepareForm();
                    for (
                        var t = 0, e = (this.currentElements = this.elements());
                        e[t];
                        t++
                    )
                        this.check(e[t]);
                    return this.valid();
                },
                element: function (t) {
                    var e,
                        i,
                        s = this.clean(t),
                        n = this.validationTargetFor(s),
                        r = this,
                        a = !0;
                    return (
                        void 0 === n
                            ? delete this.invalid[s.name]
                            : (this.prepareElement(n),
                              (this.currentElements = d(n)),
                              (i = this.groups[n.name]) &&
                                  d.each(this.groups, function (t, e) {
                                      e === i &&
                                          t !== n.name &&
                                          (s = r.validationTargetFor(
                                              r.clean(r.findByName(t))
                                          )) &&
                                          s.name in r.invalid &&
                                          (r.currentElements.push(s),
                                          (a = r.check(s) && a));
                                  }),
                              (e = !1 !== this.check(n)),
                              (a = a && e),
                              (this.invalid[n.name] = !e),
                              this.numberOfInvalids() ||
                                  (this.toHide = this.toHide.add(
                                      this.containers
                                  )),
                              this.showErrors(),
                              d(t).attr("aria-invalid", !e)),
                        a
                    );
                },
                showErrors: function (e) {
                    var i;
                    e &&
                        (d.extend((i = this).errorMap, e),
                        (this.errorList = d.map(this.errorMap, function (t, e) {
                            return { message: t, element: i.findByName(e)[0] };
                        })),
                        (this.successList = d.grep(
                            this.successList,
                            function (t) {
                                return !(t.name in e);
                            }
                        ))),
                        this.settings.showErrors
                            ? this.settings.showErrors.call(
                                  this,
                                  this.errorMap,
                                  this.errorList
                              )
                            : this.defaultShowErrors();
                },
                resetForm: function () {
                    d.fn.resetForm && d(this.currentForm).resetForm(),
                        (this.invalid = {}),
                        (this.submitted = {}),
                        this.prepareForm(),
                        this.hideErrors();
                    var t = this.elements()
                        .removeData("previousValue")
                        .removeAttr("aria-invalid");
                    this.resetElements(t);
                },
                resetElements: function (t) {
                    var e;
                    if (this.settings.unhighlight)
                        for (e = 0; t[e]; e++)
                            this.settings.unhighlight.call(
                                this,
                                t[e],
                                this.settings.errorClass,
                                ""
                            ),
                                this.findByName(t[e].name).removeClass(
                                    this.settings.validClass
                                );
                    else
                        t.removeClass(this.settings.errorClass).removeClass(
                            this.settings.validClass
                        );
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid);
                },
                objectLength: function (t) {
                    var e,
                        i = 0;
                    for (e in t)
                        void 0 !== t[e] && null !== t[e] && !1 !== t[e] && i++;
                    return i;
                },
                hideErrors: function () {
                    this.hideThese(this.toHide);
                },
                hideThese: function (t) {
                    t.not(this.containers).text(""), this.addWrapper(t).hide();
                },
                valid: function () {
                    return 0 === this.size();
                },
                size: function () {
                    return this.errorList.length;
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid)
                        try {
                            d(
                                this.findLastActive() ||
                                    (this.errorList.length &&
                                        this.errorList[0].element) ||
                                    []
                            )
                                .filter(":visible")
                                .trigger("focus")
                                .trigger("focusin");
                        } catch (t) {}
                },
                findLastActive: function () {
                    var e = this.lastActive;
                    return (
                        e &&
                        1 ===
                            d.grep(this.errorList, function (t) {
                                return t.element.name === e.name;
                            }).length &&
                        e
                    );
                },
                elements: function () {
                    var i = this,
                        s = {};
                    return d(this.currentForm)
                        .find("input, select, textarea, [contenteditable]")
                        .not(":submit, :reset, :image, :disabled")
                        .not(this.settings.ignore)
                        .filter(function () {
                            var t = this.name || d(this).attr("name"),
                                e =
                                    void 0 !==
                                        d(this).attr("contenteditable") &&
                                    "false" !== d(this).attr("contenteditable");
                            return (
                                !t &&
                                    i.settings.debug &&
                                    window.console &&
                                    console.error(
                                        "%o has no name assigned",
                                        this
                                    ),
                                e &&
                                    ((this.form = d(this).closest("form")[0]),
                                    (this.name = t)),
                                this.form === i.currentForm &&
                                    !(
                                        t in s ||
                                        !i.objectLength(d(this).rules())
                                    ) &&
                                    (s[t] = !0)
                            );
                        });
                },
                clean: function (t) {
                    return d(t)[0];
                },
                errors: function () {
                    var t = this.settings.errorClass.split(" ").join(".");
                    return d(
                        this.settings.errorElement + "." + t,
                        this.errorContext
                    );
                },
                resetInternals: function () {
                    (this.successList = []),
                        (this.errorList = []),
                        (this.errorMap = {}),
                        (this.toShow = d([])),
                        (this.toHide = d([]));
                },
                reset: function () {
                    this.resetInternals(), (this.currentElements = d([]));
                },
                prepareForm: function () {
                    this.reset(),
                        (this.toHide = this.errors().add(this.containers));
                },
                prepareElement: function (t) {
                    this.reset(), (this.toHide = this.errorsFor(t));
                },
                elementValue: function (t) {
                    var e = d(t),
                        i = t.type,
                        s =
                            void 0 !== e.attr("contenteditable") &&
                            "false" !== e.attr("contenteditable");
                    return "radio" === i || "checkbox" === i
                        ? this.findByName(t.name).filter(":checked").val()
                        : "number" === i && void 0 !== t.validity
                        ? t.validity.badInput
                            ? "NaN"
                            : e.val()
                        : ((e = s ? e.text() : e.val()),
                          "file" === i
                              ? "C:\\fakepath\\" === e.substr(0, 12)
                                  ? e.substr(12)
                                  : 0 <= (i = e.lastIndexOf("/")) ||
                                    0 <= (i = e.lastIndexOf("\\"))
                                  ? e.substr(i + 1)
                                  : e
                              : "string" == typeof e
                              ? e.replace(/\r/g, "")
                              : e);
                },
                check: function (e) {
                    e = this.validationTargetFor(this.clean(e));
                    var t,
                        i,
                        s,
                        n,
                        r = d(e).rules(),
                        a = d.map(r, function (t, e) {
                            return e;
                        }).length,
                        o = !1,
                        l = this.elementValue(e);
                    for (i in ("function" == typeof r.normalizer
                        ? (n = r.normalizer)
                        : "function" == typeof this.settings.normalizer &&
                          (n = this.settings.normalizer),
                    n && ((l = n.call(e, l)), delete r.normalizer),
                    r)) {
                        s = { method: i, parameters: r[i] };
                        try {
                            if (
                                "dependency-mismatch" ===
                                    (t = d.validator.methods[i].call(
                                        this,
                                        l,
                                        e,
                                        s.parameters
                                    )) &&
                                1 === a
                            ) {
                                o = !0;
                                continue;
                            }
                            if (((o = !1), "pending" === t))
                                return void (this.toHide = this.toHide.not(
                                    this.errorsFor(e)
                                ));
                            if (!t) return this.formatAndAdd(e, s), !1;
                        } catch (t) {
                            throw (
                                (this.settings.debug &&
                                    window.console &&
                                    console.log(
                                        "Exception occurred when checking element " +
                                            e.id +
                                            ", check the '" +
                                            s.method +
                                            "' method.",
                                        t
                                    ),
                                t instanceof TypeError &&
                                    (t.message +=
                                        ".  Exception occurred when checking element " +
                                        e.id +
                                        ", check the '" +
                                        s.method +
                                        "' method."),
                                t)
                            );
                        }
                    }
                    if (!o)
                        return (
                            this.objectLength(r) && this.successList.push(e), !0
                        );
                },
                customDataMessage: function (t, e) {
                    return (
                        d(t).data(
                            "msg" +
                                e.charAt(0).toUpperCase() +
                                e.substring(1).toLowerCase()
                        ) || d(t).data("msg")
                    );
                },
                customMessage: function (t, e) {
                    t = this.settings.messages[t];
                    return t && (t.constructor === String ? t : t[e]);
                },
                findDefined: function () {
                    for (var t = 0; t < arguments.length; t++)
                        if (void 0 !== arguments[t]) return arguments[t];
                },
                defaultMessage: function (t, e) {
                    var i = this.findDefined(
                            this.customMessage(
                                t.name,
                                (e = "string" == typeof e ? { method: e } : e)
                                    .method
                            ),
                            this.customDataMessage(t, e.method),
                            (!this.settings.ignoreTitle && t.title) || void 0,
                            d.validator.messages[e.method],
                            "<strong>Warning: No message defined for " +
                                t.name +
                                "</strong>"
                        ),
                        s = /\$?\{(\d+)\}/g;
                    return (
                        "function" == typeof i
                            ? (i = i.call(this, e.parameters, t))
                            : s.test(i) &&
                              (i = d.validator.format(
                                  i.replace(s, "{$1}"),
                                  e.parameters
                              )),
                        i
                    );
                },
                formatAndAdd: function (t, e) {
                    var i = this.defaultMessage(t, e);
                    this.errorList.push({
                        message: i,
                        element: t,
                        method: e.method,
                    }),
                        (this.errorMap[t.name] = i),
                        (this.submitted[t.name] = i);
                },
                addWrapper: function (t) {
                    return (t = this.settings.wrapper
                        ? t.add(t.parent(this.settings.wrapper))
                        : t);
                },
                defaultShowErrors: function () {
                    for (var t, e, i = 0; this.errorList[i]; i++)
                        (e = this.errorList[i]),
                            this.settings.highlight &&
                                this.settings.highlight.call(
                                    this,
                                    e.element,
                                    this.settings.errorClass,
                                    this.settings.validClass
                                ),
                            this.showLabel(e.element, e.message);
                    if (
                        (this.errorList.length &&
                            (this.toShow = this.toShow.add(this.containers)),
                        this.settings.success)
                    )
                        for (i = 0; this.successList[i]; i++)
                            this.showLabel(this.successList[i]);
                    if (this.settings.unhighlight)
                        for (i = 0, t = this.validElements(); t[i]; i++)
                            this.settings.unhighlight.call(
                                this,
                                t[i],
                                this.settings.errorClass,
                                this.settings.validClass
                            );
                    (this.toHide = this.toHide.not(this.toShow)),
                        this.hideErrors(),
                        this.addWrapper(this.toShow).show();
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements());
                },
                invalidElements: function () {
                    return d(this.errorList).map(function () {
                        return this.element;
                    });
                },
                showLabel: function (t, e) {
                    var i,
                        s,
                        n,
                        r = this.errorsFor(t),
                        a = this.idOrName(t),
                        o = d(t).attr("aria-describedby");
                    r.length
                        ? (r
                              .removeClass(this.settings.validClass)
                              .addClass(this.settings.errorClass),
                          r.html(e))
                        : ((i = r =
                              d("<" + this.settings.errorElement + ">")
                                  .attr("id", a + "-error")
                                  .addClass(this.settings.errorClass)
                                  .html(e || "")),
                          this.settings.wrapper &&
                              (i = r
                                  .hide()
                                  .show()
                                  .wrap("<" + this.settings.wrapper + "/>")
                                  .parent()),
                          this.labelContainer.length
                              ? this.labelContainer.append(i)
                              : this.settings.errorPlacement
                              ? this.settings.errorPlacement.call(this, i, d(t))
                              : i.insertAfter(t),
                          r.is("label")
                              ? r.attr("for", a)
                              : 0 ===
                                    r.parents(
                                        "label[for='" +
                                            this.escapeCssMeta(a) +
                                            "']"
                                    ).length &&
                                ((a = r.attr("id")),
                                o
                                    ? o.match(
                                          new RegExp(
                                              "\\b" +
                                                  this.escapeCssMeta(a) +
                                                  "\\b"
                                          )
                                      ) || (o += " " + a)
                                    : (o = a),
                                d(t).attr("aria-describedby", o),
                                (s = this.groups[t.name]) &&
                                    d.each((n = this).groups, function (t, e) {
                                        e === s &&
                                            d(
                                                "[name='" +
                                                    n.escapeCssMeta(t) +
                                                    "']",
                                                n.currentForm
                                            ).attr(
                                                "aria-describedby",
                                                r.attr("id")
                                            );
                                    }))),
                        !e &&
                            this.settings.success &&
                            (r.text(""),
                            "string" == typeof this.settings.success
                                ? r.addClass(this.settings.success)
                                : this.settings.success(r, t)),
                        (this.toShow = this.toShow.add(r));
                },
                errorsFor: function (t) {
                    var e = this.escapeCssMeta(this.idOrName(t)),
                        t = d(t).attr("aria-describedby"),
                        e = "label[for='" + e + "'], label[for='" + e + "'] *";
                    return (
                        t &&
                            (e =
                                e +
                                ", #" +
                                this.escapeCssMeta(t).replace(/\s+/g, ", #")),
                        this.errors().filter(e)
                    );
                },
                escapeCssMeta: function (t) {
                    return void 0 === t
                        ? ""
                        : t.replace(
                              /([\\!"#$%&'()*+,./:;<=>?@\[\]^`{|}~])/g,
                              "\\$1"
                          );
                },
                idOrName: function (t) {
                    return (
                        this.groups[t.name] ||
                        (!this.checkable(t) && t.id) ||
                        t.name
                    );
                },
                validationTargetFor: function (t) {
                    return (
                        this.checkable(t) && (t = this.findByName(t.name)),
                        d(t).not(this.settings.ignore)[0]
                    );
                },
                checkable: function (t) {
                    return /radio|checkbox/i.test(t.type);
                },
                findByName: function (t) {
                    return d(this.currentForm).find(
                        "[name='" + this.escapeCssMeta(t) + "']"
                    );
                },
                getLength: function (t, e) {
                    switch (e.nodeName.toLowerCase()) {
                        case "select":
                            return d("option:selected", e).length;
                        case "input":
                            if (this.checkable(e))
                                return this.findByName(e.name).filter(
                                    ":checked"
                                ).length;
                    }
                    return t.length;
                },
                depend: function (t, e) {
                    return (
                        !this.dependTypes[typeof t] ||
                        this.dependTypes[typeof t](t, e)
                    );
                },
                dependTypes: {
                    boolean: function (t) {
                        return t;
                    },
                    string: function (t, e) {
                        return !!d(t, e.form).length;
                    },
                    function: function (t, e) {
                        return t(e);
                    },
                },
                optional: function (t) {
                    var e = this.elementValue(t);
                    return (
                        !d.validator.methods.required.call(this, e, t) &&
                        "dependency-mismatch"
                    );
                },
                startRequest: function (t) {
                    this.pending[t.name] ||
                        (this.pendingRequest++,
                        d(t).addClass(this.settings.pendingClass),
                        (this.pending[t.name] = !0));
                },
                stopRequest: function (t, e) {
                    this.pendingRequest--,
                        this.pendingRequest < 0 && (this.pendingRequest = 0),
                        delete this.pending[t.name],
                        d(t).removeClass(this.settings.pendingClass),
                        e &&
                        0 === this.pendingRequest &&
                        this.formSubmitted &&
                        this.form() &&
                        0 === this.pendingRequest
                            ? (d(this.currentForm).trigger("submit"),
                              this.submitButton &&
                                  d(
                                      "input:hidden[name='" +
                                          this.submitButton.name +
                                          "']",
                                      this.currentForm
                                  ).remove(),
                              (this.formSubmitted = !1))
                            : !e &&
                              0 === this.pendingRequest &&
                              this.formSubmitted &&
                              (d(this.currentForm).triggerHandler(
                                  "invalid-form",
                                  [this]
                              ),
                              (this.formSubmitted = !1));
                },
                previousValue: function (t, e) {
                    return (
                        (e = ("string" == typeof e && e) || "remote"),
                        d.data(t, "previousValue") ||
                            d.data(t, "previousValue", {
                                old: null,
                                valid: !0,
                                message: this.defaultMessage(t, { method: e }),
                            })
                    );
                },
                destroy: function () {
                    this.resetForm(),
                        d(this.currentForm)
                            .off(".validate")
                            .removeData("validator")
                            .find(".validate-equalTo-blur")
                            .off(".validate-equalTo")
                            .removeClass("validate-equalTo-blur")
                            .find(".validate-lessThan-blur")
                            .off(".validate-lessThan")
                            .removeClass("validate-lessThan-blur")
                            .find(".validate-lessThanEqual-blur")
                            .off(".validate-lessThanEqual")
                            .removeClass("validate-lessThanEqual-blur")
                            .find(".validate-greaterThanEqual-blur")
                            .off(".validate-greaterThanEqual")
                            .removeClass("validate-greaterThanEqual-blur")
                            .find(".validate-greaterThan-blur")
                            .off(".validate-greaterThan")
                            .removeClass("validate-greaterThan-blur");
                },
            },
            classRuleSettings: {
                required: { required: !0 },
                email: { email: !0 },
                url: { url: !0 },
                date: { date: !0 },
                dateISO: { dateISO: !0 },
                number: { number: !0 },
                digits: { digits: !0 },
                creditcard: { creditcard: !0 },
            },
            addClassRules: function (t, e) {
                t.constructor === String
                    ? (this.classRuleSettings[t] = e)
                    : d.extend(this.classRuleSettings, t);
            },
            classRules: function (t) {
                var e = {},
                    t = d(t).attr("class");
                return (
                    t &&
                        d.each(t.split(" "), function () {
                            this in d.validator.classRuleSettings &&
                                d.extend(
                                    e,
                                    d.validator.classRuleSettings[this]
                                );
                        }),
                    e
                );
            },
            normalizeAttributeRule: function (t, e, i, s) {
                /min|max|step/.test(i) &&
                    (null === e || /number|range|text/.test(e)) &&
                    ((s = Number(s)), isNaN(s) && (s = void 0)),
                    s || 0 === s
                        ? (t[i] = s)
                        : e === i &&
                          "range" !== e &&
                          (t["date" === e ? "dateISO" : i] = !0);
            },
            attributeRules: function (t) {
                var e,
                    i,
                    s = {},
                    n = d(t),
                    r = t.getAttribute("type");
                for (e in d.validator.methods)
                    (i =
                        "required" === e
                            ? !!(i = "" === (i = t.getAttribute(e)) ? !0 : i)
                            : n.attr(e)),
                        this.normalizeAttributeRule(s, r, e, i);
                return (
                    s.maxlength &&
                        /-1|2147483647|524288/.test(s.maxlength) &&
                        delete s.maxlength,
                    s
                );
            },
            dataRules: function (t) {
                var e,
                    i,
                    s = {},
                    n = d(t),
                    r = t.getAttribute("type");
                for (e in d.validator.methods)
                    "" ===
                        (i = n.data(
                            "rule" +
                                e.charAt(0).toUpperCase() +
                                e.substring(1).toLowerCase()
                        )) && (i = !0),
                        this.normalizeAttributeRule(s, r, e, i);
                return s;
            },
            staticRules: function (t) {
                var e = {},
                    i = d.data(t.form, "validator");
                return (e = i.settings.rules
                    ? d.validator.normalizeRule(i.settings.rules[t.name]) || {}
                    : e);
            },
            normalizeRules: function (s, n) {
                return (
                    d.each(s, function (t, e) {
                        if (!1 !== e) {
                            if (e.param || e.depends) {
                                var i = !0;
                                switch (typeof e.depends) {
                                    case "string":
                                        i = !!d(e.depends, n.form).length;
                                        break;
                                    case "function":
                                        i = e.depends.call(n, n);
                                }
                                i
                                    ? (s[t] = void 0 === e.param || e.param)
                                    : (d
                                          .data(n.form, "validator")
                                          .resetElements(d(n)),
                                      delete s[t]);
                            }
                        } else delete s[t];
                    }),
                    d.each(s, function (t, e) {
                        s[t] =
                            "function" == typeof e && "normalizer" !== t
                                ? e(n)
                                : e;
                    }),
                    d.each(["minlength", "maxlength"], function () {
                        s[this] && (s[this] = Number(s[this]));
                    }),
                    d.each(["rangelength", "range"], function () {
                        var t;
                        s[this] &&
                            (Array.isArray(s[this])
                                ? (s[this] = [
                                      Number(s[this][0]),
                                      Number(s[this][1]),
                                  ])
                                : "string" == typeof s[this] &&
                                  ((t = s[this]
                                      .replace(/[\[\]]/g, "")
                                      .split(/[\s,]+/)),
                                  (s[this] = [Number(t[0]), Number(t[1])])));
                    }),
                    d.validator.autoCreateRanges &&
                        (null != s.min &&
                            null != s.max &&
                            ((s.range = [s.min, s.max]),
                            delete s.min,
                            delete s.max),
                        null != s.minlength &&
                            null != s.maxlength &&
                            ((s.rangelength = [s.minlength, s.maxlength]),
                            delete s.minlength,
                            delete s.maxlength)),
                    s
                );
            },
            normalizeRule: function (t) {
                var e;
                return (
                    "string" == typeof t &&
                        ((e = {}),
                        d.each(t.split(/\s/), function () {
                            e[this] = !0;
                        }),
                        (t = e)),
                    t
                );
            },
            addMethod: function (t, e, i) {
                (d.validator.methods[t] = e),
                    (d.validator.messages[t] =
                        void 0 !== i ? i : d.validator.messages[t]),
                    e.length < 3 &&
                        d.validator.addClassRules(
                            t,
                            d.validator.normalizeRule(t)
                        );
            },
            methods: {
                required: function (t, e, i) {
                    if (!this.depend(i, e)) return "dependency-mismatch";
                    if ("select" !== e.nodeName.toLowerCase())
                        return this.checkable(e)
                            ? 0 < this.getLength(t, e)
                            : null != t && 0 < t.length;
                    e = d(e).val();
                    return e && 0 < e.length;
                },
                email: function (t, e) {
                    return (
                        this.optional(e) ||
                        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
                            t
                        )
                    );
                },
                url: function (t, e) {
                    return (
                        this.optional(e) ||
                        /^(?:(?:(?:https?|ftp):)?\/\/)(?:(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})+(?::(?:[^\]\[?\/<~#`!@$^&*()+=}|:";',>{ ]|%[0-9A-Fa-f]{2})*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                            t
                        )
                    );
                },
                date:
                    ((i = !1),
                    function (t, e) {
                        return (
                            i ||
                                ((i = !0),
                                this.settings.debug &&
                                    window.console &&
                                    console.warn(
                                        "The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`."
                                    )),
                            this.optional(e) ||
                                !/Invalid|NaN/.test(new Date(t).toString())
                        );
                    }),
                dateISO: function (t, e) {
                    return (
                        this.optional(e) ||
                        /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(
                            t
                        )
                    );
                },
                number: function (t, e) {
                    return (
                        this.optional(e) ||
                        /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                    );
                },
                digits: function (t, e) {
                    return this.optional(e) || /^\d+$/.test(t);
                },
                minlength: function (t, e, i) {
                    t = Array.isArray(t) ? t.length : this.getLength(t, e);
                    return this.optional(e) || i <= t;
                },
                maxlength: function (t, e, i) {
                    t = Array.isArray(t) ? t.length : this.getLength(t, e);
                    return this.optional(e) || t <= i;
                },
                rangelength: function (t, e, i) {
                    t = Array.isArray(t) ? t.length : this.getLength(t, e);
                    return this.optional(e) || (t >= i[0] && t <= i[1]);
                },
                min: function (t, e, i) {
                    return this.optional(e) || i <= t;
                },
                max: function (t, e, i) {
                    return this.optional(e) || t <= i;
                },
                range: function (t, e, i) {
                    return this.optional(e) || (t >= i[0] && t <= i[1]);
                },
                step: function (t, e, i) {
                    function s(t) {
                        return (t = ("" + t).match(/(?:\.(\d+))?$/)) && t[1]
                            ? t[1].length
                            : 0;
                    }
                    function n(t) {
                        return Math.round(t * Math.pow(10, r));
                    }
                    var r,
                        a = d(e).attr("type"),
                        o =
                            "Step attribute on input type " +
                            a +
                            " is not supported.",
                        l = new RegExp("\\b" + a + "\\b"),
                        h = !0;
                    if (a && !l.test(["text", "number", "range"].join()))
                        throw new Error(o);
                    return (
                        (r = s(i)),
                        (s(t) > r || n(t) % n(i) != 0) && (h = !1),
                        this.optional(e) || h
                    );
                },
                equalTo: function (t, e, i) {
                    i = d(i);
                    return (
                        this.settings.onfocusout &&
                            i.not(".validate-equalTo-blur").length &&
                            i
                                .addClass("validate-equalTo-blur")
                                .on("blur.validate-equalTo", function () {
                                    d(e).valid();
                                }),
                        t === i.val()
                    );
                },
                remote: function (s, n, t, r) {
                    if (this.optional(n)) return "dependency-mismatch";
                    var a,
                        e,
                        o = this.previousValue(
                            n,
                            (r = ("string" == typeof r && r) || "remote")
                        );
                    return (
                        this.settings.messages[n.name] ||
                            (this.settings.messages[n.name] = {}),
                        (o.originalMessage =
                            o.originalMessage ||
                            this.settings.messages[n.name][r]),
                        (this.settings.messages[n.name][r] = o.message),
                        (e = d.param(
                            d.extend(
                                { data: s },
                                (t = "string" == typeof t ? { url: t } : t).data
                            )
                        )),
                        o.old === e
                            ? o.valid
                            : ((o.old = e),
                              (a = this).startRequest(n),
                              ((e = {})[n.name] = s),
                              d.ajax(
                                  d.extend(
                                      !0,
                                      {
                                          mode: "abort",
                                          port: "validate" + n.name,
                                          dataType: "json",
                                          data: e,
                                          context: a.currentForm,
                                          success: function (t) {
                                              var e,
                                                  i = !0 === t || "true" === t;
                                              (a.settings.messages[n.name][r] =
                                                  o.originalMessage),
                                                  i
                                                      ? ((e = a.formSubmitted),
                                                        a.resetInternals(),
                                                        (a.toHide =
                                                            a.errorsFor(n)),
                                                        (a.formSubmitted = e),
                                                        a.successList.push(n),
                                                        (a.invalid[n.name] =
                                                            !1),
                                                        a.showErrors())
                                                      : ((e = {}),
                                                        (t =
                                                            t ||
                                                            a.defaultMessage(
                                                                n,
                                                                {
                                                                    method: r,
                                                                    parameters:
                                                                        s,
                                                                }
                                                            )),
                                                        (e[n.name] = o.message =
                                                            t),
                                                        (a.invalid[n.name] =
                                                            !0),
                                                        a.showErrors(e)),
                                                  (o.valid = i),
                                                  a.stopRequest(n, i);
                                          },
                                      },
                                      t
                                  )
                              ),
                              "pending")
                    );
                },
            },
        });
    var s,
        n = {};
    return (
        d.ajaxPrefilter
            ? d.ajaxPrefilter(function (t, e, i) {
                  var s = t.port;
                  "abort" === t.mode && (n[s] && n[s].abort(), (n[s] = i));
              })
            : ((s = d.ajax),
              (d.ajax = function (t) {
                  var e = ("mode" in t ? t : d.ajaxSettings).mode,
                      i = ("port" in t ? t : d.ajaxSettings).port;
                  return "abort" === e
                      ? (n[i] && n[i].abort(),
                        (n[i] = s.apply(this, arguments)),
                        n[i])
                      : s.apply(this, arguments);
              })),
        d
    );
});
!(function (i) {
    "use strict";
    "function" == typeof define && define.amd
        ? define(["jquery"], i)
        : "undefined" != typeof exports
        ? (module.exports = i(require("jquery")))
        : i(jQuery);
})(function (a) {
    "use strict";
    var o,
        r = window.Slick || {};
    (o = 0),
        ((r = function (i, e) {
            var t = this;
            (t.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: a(i),
                appendDots: a(i),
                arrows: !0,
                asNavFor: null,
                prevArrow:
                    '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow:
                    '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3e3,
                centerMode: !1,
                centerPadding: "50px",
                cssEase: "ease",
                customPaging: function (i, e) {
                    return a('<button type="button" />').text(e + 1);
                },
                dots: !1,
                dotsClass: "slick-dots",
                draggable: !0,
                easing: "linear",
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                focusOnChange: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: "ondemand",
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: "window",
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: "",
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1e3,
            }),
                (t.initials = {
                    animating: !1,
                    dragging: !1,
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
                    scrolling: !1,
                    slideCount: null,
                    slideWidth: null,
                    $slideTrack: null,
                    $slides: null,
                    sliding: !1,
                    slideOffset: 0,
                    swipeLeft: null,
                    swiping: !1,
                    $list: null,
                    touchObject: {},
                    transformsEnabled: !1,
                    unslicked: !1,
                }),
                a.extend(t, t.initials),
                (t.activeBreakpoint = null),
                (t.animType = null),
                (t.animProp = null),
                (t.breakpoints = []),
                (t.breakpointSettings = []),
                (t.cssTransitions = !1),
                (t.focussed = !1),
                (t.interrupted = !1),
                (t.hidden = "hidden"),
                (t.paused = !0),
                (t.positionProp = null),
                (t.respondTo = null),
                (t.rowCount = 1),
                (t.shouldClick = !0),
                (t.$slider = a(i)),
                (t.$slidesCache = null),
                (t.transformType = null),
                (t.transitionType = null),
                (t.visibilityChange = "visibilitychange"),
                (t.windowWidth = 0),
                (t.windowTimer = null),
                (i = a(i).data("slick") || {}),
                (t.options = a.extend({}, t.defaults, e, i)),
                (t.currentSlide = t.options.initialSlide),
                (t.originalSettings = t.options),
                void 0 !== document.mozHidden
                    ? ((t.hidden = "mozHidden"),
                      (t.visibilityChange = "mozvisibilitychange"))
                    : void 0 !== document.webkitHidden &&
                      ((t.hidden = "webkitHidden"),
                      (t.visibilityChange = "webkitvisibilitychange")),
                (t.autoPlay = a.proxy(t.autoPlay, t)),
                (t.autoPlayClear = a.proxy(t.autoPlayClear, t)),
                (t.autoPlayIterator = a.proxy(t.autoPlayIterator, t)),
                (t.changeSlide = a.proxy(t.changeSlide, t)),
                (t.clickHandler = a.proxy(t.clickHandler, t)),
                (t.selectHandler = a.proxy(t.selectHandler, t)),
                (t.setPosition = a.proxy(t.setPosition, t)),
                (t.swipeHandler = a.proxy(t.swipeHandler, t)),
                (t.dragHandler = a.proxy(t.dragHandler, t)),
                (t.keyHandler = a.proxy(t.keyHandler, t)),
                (t.instanceUid = o++),
                (t.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                t.registerBreakpoints(),
                t.init(!0);
        }).prototype.activateADA = function () {
            this.$slideTrack
                .find(".slick-active")
                .attr({ "aria-hidden": "false" })
                .find("a, input, button, select")
                .attr({ tabindex: "0" });
        }),
        (r.prototype.addSlide = r.prototype.slickAdd =
            function (i, e, t) {
                var o = this;
                if ("boolean" == typeof e) (t = e), (e = null);
                else if (e < 0 || e >= o.slideCount) return !1;
                o.unload(),
                    "number" == typeof e
                        ? 0 === e && 0 === o.$slides.length
                            ? a(i).appendTo(o.$slideTrack)
                            : t
                            ? a(i).insertBefore(o.$slides.eq(e))
                            : a(i).insertAfter(o.$slides.eq(e))
                        : !0 === t
                        ? a(i).prependTo(o.$slideTrack)
                        : a(i).appendTo(o.$slideTrack),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    o.$slides.each(function (i, e) {
                        a(e).attr("data-slick-index", i);
                    }),
                    (o.$slidesCache = o.$slides),
                    o.reinit();
            }),
        (r.prototype.animateHeight = function () {
            var i,
                e = this;
            1 === e.options.slidesToShow &&
                !0 === e.options.adaptiveHeight &&
                !1 === e.options.vertical &&
                ((i = e.$slides.eq(e.currentSlide).outerHeight(!0)),
                e.$list.animate({ height: i }, e.options.speed));
        }),
        (r.prototype.animateSlide = function (i, e) {
            var t = {},
                o = this;
            o.animateHeight(),
                !0 === o.options.rtl && !1 === o.options.vertical && (i = -i),
                !1 === o.transformsEnabled
                    ? !1 === o.options.vertical
                        ? o.$slideTrack.animate(
                              { left: i },
                              o.options.speed,
                              o.options.easing,
                              e
                          )
                        : o.$slideTrack.animate(
                              { top: i },
                              o.options.speed,
                              o.options.easing,
                              e
                          )
                    : !1 === o.cssTransitions
                    ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
                      a({ animStart: o.currentLeft }).animate(
                          { animStart: i },
                          {
                              duration: o.options.speed,
                              easing: o.options.easing,
                              step: function (i) {
                                  (i = Math.ceil(i)),
                                      !1 === o.options.vertical
                                          ? (t[o.animType] =
                                                "translate(" + i + "px, 0px)")
                                          : (t[o.animType] =
                                                "translate(0px," + i + "px)"),
                                      o.$slideTrack.css(t);
                              },
                              complete: function () {
                                  e && e.call();
                              },
                          }
                      ))
                    : (o.applyTransition(),
                      (i = Math.ceil(i)),
                      !1 === o.options.vertical
                          ? (t[o.animType] =
                                "translate3d(" + i + "px, 0px, 0px)")
                          : (t[o.animType] =
                                "translate3d(0px," + i + "px, 0px)"),
                      o.$slideTrack.css(t),
                      e &&
                          setTimeout(function () {
                              o.disableTransition(), e.call();
                          }, o.options.speed));
        }),
        (r.prototype.getNavTarget = function () {
            var i = this.options.asNavFor;
            return (i = i && null !== i ? a(i).not(this.$slider) : i);
        }),
        (r.prototype.asNavFor = function (e) {
            var i = this.getNavTarget();
            null !== i &&
                "object" == typeof i &&
                i.each(function () {
                    var i = a(this).slick("getSlick");
                    i.unslicked || i.slideHandler(e, !0);
                });
        }),
        (r.prototype.applyTransition = function (i) {
            var e = this,
                t = {};
            !1 === e.options.fade
                ? (t[e.transitionType] =
                      e.transformType +
                      " " +
                      e.options.speed +
                      "ms " +
                      e.options.cssEase)
                : (t[e.transitionType] =
                      "opacity " + e.options.speed + "ms " + e.options.cssEase),
                (!1 === e.options.fade ? e.$slideTrack : e.$slides.eq(i)).css(
                    t
                );
        }),
        (r.prototype.autoPlay = function () {
            var i = this;
            i.autoPlayClear(),
                i.slideCount > i.options.slidesToShow &&
                    (i.autoPlayTimer = setInterval(
                        i.autoPlayIterator,
                        i.options.autoplaySpeed
                    ));
        }),
        (r.prototype.autoPlayClear = function () {
            this.autoPlayTimer && clearInterval(this.autoPlayTimer);
        }),
        (r.prototype.autoPlayIterator = function () {
            var i = this,
                e = i.currentSlide + i.options.slidesToScroll;
            i.paused ||
                i.interrupted ||
                i.focussed ||
                (!1 === i.options.infinite &&
                    (1 === i.direction &&
                    i.currentSlide + 1 === i.slideCount - 1
                        ? (i.direction = 0)
                        : 0 === i.direction &&
                          ((e = i.currentSlide - i.options.slidesToScroll),
                          i.currentSlide - 1 == 0 && (i.direction = 1))),
                i.slideHandler(e));
        }),
        (r.prototype.buildArrows = function () {
            var i = this;
            !0 === i.options.arrows &&
                ((i.$prevArrow = a(i.options.prevArrow).addClass(
                    "slick-arrow"
                )),
                (i.$nextArrow = a(i.options.nextArrow).addClass("slick-arrow")),
                i.slideCount > i.options.slidesToShow
                    ? (i.$prevArrow
                          .removeClass("slick-hidden")
                          .removeAttr("aria-hidden tabindex"),
                      i.$nextArrow
                          .removeClass("slick-hidden")
                          .removeAttr("aria-hidden tabindex"),
                      i.htmlExpr.test(i.options.prevArrow) &&
                          i.$prevArrow.prependTo(i.options.appendArrows),
                      i.htmlExpr.test(i.options.nextArrow) &&
                          i.$nextArrow.appendTo(i.options.appendArrows),
                      !0 !== i.options.infinite &&
                          i.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"))
                    : i.$prevArrow
                          .add(i.$nextArrow)
                          .addClass("slick-hidden")
                          .attr({ "aria-disabled": "true", tabindex: "-1" }));
        }),
        (r.prototype.buildDots = function () {
            var i,
                e,
                t = this;
            if (!0 === t.options.dots) {
                for (
                    t.$slider.addClass("slick-dotted"),
                        e = a("<ul />").addClass(t.options.dotsClass),
                        i = 0;
                    i <= t.getDotCount();
                    i += 1
                )
                    e.append(
                        a("<li />").append(
                            t.options.customPaging.call(this, t, i)
                        )
                    );
                (t.$dots = e.appendTo(t.options.appendDots)),
                    t.$dots.find("li").first().addClass("slick-active");
            }
        }),
        (r.prototype.buildOut = function () {
            var i = this;
            (i.$slides = i.$slider
                .children(i.options.slide + ":not(.slick-cloned)")
                .addClass("slick-slide")),
                (i.slideCount = i.$slides.length),
                i.$slides.each(function (i, e) {
                    a(e)
                        .attr("data-slick-index", i)
                        .data("originalStyling", a(e).attr("style") || "");
                }),
                i.$slider.addClass("slick-slider"),
                (i.$slideTrack =
                    0 === i.slideCount
                        ? a('<div class="slick-track"/>').appendTo(i.$slider)
                        : i.$slides
                              .wrapAll('<div class="slick-track"/>')
                              .parent()),
                (i.$list = i.$slideTrack
                    .wrap('<div class="slick-list"/>')
                    .parent()),
                i.$slideTrack.css("opacity", 0),
                (!0 !== i.options.centerMode &&
                    !0 !== i.options.swipeToSlide) ||
                    (i.options.slidesToScroll = 1),
                a("img[data-lazy]", i.$slider)
                    .not("[src]")
                    .addClass("slick-loading"),
                i.setupInfinite(),
                i.buildArrows(),
                i.buildDots(),
                i.updateDots(),
                i.setSlideClasses(
                    "number" == typeof i.currentSlide ? i.currentSlide : 0
                ),
                !0 === i.options.draggable && i.$list.addClass("draggable");
        }),
        (r.prototype.buildRows = function () {
            var i,
                e,
                t,
                o = this,
                s = document.createDocumentFragment(),
                n = o.$slider.children();
            if (1 < o.options.rows) {
                for (
                    t = o.options.slidesPerRow * o.options.rows,
                        e = Math.ceil(n.length / t),
                        i = 0;
                    i < e;
                    i++
                ) {
                    for (
                        var r = document.createElement("div"), l = 0;
                        l < o.options.rows;
                        l++
                    ) {
                        for (
                            var d = document.createElement("div"), a = 0;
                            a < o.options.slidesPerRow;
                            a++
                        ) {
                            var c = i * t + (l * o.options.slidesPerRow + a);
                            n.get(c) && d.appendChild(n.get(c));
                        }
                        r.appendChild(d);
                    }
                    s.appendChild(r);
                }
                o.$slider.empty().append(s),
                    o.$slider
                        .children()
                        .children()
                        .children()
                        .css({
                            width: 100 / o.options.slidesPerRow + "%",
                            display: "inline-block",
                        });
            }
        }),
        (r.prototype.checkResponsive = function (i, e) {
            var t,
                o,
                s,
                n = this,
                r = !1,
                l = n.$slider.width(),
                d = window.innerWidth || a(window).width();
            if (
                ("window" === n.respondTo
                    ? (s = d)
                    : "slider" === n.respondTo
                    ? (s = l)
                    : "min" === n.respondTo && (s = Math.min(d, l)),
                n.options.responsive &&
                    n.options.responsive.length &&
                    null !== n.options.responsive)
            ) {
                for (t in ((o = null), n.breakpoints))
                    n.breakpoints.hasOwnProperty(t) &&
                        (!1 === n.originalSettings.mobileFirst
                            ? s < n.breakpoints[t] && (o = n.breakpoints[t])
                            : s > n.breakpoints[t] && (o = n.breakpoints[t]));
                null !== o
                    ? (null !== n.activeBreakpoint &&
                          o === n.activeBreakpoint &&
                          !e) ||
                      ((n.activeBreakpoint = o),
                      "unslick" === n.breakpointSettings[o]
                          ? n.unslick(o)
                          : ((n.options = a.extend(
                                {},
                                n.originalSettings,
                                n.breakpointSettings[o]
                            )),
                            !0 === i &&
                                (n.currentSlide = n.options.initialSlide),
                            n.refresh(i)),
                      (r = o))
                    : null !== n.activeBreakpoint &&
                      ((n.activeBreakpoint = null),
                      (n.options = n.originalSettings),
                      !0 === i && (n.currentSlide = n.options.initialSlide),
                      n.refresh(i),
                      (r = o)),
                    i || !1 === r || n.$slider.trigger("breakpoint", [n, r]);
            }
        }),
        (r.prototype.changeSlide = function (i, e) {
            var t,
                o = this,
                s = a(i.currentTarget);
            switch (
                (s.is("a") && i.preventDefault(),
                s.is("li") || (s = s.closest("li")),
                (t =
                    o.slideCount % o.options.slidesToScroll != 0
                        ? 0
                        : (o.slideCount - o.currentSlide) %
                          o.options.slidesToScroll),
                i.data.message)
            ) {
                case "previous":
                    (n =
                        0 == t
                            ? o.options.slidesToScroll
                            : o.options.slidesToShow - t),
                        o.slideCount > o.options.slidesToShow &&
                            o.slideHandler(o.currentSlide - n, !1, e);
                    break;
                case "next":
                    (n = 0 == t ? o.options.slidesToScroll : t),
                        o.slideCount > o.options.slidesToShow &&
                            o.slideHandler(o.currentSlide + n, !1, e);
                    break;
                case "index":
                    var n =
                        0 === i.data.index
                            ? 0
                            : i.data.index ||
                              s.index() * o.options.slidesToScroll;
                    o.slideHandler(o.checkNavigable(n), !1, e),
                        s.children().trigger("focus");
                    break;
                default:
                    return;
            }
        }),
        (r.prototype.checkNavigable = function (i) {
            var e = this.getNavigableIndexes(),
                t = 0;
            if (i > e[e.length - 1]) i = e[e.length - 1];
            else
                for (var o in e) {
                    if (i < e[o]) {
                        i = t;
                        break;
                    }
                    t = e[o];
                }
            return i;
        }),
        (r.prototype.cleanUpEvents = function () {
            var i = this;
            i.options.dots &&
                null !== i.$dots &&
                (a("li", i.$dots)
                    .off("click.slick", i.changeSlide)
                    .off("mouseenter.slick", a.proxy(i.interrupt, i, !0))
                    .off("mouseleave.slick", a.proxy(i.interrupt, i, !1)),
                !0 === i.options.accessibility &&
                    i.$dots.off("keydown.slick", i.keyHandler)),
                i.$slider.off("focus.slick blur.slick"),
                !0 === i.options.arrows &&
                    i.slideCount > i.options.slidesToShow &&
                    (i.$prevArrow &&
                        i.$prevArrow.off("click.slick", i.changeSlide),
                    i.$nextArrow &&
                        i.$nextArrow.off("click.slick", i.changeSlide),
                    !0 === i.options.accessibility &&
                        (i.$prevArrow &&
                            i.$prevArrow.off("keydown.slick", i.keyHandler),
                        i.$nextArrow &&
                            i.$nextArrow.off("keydown.slick", i.keyHandler))),
                i.$list.off("touchstart.slick mousedown.slick", i.swipeHandler),
                i.$list.off("touchmove.slick mousemove.slick", i.swipeHandler),
                i.$list.off("touchend.slick mouseup.slick", i.swipeHandler),
                i.$list.off(
                    "touchcancel.slick mouseleave.slick",
                    i.swipeHandler
                ),
                i.$list.off("click.slick", i.clickHandler),
                a(document).off(i.visibilityChange, i.visibility),
                i.cleanUpSlideEvents(),
                !0 === i.options.accessibility &&
                    i.$list.off("keydown.slick", i.keyHandler),
                !0 === i.options.focusOnSelect &&
                    a(i.$slideTrack)
                        .children()
                        .off("click.slick", i.selectHandler),
                a(window).off(
                    "orientationchange.slick.slick-" + i.instanceUid,
                    i.orientationChange
                ),
                a(window).off("resize.slick.slick-" + i.instanceUid, i.resize),
                a("[draggable!=true]", i.$slideTrack).off(
                    "dragstart",
                    i.preventDefault
                ),
                a(window).off(
                    "load.slick.slick-" + i.instanceUid,
                    i.setPosition
                );
        }),
        (r.prototype.cleanUpSlideEvents = function () {
            var i = this;
            i.$list.off("mouseenter.slick", a.proxy(i.interrupt, i, !0)),
                i.$list.off("mouseleave.slick", a.proxy(i.interrupt, i, !1));
        }),
        (r.prototype.cleanUpRows = function () {
            var i;
            1 < this.options.rows &&
                ((i = this.$slides.children().children()).removeAttr("style"),
                this.$slider.empty().append(i));
        }),
        (r.prototype.clickHandler = function (i) {
            !1 === this.shouldClick &&
                (i.stopImmediatePropagation(),
                i.stopPropagation(),
                i.preventDefault());
        }),
        (r.prototype.destroy = function (i) {
            var e = this;
            e.autoPlayClear(),
                (e.touchObject = {}),
                e.cleanUpEvents(),
                a(".slick-cloned", e.$slider).detach(),
                e.$dots && e.$dots.remove(),
                e.$prevArrow &&
                    e.$prevArrow.length &&
                    (e.$prevArrow
                        .removeClass("slick-disabled slick-arrow slick-hidden")
                        .removeAttr("aria-hidden aria-disabled tabindex")
                        .css("display", ""),
                    e.htmlExpr.test(e.options.prevArrow) &&
                        e.$prevArrow.remove()),
                e.$nextArrow &&
                    e.$nextArrow.length &&
                    (e.$nextArrow
                        .removeClass("slick-disabled slick-arrow slick-hidden")
                        .removeAttr("aria-hidden aria-disabled tabindex")
                        .css("display", ""),
                    e.htmlExpr.test(e.options.nextArrow) &&
                        e.$nextArrow.remove()),
                e.$slides &&
                    (e.$slides
                        .removeClass(
                            "slick-slide slick-active slick-center slick-visible slick-current"
                        )
                        .removeAttr("aria-hidden")
                        .removeAttr("data-slick-index")
                        .each(function () {
                            a(this).attr(
                                "style",
                                a(this).data("originalStyling")
                            );
                        }),
                    e.$slideTrack.children(this.options.slide).detach(),
                    e.$slideTrack.detach(),
                    e.$list.detach(),
                    e.$slider.append(e.$slides)),
                e.cleanUpRows(),
                e.$slider.removeClass("slick-slider"),
                e.$slider.removeClass("slick-initialized"),
                e.$slider.removeClass("slick-dotted"),
                (e.unslicked = !0),
                i || e.$slider.trigger("destroy", [e]);
        }),
        (r.prototype.disableTransition = function (i) {
            var e = {};
            (e[this.transitionType] = ""),
                (!1 === this.options.fade
                    ? this.$slideTrack
                    : this.$slides.eq(i)
                ).css(e);
        }),
        (r.prototype.fadeSlide = function (i, e) {
            var t = this;
            !1 === t.cssTransitions
                ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
                  t.$slides
                      .eq(i)
                      .animate(
                          { opacity: 1 },
                          t.options.speed,
                          t.options.easing,
                          e
                      ))
                : (t.applyTransition(i),
                  t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
                  e &&
                      setTimeout(function () {
                          t.disableTransition(i), e.call();
                      }, t.options.speed));
        }),
        (r.prototype.fadeSlideOut = function (i) {
            var e = this;
            !1 === e.cssTransitions
                ? e.$slides
                      .eq(i)
                      .animate(
                          { opacity: 0, zIndex: e.options.zIndex - 2 },
                          e.options.speed,
                          e.options.easing
                      )
                : (e.applyTransition(i),
                  e.$slides
                      .eq(i)
                      .css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
        }),
        (r.prototype.filterSlides = r.prototype.slickFilter =
            function (i) {
                var e = this;
                null !== i &&
                    ((e.$slidesCache = e.$slides),
                    e.unload(),
                    e.$slideTrack.children(this.options.slide).detach(),
                    e.$slidesCache.filter(i).appendTo(e.$slideTrack),
                    e.reinit());
            }),
        (r.prototype.focusHandler = function () {
            var t = this;
            t.$slider
                .off("focus.slick blur.slick")
                .on("focus.slick blur.slick", "*", function (i) {
                    i.stopImmediatePropagation();
                    var e = a(this);
                    setTimeout(function () {
                        t.options.pauseOnFocus &&
                            ((t.focussed = e.is(":focus")), t.autoPlay());
                    }, 0);
                });
        }),
        (r.prototype.getCurrent = r.prototype.slickCurrentSlide =
            function () {
                return this.currentSlide;
            }),
        (r.prototype.getDotCount = function () {
            var i = this,
                e = 0,
                t = 0,
                o = 0;
            if (!0 === i.options.infinite)
                if (i.slideCount <= i.options.slidesToShow) ++o;
                else
                    for (; e < i.slideCount; )
                        ++o,
                            (e = t + i.options.slidesToScroll),
                            (t +=
                                i.options.slidesToScroll <=
                                i.options.slidesToShow
                                    ? i.options.slidesToScroll
                                    : i.options.slidesToShow);
            else if (!0 === i.options.centerMode) o = i.slideCount;
            else if (i.options.asNavFor)
                for (; e < i.slideCount; )
                    ++o,
                        (e = t + i.options.slidesToScroll),
                        (t +=
                            i.options.slidesToScroll <= i.options.slidesToShow
                                ? i.options.slidesToScroll
                                : i.options.slidesToShow);
            else
                o =
                    1 +
                    Math.ceil(
                        (i.slideCount - i.options.slidesToShow) /
                            i.options.slidesToScroll
                    );
            return o - 1;
        }),
        (r.prototype.getLeft = function (i) {
            var e,
                t,
                o = this,
                s = 0;
            return (
                (o.slideOffset = 0),
                (e = o.$slides.first().outerHeight(!0)),
                !0 === o.options.infinite
                    ? (o.slideCount > o.options.slidesToShow &&
                          ((o.slideOffset =
                              o.slideWidth * o.options.slidesToShow * -1),
                          (t = -1),
                          !0 === o.options.vertical &&
                              !0 === o.options.centerMode &&
                              (2 === o.options.slidesToShow
                                  ? (t = -1.5)
                                  : 1 === o.options.slidesToShow && (t = -2)),
                          (s = e * o.options.slidesToShow * t)),
                      o.slideCount % o.options.slidesToScroll != 0 &&
                          i + o.options.slidesToScroll > o.slideCount &&
                          o.slideCount > o.options.slidesToShow &&
                          (s =
                              i > o.slideCount
                                  ? ((o.slideOffset =
                                        (o.options.slidesToShow -
                                            (i - o.slideCount)) *
                                        o.slideWidth *
                                        -1),
                                    (o.options.slidesToShow -
                                        (i - o.slideCount)) *
                                        e *
                                        -1)
                                  : ((o.slideOffset =
                                        (o.slideCount %
                                            o.options.slidesToScroll) *
                                        o.slideWidth *
                                        -1),
                                    (o.slideCount % o.options.slidesToScroll) *
                                        e *
                                        -1)))
                    : i + o.options.slidesToShow > o.slideCount &&
                      ((o.slideOffset =
                          (i + o.options.slidesToShow - o.slideCount) *
                          o.slideWidth),
                      (s = (i + o.options.slidesToShow - o.slideCount) * e)),
                o.slideCount <= o.options.slidesToShow &&
                    (s = o.slideOffset = 0),
                !0 === o.options.centerMode &&
                o.slideCount <= o.options.slidesToShow
                    ? (o.slideOffset =
                          (o.slideWidth * Math.floor(o.options.slidesToShow)) /
                              2 -
                          (o.slideWidth * o.slideCount) / 2)
                    : !0 === o.options.centerMode && !0 === o.options.infinite
                    ? (o.slideOffset +=
                          o.slideWidth *
                              Math.floor(o.options.slidesToShow / 2) -
                          o.slideWidth)
                    : !0 === o.options.centerMode &&
                      ((o.slideOffset = 0),
                      (o.slideOffset +=
                          o.slideWidth *
                          Math.floor(o.options.slidesToShow / 2))),
                (e =
                    !1 === o.options.vertical
                        ? i * o.slideWidth * -1 + o.slideOffset
                        : i * e * -1 + s),
                !0 === o.options.variableWidth &&
                    ((s =
                        o.slideCount <= o.options.slidesToShow ||
                        !1 === o.options.infinite
                            ? o.$slideTrack.children(".slick-slide").eq(i)
                            : o.$slideTrack
                                  .children(".slick-slide")
                                  .eq(i + o.options.slidesToShow)),
                    (e =
                        !0 === o.options.rtl
                            ? s[0]
                                ? -1 *
                                  (o.$slideTrack.width() -
                                      s[0].offsetLeft -
                                      s.width())
                                : 0
                            : s[0]
                            ? -1 * s[0].offsetLeft
                            : 0),
                    !0 === o.options.centerMode &&
                        ((s =
                            o.slideCount <= o.options.slidesToShow ||
                            !1 === o.options.infinite
                                ? o.$slideTrack.children(".slick-slide").eq(i)
                                : o.$slideTrack
                                      .children(".slick-slide")
                                      .eq(i + o.options.slidesToShow + 1)),
                        (e =
                            !0 === o.options.rtl
                                ? s[0]
                                    ? -1 *
                                      (o.$slideTrack.width() -
                                          s[0].offsetLeft -
                                          s.width())
                                    : 0
                                : s[0]
                                ? -1 * s[0].offsetLeft
                                : 0),
                        (e += (o.$list.width() - s.outerWidth()) / 2))),
                e
            );
        }),
        (r.prototype.getOption = r.prototype.slickGetOption =
            function (i) {
                return this.options[i];
            }),
        (r.prototype.getNavigableIndexes = function () {
            for (
                var i = this,
                    e = 0,
                    t = 0,
                    o = [],
                    s =
                        !1 === i.options.infinite
                            ? i.slideCount
                            : ((e = -1 * i.options.slidesToScroll),
                              (t = -1 * i.options.slidesToScroll),
                              2 * i.slideCount);
                e < s;

            )
                o.push(e),
                    (e = t + i.options.slidesToScroll),
                    (t +=
                        i.options.slidesToScroll <= i.options.slidesToShow
                            ? i.options.slidesToScroll
                            : i.options.slidesToShow);
            return o;
        }),
        (r.prototype.getSlick = function () {
            return this;
        }),
        (r.prototype.getSlideCount = function () {
            var t,
                o = this,
                s =
                    !0 === o.options.centerMode
                        ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
                        : 0;
            return !0 === o.options.swipeToSlide
                ? (o.$slideTrack.find(".slick-slide").each(function (i, e) {
                      if (
                          e.offsetLeft - s + a(e).outerWidth() / 2 >
                          -1 * o.swipeLeft
                      )
                          return (t = e), !1;
                  }),
                  Math.abs(a(t).attr("data-slick-index") - o.currentSlide) || 1)
                : o.options.slidesToScroll;
        }),
        (r.prototype.goTo = r.prototype.slickGoTo =
            function (i, e) {
                this.changeSlide(
                    { data: { message: "index", index: parseInt(i) } },
                    e
                );
            }),
        (r.prototype.init = function (i) {
            var e = this;
            a(e.$slider).hasClass("slick-initialized") ||
                (a(e.$slider).addClass("slick-initialized"),
                e.buildRows(),
                e.buildOut(),
                e.setProps(),
                e.startLoad(),
                e.loadSlider(),
                e.initializeEvents(),
                e.updateArrows(),
                e.updateDots(),
                e.checkResponsive(!0),
                e.focusHandler()),
                i && e.$slider.trigger("init", [e]),
                !0 === e.options.accessibility && e.initADA(),
                e.options.autoplay && ((e.paused = !1), e.autoPlay());
        }),
        (r.prototype.initADA = function () {
            var t = this,
                o = Math.ceil(t.slideCount / t.options.slidesToShow),
                s = t.getNavigableIndexes().filter(function (i) {
                    return 0 <= i && i < t.slideCount;
                });
            t.$slides
                .add(t.$slideTrack.find(".slick-cloned"))
                .attr({ "aria-hidden": "true", tabindex: "-1" })
                .find("a, input, button, select")
                .attr({ tabindex: "-1" }),
                null !== t.$dots &&
                    (t.$slides
                        .not(t.$slideTrack.find(".slick-cloned"))
                        .each(function (i) {
                            var e = s.indexOf(i);
                            a(this).attr({
                                role: "tabpanel",
                                id: "slick-slide" + t.instanceUid + i,
                                tabindex: -1,
                            }),
                                -1 !== e &&
                                    a(this).attr({
                                        "aria-describedby":
                                            "slick-slide-control" +
                                            t.instanceUid +
                                            e,
                                    });
                        }),
                    t.$dots
                        .attr("role", "tablist")
                        .find("li")
                        .each(function (i) {
                            var e = s[i];
                            a(this).attr({ role: "presentation" }),
                                a(this)
                                    .find("button")
                                    .first()
                                    .attr({
                                        role: "tab",
                                        id:
                                            "slick-slide-control" +
                                            t.instanceUid +
                                            i,
                                        "aria-controls":
                                            "slick-slide" + t.instanceUid + e,
                                        "aria-label": i + 1 + " of " + o,
                                        "aria-selected": null,
                                        tabindex: "-1",
                                    });
                        })
                        .eq(t.currentSlide)
                        .find("button")
                        .attr({ "aria-selected": "true", tabindex: "0" })
                        .end());
            for (
                var i = t.currentSlide, e = i + t.options.slidesToShow;
                i < e;
                i++
            )
                t.$slides.eq(i).attr("tabindex", 0);
            t.activateADA();
        }),
        (r.prototype.initArrowEvents = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow
                    .off("click.slick")
                    .on("click.slick", { message: "previous" }, i.changeSlide),
                i.$nextArrow
                    .off("click.slick")
                    .on("click.slick", { message: "next" }, i.changeSlide),
                !0 === i.options.accessibility &&
                    (i.$prevArrow.on("keydown.slick", i.keyHandler),
                    i.$nextArrow.on("keydown.slick", i.keyHandler)));
        }),
        (r.prototype.initDotEvents = function () {
            var i = this;
            !0 === i.options.dots &&
                (a("li", i.$dots).on(
                    "click.slick",
                    { message: "index" },
                    i.changeSlide
                ),
                !0 === i.options.accessibility &&
                    i.$dots.on("keydown.slick", i.keyHandler)),
                !0 === i.options.dots &&
                    !0 === i.options.pauseOnDotsHover &&
                    a("li", i.$dots)
                        .on("mouseenter.slick", a.proxy(i.interrupt, i, !0))
                        .on("mouseleave.slick", a.proxy(i.interrupt, i, !1));
        }),
        (r.prototype.initSlideEvents = function () {
            var i = this;
            i.options.pauseOnHover &&
                (i.$list.on("mouseenter.slick", a.proxy(i.interrupt, i, !0)),
                i.$list.on("mouseleave.slick", a.proxy(i.interrupt, i, !1)));
        }),
        (r.prototype.initializeEvents = function () {
            var i = this;
            i.initArrowEvents(),
                i.initDotEvents(),
                i.initSlideEvents(),
                i.$list.on(
                    "touchstart.slick mousedown.slick",
                    { action: "start" },
                    i.swipeHandler
                ),
                i.$list.on(
                    "touchmove.slick mousemove.slick",
                    { action: "move" },
                    i.swipeHandler
                ),
                i.$list.on(
                    "touchend.slick mouseup.slick",
                    { action: "end" },
                    i.swipeHandler
                ),
                i.$list.on(
                    "touchcancel.slick mouseleave.slick",
                    { action: "end" },
                    i.swipeHandler
                ),
                i.$list.on("click.slick", i.clickHandler),
                a(document).on(i.visibilityChange, a.proxy(i.visibility, i)),
                !0 === i.options.accessibility &&
                    i.$list.on("keydown.slick", i.keyHandler),
                !0 === i.options.focusOnSelect &&
                    a(i.$slideTrack)
                        .children()
                        .on("click.slick", i.selectHandler),
                a(window).on(
                    "orientationchange.slick.slick-" + i.instanceUid,
                    a.proxy(i.orientationChange, i)
                ),
                a(window).on(
                    "resize.slick.slick-" + i.instanceUid,
                    a.proxy(i.resize, i)
                ),
                a("[draggable!=true]", i.$slideTrack).on(
                    "dragstart",
                    i.preventDefault
                ),
                a(window).on(
                    "load.slick.slick-" + i.instanceUid,
                    i.setPosition
                ),
                a(i.setPosition);
        }),
        (r.prototype.initUI = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.show(), i.$nextArrow.show()),
                !0 === i.options.dots &&
                    i.slideCount > i.options.slidesToShow &&
                    i.$dots.show();
        }),
        (r.prototype.keyHandler = function (i) {
            var e = this;
            i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                (37 === i.keyCode && !0 === e.options.accessibility
                    ? e.changeSlide({
                          data: {
                              message:
                                  !0 === e.options.rtl ? "next" : "previous",
                          },
                      })
                    : 39 === i.keyCode &&
                      !0 === e.options.accessibility &&
                      e.changeSlide({
                          data: {
                              message:
                                  !0 === e.options.rtl ? "previous" : "next",
                          },
                      }));
        }),
        (r.prototype.lazyLoad = function () {
            function i(i) {
                a("img[data-lazy]", i).each(function () {
                    var i = a(this),
                        e = a(this).attr("data-lazy"),
                        t = a(this).attr("data-srcset"),
                        o =
                            a(this).attr("data-sizes") ||
                            n.$slider.attr("data-sizes"),
                        s = document.createElement("img");
                    (s.onload = function () {
                        i.animate({ opacity: 0 }, 100, function () {
                            t && (i.attr("srcset", t), o && i.attr("sizes", o)),
                                i
                                    .attr("src", e)
                                    .animate({ opacity: 1 }, 200, function () {
                                        i.removeAttr(
                                            "data-lazy data-srcset data-sizes"
                                        ).removeClass("slick-loading");
                                    }),
                                n.$slider.trigger("lazyLoaded", [n, i, e]);
                        });
                    }),
                        (s.onerror = function () {
                            i
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                                n.$slider.trigger("lazyLoadError", [n, i, e]);
                        }),
                        (s.src = e);
                });
            }
            var e,
                t,
                o,
                n = this;
            if (
                (!0 === n.options.centerMode
                    ? (o =
                          !0 === n.options.infinite
                              ? (t =
                                    n.currentSlide +
                                    (n.options.slidesToShow / 2 + 1)) +
                                n.options.slidesToShow +
                                2
                              : ((t = Math.max(
                                    0,
                                    n.currentSlide -
                                        (n.options.slidesToShow / 2 + 1)
                                )),
                                n.options.slidesToShow / 2 +
                                    1 +
                                    2 +
                                    n.currentSlide))
                    : ((t = n.options.infinite
                          ? n.options.slidesToShow + n.currentSlide
                          : n.currentSlide),
                      (o = Math.ceil(t + n.options.slidesToShow)),
                      !0 === n.options.fade &&
                          (0 < t && t--, o <= n.slideCount && o++)),
                (e = n.$slider.find(".slick-slide").slice(t, o)),
                "anticipated" === n.options.lazyLoad)
            )
                for (
                    var s = t - 1,
                        r = o,
                        l = n.$slider.find(".slick-slide"),
                        d = 0;
                    d < n.options.slidesToScroll;
                    d++
                )
                    s < 0 && (s = n.slideCount - 1),
                        (e = (e = e.add(l.eq(s))).add(l.eq(r))),
                        s--,
                        r++;
            i(e),
                n.slideCount <= n.options.slidesToShow
                    ? i(n.$slider.find(".slick-slide"))
                    : n.currentSlide >= n.slideCount - n.options.slidesToShow
                    ? i(
                          n.$slider
                              .find(".slick-cloned")
                              .slice(0, n.options.slidesToShow)
                      )
                    : 0 === n.currentSlide &&
                      i(
                          n.$slider
                              .find(".slick-cloned")
                              .slice(-1 * n.options.slidesToShow)
                      );
        }),
        (r.prototype.loadSlider = function () {
            var i = this;
            i.setPosition(),
                i.$slideTrack.css({ opacity: 1 }),
                i.$slider.removeClass("slick-loading"),
                i.initUI(),
                "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
        }),
        (r.prototype.next = r.prototype.slickNext =
            function () {
                this.changeSlide({ data: { message: "next" } });
            }),
        (r.prototype.orientationChange = function () {
            this.checkResponsive(), this.setPosition();
        }),
        (r.prototype.pause = r.prototype.slickPause =
            function () {
                this.autoPlayClear(), (this.paused = !0);
            }),
        (r.prototype.play = r.prototype.slickPlay =
            function () {
                var i = this;
                i.autoPlay(),
                    (i.options.autoplay = !0),
                    (i.paused = !1),
                    (i.focussed = !1),
                    (i.interrupted = !1);
            }),
        (r.prototype.postSlide = function (i) {
            var e = this;
            e.unslicked ||
                (e.$slider.trigger("afterChange", [e, i]),
                (e.animating = !1),
                e.slideCount > e.options.slidesToShow && e.setPosition(),
                (e.swipeLeft = null),
                e.options.autoplay && e.autoPlay(),
                !0 === e.options.accessibility &&
                    (e.initADA(),
                    e.options.focusOnChange &&
                        a(e.$slides.get(e.currentSlide))
                            .attr("tabindex", 0)
                            .focus()));
        }),
        (r.prototype.prev = r.prototype.slickPrev =
            function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
        (r.prototype.preventDefault = function (i) {
            i.preventDefault();
        }),
        (r.prototype.progressiveLazyLoad = function (i) {
            i = i || 1;
            var e,
                t,
                o,
                s,
                n = this,
                r = a("img[data-lazy]", n.$slider);
            r.length
                ? ((e = r.first()),
                  (t = e.attr("data-lazy")),
                  (o = e.attr("data-srcset")),
                  (s = e.attr("data-sizes") || n.$slider.attr("data-sizes")),
                  ((r = document.createElement("img")).onload = function () {
                      o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                          e
                              .attr("src", t)
                              .removeAttr("data-lazy data-srcset data-sizes")
                              .removeClass("slick-loading"),
                          !0 === n.options.adaptiveHeight && n.setPosition(),
                          n.$slider.trigger("lazyLoaded", [n, e, t]),
                          n.progressiveLazyLoad();
                  }),
                  (r.onerror = function () {
                      i < 3
                          ? setTimeout(function () {
                                n.progressiveLazyLoad(i + 1);
                            }, 500)
                          : (e
                                .removeAttr("data-lazy")
                                .removeClass("slick-loading")
                                .addClass("slick-lazyload-error"),
                            n.$slider.trigger("lazyLoadError", [n, e, t]),
                            n.progressiveLazyLoad());
                  }),
                  (r.src = t))
                : n.$slider.trigger("allImagesLoaded", [n]);
        }),
        (r.prototype.refresh = function (i) {
            var e = this,
                t = e.slideCount - e.options.slidesToShow;
            !e.options.infinite && e.currentSlide > t && (e.currentSlide = t),
                e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
                (t = e.currentSlide),
                e.destroy(!0),
                a.extend(e, e.initials, { currentSlide: t }),
                e.init(),
                i ||
                    e.changeSlide({ data: { message: "index", index: t } }, !1);
        }),
        (r.prototype.registerBreakpoints = function () {
            var i,
                e,
                t,
                o = this,
                s = o.options.responsive || null;
            if ("array" === a.type(s) && s.length) {
                for (i in ((o.respondTo = o.options.respondTo || "window"), s))
                    if (((t = o.breakpoints.length - 1), s.hasOwnProperty(i))) {
                        for (e = s[i].breakpoint; 0 <= t; )
                            o.breakpoints[t] &&
                                o.breakpoints[t] === e &&
                                o.breakpoints.splice(t, 1),
                                t--;
                        o.breakpoints.push(e),
                            (o.breakpointSettings[e] = s[i].settings);
                    }
                o.breakpoints.sort(function (i, e) {
                    return o.options.mobileFirst ? i - e : e - i;
                });
            }
        }),
        (r.prototype.reinit = function () {
            var i = this;
            (i.$slides = i.$slideTrack
                .children(i.options.slide)
                .addClass("slick-slide")),
                (i.slideCount = i.$slides.length),
                i.currentSlide >= i.slideCount &&
                    0 !== i.currentSlide &&
                    (i.currentSlide =
                        i.currentSlide - i.options.slidesToScroll),
                i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0),
                i.registerBreakpoints(),
                i.setProps(),
                i.setupInfinite(),
                i.buildArrows(),
                i.updateArrows(),
                i.initArrowEvents(),
                i.buildDots(),
                i.updateDots(),
                i.initDotEvents(),
                i.cleanUpSlideEvents(),
                i.initSlideEvents(),
                i.checkResponsive(!1, !0),
                !0 === i.options.focusOnSelect &&
                    a(i.$slideTrack)
                        .children()
                        .on("click.slick", i.selectHandler),
                i.setSlideClasses(
                    "number" == typeof i.currentSlide ? i.currentSlide : 0
                ),
                i.setPosition(),
                i.focusHandler(),
                (i.paused = !i.options.autoplay),
                i.autoPlay(),
                i.$slider.trigger("reInit", [i]);
        }),
        (r.prototype.resize = function () {
            var i = this;
            a(window).width() !== i.windowWidth &&
                (clearTimeout(i.windowDelay),
                (i.windowDelay = window.setTimeout(function () {
                    (i.windowWidth = a(window).width()),
                        i.checkResponsive(),
                        i.unslicked || i.setPosition();
                }, 50)));
        }),
        (r.prototype.removeSlide = r.prototype.slickRemove =
            function (i, e, t) {
                var o = this;
                if (
                    ((i =
                        "boolean" == typeof i
                            ? !0 === (e = i)
                                ? 0
                                : o.slideCount - 1
                            : !0 === e
                            ? --i
                            : i),
                    o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
                )
                    return !1;
                o.unload(),
                    (!0 === t
                        ? o.$slideTrack.children()
                        : o.$slideTrack.children(this.options.slide).eq(i)
                    ).remove(),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    (o.$slidesCache = o.$slides),
                    o.reinit();
            }),
        (r.prototype.setCSS = function (i) {
            var e,
                t,
                o = this,
                s = {};
            !0 === o.options.rtl && (i = -i),
                (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
                (s[o.positionProp] = i),
                !1 === o.transformsEnabled ||
                    (!(s = {}) === o.cssTransitions
                        ? (s[o.animType] = "translate(" + e + ", " + t + ")")
                        : (s[o.animType] =
                              "translate3d(" + e + ", " + t + ", 0px)")),
                o.$slideTrack.css(s);
        }),
        (r.prototype.setDimensions = function () {
            var i = this;
            !1 === i.options.vertical
                ? !0 === i.options.centerMode &&
                  i.$list.css({ padding: "0px " + i.options.centerPadding })
                : (i.$list.height(
                      i.$slides.first().outerHeight(!0) * i.options.slidesToShow
                  ),
                  !0 === i.options.centerMode &&
                      i.$list.css({
                          padding: i.options.centerPadding + " 0px",
                      })),
                (i.listWidth = i.$list.width()),
                (i.listHeight = i.$list.height()),
                !1 === i.options.vertical && !1 === i.options.variableWidth
                    ? ((i.slideWidth = Math.ceil(
                          i.listWidth / i.options.slidesToShow
                      )),
                      i.$slideTrack.width(
                          Math.ceil(
                              i.slideWidth *
                                  i.$slideTrack.children(".slick-slide").length
                          )
                      ))
                    : !0 === i.options.variableWidth
                    ? i.$slideTrack.width(5e3 * i.slideCount)
                    : ((i.slideWidth = Math.ceil(i.listWidth)),
                      i.$slideTrack.height(
                          Math.ceil(
                              i.$slides.first().outerHeight(!0) *
                                  i.$slideTrack.children(".slick-slide").length
                          )
                      ));
            var e =
                i.$slides.first().outerWidth(!0) - i.$slides.first().width();
            !1 === i.options.variableWidth &&
                i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
        }),
        (r.prototype.setFade = function () {
            var t,
                o = this;
            o.$slides.each(function (i, e) {
                (t = o.slideWidth * i * -1),
                    !0 === o.options.rtl
                        ? a(e).css({
                              position: "relative",
                              right: t,
                              top: 0,
                              zIndex: o.options.zIndex - 2,
                              opacity: 0,
                          })
                        : a(e).css({
                              position: "relative",
                              left: t,
                              top: 0,
                              zIndex: o.options.zIndex - 2,
                              opacity: 0,
                          });
            }),
                o.$slides
                    .eq(o.currentSlide)
                    .css({ zIndex: o.options.zIndex - 1, opacity: 1 });
        }),
        (r.prototype.setHeight = function () {
            var i,
                e = this;
            1 === e.options.slidesToShow &&
                !0 === e.options.adaptiveHeight &&
                !1 === e.options.vertical &&
                ((i = e.$slides.eq(e.currentSlide).outerHeight(!0)),
                e.$list.css("height", i));
        }),
        (r.prototype.setOption = r.prototype.slickSetOption =
            function () {
                var i,
                    e,
                    t,
                    o,
                    s,
                    n = this,
                    r = !1;
                if (
                    ("object" === a.type(arguments[0])
                        ? ((t = arguments[0]),
                          (r = arguments[1]),
                          (s = "multiple"))
                        : "string" === a.type(arguments[0]) &&
                          ((t = arguments[0]),
                          (o = arguments[1]),
                          (r = arguments[2]),
                          "responsive" === arguments[0] &&
                          "array" === a.type(arguments[1])
                              ? (s = "responsive")
                              : void 0 !== arguments[1] && (s = "single")),
                    "single" === s)
                )
                    n.options[t] = o;
                else if ("multiple" === s)
                    a.each(t, function (i, e) {
                        n.options[i] = e;
                    });
                else if ("responsive" === s)
                    for (e in o)
                        if ("array" !== a.type(n.options.responsive))
                            n.options.responsive = [o[e]];
                        else {
                            for (i = n.options.responsive.length - 1; 0 <= i; )
                                n.options.responsive[i].breakpoint ===
                                    o[e].breakpoint &&
                                    n.options.responsive.splice(i, 1),
                                    i--;
                            n.options.responsive.push(o[e]);
                        }
                r && (n.unload(), n.reinit());
            }),
        (r.prototype.setPosition = function () {
            var i = this;
            i.setDimensions(),
                i.setHeight(),
                !1 === i.options.fade
                    ? i.setCSS(i.getLeft(i.currentSlide))
                    : i.setFade(),
                i.$slider.trigger("setPosition", [i]);
        }),
        (r.prototype.setProps = function () {
            var i = this,
                e = document.body.style;
            (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
                "top" === i.positionProp
                    ? i.$slider.addClass("slick-vertical")
                    : i.$slider.removeClass("slick-vertical"),
                (void 0 === e.WebkitTransition &&
                    void 0 === e.MozTransition &&
                    void 0 === e.msTransition) ||
                    (!0 === i.options.useCSS && (i.cssTransitions = !0)),
                i.options.fade &&
                    ("number" == typeof i.options.zIndex
                        ? i.options.zIndex < 3 && (i.options.zIndex = 3)
                        : (i.options.zIndex = i.defaults.zIndex)),
                void 0 !== e.OTransform &&
                    ((i.animType = "OTransform"),
                    (i.transformType = "-o-transform"),
                    (i.transitionType = "OTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective &&
                        (i.animType = !1)),
                void 0 !== e.MozTransform &&
                    ((i.animType = "MozTransform"),
                    (i.transformType = "-moz-transform"),
                    (i.transitionType = "MozTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.MozPerspective &&
                        (i.animType = !1)),
                void 0 !== e.webkitTransform &&
                    ((i.animType = "webkitTransform"),
                    (i.transformType = "-webkit-transform"),
                    (i.transitionType = "webkitTransition"),
                    void 0 === e.perspectiveProperty &&
                        void 0 === e.webkitPerspective &&
                        (i.animType = !1)),
                void 0 !== e.msTransform &&
                    ((i.animType = "msTransform"),
                    (i.transformType = "-ms-transform"),
                    (i.transitionType = "msTransition"),
                    void 0 === e.msTransform && (i.animType = !1)),
                void 0 !== e.transform &&
                    !1 !== i.animType &&
                    ((i.animType = "transform"),
                    (i.transformType = "transform"),
                    (i.transitionType = "transition")),
                (i.transformsEnabled =
                    i.options.useTransform &&
                    null !== i.animType &&
                    !1 !== i.animType);
        }),
        (r.prototype.setSlideClasses = function (i) {
            var e,
                t,
                o,
                s = this,
                n = s.$slider
                    .find(".slick-slide")
                    .removeClass("slick-active slick-center slick-current")
                    .attr("aria-hidden", "true");
            s.$slides.eq(i).addClass("slick-current"),
                !0 === s.options.centerMode
                    ? ((t = s.options.slidesToShow % 2 == 0 ? 1 : 0),
                      (o = Math.floor(s.options.slidesToShow / 2)),
                      !0 === s.options.infinite &&
                          (o <= i && i <= s.slideCount - 1 - o
                              ? s.$slides
                                    .slice(i - o + t, i + o + 1)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")
                              : ((e = s.options.slidesToShow + i),
                                n
                                    .slice(e - o + 1 + t, e + o + 2)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")),
                          0 === i
                              ? n
                                    .eq(n.length - 1 - s.options.slidesToShow)
                                    .addClass("slick-center")
                              : i === s.slideCount - 1 &&
                                n
                                    .eq(s.options.slidesToShow)
                                    .addClass("slick-center")),
                      s.$slides.eq(i).addClass("slick-center"))
                    : 0 <= i && i <= s.slideCount - s.options.slidesToShow
                    ? s.$slides
                          .slice(i, i + s.options.slidesToShow)
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")
                    : n.length <= s.options.slidesToShow
                    ? n.addClass("slick-active").attr("aria-hidden", "false")
                    : ((o = s.slideCount % s.options.slidesToShow),
                      (e =
                          !0 === s.options.infinite
                              ? s.options.slidesToShow + i
                              : i),
                      (s.options.slidesToShow == s.options.slidesToScroll &&
                      s.slideCount - i < s.options.slidesToShow
                          ? n.slice(e - (s.options.slidesToShow - o), e + o)
                          : n.slice(e, e + s.options.slidesToShow)
                      )
                          .addClass("slick-active")
                          .attr("aria-hidden", "false")),
                ("ondemand" !== s.options.lazyLoad &&
                    "anticipated" !== s.options.lazyLoad) ||
                    s.lazyLoad();
        }),
        (r.prototype.setupInfinite = function () {
            var i,
                e,
                t,
                o = this;
            if (
                (!0 === o.options.fade && (o.options.centerMode = !1),
                !0 === o.options.infinite &&
                    !1 === o.options.fade &&
                    ((e = null), o.slideCount > o.options.slidesToShow))
            ) {
                for (
                    t =
                        !0 === o.options.centerMode
                            ? o.options.slidesToShow + 1
                            : o.options.slidesToShow,
                        i = o.slideCount;
                    i > o.slideCount - t;
                    --i
                )
                    a(o.$slides[(e = i - 1)])
                        .clone(!0)
                        .attr("id", "")
                        .attr("data-slick-index", e - o.slideCount)
                        .prependTo(o.$slideTrack)
                        .addClass("slick-cloned");
                for (i = 0; i < t + o.slideCount; i += 1)
                    a(o.$slides[(e = i)])
                        .clone(!0)
                        .attr("id", "")
                        .attr("data-slick-index", e + o.slideCount)
                        .appendTo(o.$slideTrack)
                        .addClass("slick-cloned");
                o.$slideTrack
                    .find(".slick-cloned")
                    .find("[id]")
                    .each(function () {
                        a(this).attr("id", "");
                    });
            }
        }),
        (r.prototype.interrupt = function (i) {
            i || this.autoPlay(), (this.interrupted = i);
        }),
        (r.prototype.selectHandler = function (i) {
            (i = a(i.target).is(".slick-slide")
                ? a(i.target)
                : a(i.target).parents(".slick-slide")),
                (i = (i = parseInt(i.attr("data-slick-index"))) || 0);
            this.slideCount <= this.options.slidesToShow
                ? this.slideHandler(i, !1, !0)
                : this.slideHandler(i);
        }),
        (r.prototype.slideHandler = function (i, e, t) {
            var o,
                s,
                n,
                r,
                l = this;
            if (
                ((e = e || !1),
                !(
                    (!0 === l.animating && !0 === l.options.waitForAnimate) ||
                    (!0 === l.options.fade && l.currentSlide === i)
                ))
            )
                if (
                    (!1 === e && l.asNavFor(i),
                    (r = l.getLeft((o = i))),
                    (e = l.getLeft(l.currentSlide)),
                    (l.currentLeft = null === l.swipeLeft ? e : l.swipeLeft),
                    !1 === l.options.infinite &&
                        !1 === l.options.centerMode &&
                        (i < 0 ||
                            i > l.getDotCount() * l.options.slidesToScroll))
                )
                    !1 === l.options.fade &&
                        ((o = l.currentSlide),
                        !0 !== t
                            ? l.animateSlide(e, function () {
                                  l.postSlide(o);
                              })
                            : l.postSlide(o));
                else if (
                    !1 === l.options.infinite &&
                    !0 === l.options.centerMode &&
                    (i < 0 || i > l.slideCount - l.options.slidesToScroll)
                )
                    !1 === l.options.fade &&
                        ((o = l.currentSlide),
                        !0 !== t
                            ? l.animateSlide(e, function () {
                                  l.postSlide(o);
                              })
                            : l.postSlide(o));
                else {
                    if (
                        (l.options.autoplay && clearInterval(l.autoPlayTimer),
                        (s =
                            o < 0
                                ? l.slideCount % l.options.slidesToScroll != 0
                                    ? l.slideCount -
                                      (l.slideCount % l.options.slidesToScroll)
                                    : l.slideCount + o
                                : o >= l.slideCount
                                ? l.slideCount % l.options.slidesToScroll != 0
                                    ? 0
                                    : o - l.slideCount
                                : o),
                        (l.animating = !0),
                        l.$slider.trigger("beforeChange", [
                            l,
                            l.currentSlide,
                            s,
                        ]),
                        (e = l.currentSlide),
                        (l.currentSlide = s),
                        l.setSlideClasses(l.currentSlide),
                        l.options.asNavFor &&
                            (n = (n = l.getNavTarget()).slick("getSlick"))
                                .slideCount <= n.options.slidesToShow &&
                            n.setSlideClasses(l.currentSlide),
                        l.updateDots(),
                        l.updateArrows(),
                        !0 === l.options.fade)
                    )
                        return (
                            !0 !== t
                                ? (l.fadeSlideOut(e),
                                  l.fadeSlide(s, function () {
                                      l.postSlide(s);
                                  }))
                                : l.postSlide(s),
                            void l.animateHeight()
                        );
                    !0 !== t
                        ? l.animateSlide(r, function () {
                              l.postSlide(s);
                          })
                        : l.postSlide(s);
                }
        }),
        (r.prototype.startLoad = function () {
            var i = this;
            !0 === i.options.arrows &&
                i.slideCount > i.options.slidesToShow &&
                (i.$prevArrow.hide(), i.$nextArrow.hide()),
                !0 === i.options.dots &&
                    i.slideCount > i.options.slidesToShow &&
                    i.$dots.hide(),
                i.$slider.addClass("slick-loading");
        }),
        (r.prototype.swipeDirection = function () {
            var i = this,
                e = i.touchObject.startX - i.touchObject.curX,
                t = i.touchObject.startY - i.touchObject.curY,
                e = Math.atan2(t, e);
            return ((e =
                (e = Math.round((180 * e) / Math.PI)) < 0
                    ? 360 - Math.abs(e)
                    : e) <= 45 &&
                0 <= e) ||
                (e <= 360 && 315 <= e)
                ? !1 === i.options.rtl
                    ? "left"
                    : "right"
                : 135 <= e && e <= 225
                ? !1 === i.options.rtl
                    ? "right"
                    : "left"
                : !0 === i.options.verticalSwiping
                ? 35 <= e && e <= 135
                    ? "down"
                    : "up"
                : "vertical";
        }),
        (r.prototype.swipeEnd = function (i) {
            var e,
                t,
                o = this;
            if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
                return (o.scrolling = !1);
            if (
                ((o.interrupted = !1),
                (o.shouldClick = !(10 < o.touchObject.swipeLength)),
                void 0 === o.touchObject.curX)
            )
                return !1;
            if (
                (!0 === o.touchObject.edgeHit &&
                    o.$slider.trigger("edge", [o, o.swipeDirection()]),
                o.touchObject.swipeLength >= o.touchObject.minSwipe)
            ) {
                switch ((t = o.swipeDirection())) {
                    case "left":
                    case "down":
                        (e = o.options.swipeToSlide
                            ? o.checkNavigable(
                                  o.currentSlide + o.getSlideCount()
                              )
                            : o.currentSlide + o.getSlideCount()),
                            (o.currentDirection = 0);
                        break;
                    case "right":
                    case "up":
                        (e = o.options.swipeToSlide
                            ? o.checkNavigable(
                                  o.currentSlide - o.getSlideCount()
                              )
                            : o.currentSlide - o.getSlideCount()),
                            (o.currentDirection = 1);
                }
                "vertical" != t &&
                    (o.slideHandler(e),
                    (o.touchObject = {}),
                    o.$slider.trigger("swipe", [o, t]));
            } else
                o.touchObject.startX !== o.touchObject.curX &&
                    (o.slideHandler(o.currentSlide), (o.touchObject = {}));
        }),
        (r.prototype.swipeHandler = function (i) {
            var e = this;
            if (
                !(
                    !1 === e.options.swipe ||
                    ("ontouchend" in document && !1 === e.options.swipe) ||
                    (!1 === e.options.draggable &&
                        -1 !== i.type.indexOf("mouse"))
                )
            )
                switch (
                    ((e.touchObject.fingerCount =
                        i.originalEvent && void 0 !== i.originalEvent.touches
                            ? i.originalEvent.touches.length
                            : 1),
                    (e.touchObject.minSwipe =
                        e.listWidth / e.options.touchThreshold),
                    !0 === e.options.verticalSwiping &&
                        (e.touchObject.minSwipe =
                            e.listHeight / e.options.touchThreshold),
                    i.data.action)
                ) {
                    case "start":
                        e.swipeStart(i);
                        break;
                    case "move":
                        e.swipeMove(i);
                        break;
                    case "end":
                        e.swipeEnd(i);
                }
        }),
        (r.prototype.swipeMove = function (i) {
            var e,
                t,
                o = this,
                s = void 0 !== i.originalEvent ? i.originalEvent.touches : null;
            return (
                !(!o.dragging || o.scrolling || (s && 1 !== s.length)) &&
                ((e = o.getLeft(o.currentSlide)),
                (o.touchObject.curX = void 0 !== s ? s[0].pageX : i.clientX),
                (o.touchObject.curY = void 0 !== s ? s[0].pageY : i.clientY),
                (o.touchObject.swipeLength = Math.round(
                    Math.sqrt(
                        Math.pow(o.touchObject.curX - o.touchObject.startX, 2)
                    )
                )),
                (t = Math.round(
                    Math.sqrt(
                        Math.pow(o.touchObject.curY - o.touchObject.startY, 2)
                    )
                )),
                !o.options.verticalSwiping && !o.swiping && 4 < t
                    ? !(o.scrolling = !0)
                    : (!0 === o.options.verticalSwiping &&
                          (o.touchObject.swipeLength = t),
                      (s = o.swipeDirection()),
                      void 0 !== i.originalEvent &&
                          4 < o.touchObject.swipeLength &&
                          ((o.swiping = !0), i.preventDefault()),
                      (t =
                          (!1 === o.options.rtl ? 1 : -1) *
                          (o.touchObject.curX > o.touchObject.startX ? 1 : -1)),
                      !0 === o.options.verticalSwiping &&
                          (t =
                              o.touchObject.curY > o.touchObject.startY
                                  ? 1
                                  : -1),
                      (i = o.touchObject.swipeLength),
                      (o.touchObject.edgeHit = !1) === o.options.infinite &&
                          ((0 === o.currentSlide && "right" === s) ||
                              (o.currentSlide >= o.getDotCount() &&
                                  "left" === s)) &&
                          ((i =
                              o.touchObject.swipeLength *
                              o.options.edgeFriction),
                          (o.touchObject.edgeHit = !0)),
                      !1 === o.options.vertical
                          ? (o.swipeLeft = e + i * t)
                          : (o.swipeLeft =
                                e + i * (o.$list.height() / o.listWidth) * t),
                      !0 === o.options.verticalSwiping &&
                          (o.swipeLeft = e + i * t),
                      !0 !== o.options.fade &&
                          !1 !== o.options.touchMove &&
                          (!0 === o.animating
                              ? ((o.swipeLeft = null), !1)
                              : void o.setCSS(o.swipeLeft))))
            );
        }),
        (r.prototype.swipeStart = function (i) {
            var e,
                t = this;
            if (
                ((t.interrupted = !0),
                1 !== t.touchObject.fingerCount ||
                    t.slideCount <= t.options.slidesToShow)
            )
                return !(t.touchObject = {});
            void 0 !== i.originalEvent &&
                void 0 !== i.originalEvent.touches &&
                (e = i.originalEvent.touches[0]),
                (t.touchObject.startX = t.touchObject.curX =
                    void 0 !== e ? e.pageX : i.clientX),
                (t.touchObject.startY = t.touchObject.curY =
                    void 0 !== e ? e.pageY : i.clientY),
                (t.dragging = !0);
        }),
        (r.prototype.unfilterSlides = r.prototype.slickUnfilter =
            function () {
                var i = this;
                null !== i.$slidesCache &&
                    (i.unload(),
                    i.$slideTrack.children(this.options.slide).detach(),
                    i.$slidesCache.appendTo(i.$slideTrack),
                    i.reinit());
            }),
        (r.prototype.unload = function () {
            var i = this;
            a(".slick-cloned", i.$slider).remove(),
                i.$dots && i.$dots.remove(),
                i.$prevArrow &&
                    i.htmlExpr.test(i.options.prevArrow) &&
                    i.$prevArrow.remove(),
                i.$nextArrow &&
                    i.htmlExpr.test(i.options.nextArrow) &&
                    i.$nextArrow.remove(),
                i.$slides
                    .removeClass(
                        "slick-slide slick-active slick-visible slick-current"
                    )
                    .attr("aria-hidden", "true")
                    .css("width", "");
        }),
        (r.prototype.unslick = function (i) {
            this.$slider.trigger("unslick", [this, i]), this.destroy();
        }),
        (r.prototype.updateArrows = function () {
            var i = this;
            Math.floor(i.options.slidesToShow / 2),
                !0 === i.options.arrows &&
                    i.slideCount > i.options.slidesToShow &&
                    !i.options.infinite &&
                    (i.$prevArrow
                        .removeClass("slick-disabled")
                        .attr("aria-disabled", "false"),
                    i.$nextArrow
                        .removeClass("slick-disabled")
                        .attr("aria-disabled", "false"),
                    0 === i.currentSlide
                        ? (i.$prevArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          i.$nextArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false"))
                        : ((i.currentSlide >=
                              i.slideCount - i.options.slidesToShow &&
                              !1 === i.options.centerMode) ||
                              (i.currentSlide >= i.slideCount - 1 &&
                                  !0 === i.options.centerMode)) &&
                          (i.$nextArrow
                              .addClass("slick-disabled")
                              .attr("aria-disabled", "true"),
                          i.$prevArrow
                              .removeClass("slick-disabled")
                              .attr("aria-disabled", "false")));
        }),
        (r.prototype.updateDots = function () {
            var i = this;
            null !== i.$dots &&
                (i.$dots.find("li").removeClass("slick-active").end(),
                i.$dots
                    .find("li")
                    .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
                    .addClass("slick-active"));
        }),
        (r.prototype.visibility = function () {
            this.options.autoplay &&
                (document[this.hidden]
                    ? (this.interrupted = !0)
                    : (this.interrupted = !1));
        }),
        (a.fn.slick = function () {
            for (
                var i,
                    e = this,
                    t = arguments[0],
                    o = Array.prototype.slice.call(arguments, 1),
                    s = e.length,
                    n = 0;
                n < s;
                n++
            )
                if (
                    ("object" == typeof t || void 0 === t
                        ? (e[n].slick = new r(e[n], t))
                        : (i = e[n].slick[t].apply(e[n].slick, o)),
                    void 0 !== i)
                )
                    return i;
            return e;
        });
});
!(function (e, t) {
    "function" == typeof define && define.amd
        ? define(["module", "exports"], t)
        : "undefined" != typeof exports
        ? t(module, exports)
        : (t((t = { exports: {} }), t.exports), (e.WOW = t.exports));
})(this, function (e, t) {
    "use strict";
    function n(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
        return 0 <= t.indexOf(e);
    }
    function i(e, t, n) {
        null != e.addEventListener
            ? e.addEventListener(t, n, !1)
            : null != e.attachEvent
            ? e.attachEvent("on" + t, n)
            : (e[t] = n);
    }
    function s(e, t, n) {
        null != e.removeEventListener
            ? e.removeEventListener(t, n, !1)
            : null != e.detachEvent
            ? e.detachEvent("on" + t, n)
            : delete e[t];
    }
    Object.defineProperty(t, "__esModule", { value: !0 });
    var a = function (e, t, n) {
            return t && f(e.prototype, t), n && f(e, n), e;
        },
        l =
            window.WeakMap ||
            window.MozWeakMap ||
            (a(d, [
                {
                    key: "get",
                    value: function (e) {
                        for (var t = 0; t < this.keys.length; t++)
                            if (this.keys[t] === e) return this.values[t];
                    },
                },
                {
                    key: "set",
                    value: function (e, t) {
                        for (var n = 0; n < this.keys.length; n++)
                            if (this.keys[n] === e)
                                return (this.values[n] = t), this;
                        return this.keys.push(e), this.values.push(t), this;
                    },
                },
            ]),
            d),
        r =
            window.MutationObserver ||
            window.WebkitMutationObserver ||
            window.MozMutationObserver ||
            (a(h, [{ key: "observe", value: function () {} }]),
            (h.notSupported = !0),
            h),
        c =
            window.getComputedStyle ||
            function (n) {
                var i = /(\-([a-z]){1})/g;
                return {
                    getPropertyValue: function (e) {
                        i.test((e = "float" === e ? "styleFloat" : e)) &&
                            e.replace(i, function (e, t) {
                                return t.toUpperCase();
                            });
                        var t = n.currentStyle;
                        return (null != t ? t[e] : void 0) || null;
                    },
                };
            },
        a =
            (a(u, [
                {
                    key: "init",
                    value: function () {
                        (this.element = window.document.documentElement),
                            o(document.readyState, ["interactive", "complete"])
                                ? this.start()
                                : i(document, "DOMContentLoaded", this.start),
                            (this.finished = []);
                    },
                },
                {
                    key: "start",
                    value: function () {
                        var s = this;
                        if (
                            ((this.stopped = !1),
                            (this.boxes = [].slice.call(
                                this.element.querySelectorAll(
                                    "." + this.config.boxClass
                                )
                            )),
                            (this.all = this.boxes.slice(0)),
                            this.boxes.length)
                        )
                            if (this.disabled()) this.resetStyle();
                            else
                                for (var e = 0; e < this.boxes.length; e++) {
                                    var t = this.boxes[e];
                                    this.applyStyle(t, !0);
                                }
                        this.disabled() ||
                            (i(
                                this.config.scrollContainer || window,
                                "scroll",
                                this.scrollHandler
                            ),
                            i(window, "resize", this.scrollHandler),
                            (this.interval = setInterval(
                                this.scrollCallback,
                                50
                            ))),
                            this.config.live &&
                                new r(function (e) {
                                    for (var t = 0; t < e.length; t++)
                                        for (
                                            var n = e[t], i = 0;
                                            i < n.addedNodes.length;
                                            i++
                                        ) {
                                            var o = n.addedNodes[i];
                                            s.doSync(o);
                                        }
                                }).observe(document.body, {
                                    childList: !0,
                                    subtree: !0,
                                });
                    },
                },
                {
                    key: "stop",
                    value: function () {
                        (this.stopped = !0),
                            s(
                                this.config.scrollContainer || window,
                                "scroll",
                                this.scrollHandler
                            ),
                            s(window, "resize", this.scrollHandler),
                            null != this.interval &&
                                clearInterval(this.interval);
                    },
                },
                {
                    key: "sync",
                    value: function () {
                        r.notSupported && this.doSync(this.element);
                    },
                },
                {
                    key: "doSync",
                    value: function (e) {
                        if (1 === (e = null == e ? this.element : e).nodeType)
                            for (
                                var t = (e =
                                        e.parentNode || e).querySelectorAll(
                                        "." + this.config.boxClass
                                    ),
                                    n = 0;
                                n < t.length;
                                n++
                            ) {
                                var i = t[n];
                                o(i, this.all) ||
                                    (this.boxes.push(i),
                                    this.all.push(i),
                                    this.stopped || this.disabled()
                                        ? this.resetStyle()
                                        : this.applyStyle(i, !0),
                                    (this.scrolled = !0));
                            }
                    },
                },
                {
                    key: "show",
                    value: function (e) {
                        return (
                            this.applyStyle(e),
                            (e.className =
                                e.className + " " + this.config.animateClass),
                            null != this.config.callback &&
                                this.config.callback(e),
                            (t = e),
                            (n = this.wowEvent),
                            null != t.dispatchEvent
                                ? t.dispatchEvent(n)
                                : n in (null != t)
                                ? t[n]()
                                : "on" + n in (null != t) && t["on" + n](),
                            this.config.resetAnimation &&
                                (i(e, "animationend", this.resetAnimation),
                                i(e, "oanimationend", this.resetAnimation),
                                i(e, "webkitAnimationEnd", this.resetAnimation),
                                i(e, "MSAnimationEnd", this.resetAnimation)),
                            e
                        );
                        var t, n;
                    },
                },
                {
                    key: "applyStyle",
                    value: function (e, t) {
                        var n = this,
                            i = e.getAttribute("data-wow-duration"),
                            o = e.getAttribute("data-wow-delay"),
                            s = e.getAttribute("data-wow-iteration");
                        return this.animate(function () {
                            return n.customStyle(e, t, i, o, s);
                        });
                    },
                },
                {
                    key: "resetStyle",
                    value: function () {
                        for (var e = 0; e < this.boxes.length; e++)
                            this.boxes[e].style.visibility = "visible";
                    },
                },
                {
                    key: "resetAnimation",
                    value: function (e) {
                        0 <= e.type.toLowerCase().indexOf("animationend") &&
                            ((e = e.target || e.srcElement).className =
                                e.className
                                    .replace(this.config.animateClass, "")
                                    .trim());
                    },
                },
                {
                    key: "customStyle",
                    value: function (e, t, n, i, o) {
                        return (
                            t && this.cacheAnimationName(e),
                            (e.style.visibility = t ? "hidden" : "visible"),
                            n &&
                                this.vendorSet(e.style, {
                                    animationDuration: n,
                                }),
                            i && this.vendorSet(e.style, { animationDelay: i }),
                            o &&
                                this.vendorSet(e.style, {
                                    animationIterationCount: o,
                                }),
                            this.vendorSet(e.style, {
                                animationName: t
                                    ? "none"
                                    : this.cachedAnimationName(e),
                            }),
                            e
                        );
                    },
                },
                {
                    key: "vendorSet",
                    value: function (e, t) {
                        for (var n in t)
                            if (t.hasOwnProperty(n)) {
                                var i = t[n];
                                e["" + n] = i;
                                for (var o = 0; o < this.vendors.length; o++)
                                    e[
                                        "" +
                                            this.vendors[o] +
                                            n.charAt(0).toUpperCase() +
                                            n.substr(1)
                                    ] = i;
                            }
                    },
                },
                {
                    key: "vendorCSS",
                    value: function (e, t) {
                        for (
                            var n = c(e), i = n.getPropertyCSSValue(t), o = 0;
                            o < this.vendors.length;
                            o++
                        )
                            var s = this.vendors[o],
                                i =
                                    i ||
                                    n.getPropertyCSSValue("-" + s + "-" + t);
                        return i;
                    },
                },
                {
                    key: "animationName",
                    value: function (t) {
                        var n = void 0;
                        try {
                            n = this.vendorCSS(t, "animation-name").cssText;
                        } catch (e) {
                            n = c(t).getPropertyValue("animation-name");
                        }
                        return "none" === n ? "" : n;
                    },
                },
                {
                    key: "cacheAnimationName",
                    value: function (e) {
                        return this.animationNameCache.set(
                            e,
                            this.animationName(e)
                        );
                    },
                },
                {
                    key: "cachedAnimationName",
                    value: function (e) {
                        return this.animationNameCache.get(e);
                    },
                },
                {
                    key: "scrollHandler",
                    value: function () {
                        this.scrolled = !0;
                    },
                },
                {
                    key: "scrollCallback",
                    value: function () {
                        if (this.scrolled) {
                            this.scrolled = !1;
                            for (
                                var e = [], t = 0;
                                t < this.boxes.length;
                                t++
                            ) {
                                var n = this.boxes[t];
                                n &&
                                    (this.isVisible(n)
                                        ? this.show(n)
                                        : e.push(n));
                            }
                            (this.boxes = e),
                                this.boxes.length ||
                                    this.config.live ||
                                    this.stop();
                        }
                    },
                },
                {
                    key: "offsetTop",
                    value: function (e) {
                        for (; void 0 === e.offsetTop; ) e = e.parentNode;
                        for (var t = e.offsetTop; e.offsetParent; )
                            t += (e = e.offsetParent).offsetTop;
                        return t;
                    },
                },
                {
                    key: "isVisible",
                    value: function (e) {
                        var t =
                                e.getAttribute("data-wow-offset") ||
                                this.config.offset,
                            n =
                                (this.config.scrollContainer &&
                                    this.config.scrollContainer.scrollTop) ||
                                window.pageYOffset,
                            i =
                                n +
                                Math.min(
                                    this.element.clientHeight,
                                    "innerHeight" in window
                                        ? window.innerHeight
                                        : document.documentElement.clientHeight
                                ) -
                                t,
                            t = this.offsetTop(e),
                            e = t + e.clientHeight;
                        return t <= i && n <= e;
                    },
                },
                {
                    key: "disabled",
                    value: function () {
                        return (
                            !this.config.mobile &&
                            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                                navigator.userAgent
                            )
                        );
                    },
                },
            ]),
            u);
    function u() {
        var e =
            arguments.length <= 0 || void 0 === arguments[0]
                ? {}
                : arguments[0];
        n(this, u),
            (this.defaults = {
                boxClass: "wow",
                animateClass: "animated",
                offset: 0,
                mobile: !0,
                live: !0,
                callback: null,
                scrollContainer: null,
                resetAnimation: !0,
            }),
            (this.animate =
                "requestAnimationFrame" in window
                    ? function (e) {
                          return window.requestAnimationFrame(e);
                      }
                    : function (e) {
                          return e();
                      }),
            (this.vendors = ["moz", "webkit"]),
            (this.start = this.start.bind(this)),
            (this.resetAnimation = this.resetAnimation.bind(this)),
            (this.scrollHandler = this.scrollHandler.bind(this)),
            (this.scrollCallback = this.scrollCallback.bind(this)),
            (this.scrolled = !0),
            (this.config = (function (e, t) {
                for (var n in t) {
                    var i;
                    null == e[n] && ((i = t[n]), (e[n] = i));
                }
                return e;
            })(e, this.defaults)),
            null != e.scrollContainer &&
                (this.config.scrollContainer = document.querySelector(
                    e.scrollContainer
                )),
            (this.animationNameCache = new l()),
            (this.wowEvent = (function (e, t, n, i) {
                var o = !(arguments.length <= 1 || void 0 === t) && t,
                    t = !(arguments.length <= 2 || void 0 === n) && n,
                    n = arguments.length <= 3 || void 0 === i ? null : i,
                    i = void 0;
                return (
                    null != document.createEvent
                        ? (i =
                              document.createEvent(
                                  "CustomEvent"
                              )).initCustomEvent(e, o, t, n)
                        : null != document.createEventObject
                        ? ((i = document.createEventObject()).eventType = e)
                        : (i.eventName = e),
                    i
                );
            })(this.config.boxClass));
    }
    function h() {
        n(this, h),
            "undefined" != typeof console &&
                null !== console &&
                (console.warn(
                    "MutationObserver is not supported by your browser."
                ),
                console.warn(
                    "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                ));
    }
    function d() {
        n(this, d), (this.keys = []), (this.values = []);
    }
    function f(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(e, i.key, i);
        }
    }
    (t.default = a), (e.exports = t.default);
});
var AWN;
(() => {
    var n = {
            628: (t, e, n) => {
                "use strict";
                function i(t) {
                    return (i =
                        "function" == typeof Symbol &&
                        "symbol" == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      "function" == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? "symbol"
                                      : typeof t;
                              })(t);
                }
                n.d(e, { default: () => E });
                var o = {
                        maxNotifications: 10,
                        animationDuration: 300,
                        position: "bottom-right",
                        labels: {
                            tip: "Tip",
                            info: "Info",
                            success: "Success",
                            warning: "Attention",
                            alert: "Error",
                            async: "Loading",
                            confirm: "Confirmation required",
                            confirmOk: "OK",
                            confirmCancel: "Cancel",
                        },
                        icons: {
                            tip: "question-circle",
                            info: "info-circle",
                            success: "check-circle",
                            warning: "exclamation-circle",
                            alert: "exclamation-triangle",
                            async: "cog fa-spin",
                            confirm: "exclamation-triangle",
                            prefix: "<i class='fa fas fa-fw fa-",
                            suffix: "'></i>",
                            enabled: !0,
                        },
                        replacements: {
                            tip: null,
                            info: null,
                            success: null,
                            warning: null,
                            alert: null,
                            async: null,
                            "async-block": null,
                            modal: null,
                            confirm: null,
                            general: { "<script>": "", "</script>": "" },
                        },
                        messages: {
                            tip: "",
                            info: "",
                            success: "Action has been succeeded",
                            warning: "",
                            alert: "Action has been failed",
                            confirm: "This action can't be undone. Continue?",
                            async: "Please, wait...",
                            "async-block": "Loading",
                        },
                        formatError: function (t) {
                            if (t.response) {
                                if (!t.response.data)
                                    return "500 API Server Error";
                                if (t.response.data.errors)
                                    return t.response.data.errors
                                        .map(function (t) {
                                            return t.detail;
                                        })
                                        .join("<br>");
                                if (t.response.statusText)
                                    return ""
                                        .concat(t.response.status, " ")
                                        .concat(t.response.statusText, ": ")
                                        .concat(t.response.data);
                            }
                            return t.message || t;
                        },
                        durations: {
                            global: 5e3,
                            success: null,
                            info: null,
                            tip: null,
                            warning: null,
                            alert: null,
                        },
                        minDurations: { async: 1e3, "async-block": 1e3 },
                    },
                    r =
                        ((n = [
                            {
                                key: "icon",
                                value: function (t) {
                                    return this.icons.enabled
                                        ? ""
                                              .concat(this.icons.prefix)
                                              .concat(this.icons[t])
                                              .concat(this.icons.suffix)
                                        : "";
                                },
                            },
                            {
                                key: "label",
                                value: function (t) {
                                    return this.labels[t];
                                },
                            },
                            {
                                key: "duration",
                                value: function (t) {
                                    t = this.durations[t];
                                    return null === t
                                        ? this.durations.global
                                        : t;
                                },
                            },
                            {
                                key: "toSecs",
                                value: function (t) {
                                    return "".concat(t / 1e3, "s");
                                },
                            },
                            {
                                key: "applyReplacements",
                                value: function (t, e) {
                                    if (!t) return this.messages[e] || "";
                                    for (
                                        var n = 0, o = ["general", e];
                                        n < o.length;
                                        n++
                                    ) {
                                        var i = o[n];
                                        if (this.replacements[i])
                                            for (var r in this.replacements[i])
                                                t = t.replace(
                                                    r,
                                                    this.replacements[i][r]
                                                );
                                    }
                                    return t;
                                },
                            },
                            {
                                key: "override",
                                value: function (t) {
                                    return t ? new u(t, this) : this;
                                },
                            },
                            {
                                key: "defaultsDeep",
                                value: function (t, e) {
                                    var n,
                                        o = {};
                                    for (n in t)
                                        e.hasOwnProperty(n)
                                            ? (o[n] =
                                                  "object" === i(t[n]) &&
                                                  null !== t[n]
                                                      ? this.defaultsDeep(
                                                            t[n],
                                                            e[n]
                                                        )
                                                      : e[n])
                                            : (o[n] = t[n]);
                                    return o;
                                },
                            },
                        ]),
                        (function (t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    "value" in o && (o.writable = !0),
                                    Object.defineProperty(t, o.key, o);
                            }
                        })(u.prototype, n),
                        u),
                    e = "awn",
                    n = {
                        popup: "".concat(e, "-popup"),
                        toast: "".concat(e, "-toast"),
                        btn: "".concat(e, "-btn"),
                        confirm: "".concat(e, "-confirm"),
                    },
                    a = {
                        prefix: n.toast,
                        klass: {
                            label: "".concat(n.toast, "-label"),
                            content: "".concat(n.toast, "-content"),
                            icon: "".concat(n.toast, "-icon"),
                            progressBar: "".concat(n.toast, "-progress-bar"),
                            progressBarPause: "".concat(
                                n.toast,
                                "-progress-bar-paused"
                            ),
                        },
                        ids: { container: "".concat(n.toast, "-container") },
                    },
                    s = {
                        prefix: n.popup,
                        klass: {
                            buttons: "".concat(e, "-buttons"),
                            button: n.btn,
                            successBtn: "".concat(n.btn, "-success"),
                            cancelBtn: "".concat(n.btn, "-cancel"),
                            title: "".concat(n.popup, "-title"),
                            body: "".concat(n.popup, "-body"),
                            content: "".concat(n.popup, "-content"),
                            dotAnimation: "".concat(n.popup, "-loading-dots"),
                        },
                        ids: {
                            wrapper: "".concat(n.popup, "-wrapper"),
                            confirmOk: "".concat(n.confirm, "-ok"),
                            confirmCancel: "".concat(n.confirm, "-cancel"),
                        },
                    },
                    c = { klass: { hiding: "".concat(e, "-hiding") }, lib: e };
                function u() {
                    var t =
                            0 < arguments.length && void 0 !== arguments[0]
                                ? arguments[0]
                                : {},
                        e =
                            1 < arguments.length && void 0 !== arguments[1]
                                ? arguments[1]
                                : o;
                    (function (t, e) {
                        if (!(t instanceof e))
                            throw new TypeError(
                                "Cannot call a class as a function"
                            );
                    })(this, u),
                        Object.assign(this, this.defaultsDeep(e, t));
                }
                var l =
                    ((function (t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            (o.enumerable = o.enumerable || !1),
                                (o.configurable = !0),
                                "value" in o && (o.writable = !0),
                                Object.defineProperty(t, o.key, o);
                        }
                    })(f.prototype, [
                        { key: "beforeInsert", value: function () {} },
                        { key: "afterInsert", value: function () {} },
                        {
                            key: "insert",
                            value: function () {
                                return (
                                    this.beforeInsert(),
                                    (this.el = this.parent.appendChild(
                                        this.newNode
                                    )),
                                    this.afterInsert(),
                                    this
                                );
                            },
                        },
                        {
                            key: "replace",
                            value: function (t) {
                                var e = this;
                                if (this.getElement())
                                    return this.beforeDelete().then(
                                        function () {
                                            return (
                                                e.updateType(t.type),
                                                e.parent.replaceChild(
                                                    t.newNode,
                                                    e.el
                                                ),
                                                (e.el = e.getElement(
                                                    t.newNode
                                                )),
                                                e.afterInsert(),
                                                e
                                            );
                                        }
                                    );
                            },
                        },
                        {
                            key: "beforeDelete",
                            value: function () {
                                var e = this,
                                    n =
                                        0 < arguments.length &&
                                        void 0 !== arguments[0]
                                            ? arguments[0]
                                            : this.el,
                                    o = 0;
                                return (
                                    this.start &&
                                        (o =
                                            this.options.minDurations[
                                                this.type
                                            ] +
                                            this.start -
                                            Date.now()) < 0 &&
                                        (o = 0),
                                    new Promise(function (t) {
                                        setTimeout(function () {
                                            n.classList.add(c.klass.hiding),
                                                setTimeout(
                                                    t,
                                                    e.options.animationDuration
                                                );
                                        }, o);
                                    })
                                );
                            },
                        },
                        {
                            key: "delete",
                            value: function () {
                                var t = this,
                                    e =
                                        0 < arguments.length &&
                                        void 0 !== arguments[0]
                                            ? arguments[0]
                                            : this.el;
                                return this.getElement(e)
                                    ? this.beforeDelete(e).then(function () {
                                          e.remove(), t.afterDelete();
                                      })
                                    : null;
                            },
                        },
                        { key: "afterDelete", value: function () {} },
                        {
                            key: "getElement",
                            value: function () {
                                var t =
                                    0 < arguments.length &&
                                    void 0 !== arguments[0]
                                        ? arguments[0]
                                        : this.el;
                                return t ? document.getElementById(t.id) : null;
                            },
                        },
                        {
                            key: "addEvent",
                            value: function (t, e) {
                                this.el.addEventListener(t, e);
                            },
                        },
                        {
                            key: "toggleClass",
                            value: function (t) {
                                this.el.classList.toggle(t);
                            },
                        },
                        {
                            key: "updateType",
                            value: function (t) {
                                (this.type = t),
                                    (this.duration = this.options.duration(
                                        this.type
                                    ));
                            },
                        },
                    ]),
                    f);
                function f(t, e, n, o, i) {
                    !(function (t) {
                        if (!(t instanceof f))
                            throw new TypeError(
                                "Cannot call a class as a function"
                            );
                    })(this),
                        (this.newNode = document.createElement("div")),
                        e && (this.newNode.id = e),
                        n && (this.newNode.className = n),
                        o && (this.newNode.style.cssText = o),
                        (this.parent = t),
                        (this.options = i);
                }
                var p =
                    ((function (t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            (o.enumerable = o.enumerable || !1),
                                (o.configurable = !0),
                                "value" in o && (o.writable = !0),
                                Object.defineProperty(t, o.key, o);
                        }
                    })(d.prototype, [
                        {
                            key: "pause",
                            value: function () {
                                (this.paused = !0),
                                    window.clearTimeout(this.timerId),
                                    (this.remaining -= new Date() - this.start);
                            },
                        },
                        {
                            key: "resume",
                            value: function () {
                                var t = this;
                                (this.paused = !1),
                                    (this.start = new Date()),
                                    window.clearTimeout(this.timerId),
                                    (this.timerId = window.setTimeout(
                                        function () {
                                            window.clearTimeout(t.timerId),
                                                t.callback();
                                        },
                                        this.remaining
                                    ));
                            },
                        },
                        {
                            key: "toggle",
                            value: function () {
                                this.paused ? this.resume() : this.pause();
                            },
                        },
                    ]),
                    d);
                function d(t, e) {
                    !(function (t) {
                        if (!(t instanceof d))
                            throw new TypeError(
                                "Cannot call a class as a function"
                            );
                    })(this),
                        (this.callback = t),
                        (this.remaining = e),
                        this.resume();
                }
                function h(t) {
                    return (h =
                        "function" == typeof Symbol &&
                        "symbol" == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      "function" == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? "symbol"
                                      : typeof t;
                              })(t);
                }
                function y(t, e) {
                    return (y =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function m(t) {
                    return (m = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                var v = (function () {
                    !(function (t, e) {
                        if ("function" != typeof e && null !== e)
                            throw new TypeError(
                                "Super expression must either be null or a function"
                            );
                        (t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0,
                            },
                        })),
                            e && y(t, e);
                    })(r, l);
                    var n,
                        o,
                        i =
                            ((n = r),
                            (o = (function () {
                                if (
                                    "undefined" == typeof Reflect ||
                                    !Reflect.construct
                                )
                                    return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return (
                                        Boolean.prototype.valueOf.call(
                                            Reflect.construct(
                                                Boolean,
                                                [],
                                                function () {}
                                            )
                                        ),
                                        !0
                                    );
                                } catch (t) {
                                    return !1;
                                }
                            })()),
                            function () {
                                var t,
                                    e = m(n);
                                return (function (t, e) {
                                    if (
                                        e &&
                                        ("object" === h(e) ||
                                            "function" == typeof e)
                                    )
                                        return e;
                                    if (void 0 !== e)
                                        throw new TypeError(
                                            "Derived constructors may only return object or undefined"
                                        );
                                    return (function (t) {
                                        if (void 0 === t)
                                            throw new ReferenceError(
                                                "this hasn't been initialised - super() hasn't been called"
                                            );
                                        return t;
                                    })(t);
                                })(
                                    this,
                                    o
                                        ? ((t = m(this).constructor),
                                          Reflect.construct(e, arguments, t))
                                        : e.apply(this, arguments)
                                );
                            });
                    function r(t, e, n, o) {
                        return (
                            (function (t) {
                                if (!(t instanceof r))
                                    throw new TypeError(
                                        "Cannot call a class as a function"
                                    );
                            })(this),
                            (n = i.call(
                                this,
                                o,
                                ""
                                    .concat(a.prefix, "-")
                                    .concat(
                                        Math.floor(
                                            Date.now() - 100 * Math.random()
                                        )
                                    ),
                                ""
                                    .concat(a.prefix, " ")
                                    .concat(a.prefix, "-")
                                    .concat(e),
                                "animation-duration: ".concat(
                                    n.toSecs(n.animationDuration),
                                    ";"
                                ),
                                n
                            )).updateType(e),
                            n.setInnerHtml(t),
                            n
                        );
                    }
                    return (
                        (function (t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    "value" in o && (o.writable = !0),
                                    Object.defineProperty(t, o.key, o);
                            }
                        })(r.prototype, [
                            {
                                key: "setInnerHtml",
                                value: function (t) {
                                    "alert" === this.type &&
                                        t &&
                                        (t = this.options.formatError(t)),
                                        (t = this.options.applyReplacements(
                                            t,
                                            this.type
                                        )),
                                        (this.newNode.innerHTML =
                                            '<div class="awn-toast-wrapper">'
                                                .concat(this.progressBar)
                                                .concat(
                                                    this.label,
                                                    '<div class="'
                                                )
                                                .concat(a.klass.content, '">')
                                                .concat(
                                                    t,
                                                    '</div><span class="'
                                                )
                                                .concat(a.klass.icon, '">')
                                                .concat(
                                                    this.options.icon(
                                                        this.type
                                                    ),
                                                    "</span></div>"
                                                ));
                                },
                            },
                            {
                                key: "beforeInsert",
                                value: function () {
                                    var t,
                                        e = this;
                                    this.parent.childElementCount >=
                                        this.options.maxNotifications &&
                                        ((t = Array.from(
                                            this.parent.getElementsByClassName(
                                                a.prefix
                                            )
                                        )),
                                        this.delete(
                                            t.find(function (t) {
                                                return !e.isDeleted(t);
                                            })
                                        ));
                                },
                            },
                            {
                                key: "afterInsert",
                                value: function () {
                                    var t = this;
                                    if ("async" == this.type)
                                        return (this.start = Date.now());
                                    if (
                                        (this.addEvent("click", function () {
                                            return t.delete();
                                        }),
                                        !(this.duration <= 0))
                                    ) {
                                        this.timer = new p(function () {
                                            return t.delete();
                                        }, this.duration);
                                        for (
                                            var e = 0,
                                                n = [
                                                    "mouseenter",
                                                    "mouseleave",
                                                ];
                                            e < n.length;
                                            e++
                                        )
                                            this.addEvent(n[e], function () {
                                                t.isDeleted() ||
                                                    (t.toggleClass(
                                                        a.klass.progressBarPause
                                                    ),
                                                    t.timer.toggle());
                                            });
                                    }
                                },
                            },
                            {
                                key: "isDeleted",
                                value: function () {
                                    return (
                                        0 < arguments.length &&
                                        void 0 !== arguments[0]
                                            ? arguments[0]
                                            : this.el
                                    ).classList.contains(c.klass.hiding);
                                },
                            },
                            {
                                key: "progressBar",
                                get: function () {
                                    return this.duration <= 0 ||
                                        "async" === this.type
                                        ? ""
                                        : "<div class='"
                                              .concat(
                                                  a.klass.progressBar,
                                                  "' style=\"animation-duration:"
                                              )
                                              .concat(
                                                  this.options.toSecs(
                                                      this.duration
                                                  ),
                                                  ';"></div>'
                                              );
                                },
                            },
                            {
                                key: "label",
                                get: function () {
                                    return '<b class="'
                                        .concat(a.klass.label, '">')
                                        .concat(
                                            this.options.label(this.type),
                                            "</b>"
                                        );
                                },
                            },
                        ]),
                        r
                    );
                })();
                function b(t) {
                    return (b =
                        "function" == typeof Symbol &&
                        "symbol" == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      "function" == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? "symbol"
                                      : typeof t;
                              })(t);
                }
                function k(t, e) {
                    return (k =
                        Object.setPrototypeOf ||
                        function (t, e) {
                            return (t.__proto__ = e), t;
                        })(t, e);
                }
                function g(t) {
                    return (g = Object.setPrototypeOf
                        ? Object.getPrototypeOf
                        : function (t) {
                              return t.__proto__ || Object.getPrototypeOf(t);
                          })(t);
                }
                var w = (function () {
                    !(function (t, e) {
                        if ("function" != typeof e && null !== e)
                            throw new TypeError(
                                "Super expression must either be null or a function"
                            );
                        (t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0,
                            },
                        })),
                            e && k(t, e);
                    })(c, l);
                    var n,
                        o,
                        a =
                            ((n = c),
                            (o = (function () {
                                if (
                                    "undefined" == typeof Reflect ||
                                    !Reflect.construct
                                )
                                    return !1;
                                if (Reflect.construct.sham) return !1;
                                if ("function" == typeof Proxy) return !0;
                                try {
                                    return (
                                        Boolean.prototype.valueOf.call(
                                            Reflect.construct(
                                                Boolean,
                                                [],
                                                function () {}
                                            )
                                        ),
                                        !0
                                    );
                                } catch (t) {
                                    return !1;
                                }
                            })()),
                            function () {
                                var t,
                                    e = g(n);
                                return (function (t, e) {
                                    if (
                                        e &&
                                        ("object" === b(e) ||
                                            "function" == typeof e)
                                    )
                                        return e;
                                    if (void 0 !== e)
                                        throw new TypeError(
                                            "Derived constructors may only return object or undefined"
                                        );
                                    return (function (t) {
                                        if (void 0 === t)
                                            throw new ReferenceError(
                                                "this hasn't been initialised - super() hasn't been called"
                                            );
                                        return t;
                                    })(t);
                                })(
                                    this,
                                    o
                                        ? ((t = g(this).constructor),
                                          Reflect.construct(e, arguments, t))
                                        : e.apply(this, arguments)
                                );
                            });
                    function c(t) {
                        var e =
                                1 < arguments.length && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : "modal",
                            n = 2 < arguments.length ? arguments[2] : void 0,
                            o = 3 < arguments.length ? arguments[3] : void 0,
                            i = 4 < arguments.length ? arguments[4] : void 0;
                        !(function (t, e) {
                            if (!(t instanceof e))
                                throw new TypeError(
                                    "Cannot call a class as a function"
                                );
                        })(this, c);
                        var r = "animation-duration: ".concat(
                            n.toSecs(n.animationDuration),
                            ";"
                        );
                        return (
                            ((n = a.call(
                                this,
                                document.body,
                                s.ids.wrapper,
                                null,
                                r,
                                n
                            ))[s.ids.confirmOk] = o),
                            (n[s.ids.confirmCancel] = i),
                            (n.className = "".concat(s.prefix, "-").concat(e)),
                            ["confirm", "async-block", "modal"].includes(e) ||
                                (e = "modal"),
                            n.updateType(e),
                            n.setInnerHtml(t),
                            n.insert(),
                            n
                        );
                    }
                    return (
                        (function (t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                (o.enumerable = o.enumerable || !1),
                                    (o.configurable = !0),
                                    "value" in o && (o.writable = !0),
                                    Object.defineProperty(t, o.key, o);
                            }
                        })(c.prototype, [
                            {
                                key: "setInnerHtml",
                                value: function (t) {
                                    var e = this.options.applyReplacements(
                                        t,
                                        this.type
                                    );
                                    switch (this.type) {
                                        case "confirm":
                                            var n = [
                                                "<button class='"
                                                    .concat(s.klass.button, " ")
                                                    .concat(
                                                        s.klass.successBtn,
                                                        "'id='"
                                                    )
                                                    .concat(
                                                        s.ids.confirmOk,
                                                        "'>"
                                                    )
                                                    .concat(
                                                        this.options.labels
                                                            .confirmOk,
                                                        "</button>"
                                                    ),
                                            ];
                                            !1 !== this[s.ids.confirmCancel] &&
                                                n.push(
                                                    "<button class='"
                                                        .concat(
                                                            s.klass.button,
                                                            " "
                                                        )
                                                        .concat(
                                                            s.klass.cancelBtn,
                                                            "'id='"
                                                        )
                                                        .concat(
                                                            s.ids.confirmCancel,
                                                            "'>"
                                                        )
                                                        .concat(
                                                            this.options.labels
                                                                .confirmCancel,
                                                            "</button>"
                                                        )
                                                ),
                                                (e = ""
                                                    .concat(
                                                        this.options.icon(
                                                            this.type
                                                        ),
                                                        "<div class='"
                                                    )
                                                    .concat(s.klass.title, "'>")
                                                    .concat(
                                                        this.options.label(
                                                            this.type
                                                        ),
                                                        '</div><div class="'
                                                    )
                                                    .concat(
                                                        s.klass.content,
                                                        '">'
                                                    )
                                                    .concat(
                                                        e,
                                                        "</div><div class='"
                                                    )
                                                    .concat(
                                                        s.klass.buttons,
                                                        " "
                                                    )
                                                    .concat(
                                                        s.klass.buttons,
                                                        "-"
                                                    )
                                                    .concat(n.length, "'>")
                                                    .concat(
                                                        n.join(""),
                                                        "</div>"
                                                    ));
                                            break;
                                        case "async-block":
                                            e = ""
                                                .concat(e, '<div class="')
                                                .concat(
                                                    s.klass.dotAnimation,
                                                    '"></div>'
                                                );
                                    }
                                    this.newNode.innerHTML = '<div class="'
                                        .concat(s.klass.body, " ")
                                        .concat(this.className, '">')
                                        .concat(e, "</div>");
                                },
                            },
                            {
                                key: "keyupListener",
                                value: function (t) {
                                    if ("async-block" === this.type)
                                        return t.preventDefault();
                                    switch (t.code) {
                                        case "Escape":
                                            t.preventDefault(), this.delete();
                                        case "Tab":
                                            if (
                                                (t.preventDefault(),
                                                "confirm" !== this.type ||
                                                    !1 ===
                                                        this[
                                                            s.ids.confirmCancel
                                                        ])
                                            )
                                                return !0;
                                            var e = this.okBtn;
                                            t.shiftKey
                                                ? document.activeElement.id ==
                                                      s.ids.confirmOk &&
                                                  (e = this.cancelBtn)
                                                : document.activeElement.id !==
                                                      s.ids.confirmCancel &&
                                                  (e = this.cancelBtn),
                                                e.focus();
                                    }
                                },
                            },
                            {
                                key: "afterInsert",
                                value: function () {
                                    var e = this;
                                    switch (
                                        ((this.listener = function (t) {
                                            return e.keyupListener(t);
                                        }),
                                        window.addEventListener(
                                            "keydown",
                                            this.listener
                                        ),
                                        this.type)
                                    ) {
                                        case "async-block":
                                            this.start = Date.now();
                                            break;
                                        case "confirm":
                                            this.okBtn.focus(),
                                                this.addEvent(
                                                    "click",
                                                    function (t) {
                                                        return (
                                                            "BUTTON" ===
                                                                t.target
                                                                    .nodeName &&
                                                            (e.delete(),
                                                            void (
                                                                e[
                                                                    t.target.id
                                                                ] &&
                                                                e[t.target.id]()
                                                            ))
                                                        );
                                                    }
                                                );
                                            break;
                                        default:
                                            document.activeElement.blur(),
                                                this.addEvent(
                                                    "click",
                                                    function (t) {
                                                        t.target.id ===
                                                            e.newNode.id &&
                                                            e.delete();
                                                    }
                                                );
                                    }
                                },
                            },
                            {
                                key: "afterDelete",
                                value: function () {
                                    window.removeEventListener(
                                        "keydown",
                                        this.listener
                                    );
                                },
                            },
                            {
                                key: "okBtn",
                                get: function () {
                                    return document.getElementById(
                                        s.ids.confirmOk
                                    );
                                },
                            },
                            {
                                key: "cancelBtn",
                                get: function () {
                                    return document.getElementById(
                                        s.ids.confirmCancel
                                    );
                                },
                            },
                        ]),
                        c
                    );
                })();
                function O(t) {
                    return (O =
                        "function" == typeof Symbol &&
                        "symbol" == typeof Symbol.iterator
                            ? function (t) {
                                  return typeof t;
                              }
                            : function (t) {
                                  return t &&
                                      "function" == typeof Symbol &&
                                      t.constructor === Symbol &&
                                      t !== Symbol.prototype
                                      ? "symbol"
                                      : typeof t;
                              })(t);
                }
                var E =
                    ((function (t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            (o.enumerable = o.enumerable || !1),
                                (o.configurable = !0),
                                "value" in o && (o.writable = !0),
                                Object.defineProperty(t, o.key, o);
                        }
                    })(T.prototype, [
                        {
                            key: "tip",
                            value: function (t, e) {
                                return this._addToast(t, "tip", e).el;
                            },
                        },
                        {
                            key: "info",
                            value: function (t, e) {
                                return this._addToast(t, "info", e).el;
                            },
                        },
                        {
                            key: "success",
                            value: function (t, e) {
                                return this._addToast(t, "success", e).el;
                            },
                        },
                        {
                            key: "warning",
                            value: function (t, e) {
                                return this._addToast(t, "warning", e).el;
                            },
                        },
                        {
                            key: "alert",
                            value: function (t, e) {
                                return this._addToast(t, "alert", e).el;
                            },
                        },
                        {
                            key: "async",
                            value: function (t, e, n, o, i) {
                                o = this._addToast(o, "async", i);
                                return this._afterAsync(t, e, n, i, o);
                            },
                        },
                        {
                            key: "confirm",
                            value: function (t, e, n, o) {
                                return this._addPopup(t, "confirm", o, e, n);
                            },
                        },
                        {
                            key: "asyncBlock",
                            value: function (t, e, n, o, i) {
                                o = this._addPopup(o, "async-block", i);
                                return this._afterAsync(t, e, n, i, o);
                            },
                        },
                        {
                            key: "modal",
                            value: function (t, e, n) {
                                return this._addPopup(t, e, n);
                            },
                        },
                        {
                            key: "closeToasts",
                            value: function () {
                                for (var t = this.container; t.firstChild; )
                                    t.removeChild(t.firstChild);
                            },
                        },
                        {
                            key: "_addPopup",
                            value: function (t, e, n, o, i) {
                                return new w(
                                    t,
                                    e,
                                    this.options.override(n),
                                    o,
                                    i
                                );
                            },
                        },
                        {
                            key: "_addToast",
                            value: function (t, e, n, o) {
                                n = this.options.override(n);
                                var i = new v(t, e, n, this.container);
                                return o
                                    ? o instanceof w
                                        ? o.delete().then(function () {
                                              return i.insert();
                                          })
                                        : o.replace(i)
                                    : i.insert();
                            },
                        },
                        {
                            key: "_afterAsync",
                            value: function (t, e, n, o, i) {
                                return t.then(
                                    this._responseHandler(e, "success", o, i),
                                    this._responseHandler(n, "alert", o, i)
                                );
                            },
                        },
                        {
                            key: "_responseHandler",
                            value: function (e, n, o, i) {
                                var r = this;
                                return function (t) {
                                    switch (O(e)) {
                                        case "undefined":
                                        case "string":
                                            r._addToast(
                                                "alert" === n ? e || t : e,
                                                n,
                                                o,
                                                i
                                            );
                                            break;
                                        default:
                                            i.delete().then(function () {
                                                e && e(t);
                                            });
                                    }
                                };
                            },
                        },
                        {
                            key: "_createContainer",
                            value: function () {
                                return new l(
                                    document.body,
                                    a.ids.container,
                                    "awn-".concat(this.options.position)
                                ).insert().el;
                            },
                        },
                        {
                            key: "container",
                            get: function () {
                                return (
                                    document.getElementById(a.ids.container) ||
                                    this._createContainer()
                                );
                            },
                        },
                    ]),
                    T);
                function T() {
                    var t =
                        0 < arguments.length && void 0 !== arguments[0]
                            ? arguments[0]
                            : {};
                    (function (t, e) {
                        if (!(t instanceof e))
                            throw new TypeError(
                                "Cannot call a class as a function"
                            );
                    })(this, T),
                        (this.options = new r(t));
                }
            },
            612: (t, e, n) => {
                t.exports = n(628).default;
            },
        },
        o = {};
    function i(t) {
        var e = o[t];
        if (void 0 !== e) return e.exports;
        e = o[t] = { exports: {} };
        return n[t](e, e.exports, i), e.exports;
    }
    (i.d = (t, e) => {
        for (var n in e)
            i.o(e, n) &&
                !i.o(t, n) &&
                Object.defineProperty(t, n, { enumerable: !0, get: e[n] });
    }),
        (i.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e));
    var t = i(612);
    AWN = t;
})();
