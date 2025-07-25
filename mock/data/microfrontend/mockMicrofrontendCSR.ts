export const mockMicrofrontendCSR = (title: string, minHeight: string) => {
const cssIdentifier = title.replace(/\s/g, "");
return `var react = {exports: {}};

var react_production_min = {};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
if (val === null || val === undefined) {
throw new TypeError('Object.assign cannot be called with null or undefined');
}

return Object(val);
}

function shouldUseNative() {
try {
if (!Object.assign) {
return false;
} // Detect buggy property enumeration order in older V8 versions.
// https://bugs.chromium.org/p/v8/issues/detail?id=4118


var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

test1[5] = 'de';

if (Object.getOwnPropertyNames(test1)[0] === '5') {
return false;
} // https://bugs.chromium.org/p/v8/issues/detail?id=3056


var test2 = {};

for (var i = 0; i < 10; i++) {
test2['_' + String.fromCharCode(i)] = i;
}

var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
return test2[n];
});

if (order2.join('') !== '0123456789') {
return false;
} // https://bugs.chromium.org/p/v8/issues/detail?id=3056


var test3 = {};
'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
test3[letter] = letter;
});

if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
return false;
}

return true;
} catch (err) {
// We don't expect any of the above to throw, but better to be safe.
return false;
}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
var from;
var to = toObject(target);
var symbols;

for (var s = 1; s < arguments.length; s++) {
from = Object(arguments[s]);

for (var key in from) {
if (hasOwnProperty.call(from, key)) {
to[key] = from[key];
}
}

if (getOwnPropertySymbols) {
symbols = getOwnPropertySymbols(from);

for (var i = 0; i < symbols.length; i++) {
if (propIsEnumerable.call(from, symbols[i])) {
to[symbols[i]] = from[symbols[i]];
}
}
}
}

return to;
};

/** @license React v17.0.2
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var l = objectAssign,
n = 60103,
p = 60106;

react_production_min.Fragment = 60107;
react_production_min.StrictMode = 60108;
react_production_min.Profiler = 60114;
var q = 60109,
r = 60110,
t = 60112;
react_production_min.Suspense = 60113;
var u = 60115,
v = 60116;

if ("function" === typeof Symbol && Symbol.for) {
var w = Symbol.for;
n = w("react.element");
p = w("react.portal");
react_production_min.Fragment = w("react.fragment");
react_production_min.StrictMode = w("react.strict_mode");
react_production_min.Profiler = w("react.profiler");
q = w("react.provider");
r = w("react.context");
t = w("react.forward_ref");
react_production_min.Suspense = w("react.suspense");
u = w("react.memo");
v = w("react.lazy");
}

var x = "function" === typeof Symbol && Symbol.iterator;

function y(a) {
if (null === a || "object" !== typeof a) return null;
a = x && a[x] || a["@@iterator"];
return "function" === typeof a ? a : null;
}

function z(a) {
for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);

return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}

var A = {
isMounted: function () {
return !1;
},
enqueueForceUpdate: function () {},
enqueueReplaceState: function () {},
enqueueSetState: function () {}
},
B = {};

function C(a, b, c) {
this.props = a;
this.context = b;
this.refs = B;
this.updater = c || A;
}

C.prototype.isReactComponent = {};

C.prototype.setState = function (a, b) {
if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error(z(85));
this.updater.enqueueSetState(this, a, b, "setState");
};

C.prototype.forceUpdate = function (a) {
this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};

function D() {}

D.prototype = C.prototype;

function E(a, b, c) {
this.props = a;
this.context = b;
this.refs = B;
this.updater = c || A;
}

var F = E.prototype = new D();
F.constructor = E;
l(F, C.prototype);
F.isPureReactComponent = !0;
var G = {
current: null
},
H = Object.prototype.hasOwnProperty,
I = {
key: !0,
ref: !0,
__self: !0,
__source: !0
};

function J(a, b, c) {
var e,
d = {},
k = null,
h = null;
if (null != b) for (e in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) H.call(b, e) && !I.hasOwnProperty(e) && (d[e] = b[e]);
var g = arguments.length - 2;
if (1 === g) d.children = c;else if (1 < g) {
for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];

d.children = f;
}
if (a && a.defaultProps) for (e in g = a.defaultProps, g) void 0 === d[e] && (d[e] = g[e]);
return {
$$typeof: n,
type: a,
key: k,
ref: h,
props: d,
_owner: G.current
};
}

function K(a, b) {
return {
$$typeof: n,
type: a.type,
key: b,
ref: a.ref,
props: a.props,
_owner: a._owner
};
}

function L(a) {
return "object" === typeof a && null !== a && a.$$typeof === n;
}

function escape(a) {
var b = {
"=": "=0",
":": "=2"
};
return "$" + a.replace(/[=:]/g, function (a) {
return b[a];
});
}

var M = /\\/+/g;

function N(a, b) {
return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}

function O(a, b, c, e, d) {
var k = typeof a;
if ("undefined" === k || "boolean" === k) a = null;
var h = !1;
if (null === a) h = !0;else switch (k) {
case "string":
case "number":
h = !0;
break;

case "object":
switch (a.$$typeof) {
case n:
case p:
h = !0;
}

}
if (h) return h = a, d = d(h), a = "" === e ? "." + N(h, 0) : e, Array.isArray(d) ? (c = "", null != a && (c = a.replace(M, "$&/") + "/"), O(d, b, c, "", function (a) {
return a;
})) : null != d && (L(d) && (d = K(d, c + (!d.key || h && h.key === d.key ? "" : ("" + d.key).replace(M, "$&/") + "/") + a)), b.push(d)), 1;
h = 0;
e = "" === e ? "." : e + ":";
if (Array.isArray(a)) for (var g = 0; g < a.length; g++) {
k = a[g];
var f = e + N(k, g);
h += O(k, b, c, f, d);
} else if (f = y(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done;) k = k.value, f = e + N(k, g++), h += O(k, b, c, f, d);else if ("object" === k) throw b = "" + a, Error(z(31, "[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b));
return h;
}

function P(a, b, c) {
if (null == a) return a;
var e = [],
d = 0;
O(a, e, "", "", function (a) {
return b.call(c, a, d++);
});
return e;
}

function Q(a) {
if (-1 === a._status) {
var b = a._result;
b = b();
a._status = 0;
a._result = b;
b.then(function (b) {
0 === a._status && (b = b.default, a._status = 1, a._result = b);
}, function (b) {
0 === a._status && (a._status = 2, a._result = b);
});
}

if (1 === a._status) return a._result;
throw a._result;
}

var R = {
current: null
};

function S() {
var a = R.current;
if (null === a) throw Error(z(321));
return a;
}

var T = {
ReactCurrentDispatcher: R,
ReactCurrentBatchConfig: {
transition: 0
},
ReactCurrentOwner: G,
IsSomeRendererActing: {
current: !1
},
assign: l
};
react_production_min.Children = {
map: P,
forEach: function (a, b, c) {
P(a, function () {
b.apply(this, arguments);
}, c);
},
count: function (a) {
var b = 0;
P(a, function () {
b++;
});
return b;
},
toArray: function (a) {
return P(a, function (a) {
return a;
}) || [];
},
only: function (a) {
if (!L(a)) throw Error(z(143));
return a;
}
};
react_production_min.Component = C;
react_production_min.PureComponent = E;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T;

react_production_min.cloneElement = function (a, b, c) {
if (null === a || void 0 === a) throw Error(z(267, a));
var e = l({}, a.props),
d = a.key,
k = a.ref,
h = a._owner;

if (null != b) {
void 0 !== b.ref && (k = b.ref, h = G.current);
void 0 !== b.key && (d = "" + b.key);
if (a.type && a.type.defaultProps) var g = a.type.defaultProps;

for (f in b) H.call(b, f) && !I.hasOwnProperty(f) && (e[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
}

var f = arguments.length - 2;
if (1 === f) e.children = c;else if (1 < f) {
g = Array(f);

for (var m = 0; m < f; m++) g[m] = arguments[m + 2];

e.children = g;
}
return {
$$typeof: n,
type: a.type,
key: d,
ref: k,
props: e,
_owner: h
};
};

react_production_min.createContext = function (a, b) {
void 0 === b && (b = null);
a = {
$$typeof: r,
_calculateChangedBits: b,
_currentValue: a,
_currentValue2: a,
_threadCount: 0,
Provider: null,
Consumer: null
};
a.Provider = {
$$typeof: q,
_context: a
};
return a.Consumer = a;
};

react_production_min.createElement = J;

react_production_min.createFactory = function (a) {
var b = J.bind(null, a);
b.type = a;
return b;
};

react_production_min.createRef = function () {
return {
current: null
};
};

react_production_min.forwardRef = function (a) {
return {
$$typeof: t,
render: a
};
};

react_production_min.isValidElement = L;

react_production_min.lazy = function (a) {
return {
$$typeof: v,
_payload: {
_status: -1,
_result: a
},
_init: Q
};
};

react_production_min.memo = function (a, b) {
return {
$$typeof: u,
type: a,
compare: void 0 === b ? null : b
};
};

react_production_min.useCallback = function (a, b) {
return S().useCallback(a, b);
};

react_production_min.useContext = function (a, b) {
return S().useContext(a, b);
};

react_production_min.useDebugValue = function () {};

react_production_min.useEffect = function (a, b) {
return S().useEffect(a, b);
};

react_production_min.useImperativeHandle = function (a, b, c) {
return S().useImperativeHandle(a, b, c);
};

react_production_min.useLayoutEffect = function (a, b) {
return S().useLayoutEffect(a, b);
};

react_production_min.useMemo = function (a, b) {
return S().useMemo(a, b);
};

react_production_min.useReducer = function (a, b, c) {
return S().useReducer(a, b, c);
};

react_production_min.useRef = function (a) {
return S().useRef(a);
};

react_production_min.useState = function (a) {
return S().useState(a);
};

react_production_min.version = "17.0.2";

{
react.exports = react_production_min;
}

var React = react.exports;

function styleInject(css, ref) {
if (ref === void 0) ref = {};
var insertAt = ref.insertAt;

if (!css || typeof document === 'undefined') {
return;
}

var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');
style.type = 'text/css';

if (insertAt === 'top') {
if (head.firstChild) {
head.insertBefore(style, head.firstChild);
} else {
head.appendChild(style);
}
} else {
head.appendChild(style);
}

if (style.styleSheet) {
style.styleSheet.cssText = css;
} else {
style.appendChild(document.createTextNode(css));
}
}


const Personalia = () => {
return /*#__PURE__*/React.createElement("div", {
className: "personalia"
}, /*#__PURE__*/React.createElement("h2", null, "${title}"));
};

var css_248z = ".main-topp-${cssIdentifier} {height: auto; min-height:200px; max-height: 230px; background-color: white;\\n}\\n .app-${cssIdentifier} {\\n  flex-direction: column;\\n  display: flex;\\n  justify-content: center;\\n  border: 6px solid white;\\n align-items: center;\\n  min-height: ${minHeight};\\n}\\n";
styleInject(css_248z);

const App = () => {
return /*#__PURE__*/React.createElement("main", {
className: "main-topp-${cssIdentifier}"
}, /*#__PURE__*/React.createElement("div", {
className: "app-${cssIdentifier}"
}, /*#__PURE__*/React.createElement(Personalia, null)));
};

export { App as default };
`;
};
